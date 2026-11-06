import * as i0 from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { TooltipPosition } from '@angular/material/tooltip';

/**
 * Navigation rail item: an icon above a label, on a button or a link.
 * The projected content is the label; long labels wrap to two lines.
 * Add `hraPlainTooltip` to describe what the item does.
 */
declare class NavigationRailItemComponent implements FocusableOption {
    /** Material Symbols icon name */
    readonly icon: i0.InputSignal<string>;
    /**
     * Shows the item as active. Use it for items that open a drawer or sheet.
     * Toggles (`aria-pressed`) and the current page (`aria-current`) show as active without it.
     * An item whose menu is open (`aria-expanded`) gets a light highlight instead.
     */
    readonly active: i0.InputSignalWithTransform<boolean, unknown>;
    /** Tab index set by the rail, so the rail is a single tab stop */
    protected readonly tabIndex: i0.WritableSignal<number | null>;
    /** Host element, which also triggers the ripple */
    protected readonly hostElement: HTMLButtonElement | HTMLAnchorElement;
    /** Tooltip on the item, if it has one */
    private readonly tooltip;
    /** Whether the item is disabled. The arrow keys skip disabled items. */
    get disabled(): boolean;
    /** Focuses the item */
    focus(): void;
    /**
     * Checks whether a node is the item or inside it
     *
     * @param node Node to check
     * @returns Whether the item contains the node
     */
    contains(node: Node | null): boolean;
    /**
     * Makes the item the rail's tab stop or removes it from the tab order
     *
     * @param isTabStop Whether the item is the tab stop
     */
    setTabStop(isTabStop: boolean): void;
    /**
     * Opens the item's tooltip beside a vertical rail or above a horizontal one. Set by the rail.
     *
     * @param position Tooltip position
     */
    setTooltipPosition(position: TooltipPosition): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationRailItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationRailItemComponent, "button[hraNavigationRailItem], a[hraNavigationRailItem]", never, { "icon": { "alias": "icon"; "required": true; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/** Direction a navigation rail runs: down the side, or along the bottom of compact screens */
type NavigationRailOrientation = 'vertical' | 'horizontal';

/** Overlay pane class for menus opened from a navigation rail */
declare const NAVIGATION_RAIL_MENU_PANEL_CLASS = "hra-navigation-rail-menu";
/** Menu panel class for menus opened from a horizontal rail, which open above it without the side offset */
declare const NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS = "hra-navigation-rail-menu--horizontal";
/**
 * Opens a `mat-menu` beside its navigation rail item instead of below it.
 * Use `yPosition="above"` for menus on bottom items.
 * Menus of a horizontal rail open above their item; set `hraNavigationRailMenuOrientation` to match the rail.
 */
declare class NavigationRailMenuDirective {
    /** Orientation of the rail the menu opens from */
    readonly orientation: i0.InputSignal<NavigationRailOrientation>;
    /** Menu the directive positions */
    private readonly menu;
    /** Vertical position the menu was given, restored when the rail turns vertical again */
    private verticalYPosition?;
    /** Whether the menu has the horizontal panel class, so a vertical menu's own classes are left alone */
    private hasHorizontalClass;
    /** Registers the menu styles and positions the menu for the rail's orientation */
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationRailMenuDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationRailMenuDirective, "mat-menu[hraNavigationRailMenu]", never, { "orientation": { "alias": "hraNavigationRailMenuOrientation"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Marks items, or an `ng-container` of items, to pin to the bottom of the rail */
declare class NavigationRailBottomDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationRailBottomDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationRailBottomDirective, "[hraNavigationRailBottom]", never, {}, {}, never, never, true, never>;
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
declare class NavigationRailComponent {
    /** Whether the rail runs down the side (the default) or along the bottom of compact screens */
    readonly orientation: i0.InputSignal<NavigationRailOrientation>;
    /** Items in the rail, including the bottom ones */
    private readonly items;
    /** Moves focus between items */
    private readonly keyManager;
    /** Item that had focus last */
    private readonly focusedItem;
    /** Text direction, which decides the arrow keys in a horizontal rail */
    private readonly dir;
    /** Keeps a single item in the tab order: the one focused last, or else the first enabled one */
    constructor();
    /**
     * Moves focus with the arrow keys, Home and End
     *
     * @param event Keyboard event
     */
    protected handleKeydown(event: KeyboardEvent): void;
    /**
     * Tracks the focused item, including focus that returns from a menu or sheet
     *
     * @param event Focus event
     */
    protected handleFocusIn(event: FocusEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationRailComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationRailComponent, "hra-navigation-rail", never, { "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; }, {}, ["items"], ["*", "[hraNavigationRailBottom]"], true, never>;
}

/** Navigation rail module */
declare class NavigationRailModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationRailModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NavigationRailModule, never, [typeof NavigationRailComponent, typeof NavigationRailItemComponent, typeof NavigationRailBottomDirective, typeof NavigationRailMenuDirective], [typeof NavigationRailComponent, typeof NavigationRailItemComponent, typeof NavigationRailBottomDirective, typeof NavigationRailMenuDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NavigationRailModule>;
}

export { NAVIGATION_RAIL_MENU_HORIZONTAL_CLASS, NAVIGATION_RAIL_MENU_PANEL_CLASS, NavigationRailBottomDirective, NavigationRailComponent, NavigationRailItemComponent, NavigationRailMenuDirective, NavigationRailModule };
export type { NavigationRailOrientation };
