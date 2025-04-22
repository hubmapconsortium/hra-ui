import { ComponentRef, Directive, effect, inject, input, reflectComponentType, ViewContainerRef } from '@angular/core';
import { AnyContentTemplate } from '../types/content-template.schema';
import { ContentTemplateDefRegistryService } from '../services/def-registry.service';

/** A structural directive that renders a content template component */
@Directive({
  selector: '[hraContentTemplateOutlet]',
})
export class ContentTemplateOutletDirective {
  /** Content template data */
  readonly data = input.required<AnyContentTemplate>({ alias: 'hraContentTemplateOutlet' });

  /** View container */
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** Content template definitions service */
  private readonly contentTemplateService = inject(ContentTemplateDefRegistryService);

  /** Initializes the outlet */
  constructor() {
    effect((onCleanup) => {
      const ref = this.render(this.data());
      onCleanup(() => ref?.destroy());
    });
  }

  /**
   * Renders the content template for the data
   *
   * @param data Data to render into a content template component
   * @returns A reference to the rendered component or undefined on failure
   */
  private render(data: AnyContentTemplate): ComponentRef<unknown> | undefined {
    // TODO initial parse
    const def = this.contentTemplateService.getDef(data.component);
    if (!def) {
      // TODO
      return undefined;
    }

    const parseResult = def.spec.safeParse(data);
    if (!parseResult.success) {
      // TODO
      return undefined;
    }

    const ref = this.viewContainerRef.createComponent(def.component);
    // TODO use parsed data
    this.setClasses(ref, data);
    this.setStyles(ref, data);
    this.setInputs(ref, data);

    return ref;
  }

  /**
   * Adds classes to the component's element
   *
   * @param ref Reference to the component
   * @param data Component data
   */
  private setClasses(ref: ComponentRef<unknown>, data: AnyContentTemplate): void {
    // TODO
  }

  /**
   * Sets inline styles on the component's element
   *
   * @param ref Reference to the component
   * @param data Component data
   */
  private setStyles(ref: ComponentRef<unknown>, data: AnyContentTemplate): void {
    // TODO
  }

  /**
   * Binds input values from the data to the component
   *
   * @param ref Reference to the component
   * @param data Component data
   */
  private setInputs(ref: ComponentRef<unknown>, data: AnyContentTemplate): void {
    const mirror = reflectComponentType(ref.componentType);
    const inputs = mirror?.inputs.map((o) => o.propName) ?? [];
    for (const key of inputs) {
      if (key in data) {
        ref.setInput(key, data[key]);
      }
    }
  }
}
