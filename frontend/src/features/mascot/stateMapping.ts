export type AgentStatus = 'idle' | 'analyzing' | 'planning' | 'editing' | 'building' | 'done' | 'error' | 'paused';

export function resolveHallMascotState(status: AgentStatus): 'idle' | 'listening' | 'thinking' | 'building' | 'success' | 'error' | 'sleeping' {
  switch (status) {
    case 'analyzing':
    case 'planning':
      return 'thinking';
    case 'editing':
    case 'building':
      return 'building';
    case 'done':
      return 'success';
    case 'error':
      return 'error';
    case 'paused':
      return 'sleeping';
    case 'idle':
    default:
      return 'idle';
  }
}
