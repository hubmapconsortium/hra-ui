import { z } from 'zod';
import * as i0 from '@angular/core';
import { InjectionToken, makeEnvironmentProviders, inject, Injectable, input, ViewContainerRef, computed, effect, Directive, ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import * as i2$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import * as i2 from '@hra-ui/common';
import { HraCommonModule } from '@hra-ui/common';
import { VisualButtonComponent } from '@hra-ui/design-system/buttons/visual-button';
import * as i1 from '@hra-ui/common/analytics';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i3 from '@angular/material/button';
import * as i4 from '@hra-ui/design-system/buttons/button';
import * as i3$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import embed from 'vega-embed';
import { DomSanitizer } from '@angular/platform-browser';

/** Zod schema for validating any DashboardComponent definition */
const DASHBOARD_COMPONENT_ANY_DEF = z
    .object({
    type: z.string(),
})
    .passthrough();
/** Retrieves the definition from a given DashboardComponent class */
function defFor(cls) {
    return cls.def;
}
/** Retrieves the type from a given DashboardComponent class */
function typeFor(cls) {
    return defFor(cls).shape.type.value;
}
/** Validates the given specification against the definition of a DashboardComponent class */
function validateSpec(cls, spec) {
    return defFor(cls).parse(spec);
}
/** Safely validates the given specification against the definition of a DashboardComponent class */
function safeValidateSpec(cls, spec) {
    return defFor(cls).safeParse(spec);
}

/** Injection token for dashboard components */
const COMPONENTS_TOKEN = new InjectionToken('Dashboard components');
/**
 * Provides the dashboard components as environment providers
 * @param components - Array of dashboard component classes
 * @returns EnvironmentProviders - The created environment providers
 */
function provideDashboardComponents(components) {
    return makeEnvironmentProviders([
        {
            provide: COMPONENTS_TOKEN,
            useValue: components,
            multi: true,
        },
    ]);
}
/**
 * Service to manage and retrieve dashboard components
 */
class DashboardComponentRegistryService {
    constructor() {
        /** Flattens and injects the provided dashboard components */
        this.components = inject(COMPONENTS_TOKEN).flat();
        /** Creates a registry map of component types to component classes */
        this.registry = new Map(this.components.map((component) => [typeFor(component), component]));
    }
    /**
     * Retrieves the component class for the given specification
     * @param spec - The dashboard component specification
     * @returns DashboardComponentAnyClass | undefined - The matching component class or undefined if not found
     */
    componentFor(spec) {
        return this.registry.get(spec.type);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentRegistryService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Dashboard outlet directive
 */
class DashboardComponentOutletDirective {
    constructor() {
        /** Input for dashboard outlet directive */
        this.hraDashboardComponentOutlet = input.required(...(ngDevMode ? [{ debugName: "hraDashboardComponentOutlet" }] : []));
        /** Reference to the view container */
        this.viewContainerRef = inject(ViewContainerRef);
        /** Reference to the dashboard component registry service */
        this.registry = inject(DashboardComponentRegistryService);
        /** Computed value for the component and its validated specification */
        this.componentWithSpec = computed(() => {
            const spec = this.hraDashboardComponentOutlet();
            if (!spec) {
                return undefined;
            }
            const component = this.registry.componentFor(spec);
            if (!component) {
                // TODO log missing component
                console.log('Component Missing', spec);
                return undefined;
            }
            // TODO: consider only validating the spec in dev mode
            const validateResult = safeValidateSpec(component, spec);
            if (!validateResult.success) {
                // TODO improve logging spec errors
                console.log(validateResult.error.issues);
                return undefined;
            }
            return { component, spec: validateResult.data };
        }, ...(ngDevMode ? [{ debugName: "componentWithSpec" }] : []));
        /** Computed value for the component class */
        this.component = computed(() => this.componentWithSpec()?.component, ...(ngDevMode ? [{ debugName: "component" }] : []));
        /** Computed value for the component reference created within the view container */
        this.componentRef = computed(() => {
            const component = this.component();
            if (!component) {
                return undefined;
            }
            this.viewContainerRef.clear();
            return this.viewContainerRef.createComponent(component);
        }, ...(ngDevMode ? [{ debugName: "componentRef" }] : []));
        /** Effect to bind inputs to the created component reference */
        this.inputBindingsRef = effect(() => {
            const componentRef = this.componentRef();
            if (!componentRef) {
                return;
            }
            // Spec is guaranteed to be defined when componentRef is defined
            const spec = this.componentWithSpec().spec;
            componentRef.setInput('spec', spec);
        }, ...(ngDevMode ? [{ debugName: "inputBindingsRef" }] : []));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentOutletDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.9", type: DashboardComponentOutletDirective, isStandalone: true, selector: "[hraDashboardComponentOutlet]", inputs: { hraDashboardComponentOutlet: { classPropertyName: "hraDashboardComponentOutlet", publicName: "hraDashboardComponentOutlet", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraDashboardComponentOutlet]',
                    standalone: true,
                }]
        }], propDecorators: { hraDashboardComponentOutlet: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraDashboardComponentOutlet", required: true }] }] } });

/** Dashboard component outlet component */
class DashboardComponentOutletComponent {
    constructor() {
        /** Input for dashboard component outlet component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentOutletComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: DashboardComponentOutletComponent, isStandalone: true, selector: "hra-dashboard-component-outlet", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: `<ng-container *hraDashboardComponentOutlet="spec()"></ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: DashboardComponentOutletDirective, selector: "[hraDashboardComponentOutlet]", inputs: ["hraDashboardComponentOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardComponentOutletComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-dashboard-component-outlet',
                    template: `<ng-container *hraDashboardComponentOutlet="spec()"></ng-container>`,
                    imports: [DashboardComponentOutletDirective],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Zod Object definition for the long card */
const LONG_CARD_DEF = z.object({
    title: z.string(),
    route: z.string(),
    background: z.string().url(),
});
/**
 * Long Card Component
 */
class LongCardComponent {
    constructor() {
        /** Long card component input */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
        /** Router */
        this.router = inject(Router);
    }
    /** Long card component click event */
    onClick() {
        this.router.navigate(['/', this.spec().route]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: LongCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: LongCardComponent, isStandalone: true, selector: "hra-long-card", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-container hraFeature=\"spec-card\" [hraClickEvent]=\"{ title: spec().title | slugify }\">\n  <hra-visual-button [label]=\"spec().title\" [imageUrl]=\"spec().background\" (cardClick)=\"onClick()\"> </hra-visual-button>\n</ng-container>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: RouterModule }, { kind: "component", type: VisualButtonComponent, selector: "hra-visual-button", inputs: ["label", "imageUrl", "variant", "disabled"], outputs: ["cardClick"] }, { kind: "pipe", type: i2.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: LongCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-long-card', imports: [HraCommonModule, MatIconModule, RouterModule, VisualButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"spec-card\" [hraClickEvent]=\"{ title: spec().title | slugify }\">\n  <hra-visual-button [label]=\"spec().title\" [imageUrl]=\"spec().background\" (cardClick)=\"onClick()\"> </hra-visual-button>\n</ng-container>\n" }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/**
 * Dashboard Index Component
 */
class DashboardIndexComponent {
    constructor() {
        /** Dashboard Index Component input */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
    }
    /** Input type for Dashboard Index Component */
    static { this.def = z.object({
        type: z.literal('DashboardIndex'),
        title: z.string(),
        description: z.string(),
        items: LONG_CARD_DEF.extend({
            url: z.string().url(),
        }).array(),
    }); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardIndexComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: DashboardIndexComponent, isStandalone: true, selector: "hra-dashboard-index", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<main class=\"content\">\n  <h2 class=\"title\">{{ spec().title }}</h2>\n  <h4 class=\"description mat-body-2\">{{ spec().description }}</h4>\n  <div class=\"cards\">\n    @for (card of spec().items; track card) {\n      <hra-long-card [spec]=\"card\"></hra-long-card>\n    }\n  </div>\n</main>\n", styles: [":host{display:block;background-color:var(--mat-sys-secondary-container)}:host .content{display:flex;flex-direction:column;align-items:center;max-width:108rem;margin:auto;padding:6rem 2.5rem 7.5rem}:host .content .title{font:var(--mat-sys-display-large);letter-spacing:var(--mat-sys-display-large-tracking);margin-bottom:.5rem;text-align:center}:host .content .description{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);max-width:83.75rem;margin-bottom:5rem;color:var(--mat-sys-secondary)}:host .content .cards{display:flex;flex-wrap:wrap;max-width:100%;justify-content:center;gap:3.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: LongCardComponent, selector: "hra-long-card", inputs: ["spec"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardIndexComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-dashboard-index', imports: [CommonModule, LongCardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<main class=\"content\">\n  <h2 class=\"title\">{{ spec().title }}</h2>\n  <h4 class=\"description mat-body-2\">{{ spec().description }}</h4>\n  <div class=\"cards\">\n    @for (card of spec().items; track card) {\n      <hra-long-card [spec]=\"card\"></hra-long-card>\n    }\n  </div>\n</main>\n", styles: [":host{display:block;background-color:var(--mat-sys-secondary-container)}:host .content{display:flex;flex-direction:column;align-items:center;max-width:108rem;margin:auto;padding:6rem 2.5rem 7.5rem}:host .content .title{font:var(--mat-sys-display-large);letter-spacing:var(--mat-sys-display-large-tracking);margin-bottom:.5rem;text-align:center}:host .content .description{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);max-width:83.75rem;margin-bottom:5rem;color:var(--mat-sys-secondary)}:host .content .cards{display:flex;flex-wrap:wrap;max-width:100%;justify-content:center;gap:3.5rem}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/**
 * Dashboard Layout component
 */
class DashboardLayoutComponent {
    constructor() {
        /** Input for dashboard layout component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
    }
    /** Input type for Dashboard Layout Component */
    static { this.def = z.object({
        type: z.literal('Dashboard'),
        title: z.string(),
        description: z.string(),
        link: z.object({
            type: z.string().optional(),
            url: z.string(),
            label: z.string(),
        }),
        items: DASHBOARD_COMPONENT_ANY_DEF.array(),
    }); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardLayoutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: DashboardLayoutComponent, isStandalone: true, selector: "hra-dashboard-layout", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<h2 class=\"title\">{{ spec().title }}</h2>\n<div class=\"description mat-body-2\">{{ spec().description }}</div>\n<a\n  [attr.href]=\"spec().link.url\"\n  target=\"_blank\"\n  rel=\"noopener\"\n  mat-button\n  hraCtaButton\n  class=\"read-btn\"\n  color=\"primary\"\n  hraFeature=\"read-btn\"\n  hraClickEvent\n  >{{ spec().link.label }}\n  <mat-icon class=\"material-symbols-rounded\" iconPositionEnd> arrow_right_alt </mat-icon>\n</a>\n\n@for (item of spec().items; track item) {\n  <ng-container [hraDashboardComponentOutlet]=\"item\"></ng-container>\n}\n", styles: [":host{display:block;max-width:min(80rem,100vw - 12rem);margin:0 auto;padding:6rem 2.5rem}:host ::ng-deep>:nth-child(n+4){margin-bottom:1.5rem}@media(max-width:1012px){:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){min-width:42rem}}:host .title{color:var(--mat-sys-on-background);font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);margin-bottom:.5rem}:host .description{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary-fixed);margin-bottom:2rem}:host .read-btn{--mat-button-filled-container-height: 2.5rem;margin-bottom:2.5rem;font-weight:500;font-size:.875rem;padding:.5rem 1.5rem;width:max-content;line-height:1.5rem;border-radius:0;letter-spacing:.75px}:host .read-btn mat-icon{height:1.5rem;width:1.5rem}@media(max-width:1440px){:host{max-width:calc(100vw - 9rem)}:host .description{max-width:67rem}}@media(max-width:1280px){:host{max-width:calc(100vw - 6rem)}}@media(min-width:769px)and (max-width:1280px){:host .description{max-width:unset}}@media(min-width:548px)and (max-width:1280px){:host{max-width:calc(100vw - 6rem)}}@media(min-width:545px)and (max-width:768px){:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:3rem;display:inline-block}}@media(max-width:544px){:host{max-width:calc(100vw - 4rem)}:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:2rem;display:inline-block}:host .title{font-size:2.375rem;line-height:3.5625rem;letter-spacing:-1.75px}}@media(max-width:430px){:host{max-width:calc(100vw - 3rem)}:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:1.5rem;display:inline-block}}@media(max-width:320px){:host{padding:0 1rem;max-width:calc(100vw - 2rem)}:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:1rem;display:inline-block}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: DashboardComponentOutletDirective, selector: "[hraDashboardComponentOutlet]", inputs: ["hraDashboardComponentOutlet"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i4.CtaButtonDirective, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DashboardLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-dashboard-layout', imports: [HraCommonModule, DashboardComponentOutletDirective, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"title\">{{ spec().title }}</h2>\n<div class=\"description mat-body-2\">{{ spec().description }}</div>\n<a\n  [attr.href]=\"spec().link.url\"\n  target=\"_blank\"\n  rel=\"noopener\"\n  mat-button\n  hraCtaButton\n  class=\"read-btn\"\n  color=\"primary\"\n  hraFeature=\"read-btn\"\n  hraClickEvent\n  >{{ spec().link.label }}\n  <mat-icon class=\"material-symbols-rounded\" iconPositionEnd> arrow_right_alt </mat-icon>\n</a>\n\n@for (item of spec().items; track item) {\n  <ng-container [hraDashboardComponentOutlet]=\"item\"></ng-container>\n}\n", styles: [":host{display:block;max-width:min(80rem,100vw - 12rem);margin:0 auto;padding:6rem 2.5rem}:host ::ng-deep>:nth-child(n+4){margin-bottom:1.5rem}@media(max-width:1012px){:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){min-width:42rem}}:host .title{color:var(--mat-sys-on-background);font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);margin-bottom:.5rem}:host .description{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary-fixed);margin-bottom:2rem}:host .read-btn{--mat-button-filled-container-height: 2.5rem;margin-bottom:2.5rem;font-weight:500;font-size:.875rem;padding:.5rem 1.5rem;width:max-content;line-height:1.5rem;border-radius:0;letter-spacing:.75px}:host .read-btn mat-icon{height:1.5rem;width:1.5rem}@media(max-width:1440px){:host{max-width:calc(100vw - 9rem)}:host .description{max-width:67rem}}@media(max-width:1280px){:host{max-width:calc(100vw - 6rem)}}@media(min-width:769px)and (max-width:1280px){:host .description{max-width:unset}}@media(min-width:548px)and (max-width:1280px){:host{max-width:calc(100vw - 6rem)}}@media(min-width:545px)and (max-width:768px){:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:3rem;display:inline-block}}@media(max-width:544px){:host{max-width:calc(100vw - 4rem)}:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:2rem;display:inline-block}:host .title{font-size:2.375rem;line-height:3.5625rem;letter-spacing:-1.75px}}@media(max-width:430px){:host{max-width:calc(100vw - 3rem)}:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:1.5rem;display:inline-block}}@media(max-width:320px){:host{padding:0 1rem;max-width:calc(100vw - 2rem)}:host ::ng-deep>:nth-child(n+4):not(hra-dashboard-metrics-container){margin-right:1rem;display:inline-block}}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Grid Container Component. Renders items based on number of columns provided */
class GridContainerComponent {
    constructor() {
        /** Input for grid container component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
        /** Style for grid container based on number of columns */
        this.columns = computed(() => `repeat(${this.spec().columns}, 1fr)`, ...(ngDevMode ? [{ debugName: "columns" }] : []));
    }
    /** Input type for Grid container component */
    static { this.def = z.object({
        type: z.literal('GridContainer'),
        columns: z.number(),
        items: DASHBOARD_COMPONENT_ANY_DEF.array(),
    }); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: GridContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: GridContainerComponent, isStandalone: true, selector: "hra-grid-container", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<div [style.grid-template-columns]=\"columns()\" data-testid=\"grid-container\" class=\"container\">\n  @for (item of spec().items; track item) {\n    <ng-container *hraDashboardComponentOutlet=\"item\"></ng-container>\n  }\n</div>\n", styles: [":host{display:block;margin-bottom:1.5rem}:host .container{display:grid;gap:1.5rem}@media(max-width:1012px){:host .container{grid-template-columns:1fr!important}:host .container ::ng-deep>*{min-width:42rem;min-height:33.875rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: DashboardComponentOutletDirective, selector: "[hraDashboardComponentOutlet]", inputs: ["hraDashboardComponentOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: GridContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-grid-container', imports: [CommonModule, DashboardComponentOutletDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [style.grid-template-columns]=\"columns()\" data-testid=\"grid-container\" class=\"container\">\n  @for (item of spec().items; track item) {\n    <ng-container *hraDashboardComponentOutlet=\"item\"></ng-container>\n  }\n</div>\n", styles: [":host{display:block;margin-bottom:1.5rem}:host .container{display:grid;gap:1.5rem}@media(max-width:1012px){:host .container{grid-template-columns:1fr!important}:host .container ::ng-deep>*{min-width:42rem;min-height:33.875rem}}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Title card definition object */
const TITLE_CARD_DEF = z.object({
    title: z.string(),
    tooltip: z.string(),
});
/** Tooltip positions definition */
const TOOLTIP_POSITIONS = [
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
    },
    {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
    },
    {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
    },
];
/** Title card component, renders title, tooltip and contents inside the card */
class TitleCardComponent {
    constructor() {
        /** Input for title card component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
        /** Setting the tooltip positions  */
        this.tooltipPositions = TOOLTIP_POSITIONS;
        /** Flag to check if tooltip is open */
        this.tooltipOpen = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: TitleCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: TitleCardComponent, isStandalone: true, selector: "hra-title-card", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<h3 class=\"title\" hraFeature=\"title-card\">\n  {{ spec().title }}\n  <mat-icon\n    hraFeature=\"info\"\n    [hraHoverEvent]=\"{ title: spec().title }\"\n    class=\"material-symbols-rounded\"\n    cdkOverlayOrigin\n    #resetTrigger=\"cdkOverlayOrigin\"\n    (mouseover)=\"tooltipOpen = true\"\n    (mouseout)=\"tooltipOpen = false\"\n    >info</mat-icon\n  >\n</h3>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayPanelClass]=\"['tooltip-panel']\"\n  [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n  [cdkConnectedOverlayPositions]=\"tooltipPositions\"\n  [cdkConnectedOverlayOpen]=\"tooltipOpen\"\n  [cdkConnectedOverlayOffsetX]=\"5\"\n>\n  <div class=\"mat-caption\">\n    {{ spec().tooltip }}\n  </div>\n</ng-template>\n\n<div class=\"content\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:inline-block;background-color:#fff;padding:.75rem;box-shadow:0 5px 16px #201e3d3d;border-radius:1rem;min-width:18rem}:host .title{font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking);color:var(--mat-sys-on-background);display:inline-block;margin-bottom:.75rem}:host mat-icon{vertical-align:middle;cursor:pointer}@media(max-width:1440px){:host .title{font-size:1.25rem;line-height:1.875rem}}@media(max-width:1280px){:host .title{font-size:.875rem;line-height:1.5rem}:host .mat-icon{height:1rem;width:1rem;font-size:1rem;vertical-align:middle}}::ng-deep .tooltip-panel{background-color:#fff;border-radius:1rem;padding:1rem;color:#26262c;box-shadow:0 5px 16px #201e3d3d;max-width:21rem}::ng-deep .tooltip-panel .mat-caption{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i3$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i3$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: TitleCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-title-card', imports: [HraCommonModule, MatIconModule, OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 class=\"title\" hraFeature=\"title-card\">\n  {{ spec().title }}\n  <mat-icon\n    hraFeature=\"info\"\n    [hraHoverEvent]=\"{ title: spec().title }\"\n    class=\"material-symbols-rounded\"\n    cdkOverlayOrigin\n    #resetTrigger=\"cdkOverlayOrigin\"\n    (mouseover)=\"tooltipOpen = true\"\n    (mouseout)=\"tooltipOpen = false\"\n    >info</mat-icon\n  >\n</h3>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayPanelClass]=\"['tooltip-panel']\"\n  [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n  [cdkConnectedOverlayPositions]=\"tooltipPositions\"\n  [cdkConnectedOverlayOpen]=\"tooltipOpen\"\n  [cdkConnectedOverlayOffsetX]=\"5\"\n>\n  <div class=\"mat-caption\">\n    {{ spec().tooltip }}\n  </div>\n</ng-template>\n\n<div class=\"content\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:inline-block;background-color:#fff;padding:.75rem;box-shadow:0 5px 16px #201e3d3d;border-radius:1rem;min-width:18rem}:host .title{font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking);color:var(--mat-sys-on-background);display:inline-block;margin-bottom:.75rem}:host mat-icon{vertical-align:middle;cursor:pointer}@media(max-width:1440px){:host .title{font-size:1.25rem;line-height:1.875rem}}@media(max-width:1280px){:host .title{font-size:.875rem;line-height:1.5rem}:host .mat-icon{height:1rem;width:1rem;font-size:1rem;vertical-align:middle}}::ng-deep .tooltip-panel{background-color:#fff;border-radius:1rem;padding:1rem;color:#26262c;box-shadow:0 5px 16px #201e3d3d;max-width:21rem}::ng-deep .tooltip-panel .mat-caption{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Image container component, renders image inside a card */
class ImageContainerComponent {
    constructor() {
        /** Input for image container component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
    }
    /** Input type for Image container component */
    static { this.def = TITLE_CARD_DEF.extend({
        type: z.literal('ImageContainer'),
        imageUrl: z.string(),
        aspectRatio: z.string().default('4/3'),
    }); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ImageContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: ImageContainerComponent, isStandalone: true, selector: "hra-image-container", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<hra-title-card [spec]=\"spec()\" class=\"card\">\n  <img [attr.src]=\"spec().imageUrl\" [style.aspect-ratio]=\"spec().aspectRatio\" [alt]=\"spec().tooltip\" />\n</hra-title-card>\n", styles: [":host{display:block;height:100%}:host .card{width:100%;height:100%}:host .card img{width:100%;object-fit:contain;border-radius:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: TitleCardComponent, selector: "hra-title-card", inputs: ["spec"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ImageContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-image-container', imports: [CommonModule, TitleCardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-title-card [spec]=\"spec()\" class=\"card\">\n  <img [attr.src]=\"spec().imageUrl\" [style.aspect-ratio]=\"spec().aspectRatio\" [alt]=\"spec().tooltip\" />\n</hra-title-card>\n", styles: [":host{display:block;height:100%}:host .card{width:100%;height:100%}:host .card img{width:100%;object-fit:contain;border-radius:1rem}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Metrics Item definition object */
const METRICS_ITEM_DEF = z.object({
    label: z.string(),
    count: z.number(),
    unit: z.string().optional(),
});
/** Metrics Item Component, renders item with count */
class MetricsItemComponent {
    constructor() {
        /** Input for Metrics Item Component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MetricsItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: MetricsItemComponent, isStandalone: true, selector: "hra-metrics-item", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<h4 class=\"count mat-subtitle-2\">{{ spec().count.toLocaleString() }} {{ spec().unit }}</h4>\n<div class=\"label mat-caption\">{{ spec().label }}</div>\n", styles: [":host{display:block}:host .count{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-on-tertiary-fixed);display:inline-block;margin:0;line-height:1.875rem}:host .label{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-on-secondary-fixed);line-height:1.3125rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MetricsItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-metrics-item', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h4 class=\"count mat-subtitle-2\">{{ spec().count.toLocaleString() }} {{ spec().unit }}</h4>\n<div class=\"label mat-caption\">{{ spec().label }}</div>\n", styles: [":host{display:block}:host .count{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-on-tertiary-fixed);display:inline-block;margin:0;line-height:1.875rem}:host .label{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-on-secondary-fixed);line-height:1.3125rem}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Metrics card definition */
const METRICS_CARD_DEF = TITLE_CARD_DEF.extend({
    items: METRICS_ITEM_DEF.array(),
});
/** Limit to decide if cards needs to be wide */
const WIDE_CARD_MIN_ITEM_COUNT = 4;
/** Metrics Container Component, renders metric cards inside the container */
class MetricsContainerComponent {
    constructor() {
        /** Input for metrics container component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
        /** Computes the boolean array if a card needs to be wide */
        this.layout = computed(() => {
            const cards = this.spec().items;
            const isWide = [];
            for (let index = 0; index < cards.length; index++) {
                const next = cards.at(index + 1);
                if (this.isWideCard(cards[index])) {
                    isWide.push(true);
                }
                else if (next && !this.isWideCard(next)) {
                    isWide.push(false, false);
                    index += 1;
                }
                else {
                    isWide.push(true);
                }
            }
            return isWide;
        }, ...(ngDevMode ? [{ debugName: "layout" }] : []));
    }
    /** Input type for Metrics Container Component */
    static { this.def = z.object({
        type: z.literal('MetricsContainer'),
        items: METRICS_CARD_DEF.array(),
    }); }
    /** Returns if card needs to be wide based on number of items inside it */
    isWideCard(card) {
        return card.items.length >= WIDE_CARD_MIN_ITEM_COUNT;
    }
    /** Returns if card is wide based on previously computed array */
    isWideCardAt(index) {
        return this.layout()[index];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MetricsContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: MetricsContainerComponent, isStandalone: true, selector: "hra-dashboard-metrics-container", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@for (item of spec().items; track item) {\n  <hra-title-card [spec]=\"item\" class=\"card\" data-testid=\"title-card\" [class.span-columns]=\"isWideCardAt($index)\">\n    <div class=\"items\" data-testid=\"metrics-group\">\n      @for (metric of item.items; track metric) {\n        <hra-metrics-item [spec]=\"metric\" data-testid=\"metrics-item\"></hra-metrics-item>\n      }\n    </div>\n  </hra-title-card>\n}\n", styles: [":host{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}:host .card .items{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;border-top:solid 1px #d5dbe3;padding-top:1rem}:host .span-columns{grid-column:1/3}\n"], dependencies: [{ kind: "component", type: TitleCardComponent, selector: "hra-title-card", inputs: ["spec"] }, { kind: "component", type: MetricsItemComponent, selector: "hra-metrics-item", inputs: ["spec"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MetricsContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-dashboard-metrics-container', imports: [TitleCardComponent, MetricsItemComponent], template: "@for (item of spec().items; track item) {\n  <hra-title-card [spec]=\"item\" class=\"card\" data-testid=\"title-card\" [class.span-columns]=\"isWideCardAt($index)\">\n    <div class=\"items\" data-testid=\"metrics-group\">\n      @for (metric of item.items; track metric) {\n        <hra-metrics-item [spec]=\"metric\" data-testid=\"metrics-item\"></hra-metrics-item>\n      }\n    </div>\n  </hra-title-card>\n}\n", styles: [":host{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}:host .card .items{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;border-top:solid 1px #d5dbe3;padding-top:1rem}:host .span-columns{grid-column:1/3}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/** Fonts for Histogram */
const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];
/** Vega Container Component, embeds a vega lite visualization inside a card */
class VegaContainerComponent {
    constructor() {
        /** Input for vega container component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
        /** Reference to the element where visualization is to be embedded */
        this.visRef = viewChild.required('vis');
        /** Reference to the DOCUMENT Injection Token */
        this.document = inject(DOCUMENT);
        /** Embeds the vega lite visualization to the element */
        this.embedRef = effect(async (onCleanup) => {
            const el = this.visRef().nativeElement;
            await this.ensureFontsLoaded();
            const { finalize } = await embed(el, this.spec().specUrl, {
                actions: false,
            });
            onCleanup(finalize);
        }, ...(ngDevMode ? [{ debugName: "embedRef" }] : []));
    }
    /** Input definition for vega container component */
    static { this.def = TITLE_CARD_DEF.extend({
        type: z.literal('VegaContainer'),
        specUrl: z.string(),
        aspectRatio: z.string().default('3/1'),
    }); }
    /** Method to ensure that the fonts load */
    async ensureFontsLoaded() {
        const loadPromises = HISTOGRAM_FONTS.map((font) => this.document.fonts.load(font));
        await Promise.all(loadPromises);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: VegaContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.9", type: VegaContainerComponent, isStandalone: true, selector: "hra-vega-container", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, viewQueries: [{ propertyName: "visRef", first: true, predicate: ["vis"], descendants: true, isSignal: true }], ngImport: i0, template: "<hra-title-card [spec]=\"spec()\" class=\"card\">\n  <div #vis class=\"visualization\" [style.aspect-ratio]=\"spec().aspectRatio\" data-testid=\"visualization\"></div>\n</hra-title-card>\n", styles: [":host{display:block}:host .card{width:100%}:host .card .visualization{width:100%;height:100%}:host .card .visualization ::ng-deep canvas{width:100%!important;height:100%!important}::ng-deep #vg-tooltip-element.vg-tooltip{font-family:Metropolis;font-weight:500;font-size:.75rem;line-height:1.125rem;color:#201e3d;padding:.5rem;max-width:22.5rem;box-shadow:0 5px 16px #201e3d3d}::ng-deep #vg-tooltip-element.vg-tooltip table tbody tr:not(:last-child){margin-bottom:4px}::ng-deep #vg-tooltip-element.vg-tooltip table tbody tr td:first-child{color:#201e3d;text-align:left}::ng-deep #vg-tooltip-element.vg-tooltip table tbody tr td:last-child{color:#4b4b5e}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: TitleCardComponent, selector: "hra-title-card", inputs: ["spec"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: VegaContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-vega-container', imports: [CommonModule, TitleCardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-title-card [spec]=\"spec()\" class=\"card\">\n  <div #vis class=\"visualization\" [style.aspect-ratio]=\"spec().aspectRatio\" data-testid=\"visualization\"></div>\n</hra-title-card>\n", styles: [":host{display:block}:host .card{width:100%}:host .card .visualization{width:100%;height:100%}:host .card .visualization ::ng-deep canvas{width:100%!important;height:100%!important}::ng-deep #vg-tooltip-element.vg-tooltip{font-family:Metropolis;font-weight:500;font-size:.75rem;line-height:1.125rem;color:#201e3d;padding:.5rem;max-width:22.5rem;box-shadow:0 5px 16px #201e3d3d}::ng-deep #vg-tooltip-element.vg-tooltip table tbody tr:not(:last-child){margin-bottom:4px}::ng-deep #vg-tooltip-element.vg-tooltip table tbody tr td:first-child{color:#201e3d;text-align:left}::ng-deep #vg-tooltip-element.vg-tooltip table tbody tr td:last-child{color:#4b4b5e}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }], visRef: [{ type: i0.ViewChild, args: ['vis', { isSignal: true }] }] } });

/** Iframe Container Component, renders html document inside the container  */
class IframeContainerComponent {
    constructor() {
        /** Input for Iframe container component */
        this.spec = input.required(...(ngDevMode ? [{ debugName: "spec" }] : []));
        /** DomSanitizer instance */
        this.sanitizer = inject(DomSanitizer);
        /** Computed safe url of iframe source url */
        this.iframeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.spec().iframeUrl), ...(ngDevMode ? [{ debugName: "iframeUrl" }] : []));
    }
    /** Input type for Iframe container component */
    static { this.def = TITLE_CARD_DEF.extend({
        type: z.literal('IFrameContainer'),
        iframeUrl: z.string(),
        aspectRatio: z.string().default('4/3'),
    }); }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: IframeContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: IframeContainerComponent, isStandalone: true, selector: "hra-iframe-container", inputs: { spec: { classPropertyName: "spec", publicName: "spec", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<hra-title-card [spec]=\"spec()\" [style.aspect-ratio]=\"spec().aspectRatio\" class=\"iframe-container\">\n  <iframe [src]=\"iframeUrl()\" [attr.title]=\"spec().title\"></iframe>\n</hra-title-card>\n", styles: [":host{display:block}:host .iframe-container{width:100%}:host .iframe-container ::ng-deep .content{height:100%}:host .iframe-container ::ng-deep iframe{width:100%;height:100%;border:0px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: TitleCardComponent, selector: "hra-title-card", inputs: ["spec"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: IframeContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-iframe-container', imports: [CommonModule, TitleCardComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-title-card [spec]=\"spec()\" [style.aspect-ratio]=\"spec().aspectRatio\" class=\"iframe-container\">\n  <iframe [src]=\"iframeUrl()\" [attr.title]=\"spec().title\"></iframe>\n</hra-title-card>\n", styles: [":host{display:block}:host .iframe-container{width:100%}:host .iframe-container ::ng-deep .content{height:100%}:host .iframe-container ::ng-deep iframe{width:100%;height:100%;border:0px}\n"] }]
        }], propDecorators: { spec: [{ type: i0.Input, args: [{ isSignal: true, alias: "spec", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DASHBOARD_COMPONENT_ANY_DEF, DashboardComponentOutletComponent, DashboardComponentOutletDirective, DashboardIndexComponent, DashboardLayoutComponent, GridContainerComponent, IframeContainerComponent, ImageContainerComponent, LONG_CARD_DEF, LongCardComponent, METRICS_CARD_DEF, MetricsContainerComponent, VegaContainerComponent, defFor, provideDashboardComponents, safeValidateSpec, typeFor, validateSpec };
//# sourceMappingURL=hra-ui-dashboard.mjs.map
