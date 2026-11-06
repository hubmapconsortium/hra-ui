import * as i0 from '@angular/core';
import { input, booleanAttribute, signal, inject, ElementRef, ChangeDetectionStrategy, Component, ViewEncapsulation, effect, untracked, Directive, contentChildren, Injector, DestroyRef, NgModule } from '@angular/core';
import * as i2 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenu } from '@angular/material/menu';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';

/**
 * Navigation rail item: an icon above a label, on a button or a link.
 * The projected content is the label; long labels wrap to two lines.
 * Add `hraPlainTooltip` to describe what the item does.
 */
class NavigationRailItemComponent {
    /** Material Symbols icon name */
    icon = input.required(...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    /**
     * Shows the item as active. Use it for items that open a drawer or sheet.
     * Toggles (`aria-pressed`) and the current page (`aria-current`) show as active without it.
     * An item whose menu is open (`aria-expanded`) gets a light highlight instead.
     */
    active = input(false, { ...(ngDevMode ? { debugName: "active" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Tab index set by the rail, so the rail is a single tab stop */
    tabIndex = signal(null, ...(ngDevMode ? [{ debugName: "tabIndex" }] : /* istanbul ignore next */ []));
    /** Host element, which also triggers the ripple */
    hostElement = inject(ElementRef).nativeElement;
    /** Tooltip on the item, if it has one */
    tooltip = inject(MatTooltip, { optional: true, self: true });
    /** Whether the item is disabled. The arrow keys skip disabled items. */
    get disabled() {
        return (('disabled' in this.hostElement && this.hostElement.disabled) ||
            this.hostElement.getAttribute('aria-disabled') === 'true');
    }
    /** Focuses the item */
    focus() {
        this.hostElement.focus();
    }
    /**
     * Checks whether a node is the item or inside it
     *
     * @param node Node to check
     * @returns Whether the item contains the node
     */
    contains(node) {
        return this.hostElement.contains(node);
    }
    /**
     * Makes the item the rail's tab stop or removes it from the tab order
     *
     * @param isTabStop Whether the item is the tab stop
     */
    setTabStop(isTabStop) {
        this.tabIndex.set(isTabStop ? 0 : -1);
    }
    /**
     * Opens the item's tooltip beside a vertical rail or above a horizontal one. Set by the rail.
     *
     * @param position Tooltip position
     */
    setTooltipPosition(position) {
        if (this.tooltip) {
            this.tooltip.position = position;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.25", type: NavigationRailItemComponent, isStandalone: true, selector: "button[hraNavigationRailItem], a[hraNavigationRailItem]", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: true, transformFunction: null }, active: { classPropertyName: "active", publicName: "active", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.hra-navigation-rail-item--active": "active()", "attr.tabindex": "tabIndex()" }, classAttribute: "hra-navigation-rail-item" }, ngImport: i0, template: "<span class=\"hra-navigation-rail-item--indicator\" matRipple [matRippleTrigger]=\"hostElement\">\n  <mat-icon>{{ icon() }}</mat-icon>\n</span>\n<span class=\"hra-navigation-rail-item--label\"><ng-content /></span>\n", styles: [":host{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.25rem;align-self:stretch;box-sizing:border-box;min-height:4rem;margin:0;padding:.25rem;border:none;background:none;color:var(--hra-navigation-rail-label-color, var(--mat-sys-on-surface-variant));font-family:var(--hra-navigation-rail-label-font, var(--mat-sys-label-medium-font));font-size:var(--hra-navigation-rail-label-font-size, var(--mat-sys-label-medium-size));font-weight:var(--hra-navigation-rail-label-font-weight, var(--mat-sys-label-medium-weight));line-height:var(--hra-navigation-rail-label-line-height, var(--mat-sys-label-medium-line-height));letter-spacing:var(--hra-navigation-rail-label-letter-spacing, var(--mat-sys-label-medium-tracking));text-align:center;text-decoration:none;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}:host .hra-navigation-rail-item--indicator{--mat-ripple-color: color-mix( in srgb, var(--hra-navigation-rail-state-layer-color, var(--mat-sys-on-secondary-container)) calc(var(--mat-sys-pressed-state-layer-opacity, .1) * 100%), transparent );position:relative;display:flex;align-items:center;justify-content:center;width:3.5rem;height:2rem;border-radius:var(--mat-sys-corner-full);color:var(--hra-navigation-rail-icon-color, var(--mat-sys-on-surface-variant));isolation:isolate}:host .hra-navigation-rail-item--indicator:before,:host .hra-navigation-rail-item--indicator:after{content:\"\";position:absolute;inset:0;border-radius:inherit;opacity:0}:host .hra-navigation-rail-item--indicator:before{z-index:-2;background-color:var(--hra-navigation-rail-indicator-color, var(--mat-sys-secondary-container));transform:scaleX(.5);transition:opacity .2s cubic-bezier(.2,0,0,1),transform .2s cubic-bezier(.2,0,0,1)}:host .hra-navigation-rail-item--indicator:after{z-index:-1;background-color:var(--hra-navigation-rail-state-layer-color, var(--mat-sys-on-secondary-container))}:host .hra-navigation-rail-item--label{max-width:100%;overflow-wrap:break-word;text-wrap:balance;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}@supports (line-clamp: 2){:host .hra-navigation-rail-item--label{display:block;line-clamp:2}}:host(:hover),:host(:focus-visible),:host(:active),:host([aria-expanded=true]){color:var(--hra-navigation-rail-hover-label-color, var(--mat-sys-on-surface))}:host(:hover) .hra-navigation-rail-item--indicator,:host(:focus-visible) .hra-navigation-rail-item--indicator,:host(:active) .hra-navigation-rail-item--indicator,:host([aria-expanded=true]) .hra-navigation-rail-item--indicator{color:var(--hra-navigation-rail-hover-icon-color, var(--mat-sys-on-surface))}:host(:hover) .hra-navigation-rail-item--indicator:after,:host([aria-expanded=true]) .hra-navigation-rail-item--indicator:after{opacity:var(--mat-sys-hover-state-layer-opacity, .08)}:host(:focus-visible) .hra-navigation-rail-item--indicator{outline:solid .125rem var(--hra-navigation-rail-focus-outline-color, var(--mat-sys-on-surface));outline-offset:.125rem}:host(:focus-visible) .hra-navigation-rail-item--indicator:after{opacity:var(--mat-sys-focus-state-layer-opacity, .1)}:host(.hra-navigation-rail-item--active),:host([aria-pressed=true]),:host([aria-current]:not([aria-current=false])){color:var(--hra-navigation-rail-active-label-color, var(--mat-sys-secondary))}:host(.hra-navigation-rail-item--active) .hra-navigation-rail-item--indicator,:host([aria-pressed=true]) .hra-navigation-rail-item--indicator,:host([aria-current]:not([aria-current=false])) .hra-navigation-rail-item--indicator{color:var(--hra-navigation-rail-active-icon-color, var(--mat-sys-on-secondary-container))}:host(.hra-navigation-rail-item--active) .hra-navigation-rail-item--indicator:before,:host([aria-pressed=true]) .hra-navigation-rail-item--indicator:before,:host([aria-current]:not([aria-current=false])) .hra-navigation-rail-item--indicator:before{opacity:1;transform:scaleX(1)}:host(:disabled),:host([aria-disabled=true]){cursor:default;opacity:.38;pointer-events:none}@media(prefers-reduced-motion:reduce){:host .hra-navigation-rail-item--indicator:before{transition:none}}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatRippleModule }, { kind: "directive", type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'button[hraNavigationRailItem], a[hraNavigationRailItem]', imports: [MatIconModule, MatRippleModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'hra-navigation-rail-item',
                        '[class.hra-navigation-rail-item--active]': 'active()',
                        '[attr.tabindex]': 'tabIndex()',
                    }, template: "<span class=\"hra-navigation-rail-item--indicator\" matRipple [matRippleTrigger]=\"hostElement\">\n  <mat-icon>{{ icon() }}</mat-icon>\n</span>\n<span class=\"hra-navigation-rail-item--label\"><ng-content /></span>\n", styles: [":host{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.25rem;align-self:stretch;box-sizing:border-box;min-height:4rem;margin:0;padding:.25rem;border:none;background:none;color:var(--hra-navigation-rail-label-color, var(--mat-sys-on-surface-variant));font-family:var(--hra-navigation-rail-label-font, var(--mat-sys-label-medium-font));font-size:var(--hra-navigation-rail-label-font-size, var(--mat-sys-label-medium-size));font-weight:var(--hra-navigation-rail-label-font-weight, var(--mat-sys-label-medium-weight));line-height:var(--hra-navigation-rail-label-line-height, var(--mat-sys-label-medium-line-height));letter-spacing:var(--hra-navigation-rail-label-letter-spacing, var(--mat-sys-label-medium-tracking));text-align:center;text-decoration:none;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}:host .hra-navigation-rail-item--indicator{--mat-ripple-color: color-mix( in srgb, var(--hra-navigation-rail-state-layer-color, var(--mat-sys-on-secondary-container)) calc(var(--mat-sys-pressed-state-layer-opacity, .1) * 100%), transparent );position:relative;display:flex;align-items:center;justify-content:center;width:3.5rem;height:2rem;border-radius:var(--mat-sys-corner-full);color:var(--hra-navigation-rail-icon-color, var(--mat-sys-on-surface-variant));isolation:isolate}:host .hra-navigation-rail-item--indicator:before,:host .hra-navigation-rail-item--indicator:after{content:\"\";position:absolute;inset:0;border-radius:inherit;opacity:0}:host .hra-navigation-rail-item--indicator:before{z-index:-2;background-color:var(--hra-navigation-rail-indicator-color, var(--mat-sys-secondary-container));transform:scaleX(.5);transition:opacity .2s cubic-bezier(.2,0,0,1),transform .2s cubic-bezier(.2,0,0,1)}:host .hra-navigation-rail-item--indicator:after{z-index:-1;background-color:var(--hra-navigation-rail-state-layer-color, var(--mat-sys-on-secondary-container))}:host .hra-navigation-rail-item--label{max-width:100%;overflow-wrap:break-word;text-wrap:balance;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}@supports (line-clamp: 2){:host .hra-navigation-rail-item--label{display:block;line-clamp:2}}:host(:hover),:host(:focus-visible),:host(:active),:host([aria-expanded=true]){color:var(--hra-navigation-rail-hover-label-color, var(--mat-sys-on-surface))}:host(:hover) .hra-navigation-rail-item--indicator,:host(:focus-visible) .hra-navigation-rail-item--indicator,:host(:active) .hra-navigation-rail-item--indicator,:host([aria-expanded=true]) .hra-navigation-rail-item--indicator{color:var(--hra-navigation-rail-hover-icon-color, var(--mat-sys-on-surface))}:host(:hover) .hra-navigation-rail-item--indicator:after,:host([aria-expanded=true]) .hra-navigation-rail-item--indicator:after{opacity:var(--mat-sys-hover-state-layer-opacity, .08)}:host(:focus-visible) .hra-navigation-rail-item--indicator{outline:solid .125rem var(--hra-navigation-rail-focus-outline-color, var(--mat-sys-on-surface));outline-offset:.125rem}:host(:focus-visible) .hra-navigation-rail-item--indicator:after{opacity:var(--mat-sys-focus-state-layer-opacity, .1)}:host(.hra-navigation-rail-item--active),:host([aria-pressed=true]),:host([aria-current]:not([aria-current=false])){color:var(--hra-navigation-rail-active-label-color, var(--mat-sys-secondary))}:host(.hra-navigation-rail-item--active) .hra-navigation-rail-item--indicator,:host([aria-pressed=true]) .hra-navigation-rail-item--indicator,:host([aria-current]:not([aria-current=false])) .hra-navigation-rail-item--indicator{color:var(--hra-navigation-rail-active-icon-color, var(--mat-sys-on-secondary-container))}:host(.hra-navigation-rail-item--active) .hra-navigation-rail-item--indicator:before,:host([aria-pressed=true]) .hra-navigation-rail-item--indicator:before,:host([aria-current]:not([aria-current=false])) .hra-navigation-rail-item--indicator:before{opacity:1;transform:scaleX(1)}:host(:disabled),:host([aria-disabled=true]){cursor:default;opacity:.38;pointer-events:none}@media(prefers-reduced-motion:reduce){:host .hra-navigation-rail-item--indicator:before{transition:none}}\n"] }]
        }], propDecorators: { icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: true }] }], active: [{ type: i0.Input, args: [{ isSignal: true, alias: "active", required: false }] }] } });

