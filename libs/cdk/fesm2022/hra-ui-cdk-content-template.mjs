import { coerceElement, coerceArray } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { InjectionToken, makeEnvironmentProviders, inject, Injectable, RendererStyleFlags2, input, ViewContainerRef, Renderer2, ErrorHandler, effect, Injector, reflectComponentType, Directive } from '@angular/core';
import { findOrThrow } from '@hra-ui/common/array-util';
import * as z from 'zod';

/**
 * Injection token for providing multiple content template controllers.
 * Controllers can be registered globally using the provideContentTemplateControllers function.
 */
const CONTENT_TEMPLATE_CONTROLLERS = new InjectionToken('Content Template Controllers');
/**
 * Function to provide multiple content template controllers globally.
 * This allows the ContentTemplateControllerRegistryService to access and manage these controllers.
 *
 * @param controllers Array of controller constructors to register
 * @returns EnvironmentProviders for the provided controllers
 */
function provideContentTemplateControllers(controllers) {
    return makeEnvironmentProviders([
        {
            provide: CONTENT_TEMPLATE_CONTROLLERS,
            useValue: controllers,
            multi: true,
        },
    ]);
}
/** Content template controller registry service  */
class ContentTemplateControllerRegistryService {
    /**
     * Initialize the service with globally provided content template controllers.
     */
    constructor() {
        /** Registered content template controllers */
        this.controllers = new Map();
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
    registerController(id, controller) {
        this.controllers.set(id, controller);
    }
    /**
     * Retrieves a content template controller by its ID.
     * If the controller does not exist, it returns undefined.
     *
     * @param id Unique identifier for the controller
     * @returns The controller constructor or undefined if not found
     */
    getController(id) {
        return this.controllers.get(id);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateControllerRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateControllerRegistryService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateControllerRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/** Provider token for content template definitions */
const CONTENT_TEMPLATE_DEFS = new InjectionToken('Content Template Defs');
/**
 * Adds multiple content template definitions globally
 *
 * @param defs Definitions to register
 */
function provideContentTemplateDefs(defs) {
    return makeEnvironmentProviders([
        {
            provide: CONTENT_TEMPLATE_DEFS,
            useValue: defs,
            multi: true,
        },
    ]);
}
/** Content template definition registry service */
class ContentTemplateDefRegistryService {
    /** Initialize the service with globally provided definitions */
    constructor() {
        /** Registered definitions */
        this.defs = new Map();
        const defs = inject(CONTENT_TEMPLATE_DEFS, { optional: true }) ?? [];
        for (const def of defs.flat(1)) {
            this.registerDef(def);
        }
    }
    /**
     * Registers one or more content template definitions
     *
     * @param defs New definitions
     */
    registerDef(def) {
        const tag = def.spec.shape.component.value;
        this.defs.set(tag, def);
    }
    /**
     * Get a content template definition for the specified component tag
     *
     * @param tag Definition tag
     * @returns The definition for tag or undefined if it does not exist
     */
    getDef(tag) {
        return this.defs.get(tag);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateDefRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateDefRegistryService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateDefRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/**
 * Iterates over a set of html classes.
 * Classes can be specified using a string, an array of strings, or
 * an object with class names as keys and the class name is only
 * included if its value is truthy.
 *
 * @param classes Set of html classes
 * @yields Each class name
 */
function* classIter(classes) {
    if (!classes) {
        return;
    }
    else if (typeof classes === 'string') {
        classes = classes.split(/\s+/g);
    }
    if (Array.isArray(classes)) {
        yield* classes.filter((cls) => cls !== '');
        return;
    }
    for (const [cls, value] of Object.entries(classes)) {
        if (value && cls !== '') {
            yield cls;
        }
    }
}
/**
 * Iterates over a set of css styles.
 * Styles can be specified using a string or an object of styles and their values.
 *
 * @param styles Set of css styles
 * @yields Each style along with its value and flags
 */
function* styleIter(styles) {
    if (!styles) {
        return;
    }
    for (const [style, value] of styleEntries(styles)) {
        let val = String(value).trim();
        let flags = RendererStyleFlags2.DashCase;
        if (val.endsWith('!important')) {
            flags &= RendererStyleFlags2.Important;
            val = val.slice(0, -10);
        }
        yield [style, val, flags];
    }
}
/**
 * Iterates over a set of css styles yielding the key and value.
 * Each value can include an `!important` flag.
 *
 * @param styles Set of css styles
 * @yields Each style key/value pair
 */
function* styleEntries(styles) {
    if (typeof styles !== 'string') {
        yield* Object.entries(styles);
        return;
    }
    for (const item of styles.split(';')) {
        yield item.split(':', 1);
    }
}

/**
 * Creates an error for definition lookup failures
 *
 * @param tag Component tag
 * @returns A new error
 */
function getDefinitionLookupError(tag) {
    return new Error(`No component definition for ${tag}`);
}
/**
 * Creates an error for component reflection failures
 *
 * @param tag Component tag
 * @returns A new error
 */
function getComponentReflectionError(tag) {
    return new Error(`Unable to retrieve runtime information for ${tag}`);
}
/** A structural directive that renders a content template component */
class ContentTemplateOutletDirective {
    /** Initializes the outlet */
    constructor() {
        /** Content template data */
        this.data = input.required(...(ngDevMode ? [{ debugName: "data", alias: 'hraContentTemplateOutlet' }] : [{ alias: 'hraContentTemplateOutlet' }]));
        /** View container */
        this.viewContainerRef = inject(ViewContainerRef);
        /** Renderer */
        this.renderer = inject(Renderer2);
        /** Error handler */
        this.errorHandler = inject(ErrorHandler);
        /** Content template definitions registry */
        this.defRegistry = inject(ContentTemplateDefRegistryService);
        /** Content template controller registry */
        this.controllerRegistry = inject(ContentTemplateControllerRegistryService);
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
    render(data) {
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
            const projectableNodes = this.renderProjectedContent(selectors, projectedProperties, parsedData);
            const ref = this.viewContainerRef.createComponent(component, { injector, projectableNodes });
            const el = coerceElement(ref.location);
            this.bindClasses(el, parsedData['classes']);
            this.bindStyles(el, parsedData['styles']);
            this.bindInputs(ref, inputs, parsedData);
            this.attachControllers(ref, controllers, parsedData);
            return ref;
        }
        catch (error) {
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
    getDefinition(tag) {
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
    reflectComponent(tag, component) {
        const mirror = reflectComponentType(component);
        if (mirror) {
            return mirror;
        }
        throw getComponentReflectionError(tag);
    }
    getControllers(controllers) {
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
    renderProjectedContent(selectors, projectedProperties, data) {
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
    renderProjectedContentForSelector(selector, projectedProperties, data) {
        const prop = projectedProperties[selector];
        const templates = (prop && data[prop]);
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
    bindClasses(el, classes) {
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
    bindStyles(el, styles) {
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
    bindInputs(ref, inputs, data) {
        for (const key of inputs) {
            if (key in data) {
                ref.setInput(key, data[key]);
            }
        }
    }
    attachControllers(ref, controllers, data) {
        if (data['controllers'] === undefined) {
            return;
        }
        for (const controller of controllers) {
            const options = findOrThrow(data['controllers'], (o) => o.id === controller.id);
            const instance = ref.injector.get(controller);
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
    handleError(data, error) {
        this.errorHandler.handleError(error);
        // TODO
        throw new Error('TODO render error component instead', { cause: error });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateOutletDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.11", type: ContentTemplateOutletDirective, isStandalone: true, selector: "[hraContentTemplateOutlet]", inputs: { data: { classPropertyName: "data", publicName: "hraContentTemplateOutlet", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ContentTemplateOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraContentTemplateOutlet]',
                }]
        }], ctorParameters: () => [], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraContentTemplateOutlet", required: true }] }] } });

/** Extra css classes for a content template component  */
const ClassesSchema = z.union([z.string(), z.string().array(), z.record(z.string(), z.any())]);
/** Extra css styles for a content template component */
const StylesSchema = z.union([z.string(), z.record(z.string(), z.any())]);
/** Schema for a content template controller */
const ControllerSchema = z.object({ id: z.string() }).loose();
/** Base schema for content template components */
const ContentTemplateSchema = z.object({
    component: z.string(),
    classes: ClassesSchema.optional(),
    styles: StylesSchema.optional(),
    controllers: ControllerSchema.array().optional(),
});
/** Content template with additional properties */
const ContentTemplateWithPropsSchema = ContentTemplateSchema.loose();
/** All content template specs */
let contentTemplateSpecs = undefined;
/** Schema for any content template */
const AnyContentTemplateSchema = z.lazy(() => {
    if (contentTemplateSpecs === undefined) {
        return ContentTemplateWithPropsSchema;
    }
    return z.discriminatedUnion('component', contentTemplateSpecs);
});
/** Schema for projected content */
const ProjectedContentTemplateSchema = z.union([AnyContentTemplateSchema, AnyContentTemplateSchema.array()]);
/**
 * Sets the content template specs used when validating with `AnyContentTemplateSchema`
 *
 * @param specs New content template specs
 */
function setContentTemplateSpecs(specs) {
    contentTemplateSpecs = specs;
}

/**
 * Generated bundle index. Do not edit.
 */

export { AnyContentTemplateSchema, ClassesSchema, ContentTemplateControllerRegistryService, ContentTemplateDefRegistryService, ContentTemplateOutletDirective, ContentTemplateSchema, ControllerSchema, ProjectedContentTemplateSchema, StylesSchema, provideContentTemplateControllers, provideContentTemplateDefs, setContentTemplateSpecs };
//# sourceMappingURL=hra-ui-cdk-content-template.mjs.map
