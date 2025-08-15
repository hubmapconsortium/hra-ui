declare module '@analytics/session-storage-utils' {
  export function getSessionItem(key: string): string | null | undefined;
  export function setSessionItem(key: string, value: string): void;
  export function removeSessionItem(key: string): void;
}
