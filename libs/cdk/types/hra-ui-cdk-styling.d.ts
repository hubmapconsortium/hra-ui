import * as i0 from '@angular/core';
import { Type, EnvironmentProviders, Injector, ComponentRef } from '@angular/core';

/**
 * Provide style components that are registered on application initialization.
 *
 * @param components Component classes
 * @returns Environment provider
 */
declare function provideStyleComponents<T>(...components: Type<T>[]): EnvironmentProviders;

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
declare function registerStyleComponents<const Types extends Type<unknown>[]>(components: Types, options?: {
    injector?: Injector;
}): ComponentRefsFromTypes<Types>;
/**
 * Manager of global style components
 */
declare class StyleComponentManagerService {
    /** Component instance registry */
    private readonly registry;
    /**
     * Register style components. Each component is registered at most once.
     *
     * @param components Component classes
     * @param options Options object
     * @returns Component instance references
     */
    registerStyleComponents<const Types extends Type<unknown>[]>(components: Types, options: {
        injector: Injector;
    }): ComponentRefsFromTypes<Types>;
    /**
     * Gets the component instance map for an application ref.
     * The map is created if it doesn't already exist and
     * is registered to cleanup when the application is destroyed.
     *
     * @param appRef Application reference
     * @returns A component instance map
     */
    private getInstanceMap;
    /**
     * Gets or creates a component instance, adding it to the provided instance map.
     *
     * @param component Component class
     * @param instanceMap Instance map to check
     * @param environmentInjector The environment injector used when creating a new instance
     * @returns A component ref to the existing or newly created instance
     */
    private getInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<StyleComponentManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StyleComponentManagerService>;
}

export { StyleComponentManagerService, provideStyleComponents, registerStyleComponents };
