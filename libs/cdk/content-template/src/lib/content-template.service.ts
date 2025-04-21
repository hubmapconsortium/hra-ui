import { Injectable, Type } from '@angular/core';
import { AnyContentTemplateSpec, registerContentTemplateSpecs } from './content-template.schema';
import { injectContentTemplates } from './content-template.providers';

/** A content template definition */
export interface ContentTemplateDef<T> {
  /** Component name */
  name: string;
  /** Component class */
  component: Type<T>;
  /** Data spec */
  spec: AnyContentTemplateSpec; // TODO try to type this using `T`
}

/** Any content template defination */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyContentTemplateDef = ContentTemplateDef<any>;

/** Content template definition manager service */
@Injectable({
  providedIn: 'root',
})
export class ContentTemplateService {
  /** Registered definitions */
  private readonly defs = new Map<string, AnyContentTemplateDef>();

  /** Initialize the service with globally provided definitions */
  constructor() {
    const allDefs = injectContentTemplates({ optional: true }) ?? [];
    for (const defs of allDefs) {
      this.registerDefsImpl(defs);
    }
  }

  /**
   * Registers one or more content template definitions
   *
   * @param defs New definitions
   */
  registerDefs<Defs extends AnyContentTemplateDef[]>(...defs: Defs): void {
    this.registerDefsImpl(defs);
  }

  /**
   * Get a content template definition for the specified component name
   *
   * @param name Definition name
   * @returns The definition for name or undefined if it does not exist
   */
  getDef(name: string): AnyContentTemplateDef | undefined {
    return this.defs.get(name);
  }

  /**
   * Registers multiple definitions
   *
   * @param defs New definitions
   */
  private registerDefsImpl(defs: AnyContentTemplateDef[]): void {
    for (const def of defs) {
      this.defs.set(def.name, def);
      registerContentTemplateSpecs(def.spec);
    }
  }
}
