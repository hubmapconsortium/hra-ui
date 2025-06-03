import { Injectable } from '@angular/core';

export interface IconConfig {
  color?: string;
  backgroundColor?: string;
}

export type IconConfigResolver = (name: string, namespace: string) => IconConfig | undefined;

@Injectable({
  providedIn: 'root',
})
export class IconConfigRegistryService {
  private readonly configs = new Map<string, IconConfig | undefined>();
  private readonly resolvers: IconConfigResolver[] = [];

  addIconConfigResolver(resolver: IconConfigResolver): this {
    this.resolvers.push(resolver);
    return this;
  }

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

  private getIconConfigFromResolvers(name: string, namespace: string): IconConfig | undefined {
    for (const resolver of this.resolvers) {
      const result = resolver(name, namespace);
      if (result) {
        return result;
      }
    }

    return undefined;
  }

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
