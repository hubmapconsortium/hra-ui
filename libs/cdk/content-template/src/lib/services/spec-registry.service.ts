import { Injectable } from '@angular/core';
import { AnyContentTemplateSpec, registeredSpecs } from '../types/content-template.schema';

/** Content template spec registry service */
@Injectable({
  providedIn: 'root',
})
export class ContentTemplateSpecRegistryService {
  /** Registered specs */
  private readonly specs = registeredSpecs;

  /**
   * Register a content template spec
   * @param spec New specs
   * @returns `this` for chaining
   */
  registerSpec(spec: AnyContentTemplateSpec): this {
    this.specs.add(spec);
    return this;
  }
}
