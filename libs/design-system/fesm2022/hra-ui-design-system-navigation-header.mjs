import * as i2$2 from '@angular/cdk/overlay';
import { Overlay, CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { Directive, input, ChangeDetectionStrategy, Component, computed, model, inject, ElementRef, signal, viewChild, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i1$3 from '@angular/material/divider';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import * as i3$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5$1 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EventType } from '@angular/router';
import { watchBreakpoint, Breakpoints } from '@hra-ui/cdk/breakpoints';
import { LinkDirective, injectRouter } from '@hra-ui/common/router-ext';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { explicitEffect } from 'ngxtension/explicit-effect';
import { filter } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i6 from '@hra-ui/common';
import { HraCommonModule } from '@hra-ui/common';
import * as i2 from '@hra-ui/design-system/buttons/app-nav-button';
import * as i3 from '@hra-ui/common/url';
import * as i1$1 from '@hra-ui/common/analytics';
import * as i4 from '@angular/material/button';
import * as i5 from '@hra-ui/design-system/buttons/button';
import * as i1$2 from 'ngx-scrollbar';
import * as i2$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i6$1 from '@hra-ui/design-system/brand/logo';
import * as i8 from '@hra-ui/design-system/buttons/breadcrumbs';
import * as i9 from '@hra-ui/design-system/buttons/navigation-category-toggle';

/** Directive used to type the context for menu group templates */
class HubmapMenuGroupDirective {
    /** Types the context as `HubmapMenuGroup` */
    /* istanbul ignore next */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HubmapMenuGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.12", type: HubmapMenuGroupDirective, isStandalone: true, selector: "ng-template[hraHubmapMenuGroup]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HubmapMenuGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraHubmapMenuGroup]',
                }]
        }] });
/** Directive used to type the context for menu item templates */
class HubmapMenuItemDirective {
    /** Types the context as `HubmapMenuItem` */
    /* istanbul ignore next */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HubmapMenuItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.12", type: HubmapMenuItemDirective, isStandalone: true, selector: "ng-template[hraHubmapMenuItem]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HubmapMenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraHubmapMenuItem]',
                }]
        }] });
/**
 * Displays the content of a hubmap menu.
 * Works for both mobile and desktop size screens.
 */
class HubmapMenuContentComponent {
    /** Menu data to display */
    menu = input.required(...(ngDevMode ? [{ debugName: "menu" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HubmapMenuContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: HubmapMenuContentComponent, isStandalone: true, selector: "hra-hubmap-menu-content", inputs: { menu: { classPropertyName: "menu", publicName: "menu", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@for (group of menu(); track $index) {\n  <ng-container *ngTemplateOutlet=\"groupTemplate; context: { $implicit: group }\" />\n}\n\n<ng-template let-group hraHubmapMenuGroup #groupTemplate>\n  <div class=\"group-label\">\n    {{ group.label }}\n  </div>\n\n  <div class=\"group-items\">\n    @for (item of group.items; track $index) {\n      <ng-container *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\" />\n    }\n  </div>\n</ng-template>\n\n<ng-template let-item hraHubmapMenuItem #itemTemplate>\n  <hra-app-nav-button\n    class=\"item-button\"\n    [tagline]=\"item.label\"\n    [description]=\"item.description\"\n    [icon]=\"item.icon | assetUrl\"\n    [link]=\"item.url\"\n  />\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .group-label{height:2.5rem;min-height:2.5rem;padding:0 1.5rem;align-content:center;color:var(--mat-sys-on-primary-fixed)}:host .group-items{display:contents}:host .group-items+.group-label{margin-top:.75rem}:host .item-button{--hra-app-nav-button-padding: .5rem 1.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.AppNavButtonComponent, selector: "hra-app-nav-button", inputs: ["icon", "tagline", "description", "link"] }, { kind: "directive", type: HubmapMenuGroupDirective, selector: "ng-template[hraHubmapMenuGroup]" }, { kind: "directive", type: HubmapMenuItemDirective, selector: "ng-template[hraHubmapMenuItem]" }, { kind: "pipe", type: i3.AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HubmapMenuContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-hubmap-menu-content', imports: [HraCommonModule, ButtonsModule, HubmapMenuGroupDirective, HubmapMenuItemDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (group of menu(); track $index) {\n  <ng-container *ngTemplateOutlet=\"groupTemplate; context: { $implicit: group }\" />\n}\n\n<ng-template let-group hraHubmapMenuGroup #groupTemplate>\n  <div class=\"group-label\">\n    {{ group.label }}\n  </div>\n\n  <div class=\"group-items\">\n    @for (item of group.items; track $index) {\n      <ng-container *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\" />\n    }\n  </div>\n</ng-template>\n\n<ng-template let-item hraHubmapMenuItem #itemTemplate>\n  <hra-app-nav-button\n    class=\"item-button\"\n    [tagline]=\"item.label\"\n    [description]=\"item.description\"\n    [icon]=\"item.icon | assetUrl\"\n    [link]=\"item.url\"\n  />\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .group-label{height:2.5rem;min-height:2.5rem;padding:0 1.5rem;align-content:center;color:var(--mat-sys-on-primary-fixed)}:host .group-items{display:contents}:host .group-items+.group-label{margin-top:.75rem}:host .item-button{--hra-app-nav-button-padding: .5rem 1.5rem}\n"] }]
        }], propDecorators: { menu: [{ type: i0.Input, args: [{ isSignal: true, alias: "menu", required: true }] }] } });

/** Directive used to type the context for menu group templates */
class MenuGroupDirective {
    /** Types the context as `MenuGroup` */
    /* istanbul ignore next */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.12", type: MenuGroupDirective, isStandalone: true, selector: "ng-template[hraMenuGroup]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraMenuGroup]',
                }]
        }] });
/** Directive used to type the context for menu item templates */
class MenuItemDirective {
    /** Types the context as `MenuItem` */
    /* istanbul ignore next */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.12", type: MenuItemDirective, isStandalone: true, selector: "ng-template[hraMenuItem]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraMenuItem]',
                }]
        }] });
/** Directive used to type the context for menu subgroup templates */
class MenuSubGroupDirective {
    /** Types the context as `MenuSubGroup` */
    /* istanbul ignore next */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuSubGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.12", type: MenuSubGroupDirective, isStandalone: true, selector: "ng-template[hraMenuSubGroup]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuSubGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraMenuSubGroup]',
                }]
        }] });
/**
 * Displays the content of a menu.
 * Has variants for both mobile and desktop size screens.
 */
