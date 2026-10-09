import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ProjectSettingsRepository } from '../repositories';
import type { UpdateProjectInput, UpdateAgentInput, UpdateSecuritySettingsInput, UpdateDesignSettingsInput, UpdateDeploymentSettingsInput, UpdateGitHubSettingsInput, ConnectProviderInput, ConnectIntegrationInput, EnvironmentVariableInput, AgentRole, AvailableModel, ProjectSettings } from '../types';
import { projectSettingsService } from '../services/projectSettingsService';
import { mockProjectSettingsRepository } from '../mocks/repository';

interface UseProjectSettingsOptions {
  projectId: string;
  repository?: ProjectSettingsRepository;
}

interface UseProjectSettingsReturn {
  settings: ProjectSettings | null;
  availableModels: AvailableModel[];
  isLoading: boolean;
  isSaving: boolean;
  error: Error | null;
  hasUnsavedChanges: boolean;

  updateProject: (input: UpdateProjectInput) => void;
  updateAgent: (role: AgentRole, input: UpdateAgentInput) => void;
  updateSecurity: (input: any) => void;
  updateDesign: (input: any) => void;
  updateDeployment: (input: any) => void;
  updateGitHub: (input: any) => void;

  connectProvider: (input: any) => Promise<void>;
  disconnectProvider: (providerKey: string) => Promise<void>;
  connectIntegration: (input: any) => Promise<void>;
  disconnectIntegration: (integrationKey: string) => Promise<void>;

  upsertEnvVar: (input: any) => Promise<void>;
  deleteEnvVar: (variableId: string) => Promise<void>;

  save: () => Promise<void>;
  discard: () => void;
  reload: () => Promise<void>;
}

function createDraft<T>(saved: T): T {
  return JSON.parse(JSON.stringify(saved));
}

