import { registerActionType } from './action-type-registry';

/** Base action type */
export interface Action {
  /** Action type */
  readonly type: string;
}

/** Base action constructor */
export interface ActionConstructor {
  /** Action type */
  readonly type: string;

  /** Create a new action */
  new (): Action;
}

/**
 * Creates an action factory that adds a common group string to each action type
 * @param group Common action type group
 * @returns An action factory
 */
export function ActionGroup(group: string): (type: string) => ActionConstructor {
  return (type) => Action(`[${group}] ${type}`);
}

/**
 * Creates a new base action with a specified type
 * @param type Action type
 * @returns A base action class
 */
export function Action(type: string): ActionConstructor {
  registerActionType(type);
  return class BaseAction {
    static readonly type = type;
    readonly type = type;
  };
}
