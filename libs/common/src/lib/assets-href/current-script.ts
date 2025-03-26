/**
 * Currently executing script's element.
 * Should be reliable in most cases unless the script is executed as a module
 * or in an older browser, IE etc. (which we don't support anyway)
 */
export const SCRIPT_EL = typeof document === 'object' ? document.currentScript : null;

/**
 * Get the current script's path from a script element.
 *
 * @param el Executing script element
 * @returns A path if available
 */
export function getCurrentScriptFromElement(el = SCRIPT_EL): string | undefined {
  return el && 'src' in el ? el.src : undefined;
}

/**
 * Try to find the current script's path using a stack trace.
 * Adapted from {@link https://stackoverflow.com/a/22165218}
 *
 * @returns A path if found
 */
export function getCurrentScriptFromStackTrace(): string | undefined {
  try {
    throw new Error();
  } catch (error) {
    const { stack } = error as Error;
    const match = stack?.match(/(https?:\/\/.+):\d+:\d+/);
    return match?.[1];
  }
}
