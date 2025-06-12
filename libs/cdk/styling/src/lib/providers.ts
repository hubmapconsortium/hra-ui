import {
  EnvironmentProviders,
  Injector,
  Type,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { StyleComponentManagerService } from './style-component-manager.service';

/**
 * Provide style components that are registered on application initialization.
 *
 * @param components Component classes
 * @returns Environment provider
 */
export function provideStyleComponents<T>(...components: Type<T>[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const injector = inject(Injector);
      const manager = inject(StyleComponentManagerService);
      manager.registerStyleComponents(components, { injector });
    }),
  ]);
}
