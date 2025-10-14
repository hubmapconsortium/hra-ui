import * as i0 from '@angular/core';
import { inject, Component, Injectable } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { TableComponent } from '@hra-ui/design-system/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { HraCommonModule } from '@hra-ui/common';
import * as i5 from '@hra-ui/design-system/scrolling';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@angular/material/button';
import * as i4 from 'ngx-scrollbar';

/**
 * Bottom Sheet Component
 * Displays a bottom sheet with either a table, single page section, or multiple page sections based on the provided data.
 */
class BottomSheetComponent {
    /** Reference to the bottom sheet */
    _bottomSheetRef = inject((MatBottomSheetRef));
    /** Data injected into the bottom sheet */
    data = inject(MAT_BOTTOM_SHEET_DATA);
    /** Function to close the bottom sheet */
    close() {
        this._bottomSheetRef.dismiss();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BottomSheetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.3", type: BottomSheetComponent, isStandalone: true, selector: "hra-bottom-sheet", ngImport: i0, template: "<div class=\"sheet-header\" hraFeature=\"bottom-sheet\">\n  <button\n    hraFeature=\"close\"\n    hraClickEvent\n    mat-icon-button\n    class=\"close\"\n    aria-label=\"Close bottom sheet\"\n    (click)=\"close()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n</div>\n\n<ng-scrollbar hraScrollOverflowFade>\n  <div class=\"sheet-content\" tabindex=\"-1\" cdkFocusInitial>\n    @switch (data.variant) {\n      @case ('table') {\n        <hra-table [rows]=\"data.rows\" [columns]=\"data.columns\" [hideHeaders]=\"data.hideHeaders ?? false\" />\n      }\n\n      @case ('page-section') {\n        <hra-page-section [tagline]=\"data.tagline\">\n          @if (data.content) {\n            {{ data.content }}\n          }\n        </hra-page-section>\n      }\n\n      @case ('page-sections') {\n        <div class=\"multiple-sections\">\n          @for (section of data.sections; track section.tagline) {\n            <div class=\"section-item\">\n              <hra-page-section [tagline]=\"section.tagline\">\n                @if (section.content) {\n                  {{ section.content }}\n                }\n              </hra-page-section>\n            </div>\n          }\n        </div>\n      }\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:block;height:100%;overflow:hidden}:host .sheet-header{display:flex;flex-direction:row;justify-content:flex-end}:host .sheet-header .close{margin-bottom:.5rem}:host hra-table{height:auto;max-height:min(22.6rem,80vh - 3rem - 1rem)}:host ng-scrollbar{height:calc(100% - 3.5rem)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: TableComponent, selector: "hra-table", inputs: ["csvUrl", "columns", "rows", "style", "enableSort", "verticalDividers", "enableRowSelection", "hideHeaders"], outputs: ["selectionChange", "routeClicked", "downloadHovered"] }, { kind: "component", type: PageSectionComponent, selector: "hra-page-section", inputs: ["tagline", "level", "icons", "anchor"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i4.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i5.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BottomSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-bottom-sheet', imports: [HraCommonModule, ButtonsModule, MatIconModule, TableComponent, PageSectionComponent, ScrollingModule], template: "<div class=\"sheet-header\" hraFeature=\"bottom-sheet\">\n  <button\n    hraFeature=\"close\"\n    hraClickEvent\n    mat-icon-button\n    class=\"close\"\n    aria-label=\"Close bottom sheet\"\n    (click)=\"close()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n</div>\n\n<ng-scrollbar hraScrollOverflowFade>\n  <div class=\"sheet-content\" tabindex=\"-1\" cdkFocusInitial>\n    @switch (data.variant) {\n      @case ('table') {\n        <hra-table [rows]=\"data.rows\" [columns]=\"data.columns\" [hideHeaders]=\"data.hideHeaders ?? false\" />\n      }\n\n      @case ('page-section') {\n        <hra-page-section [tagline]=\"data.tagline\">\n          @if (data.content) {\n            {{ data.content }}\n          }\n        </hra-page-section>\n      }\n\n      @case ('page-sections') {\n        <div class=\"multiple-sections\">\n          @for (section of data.sections; track section.tagline) {\n            <div class=\"section-item\">\n              <hra-page-section [tagline]=\"section.tagline\">\n                @if (section.content) {\n                  {{ section.content }}\n                }\n              </hra-page-section>\n            </div>\n          }\n        </div>\n      }\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:block;height:100%;overflow:hidden}:host .sheet-header{display:flex;flex-direction:row;justify-content:flex-end}:host .sheet-header .close{margin-bottom:.5rem}:host hra-table{height:auto;max-height:min(22.6rem,80vh - 3rem - 1rem)}:host ng-scrollbar{height:calc(100% - 3.5rem)}\n"] }]
        }] });

/**
 * Service to handle bottom sheet operations.
 * Provides methods to open different types of bottom sheets.
 */
class BottomSheetService {
    /** Injects the MatBottomSheet service to open bottom sheets */
    _bottomSheet = inject(MatBottomSheet);
    /**
     * Opens a table bottom sheet with the provided rows and columns.
     * @param rows - The table rows to display
     * @param columns - The table columns to display
     * @param hideHeaders - Whether to hide table headers
     */
    openTableBottomSheet(rows, columns, hideHeaders = false) {
        return this._bottomSheet.open(BottomSheetComponent, {
            data: {
                variant: 'table',
                rows,
                columns,
                hideHeaders,
            },
        });
    }
    /**
     * Opens a page section bottom sheet with the provided tagline.
     * @param tagline - The tagline to display in the page section
     * @param content - Optional content text for the section
     */
    openPageSectionBottomSheet(tagline, content) {
        return this._bottomSheet.open(BottomSheetComponent, {
            data: {
                variant: 'page-section',
                tagline,
                content,
            },
        });
    }
    /**
     * Opens a multiple page sections bottom sheet with the provided sections.
     * @param sections - Array of page section data
     */
    openMultiplePageSectionsBottomSheet(sections) {
        return this._bottomSheet.open(BottomSheetComponent, {
            data: {
                variant: 'page-sections',
                sections,
            },
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BottomSheetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BottomSheetService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: BottomSheetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BottomSheetComponent, BottomSheetService };
//# sourceMappingURL=hra-ui-design-system-bottom-sheet.mjs.map