/**
 * Applies navigation rail menu styles globally.
 * Menus render in the overlay container, outside the rail.
 */
class NavigationRailMenuStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailMenuStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.25", type: NavigationRailMenuStylesComponent, isStandalone: true, selector: "hra-navigation-rail-menu-styles", ngImport: i0, template: '', isInline: true, styles: [".hra-app .hra-navigation-rail-menu .mat-mdc-menu-panel:not(.hra-navigation-rail-menu--horizontal){margin-inline-start:calc(var(--hra-navigation-rail-container-width, 6rem) + .25rem)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailMenuStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-navigation-rail-menu-styles', template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".hra-app .hra-navigation-rail-menu .mat-mdc-menu-panel:not(.hra-navigation-rail-menu--horizontal){margin-inline-start:calc(var(--hra-navigation-rail-container-width, 6rem) + .25rem)}\n"] }]
        }] });

/** Overlay pane class for menus opened from a navigation rail */
const NAVIGATION_RAIL_MENU_PANEL_CLASS = 'hra-navigation-rail-menu';
/** Menu panel class for menus opened from a horizontal rail, which open above it without the side offset */
const NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS = 'hra-navigation-rail-menu--horizontal';
/**
 * Menu options for rail menus: the menu overlaps its trigger, and the panel class moves it past the rail
 *
 * @returns Menu options
 */
