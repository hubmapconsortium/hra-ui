import { SelectionModel } from '@angular/cdk/collections';
import { httpResource } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Directive, input, output, viewChild, inject, ErrorHandler, computed, effect, Component } from '@angular/core';
import * as i8 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i4 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i5 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as i6 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as i12 from '@hra-ui/common';
import { HraCommonModule } from '@hra-ui/common';
import { injectAssetUrlResolver } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import * as i10 from '@hra-ui/design-system/icons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import saveAs from 'file-saver';
import * as i3 from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';
import { parse } from 'papaparse';
import * as i1 from '@angular/common';
import * as i2 from '@hra-ui/common/analytics';
import * as i7 from 'ngx-scrollbar';
import * as i9 from '@angular/material/icon';
import * as i11 from '@angular/material/button';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Directive for typing the context of Text Row Element */
class TextRowElementDirective {
    /* istanbul ignore next */
    /** Guard for the context of Text Row Element */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TextRowElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.11", type: TextRowElementDirective, isStandalone: true, selector: "ng-template[hraTextRowElement]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TextRowElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraTextRowElement]',
                }]
        }] });
/** Directive for typing the context of Link Row Element */
class LinkRowElementDirective {
    /* istanbul ignore next */
    /** Guard for the context of Link Row Element */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: LinkRowElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.11", type: LinkRowElementDirective, isStandalone: true, selector: "ng-template[hraLinkRowElement]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: LinkRowElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraLinkRowElement]',
                }]
        }] });
/** Directive for typing the context of Markdown Row Element */
class MarkdownRowElementDirective {
    /* istanbul ignore next */
    /** Guard for the context of Markdown Row Element */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: MarkdownRowElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.11", type: MarkdownRowElementDirective, isStandalone: true, selector: "ng-template[hraMarkdownRowElement]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: MarkdownRowElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraMarkdownRowElement]',
                }]
        }] });
/** Directive for typing the context of Icon Row Element */
class IconRowElementDirective {
    /* istanbul ignore next */
    /** Guard for the context of Icon Row Element */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconRowElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.11", type: IconRowElementDirective, isStandalone: true, selector: "ng-template[hraIconRowElement]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconRowElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraIconRowElement]',
                }]
        }] });
/** Directive for typing the context of menuButton Row Element */
class MenuButtonRowElementDirective {
    /* istanbul ignore next */
    /** Guard for the context of menuButton Row Element */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: MenuButtonRowElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.11", type: MenuButtonRowElementDirective, isStandalone: true, selector: "ng-template[hraMenuButtonRowElement]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: MenuButtonRowElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraMenuButtonRowElement]',
                }]
        }] });
/** Directive for typing the context of Numeric Row Element */
class NumericRowElementDirective {
    /* istanbul ignore next */
    /** Guard for the context of Numeric Row Element */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NumericRowElementDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.11", type: NumericRowElementDirective, isStandalone: true, selector: "ng-template[hraNumericRowElement]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NumericRowElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraNumericRowElement]',
                }]
        }] });
/**
 * Angular Material Table with Sort Feature
 */
