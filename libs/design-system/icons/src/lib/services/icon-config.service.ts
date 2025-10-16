import { Injectable } from '@angular/core';

/** Configuration that can be associated with a svg icon */
export interface IconConfig {
  /** Icon fill color */
  color?: string;
  /** Icon background color */
  backgroundColor?: string;
}

/**
 * An icon configuration resolver callback function.
 * Returning undefined from a resolver instructs the registry to
 * continue calling other resolvers to determine the configuration
 */
export type IconConfigResolver = (name: string, namespace: string) => IconConfig | undefined;

/** Services that manages configuration for svg icons */
@Injectable({
  providedIn: 'root',
})
export class IconConfigRegistryService {
  /** Cache of configurations */
  private readonly configs = new Map<string, IconConfig | undefined>();
  /** List of resolvers to call when determining the configuration */
  private readonly resolvers: IconConfigResolver[] = [];

  /**
   * Adds a resolver to call when determining an icon's configuration.
   * Resolvers are called in the order they are registered and
   * the the registry stops at the first resolver that returns configuration.
   *
   * @param resolver The new resolver
   * @returns `this` for chaining
   */
  addIconConfigResolver(resolver: IconConfigResolver): this {
    this.resolvers.push(resolver);
    return this;
  }

  /**
   * Set the configuration for a specific icon
   *
   * @param name Icon name
   * @param namespace Icon namespace
   * @param config New configuration
   * @returns `this` for chaining
   */
  setIconConfig(name: string, namespace: string | undefined, config: IconConfig): this {
    if (namespace === undefined) {
      [namespace, name] = this.splitIconName(name);
    }

    this.configs.set(`${namespace}:${name}`, config);
    return this;
  }

  /**
   * Get configuration for an icon, querying the resolvers if necessary
   *
   * @param name Icon name
   * @param namespace Icon namespace
   * @returns The associated configuration if available, otherwise undefined
   */
  getIconConfig(name: string, namespace?: string): IconConfig | undefined {
    if (namespace === undefined) {
      [namespace, name] = this.splitIconName(name);
    }

    const { configs } = this;
    const key = `${namespace}:${name}`;
    if (!configs.has(key)) {
      configs.set(key, this.getIconConfigFromResolvers(name, namespace));
    }

    return configs.get(key);
  }

  /**
   * Iterates over each resolver to get configuration for an icon
   *
   * @param name Icon name
   * @param namespace Icon namespace
   * @returns Configuration produced by the resolvers or undefined if no resolver returned configuration
   */
  private getIconConfigFromResolvers(name: string, namespace: string): IconConfig | undefined {
    for (const resolver of this.resolvers) {
      const result = resolver(name, namespace);
      if (result) {
        return result;
      }
    }

    return undefined;
  }

  /**
   * Splits a icon name into a namespace and name
   *
   * @param name Icon name
   * @returns A tuple `[namespace, name]`
   */
  private splitIconName(name: string): [string, string] {
    const parts = name.split(':');
    if (parts.length === 1) {
      return ['', parts[0]];
    } else if (parts.length === 2) {
      return parts as [string, string];
    }

    throw new Error(`Invalid icon name: "${name}"`);
  }
}