function navigationRailMenuOptions() {
    const defaults = inject(MAT_MENU_DEFAULT_OPTIONS, { skipSelf: true });
    const panelClasses = defaults.overlayPanelClass ?? [];
    return {
        ...defaults,
        overlapTrigger: true,
        xPosition: 'after',
        overlayPanelClass: [
            ...(Array.isArray(panelClasses) ? panelClasses : [panelClasses]),
            NAVIGATION_RAIL_MENU_PANEL_CLASS,
        ],
    };
}
/**
 * Opens a `mat-menu` beside its navigation rail item instead of below it.
 * Use `yPosition="above"` for menus on bottom items.
 * Menus of a horizontal rail open above their item; set `hraNavigationRailMenuOrientation` to match the rail.
 */
class NavigationRailMenuDirective {
    /** Orientation of the rail the menu opens from */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    orientation = input('vertical', { ...(ngDevMode ? { debugName: "orientation" } : /* istanbul ignore next */ {}), alias: 'hraNavigationRailMenuOrientation' });
    /** Menu the directive positions */
    menu = inject(MatMenu, { self: true });
    /** Vertical position the menu was given, restored when the rail turns vertical again */
    verticalYPosition;
    /** Whether the menu has the horizontal panel class, so a vertical menu's own classes are left alone */
    hasHorizontalClass = false;
    /** Registers the menu styles and positions the menu for the rail's orientation */
    constructor() {
        registerStyleComponents([NavigationRailMenuStylesComponent]);
        effect(() => {
            const horizontal = this.orientation() === 'horizontal';
            untracked(() => {
                const menu = this.menu;
                this.verticalYPosition ??= menu.yPosition;
                menu.overlapTrigger = !horizontal;
                menu.yPosition = horizontal ? 'above' : this.verticalYPosition;
                if (horizontal !== this.hasHorizontalClass) {
                    menu.panelClass = horizontal ? NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS : '';
                    this.hasHorizontalClass = horizontal;
                }
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailMenuDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.2.25", type: NavigationRailMenuDirective, isStandalone: true, selector: "mat-menu[hraNavigationRailMenu]", inputs: { orientation: { classPropertyName: "orientation", publicName: "hraNavigationRailMenuOrientation", isSignal: true, isRequired: false, transformFunction: null } }, providers: [{ provide: MAT_MENU_DEFAULT_OPTIONS, useFactory: navigationRailMenuOptions }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-menu[hraNavigationRailMenu]',
                    providers: [{ provide: MAT_MENU_DEFAULT_OPTIONS, useFactory: navigationRailMenuOptions }],
                }]
        }], ctorParameters: () => [], propDecorators: { orientation: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraNavigationRailMenuOrientation", required: false }] }] } });

/** Marks items, or an `ng-container` of items, to pin to the bottom of the rail */
class NavigationRailBottomDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailBottomDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.25", type: NavigationRailBottomDirective, isStandalone: true, selector: "[hraNavigationRailBottom]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailBottomDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraNavigationRailBottom]',
                }]
        }] });