class MenuContentComponent {
    /** Display mode */
    variant = input.required(...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** Menu data to display */
    menu = input.required(...(ngDevMode ? [{ debugName: "menu" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: MenuContentComponent, isStandalone: true, selector: "hra-menu-content", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: true, transformFunction: null }, menu: { classPropertyName: "menu", publicName: "menu", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"menu-content-variant-\" + variant()" } }, ngImport: i0, template: "@let isDesktop = variant() === 'desktop';\n@for (item of menu().items; track $index) {\n  @if (item.type === 'group') {\n    <ng-container *ngTemplateOutlet=\"groupTemplate; context: { $implicit: item }\" />\n  } @else if (isDesktop) {\n    <mat-divider class=\"divider\" />\n  }\n}\n\n<ng-template let-group hraMenuGroup #groupTemplate>\n  <a\n    mat-button\n    class=\"group-label\"\n    rel=\"noopener noreferrer\"\n    hraClickEvent\n    [hraLink]=\"group.url\"\n    [hraLinkExternal]=\"group.external\"\n    [hraFeature]=\"group.label | slugify\"\n  >\n    {{ group.label }}\n    <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n  </a>\n\n  @if (group.description) {\n    <div class=\"group-description\">\n      {{ group.description }}\n    </div>\n  }\n\n  @let items = group.items ?? [];\n  @if (items.length > 0) {\n    @if (isDesktop) {\n      <mat-divider class=\"divider\" />\n    }\n\n    @for (item of items; track $index) {\n      @let template = item.type === 'subgroup' ? subgroupTemplate : itemTemplate;\n      <ng-container *ngTemplateOutlet=\"template; context: { $implicit: item }\" />\n    }\n  }\n</ng-template>\n\n<ng-template let-subgroup hraMenuSubGroup #subgroupTemplate>\n  <div class=\"subgroup-label\">\n    {{ subgroup.label }}\n  </div>\n  <div class=\"subgroup-items\">\n    @for (item of subgroup.items; track $index) {\n      <ng-container *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\" />\n    }\n  </div>\n</ng-template>\n\n<ng-template let-item hraMenuItem #itemTemplate>\n  <a\n    mat-button\n    hraSecondaryButton\n    class=\"item-label\"\n    rel=\"noopener noreferrer\"\n    hraClickEvent\n    [hraLink]=\"item.url\"\n    [hraLinkExternal]=\"item.external\"\n    [hraFeature]=\"item.label | slugify\"\n  >\n    {{ item.label }}\n  </a>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);--hra-header-menu-content-item-horizontal-padding: 1.5rem}:host .divider{margin:.5rem 0}:host .group-label,:host .group-description,:host .item-label,:host .subgroup-label{height:auto;min-height:2.5rem;padding:.375rem var(--hra-header-menu-content-item-horizontal-padding)}:host .group-label,:host .item-label{justify-content:start}:host .group-label{--mat-button-text-icon-spacing: .375rem}:host .group-description,:host .subgroup-label{align-content:center;color:var(--mat-sys-on-primary-fixed)}:host .subgroup-label{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .subgroup-items{display:contents}:host.menu-content-variant-mobile .item-label,:host.menu-content-variant-mobile .group-description{--hra-header-menu-content-item-horizontal-padding: 2.5rem}:host.menu-content-variant-mobile .group-description+.group-label,:host.menu-content-variant-mobile .item-label+.group-label,:host.menu-content-variant-mobile .subgroup-items+.subgroup-label{margin-top:.75rem}:host.menu-content-variant-desktop .subgroup-items .item-label{--hra-header-menu-content-item-horizontal-padding: 3rem}:host.menu-content-variant-desktop .subgroup-items+.subgroup-label{margin-top:.75rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1$1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1$1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: LinkDirective, selector: "a[hraLink], area[hraLink]", inputs: ["hraLink", "hraLinkExternal"] }, { kind: "component", type: MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i4.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i5.SecondaryButtonVariantDirective, selector: "button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]" }, { kind: "directive", type: MenuGroupDirective, selector: "ng-template[hraMenuGroup]" }, { kind: "directive", type: MenuItemDirective, selector: "ng-template[hraMenuItem]" }, { kind: "directive", type: MenuSubGroupDirective, selector: "ng-template[hraMenuSubGroup]" }, { kind: "pipe", type: i6.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MenuContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-menu-content', imports: [
                        HraCommonModule,
                        LinkDirective,
                        MatDivider,
                        MatIconModule,
                        ButtonsModule,
                        MenuGroupDirective,
                        MenuItemDirective,
                        MenuSubGroupDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"menu-content-variant-" + variant()',
                    }, template: "@let isDesktop = variant() === 'desktop';\n@for (item of menu().items; track $index) {\n  @if (item.type === 'group') {\n    <ng-container *ngTemplateOutlet=\"groupTemplate; context: { $implicit: item }\" />\n  } @else if (isDesktop) {\n    <mat-divider class=\"divider\" />\n  }\n}\n\n<ng-template let-group hraMenuGroup #groupTemplate>\n  <a\n    mat-button\n    class=\"group-label\"\n    rel=\"noopener noreferrer\"\n    hraClickEvent\n    [hraLink]=\"group.url\"\n    [hraLinkExternal]=\"group.external\"\n    [hraFeature]=\"group.label | slugify\"\n  >\n    {{ group.label }}\n    <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n  </a>\n\n  @if (group.description) {\n    <div class=\"group-description\">\n      {{ group.description }}\n    </div>\n  }\n\n  @let items = group.items ?? [];\n  @if (items.length > 0) {\n    @if (isDesktop) {\n      <mat-divider class=\"divider\" />\n    }\n\n    @for (item of items; track $index) {\n      @let template = item.type === 'subgroup' ? subgroupTemplate : itemTemplate;\n      <ng-container *ngTemplateOutlet=\"template; context: { $implicit: item }\" />\n    }\n  }\n</ng-template>\n\n<ng-template let-subgroup hraMenuSubGroup #subgroupTemplate>\n  <div class=\"subgroup-label\">\n    {{ subgroup.label }}\n  </div>\n  <div class=\"subgroup-items\">\n    @for (item of subgroup.items; track $index) {\n      <ng-container *ngTemplateOutlet=\"itemTemplate; context: { $implicit: item }\" />\n    }\n  </div>\n</ng-template>\n\n<ng-template let-item hraMenuItem #itemTemplate>\n  <a\n    mat-button\n    hraSecondaryButton\n    class=\"item-label\"\n    rel=\"noopener noreferrer\"\n    hraClickEvent\n    [hraLink]=\"item.url\"\n    [hraLinkExternal]=\"item.external\"\n    [hraFeature]=\"item.label | slugify\"\n  >\n    {{ item.label }}\n  </a>\n</ng-template>\n", styles: [":host{display:flex;flex-direction:column;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);--hra-header-menu-content-item-horizontal-padding: 1.5rem}:host .divider{margin:.5rem 0}:host .group-label,:host .group-description,:host .item-label,:host .subgroup-label{height:auto;min-height:2.5rem;padding:.375rem var(--hra-header-menu-content-item-horizontal-padding)}:host .group-label,:host .item-label{justify-content:start}:host .group-label{--mat-button-text-icon-spacing: .375rem}:host .group-description,:host .subgroup-label{align-content:center;color:var(--mat-sys-on-primary-fixed)}:host .subgroup-label{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .subgroup-items{display:contents}:host.menu-content-variant-mobile .item-label,:host.menu-content-variant-mobile .group-description{--hra-header-menu-content-item-horizontal-padding: 2.5rem}:host.menu-content-variant-mobile .group-description+.group-label,:host.menu-content-variant-mobile .item-label+.group-label,:host.menu-content-variant-mobile .subgroup-items+.subgroup-label{margin-top:.75rem}:host.menu-content-variant-desktop .subgroup-items .item-label{--hra-header-menu-content-item-horizontal-padding: 3rem}:host.menu-content-variant-desktop .subgroup-items+.subgroup-label{margin-top:.75rem}\n"] }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: true }] }], menu: [{ type: i0.Input, args: [{ isSignal: true, alias: "menu", required: true }] }] } });

