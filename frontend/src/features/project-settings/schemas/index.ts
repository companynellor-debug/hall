import { z } from 'zod';
import type {
  UpdateProjectInput,
  UpdateAgentInput,
  UpdateSecuritySettingsInput,
  UpdateDesignSettingsInput,
  UpdateDeploymentSettingsInput,
  UpdateGitHubSettingsInput,
  ConnectProviderInput,
  ConnectIntegrationInput,
  EnvironmentVariableInput,
} from '../types';

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo').optional(),
  description: z.string().max(280, 'Máximo 280 caracteres').optional(),
  status: z.enum(['active', 'paused', 'archived']).optional(),
});

export const updateAgentSchema = z.object({
  providerId: z.string().optional(),
  modelId: z.string().optional(),
  enabled: z.boolean().optional(),
  configuration: z.record(z.string(), z.unknown()).optional(),
});

export const updateSecuritySettingsSchema = z.object({
  allowAgentDependencyInstall: z.boolean().optional(),
  allowAgentEnvironmentChanges: z.boolean().optional(),
  allowAgentDeployments: z.boolean().optional(),
  requireApprovalForSensitiveActions: z.boolean().optional(),
  securityScanEnabled: z.boolean().optional(),
});

export const updateDesignSettingsSchema = z.object({
  preferredTheme: z.enum(['system', 'light', 'dark']).optional(),
  previewDevice: z.enum(['desktop', 'tablet', 'mobile']).optional(),
  designInstructions: z.string().max(2000, 'Máximo 2000 caracteres').optional(),
});

export const updateDeploymentSettingsSchema = z.object({
  provider: z.string().optional(),
  productionUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  productionBranch: z.string().optional(),
  autoDeploy: z.boolean().optional(),
});

export const updateGitHubSettingsSchema = z.object({
  repositoryId: z.string().optional(),
  repositoryFullName: z.string().optional(),
  defaultBranch: z.string().optional(),
  autoSync: z.boolean().optional(),
});

export const connectProviderSchema = z.object({
  providerKey: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const connectIntegrationSchema = z.object({
  integrationKey: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const environmentVariableSchema = z.object({
  key: z.string().regex(/^[A-Z_][A-Z0-9_]*$/, 'Chave deve ser UPPER_SNAKE_CASE').min(1),
  environment: z.enum(['development', 'preview', 'production']),
  value: z.string().optional(),
});

export type UpdateProjectValidated = z.infer<typeof updateProjectSchema>;
export type UpdateAgentValidated = z.infer<typeof updateAgentSchema>;
export type UpdateSecuritySettingsValidated = z.infer<typeof updateSecuritySettingsSchema>;
export type UpdateDesignSettingsValidated = z.infer<typeof updateDesignSettingsSchema>;
export type UpdateDeploymentSettingsValidated = z.infer<typeof updateDeploymentSettingsSchema>;
export type UpdateGitHubSettingsValidated = z.infer<typeof updateGitHubSettingsSchema>;
export type ConnectProviderValidated = z.infer<typeof connectProviderSchema>;
export type ConnectIntegrationValidated = z.infer<typeof connectIntegrationSchema>;
export type EnvironmentVariableValidated = z.infer<typeof environmentVariableSchema>;