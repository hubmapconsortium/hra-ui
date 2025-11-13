import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i0 from '@angular/core';
import { input, computed, inject, ChangeDetectionStrategy, Component, output, signal, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import * as i1$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i1$2 from '@angular/material/list';
import { MatListItem, MatListItemTitle, MatListModule } from '@angular/material/list';
import * as i2 from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NgScrollbar } from 'ngx-scrollbar';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import * as i1 from '@angular/common';
import { Location, CommonModule } from '@angular/common';
import * as i4 from '@hra-ui/common/analytics';

/**
 * Resolves an url against the baseUrl
 * @param url Raw url
 * @param router Router service
 * @param rawBaseUrl Base url
 * @returns Whether the url is absolute along with the resolved url
 */
function resolveUrl(url, router, rawBaseUrl = '') {
    const baseUrl = Location.stripTrailingSlash(rawBaseUrl) + '/';
    let isAbsolute = url.startsWith('http');
    if (baseUrl && url.startsWith(baseUrl)) {
        isAbsolute = false;
        url = url.slice(baseUrl.length);
    }
    let value = url;
    if (!isAbsolute && router) {
        value = router.parseUrl(Location.stripTrailingSlash(url));
    }
    return { isAbsolute, value };
}

/** Options for active link matching */
const ACTIVE_MATCH_OPTIONS = {
    paths: 'exact',
    matrixParams: 'ignored',
    queryParams: 'ignored',
    fragment: 'ignored',
};

