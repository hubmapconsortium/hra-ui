export function isAbsolute(path: string): boolean {
  try {
    new URL(path);
    return true;
  } catch {
    return false;
  }
}

export function joinWithSlash(start: string, end: string): string {
  if (!start) {
    return end;
  } else if (!end) {
    return start;
  }

  start = start.replace(/\/+$/, '');
  end = end.replace(/^\/+/, '');
  return `${start}/${end}`;
}
