import * as i0 from '@angular/core';
import { Signal, Type, EnvironmentProviders, ElementRef } from '@angular/core';
import { z, ZodLiteral, ZodTypeAny, ZodSafeParseResult } from 'zod';
import * as _angular_platform_browser from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

/** Type representing any DashboardComponent specification */
type DashboardComponentAnySpec = {
    type: string;
};
/** Type representing the definition of any DashboardComponent */
type DashboardComponentAnyDef = z.ZodObject<{
    type: ZodLiteral<string>;
}>;
/** Extracts the definition type from a DashboardComponent class */
type DashboardComponentDefFor<ClassT> = ClassT extends {
    def: infer DefT extends ZodTypeAny;
} ? DefT : never;
/** Infers the specification type from a DashboardComponent class */
type DashboardComponentSpecFor<ClassT> = z.infer<DashboardComponentDefFor<ClassT>>;
/** Type representing any DashboardComponent class */
type DashboardComponentAnyClass = DashboardComponentClass<DashboardComponentAnyDef, DashboardComponent<any>>;
/** Type representing any DashboardComponent instance */
type DashboardComponentAny = DashboardComponent<DashboardComponentAnyClass>;
/** Interface representing the structure of a DashboardComponent class */
interface DashboardComponentClass<DefT extends DashboardComponentAnyDef, InstanceT extends DashboardComponent<DashboardComponentClass<DefT, InstanceT>>> extends Type<InstanceT> {
    /** Definition of the DashboardComponent */
    readonly def: DefT;
}
/** Interface representing the structure of a DashboardComponent instance */
interface DashboardComponent<ClassT extends DashboardComponentAnyClass> {
    /** Specification signal for the DashboardComponent */
    readonly spec: Signal<DashboardComponentSpecFor<ClassT>>;
}
/** Zod schema for validating any DashboardComponent definition */
declare const DASHBOARD_COMPONENT_ANY_DEF: z.ZodObject<{
    type: z.ZodString;
}, z.core.$loose>;
/** Retrieves the definition from a given DashboardComponent class */
declare function defFor(cls: DashboardComponentAnyClass): DashboardComponentAnyDef;
/** Retrieves the type from a given DashboardComponent class */
declare function typeFor(cls: DashboardComponentAnyClass): string;
/** Validates the given specification against the definition of a DashboardComponent class */
declare function validateSpec(cls: DashboardComponentAnyClass, spec: DashboardComponentAnySpec): DashboardComponentAnySpec;
/** Safely validates the given specification against the definition of a DashboardComponent class */
declare function safeValidateSpec(cls: DashboardComponentAnyClass, spec: DashboardComponentAnySpec): ZodSafeParseResult<DashboardComponentAnySpec>;

/**
 * Dashboard outlet directive
 */