/**
 * Tooltip options for rail items: tooltips open beside the rail instead of over the next item
 *
 * @returns Tooltip options
 */
function navigationRailTooltipOptions() {
    return { ...inject(MAT_TOOLTIP_DEFAULT_OPTIONS, { skipSelf: true }), position: 'after' };
}
/**
 * Vertical rail of app-wide actions, styled after the Material 3 navigation rail.
 * It's a toolbar, so the rail is a single tab stop and the arrow keys, Home and End move between items.
 * Give it an `aria-label`.
 *
 * On compact screens, `orientation="horizontal"` turns it into a bar along the bottom, like the Material 3
 * navigation bar: items share the width, the left and right arrow keys move between them, tooltips open above,
 * and the bottom items follow the others. Set the same orientation on its menus (`hraNavigationRailMenuOrientation`).
 */
class NavigationRailComponent {
    /** Whether the rail runs down the side (the default) or along the bottom of compact screens */
    orientation = input('vertical', ...(ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
    /** Items in the rail, including the bottom ones */
    items = contentChildren(NavigationRailItemComponent, { ...(ngDevMode ? { debugName: "items" } : /* istanbul ignore next */ {}), descendants: true });
    /** Moves focus between items */
    keyManager = new FocusKeyManager(this.items, inject(Injector))
        .withVerticalOrientation()
        .withHomeAndEnd()
        .withWrap();
    /** Item that had focus last */
    focusedItem = signal(undefined, ...(ngDevMode ? [{ debugName: "focusedItem" }] : /* istanbul ignore next */ []));
    /** Text direction, which decides the arrow keys in a horizontal rail */
    dir = inject(Directionality, { optional: true });
    /** Keeps a single item in the tab order: the one focused last, or else the first enabled one */
    constructor() {
        inject(DestroyRef).onDestroy(() => this.keyManager.destroy());
        effect(() => {
            const items = this.items();
            const focused = this.focusedItem();
            const tabStop = focused && items.includes(focused) ? focused : items.find((item) => !item.disabled);
            for (const item of items) {
                item.setTabStop(item === tabStop);
            }
        });
        effect(() => {
            const horizontal = this.orientation() === 'horizontal';
            this.keyManager
                .withVerticalOrientation(!horizontal)
                .withHorizontalOrientation(horizontal ? (this.dir?.value ?? 'ltr') : null);
            for (const item of this.items()) {
                item.setTooltipPosition(horizontal ? 'above' : 'after');
            }
        });
    }
    /**
     * Moves focus with the arrow keys, Home and End
     *
     * @param event Keyboard event
     */
    handleKeydown(event) {
        this.keyManager.onKeydown(event);
    }
    /**
     * Tracks the focused item, including focus that returns from a menu or sheet
     *
     * @param event Focus event
     */
    handleFocusIn(event) {
        const item = this.items().find((candidate) => candidate.contains(event.target));
        if (item) {
            this.keyManager.updateActiveItem(item);
            this.focusedItem.set(item);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "21.2.25", type: NavigationRailComponent, isStandalone: true, selector: "hra-navigation-rail", inputs: { orientation: { classPropertyName: "orientation", publicName: "orientation", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "toolbar" }, listeners: { "keydown": "handleKeydown($event)", "focusin": "handleFocusIn($event)" }, properties: { "attr.aria-orientation": "orientation()", "class.hra-navigation-rail--horizontal": "orientation() === 'horizontal'" } }, providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useFactory: navigationRailTooltipOptions }], queries: [{ propertyName: "items", predicate: NavigationRailItemComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<ng-content />\n<div class=\"hra-navigation-rail--bottom\">\n  <ng-content select=\"[hraNavigationRailBottom]\" />\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:center;gap:.25rem;box-sizing:border-box;width:var(--hra-navigation-rail-container-width, 6rem);height:100%;padding-block:1.25rem;overflow-y:auto;background-color:var(--hra-navigation-rail-container-color, var(--mat-sys-surface))}:host .hra-navigation-rail--bottom{display:flex;flex-direction:column;align-items:center;align-self:stretch;gap:inherit;margin-top:auto}:host ::ng-deep .mat-divider{width:3.5rem;margin-block:.25rem}:host(.hra-navigation-rail--horizontal){flex-direction:row;align-items:stretch;width:100%;height:auto;padding:.25rem;overflow-x:auto;overflow-y:hidden}:host(.hra-navigation-rail--horizontal) .hra-navigation-rail--bottom{display:contents}:host(.hra-navigation-rail--horizontal) ::ng-deep .hra-navigation-rail-item{flex:1 1 0;min-width:3.5rem;padding-inline:0;container-type:inline-size}:host(.hra-navigation-rail--horizontal) ::ng-deep .hra-navigation-rail-item--label{display:block;font-size:clamp(.625rem,17.5cqi,var(--hra-navigation-rail-label-font-size, var(--mat-sys-label-medium-size)));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host(.hra-navigation-rail--horizontal) ::ng-deep .mat-divider{display:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-navigation-rail', providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useFactory: navigationRailTooltipOptions }], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'toolbar',
                        '[attr.aria-orientation]': 'orientation()',
                        '[class.hra-navigation-rail--horizontal]': "orientation() === 'horizontal'",
                        '(keydown)': 'handleKeydown($event)',
                        '(focusin)': 'handleFocusIn($event)',
                    }, template: "<ng-content />\n<div class=\"hra-navigation-rail--bottom\">\n  <ng-content select=\"[hraNavigationRailBottom]\" />\n</div>\n", styles: [":host{display:flex;flex-direction:column;align-items:center;gap:.25rem;box-sizing:border-box;width:var(--hra-navigation-rail-container-width, 6rem);height:100%;padding-block:1.25rem;overflow-y:auto;background-color:var(--hra-navigation-rail-container-color, var(--mat-sys-surface))}:host .hra-navigation-rail--bottom{display:flex;flex-direction:column;align-items:center;align-self:stretch;gap:inherit;margin-top:auto}:host ::ng-deep .mat-divider{width:3.5rem;margin-block:.25rem}:host(.hra-navigation-rail--horizontal){flex-direction:row;align-items:stretch;width:100%;height:auto;padding:.25rem;overflow-x:auto;overflow-y:hidden}:host(.hra-navigation-rail--horizontal) .hra-navigation-rail--bottom{display:contents}:host(.hra-navigation-rail--horizontal) ::ng-deep .hra-navigation-rail-item{flex:1 1 0;min-width:3.5rem;padding-inline:0;container-type:inline-size}:host(.hra-navigation-rail--horizontal) ::ng-deep .hra-navigation-rail-item--label{display:block;font-size:clamp(.625rem,17.5cqi,var(--hra-navigation-rail-label-font-size, var(--mat-sys-label-medium-size)));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host(.hra-navigation-rail--horizontal) ::ng-deep .mat-divider{display:none}\n"] }]
        }], ctorParameters: () => [], propDecorators: { orientation: [{ type: i0.Input, args: [{ isSignal: true, alias: "orientation", required: false }] }], items: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => NavigationRailItemComponent), { ...{ descendants: true }, isSignal: true }] }] } });

/** Navigation rail module */
class NavigationRailModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailModule, imports: [NavigationRailComponent,
            NavigationRailItemComponent,
            NavigationRailBottomDirective,
            NavigationRailMenuDirective], exports: [NavigationRailComponent,
            NavigationRailItemComponent,
            NavigationRailBottomDirective,
            NavigationRailMenuDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailModule, imports: [NavigationRailItemComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NavigationRailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NavigationRailComponent,
                        NavigationRailItemComponent,
                        NavigationRailBottomDirective,
                        NavigationRailMenuDirective,
                    ],
                    exports: [
                        NavigationRailComponent,
                        NavigationRailItemComponent,
                        NavigationRailBottomDirective,
                        NavigationRailMenuDirective,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS, NAVIGATION_RAIL_MENU_PANEL_CLASS, NavigationRailBottomDirective, NavigationRailComponent, NavigationRailItemComponent, NavigationRailMenuDirective, NavigationRailModule };
//# sourceMappingURL=hra-ui-design-system-navigation-rail.mjs.map
