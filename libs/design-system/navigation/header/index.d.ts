import * as _angular_cdk_overlay from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';
import * as _angular_core from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { z } from 'zod';

/** A menu item */
type MenuItem = z.infer<typeof MenuItemSchema>;
/** Schema for a menu item */
declare const MenuItemSchema: z.ZodObject<{
    type: z.ZodLiteral<"item">;
    label: z.ZodString;
    url: z.ZodString;
    external: z.ZodOptional<z.ZodBoolean>;
    target: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** A menu divider */
type MenuDivider = z.infer<typeof MenuDividerSchema>;
/** Schema for a menu divider */
declare const MenuDividerSchema: z.ZodObject<{
    type: z.ZodLiteral<"divider">;
}, z.core.$strip>;
/** A menu group */
type MenuGroup = z.infer<typeof MenuGroupSchema>;
/** Schema for a menu group */
declare const MenuGroupSchema: z.ZodObject<{
    type: z.ZodLiteral<"group">;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    external: z.ZodOptional<z.ZodBoolean>;
    target: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"subgroup">;
        label: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            type: z.ZodLiteral<"item">;
            label: z.ZodString;
            url: z.ZodString;
            external: z.ZodOptional<z.ZodBoolean>;
            target: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"item">;
        label: z.ZodString;
        url: z.ZodString;
        external: z.ZodOptional<z.ZodBoolean>;
        target: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>>;
}, z.core.$strip>;
/** A menu */
type Menu = z.infer<typeof MenuSchema>;
/** Schema for a menu */
declare const MenuSchema: z.ZodObject<{
    type: z.ZodLiteral<"menu">;
    id: z.ZodString;
    label: z.ZodString;
    items: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"group">;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
        external: z.ZodOptional<z.ZodBoolean>;
        target: z.ZodOptional<z.ZodString>;
        items: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"subgroup">;
            label: z.ZodString;
            items: z.ZodArray<z.ZodObject<{
                type: z.ZodLiteral<"item">;
                label: z.ZodString;
                url: z.ZodString;
                external: z.ZodOptional<z.ZodBoolean>;
                target: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"item">;
            label: z.ZodString;
            url: z.ZodString;
            external: z.ZodOptional<z.ZodBoolean>;
            target: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"divider">;
    }, z.core.$strip>]>>;
}, z.core.$strip>;

/** Call to action configuration */
interface CtaConfig {
    /** Action text */
    action: string;
    /** Action description */
    description: string;
    /** Action url */
    url: string;
}
/**
 * Global navigation header.
 * Includes a call to action bar, navigation menus, breadcrumbs, and a progress bar.
 */
