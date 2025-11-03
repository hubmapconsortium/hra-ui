import * as _angular_core from '@angular/core';
import { Signal, ElementRef, ProviderToken, Provider } from '@angular/core';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Page section instance */
interface PageSectionInstance {
    /** Section label */
    tagline: Signal<string>;
    /** Section <hx> level */
    level: Signal<number>;
    /** Section anchor */
    anchor: Signal<string | undefined>;
    /** Section element */
    elementRef: Signal<ElementRef<Element>>;
}
/** Service that tracks all page sections on a page */
declare class PageSectionService {
    /** All sections (mutable signal) */
    private readonly _sections;
    /** All sections */
    readonly sections: Signal<PageSectionInstance[]>;
    /** All sections that have an anchor id */
    readonly linkableSections: Signal<PageSectionInstance[]>;
    /** All sections with an anchor id sorted in dom order */
    readonly sortedSections: Signal<PageSectionInstance[]>;
    /**
     * Adds a section to be tracked
     *
     * @param section New section
     */
    addSection(section: PageSectionInstance): void;
    /**
     * Removes a section and stops tracking changes to it
     *
     * @param section Existing section
     */
    removeSection(section: PageSectionInstance): void;
    /**
     * Filters sections that have an anchor id
     *
     * @param sections All sections
     * @returns Sections with an anchor id
     */
    private filterLinkableSections;
    /**
     * Sorts sections by the order in the dom.
     *
     * @param sections Unsorted sections
     * @returns Sorted sections
     */
    private sortSectionsByDomPosition;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PageSectionService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<PageSectionService>;
}

/**
 * A labeled section of the page
 */
declare class PageSectionComponent implements PageSectionInstance {
    /** Title for the section */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Level of <hx> element to use for the header */
    readonly level: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Icons to display as part of the label */
    readonly icons: _angular_core.InputSignal<string | {
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    } | (string | {
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    })[] | undefined>;
    /** Anchor id for the section */
    readonly anchor: _angular_core.InputSignal<string | undefined>;
    /** Breadcrumbs to display above the label */
    readonly breadcrumbs: _angular_core.InputSignal<BreadcrumbItem[] | undefined>;
    /** Date to display below the label */
    readonly date: _angular_core.InputSignal<string | undefined>;
    /** Tags/labels to display below the date */
    readonly tags: _angular_core.InputSignal<string[]>;
    /** Reference to the section element */
    readonly elementRef: _angular_core.Signal<ElementRef<any>>;
    /** Registers this section with the PageSectionService if available */
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PageSectionComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PageSectionComponent, "hra-page-section", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "level": { "alias": "level"; "required": false; "isSignal": true; }; "icons": { "alias": "icons"; "required": false; "isSignal": true; }; "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "breadcrumbs": { "alias": "breadcrumbs"; "required": false; "isSignal": true; }; "date": { "alias": "date"; "required": false; "isSignal": true; }; "tags": { "alias": "tags"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/** PageSection content template definition */
declare const PageSectionDef: AnyContentTemplateDef;

/** Options to customize the PageSectionActivationService */
interface PageSectionActivationOptions {
    /** Root element either as a css selector or a provider token */
    root?: string | ProviderToken<Element | ElementRef<Element>>;
    /** Root margin used when creating an IntersectionObserver */
    rootMargin?: string;
    /** Threshold used when creating an IntersectionObserver */
    threshold?: number | number[];
}
/** Service that tracks the currently active section */
declare class PageSectionActivationService {
    /** Creation options */
    private readonly options;
    /** All sections with an anchor id */
    private readonly sections;
    /** Set of elements that are currently observer */
    private readonly observedElements;
    /** Currently active element */
    private readonly activeElement;
    /** Section intersection observer */
    private readonly observer;
    /** Currently active section */
    readonly activeSection: _angular_core.Signal<PageSectionInstance | undefined>;
    /** Watches for changes to the sections */
    constructor();
    /**
     * Activates a specific section
     *
     * @param section Section to set as the active section
     */
    activate(section: PageSectionInstance): void;
    /**
     * Creates the intersection observer used to determine when a section is active
     *
     * @returns An intersection observer or undefined if not available
     */
    private createObserver;
    /**
     * Resolves the root element from the user options
     *
     * @returns The resolved root element or null/undefined
     */
    private resolveRootElement;
    /**
     * Handles an update to intersections for page sections
     *
     * @param entries Intersection entries
     */
    private handleIntersection;
    /**
     * Creates a diff between the current set of observed elements and
     * a list of new elements
     *
     * @param elements New elements
     * @returns A diff
     */
    private diffObservedElements;
    /**
     * Applies an element diff. Unobserves removed elements and observes newly added ones
     * while also updating the current set of observed elements.
     *
     * @param diff Element diff
     */
    private applyObservedElementsDiff;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PageSectionActivationService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<PageSectionActivationService>;
}

/**
 * Provides the services required for page section tracking.
 * Should be provided inside a component - not in root!
 *
 * @param options Page section activation options
 * @returns Component providers
 */
declare function providePageSectionNavigation(options?: PageSectionActivationOptions): Provider[];

/** Schema structure of a Page Section */
declare const PageSectionSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"PageSection">;
    tagline: z.ZodString;
    level: z.ZodOptional<z.ZodNumber>;
    icons: z.ZodOptional<z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        svgIcon: z.ZodOptional<z.ZodString>;
        fontIcon: z.ZodOptional<z.ZodString>;
        fontSet: z.ZodOptional<z.ZodString>;
        inline: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        svgIcon: z.ZodOptional<z.ZodString>;
        fontIcon: z.ZodOptional<z.ZodString>;
        fontSet: z.ZodOptional<z.ZodString>;
        inline: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>>]>>;
    anchor: z.ZodOptional<z.ZodString>;
    content: z.ZodUnion<readonly [z.ZodType<{
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
}, z.core.$strip>;

export { PageSectionActivationService, PageSectionComponent, PageSectionDef, PageSectionSchema, PageSectionService, providePageSectionNavigation };
export type { PageSectionActivationOptions, PageSectionInstance };
