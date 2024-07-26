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

/** Map of component types to instances */
type ComponentInstanceMap = Map<Type<unknown>, ComponentRef<unknown>>;

/** Helper that turns an array of types into an array of component refs */
type ComponentRefsFromTypes<Types extends Type<unknown>[]> = {
  [Index in keyof Types]: ComponentRef<InstanceType<Types[Index]>>;
};

/**
 * Register style components. Each component is registered at most once.
 * Must be called in an injection context or pass an injector in the options.
 *
 * @param components Component classes
 * @param options Additional options
 * @returns A component ref for each class
 */
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

/**
 * Manager of global style components
 */
@Injectable({ providedIn: 'root' })
export class StyleComponentManagerService {
  /** Component instance registry */
  private readonly registry = new Map<ApplicationRef, ComponentInstanceMap>();

  /**
   * Register style components. Each component is registered at most once.
   *
   * @param components Component classes
   * @param options Options object
   * @returns Component instance references
   */
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

  /**
   * Gets the component instance map for an application ref.
   * The map is created if it doesn't already exist and
   * is registered to cleanup when the application is destroyed.
   *
   * @param appRef Application reference
   * @returns A component instance map
   */
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

  /**
   * Gets or creates a component instance, adding it to the provided instance map.
   *
   * @param component Component class
   * @param instanceMap Instance map to check
   * @param environmentInjector The environment injector used when creating a new instance
   * @returns A component ref to the existing or newly created instance
   */
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
