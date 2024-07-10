/**
 * Currently executing script's element.
 * Should be reliable in most cases unless the script is executed as a module
 * or in an older browser, IE etc. (which we don't support anyway)
 */
const currentScriptEl = document.currentScript;

/** Cached value of found script path */
let currentScriptPath: string | undefined;

/**
 * Get the current script's path.
 *
 * @returns The current script's path
 */
export function getCurrentScriptPath(): string {
  currentScriptPath ??= findCurrentScriptPath();
  return currentScriptPath;
}

/**
 * Get the current script's base path.
 *
 * @returns The current script's base path
 */
export function getCurrentScriptBasePath(): string {
  const fullPath = getCurrentScriptPath();
  const index = fullPath.lastIndexOf('/');
  return fullPath.slice(0, index + 1);
}

/**
 * Searches for the current script's path in a couple of different ways.
 *
 * @returns The current script's path if found, otherwise the empty string
 */
function findCurrentScriptPath(): string {
  if (currentScriptEl && 'src' in currentScriptEl) {
    return currentScriptEl.src;
  }

  return findCurrentScriptPathFromStackTrace() ?? '';
}

/**
 * Try to find the current script's path using a stack trace.
 * Adapted from {@link https://stackoverflow.com/a/22165218}
 *
 * @returns A path if found
 */
function findCurrentScriptPathFromStackTrace(): string | undefined {
  try {
    throw new Error();
  } catch (error) {
    const { stack } = error as Error;
    const match = stack?.match(/(https?:\/\/.+):\d+:\d+/);
    return match?.[1];
  }
}
