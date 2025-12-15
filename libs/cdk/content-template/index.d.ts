import * as i0 from '@angular/core';
import { ComponentRef, EnvironmentProviders, Type } from '@angular/core';
import * as z from 'zod';

/** A structural directive that renders a content template component */
declare class ContentTemplateOutletDirective {
    /** Content template data */
    readonly data: i0.InputSignal<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    } | undefined>;
    /** View container */
    private readonly viewContainerRef;
    /** Renderer */
    private readonly renderer;
    /** Error handler */
    private readonly errorHandler;
    /** Content template definitions registry */
    private readonly defRegistry;
    /** Content template controller registry */
    private readonly controllerRegistry;
    /** Initializes the outlet */
    constructor();
    /**
     * Renders the content template for the data
     *
     * @param data Data to render into a content template component
     * @returns A reference to the rendered component
     */
    private render;
    /**
     * Lookup a component definition
     *
     * @param tag Component tag
     * @returns Definition object
     * @throws If there is no definition for the tag
     */
    private getDefinition;
    /**
     * Retrieve metadata about a component
     *
     * @param tag Component tag
     * @param component Component class
     * @returns A component mirror
     * @throws If there is no metadata for the component
     */
    private reflectComponent;
    private getControllers;
    /**
     * Renders projected content
     *
     * @param selectors ng-content selectors
     * @param projectedProperties Mapping from selector to a property in the data
     * @param data Component data
     * @returns A nested list of nodes for each selector
     */
    private renderProjectedContent;
    /**
     * Renders projected content for a specific selector
     *
     * @param selector Selector string
     * @param projectedProperties Mapping from selector to a property in the data
     * @param data Component data
     * @returns A list of nodes
     */
    private renderProjectedContentForSelector;
    /**
     * Adds classes to the component's element
     *
     * @param el Reference to the element
     * @param classes Html classes
     */
    private bindClasses;
    /**
     * Sets inline styles on the component's element
     *
     * @param el Reference to the element
     * @param styles Css styles
     */
    private bindStyles;
    /**
     * Binds input values from the data to the component
     *
     * @param ref Reference to the component
     * @param inputs Input names
     * @param data Component data
     */
    private bindInputs;
    private attachControllers;
    /**
     * Handles errors thrown during rendering
     *
     * @param data Component data
     * @param error Caught error
     * @returns A component displaying the error
     */
    private handleError;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentTemplateOutletDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ContentTemplateOutletDirective, "[hraContentTemplateOutlet]", never, { "data": { "alias": "hraContentTemplateOutlet"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Class declaration */
type Classes = z.infer<typeof ClassesSchema>;
/** Extra css classes for a content template component  */
declare const ClassesSchema: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>;
/** Css style declaration */
type Styles = z.infer<typeof StylesSchema>;
/** Extra css styles for a content template component */
declare const StylesSchema: z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>;
/** Controller declaration */
type Controller = z.infer<typeof ControllerSchema>;
/** Schema for a content template controller */
declare const ControllerSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$loose>;
/** Base schema for content template components */
declare const ContentTemplateSchema: z.ZodObject<{
    component: z.ZodLiteral<string>;
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
}, z.core.$strip>;
/** Content template with additional properties */
declare const ContentTemplateWithPropsSchema: z.ZodObject<{
    component: z.ZodLiteral<string>;
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
}, z.core.$loose>;
/** Data type for a content template */
type AnyContentTemplate = z.infer<typeof ContentTemplateWithPropsSchema>;
/** Type of any content template zod specs */
type AnyContentTemplateSpec = z.ZodObject<(typeof ContentTemplateSchema)['shape'], any>;
/** Schema for any content template */
declare const AnyContentTemplateSchema: z.ZodType<AnyContentTemplate>;
/** Projected template content */
type ProjectedContentTemplate = z.infer<typeof ProjectedContentTemplateSchema>;
/** Schema for projected content */
declare const ProjectedContentTemplateSchema: z.ZodUnion<readonly [z.ZodType<{
    [x: string]: unknown;
    component: string;
    classes?: string | Record<string, any> | string[] | undefined;
    styles?: string | Record<string, any> | undefined;
    controllers?: {
        [x: string]: unknown;
        id: string;
    }[] | undefined;
}, unknown, z.core.$ZodTypeInternals<{
    [x: string]: unknown;
    component: string;
    classes?: string | Record<string, any> | string[] | undefined;
    styles?: string | Record<string, any> | undefined;
    controllers?: {
        [x: string]: unknown;
        id: string;
    }[] | undefined;
}, unknown>>, z.ZodArray<z.ZodType<{
    [x: string]: unknown;
    component: string;
    classes?: string | Record<string, any> | string[] | undefined;
    styles?: string | Record<string, any> | undefined;
    controllers?: {
        [x: string]: unknown;
        id: string;
    }[] | undefined;
}, unknown, z.core.$ZodTypeInternals<{
    [x: string]: unknown;
    component: string;
    classes?: string | Record<string, any> | string[] | undefined;
    styles?: string | Record<string, any> | undefined;
    controllers?: {
        [x: string]: unknown;
        id: string;
    }[] | undefined;
}, unknown>>>]>;
/**
 * Sets the content template specs used when validating with `AnyContentTemplateSchema`
 *
 * @param specs New content template specs
 */
declare function setContentTemplateSpecs(specs: [AnyContentTemplateSpec, ...AnyContentTemplateSpec[]]): void;

/**
 * Interface for content template controllers that manage component instances
 * and their interaction with the content template system.
 */
interface ContentTemplateController {
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
interface ContentTemplateControllerConstructor {
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
 * Function to provide multiple content template controllers globally.
 * This allows the ContentTemplateControllerRegistryService to access and manage these controllers.
 *
 * @param controllers Array of controller constructors to register
 * @returns EnvironmentProviders for the provided controllers
 */
declare function provideContentTemplateControllers(controllers: ContentTemplateControllerConstructor[]): EnvironmentProviders;
/** Content template controller registry service  */
declare class ContentTemplateControllerRegistryService {
    /** Registered content template controllers */
    private readonly controllers;
    /**
     * Initialize the service with globally provided content template controllers.
     */
    constructor();
    /**
     * Registers a content template controller by its ID.
     * This allows the controller to be retrieved later using its ID.
     *
     * @param id Unique identifier for the controller
     * @param controller The controller constructor to register
     */
    registerController(id: string, controller: ContentTemplateControllerConstructor): void;
    /**
     * Retrieves a content template controller by its ID.
     * If the controller does not exist, it returns undefined.
     *
     * @param id Unique identifier for the controller
     * @returns The controller constructor or undefined if not found
     */
    getController(id: string): ContentTemplateControllerConstructor | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentTemplateControllerRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentTemplateControllerRegistryService>;
}

/** A content template definition */
interface ContentTemplateDef<T> {
    /** Component class */
    component: Type<T>;
    /** Data spec */
    spec: AnyContentTemplateSpec;
    /** Mapping from ng-content selector to property to project as content */
    projectedProperties?: Record<string, string>;
}
/** Any content template defination */
type AnyContentTemplateDef = ContentTemplateDef<any>;

/**
 * Adds multiple content template definitions globally
 *
 * @param defs Definitions to register
 */
declare function provideContentTemplateDefs(defs: AnyContentTemplateDef[]): EnvironmentProviders;
/** Content template definition registry service */
declare class ContentTemplateDefRegistryService {
    /** Registered definitions */
    private readonly defs;
    /** Initialize the service with globally provided definitions */
    constructor();
    /**
     * Registers one or more content template definitions
     *
     * @param defs New definitions
     */
    registerDef(def: AnyContentTemplateDef): void;
    /**
     * Get a content template definition for the specified component tag
     *
     * @param tag Definition tag
     * @returns The definition for tag or undefined if it does not exist
     */
    getDef(tag: string): AnyContentTemplateDef | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentTemplateDefRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentTemplateDefRegistryService>;
}

export { AnyContentTemplateSchema, ClassesSchema, ContentTemplateControllerRegistryService, ContentTemplateDefRegistryService, ContentTemplateOutletDirective, ContentTemplateSchema, ControllerSchema, ProjectedContentTemplateSchema, StylesSchema, provideContentTemplateControllers, provideContentTemplateDefs, setContentTemplateSpecs };
export type { AnyContentTemplate, AnyContentTemplateDef, AnyContentTemplateSpec, Classes, ContentTemplateController, ContentTemplateControllerConstructor, ContentTemplateDef, Controller, ProjectedContentTemplate, Styles };
