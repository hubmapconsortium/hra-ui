import * as _angular_core from '@angular/core';
import * as z from 'zod';

/** Site Navigation Component for HRA Docs */
declare class SiteNavigationComponent {
    /** Navigation Menu Items */
    readonly navigationMenu: _angular_core.InputSignal<({
        type: "item";
        label: string;
        url: string;
        icon?: string | undefined;
    } | {
        label: string;
        icon: string;
        children: {
            type: "item";
            label: string;
            url: string;
            icon?: string | undefined;
        }[];
        type?: "category" | undefined;
    })[]>;
    /** Base URL for the appliation */
    readonly baseUrl: _angular_core.InputSignal<string>;
    /** State for expanded navigation category */
    readonly expandedCategory: _angular_core.WritableSignal<string>;
    /** Angular Router */
    private readonly router;
    /** Constructor */
    constructor();
    /** Event handler to change the expanded navigation category */
    changeExpandedCategory(isExpanded: boolean, category: string): void;
    /** Updates the currently expanded category */
    private updateExpandedCategory;
    /** Finds the expanded category
     * @param menu Docs Menu Items
     */
    private findExpandedCategory;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SiteNavigationComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SiteNavigationComponent, "hra-site-navigation", never, { "navigationMenu": { "alias": "navigationMenu"; "required": false; "isSignal": true; }; "baseUrl": { "alias": "baseUrl"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Docs Navigation Item */
type DocsNavigationItem = z.infer<typeof DocsNavigationItemSchema>;
/** Docs Navigation Item Schema */
declare const DocsNavigationItemSchema: z.ZodObject<{
    type: z.ZodLiteral<"item">;
    label: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
}, z.core.$strip>;
/** Docs Navigation Category */
type DocsNavigationCategory = z.infer<typeof DocsNavigationCategorySchema>;
/** Docs Navigation Category Schema */
declare const DocsNavigationCategorySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<"category">>;
    label: z.ZodString;
    icon: z.ZodString;
    children: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"item">;
        label: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Docs Menu Items Array Type */
type DocsMenuItems = z.infer<typeof DocsMenuItemsSchema>;
/** Docs Menu Items Array Schema */
declare const DocsMenuItemsSchema: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<"category">>;
    label: z.ZodString;
    icon: z.ZodString;
    children: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"item">;
        label: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"item">;
    label: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
}, z.core.$strip>]>>;
/** Docs Navigation Menu */
type DocsNavigationMenu = z.infer<typeof DocsNavigationMenuSchema>;
/** Docs Navigation Menu Schema */
declare const DocsNavigationMenuSchema: z.ZodObject<{
    $schema: z.ZodString;
    menuItems: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodOptional<z.ZodLiteral<"category">>;
        label: z.ZodString;
        icon: z.ZodString;
        children: z.ZodArray<z.ZodObject<{
            type: z.ZodLiteral<"item">;
            label: z.ZodString;
            icon: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"item">;
        label: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
    }, z.core.$strip>]>>;
}, z.core.$strip>;

/** Docs Navigation Menu */
declare const DOCS_NAVIGATION_MENU: DocsMenuItems;

export { DOCS_NAVIGATION_MENU, SiteNavigationComponent };
export type { DocsNavigationCategory, DocsNavigationItem, DocsNavigationMenu };
