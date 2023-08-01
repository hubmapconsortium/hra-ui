/**
 * Load Action, which is triggered to load yaml file, to get theming pallete
 */
export class Load {
  /**
   * static type for the action
   */
  static readonly type = '[Theming] Load Theming File';
  /**
   * Initialising type for the  action
   */
  readonly type = Load.type;

  /**
   * It takes URL of the yaml file, and loads it.
   * @param url URL of the yaml file, containing theming color key-value pairs
   */
  constructor(readonly url: string) {}
}