class TableComponent {
    /** CSV URL input */
    csvUrl = input(...(ngDevMode ? [undefined, { debugName: "csvUrl" }] : []));
    /** Columns in table */
    columns = input(...(ngDevMode ? [undefined, { debugName: "columns" }] : []));
    /** Unsorted data */
    rows = input(...(ngDevMode ? [undefined, { debugName: "rows" }] : []));
    /** Table style */
    style = input('alternating', ...(ngDevMode ? [{ debugName: "style" }] : []));
    /** Enables sorting */
    enableSort = input(false, ...(ngDevMode ? [{ debugName: "enableSort" }] : []));
    /** Enables dividers between columns */
    verticalDividers = input(false, ...(ngDevMode ? [{ debugName: "verticalDividers" }] : []));
    /** Enable row selection with checkboxes */
    enableRowSelection = input(false, ...(ngDevMode ? [{ debugName: "enableRowSelection" }] : []));
    /** Hide table headers */
    hideHeaders = input(false, ...(ngDevMode ? [{ debugName: "hideHeaders" }] : []));
    /** Emits when selection changes */
    selectionChange = output();
    /** Emits route */
    routeClicked = output();
    /** Emits download object id on download button hover */
    downloadHovered = output();
    /** Scrollbar ref */
    scrollbar = viewChild.required('scrollbar');
    /** Mat sort element */
    sort = viewChild.required(MatSort);
    /** Selection model for checkbox functionality */
    selection = new SelectionModel(true, []);
    /** Error handler provider for logging errors */
    errorHandler = inject(ErrorHandler);
    /** Resolver for asset urls */
    resolveAssetUrl = injectAssetUrlResolver();
    /** Snackbar service for download notification */
    snackbar = inject(SnackbarService);
    /** CSV resource from remote URL */
    csv = httpResource.text(() => {
        const url = this.csvUrl();
        return url ? this.resolveAssetUrl(url) : url;
    }, {
        defaultValue: [],
        parse: (data) => {
            const result = parse(data, { header: true, dynamicTyping: true, skipEmptyLines: true });
            if (result.errors.length > 0) {
                this.errorHandler.handleError(result.errors);
            }
            return result.data;
        },
    });
    /** Table data rows */
    _rows = computed(() => this.rows() ?? this.csv.value(), ...(ngDevMode ? [{ debugName: "_rows" }] : []));
    /** Table data columns */
    _columns = computed(() => this.columns() ?? this.inferColumns(this._rows()), ...(ngDevMode ? [{ debugName: "_columns" }] : []));
    /** Table data column IDs */
    columnIds = computed(() => {
        const columns = this._columns().map((col) => col.column);
        return this.enableRowSelection() ? ['select', ...columns] : columns;
    }, ...(ngDevMode ? [{ debugName: "columnIds" }] : []));
    /** Totals by column for which `computeTotal` is enabled */
    totals = computed(() => {
        const result = new Map();
        for (const col of this._columns()) {
            const options = this.getColumnType(col);
            if (options.type === 'numeric' && options.computeTotal) {
                const total = this._rows().reduce((acc, row) => {
                    const value = Number(row[col.column]);
                    return acc + (Number.isNaN(value) ? 0 : value);
                }, 0);
                result.set(col, total);
            }
        }
        return result;
    }, ...(ngDevMode ? [{ debugName: "totals" }] : []));
    /** Table data source */
    dataSource = new MatTableDataSource([]);
    /** Sort data on load and set columns */
    constructor() {
        effect(() => {
            this.dataSource.data = this._rows();
        });
        effect(() => {
            this.dataSource.sort = this.sort();
        });
    }
    /**
     * Returns the column type for a given column.
     * @param column Table column
     * @returns Column type
     */
    getColumnType(column) {
        return typeof column.type === 'string' ? { type: column.type } : column.type;
    }
    /**
     * Infers the table column types from the loaded data.
     * @param data Table data
     * @returns Inferred table column with types as an array.
     */
    inferColumns(data) {
        if (data.length === 0) {
            return [];
        }
        const item = data[0];
        const columns = [];
        for (const key in item) {
            const type = typeof item[key] === 'number' ? 'numeric' : 'text';
            columns.push({ column: key, label: key, type });
        }
        return columns;
    }
    /**
     * Whether the number of selected elements matches the total number of rows.
     */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    /**
     * Selects all rows if they are not all selected; otherwise clear selection.
     */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else {
            this.selection.select(...this.dataSource.data);
        }
        this.selectionChange.emit(this.selection.selected);
    }
    /**
     * Toggle row selection
     */
    toggleRow(row) {
        this.selection.toggle(row);
        this.selectionChange.emit(this.selection.selected);
    }
    /**
     * Returns download menu options as an array of MenuOptionsType
     * @param options Menu options
     * @returns Menu options as an array of MenuOptionsType
     */
    getMenuOptions(options) {
        return options;
    }
    /** Emits a route as string when object label is clicked */
    routeClick(url) {
        this.routeClicked.emit(url);
    }
    /** Emits the id of a row when its download button is hovered */
    downloadButtonHover(id) {
        this.downloadHovered.emit(id);
    }
    /**
     * Downloads a file from the url
     * @param url File url
     */
    download(url) {
        saveAs(url, url.split('/').pop());
    }
    /** Scrolls to top of the table */
    scrollToTop() {
        this.scrollbar().scrollTo({ top: 0, duration: 0 });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: TableComponent, isStandalone: true, selector: "hra-table", inputs: { csvUrl: { classPropertyName: "csvUrl", publicName: "csvUrl", isSignal: true, isRequired: false, transformFunction: null }, columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: false, transformFunction: null }, style: { classPropertyName: "style", publicName: "style", isSignal: true, isRequired: false, transformFunction: null }, enableSort: { classPropertyName: "enableSort", publicName: "enableSort", isSignal: true, isRequired: false, transformFunction: null }, verticalDividers: { classPropertyName: "verticalDividers", publicName: "verticalDividers", isSignal: true, isRequired: false, transformFunction: null }, enableRowSelection: { classPropertyName: "enableRowSelection", publicName: "enableRowSelection", isSignal: true, isRequired: false, transformFunction: null }, hideHeaders: { classPropertyName: "hideHeaders", publicName: "hideHeaders", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selectionChange: "selectionChange", routeClicked: "routeClicked", downloadHovered: "downloadHovered" }, host: { properties: { "class": "\"hra-table-style-\" + style()", "class.sortable": "enableSort()", "class.vertical-dividers": "verticalDividers()" } }, viewQueries: [{ propertyName: "scrollbar", first: true, predicate: ["scrollbar"], descendants: true, isSignal: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true, isSignal: true }], ngImport: i0, template: "<ng-container hraFeature=\"table\">\n  <!-- TODO fix overflow fade\n    hraScrollOverflowFade\n    [scrollOverflowFadeOffset]=\"40\"\n  -->\n  <ng-scrollbar\n    externalViewport=\".scroll-viewport\"\n    externalContentWrapper=\".content-wrapper\"\n    externalSpacer=\"content-wrapper\"\n    asyncDetection=\"auto\"\n    #scrollbar\n  >\n    <div class=\"scroll-viewport\">\n      <div class=\"content-wrapper\">\n        <table\n          mat-table\n          matSort\n          aria-label=\"Table with sort function\"\n          [dataSource]=\"dataSource\"\n          [matSortDisabled]=\"!enableSort()\"\n          [class.vertical-divider]=\"verticalDividers()\"\n        >\n          @let templates = { text, numeric, markdown, link, icon, menu };\n\n          <!-- Selection Column (if enabled) -->\n          @if (enableRowSelection()) {\n            <ng-container hraFeature=\"select\" matColumnDef=\"select\">\n              @if (!hideHeaders()) {\n                <th *matHeaderCellDef mat-header-cell data-column-type=\"checkbox\">\n                  <mat-checkbox\n                    hraFeature=\"toggle-all\"\n                    disableRipple\n                    hraPlainTooltip=\"Hide all\"\n                    aria-label=\"Hide all\"\n                    [hraClickEvent]=\"{ checked: !(selection.hasValue() && isAllSelected()) }\"\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                    (change)=\"toggleAllRows()\"\n                  />\n                </th>\n              }\n              <td *matCellDef=\"let element\" mat-cell data-column-type=\"checkbox\">\n                <mat-checkbox\n                  hraFeature=\"toggle\"\n                  disableRipple\n                  hraPlainTooltip=\"Hide\"\n                  aria-label=\"Hide\"\n                  [hraClickEvent]=\"{ checked: selection.isSelected(element) }\"\n                  [checked]=\"selection.isSelected(element)\"\n                  (click)=\"$event.stopPropagation()\"\n                  (change)=\"$event ? toggleRow(element) : null\"\n                />\n              </td>\n            </ng-container>\n          }\n\n          @for (column of _columns(); track column.column) {\n            @let type = getColumnType(column).type;\n            @let template = templates[type];\n            @let isTotalsLabelColumn = enableRowSelection() ? $index === 1 : $first;\n\n            <ng-container [matColumnDef]=\"column.column\">\n              @if (!hideHeaders()) {\n                <th\n                  *matHeaderCellDef\n                  hraClickEvent\n                  mat-header-cell\n                  mat-sort-header\n                  [hraFeature]=\"`header-cell.${(column.label | slugify)}`\"\n                  [attr.data-column-type]=\"type\"\n                  [sortActionDescription]=\"`Sort by ${column.label}`\"\n                >\n                  {{ column.label }}\n                </th>\n              }\n              <td *matCellDef=\"let element\" mat-cell [attr.data-column-type]=\"type\">\n                <ng-container\n                  *ngTemplateOutlet=\"template; context: { $implicit: element[column.column], element, column }\"\n                />\n              </td>\n\n              <!-- Total Footer -->\n              <td *matFooterCellDef mat-footer-cell [attr.data-column-type]=\"type\">\n                @if (isTotalsLabelColumn) {\n                  <span class=\"total-label\"> Total </span>\n                } @else if (totals().get(column)) {\n                  <span class=\"numeric\">\n                    {{ totals().get(column) | number }}\n                  </span>\n                }\n              </td>\n            </ng-container>\n          }\n\n          @if (!hideHeaders()) {\n            <tr *matHeaderRowDef=\"columnIds(); sticky: true\" mat-header-row></tr>\n          }\n          <tr *matRowDef=\"let row; let i = index; columns: columnIds()\" mat-row></tr>\n\n          @if (totals().size > 0) {\n            <tr *matFooterRowDef=\"columnIds(); sticky: true\" mat-footer-row></tr>\n          }\n        </table>\n\n        <ng-content />\n      </div>\n    </div>\n  </ng-scrollbar>\n\n  <ng-template let-text hraTextRowElement #text>\n    <span class=\"text\">{{ text }}</span>\n  </ng-template>\n\n  <ng-template let-value hraNumericRowElement #numeric>\n    <span class=\"numeric\">{{ value | number }}</span>\n  </ng-template>\n\n  <ng-template let-markdown hraMarkdownRowElement #markdown>\n    <markdown class=\"markdown\" [data]=\"markdown\" />\n  </ng-template>\n\n  <ng-template let-icon let-column=\"column\" let-element=\"element\" hraIconRowElement #icon>\n    <hra-icon\n      hraFeature=\"table-icon\"\n      [hraHoverEvent]=\"{ value: element[column.type.tooltip] | slugify }\"\n      [svgIcon]=\"icon\"\n      [hraPlainTooltip]=\"element[column.type.tooltip]\"\n    />\n  </ng-template>\n\n  <ng-template let-column=\"column\" let-element=\"element\" hraFeature=\"menu-cell\" hraMenuButtonRowElement #menu>\n    @let options = element[column.type.options];\n    <button\n      hraFeature=\"download\"\n      hraClickEvent\n      mat-icon-button\n      [matMenuTriggerFor]=\"menuOptions\"\n      [hraPlainTooltip]=\"column.type.tooltip\"\n      (mouseover)=\"downloadButtonHover(element['id'])\"\n      (focus)=\"downloadButtonHover(element['id'])\"\n      #trigger=\"matMenuTrigger\"\n    >\n      <hra-icon [fontIcon]=\"column.type.icon\" />\n    </button>\n\n    <mat-menu hraFeature=\"download-options\" class=\"table-menu\" #menuOptions=\"matMenu\">\n      @for (option of getMenuOptions(options); track $index) {\n        <a\n          hraClickEvent\n          mat-menu-item\n          download\n          [hraFeature]=\"option.name | slugify\"\n          [attr.href]=\"option.url\"\n          (click)=\"\n            $event.preventDefault();\n            download(option.url!);\n            snackbar.open('File downloaded', '', false, 'start', { duration: 5000 })\n          \"\n        >\n          <mat-icon>{{ option.icon }}</mat-icon>\n          <div class=\"option-text\">\n            <span class=\"option-name\">\n              {{ option.name }}\n            </span>\n            <span class=\"option-description\">\n              {{ option.description }}\n            </span>\n          </div>\n        </a>\n      }\n    </mat-menu>\n  </ng-template>\n\n  <ng-template let-label let-column=\"column\" let-element=\"element\" hraFeature=\"link-cell\" hraLinkRowElement #link>\n    @let url = element[column.type.urlColumn];\n    @let isInternal = column.type.internal;\n    @if (isInternal) {\n      <a hraHyperlink class=\"link internal\" tabindex=\"0\" (keyup)=\"routeClick(url)\" (click)=\"routeClick(url)\">\n        {{ label }}\n      </a>\n    } @else {\n      <a hraHyperlink class=\"link\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"url\">\n        {{ label }}\n      </a>\n    }\n  </ng-template>\n</ng-container>\n", styles: [":host{display:block;overflow:hidden;height:100%;border:.0625rem solid var(--mat-sys-outline);border-radius:.5rem;--mat-table-background-color: transparent;--mat-table-header-container-height: 2.5rem;--mat-table-header-headline-color: var(--mat-sys-secondary);--mat-table-header-headline-font: var(--mat-sys-label-medium-font);--mat-table-header-headline-line-height: var(--mat-sys-label-medium-line-height);--mat-table-header-headline-size: var(--mat-sys-label-medium-size);--mat-table-header-headline-tracking: var(--mat-sys-label-medium-tracking);--mat-table-header-headline-weight: var(--mat-sys-label-medium-weight);--mat-table-footer-container-height: 2.5rem;--mat-table-footer-supporting-text-font: var(--mat-sys-label-medium-font);--mat-table-footer-supporting-text-line-height: var(--mat-sys-label-medium-line-height);--mat-table-footer-supporting-text-size: var(--mat-sys-label-medium-size);--mat-table-footer-supporting-text-tracking: var(--mat-sys-label-medium-tracking);--mat-table-footer-supporting-text-weight: var(--mat-sys-label-medium-weight);--mat-table-row-item-container-height: 2.5rem;--mat-table-row-item-label-text-color: var(--mat-sys-primary);--mat-table-row-item-label-text-font: var(--mat-sys-label-medium-font);--mat-table-row-item-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-table-row-item-label-text-size: var(--mat-sys-label-medium-size);--mat-table-row-item-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-table-row-item-label-text-weight: var(--mat-sys-label-medium-weight);--mat-table-row-item-outline-width: 0px;--mat-sort-arrow-color: var(--mat-sys-secondary)}:host:has(tr[mat-header-row]) ng-scrollbar ::ng-deep scrollbar-y{top:2.5rem;height:calc(100% - 2.5rem)}:host:has(tr[mat-header-row]) ng-scrollbar ::ng-deep scrollbar-y .ng-scrollbar-sticky{top:2.5rem}:host .vertical-divider th:not(:first-child),:host .vertical-divider td:not(:first-child){border-left:1px solid var(--mat-sys-outline)}:host th[mat-sort-header].cdk-focused,:host .cdk-keyboard-focused{position:relative;background-color:none}:host th[mat-sort-header].cdk-focused:before,:host .cdk-keyboard-focused:before{content:\"\";position:absolute;inset:0;border-radius:.25rem;z-index:-1;background-color:rgb(from var(--mat-sys-secondary) r g b/12%)}:host th[mat-sort-header].cdk-focused ::ng-deep .mat-focus-indicator,:host .cdk-keyboard-focused ::ng-deep .mat-focus-indicator{border-bottom:none!important}:host th[mat-sort-header]:hover .mat-sort-header-arrow{color:var(--mat-sys-outline)}:host th[mat-sort-header] ::ng-deep .mat-sort-header-arrow{color:var(--mat-sys-secondary)}:host ng-scrollbar{height:100%;overflow:hidden}:host ng-scrollbar ::ng-deep .ng-scroll-viewport{max-height:var(--hra-table-max-height)}:host th[data-column-type=numeric],:host td[data-column-type=numeric]{text-align:right}:host th[data-column-type=numeric] ::ng-deep .mat-sort-header-container{justify-content:end}:host th[data-column-type=checkbox],:host td[data-column-type=checkbox]{padding:0;text-align:center;max-height:2.0625rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host.sortable .numeric{margin-right:1.125rem}:host markdown ::ng-deep p:first-child{margin-top:.5rem}:host markdown ::ng-deep p:last-child{margin-bottom:.5rem}:host.hra-table-style-basic ::ng-deep thead{background-color:var(--mat-sys-on-primary)}:host.hra-table-style-divider,:host.hra-table-style-alternating{--mat-table-background-color: var(--mat-sys-on-primary)}:host.hra-table-style-divider ng-scrollbar,:host.hra-table-style-alternating ng-scrollbar{--scrollbar-offset: 4}:host.hra-table-style-divider ::ng-deep thead,:host.hra-table-style-alternating ::ng-deep thead{background-color:var(--mat-sys-surface-dim)}:host.hra-table-style-divider ::ng-deep thead th,:host.hra-table-style-alternating ::ng-deep thead th{border-bottom:.0625rem solid var(--mat-sys-outline);padding-bottom:.5rem;padding-top:.5rem;vertical-align:bottom}:host.hra-table-style-divider ::ng-deep tbody td,:host.hra-table-style-alternating ::ng-deep tbody td{padding-bottom:.5rem;padding-top:.5rem}:host.hra-table-style-divider ::ng-deep tfoot,:host.hra-table-style-alternating ::ng-deep tfoot{background-color:var(--mat-sys-surface-dim)}:host.hra-table-style-divider ::ng-deep tfoot td,:host.hra-table-style-alternating ::ng-deep tfoot td{color:var(--mat-sys-secondary);font-weight:500;padding-top:.5rem;padding-bottom:.5rem;border-top:.0625rem solid var(--mat-sys-outline)}:host.hra-table-style-divider{--mat-table-row-item-outline-color: var(--mat-sys-outline-variant);--mat-table-row-item-outline-width: .0625rem}:host.hra-table-style-alternating ::ng-deep tbody tr:nth-child(2n){background-color:var(--mat-sys-surface-container)}:host .link.internal{color:var(--mat-sys-on-tertiary-fixed);cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i2.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i2.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MarkdownModule }, { kind: "component", type: i3.MarkdownComponent, selector: "markdown, [markdown]", inputs: ["data", "src", "disableSanitizer", "inline", "clipboard", "clipboardButtonComponent", "clipboardButtonTemplate", "emoji", "katex", "katexOptions", "mermaid", "mermaidOptions", "lineHighlight", "line", "lineOffset", "lineNumbers", "start", "commandLine", "filterOutput", "host", "prompt", "output", "user"], outputs: ["error", "load", "ready"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i4.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i4.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i4.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatSortModule }, { kind: "directive", type: i5.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i5.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "ngmodule", type: MatTableModule }, { kind: "component", type: i6.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i6.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i6.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i6.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i6.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i6.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i6.MatFooterCellDef, selector: "[matFooterCellDef]" }, { kind: "directive", type: i6.MatFooterRowDef, selector: "[matFooterRowDef]", inputs: ["matFooterRowDef", "matFooterRowDefSticky"] }, { kind: "directive", type: i6.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i6.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "directive", type: i6.MatFooterCell, selector: "mat-footer-cell, td[mat-footer-cell]" }, { kind: "component", type: i6.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i6.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i6.MatFooterRow, selector: "mat-footer-row, tr[mat-footer-row]", exportAs: ["matFooterRow"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i7.NgScrollbarExt, selector: "ng-scrollbar[externalViewport]", inputs: ["externalViewport", "externalContentWrapper", "externalSpacer"], exportAs: ["ngScrollbar"] }, { kind: "directive", type: i7.AsyncDetection, selector: "ng-scrollbar[externalViewport][asyncDetection]", inputs: ["asyncDetection"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i8.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "directive", type: TextHyperlinkDirective, selector: "a[hraHyperlink]" }, { kind: "directive", type: LinkRowElementDirective, selector: "ng-template[hraLinkRowElement]" }, { kind: "directive", type: TextRowElementDirective, selector: "ng-template[hraTextRowElement]" }, { kind: "directive", type: MarkdownRowElementDirective, selector: "ng-template[hraMarkdownRowElement]" }, { kind: "directive", type: MenuButtonRowElementDirective, selector: "ng-template[hraMenuButtonRowElement]" }, { kind: "directive", type: NumericRowElementDirective, selector: "ng-template[hraNumericRowElement]" }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i10.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i11.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "pipe", type: i1.DecimalPipe, name: "number" }, { kind: "pipe", type: i12.SlugifyPipe, name: "slugify" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-table', imports: [
                        HraCommonModule,
                        MarkdownModule,
                        MatMenuModule,
                        MatSortModule,
                        MatTableModule,
                        ScrollingModule,
                        MatCheckboxModule,
                        TextHyperlinkDirective,
                        LinkRowElementDirective,
                        TextRowElementDirective,
                        MarkdownRowElementDirective,
                        MenuButtonRowElementDirective,
                        NumericRowElementDirective,
                        PlainTooltipDirective,
                        IconsModule,
                        ButtonsModule,
                    ], host: {
                        '[class]': '"hra-table-style-" + style()',
                        '[class.sortable]': 'enableSort()',
                        '[class.vertical-dividers]': 'verticalDividers()',
                    }, template: "<ng-container hraFeature=\"table\">\n  <!-- TODO fix overflow fade\n    hraScrollOverflowFade\n    [scrollOverflowFadeOffset]=\"40\"\n  -->\n  <ng-scrollbar\n    externalViewport=\".scroll-viewport\"\n    externalContentWrapper=\".content-wrapper\"\n    externalSpacer=\"content-wrapper\"\n    asyncDetection=\"auto\"\n    #scrollbar\n  >\n    <div class=\"scroll-viewport\">\n      <div class=\"content-wrapper\">\n        <table\n          mat-table\n          matSort\n          aria-label=\"Table with sort function\"\n          [dataSource]=\"dataSource\"\n          [matSortDisabled]=\"!enableSort()\"\n          [class.vertical-divider]=\"verticalDividers()\"\n        >\n          @let templates = { text, numeric, markdown, link, icon, menu };\n\n          <!-- Selection Column (if enabled) -->\n          @if (enableRowSelection()) {\n            <ng-container hraFeature=\"select\" matColumnDef=\"select\">\n              @if (!hideHeaders()) {\n                <th *matHeaderCellDef mat-header-cell data-column-type=\"checkbox\">\n                  <mat-checkbox\n                    hraFeature=\"toggle-all\"\n                    disableRipple\n                    hraPlainTooltip=\"Hide all\"\n                    aria-label=\"Hide all\"\n                    [hraClickEvent]=\"{ checked: !(selection.hasValue() && isAllSelected()) }\"\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                    (change)=\"toggleAllRows()\"\n                  />\n                </th>\n              }\n              <td *matCellDef=\"let element\" mat-cell data-column-type=\"checkbox\">\n                <mat-checkbox\n                  hraFeature=\"toggle\"\n                  disableRipple\n                  hraPlainTooltip=\"Hide\"\n                  aria-label=\"Hide\"\n                  [hraClickEvent]=\"{ checked: selection.isSelected(element) }\"\n                  [checked]=\"selection.isSelected(element)\"\n                  (click)=\"$event.stopPropagation()\"\n                  (change)=\"$event ? toggleRow(element) : null\"\n                />\n              </td>\n            </ng-container>\n          }\n\n          @for (column of _columns(); track column.column) {\n            @let type = getColumnType(column).type;\n            @let template = templates[type];\n            @let isTotalsLabelColumn = enableRowSelection() ? $index === 1 : $first;\n\n            <ng-container [matColumnDef]=\"column.column\">\n              @if (!hideHeaders()) {\n                <th\n                  *matHeaderCellDef\n                  hraClickEvent\n                  mat-header-cell\n                  mat-sort-header\n                  [hraFeature]=\"`header-cell.${(column.label | slugify)}`\"\n                  [attr.data-column-type]=\"type\"\n                  [sortActionDescription]=\"`Sort by ${column.label}`\"\n                >\n                  {{ column.label }}\n                </th>\n              }\n              <td *matCellDef=\"let element\" mat-cell [attr.data-column-type]=\"type\">\n                <ng-container\n                  *ngTemplateOutlet=\"template; context: { $implicit: element[column.column], element, column }\"\n                />\n              </td>\n\n              <!-- Total Footer -->\n              <td *matFooterCellDef mat-footer-cell [attr.data-column-type]=\"type\">\n                @if (isTotalsLabelColumn) {\n                  <span class=\"total-label\"> Total </span>\n                } @else if (totals().get(column)) {\n                  <span class=\"numeric\">\n                    {{ totals().get(column) | number }}\n                  </span>\n                }\n              </td>\n            </ng-container>\n          }\n\n          @if (!hideHeaders()) {\n            <tr *matHeaderRowDef=\"columnIds(); sticky: true\" mat-header-row></tr>\n          }\n          <tr *matRowDef=\"let row; let i = index; columns: columnIds()\" mat-row></tr>\n\n          @if (totals().size > 0) {\n            <tr *matFooterRowDef=\"columnIds(); sticky: true\" mat-footer-row></tr>\n          }\n        </table>\n\n        <ng-content />\n      </div>\n    </div>\n  </ng-scrollbar>\n\n  <ng-template let-text hraTextRowElement #text>\n    <span class=\"text\">{{ text }}</span>\n  </ng-template>\n\n  <ng-template let-value hraNumericRowElement #numeric>\n    <span class=\"numeric\">{{ value | number }}</span>\n  </ng-template>\n\n  <ng-template let-markdown hraMarkdownRowElement #markdown>\n    <markdown class=\"markdown\" [data]=\"markdown\" />\n  </ng-template>\n\n  <ng-template let-icon let-column=\"column\" let-element=\"element\" hraIconRowElement #icon>\n    <hra-icon\n      hraFeature=\"table-icon\"\n      [hraHoverEvent]=\"{ value: element[column.type.tooltip] | slugify }\"\n      [svgIcon]=\"icon\"\n      [hraPlainTooltip]=\"element[column.type.tooltip]\"\n    />\n  </ng-template>\n\n  <ng-template let-column=\"column\" let-element=\"element\" hraFeature=\"menu-cell\" hraMenuButtonRowElement #menu>\n    @let options = element[column.type.options];\n    <button\n      hraFeature=\"download\"\n      hraClickEvent\n      mat-icon-button\n      [matMenuTriggerFor]=\"menuOptions\"\n      [hraPlainTooltip]=\"column.type.tooltip\"\n      (mouseover)=\"downloadButtonHover(element['id'])\"\n      (focus)=\"downloadButtonHover(element['id'])\"\n      #trigger=\"matMenuTrigger\"\n    >\n      <hra-icon [fontIcon]=\"column.type.icon\" />\n    </button>\n\n    <mat-menu hraFeature=\"download-options\" class=\"table-menu\" #menuOptions=\"matMenu\">\n      @for (option of getMenuOptions(options); track $index) {\n        <a\n          hraClickEvent\n          mat-menu-item\n          download\n          [hraFeature]=\"option.name | slugify\"\n          [attr.href]=\"option.url\"\n          (click)=\"\n            $event.preventDefault();\n            download(option.url!);\n            snackbar.open('File downloaded', '', false, 'start', { duration: 5000 })\n          \"\n        >\n          <mat-icon>{{ option.icon }}</mat-icon>\n          <div class=\"option-text\">\n            <span class=\"option-name\">\n              {{ option.name }}\n            </span>\n            <span class=\"option-description\">\n              {{ option.description }}\n            </span>\n          </div>\n        </a>\n      }\n    </mat-menu>\n  </ng-template>\n\n  <ng-template let-label let-column=\"column\" let-element=\"element\" hraFeature=\"link-cell\" hraLinkRowElement #link>\n    @let url = element[column.type.urlColumn];\n    @let isInternal = column.type.internal;\n    @if (isInternal) {\n      <a hraHyperlink class=\"link internal\" tabindex=\"0\" (keyup)=\"routeClick(url)\" (click)=\"routeClick(url)\">\n        {{ label }}\n      </a>\n    } @else {\n      <a hraHyperlink class=\"link\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"url\">\n        {{ label }}\n      </a>\n    }\n  </ng-template>\n</ng-container>\n", styles: [":host{display:block;overflow:hidden;height:100%;border:.0625rem solid var(--mat-sys-outline);border-radius:.5rem;--mat-table-background-color: transparent;--mat-table-header-container-height: 2.5rem;--mat-table-header-headline-color: var(--mat-sys-secondary);--mat-table-header-headline-font: var(--mat-sys-label-medium-font);--mat-table-header-headline-line-height: var(--mat-sys-label-medium-line-height);--mat-table-header-headline-size: var(--mat-sys-label-medium-size);--mat-table-header-headline-tracking: var(--mat-sys-label-medium-tracking);--mat-table-header-headline-weight: var(--mat-sys-label-medium-weight);--mat-table-footer-container-height: 2.5rem;--mat-table-footer-supporting-text-font: var(--mat-sys-label-medium-font);--mat-table-footer-supporting-text-line-height: var(--mat-sys-label-medium-line-height);--mat-table-footer-supporting-text-size: var(--mat-sys-label-medium-size);--mat-table-footer-supporting-text-tracking: var(--mat-sys-label-medium-tracking);--mat-table-footer-supporting-text-weight: var(--mat-sys-label-medium-weight);--mat-table-row-item-container-height: 2.5rem;--mat-table-row-item-label-text-color: var(--mat-sys-primary);--mat-table-row-item-label-text-font: var(--mat-sys-label-medium-font);--mat-table-row-item-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-table-row-item-label-text-size: var(--mat-sys-label-medium-size);--mat-table-row-item-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-table-row-item-label-text-weight: var(--mat-sys-label-medium-weight);--mat-table-row-item-outline-width: 0px;--mat-sort-arrow-color: var(--mat-sys-secondary)}:host:has(tr[mat-header-row]) ng-scrollbar ::ng-deep scrollbar-y{top:2.5rem;height:calc(100% - 2.5rem)}:host:has(tr[mat-header-row]) ng-scrollbar ::ng-deep scrollbar-y .ng-scrollbar-sticky{top:2.5rem}:host .vertical-divider th:not(:first-child),:host .vertical-divider td:not(:first-child){border-left:1px solid var(--mat-sys-outline)}:host th[mat-sort-header].cdk-focused,:host .cdk-keyboard-focused{position:relative;background-color:none}:host th[mat-sort-header].cdk-focused:before,:host .cdk-keyboard-focused:before{content:\"\";position:absolute;inset:0;border-radius:.25rem;z-index:-1;background-color:rgb(from var(--mat-sys-secondary) r g b/12%)}:host th[mat-sort-header].cdk-focused ::ng-deep .mat-focus-indicator,:host .cdk-keyboard-focused ::ng-deep .mat-focus-indicator{border-bottom:none!important}:host th[mat-sort-header]:hover .mat-sort-header-arrow{color:var(--mat-sys-outline)}:host th[mat-sort-header] ::ng-deep .mat-sort-header-arrow{color:var(--mat-sys-secondary)}:host ng-scrollbar{height:100%;overflow:hidden}:host ng-scrollbar ::ng-deep .ng-scroll-viewport{max-height:var(--hra-table-max-height)}:host th[data-column-type=numeric],:host td[data-column-type=numeric]{text-align:right}:host th[data-column-type=numeric] ::ng-deep .mat-sort-header-container{justify-content:end}:host th[data-column-type=checkbox],:host td[data-column-type=checkbox]{padding:0;text-align:center;max-height:2.0625rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host.sortable .numeric{margin-right:1.125rem}:host markdown ::ng-deep p:first-child{margin-top:.5rem}:host markdown ::ng-deep p:last-child{margin-bottom:.5rem}:host.hra-table-style-basic ::ng-deep thead{background-color:var(--mat-sys-on-primary)}:host.hra-table-style-divider,:host.hra-table-style-alternating{--mat-table-background-color: var(--mat-sys-on-primary)}:host.hra-table-style-divider ng-scrollbar,:host.hra-table-style-alternating ng-scrollbar{--scrollbar-offset: 4}:host.hra-table-style-divider ::ng-deep thead,:host.hra-table-style-alternating ::ng-deep thead{background-color:var(--mat-sys-surface-dim)}:host.hra-table-style-divider ::ng-deep thead th,:host.hra-table-style-alternating ::ng-deep thead th{border-bottom:.0625rem solid var(--mat-sys-outline);padding-bottom:.5rem;padding-top:.5rem;vertical-align:bottom}:host.hra-table-style-divider ::ng-deep tbody td,:host.hra-table-style-alternating ::ng-deep tbody td{padding-bottom:.5rem;padding-top:.5rem}:host.hra-table-style-divider ::ng-deep tfoot,:host.hra-table-style-alternating ::ng-deep tfoot{background-color:var(--mat-sys-surface-dim)}:host.hra-table-style-divider ::ng-deep tfoot td,:host.hra-table-style-alternating ::ng-deep tfoot td{color:var(--mat-sys-secondary);font-weight:500;padding-top:.5rem;padding-bottom:.5rem;border-top:.0625rem solid var(--mat-sys-outline)}:host.hra-table-style-divider{--mat-table-row-item-outline-color: var(--mat-sys-outline-variant);--mat-table-row-item-outline-width: .0625rem}:host.hra-table-style-alternating ::ng-deep tbody tr:nth-child(2n){background-color:var(--mat-sys-surface-container)}:host .link.internal{color:var(--mat-sys-on-tertiary-fixed);cursor:pointer}\n"] }]
        }], ctorParameters: () => [], propDecorators: { csvUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "csvUrl", required: false }] }], columns: [{ type: i0.Input, args: [{ isSignal: true, alias: "columns", required: false }] }], rows: [{ type: i0.Input, args: [{ isSignal: true, alias: "rows", required: false }] }], style: [{ type: i0.Input, args: [{ isSignal: true, alias: "style", required: false }] }], enableSort: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableSort", required: false }] }], verticalDividers: [{ type: i0.Input, args: [{ isSignal: true, alias: "verticalDividers", required: false }] }], enableRowSelection: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableRowSelection", required: false }] }], hideHeaders: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideHeaders", required: false }] }], selectionChange: [{ type: i0.Output, args: ["selectionChange"] }], routeClicked: [{ type: i0.Output, args: ["routeClicked"] }], downloadHovered: [{ type: i0.Output, args: ["downloadHovered"] }], scrollbar: [{ type: i0.ViewChild, args: ['scrollbar', { isSignal: true }] }], sort: [{ type: i0.ViewChild, args: [i0.forwardRef(() => MatSort), { isSignal: true }] }] } });

