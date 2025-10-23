import * as i0 from '@angular/core';
import { assertInInjectionContext, inject, Injector, runInInjectionContext, ApplicationRef, EnvironmentInjector, createComponent, Injectable, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';

/**
 * Register style components. Each component is registered at most once.
 * Must be called in an injection context or pass an injector in the options.
 *
 * @param components Component classes
 * @param options Additional options
 * @returns A component ref for each class
 */
function registerStyleComponents(components, options) {
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
class StyleComponentManagerService {
    constructor() {
        /** Component instance registry */
        this.registry = new Map();
    }
    /**
     * Register style components. Each component is registered at most once.
     *
     * @param components Component classes
     * @param options Options object
     * @returns Component instance references
     */
    registerStyleComponents(components, options) {
        return runInInjectionContext(options.injector, () => {
            const instanceMap = this.getInstanceMap(inject(ApplicationRef));
            const environmentInjector = inject(EnvironmentInjector);
            return components.map((component) => this.getInstance(component, instanceMap, environmentInjector));
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
    getInstanceMap(appRef) {
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
    getInstance(component, instanceMap, environmentInjector) {
        let instance = instanceMap.get(component);
        if (!instance) {
            instance = createComponent(component, { environmentInjector });
            instanceMap.set(component, instance);
        }
        return instance;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: StyleComponentManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: StyleComponentManagerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: StyleComponentManagerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Provide style components that are registered on application initialization.
 *
 * @param components Component classes
 * @returns Environment provider
 */
function provideStyleComponents(...components) {
    return makeEnvironmentProviders([
        provideAppInitializer(() => {
            const injector = inject(Injector);
            const manager = inject(StyleComponentManagerService);
            manager.registerStyleComponents(components, { injector });
        }),
    ]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { StyleComponentManagerService, provideStyleComponents, registerStyleComponents };
//# sourceMappingURL=hra-ui-cdk-styling.mjs.map
