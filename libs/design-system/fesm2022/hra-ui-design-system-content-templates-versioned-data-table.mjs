import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, model, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i3 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i4 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { TableComponent, PageTableSchema } from '@hra-ui/design-system/table';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import * as i1 from '@angular/material/button';
import * as i2 from '@angular/material/icon';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Data Selector Component
 *
 * This component allows the user to select an item from a list of items.
 * The items are passed as an object, where the keys are the labels and the values are the items.
 */
class VersionedDataTableComponent {
    /** Label for the selector */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : []));
    /** An array of “payload” objects, of any shape */
    items = input.required(...(ngDevMode ? [{ debugName: "items" }] : []));
    /** The initial selection */
    selection = model(0, ...(ngDevMode ? [{ debugName: "selection" }] : []));
    /** The columns */
    columns = input(...(ngDevMode ? [undefined, { debugName: "columns" }] : []));
    /** The style of the table */
    style = input('alternating', ...(ngDevMode ? [{ debugName: "style" }] : []));
    /** The sort of the table */
    enableSort = input(false, ...(ngDevMode ? [{ debugName: "enableSort" }] : []));
    /** The dividers of the table */
    verticalDividers = input(false, ...(ngDevMode ? [{ debugName: "verticalDividers" }] : []));
    /** Whether to hide the version dropdown selector */
    hideVersionSelector = input(false, ...(ngDevMode ? [{ debugName: "hideVersionSelector" }] : []));
    /** Item with the selected key */
    item = computed(() => {
        const selection = this.selection();
        const items = this.items();
        return items[selection] ?? items[0];
    }, ...(ngDevMode ? [{ debugName: "item" }] : []));
    /** function to download CSV or data of rows */
    download() {
        const { csvUrl, rows = [], label } = this.item();
        const filename = `${label}.csv`;
        if (csvUrl) {
            saveAs(csvUrl, filename);
        }
        else {
            const content = unparse(rows, { header: true });
            const blob = new Blob([content], { type: 'text/csv' });
            saveAs(blob, filename);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: VersionedDataTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: VersionedDataTableComponent, isStandalone: true, selector: "hra-versioned-data-table", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: true, transformFunction: null }, selection: { classPropertyName: "selection", publicName: "selection", isSignal: true, isRequired: false, transformFunction: null }, columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, style: { classPropertyName: "style", publicName: "style", isSignal: true, isRequired: false, transformFunction: null }, enableSort: { classPropertyName: "enableSort", publicName: "enableSort", isSignal: true, isRequired: false, transformFunction: null }, verticalDividers: { classPropertyName: "verticalDividers", publicName: "verticalDividers", isSignal: true, isRequired: false, transformFunction: null }, hideVersionSelector: { classPropertyName: "hideVersionSelector", publicName: "hideVersionSelector", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selection: "selectionChange" }, ngImport: i0, template: "@if (!hideVersionSelector()) {\n  <mat-form-field>\n    <mat-label class=\"label\"> {{ label() }} </mat-label>\n    <mat-select class=\"select\" [value]=\"selection()\" (selectionChange)=\"selection.set($event.value)\">\n      @for (item of items(); track $index) {\n        <mat-option [value]=\"$index\">\n          {{ item.label }}\n        </mat-option>\n      }\n    </mat-select>\n  </mat-form-field>\n}\n\n<button\n  mat-icon-button\n  class=\"download\"\n  aria-label=\"Download table data as csv\"\n  hraPlainTooltip=\"Download data\"\n  (click)=\"download()\"\n>\n  <mat-icon>download</mat-icon>\n</button>\n\n<hra-table\n  [csvUrl]=\"item().csvUrl\"\n  [columns]=\"item().columns ?? columns()\"\n  [rows]=\"item().rows\"\n  [style]=\"item().style ?? style()\"\n  [enableSort]=\"item().enableSort ?? enableSort()\"\n  [verticalDividers]=\"item().verticalDividers ?? verticalDividers()\"\n/>\n", styles: [":host{display:block}:host hra-table{height:100%}:host mat-form-field~hra-table{height:calc(100% - 4.25rem)}:host .download{margin-left:1rem}\n"], dependencies: [{ kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: IconsModule }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatSelectModule }, { kind: "component", type: i4.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i4.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "component", type: TableComponent, selector: "hra-table", inputs: ["csvUrl", "columns", "rows", "style", "enableSort", "verticalDividers", "enableRowSelection", "hideHeaders"], outputs: ["selectionChange", "routeClicked", "downloadHovered"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: VersionedDataTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-versioned-data-table', imports: [
                        ButtonsModule,
                        CommonModule,
                        IconsModule,
                        MatFormFieldModule,
                        MatSelectModule,
                        PlainTooltipDirective,
                        TableComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!hideVersionSelector()) {\n  <mat-form-field>\n    <mat-label class=\"label\"> {{ label() }} </mat-label>\n    <mat-select class=\"select\" [value]=\"selection()\" (selectionChange)=\"selection.set($event.value)\">\n      @for (item of items(); track $index) {\n        <mat-option [value]=\"$index\">\n          {{ item.label }}\n        </mat-option>\n      }\n    </mat-select>\n  </mat-form-field>\n}\n\n<button\n  mat-icon-button\n  class=\"download\"\n  aria-label=\"Download table data as csv\"\n  hraPlainTooltip=\"Download data\"\n  (click)=\"download()\"\n>\n  <mat-icon>download</mat-icon>\n</button>\n\n<hra-table\n  [csvUrl]=\"item().csvUrl\"\n  [columns]=\"item().columns ?? columns()\"\n  [rows]=\"item().rows\"\n  [style]=\"item().style ?? style()\"\n  [enableSort]=\"item().enableSort ?? enableSort()\"\n  [verticalDividers]=\"item().verticalDividers ?? verticalDividers()\"\n/>\n", styles: [":host{display:block}:host hra-table{height:100%}:host mat-form-field~hra-table{height:calc(100% - 4.25rem)}:host .download{margin-left:1rem}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], items: [{ type: i0.Input, args: [{ isSignal: true, alias: "items", required: true }] }], selection: [{ type: i0.Input, args: [{ isSignal: true, alias: "selection", required: false }] }, { type: i0.Output, args: ["selectionChange"] }], columns: [{ type: i0.Input, args: [{ isSignal: true, alias: "columns", required: false }] }], style: [{ type: i0.Input, args: [{ isSignal: true, alias: "style", required: false }] }], enableSort: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableSort", required: false }] }], verticalDividers: [{ type: i0.Input, args: [{ isSignal: true, alias: "verticalDividers", required: false }] }], hideVersionSelector: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideVersionSelector", required: false }] }] } });

/**
 * Schema for versioned data
 */
const VersionedDataSchema = PageTableSchema.pick({
    csvUrl: true,
    columns: true,
    rows: true,
    style: true,
    enableSort: true,
    verticalDividers: true,
}).extend({
    label: z.string(),
    version: z.string(),
});
/**
 * Schema for versioned data table
 *
 * This schema extends the PageTableSchema and adds additional properties
 * specific to the versioned table data component.
 */
const VersionedDataTableSchema = ContentTemplateSchema.merge(PageTableSchema.pick({
    columns: true,
    style: true,
    enableSort: true,
    verticalDividers: true,
})).extend({
    component: z.literal('VersionedDataTable'),
    label: z.string(),
    selection: z.number().optional(),
    items: VersionedDataSchema.array(),
});

/** Content template definition for VersionedTableDataComponent */
const VersionedDataTableDef = {
    component: VersionedDataTableComponent,
    spec: VersionedDataTableSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { VersionedDataTableComponent, VersionedDataTableDef, VersionedDataTableSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-versioned-data-table.mjs.map
