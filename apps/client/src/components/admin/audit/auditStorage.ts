import { AuditLogEntry } from './types';

const AUDIT_STORAGE_KEY = 'devfolio_audit_logs';

export const getAuditLogs = (): AuditLogEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addAuditLog = (
  entry: Partial<AuditLogEntry> & { action: string; category?: AuditLogEntry['category'] }
): AuditLogEntry => {
  const current = getAuditLogs();
  const now = new Date();
  const randomHash = Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  const newLog: AuditLogEntry = {
    id: entry.id || `log-evt-${Date.now().toString().slice(-4)}`,
    timestamp: now.toISOString(),
    timeFormatted: now.toTimeString().slice(0, 8),
    actor: entry.actor || 'Quản trị viên',
    actorRole: entry.actorRole || 'Admin Studio',
    action: entry.action,
    category: entry.category || 'config',
    severity: entry.severity || 'info',
    targetResource: entry.targetResource || 'sys://studio',
    ipAddress: entry.ipAddress || '127.0.0.1 (Local Session)',
    location: entry.location || 'Local Workspace',
    sha256Hash: entry.sha256Hash || randomHash,
    userAgent:
      typeof navigator !== 'undefined'
        ? navigator.userAgent
        : 'DevFolio-Studio-Client',
    details: entry.details || entry.action,
    payloadRaw: entry.payloadRaw || JSON.stringify(entry, null, 2),
  };

  const updated = [newLog, ...current];
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('devfolio_audit_updated'));
  } catch {
    // Ignore storage quota errors
  }

  return newLog;
};

export const clearAuditLogs = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUDIT_STORAGE_KEY);
    window.dispatchEvent(new Event('devfolio_audit_updated'));
  }
};
