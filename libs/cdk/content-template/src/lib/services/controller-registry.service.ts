import {
  ComponentRef,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { Controller } from '../types/content-template.schema';

/**
 * Interface for content template controllers that manage component instances
 * and their interaction with the content template system.
 */
export interface ContentTemplateController {
  /** attaches the controller  */
  attach(componentRef: ComponentRef<unknown>, options: Controller): void;
  /**
   * Detaches the controller from the component instance.
   */
  detach(): void;
}

/**
 * Constructor interface for content template controllers.
 * Used to register controllers with the ContentTemplateControllerRegistryService.
 */
export interface ContentTemplateControllerConstructor {
  /**
   * Unique identifier for the controller.
   * This ID is used to register and retrieve the controller from the registry.
   */
  readonly id: string;
  /**
   * Creates a new instance of the content template controller.
   */
  new (...args: unknown[]): ContentTemplateController;
}

/**
 * Injection token for providing multiple content template controllers.
 * Controllers can be registered globally using the provideContentTemplateControllers function.
 */
export const CONTENT_TEMPLATE_CONTROLLERS = new InjectionToken<ContentTemplateControllerConstructor[][]>(
  'Content Template Controllers',
);

/**
 * Function to provide multiple content template controllers globally.
 * This allows the ContentTemplateControllerRegistryService to access and manage these controllers.
 *
 * @param controllers Array of controller constructors to register
 * @returns EnvironmentProviders for the provided controllers
 */
export function provideContentTemplateControllers(
  controllers: ContentTemplateControllerConstructor[],
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: CONTENT_TEMPLATE_CONTROLLERS,
      useValue: controllers,
      multi: true,
    },
  ]);
}

/** Content template controller registry service  */
@Injectable({
  providedIn: 'root',
})
export class ContentTemplateControllerRegistryService {
  /** Registered content template controllers */
  private readonly controllers = new Map<string, ContentTemplateControllerConstructor>();

  /**
   * Initialize the service with globally provided content template controllers.
   */
  constructor() {
    const controllers = inject(CONTENT_TEMPLATE_CONTROLLERS, { optional: true }) ?? [];
    for (const controller of controllers.flat(1)) {
      this.registerController(controller.id, controller);
    }
  }

  /**
   * Registers a content template controller by its ID.
   * This allows the controller to be retrieved later using its ID.
   *
   * @param id Unique identifier for the controller
   * @param controller The controller constructor to register
   */
  registerController(id: string, controller: ContentTemplateControllerConstructor): void {
    this.controllers.set(id, controller);
  }

  /**
   * Retrieves a content template controller by its ID.
   * If the controller does not exist, it returns undefined.
   *
   * @param id Unique identifier for the controller
   * @returns The controller constructor or undefined if not found
   */
  getController(id: string): ContentTemplateControllerConstructor | undefined {
    return this.controllers.get(id);
  }
}