declare class DashboardComponentOutletDirective {
    /** Input for dashboard outlet directive */
    readonly hraDashboardComponentOutlet: i0.InputSignal<DashboardComponentAnySpec | undefined>;
    /** Reference to the view container */
    private readonly viewContainerRef;
    /** Reference to the dashboard component registry service */
    private readonly registry;
    /** Computed value for the component and its validated specification */
    private readonly componentWithSpec;
    /** Computed value for the component class */
    private readonly component;
    /** Computed value for the component reference created within the view container */
    private readonly componentRef;
    /** Effect to bind inputs to the created component reference */
    protected readonly inputBindingsRef: i0.EffectRef;
    static ɵfac: i0.ɵɵFactoryDeclaration<DashboardComponentOutletDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DashboardComponentOutletDirective, "[hraDashboardComponentOutlet]", never, { "hraDashboardComponentOutlet": { "alias": "hraDashboardComponentOutlet"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Dashboard component outlet component */
declare class DashboardComponentOutletComponent {
    /** Input for dashboard component outlet component */
    readonly spec: i0.InputSignal<DashboardComponentAnySpec | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DashboardComponentOutletComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DashboardComponentOutletComponent, "hra-dashboard-component-outlet", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Provides the dashboard components as environment providers
 * @param components - Array of dashboard component classes
 * @returns EnvironmentProviders - The created environment providers
 */
declare function provideDashboardComponents(components: DashboardComponentAnyClass[]): EnvironmentProviders;

/**
 * Dashboard Index Component
 */
declare class DashboardIndexComponent implements DashboardComponent<typeof DashboardIndexComponent> {
    /** Input type for Dashboard Index Component */
    static readonly def: z.ZodObject<{
        type: z.ZodLiteral<"DashboardIndex">;
        title: z.ZodString;
        description: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            route: z.ZodString;
            background: z.ZodString;
            url: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    /** Dashboard Index Component input */
    readonly spec: i0.InputSignal<{
        type: "DashboardIndex";
        title: string;
        description: string;
        items: {
            title: string;
            route: string;
            background: string;
            url: string;
        }[];
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DashboardIndexComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DashboardIndexComponent, "hra-dashboard-index", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Dashboard Layout component
 */
declare class DashboardLayoutComponent implements DashboardComponent<typeof DashboardLayoutComponent> {
    /** Input type for Dashboard Layout Component */
    static readonly def: z.ZodObject<{
        type: z.ZodLiteral<"Dashboard">;
        title: z.ZodString;
        description: z.ZodString;
        link: z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            label: z.ZodString;
        }, z.core.$strip>;
        items: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
        }, z.core.$loose>>;
    }, z.core.$strip>;
    /** Input for dashboard layout component */
    readonly spec: i0.InputSignal<{
        type: "Dashboard";
        title: string;
        description: string;
        link: {
            url: string;
            label: string;
            type?: string | undefined;
        };
        items: {
            [x: string]: unknown;
            type: string;
        }[];
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DashboardLayoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DashboardLayoutComponent, "hra-dashboard-layout", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Grid Container Component. Renders items based on number of columns provided */
declare class GridContainerComponent implements DashboardComponent<typeof GridContainerComponent> {
    /** Input type for Grid container component */
    static readonly def: z.ZodObject<{
        type: z.ZodLiteral<"GridContainer">;
        columns: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
        }, z.core.$loose>>;
    }, z.core.$strip>;
    /** Input for grid container component */
    readonly spec: i0.InputSignal<{
        type: "GridContainer";
        columns: number;
        items: {
            [x: string]: unknown;
            type: string;
        }[];
    }>;
    /** Style for grid container based on number of columns */
    readonly columns: i0.Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridContainerComponent, "hra-grid-container", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Image container component, renders image inside a card */
declare class ImageContainerComponent implements DashboardComponent<typeof ImageContainerComponent> {
    /** Input type for Image container component */
    static readonly def: z.ZodObject<{
        title: z.ZodString;
        tooltip: z.ZodString;
        type: z.ZodLiteral<"ImageContainer">;
        imageUrl: z.ZodString;
        aspectRatio: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>;
    /** Input for image container component */
    readonly spec: i0.InputSignal<{
        title: string;
        tooltip: string;
        type: "ImageContainer";
        imageUrl: string;
        aspectRatio: string;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageContainerComponent, "hra-image-container", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Metrics card data */
type MetricsCard = z.infer<typeof METRICS_CARD_DEF>;
/** Metrics card definition */
declare const METRICS_CARD_DEF: z.ZodObject<{
    title: z.ZodString;
    tooltip: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        count: z.ZodNumber;
        unit: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Metrics Container Component, renders metric cards inside the container */
declare class MetricsContainerComponent implements DashboardComponent<typeof MetricsContainerComponent> {
    /** Input type for Metrics Container Component */
    static readonly def: z.ZodObject<{
        type: z.ZodLiteral<"MetricsContainer">;
        items: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            tooltip: z.ZodString;
            items: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                count: z.ZodNumber;
                unit: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    /** Input for metrics container component */
    readonly spec: i0.InputSignal<{
        type: "MetricsContainer";
        items: {
            title: string;
            tooltip: string;
            items: {
                label: string;
                count: number;
                unit?: string | undefined;
            }[];
        }[];
    }>;
    /** Computes the boolean array if a card needs to be wide */
    private readonly layout;
    /** Returns if card needs to be wide based on number of items inside it */
    isWideCard(card: MetricsCard): boolean;
    /** Returns if card is wide based on previously computed array */
    isWideCardAt(index: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetricsContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MetricsContainerComponent, "hra-dashboard-metrics-container", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Vega Container Component, embeds a vega lite visualization inside a card */
declare class VegaContainerComponent implements DashboardComponent<typeof VegaContainerComponent> {
    /** Input definition for vega container component */
    static readonly def: z.ZodObject<{
        title: z.ZodString;
        tooltip: z.ZodString;
        type: z.ZodLiteral<"VegaContainer">;
        specUrl: z.ZodString;
        aspectRatio: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>;
    /** Input for vega container component */
    readonly spec: i0.InputSignal<{
        title: string;
        tooltip: string;
        type: "VegaContainer";
        specUrl: string;
        aspectRatio: string;
    }>;
    /** Reference to the element where visualization is to be embedded */
    protected readonly visRef: i0.Signal<ElementRef<any>>;
    /** Reference to the DOCUMENT Injection Token */
    private readonly document;
    /** Method to ensure that the fonts load */
    private ensureFontsLoaded;
    /** Embeds the vega lite visualization to the element */
    protected readonly embedRef: i0.EffectRef;
    static ɵfac: i0.ɵɵFactoryDeclaration<VegaContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VegaContainerComponent, "hra-vega-container", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Long card data */
type LongCardSpec = z.infer<typeof LONG_CARD_DEF>;
/** Zod Object definition for the long card */
declare const LONG_CARD_DEF: z.ZodObject<{
    title: z.ZodString;
    route: z.ZodString;
    background: z.ZodString;
}, z.core.$strip>;
/**
 * Long Card Component
 */
declare class LongCardComponent {
    /** Long card component input */
    readonly spec: i0.InputSignal<{
        title: string;
        route: string;
        background: string;
    }>;
    /** Router */
    private readonly router;
    /** Long card component click event */
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LongCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LongCardComponent, "hra-long-card", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Iframe Container Component, renders html document inside the container  */
declare class IframeContainerComponent {
    /** Input type for Iframe container component */
    static readonly def: z.ZodObject<{
        title: z.ZodString;
        tooltip: z.ZodString;
        type: z.ZodLiteral<"IFrameContainer">;
        iframeUrl: z.ZodString;
        aspectRatio: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>;
    /** Input for Iframe container component */
    readonly spec: i0.InputSignal<{
        title: string;
        tooltip: string;
        type: "IFrameContainer";
        iframeUrl: string;
        aspectRatio: string;
    }>;
    /** DomSanitizer instance */
    protected readonly sanitizer: DomSanitizer;
    /** Computed safe url of iframe source url */
    protected iframeUrl: i0.Signal<_angular_platform_browser.SafeResourceUrl>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IframeContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IframeContainerComponent, "hra-iframe-container", never, { "spec": { "alias": "spec"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { DASHBOARD_COMPONENT_ANY_DEF, DashboardComponentOutletComponent, DashboardComponentOutletDirective, DashboardIndexComponent, DashboardLayoutComponent, GridContainerComponent, IframeContainerComponent, ImageContainerComponent, LONG_CARD_DEF, LongCardComponent, METRICS_CARD_DEF, MetricsContainerComponent, VegaContainerComponent, defFor, provideDashboardComponents, safeValidateSpec, typeFor, validateSpec };
export type { DashboardComponent, DashboardComponentAny, DashboardComponentAnyClass, DashboardComponentAnyDef, DashboardComponentAnySpec, DashboardComponentClass, DashboardComponentDefFor, DashboardComponentSpecFor, LongCardSpec, MetricsCard };
