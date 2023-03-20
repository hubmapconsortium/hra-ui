/** Registry of action types */
export const actionTypeRegistry = new Set<string>();

/**
 * Asserts that an action type is unique
 * @param type Action type string
 * @throws If the action type is not unique
 */
export function assertUniqueActionType(type: string): void {
  if (actionTypeRegistry.has(type)) {
    throw new Error(`Action type '${type}' is not unique`);
  }
}

/**
 * Registers an action type
 * @param type Action type string
 * @throws If the action type is not unique
 */
export function registerActionType(type: string): void {
  assertUniqueActionType(type);
  actionTypeRegistry.add(type);
}
