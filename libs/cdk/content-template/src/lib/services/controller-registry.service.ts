import {
  ComponentRef,
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { Controller } from '../types/content-template.schema';

export interface ContentTemplateController {
  attach(componentRef: ComponentRef<unknown>, options: Controller): void;
  detach(): void;
}

export interface ContentTemplateControllerConstructor {
  readonly id: string;
  new (...args: unknown[]): ContentTemplateController;
}

export const CONTENT_TEMPLATE_CONTROLLERS = new InjectionToken<ContentTemplateControllerConstructor[][]>(
  'Content Template Controllers',
);

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

@Injectable({
  providedIn: 'root',
})
export class ContentTemplateControllerRegistryService {
  private readonly controllers = new Map<string, ContentTemplateControllerConstructor>();

  constructor() {
    const controllers = inject(CONTENT_TEMPLATE_CONTROLLERS, { optional: true }) ?? [];
    for (const controller of controllers.flat(1)) {
      this.registerController(controller.id, controller);
    }
  }

  registerController(id: string, controller: ContentTemplateControllerConstructor): void {
    this.controllers.set(id, controller);
  }

  getController(id: string): ContentTemplateControllerConstructor | undefined {
    return this.controllers.get(id);
  }
}
