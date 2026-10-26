export type AuditSeverity = 'info' | 'warning' | 'critical' | 'success';

export type AuditCategory = 'all' | 'security' | 'config' | 'deploy' | 'api' | 'data';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  timeFormatted: string;
  actor: string;
  actorRole: string;
  action: string;
  category: 'security' | 'config' | 'deploy' | 'api' | 'data';
  severity: AuditSeverity;
  targetResource: string;
  ipAddress: string;
  location: string;
  sha256Hash: string;
  userAgent: string;
  details: string;
  payloadRaw: string;
}

export interface AuditLogsViewProps {
  onShowToast: (msg: string) => void;
  isEmbeddedInSettings?: boolean;
  onNavigateToTab?: (tab: string) => void;
}