/**
 * Display a menu for desktop sized screens
 */
class DesktopMenuComponent {
    /** Menu to display */
    menu = input.required(...(ngDevMode ? [{ debugName: "menu" }] : []));
    /** Menu object along with whether it is a hubmap or regular menu type */
    typedMenu = computed(() => {
        const menu = this.menu();
        return Array.isArray(menu) ? { type: 'hubmap', menu } : { type: 'menu', menu };
    }, ...(ngDevMode ? [{ debugName: "typedMenu" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: DesktopMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: DesktopMenuComponent, isStandalone: true, selector: "hra-desktop-menu", inputs: { menu: { classPropertyName: "menu", publicName: "menu", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-scrollbar>\n  @let typed = typedMenu();\n  @if (typed.type === 'menu') {\n    <hra-menu-content variant=\"desktop\" [menu]=\"typed.menu\" />\n  } @else {\n    <hra-hubmap-menu-content [menu]=\"typed.menu\" />\n  }\n</ng-scrollbar>\n", styles: [":host{display:block;max-width:26.75rem;padding:.75rem 0;border-radius:.5rem;background-color:var(--mat-sys-surface-dim);box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-secondary) r g b/20%)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i1$2.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "component", type: HubmapMenuContentComponent, selector: "hra-hubmap-menu-content", inputs: ["menu"] }, { kind: "component", type: MenuContentComponent, selector: "hra-menu-content", inputs: ["variant", "menu"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: DesktopMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-desktop-menu', imports: [CommonModule, ScrollingModule, HubmapMenuContentComponent, MenuContentComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-scrollbar>\n  @let typed = typedMenu();\n  @if (typed.type === 'menu') {\n    <hra-menu-content variant=\"desktop\" [menu]=\"typed.menu\" />\n  } @else {\n    <hra-hubmap-menu-content [menu]=\"typed.menu\" />\n  }\n</ng-scrollbar>\n", styles: [":host{display:block;max-width:26.75rem;padding:.75rem 0;border-radius:.5rem;background-color:var(--mat-sys-surface-dim);box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-secondary) r g b/20%)}\n"] }]
        }], propDecorators: { menu: [{ type: i0.Input, args: [{ isSignal: true, alias: "menu", required: true }] }] } });

/**
 * Display a menu for mobile sized screens
 */
class MobileMenuComponent {
    /** Hubmap menu */
    hubmapMenu = input.required(...(ngDevMode ? [{ debugName: "hubmapMenu" }] : []));
    /** All other menus */
    menus = input.required(...(ngDevMode ? [{ debugName: "menus" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MobileMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: MobileMenuComponent, isStandalone: true, selector: "hra-mobile-menu", inputs: { hubmapMenu: { classPropertyName: "hubmapMenu", publicName: "hubmapMenu", isSignal: true, isRequired: true, transformFunction: null }, menus: { classPropertyName: "menus", publicName: "menus", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<mat-divider />\n<ng-scrollbar>\n  <mat-accordion displayMode=\"flat\" multi=\"false\">\n    @for (menu of menus(); track $index) {\n      <mat-expansion-panel class=\"panel\" hideToggle>\n        <mat-expansion-panel-header class=\"header\">\n          <mat-panel-title>\n            {{ menu.label }}\n            <mat-icon class=\"toggle-icon\" />\n          </mat-panel-title>\n        </mat-expansion-panel-header>\n\n        <hra-menu-content class=\"content\" variant=\"mobile\" [menu]=\"menu\" />\n      </mat-expansion-panel>\n\n      <mat-divider />\n    }\n\n    <mat-expansion-panel class=\"panel\" hideToggle>\n      <mat-expansion-panel-header class=\"header\">\n        <mat-panel-title>\n          HuBMAP Tools & Applications\n          <mat-icon class=\"toggle-icon\" />\n        </mat-panel-title>\n      </mat-expansion-panel-header>\n\n      <hra-hubmap-menu-content class=\"content\" [menu]=\"hubmapMenu()\" />\n    </mat-expansion-panel>\n\n    <mat-divider />\n  </mat-accordion>\n</ng-scrollbar>\n", styles: [":host{display:block;width:100%;background-color:var(--mat-sys-surface-dim);--mat-expansion-container-shape: var(--mat-sys-corner-none);--mat-expansion-container-background-color: var(--mat-sys-surface-dim);--mat-expansion-header-collapsed-state-height: 4rem;--mat-expansion-header-expanded-state-height: 4rem;--mat-expansion-header-text-font: var(--mat-sys-label-large-font);--mat-expansion-header-text-size: var(--mat-sys-label-large-size);--mat-expansion-header-text-weight: var(--mat-sys-label-large-weight);--mat-expansion-header-text-line-height: var(--mat-sys-label-large-line-height);--mat-expansion-header-text-tracking: var(--mat-sys-label-large-tracking);--mat-divider-color: var(--mat-sys-outline-variant)}:host .panel{box-shadow:none}:host .header{padding:0 1rem}:host .header .toggle-icon{margin-left:.125rem}:host .header .toggle-icon,:host .header .toggle-icon:after{width:1.25rem;height:1.25rem;font-size:1.25rem;line-height:1.25rem}:host .header .toggle-icon:after{display:block;content:\"keyboard_arrow_down\"}:host .mat-expanded .header{text-decoration:underline .125rem var(--mat-sys-tertiary);text-underline-offset:.375rem}:host .mat-expanded .header .toggle-icon:after{content:\"keyboard_arrow_up\"}:host .content{margin-bottom:.75rem}:host ::ng-deep .mat-expansion-panel-body{padding:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i1$3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "directive", type: i2$1.MatAccordion, selector: "mat-accordion", inputs: ["hideToggle", "displayMode", "togglePosition"], exportAs: ["matAccordion"] }, { kind: "component", type: i2$1.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["hideToggle", "togglePosition"], outputs: ["afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i2$1.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["expandedHeight", "collapsedHeight", "tabIndex"] }, { kind: "directive", type: i2$1.MatExpansionPanelTitle, selector: "mat-panel-title" }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i1$2.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "component", type: HubmapMenuContentComponent, selector: "hra-hubmap-menu-content", inputs: ["menu"] }, { kind: "component", type: MenuContentComponent, selector: "hra-menu-content", inputs: ["variant", "menu"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MobileMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-mobile-menu', imports: [
                        CommonModule,
                        MatDividerModule,
                        MatExpansionModule,
                        MatIconModule,
                        ScrollingModule,
                        HubmapMenuContentComponent,
                        MenuContentComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-divider />\n<ng-scrollbar>\n  <mat-accordion displayMode=\"flat\" multi=\"false\">\n    @for (menu of menus(); track $index) {\n      <mat-expansion-panel class=\"panel\" hideToggle>\n        <mat-expansion-panel-header class=\"header\">\n          <mat-panel-title>\n            {{ menu.label }}\n            <mat-icon class=\"toggle-icon\" />\n          </mat-panel-title>\n        </mat-expansion-panel-header>\n\n        <hra-menu-content class=\"content\" variant=\"mobile\" [menu]=\"menu\" />\n      </mat-expansion-panel>\n\n      <mat-divider />\n    }\n\n    <mat-expansion-panel class=\"panel\" hideToggle>\n      <mat-expansion-panel-header class=\"header\">\n        <mat-panel-title>\n          HuBMAP Tools & Applications\n          <mat-icon class=\"toggle-icon\" />\n        </mat-panel-title>\n      </mat-expansion-panel-header>\n\n      <hra-hubmap-menu-content class=\"content\" [menu]=\"hubmapMenu()\" />\n    </mat-expansion-panel>\n\n    <mat-divider />\n  </mat-accordion>\n</ng-scrollbar>\n", styles: [":host{display:block;width:100%;background-color:var(--mat-sys-surface-dim);--mat-expansion-container-shape: var(--mat-sys-corner-none);--mat-expansion-container-background-color: var(--mat-sys-surface-dim);--mat-expansion-header-collapsed-state-height: 4rem;--mat-expansion-header-expanded-state-height: 4rem;--mat-expansion-header-text-font: var(--mat-sys-label-large-font);--mat-expansion-header-text-size: var(--mat-sys-label-large-size);--mat-expansion-header-text-weight: var(--mat-sys-label-large-weight);--mat-expansion-header-text-line-height: var(--mat-sys-label-large-line-height);--mat-expansion-header-text-tracking: var(--mat-sys-label-large-tracking);--mat-divider-color: var(--mat-sys-outline-variant)}:host .panel{box-shadow:none}:host .header{padding:0 1rem}:host .header .toggle-icon{margin-left:.125rem}:host .header .toggle-icon,:host .header .toggle-icon:after{width:1.25rem;height:1.25rem;font-size:1.25rem;line-height:1.25rem}:host .header .toggle-icon:after{display:block;content:\"keyboard_arrow_down\"}:host .mat-expanded .header{text-decoration:underline .125rem var(--mat-sys-tertiary);text-underline-offset:.375rem}:host .mat-expanded .header .toggle-icon:after{content:\"keyboard_arrow_up\"}:host .content{margin-bottom:.75rem}:host ::ng-deep .mat-expansion-panel-body{padding:0}\n"] }]
        }], propDecorators: { hubmapMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "hubmapMenu", required: true }] }], menus: [{ type: i0.Input, args: [{ isSignal: true, alias: "menus", required: true }] }] } });

var $schema$1 = "../types/hubmap-menu.schema.json";
var groups = [
	{
		label: "About HuBMAP",
		items: [
			{
				label: "HuBMAP Consortium",
				description: "HuBMAP all access: Learn about us, our policies, data, and tools. Explore our publications and how to work with us.",
				icon: "assets/logo/hubmap.svg",
				url: "https://hubmapconsortium.org/"
			}
		]
	},
	{
		label: "Data",
		items: [
			{
				label: "HuBMAP Data Portal",
				description: "Explore, visualize and download consortium-generated spatial and single cell data for the human body.",
				icon: "assets/logo/data_portal.svg",
				url: "https://portal.hubmapconsortium.org/"
			},
			{
				label: "Data Portal Workspaces",
				description: "Access HuBMAP data in a lightweight exploration platform and perform analyses directly within the portal.",
				icon: "assets/logo/data_portal.svg",
				url: "https://portal.hubmapconsortium.org/workspaces"
			}
		]
	},
	{
		label: "Atlas",
		items: [
			{
				label: "Human Reference Atlas",
				description: "Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.",
				icon: "assets/logo/hra_small.svg",
				url: "https://humanatlas.io/"
			}
		]
	},
	{
		label: "Analytics Tools",
		items: [
			{
				label: "Azimuth",
				description: "Azimuth uses a reference dataset to process, analyze, and interpret single-cell RNA-seq or ATAC-seq experiments.",
				icon: "assets/logo/azimuth.svg",
				url: "https://azimuth.hubmapconsortium.org/"
			},
			{
				label: "FUSION",
				description: "Functional Unit State Identification and Navigation with WSI.",
				icon: "assets/logo/fusion.svg",
				url: "http://fusion.hubmapconsortium.org/?utm_source=hubmap"
			},
			{
				label: "Antibody Validation Reports",
				description: "Provide antibody details for multiplex imaging assays and capture data requested by journals for manuscript submission.",
				icon: "assets/logo/antibody-validation-reports.svg",
				url: "https://avr.xconsortia.org/"
			}
		]
	}
];
var hubmapMenu = {
	$schema: $schema$1,
	groups: groups
};

var $schema = "../types/menus.schema.json";
var menus = [
	{
		type: "menu",
		id: "data",
		label: "Data",
		items: [
			{
				type: "group",
				label: "Data Overview",
				description: "Learn about digital objects, the unique data structures, constructing the Human Reference Atlas",
				url: "https://humanatlas.io/overview-data/",
				items: [
					{
						type: "item",
						label: "3D Reference Object Library",
						url: "https://humanatlas.io/3d-reference-library/"
					},
					{
						type: "item",
						label: "Anatomical Structures, Cell Types, and Biomarkers (ASCT+B) Tables",
						url: "https://humanatlas.io/asctb-tables/"
					},
					{
						type: "item",
						label: "Cell Type Annotations",
						url: "https://humanatlas.io/cell-type-annotations/"
					},
					{
						type: "item",
						label: "Functional Tissue Unit Illustrations",
						url: "https://humanatlas.io/2d-ftu-illustrations/"
					},
					{
						type: "item",
						label: "Millitomes",
						url: "https://humanatlas.io/millitome/"
					},
					{
						type: "item",
						label: "Organ Mapping Antibody Panels",
						url: "https://humanatlas.io/omap/"
					}
				]
			},
			{
				type: "divider"
			},
			{
				type: "group",
				label: "Vasculature Common Coordinate Framework",
				url: "https://humanatlas.io/vccf/"
			},
			{
				type: "divider"
			},
			{
				type: "group",
				label: "HRA API",
				description: "Get API access to all Human Reference Atlas datasets.",
				url: "https://apps.humanatlas.io/api/"
			},
			{
				type: "group",
				label: "Knowledge Graph",
				url: "https://lod.humanatlas.io/",
				description: "Query, filter, and download digital objects"
			},
			{
				type: "divider"
			},
			{
				type: "group",
				label: "HuBMAP Data Portal",
				url: "https://portal.hubmapconsortium.org/",
				external: true
			},
			{
				type: "group",
				label: "SenNet Data Portal",
				url: "https://data.sennetconsortium.org/search/",
				external: true
			}
		]
	},
	{
		type: "menu",
		id: "applications",
		label: "Apps",
		items: [
			{
				type: "group",
				label: "App Library",
				url: "https://apps.humanatlas.io/",
				items: [
					{
						type: "subgroup",
						label: "Researcher Apps: Usage",
						items: [
							{
								type: "item",
								label: "Cell Distance Explorer",
								url: "https://apps.humanatlas.io/cde/"
							},
							{
								type: "item",
								label: "Cell Population Graphs",
								url: "https://apps.humanatlas.io/cell-population-graphs/"
							},
							{
								type: "item",
								label: "Cell Population Predictor",
								url: "https://apps.humanatlas.io/us1/"
							},
							{
								type: "item",
								label: "Dashboard",
								url: "https://apps.humanatlas.io/dashboard/"
							},
							{
								type: "item",
								label: "Exploration User Interface",
								url: "https://apps.humanatlas.io/eui/"
							},
							{
								type: "item",
								label: "Functional Tissue Unit Explorer",
								url: "https://apps.humanatlas.io/ftu-explorer/"
							},
							{
								type: "item",
								label: "HRA Organ Gallery",
								url: "https://humanatlas.io/hra-organ-gallery"
							},
							{
								type: "item",
								label: "HRApop Visualizer",
								url: "https://apps.humanatlas.io/hra-pop-visualizer"
							},
							{
								type: "item",
								label: "Tissue Origin Predictor",
								url: "https://apps.humanatlas.io/us2/"
							}
						]
					},
					{
						type: "subgroup",
						label: "Researcher Apps: Construction",
						items: [
							{
								type: "item",
								label: "ASCT+B Reporter",
								url: "https://apps.humanatlas.io/asctb-reporter/"
							},
							{
								type: "item",
								label: "Registration User Interface",
								url: "https://apps.humanatlas.io/rui/"
							}
						]
					},
					{
						type: "subgroup",
						label: "Developer Apps",
						items: [
							{
								type: "item",
								label: "APIs",
								url: "https://apps.humanatlas.io/api/"
							},
							{
								type: "item",
								label: "Knowledge Graph",
								url: "https://lod.humanatlas.io/"
							},
							{
								type: "item",
								label: "Web Components",
								url: "https://apps.humanatlas.io/us6/"
							}
						]
					}
				]
			}
		]
	},
	{
		type: "menu",
		id: "training",
		label: "Training",
		items: [
			{
				type: "group",
				label: "Training Overview",
				url: "https://humanatlas.io/overview-training-outreach/",
				items: [
					{
						type: "item",
						label: "Visible Human Course",
						url: "https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc/",
						external: true
					},
					{
						type: "item",
						label: "Standard Operating Procedures",
						url: "https://humanatlas.io/standard-operating-procedures/"
					},
					{
						type: "item",
						label: "Human Atlas Stories",
						url: "https://humanatlas.io/overview-training-outreach#human-atlas-stories"
					},
					{
						type: "item",
						label: "Kaggle Competitions",
						url: "https://humanatlas.io/overview-training-outreach#kaggle-competitions"
					},
					{
						type: "item",
						label: "Release Notes",
						url: "https://humanatlas.io/release-notes"
					},
					{
						type: "item",
						label: "Previews",
						url: "https://humanatlas.io/overview-training-outreach#previews"
					}
				]
			}
		]
	},
	{
		type: "menu",
		id: "about",
		label: "About",
		items: [
			{
				type: "group",
				label: "Join the HRA Working Group",
				url: "https://iu.co1.qualtrics.com/jfe/form/SV_bpaBhIr8XfdiNRH",
				external: true,
				items: [
					{
						type: "item",
						label: "About the HRA",
						url: "https://humanatlas.io/about/"
					},
					{
						type: "item",
						label: "Editorial Board",
						url: "https://humanatlas.io/about#editorial-board"
					},
					{
						type: "item",
						label: "Publications",
						url: "https://humanatlas.io/publications"
					},
					{
						type: "item",
						label: "Funding",
						url: "https://humanatlas.io/about#funding"
					}
				]
			}
		]
	}
];
var menus$1 = {
	$schema: $schema,
	menus: menus
};

/** Hubmap menu objects */
const HUBMAP_MENU = groups;
/** Menus objects */
const MENUS = menus;

/** Position of the mobile menu overlay */
const MOBILE_MENU_POSITIONS = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
];
/** Position of the desktop menu overlay */
const DESKTOP_MENU_POSITIONS = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: -16, offsetY: 16 },
];
/**
 * Global navigation header.
 * Includes a call to action bar, navigation menus, breadcrumbs, and a progress bar.
 */
