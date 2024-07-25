import { APP_INITIALIZER, EnvironmentProviders, Injector, Type, inject, makeEnvironmentProviders } from '@angular/core';
import { StyleComponentManagerService } from './style-component-manager.service';

export function provideStyleComponents<T>(...components: Type<T>[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const injector = inject(Injector);
        const manager = inject(StyleComponentManagerService);
        return () => manager.registerStyleComponents(components, { injector });
      },
    },
  ]);
}
