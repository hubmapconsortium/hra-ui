import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as node_modules__angular_material_paginator_d from 'node_modules/@angular/material/paginator.d';
import * as _angular_core from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { NgScrollbar } from 'ngx-scrollbar';
import * as z from 'zod';

/** Type for table style */
type TableVariant = z.infer<typeof TableVariantSchema>;
/** Schema for table style */
declare const TableVariantSchema: z.ZodEnum<{
    alternating: "alternating";
    divider: "divider";
    basic: "basic";
}>;
/** Type for a single table row */
type TableRow = z.infer<typeof TableRowSchema>;
/** Schema for a single table row */
declare const TableRowSchema: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny>]>>;
/** Type for Text Column */
type TextColumnType = z.infer<typeof TextColumnTypeSchema>;
/** Schema for Text Column */
declare const TextColumnTypeSchema: z.ZodObject<{
    type: z.ZodLiteral<"text">;
}, z.core.$strip>;
/** Type for Numeric Column */
type NumericColumnType = z.infer<typeof NumericColumnTypeSchema>;
/** Schema for Numeric Column */
declare const NumericColumnTypeSchema: z.ZodObject<{
    type: z.ZodLiteral<"numeric">;
    computeTotal: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/** Type for Markdown Column */
type MarkdownColumnType = z.infer<typeof MarkdownColumnTypeSchema>;
/** Schema for Markdown Column */
declare const MarkdownColumnTypeSchema: z.ZodObject<{
    type: z.ZodLiteral<"markdown">;
}, z.core.$strip>;
/** Type for Icon Column */
type IconColumnType = z.infer<typeof IconColumnTypeSchema>;
/** Schema for Icon Column */
declare const IconColumnTypeSchema: z.ZodObject<{
    type: z.ZodLiteral<"icon">;
    icon: z.ZodString;
    tooltip: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Type for Link Column */
type LinkColumnType = z.infer<typeof LinkColumnTypeSchema>;
/** Schema for Link Column */
declare const LinkColumnTypeSchema: z.ZodObject<{
    type: z.ZodLiteral<"link">;
    urlColumn: z.ZodString;
    internal: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/** Type for MenuButton Column */
type MenuButtonColumnType = z.infer<typeof MenuButtonColumnTypeSchema>;
/** Schema for MenuButton Column */
declare const MenuButtonColumnTypeSchema: z.ZodObject<{
    type: z.ZodLiteral<"menu">;
    icon: z.ZodString;
    options: z.ZodString;
    tooltip: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Type for MenuOptions Column */
type MenuOptionsType = z.infer<typeof MenuOptionsTypeSchema>;
/** Schema for MenuOptions Column */
declare const MenuOptionsTypeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    icon: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Union of Schema Types for Simple Columns */
declare const SimpleTableColumnTypeSchema: z.ZodUnion<readonly [z.ZodLiteral<"text">, z.ZodLiteral<"numeric">, z.ZodLiteral<"markdown">, z.ZodLiteral<"icon">, z.ZodLiteral<"menu">]>;
/** Inferred types for Table Columns */
type TableColumnType = z.infer<typeof TableColumnTypeSchema>;
/** Union of Schema Types for Table Columns */
declare const TableColumnTypeSchema: z.ZodUnion<readonly [z.ZodObject<{
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
}, z.core.$strip>]>;
/** Type for table columns */
type TableColumn = z.infer<typeof TableColumnSchema>;
/** Type for the columns with type specified */
type TableColumnWithType<C extends TableColumnType> = Omit<TableColumn, 'type'> & {
    type: C;
};
/** Schema for table columns */
declare const TableColumnSchema: z.ZodObject<{
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
}, z.core.$strip>;
/** Page table component data */
type PageTable = z.infer<typeof PageTableSchema>;
/** Schema for page table component */
declare const PageTableSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"PageTable">;
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
    enableSelection: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;

/**
 * Angular Material Table with Sort Feature
 */
declare class TableComponent<T = TableRow> {
    /** CSV URL input */
    readonly csvUrl: _angular_core.InputSignal<string | undefined>;
    /** Columns in table */
    readonly columns: _angular_core.InputSignal<{
        column: string;
        label: string;
        type: "text" | {
            type: "text";
        } | "numeric" | {
            type: "numeric";
            computeTotal?: boolean | undefined;
        } | "markdown" | {
            type: "markdown";
        } | "icon" | {
            type: "icon";
            icon: string;
            tooltip?: string | undefined;
        } | {
            type: "link";
            urlColumn: string;
            internal?: boolean | undefined;
        } | "menu" | {
            type: "menu";
            icon: string;
            options: string;
            tooltip?: string | undefined;
        };
    }[] | undefined>;
    /** Unsorted data */
    readonly rows: _angular_core.InputSignal<T[] | undefined>;
    /** Table style */
    readonly style: _angular_core.InputSignal<"alternating" | "divider" | "basic">;
    /** Enables sorting */
    readonly enableSort: _angular_core.InputSignal<boolean>;
    /** Enables dividers between columns */
    readonly verticalDividers: _angular_core.InputSignal<boolean>;
    /** Enable row selection with checkboxes */
    readonly enableRowSelection: _angular_core.InputSignal<boolean>;
    /** Hide table headers */
    readonly hideHeaders: _angular_core.InputSignal<boolean>;
    /** Emits when selection changes */
    readonly selectionChange: _angular_core.OutputEmitterRef<T[]>;
    /** Emits route */
    readonly routeClicked: _angular_core.OutputEmitterRef<string>;
    /** Emits download object id on download button hover */
    readonly downloadHovered: _angular_core.OutputEmitterRef<string>;
    /** Scrollbar ref */
    readonly scrollbar: _angular_core.Signal<NgScrollbar>;
    /** Mat sort element */
    private readonly sort;
    /** Selection model for checkbox functionality */
    readonly selection: SelectionModel<Record<string, string | number | boolean | any[]>>;
    /** Error handler provider for logging errors */
    private readonly errorHandler;
    /** Resolver for asset urls */
    private readonly resolveAssetUrl;
    /** Snackbar service for download notification */
    readonly snackbar: SnackbarService;
    /** CSV resource from remote URL */
    private readonly csv;
    /** Table data rows */
    protected readonly _rows: _angular_core.Signal<T[]>;
    /** Table data columns */
    protected readonly _columns: _angular_core.Signal<{
        column: string;
        label: string;
        type: "text" | {
            type: "text";
        } | "numeric" | {
            type: "numeric";
            computeTotal?: boolean | undefined;
        } | "markdown" | {
            type: "markdown";
        } | "icon" | {
            type: "icon";
            icon: string;
            tooltip?: string | undefined;
        } | {
            type: "link";
            urlColumn: string;
            internal?: boolean | undefined;
        } | "menu" | {
            type: "menu";
            icon: string;
            options: string;
            tooltip?: string | undefined;
        };
    }[]>;
    /** Table data column IDs */
    protected readonly columnIds: _angular_core.Signal<string[]>;
    /** Totals by column for which `computeTotal` is enabled */
    protected readonly totals: _angular_core.Signal<Map<{
        column: string;
        label: string;
        type: "text" | {
            type: "text";
        } | "numeric" | {
            type: "numeric";
            computeTotal?: boolean | undefined;
        } | "markdown" | {
            type: "markdown";
        } | "icon" | {
            type: "icon";
            icon: string;
            tooltip?: string | undefined;
        } | {
            type: "link";
            urlColumn: string;
            internal?: boolean | undefined;
        } | "menu" | {
            type: "menu";
            icon: string;
            options: string;
            tooltip?: string | undefined;
        };
    }, number>>;
    /** Table data source */
    protected readonly dataSource: MatTableDataSource<T, node_modules__angular_material_paginator_d.MatPaginator>;
    /** Sort data on load and set columns */
    constructor();
    /**
     * Returns the column type for a given column.
     * @param column Table column
     * @returns Column type
     */
    getColumnType(column: TableColumn): TableColumnType;
    /**
     * Infers the table column types from the loaded data.
     * @param data Table data
     * @returns Inferred table column with types as an array.
     */
    private inferColumns;
    /**
     * Whether the number of selected elements matches the total number of rows.
     */
    isAllSelected(): boolean;
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     */
    toggleAllRows(): void;
    /**
     * Toggle row selection
     */
    toggleRow(row: TableRow): void;
    /**
     * Returns download menu options as an array of MenuOptionsType
     * @param options Menu options
     * @returns Menu options as an array of MenuOptionsType
     */
    getMenuOptions(options: string | number | boolean | MenuOptionsType[]): MenuOptionsType[];
    /** Emits a route as string when object label is clicked */
    routeClick(url: string | number | boolean | (string | number | boolean)[]): void;
    /** Emits the id of a row when its download button is hovered */
    downloadButtonHover(id: string | number | boolean | (string | number | boolean)[]): void;
    /**
     * Downloads a file from the url
     * @param url File url
     */
    download(url: string): void;
    /** Scrolls to top of the table */
    scrollToTop(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TableComponent<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TableComponent<any>, "hra-table", never, { "csvUrl": { "alias": "csvUrl"; "required": false; "isSignal": true; }; "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; "style": { "alias": "style"; "required": false; "isSignal": true; }; "enableSort": { "alias": "enableSort"; "required": false; "isSignal": true; }; "verticalDividers": { "alias": "verticalDividers"; "required": false; "isSignal": true; }; "enableRowSelection": { "alias": "enableRowSelection"; "required": false; "isSignal": true; }; "hideHeaders": { "alias": "hideHeaders"; "required": false; "isSignal": true; }; }, { "selectionChange": "selectionChange"; "routeClicked": "routeClicked"; "downloadHovered": "downloadHovered"; }, never, ["*"], true, never>;
}

/** Content template definition for TableComponent */
declare const PageTableDef: ContentTemplateDef<TableComponent>;

export { IconColumnTypeSchema, LinkColumnTypeSchema, MarkdownColumnTypeSchema, MenuButtonColumnTypeSchema, MenuOptionsTypeSchema, NumericColumnTypeSchema, PageTableDef, PageTableSchema, SimpleTableColumnTypeSchema, TableColumnSchema, TableColumnTypeSchema, TableComponent, TableRowSchema, TableVariantSchema, TextColumnTypeSchema };
export type { IconColumnType, LinkColumnType, MarkdownColumnType, MenuButtonColumnType, MenuOptionsType, NumericColumnType, PageTable, TableColumn, TableColumnType, TableColumnWithType, TableRow, TableVariant, TextColumnType };