/** Navigation Item Component */
class NavigationItemComponent {
    /** Navigation Item Data */
    navigationItem = input.required(...(ngDevMode ? [{ debugName: "navigationItem" }] : []));
    /** Base URL for the appliation */
    baseUrl = input.required(...(ngDevMode ? [{ debugName: "baseUrl" }] : []));
    /** Resolved URL for the navigation item */
    url = computed(() => resolveUrl(this.navigationItem().url, this.router, this.baseUrl()), ...(ngDevMode ? [{ debugName: "url" }] : []));
    /** Options for router link active */
    routerLinkActiveOptions = ACTIVE_MATCH_OPTIONS;
    /** Angular Router */
    router = inject(Router);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NavigationItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: NavigationItemComponent, isStandalone: true, selector: "hra-navigation-item", inputs: { navigationItem: { classPropertyName: "navigationItem", publicName: "navigationItem", isSignal: true, isRequired: true, transformFunction: null }, baseUrl: { classPropertyName: "baseUrl", publicName: "baseUrl", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@if (url().isAbsolute) {\n  <a\n    hraFeature=\"navigation-item-external\"\n    mat-list-item\n    [hraClickEvent]=\"{ label: navigationItem().label }\"\n    [href]=\"url().value\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n} @else {\n  <a\n    hraFeature=\"navigation-item-internal\"\n    mat-list-item\n    routerLinkActive=\"active\"\n    [hraClickEvent]=\"{ label: navigationItem().label }\"\n    [routerLink]=\"url().value\"\n    [activated]=\"rla.isActive\"\n    [routerLinkActiveOptions]=\"routerLinkActiveOptions\"\n    #rla=\"routerLinkActive\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n}\n\n<ng-template #content>\n  <div class=\"nav-content\">\n    @if (navigationItem().icon; as icon) {\n      <mat-icon matListItemIcon>{{ icon }}</mat-icon>\n    }\n\n    <span matListItemTitle>\n      {{ navigationItem().label }}\n    </span>\n  </div>\n</ng-template>\n", styles: [":host{display:block}:host a{border-radius:.5rem;cursor:pointer;gap:.75rem;height:unset!important;margin:.5rem 0;padding:.5rem 0 .5rem 1rem!important;margin-left:var(--hra-navigation-item-padding-left, 0)!important;width:unset}:host a.active span{color:var(--mat-sys-tertiary-fixed)}:host a:hover mat-icon{color:var(--mat-sys-tertiary-fixed)}:host a .nav-content{align-items:center;display:flex;gap:.75rem}:host a mat-icon{margin:0}:host a span{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);white-space:normal}:host .in-category{padding-left:3.5rem!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: MatListItemTitle, selector: "[matListItemTitle]" }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i4.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i4.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NavigationItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-navigation-item', imports: [CommonModule, MatListItem, RouterModule, MatIconModule, MatListItemTitle, HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (url().isAbsolute) {\n  <a\n    hraFeature=\"navigation-item-external\"\n    mat-list-item\n    [hraClickEvent]=\"{ label: navigationItem().label }\"\n    [href]=\"url().value\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n} @else {\n  <a\n    hraFeature=\"navigation-item-internal\"\n    mat-list-item\n    routerLinkActive=\"active\"\n    [hraClickEvent]=\"{ label: navigationItem().label }\"\n    [routerLink]=\"url().value\"\n    [activated]=\"rla.isActive\"\n    [routerLinkActiveOptions]=\"routerLinkActiveOptions\"\n    #rla=\"routerLinkActive\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n}\n\n<ng-template #content>\n  <div class=\"nav-content\">\n    @if (navigationItem().icon; as icon) {\n      <mat-icon matListItemIcon>{{ icon }}</mat-icon>\n    }\n\n    <span matListItemTitle>\n      {{ navigationItem().label }}\n    </span>\n  </div>\n</ng-template>\n", styles: [":host{display:block}:host a{border-radius:.5rem;cursor:pointer;gap:.75rem;height:unset!important;margin:.5rem 0;padding:.5rem 0 .5rem 1rem!important;margin-left:var(--hra-navigation-item-padding-left, 0)!important;width:unset}:host a.active span{color:var(--mat-sys-tertiary-fixed)}:host a:hover mat-icon{color:var(--mat-sys-tertiary-fixed)}:host a .nav-content{align-items:center;display:flex;gap:.75rem}:host a mat-icon{margin:0}:host a span{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);white-space:normal}:host .in-category{padding-left:3.5rem!important}\n"] }]
        }], propDecorators: { navigationItem: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigationItem", required: true }] }], baseUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "baseUrl", required: true }] }] } });

/** Navigation Category Component */
class NavigationCategoryComponent {
    /** Navigation category data */
    navigationCategory = input.required(...(ngDevMode ? [{ debugName: "navigationCategory" }] : []));
    /** Navigation category expanded state */
    expanded = input(false, ...(ngDevMode ? [{ debugName: "expanded" }] : []));
    /** Base URL for the appliation */
    baseUrl = input.required(...(ngDevMode ? [{ debugName: "baseUrl" }] : []));
    /** Navigation category expanded state change event */
    expandedChange = output();
    /** Handle expansion state change */
    onExpandedChange(expanded) {
        this.expandedChange.emit(expanded);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NavigationCategoryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: NavigationCategoryComponent, isStandalone: true, selector: "hra-navigation-category", inputs: { navigationCategory: { classPropertyName: "navigationCategory", publicName: "navigationCategory", isSignal: true, isRequired: true, transformFunction: null }, expanded: { classPropertyName: "expanded", publicName: "expanded", isSignal: true, isRequired: false, transformFunction: null }, baseUrl: { classPropertyName: "baseUrl", publicName: "baseUrl", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { expandedChange: "expandedChange" }, ngImport: i0, template: "<mat-expansion-panel\n  hraFeature=\"navigation-category-expansion\"\n  class=\"category\"\n  [hraClickEvent]=\"{\n    label: navigationCategory().label,\n    action: expanded() ? 'collapse' : 'expand',\n  }\"\n  [expanded]=\"expanded()\"\n  (expandedChange)=\"expandedChange.emit($event)\"\n>\n  <mat-expansion-panel-header class=\"header\">\n    <mat-icon>{{ navigationCategory().icon }}</mat-icon>\n    <div>{{ navigationCategory().label }}</div>\n  </mat-expansion-panel-header>\n\n  <div matExpansionPanelContent>\n    @for (navigationItem of navigationCategory().children; track navigationItem) {\n      <hra-navigation-item [navigationItem]=\"navigationItem\" [baseUrl]=\"baseUrl()\" />\n    }\n  </div>\n</mat-expansion-panel>\n", styles: [":host{display:block;--hra-navigation-item-padding-left: 2.25rem;--mat-expansion-container-shape: var(--mat-sys-corner-none);--mat-expansion-container-background-color: transparent;--mat-expansion-header-collapsed-state-height: 1.5rem;--mat-expansion-header-expanded-state-height: 1.5rem;--mat-expansion-header-hover-state-layer-color: rgb(from var(--mat-sys-secondary) r g b/8%);--mat-expansion-header-text-font: var(--mat-sys-label-large-font);--mat-expansion-header-text-size: var(--mat-sys-label-large-size);--mat-expansion-header-text-weight: var(--mat-sys-label-large-weight);--mat-expansion-header-text-line-height: var(--mat-sys-label-large-line-height);--mat-expansion-header-text-tracking: var(--mat-sys-label-large-tracking)}:host ::ng-deep .mat-expansion-panel-body{padding:0}:host .category{box-shadow:none;margin:.5rem 0}:host .category .header{border-radius:.5rem;padding:.5rem 1rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .category .header ::ng-deep .mat-content{align-items:center;gap:.75rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "component", type: i1$1.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["hideToggle", "togglePosition"], outputs: ["afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i1$1.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["expandedHeight", "collapsedHeight", "tabIndex"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: NavigationItemComponent, selector: "hra-navigation-item", inputs: ["navigationItem", "baseUrl"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i4.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i4.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NavigationCategoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-navigation-category', imports: [CommonModule, MatExpansionModule, MatIconModule, NavigationItemComponent, HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-expansion-panel\n  hraFeature=\"navigation-category-expansion\"\n  class=\"category\"\n  [hraClickEvent]=\"{\n    label: navigationCategory().label,\n    action: expanded() ? 'collapse' : 'expand',\n  }\"\n  [expanded]=\"expanded()\"\n  (expandedChange)=\"expandedChange.emit($event)\"\n>\n  <mat-expansion-panel-header class=\"header\">\n    <mat-icon>{{ navigationCategory().icon }}</mat-icon>\n    <div>{{ navigationCategory().label }}</div>\n  </mat-expansion-panel-header>\n\n  <div matExpansionPanelContent>\n    @for (navigationItem of navigationCategory().children; track navigationItem) {\n      <hra-navigation-item [navigationItem]=\"navigationItem\" [baseUrl]=\"baseUrl()\" />\n    }\n  </div>\n</mat-expansion-panel>\n", styles: [":host{display:block;--hra-navigation-item-padding-left: 2.25rem;--mat-expansion-container-shape: var(--mat-sys-corner-none);--mat-expansion-container-background-color: transparent;--mat-expansion-header-collapsed-state-height: 1.5rem;--mat-expansion-header-expanded-state-height: 1.5rem;--mat-expansion-header-hover-state-layer-color: rgb(from var(--mat-sys-secondary) r g b/8%);--mat-expansion-header-text-font: var(--mat-sys-label-large-font);--mat-expansion-header-text-size: var(--mat-sys-label-large-size);--mat-expansion-header-text-weight: var(--mat-sys-label-large-weight);--mat-expansion-header-text-line-height: var(--mat-sys-label-large-line-height);--mat-expansion-header-text-tracking: var(--mat-sys-label-large-tracking)}:host ::ng-deep .mat-expansion-panel-body{padding:0}:host .category{box-shadow:none;margin:.5rem 0}:host .category .header{border-radius:.5rem;padding:.5rem 1rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .category .header ::ng-deep .mat-content{align-items:center;gap:.75rem}\n"] }]
        }], propDecorators: { navigationCategory: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigationCategory", required: true }] }], expanded: [{ type: i0.Input, args: [{ isSignal: true, alias: "expanded", required: false }] }], baseUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "baseUrl", required: true }] }], expandedChange: [{ type: i0.Output, args: ["expandedChange"] }] } });

var $schema = "../types/docs-navigation.schema.json";
var menuItems = [
	{
		type: "category",
		label: "Getting Started",
		icon: "info",
		children: [
			{
				type: "item",
				label: "Introduction to the Human Reference Atlas",
				url: "https://humanatlas.io/overview-training-outreach#introduction"
			},
			{
				type: "item",
				label: "About the Human Reference Atlas",
				url: "https://humanatlas.io/about"
			}
		]
	},
	{
		type: "category",
		label: "Apps",
		icon: "apps",
		children: [
			{
				type: "item",
				label: "Apps overview",
				url: "https://docs.humanatlas.io/apps"
			},
			{
				type: "item",
				label: "API",
				url: "https://humanatlas.io/api"
			},
			{
				type: "item",
				label: "ASCT+B Reporter",
				url: "https://humanatlas.io/asctb-reporter"
			},
			{
				type: "item",
				label: "Cell Distance Explorer",
				url: "https://humanatlas.io/user-story/5"
			},
			{
				type: "item",
				label: "Cell Population Graphs",
				url: "https://humanatlas.io/cell-population-graphs"
			},
			{
				type: "item",
				label: "Cell Population Predictor",
				url: "https://humanatlas.io/user-story/1"
			},
			{
				type: "item",
				label: "Dashboard",
				url: "https://humanatlas.io/user-story/7"
			},
			{
				type: "item",
				label: "Exploration User Interface",
				url: "https://humanatlas.io/exploration-user-interface"
			},
			{
				type: "item",
				label: "Functional Tissue Unit Explorer",
				url: "https://humanatlas.io/user-story/4"
			},
			{
				type: "item",
				label: "HRA Organ Gallery",
				url: "https://humanatlas.io/hra-organ-gallery"
			},
			{
				type: "item",
				label: "Knowledge Graph",
				url: "https://docs.humanatlas.io/dev/kg"
			},
			{
				type: "item",
				label: "Registration User Interface",
				url: "https://humanatlas.io/registration-user-interface"
			},
			{
				type: "item",
				label: "Tissue Origin Predictor",
				url: "https://humanatlas.io/user-story/2"
			},
			{
				type: "item",
				label: "Web Components",
				url: "https://humanatlas.io/user-story/6"
			}
		]
	},
	{
		type: "category",
		label: "Data",
		icon: "database",
		children: [
			{
				type: "item",
				label: "Data Overview",
				url: "https://humanatlas.io/overview-data"
			},
			{
				type: "item",
				label: "3D Organs",
				url: "https://humanatlas.io/3d-reference-library"
			},
			{
				type: "item",
				label: "ASCT+B Tables",
				url: "https://humanatlas.io/asctb-tables"
			},
			{
				type: "item",
				label: "Cell Type Annotations",
				url: "https://humanatlas.io/cell-type-annotations"
			},
			{
				type: "item",
				label: "Functional Tissue Unit (FTU) Illustrations",
				url: "https://humanatlas.io/2d-ftu-illustrations"
			},
			{
				type: "item",
				label: "Millitome",
				url: "https://humanatlas.io/millitome"
			},
			{
				type: "item",
				label: "Organ Mapping Antibody Panels",
				url: "https://humanatlas.io/omap"
			},
			{
				type: "item",
				label: "Vascular Geometry",
				url: "https://humanatlas.io/vccf"
			}
		]
	},
	{
		type: "category",
		label: "Development",
		icon: "code",
		children: [
			{
				type: "item",
				label: "Introduction to HRA Development",
				url: "https://docs.humanatlas.io/dev"
			},
			{
				type: "item",
				label: "API Reference",
				url: "https://docs.humanatlas.io/dev/api"
			},
			{
				type: "item",
				label: "Apps",
				url: "https://docs.humanatlas.io/dev/apps"
			},
			{
				type: "item",
				label: "Change Log",
				url: "https://docs.humanatlas.io/dev/changelog"
			},
			{
				type: "item",
				label: "Design System",
				url: "https://docs.humanatlas.io/dev/design-system"
			},
			{
				type: "item",
				label: "Digital Objects",
				url: "https://docs.humanatlas.io/dev/digital-objects"
			},
			{
				type: "item",
				label: "Embedding Web Components",
				url: "https://docs.humanatlas.io/dev/web-components"
			},
			{
				type: "item",
				label: "FAQs",
				url: "https://docs.humanatlas.io/dev/faq"
			},
			{
				type: "item",
				label: "Knowledge Graph",
				url: "https://docs.humanatlas.io/dev/kg"
			},
			{
				type: "item",
				label: "Support",
				url: "https://docs.humanatlas.io/dev/support"
			},
			{
				type: "item",
				label: "Tutorials",
				url: "https://docs.humanatlas.io/dev/tutorials"
			}
		]
	},
	{
		type: "item",
		label: "Release Notes",
		icon: "news",
		url: "https://humanatlas.io/release-notes"
	},
	{
		type: "item",
		label: "Standard Operating Procedures",
		icon: "checklist",
		url: "https://humanatlas.io/standard-operating-procedures"
	}
];
var docsNavigation = {
	$schema: $schema,
	menuItems: menuItems
};

/** Docs Navigation Menu */
const DOCS_NAVIGATION_MENU = menuItems;

/** Site Navigation Component for HRA Docs */
class SiteNavigationComponent {
    /** Navigation Menu Items */
    navigationMenu = input(DOCS_NAVIGATION_MENU, ...(ngDevMode ? [{ debugName: "navigationMenu" }] : []));
    /** Base URL for the appliation */
    baseUrl = input.required(...(ngDevMode ? [{ debugName: "baseUrl" }] : []));
    /** State for expanded navigation category */
    expandedCategory = signal('', ...(ngDevMode ? [{ debugName: "expandedCategory" }] : []));
    /** Angular Router */
    router = inject(Router);
    /** Constructor */
    constructor() {
        effect(() => this.updateExpandedCategory());
        const end$ = injectNavigationEnd().pipe(takeUntilDestroyed());
        end$.subscribe(() => this.updateExpandedCategory());
    }
    /** Event handler to change the expanded navigation category */
    changeExpandedCategory(isExpanded, category) {
        if (isExpanded) {
            this.expandedCategory.set(category);
        }
    }
    /** Updates the currently expanded category */
    updateExpandedCategory() {
        const menu = this.navigationMenu();
        const category = this.findExpandedCategory(menu);
        this.expandedCategory.set(category);
    }
    /** Finds the expanded category
     * @param menu Docs Menu Items
     */
    findExpandedCategory(menu) {
        const categories = menu.filter((val) => val.type === 'category');
        for (const category of categories) {
            for (const item of category.children) {
                const url = resolveUrl(item.url, this.router, this.baseUrl());
                if (!url.isAbsolute && this.router.isActive(url.value, ACTIVE_MATCH_OPTIONS)) {
                    return category.label;
                }
            }
        }
        return '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: SiteNavigationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: SiteNavigationComponent, isStandalone: true, selector: "hra-site-navigation", inputs: { navigationMenu: { classPropertyName: "navigationMenu", publicName: "navigationMenu", isSignal: true, isRequired: false, transformFunction: null }, baseUrl: { classPropertyName: "baseUrl", publicName: "baseUrl", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-scrollbar>\n  <div class=\"scrollbar-container\">\n    <div class=\"heading\">\n      <div class=\"tagline\">Help & Documentation</div>\n      <div class=\"description\">\n        Documentation, guides, and standard operating procedures for Human Reference Atlas usage.\n      </div>\n    </div>\n\n    <mat-divider />\n\n    <div class=\"content\">\n      <mat-nav-list>\n        @for (navMenuItem of navigationMenu(); track navMenuItem) {\n          @if (navMenuItem.type === 'category') {\n            <hra-navigation-category\n              [navigationCategory]=\"navMenuItem\"\n              [baseUrl]=\"baseUrl()\"\n              [expanded]=\"expandedCategory() === navMenuItem.label\"\n              (expandedChange)=\"changeExpandedCategory($event, navMenuItem.label)\"\n            />\n          } @else if (navMenuItem.type === 'item') {\n            <hra-navigation-item [navigationItem]=\"navMenuItem\" [baseUrl]=\"baseUrl()\" />\n          }\n          <mat-divider />\n        }\n      </mat-nav-list>\n    </div>\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:block;background-color:var(--mat-sys-surface-container-low);border-right:.0625rem solid var(--mat-sys-outline);height:calc(100vh - 4.5rem);position:sticky;top:var(--hra-site-navigation-top-offset, 4.5rem);width:20rem;--mat-divider-color: var(--mat-sys-outline-variant);--mat-list-active-indicator-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-list-list-item-label-text-color: var(--mat-sys-primary);--mat-list-list-item-hover-label-text-color: var(--mat-sys-tertiary-fixed);--mat-list-list-item-hover-state-layer-color: var(--mat-sys-on-tertiary-fixed);--mat-list-list-item-hover-state-layer-opacity: 8%;--mat-list-list-item-hover-leading-icon-color: var(--mat-sys-tertiary-fixed)}:host .scrollbar-container{padding:3rem 1rem}:host mat-nav-list{padding:0}:host .heading{padding:0 .75rem}:host .heading .tagline{color:var(--mat-sys-secondary);margin-bottom:8px;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .heading .description{color:var(--mat-sys-primary);margin-bottom:1.5rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .content{margin-top:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatListModule }, { kind: "component", type: i1$2.MatNavList, selector: "mat-nav-list", exportAs: ["matNavList"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: RouterModule }, { kind: "component", type: NavigationCategoryComponent, selector: "hra-navigation-category", inputs: ["navigationCategory", "expanded", "baseUrl"], outputs: ["expandedChange"] }, { kind: "component", type: NavigationItemComponent, selector: "hra-navigation-item", inputs: ["navigationItem", "baseUrl"] }, { kind: "component", type: NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "ngmodule", type: ScrollingModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: SiteNavigationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-site-navigation', imports: [
                        HraCommonModule,
                        MatIconModule,
                        ButtonsModule,
                        MatDivider,
                        MatListModule,
                        MatExpansionModule,
                        MatButtonModule,
                        RouterModule,
                        NavigationCategoryComponent,
                        NavigationItemComponent,
                        NgScrollbar,
                        ScrollingModule,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-scrollbar>\n  <div class=\"scrollbar-container\">\n    <div class=\"heading\">\n      <div class=\"tagline\">Help & Documentation</div>\n      <div class=\"description\">\n        Documentation, guides, and standard operating procedures for Human Reference Atlas usage.\n      </div>\n    </div>\n\n    <mat-divider />\n\n    <div class=\"content\">\n      <mat-nav-list>\n        @for (navMenuItem of navigationMenu(); track navMenuItem) {\n          @if (navMenuItem.type === 'category') {\n            <hra-navigation-category\n              [navigationCategory]=\"navMenuItem\"\n              [baseUrl]=\"baseUrl()\"\n              [expanded]=\"expandedCategory() === navMenuItem.label\"\n              (expandedChange)=\"changeExpandedCategory($event, navMenuItem.label)\"\n            />\n          } @else if (navMenuItem.type === 'item') {\n            <hra-navigation-item [navigationItem]=\"navMenuItem\" [baseUrl]=\"baseUrl()\" />\n          }\n          <mat-divider />\n        }\n      </mat-nav-list>\n    </div>\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:block;background-color:var(--mat-sys-surface-container-low);border-right:.0625rem solid var(--mat-sys-outline);height:calc(100vh - 4.5rem);position:sticky;top:var(--hra-site-navigation-top-offset, 4.5rem);width:20rem;--mat-divider-color: var(--mat-sys-outline-variant);--mat-list-active-indicator-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-list-list-item-label-text-color: var(--mat-sys-primary);--mat-list-list-item-hover-label-text-color: var(--mat-sys-tertiary-fixed);--mat-list-list-item-hover-state-layer-color: var(--mat-sys-on-tertiary-fixed);--mat-list-list-item-hover-state-layer-opacity: 8%;--mat-list-list-item-hover-leading-icon-color: var(--mat-sys-tertiary-fixed)}:host .scrollbar-container{padding:3rem 1rem}:host mat-nav-list{padding:0}:host .heading{padding:0 .75rem}:host .heading .tagline{color:var(--mat-sys-secondary);margin-bottom:8px;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .heading .description{color:var(--mat-sys-primary);margin-bottom:1.5rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .content{margin-top:.5rem}\n"] }]
        }], ctorParameters: () => [], propDecorators: { navigationMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigationMenu", required: false }] }], baseUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "baseUrl", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DOCS_NAVIGATION_MENU, SiteNavigationComponent };
//# sourceMappingURL=hra-ui-design-system-navigation-site-navigation.mjs.map
