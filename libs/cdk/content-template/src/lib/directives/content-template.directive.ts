import { coerceArray, coerceElement } from '@angular/cdk/coercion';
import {
  ComponentMirror,
  ComponentRef,
  Directive,
  effect,
  ErrorHandler,
  inject,
  Injector,
  input,
  reflectComponentType,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { findOrThrow } from '@hra-ui/common/array-util';
import {
  ContentTemplateController,
  ContentTemplateControllerConstructor,
  ContentTemplateControllerRegistryService,
} from '../services/controller-registry.service';
import { ContentTemplateDefRegistryService } from '../services/def-registry.service';
import { AnyContentTemplateDef } from '../types/content-template-def';
import {
  AnyContentTemplate,
  Classes,
  Controller,
  ProjectedContentTemplate,
  Styles,
} from '../types/content-template.schema';
import { classIter, styleIter } from '../utils/iters';

/**
 * Creates an error for definition lookup failures
 *
 * @param tag Component tag
 * @returns A new error
 */
function getDefinitionLookupError(tag: string): Error {
  return new Error(`No component definition for ${tag}`);
}

/**
 * Creates an error for component reflection failures
 *
 * @param tag Component tag
 * @returns A new error
 */
function getComponentReflectionError(tag: string): Error {
  return new Error(`Unable to retrieve runtime information for ${tag}`);
}

/** A structural directive that renders a content template component */
@Directive({
  selector: '[hraContentTemplateOutlet]',
})
export class ContentTemplateOutletDirective {
  /** Content template data */
  readonly data = input.required<AnyContentTemplate | undefined>({ alias: 'hraContentTemplateOutlet' });

  /** View container */
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** Renderer */
  private readonly renderer = inject(Renderer2);
  /** Error handler */
  private readonly errorHandler = inject(ErrorHandler);
  /** Content template definitions registry */
  private readonly defRegistry = inject(ContentTemplateDefRegistryService);
  /** Content template controller registry */
  private readonly controllerRegistry = inject(ContentTemplateControllerRegistryService);

  /** Initializes the outlet */
  constructor() {
    effect((onCleanup) => {
      const data = this.data();
      if (data !== undefined) {
        this.render(data);
        onCleanup(() => this.viewContainerRef.clear());
      }
    });
  }

  /**
   * Renders the content template for the data
   *
   * @param data Data to render into a content template component
   * @returns A reference to the rendered component
   */
  private render(data: AnyContentTemplate): ComponentRef<unknown> {
    const { viewContainerRef } = this;
    const initialViewCount = viewContainerRef.length;
    try {
      const { component, spec, projectedProperties } = this.getDefinition(data.component);
      const parsedData = spec.parse(data);
      const mirror = this.reflectComponent(data.component, component);
      const inputs = mirror.inputs.map((o) => o.propName);
      const selectors = [...mirror.ngContentSelectors];
      const controllers = this.getControllers(parsedData['controllers']);
      const injector = Injector.create({ providers: controllers, parent: this.viewContainerRef.injector });
      const projectableNodes = this.renderProjectedContent(
        selectors,
        projectedProperties,
        parsedData as AnyContentTemplate,
      );
      const ref = this.viewContainerRef.createComponent(component, { injector, projectableNodes });
      const el = coerceElement(ref.location);

      this.bindClasses(el, parsedData['classes']);
      this.bindStyles(el, parsedData['styles']);
      this.bindInputs(ref, inputs, parsedData as AnyContentTemplate);
      this.attachControllers(ref, controllers, parsedData as AnyContentTemplate);

      return ref;
    } catch (error: unknown) {
      // Clean up all views created during this render call
      while (viewContainerRef.length > initialViewCount) {
        viewContainerRef.remove();
      }

      return this.handleError(data, error);
    }
  }

  /**
   * Lookup a component definition
   *
   * @param tag Component tag
   * @returns Definition object
   * @throws If there is no definition for the tag
   */
  private getDefinition(tag: string): AnyContentTemplateDef {
    const def = this.defRegistry.getDef(tag);
    if (def) {
      return def;
    }

    throw getDefinitionLookupError(tag);
  }

  /**
   * Retrieve metadata about a component
   *
   * @param tag Component tag
   * @param component Component class
   * @returns A component mirror
   * @throws If there is no metadata for the component
   */
  private reflectComponent(tag: string, component: Type<unknown>): ComponentMirror<unknown> {
    const mirror = reflectComponentType(component);
    if (mirror) {
      return mirror;
    }

    throw getComponentReflectionError(tag);
  }

  private getControllers(controllers: Controller[] | undefined): ContentTemplateControllerConstructor[] {
    if (controllers === undefined) {
      return [];
    }

    const { controllerRegistry } = this;
    return controllers
      .map(({ id }) => controllerRegistry.getController(id))
      .filter((controller) => controller !== undefined);
  }

  /**
   * Renders projected content
   *
   * @param selectors ng-content selectors
   * @param projectedProperties Mapping from selector to a property in the data
   * @param data Component data
   * @returns A nested list of nodes for each selector
   */
  private renderProjectedContent(
    selectors: string[],
    projectedProperties: Record<string, string> | undefined,
    data: AnyContentTemplate,
  ): Node[][] | undefined {
    if (selectors.length === 0 || projectedProperties === undefined) {
      return undefined;
    }

    return selectors.map((selector) => this.renderProjectedContentForSelector(selector, projectedProperties, data));
  }

  /**
   * Renders projected content for a specific selector
   *
   * @param selector Selector string
   * @param projectedProperties Mapping from selector to a property in the data
   * @param data Component data
   * @returns A list of nodes
   */
  private renderProjectedContentForSelector(
    selector: string,
    projectedProperties: Record<string, string>,
    data: AnyContentTemplate,
  ): Node[] {
    const prop = projectedProperties[selector];
    const templates = (prop && data[prop]) as ProjectedContentTemplate | undefined;
    if (templates === undefined) {
      return [];
    }

    return coerceArray(templates).map((template) => coerceElement(this.render(template).location));
  }

  /**
   * Adds classes to the component's element
   *
   * @param el Reference to the element
   * @param classes Html classes
   */
  private bindClasses(el: Element, classes: Classes | undefined): void {
    for (const cls of classIter(classes)) {
      this.renderer.addClass(el, cls);
    }
  }

  /**
   * Sets inline styles on the component's element
   *
   * @param el Reference to the element
   * @param styles Css styles
   */
  private bindStyles(el: Element, styles: Styles | undefined): void {
    for (const [style, value, flags] of styleIter(styles)) {
      this.renderer.setStyle(el, style, value, flags);
    }
  }

  /**
   * Binds input values from the data to the component
   *
   * @param ref Reference to the component
   * @param inputs Input names
   * @param data Component data
   */
  private bindInputs(ref: ComponentRef<unknown>, inputs: string[], data: AnyContentTemplate): void {
    for (const key of inputs) {
      if (key in data) {
        ref.setInput(key, data[key]);
      }
    }
  }

  private attachControllers(
    ref: ComponentRef<unknown>,
    controllers: ContentTemplateControllerConstructor[],
    data: AnyContentTemplate,
  ): void {
    if (data['controllers'] === undefined) {
      return;
    }

    for (const controller of controllers) {
      const options = findOrThrow(data['controllers'], (o) => o.id === controller.id);
      const instance = ref.injector.get<ContentTemplateController>(controller);
      instance.attach(ref, options);
      ref.onDestroy(() => instance.detach());
    }
  }

  /**
   * Handles errors thrown during rendering
   *
   * @param data Component data
   * @param error Caught error
   * @returns A component displaying the error
   */
  private handleError(data: AnyContentTemplate, error: unknown): ComponentRef<unknown> {
    this.errorHandler.handleError(error);
    // TODO
    throw new Error('TODO render error component instead', { cause: error });
  }
}
