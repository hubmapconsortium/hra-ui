import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  assertInInjectionContext,
  createComponent,
  inject,
  runInInjectionContext,
} from '@angular/core';

type ComponentInstanceMap = Map<Type<unknown>, ComponentRef<unknown>>;
type ComponentRefsFromTypes<Types extends Type<unknown>[]> = {
  [Index in keyof Types]: ComponentRef<InstanceType<Types[Index]>>;
};

export function registerStyleComponents<const Types extends Type<unknown>[]>(
  components: Types,
  options?: { injector?: Injector },
): ComponentRefsFromTypes<Types> {
  if (!options?.injector) {
    assertInInjectionContext(registerStyleComponents);
  }

  const injector = options?.injector ?? inject(Injector);
  const manager = inject(StyleComponentManagerService);
  return manager.registerStyleComponents(components, { injector });
}

@Injectable({ providedIn: 'root' })
export class StyleComponentManagerService {
  private readonly registry = new Map<ApplicationRef, ComponentInstanceMap>();

  registerStyleComponents<const Types extends Type<unknown>[]>(
    components: Types,
    options: { injector: Injector },
  ): ComponentRefsFromTypes<Types> {
    return runInInjectionContext(options.injector, () => {
      const instanceMap = this.getInstanceMap(inject(ApplicationRef));
      const environmentInjector = inject(EnvironmentInjector);

      return components.map((component) =>
        this.getInstance(component, instanceMap, environmentInjector),
      ) as ComponentRefsFromTypes<Types>;
    });
  }

  private getInstanceMap(appRef: ApplicationRef): ComponentInstanceMap {
    let instanceMap = this.registry.get(appRef);
    if (!instanceMap) {
      instanceMap = new Map();
      this.registry.set(appRef, instanceMap);
      appRef.onDestroy(() => {
        this.registry.delete(appRef);
        instanceMap?.forEach((instance) => instance.destroy());
      });
    }

    return instanceMap;
  }

  private getInstance<T>(
    component: Type<T>,
    instanceMap: ComponentInstanceMap,
    environmentInjector: EnvironmentInjector,
  ): ComponentRef<T> {
    let instance = instanceMap.get(component) as ComponentRef<T>;
    if (!instance) {
      instance = createComponent(component, { environmentInjector });
      instanceMap.set(component, instance);
    }

    return instance;
  }
}
