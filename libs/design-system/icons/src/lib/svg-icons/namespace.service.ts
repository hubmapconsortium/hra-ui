import { Location } from '@angular/common';
import { inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { ICONS_CONFIG } from '../tokens';
import { type SvgIconNamespaceConfig } from './namespace.schema';

/** Multi-token for providing namespace-specific configurations */
export const SVG_ICON_NAMESPACE_CONFIG = new InjectionToken<SvgIconNamespaceConfig[]>('SVG_ICON_NAMESPACE_CONFIG');

/** Default icon directory if not provided in the icons config */
export const DEFAULT_SVG_DIRECTORY = 'assets/icons/';

/**
 * Provide a SVG icon namespace configuration as multi providers
 * @param config config object
 */
export function configureSvgIconNamespace(config: SvgIconNamespaceConfig): Provider {
  return { provide: SVG_ICON_NAMESPACE_CONFIG, useValue: config, multi: true };
}

/** Service for registering individual directories for icon namespaces */
@Injectable({
  providedIn: 'root',
})
export class SvgIconNamespaceService {
  /** Icons configuration */
  private readonly config = inject(ICONS_CONFIG, { optional: true });
  /** Current assets href */
  private readonly assetsHref = inject(APP_ASSETS_HREF);
  /** Map of full config objects per namespace */
  private readonly namespaceConfigs = new Map<string, SvgIconNamespaceConfig>();

  /**
   * Constructor
   *
   * @param config Namespace configuration
   */
  constructor() {
    inject(SVG_ICON_NAMESPACE_CONFIG, { optional: true })?.forEach((config) => {
      this.namespaceConfigs.set(config.namespace, config);
    });
  }

  /**
   * Set an icon namespace's svg directory
   *
   * @param namespace Namespace
   * @param directory Relative directory
   * @returns `this` for chaining
   */
  setNamespaceDirectory(namespace: string, directory: string): this {
    return this.updateNamespaceConfig(namespace, { directory });
  }

  /**
   * Set a icon namespace directory from configuration
   *
   * @param config Configuration object
   * @returns `this` for chaining
   */
  setNamespaceConfig(config: SvgIconNamespaceConfig): this {
    this.namespaceConfigs.set(config.namespace, config);
    return this;
  }

  /**
   * Set multiple icon namespace directories from configuration
   *
   * @param configs Configuration objects
   * @returns `this` for chaining
   */
  setNamespaceConfigs(configs: SvgIconNamespaceConfig[]): this {
    for (const config of configs) {
      this.namespaceConfigs.set(config.namespace, config);
    }
    return this;
  }

  /**
   * Retrieve the configuration for a given namespace, if any
   */
  getNamespaceConfig(namespace: string): SvgIconNamespaceConfig | undefined {
    return this.namespaceConfigs.get(namespace);
  }

  /**
   * Update fields of an existing namespace configuration
   */
  updateNamespaceConfig(namespace: string, updates: Partial<SvgIconNamespaceConfig>): this {
    const existing = this.namespaceConfigs.get(namespace) ?? { namespace };
    this.namespaceConfigs.set(namespace, { ...existing, ...updates });
    return this;
  }

  /**
   * Resolves the namespace's directory using the registered directory and the assets href
   *
   * @param namespace Namespace
   * @returns A resolved path
   */
  resolveNamespaceDirectory(namespace: string): string {
    const { joinWithSlash } = Location;
    const assetsHref = this.assetsHref();
    const directory = this.getNamespaceConfig(namespace)?.directory;
    if (directory !== undefined) {
      return joinWithSlash(assetsHref, directory);
    }

    const defaultDirectory = this.config?.svgDirectory ?? DEFAULT_SVG_DIRECTORY;
    return joinWithSlash(assetsHref, joinWithSlash(defaultDirectory, namespace));
  }
}
