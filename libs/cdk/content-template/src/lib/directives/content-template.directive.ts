import {
  ComponentRef,
  Directive,
  effect,
  inject,
  input,
  reflectComponentType,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ContentTemplateDefRegistryService } from '../services/def-registry.service';
import { AnyContentTemplate, Classes, Styles } from '../types/content-template.schema';
import { classIter, styleIter } from '../utils/iters';

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
      onCleanup(() => ref.destroy());
    });
  }

  /**
   * Renders the content template for the data
   *
   * @param data Data to render into a content template component
   * @returns A reference to the rendered component
   */
  private render(data: AnyContentTemplate): ComponentRef<unknown> {
    const [component, parsedData] = this.selectComponentWithData(data);
    const ref = this.viewContainerRef.createComponent(component);

    this.setClasses(ref, parsedData.classes);
    this.setStyles(ref, parsedData.styles);
    this.setInputs(ref, parsedData);

    return ref;
  }

  private selectComponentWithData(data: AnyContentTemplate): [Type<unknown>, AnyContentTemplate] {
    const def = this.contentTemplateService.getDef(data.component);
    if (!def) {
      throw new Error(`No definition for ${data.component}`);
      // TODO return an error component instead!
    }

    const parseResult = def.spec.safeParse(data);
    if (!parseResult.success) {
      throw new Error(`Failed to parse data for ${data.component}: ${parseResult.error.format()}`);
      // TODO return an error component instead!
    }

    return [def.component, parseResult.data];
  }

  /**
   * Adds classes to the component's element
   *
   * @param ref Reference to the component
   * @param data Component data
   */
  private setClasses(ref: ComponentRef<unknown>, classes: Classes | undefined): void {
    const renderer = ref.injector.get(Renderer2);
    for (const cls of classIter(classes)) {
      renderer.addClass(ref.location, cls);
    }
  }

  /**
   * Sets inline styles on the component's element
   *
   * @param ref Reference to the component
   * @param data Component data
   */
  private setStyles(ref: ComponentRef<unknown>, styles: Styles | undefined): void {
    const renderer = ref.injector.get(Renderer2);
    for (const [style, value] of styleIter(styles)) {
      renderer.setStyle(ref.location, style, value);
    }
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