declare class HeaderComponent {
    /** Call to action configuration */
    readonly cta: _angular_core.InputSignal<CtaConfig | undefined>;
    /** Hubmap menu data */
    readonly hubmapMenu: _angular_core.InputSignal<{
        label: string;
        items: {
            label: string;
            description: string;
            icon: string;
            url: string;
        }[];
    }[]>;
    /** All other menus */
    readonly menus: _angular_core.InputSignal<{
        type: "menu";
        id: string;
        label: string;
        items: ({
            type: "divider";
        } | {
            type: "group";
            label: string;
            url: string;
            description?: string | undefined;
            external?: boolean | undefined;
            target?: string | undefined;
            items?: ({
                type: "item";
                label: string;
                url: string;
                external?: boolean | undefined;
                target?: string | undefined;
            } | {
                type: "subgroup";
                label: string;
                items: {
                    type: "item";
                    label: string;
                    url: string;
                    external?: boolean | undefined;
                    target?: string | undefined;
                }[];
            })[] | undefined;
        })[];
    }[]>;
    /** Base url - Menu urls starting with this will be converted into router links */
    readonly baseUrl: _angular_core.InputSignal<string | undefined>;
    /** Breadcrumb items */
    readonly breadcrumbs: _angular_core.InputSignal<BreadcrumbItem[] | undefined>;
    /**
     * Progress bar progress.
     * Use `true` for an indeterminate bar and values between `0` and `100` for a determinate bar.
     * Using false disables and hides the progress bar.
     */
    readonly progress: _angular_core.InputSignal<number | boolean>;
    /** Whether the user has dismissed the call to action */
    readonly ctaDismissed: _angular_core.ModelSignal<boolean>;
    /** Progress bar mode */
    protected readonly progressMode: _angular_core.Signal<ProgressBarMode>;
    /** Whether the screen is currently mobile sized */
    protected readonly isMobile: _angular_core.Signal<boolean>;
    /** Reference to this component's html element */
    private readonly elementRef;
    /** Overlay positions for the mobile menu */
    protected readonly mobileMenuPositions: ConnectedPosition[];
    /** Overlay positions for the desktop menu */
    protected readonly desktopMenuPositions: ConnectedPosition[];
    /** Blocking overlay scroll strategy */
    protected readonly mobileMenuBlockScroll: _angular_cdk_overlay.BlockScrollStrategy;
    /** Offset from top to the menu. Used to calculate menu heights and max heights */
    protected readonly menuOffsetPx: _angular_core.WritableSignal<number>;
    /** Mobile menu height. Fills the entire screen */
    protected readonly mobileMenuHeight: _angular_core.Signal<string>;
    /** Desktop menu max height */
    protected readonly desktopMenuMaxHeight: _angular_core.Signal<string>;
    /** Mobile menu overlay origin */
    private readonly mobileMenuOrigin;
    /** Desktop menu overlay origin */
    private readonly desktopMenuOrigin;
    /** Reference to the mobile overlay */
    private readonly mobileMenuOverlay;
    /** Currently open menu or undefined */
    private readonly activeMenu;
    /** Initialize the header */
    constructor();
    /**
     * Determine whether the specified menu is open
     *
     * @param menu The menu to check
     * @returns true if the menu is open, false otherwise
     */
    isMenuActive(menu: Menu | 'main'): boolean;
    /**
     * Toggles a menu open or close
     *
     * @param menu Menu to toggle
     */
    toggleMenu(menu: Menu | 'main'): void;
    /**
     * Closes any active menu
     */
    closeMenu(): void;
    /**
     * Creates and attaches a resize observer that updates the menu offset
     * whenever the header size changes
     *
     * @returns The resize observer
     */
    private attachResizeObserver;
    /**
     * Computes the bounding box for the menu's overlay origin element
     *
     * @returns The computed bounding box
     */
    private getMenuOriginBbox;
    /**
     * Updates the menu offset based on the overlay origin's bounding box
     */
    private updateMenuOffset;
    /**
     * Notify menu overlays of position changes
     */
    private updateMenuPositions;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HeaderComponent, "hra-header", never, { "cta": { "alias": "cta"; "required": false; "isSignal": true; }; "hubmapMenu": { "alias": "hubmapMenu"; "required": false; "isSignal": true; }; "menus": { "alias": "menus"; "required": false; "isSignal": true; }; "baseUrl": { "alias": "baseUrl"; "required": false; "isSignal": true; }; "breadcrumbs": { "alias": "breadcrumbs"; "required": false; "isSignal": true; }; "progress": { "alias": "progress"; "required": false; "isSignal": true; }; "ctaDismissed": { "alias": "ctaDismissed"; "required": false; "isSignal": true; }; }, { "ctaDismissed": "ctaDismissedChange"; }, never, ["*"], true, never>;
}

/** A hubmap menu item */
type HubmapMenuItem = z.infer<typeof HubmapMenuItemSchema>;
/** Schema for a hubmap menu item */
declare const HubmapMenuItemSchema: z.ZodObject<{
    label: z.ZodString;
    description: z.ZodString;
    icon: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
/** A hubmap menu group */
type HubmapMenuGroup = z.infer<typeof HubmapMenuGroupSchema>;
/** Schema for a hubmap menu group */
declare const HubmapMenuGroupSchema: z.ZodObject<{
    label: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        description: z.ZodString;
        icon: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** A hubmap menu */
type HubmapMenu = z.infer<typeof HubmapMenuSchema>;
/** Schema for a humbap menu */
declare const HubmapMenuSchema: z.ZodObject<{
    $schema: z.ZodString;
    groups: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            description: z.ZodString;
            icon: z.ZodString;
            url: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/** Hubmap menu objects */
declare const HUBMAP_MENU: HubmapMenuGroup[];
/** Menus objects */
declare const MENUS: Menu[];

export { HUBMAP_MENU as DEFAULT_HUBMAP_MENU, MENUS as DEFAULT_MENUS, HeaderComponent };
export type { CtaConfig, HubmapMenu, HubmapMenuGroup, HubmapMenuItem, Menu, MenuDivider, MenuGroup, MenuItem };
