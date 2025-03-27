import { inject, Injectable } from '@angular/core';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { ICONS_CONFIG } from '../tokens';
import { Location } from '@angular/common';

/** Default icon directory if not provided in the icons config */
export const DEFAULT_SVG_DIRECTORY = 'assets/icons/';

/** Service for registering individual directories for icon namespaces */
@Injectable({
  providedIn: 'root',
})
export class SvgIconNamespaceService {
  /** Icons configuration */
  private readonly config = inject(ICONS_CONFIG, { optional: true });
  /** Current assets href */
  private readonly assetsHref = inject(APP_ASSETS_HREF);
  /** Mapping from a namespace to a directory */
  private readonly namespaceDirectories = new Map<string, string>();

  /**
   * Set an icon namespace's svg directory
   *
   * @param namespace Namespace
   * @param directory Relative directory
   * @returns `this` for chaining
   */
  setNamespaceDirectory(namespace: string, directory: string): this {
    this.namespaceDirectories.set(namespace, directory);
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
    const directory = this.namespaceDirectories.get(namespace);
    if (directory !== undefined) {
      return joinWithSlash(assetsHref, directory);
    }

    const defaultDirectory = this.config?.svgDirectory ?? DEFAULT_SVG_DIRECTORY;
    return joinWithSlash(assetsHref, joinWithSlash(defaultDirectory, namespace));
  }
}
