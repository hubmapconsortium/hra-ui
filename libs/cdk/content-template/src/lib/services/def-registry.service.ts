import { EnvironmentProviders, inject, Injectable, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { AnyContentTemplateDef } from '../types/content-template-def';
import { ContentTemplateSpecRegistryService } from './spec-registry.service';

/** Provider token for content template definitions */
export const CONTENT_TEMPLATE_DEFS = new InjectionToken<AnyContentTemplateDef[][]>('Content Template Defs');

/**
 * Adds multiple content template definitions globally
 *
 * @param defs Definitions to register
 */
export function provideContentTemplateDefs(defs: AnyContentTemplateDef[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: CONTENT_TEMPLATE_DEFS,
      useValue: defs,
      multi: true,
    },
  ]);
}

/** Content template definition registry service */
@Injectable({
  providedIn: 'root',
})
export class ContentTemplateDefRegistryService {
  /** Registered definitions */
  private readonly defs = new Map<string, AnyContentTemplateDef>();

  /** Spec registry */
  private readonly specsRegistry = inject(ContentTemplateSpecRegistryService);

  /** Initialize the service with globally provided definitions */
  constructor() {
    const defs = inject(CONTENT_TEMPLATE_DEFS, { optional: true }) ?? [];
    for (const def of defs.flat(1)) {
      this.registerDef(def);
    }
  }

  /**
   * Registers one or more content template definitions
   *
   * @param defs New definitions
   */
  registerDef(def: AnyContentTemplateDef): void {
    const tag = def.spec.shape.component.value;
    this.defs.set(tag, def);
    this.specsRegistry.registerSpec(def.spec);
  }

  /**
   * Get a content template definition for the specified component tag
   *
   * @param tag Definition tag
   * @returns The definition for tag or undefined if it does not exist
   */
  getDef(tag: string): AnyContentTemplateDef | undefined {
    return this.defs.get(tag);
  }
}