export function useProjectSettings({ projectId, repository }: UseProjectSettingsOptions): UseProjectSettingsReturn {
  const [settings, setSettings] = useState<ProjectSettings | null>(null);
  const [draft, setDraft] = useState<ProjectSettings | null>(null);
  const [availableModels, setAvailableModels] = useState<AvailableModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const repoRef = useRef(repository ?? mockProjectSettingsRepository);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (repository) {
      repoRef.current = repository;
    }
  }, [repository]);

  const service = useMemo(() => {
    return new (projectSettingsService.constructor as new (repo: any) => any)(repoRef.current);
  }, []);

  const load = useCallback(async () => {
    console.log('[useProjectSettings] Loading settings for projectId:', projectId);
    if (!repoRef.current) {
      console.error('[useProjectSettings] Repository not configured');
      setError(new Error('Repository not configured'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const [loadedSettings, loadedModels] = await Promise.all([
        repoRef.current.getProjectSettings(projectId),
        repoRef.current.getAvailableModels(projectId),
      ]);
      console.log('[useProjectSettings] Loaded:', { settings: !!loadedSettings, modelsCount: loadedModels.length });
      setSettings(loadedSettings);
      setDraft(createDraft(loadedSettings));
      setAvailableModels(loadedModels);
    } catch (err) {
      console.error('[useProjectSettings] Load error:', err);
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      load();
    }
  }, [load]);

  const hasUnsavedChanges = useMemo(() => {
    if (!settings || !draft) return false;
    return JSON.stringify(settings) !== JSON.stringify(draft);
  }, [settings, draft]);

  const updateDraft = useCallback((updater: (current: any) => any) => {
    setDraft(prev => prev ? updater(prev) : null);
  }, []);

  const updateProject = useCallback((input: any) => {
    updateDraft(s => ({ ...s, project: { ...s.project, ...input, updatedAt: new Date().toISOString() } }));
  }, [updateDraft]);

  const updateAgent = useCallback((role: AgentRole, input: any) => {
    updateDraft(s => ({ ...s, agents: s.agents.map((a: any) => a.role === role ? { ...a, ...input } : a) }));
  }, [updateDraft]);

  const updateSecurity = useCallback((input: any) => {
    updateDraft(s => ({ ...s, security: { ...s.security, ...input } }));
  }, [updateDraft]);

  const updateDesign = useCallback((input: any) => {
    updateDraft(s => ({ ...s, design: { ...s.design, ...input } }));
  }, [updateDraft]);

  const updateDeployment = useCallback((input: any) => {
    updateDraft(s => ({ ...s, deployment: { ...s.deployment, ...input } }));
  }, [updateDraft]);

  const updateGitHub = useCallback((input: any) => {
    updateDraft(s => ({ ...s, github: { ...s.github, ...input } }));
  }, [updateDraft]);

  const connectProvider = useCallback(async (input: any) => {
    if (!repoRef.current || !draft) return;
    try {
      const provider = await service.connectProvider(projectId, input);
      setDraft(prev => prev ? ({ ...prev, providers: [...prev.providers.filter((p: any) => p.providerKey !== input.providerKey), provider] }) : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect provider'));
    }
  }, [draft, projectId, service]);

  const disconnectProvider = useCallback(async (providerKey: string) => {
    if (!repoRef.current || !draft) return;
    try {
      await service.disconnectProvider(projectId, providerKey);
      setDraft(prev => prev ? ({ ...prev, providers: prev.providers.map((p: any) => p.providerKey === providerKey ? { ...p, status: 'disconnected' } : p) }) : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to disconnect provider'));
    }
  }, [draft, projectId, service]);

  const connectIntegration = useCallback(async (input: any) => {
    if (!repoRef.current || !draft) return;
    try {
      const integration = await service.connectIntegration(projectId, input);
      setDraft(prev => prev ? ({ ...prev, integrations: [...prev.integrations.filter((i: any) => i.integrationKey !== input.integrationKey), integration] }) : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect integration'));
    }
  }, [draft, projectId, service]);

  const disconnectIntegration = useCallback(async (integrationKey: string) => {
    if (!repoRef.current || !draft) return;
    try {
      await service.disconnectIntegration(projectId, integrationKey);
      setDraft(prev => prev ? ({ ...prev, integrations: prev.integrations.map((i: any) => i.integrationKey === integrationKey ? { ...i, status: 'disconnected' } : i) }) : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to disconnect integration'));
    }
  }, [draft, projectId, service]);

  const upsertEnvVar = useCallback(async (input: any) => {
    if (!repoRef.current || !draft) return;
    try {
      const variable = await service.upsertEnvironmentVariable(projectId, input);
      setDraft(prev => {
        if (!prev) return null;
        const existing = prev.environmentVariables.findIndex((v: any) => v.key === input.key && v.environment === input.environment);
        const vars = [...prev.environmentVariables];
        if (existing >= 0) {
          vars[existing] = variable;
        } else {
          vars.push(variable);
        }
        return { ...prev, environmentVariables: vars };
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save environment variable'));
    }
  }, [draft, projectId, service]);

  const deleteEnvVar = useCallback(async (variableId: string) => {
    if (!repoRef.current || !draft) return;
    try {
      await service.deleteEnvironmentVariable(projectId, variableId);
      setDraft(prev => prev ? ({ ...prev, environmentVariables: prev.environmentVariables.filter((v: any) => v.id !== variableId) }) : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete environment variable'));
    }
  }, [draft, projectId, service]);

  const save = useCallback(async () => {
    if (!repoRef.current || !draft || !settings) return;
    setIsSaving(true);
    setError(null);
    try {
      if (draft.project.name !== settings.project.name || draft.project.description !== settings.project.description || draft.project.status !== settings.project.status) {
        await repoRef.current.updateProject(projectId, { name: draft.project.name, description: draft.project.description, status: draft.project.status });
      }

      for (const agent of draft.agents) {
        const original = settings.agents.find((a: any) => a.role === agent.role);
        if (original && (agent.providerId !== original.providerId || agent.modelId !== original.modelId || agent.enabled !== original.enabled)) {
          await repoRef.current.updateAgent(projectId, agent.role, { providerId: agent.providerId, modelId: agent.modelId, enabled: agent.enabled });
        }
      }

      if (draft.security !== settings.security) await repoRef.current.updateSecuritySettings(projectId, draft.security);
      if (draft.design !== settings.design) await repoRef.current.updateDesignSettings(projectId, draft.design);
      if (draft.deployment !== settings.deployment) await repoRef.current.updateDeploymentSettings(projectId, draft.deployment);
      if (draft.github !== settings.github) await repoRef.current.updateGitHubSettings(projectId, draft.github);

      setSettings(createDraft(draft));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save settings'));
    } finally {
      setIsSaving(false);
    }
  }, [draft, settings, projectId]);

  const discard = useCallback(() => {
    if (settings) setDraft(createDraft(settings));
  }, [settings]);

  const reload = useCallback(async () => { await load(); }, [load]);

  return {
    settings: draft ?? settings,
    availableModels,
    isLoading,
    isSaving,
    error,
    hasUnsavedChanges,
    updateProject,
    updateAgent,
    updateSecurity,
    updateDesign,
    updateDeployment,
    updateGitHub,
    connectProvider,
    disconnectProvider,
    connectIntegration,
    disconnectIntegration,
    upsertEnvVar,
    deleteEnvVar,
    save,
    discard,
    reload,
  };
}

export type { UpdateProjectInput, UpdateAgentInput, AgentRole, AvailableModel, ProjectSettings } from '../types';