/** Schema for table style */
const TableVariantSchema = z.enum(['alternating', 'divider', 'basic']);
/** Schema for a single table row */
const TableRowSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]));
/** Schema for Text Column */
const TextColumnTypeSchema = z.object({
    type: z.literal('text'),
});
/** Schema for Numeric Column */
const NumericColumnTypeSchema = z.object({
    type: z.literal('numeric'),
    computeTotal: z.boolean().optional(),
    // TODO add format
});
/** Schema for Markdown Column */
const MarkdownColumnTypeSchema = z.object({
    type: z.literal('markdown'),
});
/** Schema for Icon Column */
const IconColumnTypeSchema = z.object({
    type: z.literal('icon'),
    icon: z.string(),
    tooltip: z.string().optional(),
});
/** Schema for Link Column */
const LinkColumnTypeSchema = z.object({
    type: z.literal('link'),
    urlColumn: z.string(),
    internal: z.boolean().optional(),
});
/** Schema for MenuButton Column */
const MenuButtonColumnTypeSchema = z.object({
    type: z.literal('menu'),
    icon: z.string(),
    options: z.string(),
    tooltip: z.string().optional(),
});
/** Schema for MenuOptions Column */
const MenuOptionsTypeSchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    description: z.string().optional(),
    url: z.string().url().optional(),
});
/** Union of Schema Types for Simple Columns */
const SimpleTableColumnTypeSchema = z.union([
    TextColumnTypeSchema.shape.type,
    NumericColumnTypeSchema.shape.type,
    MarkdownColumnTypeSchema.shape.type,
    IconColumnTypeSchema.shape.type,
    MenuButtonColumnTypeSchema.shape.type,
]);
/** Union of Schema Types for Table Columns */
const TableColumnTypeSchema = z.union([
    TextColumnTypeSchema,
    NumericColumnTypeSchema,
    MarkdownColumnTypeSchema,
    LinkColumnTypeSchema,
    IconColumnTypeSchema,
    MenuButtonColumnTypeSchema,
]);
/** Schema for table columns */
const TableColumnSchema = z.object({
    column: z.string(),
    label: z.string(),
    type: z.union([SimpleTableColumnTypeSchema, TableColumnTypeSchema]).default('text'),
});
/** Schema for page table component */
const PageTableSchema = ContentTemplateSchema.extend({
    component: z.literal('PageTable'),
    csvUrl: z.string().optional(),
    columns: TableColumnSchema.array().optional(),
    rows: z.array(TableRowSchema).optional(),
    style: TableVariantSchema.optional(),
    enableSort: z.boolean().optional(),
    verticalDividers: z.boolean().optional(),
    enableSelection: z.boolean().optional(),
});

/** Content template definition for TableComponent */
const PageTableDef = {
    component: TableComponent,
    spec: PageTableSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { IconColumnTypeSchema, LinkColumnTypeSchema, MarkdownColumnTypeSchema, MenuButtonColumnTypeSchema, MenuOptionsTypeSchema, NumericColumnTypeSchema, PageTableDef, PageTableSchema, SimpleTableColumnTypeSchema, TableColumnSchema, TableColumnTypeSchema, TableComponent, TableRowSchema, TableVariantSchema, TextColumnTypeSchema };
//# sourceMappingURL=hra-ui-design-system-table.mjs.map
