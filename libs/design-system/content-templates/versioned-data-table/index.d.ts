import * as _angular_core from '@angular/core';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Data Selector Component
 *
 * This component allows the user to select an item from a list of items.
 * The items are passed as an object, where the keys are the labels and the values are the items.
 */
declare class VersionedDataTableComponent {
    /** Label for the selector */
    readonly label: _angular_core.InputSignal<string>;
    /** An array of “payload” objects, of any shape */
    readonly items: _angular_core.InputSignal<{
        label: string;
        version: string;
        csvUrl?: string | undefined;
        columns?: {
            column: string;
            label: string;
            type: "text" | "numeric" | "markdown" | "icon" | "menu" | {
                type: "text";
            } | {
                type: "numeric";
                computeTotal?: boolean | undefined;
            } | {
                type: "markdown";
            } | {
                type: "link";
                urlColumn: string;
                internal?: boolean | undefined;
            } | {
                type: "icon";
                icon: string;
                tooltip?: string | undefined;
            } | {
                type: "menu";
                icon: string;
                options: string;
                tooltip?: string | undefined;
            };
        }[] | undefined;
        rows?: Record<string, string | number | boolean | any[]>[] | undefined;
        style?: "alternating" | "divider" | "basic" | undefined;
        enableSort?: boolean | undefined;
        verticalDividers?: boolean | undefined;
    }[]>;
    /** The initial selection */
    readonly selection: _angular_core.ModelSignal<number>;
    /** The columns */
    readonly columns: _angular_core.InputSignal<{
        column: string;
        label: string;
        type: "text" | "numeric" | "markdown" | "icon" | "menu" | {
            type: "text";
        } | {
            type: "numeric";
            computeTotal?: boolean | undefined;
        } | {
            type: "markdown";
        } | {
            type: "link";
            urlColumn: string;
            internal?: boolean | undefined;
        } | {
            type: "icon";
            icon: string;
            tooltip?: string | undefined;
        } | {
            type: "menu";
            icon: string;
            options: string;
            tooltip?: string | undefined;
        };
    }[] | undefined>;
    /** The style of the table */
    readonly style: _angular_core.InputSignal<"alternating" | "divider" | "basic">;
    /** The sort of the table */
    readonly enableSort: _angular_core.InputSignal<boolean>;
    /** The dividers of the table */
    readonly verticalDividers: _angular_core.InputSignal<boolean>;
    /** Whether to hide the version dropdown selector */
    readonly hideVersionSelector: _angular_core.InputSignal<boolean>;
    /** Item with the selected key */
    protected readonly item: _angular_core.Signal<{
        label: string;
        version: string;
        csvUrl?: string | undefined;
        columns?: {
            column: string;
            label: string;
            type: "text" | "numeric" | "markdown" | "icon" | "menu" | {
                type: "text";
            } | {
                type: "numeric";
                computeTotal?: boolean | undefined;
            } | {
                type: "markdown";
            } | {
                type: "link";
                urlColumn: string;
                internal?: boolean | undefined;
            } | {
                type: "icon";
                icon: string;
                tooltip?: string | undefined;
            } | {
                type: "menu";
                icon: string;
                options: string;
                tooltip?: string | undefined;
            };
        }[] | undefined;
        rows?: Record<string, string | number | boolean | any[]>[] | undefined;
        style?: "alternating" | "divider" | "basic" | undefined;
        enableSort?: boolean | undefined;
        verticalDividers?: boolean | undefined;
    }>;
    /** function to download CSV or data of rows */
    download(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<VersionedDataTableComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<VersionedDataTableComponent, "hra-versioned-data-table", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "items": { "alias": "items"; "required": true; "isSignal": true; }; "selection": { "alias": "selection"; "required": false; "isSignal": true; }; "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "style": { "alias": "style"; "required": false; "isSignal": true; }; "enableSort": { "alias": "enableSort"; "required": false; "isSignal": true; }; "verticalDividers": { "alias": "verticalDividers"; "required": false; "isSignal": true; }; "hideVersionSelector": { "alias": "hideVersionSelector"; "required": false; "isSignal": true; }; }, { "selection": "selectionChange"; }, never, never, true, never>;
}

/** Content template definition for VersionedTableDataComponent */
declare const VersionedDataTableDef: ContentTemplateDef<VersionedDataTableComponent>;

/**
 * Type for versioned Data Table
 */
type VersionedDataTable = z.infer<typeof VersionedDataTableSchema>;
/**
 * Schema for versioned data table
 *
 * This schema extends the PageTableSchema and adds additional properties
 * specific to the versioned table data component.
 */
declare const VersionedDataTableSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    columns: z.ZodOptional<z.ZodArray<z.ZodObject<{
        column: z.ZodString;
        label: z.ZodString;
        type: z.ZodDefault<z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodLiteral<"text">, z.ZodLiteral<"numeric">, z.ZodLiteral<"markdown">, z.ZodLiteral<"icon">, z.ZodLiteral<"menu">]>, z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"text">;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"numeric">;
            computeTotal: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"markdown">;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"link">;
            urlColumn: z.ZodString;
            internal: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"icon">;
            icon: z.ZodString;
            tooltip: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"menu">;
            icon: z.ZodString;
            options: z.ZodString;
            tooltip: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>]>]>>;
    }, z.core.$strip>>>;
    style: z.ZodOptional<z.ZodEnum<{
        alternating: "alternating";
        divider: "divider";
        basic: "basic";
    }>>;
    enableSort: z.ZodOptional<z.ZodBoolean>;
    verticalDividers: z.ZodOptional<z.ZodBoolean>;
    component: z.ZodLiteral<"VersionedDataTable">;
    label: z.ZodString;
    selection: z.ZodOptional<z.ZodNumber>;
    items: z.ZodArray<z.ZodObject<{
        csvUrl: z.ZodOptional<z.ZodString>;
        columns: z.ZodOptional<z.ZodArray<z.ZodObject<{
            column: z.ZodString;
            label: z.ZodString;
            type: z.ZodDefault<z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodLiteral<"text">, z.ZodLiteral<"numeric">, z.ZodLiteral<"markdown">, z.ZodLiteral<"icon">, z.ZodLiteral<"menu">]>, z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"numeric">;
                computeTotal: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"markdown">;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"link">;
                urlColumn: z.ZodString;
                internal: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"icon">;
                icon: z.ZodString;
                tooltip: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"menu">;
                icon: z.ZodString;
                options: z.ZodString;
                tooltip: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>]>]>>;
        }, z.core.$strip>>>;
        rows: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny>]>>>>;
        style: z.ZodOptional<z.ZodEnum<{
            alternating: "alternating";
            divider: "divider";
            basic: "basic";
        }>>;
        enableSort: z.ZodOptional<z.ZodBoolean>;
        verticalDividers: z.ZodOptional<z.ZodBoolean>;
        label: z.ZodString;
        version: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;

export { VersionedDataTableComponent, VersionedDataTableDef, VersionedDataTableSchema };
export type { VersionedDataTable };