class HeaderComponent {
    /** Call to action configuration */
    cta = input(...(ngDevMode ? [undefined, { debugName: "cta" }] : []));
    /** Hubmap menu data */
    hubmapMenu = input(HUBMAP_MENU, ...(ngDevMode ? [{ debugName: "hubmapMenu" }] : []));
    /** All other menus */
    menus = input(MENUS, ...(ngDevMode ? [{ debugName: "menus" }] : []));
    /** Breadcrumb items */
    breadcrumbs = input(...(ngDevMode ? [undefined, { debugName: "breadcrumbs" }] : []));
    /**
     * Progress bar progress.
     * Use `true` for an indeterminate bar and values between `0` and `100` for a determinate bar.
     * Using false disables and hides the progress bar.
     */
    progress = input(false, ...(ngDevMode ? [{ debugName: "progress" }] : []));
    /** Whether the user has dismissed the call to action */
    ctaDismissed = model(false, ...(ngDevMode ? [{ debugName: "ctaDismissed" }] : []));
    /** Progress bar mode */
    progressMode = computed(() => {
        return typeof this.progress() === 'boolean' ? 'indeterminate' : 'determinate';
    }, ...(ngDevMode ? [{ debugName: "progressMode" }] : []));
    /** Whether the screen is currently mobile sized */
    isMobile = watchBreakpoint(Breakpoints.Mobile);
    /** Reference to this component's html element */
    elementRef = inject(ElementRef);
    /** Overlay positions for the mobile menu */
    mobileMenuPositions = MOBILE_MENU_POSITIONS;
    /** Overlay positions for the desktop menu */
    desktopMenuPositions = DESKTOP_MENU_POSITIONS;
    /** Blocking overlay scroll strategy */
    mobileMenuBlockScroll = inject(Overlay).scrollStrategies.block();
    /** Offset from top to the menu. Used to calculate menu heights and max heights */
    menuOffsetPx = signal(0, ...(ngDevMode ? [{ debugName: "menuOffsetPx" }] : []));
    /** Mobile menu height. Fills the entire screen */
    mobileMenuHeight = computed(() => `calc(100vh - ${this.menuOffsetPx()}px)`, ...(ngDevMode ? [{ debugName: "mobileMenuHeight" }] : []));
    /** Desktop menu max height */
    desktopMenuMaxHeight = computed(() => `calc(100vh - ${this.menuOffsetPx()}px - 16px)`, ...(ngDevMode ? [{ debugName: "desktopMenuMaxHeight" }] : []));
    /** Mobile menu overlay origin */
    mobileMenuOrigin = viewChild.required('mobileMenuOrigin', { read: ElementRef });
    /** Desktop menu overlay origin */
    desktopMenuOrigin = viewChild.required('desktopMenuOrigin', { read: ElementRef });
    /** Reference to the mobile overlay */
    mobileMenuOverlay = viewChild('mobileMenuOverlay', ...(ngDevMode ? [{ debugName: "mobileMenuOverlay", read: CdkConnectedOverlay }] : [{ read: CdkConnectedOverlay }]));
    /** Currently open menu or undefined */
    activeMenu = signal(undefined, ...(ngDevMode ? [{ debugName: "activeMenu" }] : []));
    /** Initialize the header */
    constructor() {
        effect((cleanup) => {
            if (this.activeMenu() !== undefined) {
                const observer = this.attachResizeObserver();
                cleanup(() => observer.disconnect());
            }
        });
        explicitEffect([this.menuOffsetPx], () => this.updateMenuPositions(), { defer: true });
        injectRouter({ optional: true })
            ?.events.pipe(takeUntilDestroyed(), filter((navigationEvent) => [EventType.NavigationEnd, EventType.NavigationSkipped].includes(navigationEvent.type)))
            .subscribe(() => this.closeMenu());
    }
    /**
     * Determine whether the specified menu is open
     *
     * @param menu The menu to check
     * @returns true if the menu is open, false otherwise
     */
    isMenuActive(menu) {
        return this.activeMenu() === menu;
    }
    /**
     * Toggles a menu open or close
     *
     * @param menu Menu to toggle
     */
    toggleMenu(menu) {
        this.activeMenu.update((current) => (menu !== current ? menu : undefined));
    }
    /**
     * Closes any active menu
     */
    closeMenu(menu) {
        this.activeMenu.update((current) => (menu !== undefined && current !== menu ? current : undefined));
    }
    /**
     * Creates and attaches a resize observer that updates the menu offset
     * whenever the header size changes
     *
     * @returns The resize observer
     */
    attachResizeObserver() {
        const observer = new ResizeObserver(() => this.updateMenuOffset());
        observer.observe(this.elementRef.nativeElement, { box: 'border-box' });
        this.updateMenuOffset();
        return observer;
    }
    /**
     * Computes the bounding box for the menu's overlay origin element
     *
     * @returns The computed bounding box
     */
    getMenuOriginBbox() {
        const origin = this.isMobile() ? this.mobileMenuOrigin() : this.desktopMenuOrigin();
        return origin.nativeElement.getBoundingClientRect();
    }
    /**
     * Updates the menu offset based on the overlay origin's bounding box
     */
    updateMenuOffset() {
        const { bottom } = this.getMenuOriginBbox();
        this.menuOffsetPx.set(bottom);
    }
    /**
     * Notify menu overlays of position changes
     */
    updateMenuPositions() {
        /* istanbul ignore next */
        this.mobileMenuOverlay()?.overlayRef?.updatePosition();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: HeaderComponent, isStandalone: true, selector: "hra-header", inputs: { cta: { classPropertyName: "cta", publicName: "cta", isSignal: true, isRequired: false, transformFunction: null }, hubmapMenu: { classPropertyName: "hubmapMenu", publicName: "hubmapMenu", isSignal: true, isRequired: false, transformFunction: null }, menus: { classPropertyName: "menus", publicName: "menus", isSignal: true, isRequired: false, transformFunction: null }, breadcrumbs: { classPropertyName: "breadcrumbs", publicName: "breadcrumbs", isSignal: true, isRequired: false, transformFunction: null }, progress: { classPropertyName: "progress", publicName: "progress", isSignal: true, isRequired: false, transformFunction: null }, ctaDismissed: { classPropertyName: "ctaDismissed", publicName: "ctaDismissed", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { ctaDismissed: "ctaDismissedChange" }, viewQueries: [{ propertyName: "mobileMenuOrigin", first: true, predicate: ["mobileMenuOrigin"], descendants: true, read: ElementRef, isSignal: true }, { propertyName: "desktopMenuOrigin", first: true, predicate: ["desktopMenuOrigin"], descendants: true, read: ElementRef, isSignal: true }, { propertyName: "mobileMenuOverlay", first: true, predicate: ["mobileMenuOverlay"], descendants: true, read: CdkConnectedOverlay, isSignal: true }], ngImport: i0, template: "@let ctaConfig = cta();\n@if (ctaConfig && !ctaDismissed()) {\n  <hra-cta-bar\n    hraFeature=\"cta-bar\"\n    [action]=\"ctaConfig.action\"\n    [description]=\"ctaConfig.description\"\n    [url]=\"ctaConfig.url\"\n    (closeClick)=\"ctaDismissed.set(true)\"\n  />\n}\n\n<header\n  hraFeature=\"header\"\n  class=\"header\"\n  cdkOverlayOrigin\n  data-testid=\"header\"\n  [class.mobile-menu-open]=\"isMobile() && isMenuActive('main')\"\n  #mobileMenuOrigin=\"cdkOverlayOrigin\"\n>\n  <div hraFeature=\"navigation\" class=\"menus\" #desktopMenuOrigin>\n    <hra-brand-logo hraFeature=\"brand-logo\" size=\"small\" />\n\n    <div class=\"filler\"></div>\n\n    @if (!isMobile()) {\n      @for (menu of menus(); track menu.id) {\n        <hra-navigation-category-toggle\n          hraClickEvent\n          hraHoverEvent\n          cdkOverlayOrigin\n          [hraFeature]=\"menu.id | slugify\"\n          [toggled]=\"isMenuActive(menu)\"\n          (toggledChange)=\"toggleMenu(menu)\"\n          #navigationCategoryMenuOrigin=\"cdkOverlayOrigin\"\n        >\n          {{ menu.label }}\n        </hra-navigation-category-toggle>\n\n        <ng-template\n          cdkConnectedOverlay\n          cdkConnectedOverlayHasBackdrop=\"false\"\n          cdkConnectedOverlayLockPosition=\"true\"\n          cdkConnectedOverlayPush=\"true\"\n          [cdkConnectedOverlayOpen]=\"isMenuActive(menu)\"\n          [cdkConnectedOverlayOrigin]=\"navigationCategoryMenuOrigin\"\n          [cdkConnectedOverlayPositions]=\"desktopMenuPositions\"\n          (overlayOutsideClick)=\"closeMenu(menu)\"\n          (detach)=\"closeMenu(menu)\"\n        >\n          <hra-desktop-menu hraFeature=\"desktop-menu\" [menu]=\"menu\" [style.max-height]=\"desktopMenuMaxHeight()\" />\n        </ng-template>\n      }\n    }\n\n    <button\n      hraFeature=\"menu-toggle\"\n      mat-icon-button\n      cdkOverlayOrigin\n      aria-label=\"Open the main navigation menu\"\n      [hraClickEvent]=\"{ action: 'toggle-menu', isMobile: isMobile(), currentState: isMenuActive('main') }\"\n      (click)=\"toggleMenu('main')\"\n      #mainMenuOrigin=\"cdkOverlayOrigin\"\n    >\n      <mat-icon>\n        @if (isMenuActive('main')) {\n          close\n        } @else if (isMobile()) {\n          menu\n        } @else {\n          apps\n        }\n      </mat-icon>\n    </button>\n\n    @if (isMobile()) {\n      <ng-template\n        cdkConnectedOverlay\n        cdkConnectedOverlayDisposeOnNavigation=\"true\"\n        cdkConnectedOverlayHasBackdrop=\"false\"\n        cdkConnectedOverlayLockPosition=\"true\"\n        cdkConnectedOverlayWidth=\"100%\"\n        [cdkConnectedOverlayOpen]=\"isMenuActive('main')\"\n        [cdkConnectedOverlayOrigin]=\"mobileMenuOrigin\"\n        [cdkConnectedOverlayPositions]=\"mobileMenuPositions\"\n        [cdkConnectedOverlayScrollStrategy]=\"mobileMenuBlockScroll\"\n        [cdkConnectedOverlayHeight]=\"mobileMenuHeight()\"\n        (detach)=\"closeMenu()\"\n        #mobileMenuOverlay\n      >\n        <hra-mobile-menu hraFeature=\"mobile-menu\" [hubmapMenu]=\"hubmapMenu()\" [menus]=\"menus()\" />\n      </ng-template>\n    } @else {\n      <ng-template\n        cdkConnectedOverlay\n        cdkConnectedOverlayHasBackdrop=\"false\"\n        cdkConnectedOverlayLockPosition=\"true\"\n        cdkConnectedOverlayPush=\"true\"\n        [cdkConnectedOverlayOpen]=\"isMenuActive('main')\"\n        [cdkConnectedOverlayOrigin]=\"mainMenuOrigin\"\n        [cdkConnectedOverlayPositions]=\"desktopMenuPositions\"\n        (overlayOutsideClick)=\"closeMenu('main')\"\n        (detach)=\"closeMenu('main')\"\n      >\n        <hra-desktop-menu\n          hraFeature=\"desktop-menu-main\"\n          [menu]=\"hubmapMenu()\"\n          [style.max-height]=\"desktopMenuMaxHeight()\"\n        />\n      </ng-template>\n    }\n  </div>\n\n  @if (breadcrumbs(); as crumbs) {\n    <mat-divider />\n\n    <div hraFeature=\"breadcrumbs\" class=\"navigation\">\n      <hra-breadcrumbs [crumbs]=\"crumbs\" />\n      <ng-content />\n    </div>\n  }\n</header>\n\n@if (progress() !== false) {\n  <mat-progress-bar hraFeature=\"progress-bar\" class=\"progress-bar\" [mode]=\"progressMode()\" [value]=\"progress()\" />\n}\n", styles: [":host{display:block;position:sticky;top:0;width:100%;z-index:200;background-color:rgb(from var(--mat-sys-surface-bright) r g b/80%);-webkit-backdrop-filter:blur(10rem);backdrop-filter:blur(10rem);box-shadow:0 .25rem .25rem rgb(from var(--mat-sys-secondary) r g b/20%);--mat-divider-color: var(--mat-sys-outline-variant)}:host .header .menus,:host .header .navigation{display:flex;align-items:center;padding:0 .75rem}:host .header .menus .filler,:host .header .navigation .filler{flex-grow:1}:host .header .menus{height:4.5rem}:host .header.mobile-menu-open{background-color:var(--mat-sys-surface-dim);-webkit-backdrop-filter:none;backdrop-filter:none}:host .header .navigation hra-breadcrumbs{width:0;flex-grow:1}:host .progress-bar{position:absolute;--mat-progress-bar-active-indicator-color: var(--mat-sys-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1$1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1$1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1$1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i1$3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatProgressBarModule }, { kind: "component", type: i5$1.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }, { kind: "ngmodule", type: BrandModule }, { kind: "component", type: i6$1.BrandLogoComponent, selector: "hra-brand-logo", inputs: ["size", "logos"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i8.BreadcrumbsComponent, selector: "hra-breadcrumbs", inputs: ["crumbs"] }, { kind: "component", type: i9.NavigationCategoryToggleComponent, selector: "hra-navigation-category-toggle", inputs: ["toggled"], outputs: ["toggledChange"] }, { kind: "component", type: CtaBarComponent, selector: "hra-cta-bar", inputs: ["action", "description", "url"], outputs: ["closeClick"] }, { kind: "component", type: DesktopMenuComponent, selector: "hra-desktop-menu", inputs: ["menu"] }, { kind: "component", type: MobileMenuComponent, selector: "hra-mobile-menu", inputs: ["hubmapMenu", "menus"] }, { kind: "pipe", type: i6.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-header', imports: [
                        HraCommonModule,
                        OverlayModule,
                        MatDividerModule,
                        MatIconModule,
                        MatProgressBarModule,
                        BrandModule,
                        ButtonsModule,
                        CtaBarComponent,
                        DesktopMenuComponent,
                        MobileMenuComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@let ctaConfig = cta();\n@if (ctaConfig && !ctaDismissed()) {\n  <hra-cta-bar\n    hraFeature=\"cta-bar\"\n    [action]=\"ctaConfig.action\"\n    [description]=\"ctaConfig.description\"\n    [url]=\"ctaConfig.url\"\n    (closeClick)=\"ctaDismissed.set(true)\"\n  />\n}\n\n<header\n  hraFeature=\"header\"\n  class=\"header\"\n  cdkOverlayOrigin\n  data-testid=\"header\"\n  [class.mobile-menu-open]=\"isMobile() && isMenuActive('main')\"\n  #mobileMenuOrigin=\"cdkOverlayOrigin\"\n>\n  <div hraFeature=\"navigation\" class=\"menus\" #desktopMenuOrigin>\n    <hra-brand-logo hraFeature=\"brand-logo\" size=\"small\" />\n\n    <div class=\"filler\"></div>\n\n    @if (!isMobile()) {\n      @for (menu of menus(); track menu.id) {\n        <hra-navigation-category-toggle\n          hraClickEvent\n          hraHoverEvent\n          cdkOverlayOrigin\n          [hraFeature]=\"menu.id | slugify\"\n          [toggled]=\"isMenuActive(menu)\"\n          (toggledChange)=\"toggleMenu(menu)\"\n          #navigationCategoryMenuOrigin=\"cdkOverlayOrigin\"\n        >\n          {{ menu.label }}\n        </hra-navigation-category-toggle>\n\n        <ng-template\n          cdkConnectedOverlay\n          cdkConnectedOverlayHasBackdrop=\"false\"\n          cdkConnectedOverlayLockPosition=\"true\"\n          cdkConnectedOverlayPush=\"true\"\n          [cdkConnectedOverlayOpen]=\"isMenuActive(menu)\"\n          [cdkConnectedOverlayOrigin]=\"navigationCategoryMenuOrigin\"\n          [cdkConnectedOverlayPositions]=\"desktopMenuPositions\"\n          (overlayOutsideClick)=\"closeMenu(menu)\"\n          (detach)=\"closeMenu(menu)\"\n        >\n          <hra-desktop-menu hraFeature=\"desktop-menu\" [menu]=\"menu\" [style.max-height]=\"desktopMenuMaxHeight()\" />\n        </ng-template>\n      }\n    }\n\n    <button\n      hraFeature=\"menu-toggle\"\n      mat-icon-button\n      cdkOverlayOrigin\n      aria-label=\"Open the main navigation menu\"\n      [hraClickEvent]=\"{ action: 'toggle-menu', isMobile: isMobile(), currentState: isMenuActive('main') }\"\n      (click)=\"toggleMenu('main')\"\n      #mainMenuOrigin=\"cdkOverlayOrigin\"\n    >\n      <mat-icon>\n        @if (isMenuActive('main')) {\n          close\n        } @else if (isMobile()) {\n          menu\n        } @else {\n          apps\n        }\n      </mat-icon>\n    </button>\n\n    @if (isMobile()) {\n      <ng-template\n        cdkConnectedOverlay\n        cdkConnectedOverlayDisposeOnNavigation=\"true\"\n        cdkConnectedOverlayHasBackdrop=\"false\"\n        cdkConnectedOverlayLockPosition=\"true\"\n        cdkConnectedOverlayWidth=\"100%\"\n        [cdkConnectedOverlayOpen]=\"isMenuActive('main')\"\n        [cdkConnectedOverlayOrigin]=\"mobileMenuOrigin\"\n        [cdkConnectedOverlayPositions]=\"mobileMenuPositions\"\n        [cdkConnectedOverlayScrollStrategy]=\"mobileMenuBlockScroll\"\n        [cdkConnectedOverlayHeight]=\"mobileMenuHeight()\"\n        (detach)=\"closeMenu()\"\n        #mobileMenuOverlay\n      >\n        <hra-mobile-menu hraFeature=\"mobile-menu\" [hubmapMenu]=\"hubmapMenu()\" [menus]=\"menus()\" />\n      </ng-template>\n    } @else {\n      <ng-template\n        cdkConnectedOverlay\n        cdkConnectedOverlayHasBackdrop=\"false\"\n        cdkConnectedOverlayLockPosition=\"true\"\n        cdkConnectedOverlayPush=\"true\"\n        [cdkConnectedOverlayOpen]=\"isMenuActive('main')\"\n        [cdkConnectedOverlayOrigin]=\"mainMenuOrigin\"\n        [cdkConnectedOverlayPositions]=\"desktopMenuPositions\"\n        (overlayOutsideClick)=\"closeMenu('main')\"\n        (detach)=\"closeMenu('main')\"\n      >\n        <hra-desktop-menu\n          hraFeature=\"desktop-menu-main\"\n          [menu]=\"hubmapMenu()\"\n          [style.max-height]=\"desktopMenuMaxHeight()\"\n        />\n      </ng-template>\n    }\n  </div>\n\n  @if (breadcrumbs(); as crumbs) {\n    <mat-divider />\n\n    <div hraFeature=\"breadcrumbs\" class=\"navigation\">\n      <hra-breadcrumbs [crumbs]=\"crumbs\" />\n      <ng-content />\n    </div>\n  }\n</header>\n\n@if (progress() !== false) {\n  <mat-progress-bar hraFeature=\"progress-bar\" class=\"progress-bar\" [mode]=\"progressMode()\" [value]=\"progress()\" />\n}\n", styles: [":host{display:block;position:sticky;top:0;width:100%;z-index:200;background-color:rgb(from var(--mat-sys-surface-bright) r g b/80%);-webkit-backdrop-filter:blur(10rem);backdrop-filter:blur(10rem);box-shadow:0 .25rem .25rem rgb(from var(--mat-sys-secondary) r g b/20%);--mat-divider-color: var(--mat-sys-outline-variant)}:host .header .menus,:host .header .navigation{display:flex;align-items:center;padding:0 .75rem}:host .header .menus .filler,:host .header .navigation .filler{flex-grow:1}:host .header .menus{height:4.5rem}:host .header.mobile-menu-open{background-color:var(--mat-sys-surface-dim);-webkit-backdrop-filter:none;backdrop-filter:none}:host .header .navigation hra-breadcrumbs{width:0;flex-grow:1}:host .progress-bar{position:absolute;--mat-progress-bar-active-indicator-color: var(--mat-sys-tertiary)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { cta: [{ type: i0.Input, args: [{ isSignal: true, alias: "cta", required: false }] }], hubmapMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "hubmapMenu", required: false }] }], menus: [{ type: i0.Input, args: [{ isSignal: true, alias: "menus", required: false }] }], breadcrumbs: [{ type: i0.Input, args: [{ isSignal: true, alias: "breadcrumbs", required: false }] }], progress: [{ type: i0.Input, args: [{ isSignal: true, alias: "progress", required: false }] }], ctaDismissed: [{ type: i0.Input, args: [{ isSignal: true, alias: "ctaDismissed", required: false }] }, { type: i0.Output, args: ["ctaDismissedChange"] }], mobileMenuOrigin: [{ type: i0.ViewChild, args: ['mobileMenuOrigin', { ...{ read: ElementRef }, isSignal: true }] }], desktopMenuOrigin: [{ type: i0.ViewChild, args: ['desktopMenuOrigin', { ...{ read: ElementRef }, isSignal: true }] }], mobileMenuOverlay: [{ type: i0.ViewChild, args: ['mobileMenuOverlay', { ...{ read: CdkConnectedOverlay }, isSignal: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { HUBMAP_MENU as DEFAULT_HUBMAP_MENU, MENUS as DEFAULT_MENUS, HeaderComponent };
//# sourceMappingURL=hra-ui-design-system-navigation-header.mjs.map
