import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { createCustomElement } from '@hra-ui/webcomponents';
import * as i0 from '@angular/core';
import { model, input, output, signal, effect, ChangeDetectionStrategy, Component, computed, viewChild, inject, ChangeDetectorRef, Injectable, booleanAttribute, Renderer2, Pipe, isSignal, CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef, ApplicationRef, untracked } from '@angular/core';
import * as i2$3 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as i11 from '@hra-ui/common';
import { HraCommonModule } from '@hra-ui/common';
import { rgbToHex, hexToRgb, colorEquals } from '@hra-ui/design-system/color-picker';
import { DEFAULT_NODE_TARGET_SELECTOR, DEFAULT_MAX_EDGE_DISTANCE } from '@hra-ui/node-dist-vis';
import { loadData, loadNodes, withDataViewDefaultGenerator, loadEdges, createEdgeGenerator, EMPTY_EDGES_VIEW, loadColorMap, createColorMapGenerator, EMPTY_COLOR_MAP_VIEW, NodeFilterView, ColorMapView, toCsv } from '@hra-ui/node-dist-vis/models';
import { SelectionModel } from '@angular/cdk/collections';
import { toSignal } from '@angular/core/rxjs-interop';
import * as i5 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i6 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as i4 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelComponent, ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import * as i3$2 from '@hra-ui/design-system/scrolling';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { map, BehaviorSubject, switchMap, combineLatest, distinctUntilChanged } from 'rxjs';
import * as i2$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { ColorPickerDirective } from 'ngx-color-picker';
import * as i1 from '@hra-ui/common/analytics';
import * as i2$2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i5$1 from '@hra-ui/design-system/buttons/icon-button';
import * as i9 from 'ngx-scrollbar';
import * as i10 from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { MatExpansionModule, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion';
import { FullscreenPortalComponent, FullscreenPortalContentComponent, FullscreenActionsComponent } from '@hra-ui/design-system/fullscreen';
import { produce } from 'immer';
import embed from 'vega-embed';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { unparse } from 'papaparse';
import * as i6$1 from '@hra-ui/design-system/buttons/text-hyperlink';
import { InfoModalComponent } from '@hra-ui/design-system/info-modal';
import * as i3$1 from '@angular/material/button-toggle';
import * as i5$2 from '@hra-ui/design-system/buttons/button-toggle';
import { JsonFileLoaderService, CsvFileLoaderService } from '@hra-ui/common/fs';

/**
 * Creates a position configuration for tooltips.
 *
 * @param originX - The horizontal origin position.
 * @param originY - The vertical origin position.
 * @param overlayX - The horizontal overlay position.
 * @param overlayY - The vertical overlay position.
 * @param offsetX - Optional horizontal offset.
 * @param offsetY - Optional vertical offset.
 * @returns A ConnectedPosition object.
 */
function createPosition(originX, originY, overlayX, overlayY, offsetX, offsetY) {
    return {
        originX,
        originY,
        overlayX,
        overlayY,
        offsetX,
        offsetY,
    };
}
/** Tooltip positions on the right side. */
const TOOLTIP_POSITION_RIGHT_SIDE = [
    createPosition('end', 'top', 'start', 'top', 0, -20),
    createPosition('end', 'center', 'start', 'center'),
    createPosition('end', 'bottom', 'start', 'bottom'),
];
/** Tooltip positions on the left side. */
const TOOLTIP_POSITION_LEFT_SIDE = [
    createPosition('start', 'bottom', 'end', 'top'),
    createPosition('start', 'center', 'end', 'center'),
    createPosition('start', 'top', 'end', 'bottom'),
];
/** Tooltip positions below. */
const TOOLTIP_POSITION_BELOW = [
    createPosition('center', 'bottom', 'center', 'top'),
    createPosition('start', 'bottom', 'start', 'top'),
    createPosition('end', 'bottom', 'end', 'top'),
];
/** Tooltip positions for color picker labels. */
const TOOLTIP_POSITION_COLOR_PICKER_LABEL = [
    createPosition('start', 'center', 'end', 'center', -26),
    createPosition('end', 'center', 'start', 'center', 4),
];

/** Maximum cell width for the cell type label */
const MAX_LABEL_WIDTH = 104;
/**
 * Color Picker Label Component
 */
class ColorPickerLabelComponent {
    /** The RGB color value */
    color = model.required(...(ngDevMode ? [{ debugName: "color" }] : []));
    /** The label text for the color picker */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : []));
    /** Indicates if the row is an anchor */
    isAnchor = input(false, ...(ngDevMode ? [{ debugName: "isAnchor" }] : []));
    /** Emits when the color picker is opened or closed */
    colorPickerOpen = output();
    /** Hex representation of the color */
    hexColor = signal('#000000', ...(ngDevMode ? [{ debugName: "hexColor" }] : []));
    /** Effect to sync the hex color with the RGB color */
    hexColorSyncRef = effect(() => this.hexColor.set(rgbToHex(this.color())), ...(ngDevMode ? [{ debugName: "hexColorSyncRef" }] : []));
    /** Tooltip position for the color picker label */
    tooltipPosition = TOOLTIP_POSITION_COLOR_PICKER_LABEL;
    /** Tooltip open state */
    tooltipOpen = false;
    /** Anchor open state */
    anchorOpen = false;
    /** Select a new color from the color picker */
    selectColor(hex) {
        const rgb = hexToRgb(hex);
        if (!colorEquals(this.color(), rgb)) {
            this.color.set(rgb);
        }
    }
    /** Handle hover event to open the tooltip if label width exceeds the max width */
    handleHover(event) {
        const width = Math.floor(event.target.getBoundingClientRect().width);
        if (width >= MAX_LABEL_WIDTH) {
            this.tooltipOpen = true;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ColorPickerLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: ColorPickerLabelComponent, isStandalone: true, selector: "cde-color-picker-label", inputs: { color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, isAnchor: { classPropertyName: "isAnchor", publicName: "isAnchor", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { color: "colorChange", colorPickerOpen: "colorPickerOpen" }, ngImport: i0, template: "<span\n  class=\"color-pick\"\n  [style.background]=\"hexColor()\"\n  [colorPicker]=\"hexColor()\"\n  cpWidth=\"264px\"\n  cpOutputFormat=\"hex\"\n  cpPositionOffset=\"-17%\"\n  [cpOKButton]=\"true\"\n  cpOKButtonClass=\"accept-button\"\n  cpOKButtonText=\"Accept\"\n  [cpCancelButton]=\"true\"\n  cpCancelButtonClass=\"cancel-button\"\n  cpAlphaChannel=\"disabled\"\n  [cpUseRootViewContainer]=\"true\"\n  (colorPickerOpen)=\"colorPickerOpen.emit(colorPicker)\"\n  (colorPickerClose)=\"colorPickerOpen.emit(null)\"\n  (colorPickerChange)=\"hexColor.set($event)\"\n  (colorPickerSelect)=\"selectColor($event)\"\n  data-testid=\"color-picker-button\"\n  #colorPicker=\"ngxColorPicker\"\n></span>\n@if (isAnchor()) {\n  <mat-icon\n    class=\"material-symbols-rounded anchor\"\n    cdkOverlayOrigin\n    #resetTrigger=\"cdkOverlayOrigin\"\n    (mouseover)=\"anchorOpen = true\"\n    (mouseout)=\"anchorOpen = false\"\n  >\n    anchor\n    <ng-container>\n      <ng-template\n        cdkConnectedOverlay\n        [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'anchor-tooltip']\"\n        [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n        [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n        [cdkConnectedOverlayOpen]=\"anchorOpen\"\n        [cdkConnectedOverlayOffsetX]=\"5\"\n      >\n        <div>\n          The anchor cell type represents the cell type to which the nearest cell distance distributions should be\n          computed and visualized. The nearest cell distance is computed based on the Euclidian distance between two\n          cells.\n        </div>\n      </ng-template>\n    </ng-container>\n  </mat-icon>\n}\n<div\n  cdkOverlayOrigin\n  #resetTrigger=\"cdkOverlayOrigin\"\n  class=\"label\"\n  (mouseover)=\"handleHover($event)\"\n  (mouseout)=\"tooltipOpen = false\"\n  data-testid=\"label\"\n>\n  {{ label() }}\n  <ng-container>\n    <ng-template\n      cdkConnectedOverlay\n      [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'label-tooltip']\"\n      [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n      [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n      [cdkConnectedOverlayOpen]=\"tooltipOpen\"\n      [cdkConnectedOverlayOffsetX]=\"5\"\n    >\n      <div>\n        {{ label() }}\n      </div>\n    </ng-template>\n  </ng-container>\n</div>\n", styles: [":host{display:flex;height:2rem;align-items:center}:host .color-pick{height:1.25rem;width:1.25rem;background-color:#201e3d;display:inline-block;border-radius:50%;vertical-align:middle;margin:.25rem .5rem .25rem .25rem;position:relative;cursor:pointer;border:1px solid #201e3d}:host .anchor{background-color:#201e3d;border-radius:50%;color:#fff;vertical-align:middle;height:1.25rem;width:1.25rem;font-size:1rem;text-align:center;align-content:center;margin:0 4px}:host .label{font:var(--mat-sys-label-small);color:var(--mat-sys-secondary);cursor:pointer;display:block;white-space:nowrap;max-width:calc(100% - 3.5rem);text-overflow:ellipsis;overflow:hidden;flex-grow:0}::ng-deep .label-tooltip div{margin:.75rem 1rem}::ng-deep .anchor-tooltip{max-width:21rem}::ng-deep color-picker div.color-picker{border-radius:.5rem;border:none;box-shadow:0 .3125rem 1rem #201e3d3d}::ng-deep color-picker div.color-picker .hex-text{display:flex!important;flex-direction:row-reverse;justify-content:flex-end;padding:0}::ng-deep color-picker div.color-picker .hex-text .box{width:100%;align-items:center}::ng-deep color-picker div.color-picker .hex-text .box:not(:has(input)){margin:0 1rem;padding:0;padding:.25rem 1.25rem;width:auto}::ng-deep color-picker div.color-picker .hex-text .box:not(:has(input)) div{font-size:.75rem;font-family:Metropolis;line-height:1.375rem;letter-spacing:.005em;color:#201e3d;font-weight:500;text-transform:uppercase}::ng-deep color-picker div.color-picker .hex-text .box:has(input){padding:1.25rem 0;margin-right:1rem}::ng-deep color-picker div.color-picker .hex-text .box input{border:none;box-shadow:0 5px 16px #201e3d3d;border-radius:1rem;padding:.5625rem 0;height:2.5rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}::ng-deep color-picker div.color-picker .arrow.arrow-right,::ng-deep color-picker div.color-picker .type-policy{display:none}::ng-deep color-picker div.color-picker .button-area{display:flex;flex-direction:row-reverse;padding:0;margin:.5rem 1rem 1rem}::ng-deep color-picker div.color-picker .button-area .accept-button,::ng-deep color-picker div.color-picker .button-area .cancel-button{cursor:pointer;border:none;background-color:transparent;font-size:.75rem;letter-spacing:.005em;line-height:1.375rem;font-family:Metropolis;padding:.25rem .5rem;font-weight:500;color:#201e3d}::ng-deep color-picker div.color-picker .cursor{border-color:#fff;border-width:.25rem}::ng-deep color-picker div.color-picker .selected-color{border:none}::ng-deep color-picker div.color-picker .hue-alpha{padding:0;margin:1.5rem 1.625rem .5rem}::ng-deep color-picker div.color-picker .hue-alpha .cursor{height:.5rem;width:.5rem;border-width:2px}::ng-deep color-picker div.color-picker .hue-alpha .hue,::ng-deep color-picker div.color-picker .hue-alpha .alpha{border-radius:.25rem;height:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: ColorPickerDirective, selector: "[colorPicker]", inputs: ["colorPicker", "cpWidth", "cpHeight", "cpToggle", "cpDisabled", "cpIgnoredElements", "cpFallbackColor", "cpColorMode", "cpCmykEnabled", "cpOutputFormat", "cpAlphaChannel", "cpDisableInput", "cpDialogDisplay", "cpSaveClickOutside", "cpCloseClickOutside", "cpUseRootViewContainer", "cpPosition", "cpPositionOffset", "cpPositionRelativeToArrow", "cpOKButton", "cpOKButtonText", "cpOKButtonClass", "cpCancelButton", "cpCancelButtonText", "cpCancelButtonClass", "cpEyeDropper", "cpPresetLabel", "cpPresetColors", "cpPresetColorsClass", "cpMaxPresetColorsLength", "cpPresetEmptyMessage", "cpPresetEmptyMessageClass", "cpAddColorButton", "cpAddColorButtonText", "cpAddColorButtonClass", "cpRemoveColorButtonClass", "cpArrowPosition", "cpExtraTemplate"], outputs: ["cpInputChange", "cpToggleChange", "cpSliderChange", "cpSliderDragEnd", "cpSliderDragStart", "colorPickerOpen", "colorPickerClose", "colorPickerCancel", "colorPickerSelect", "colorPickerChange", "cpCmykColorChange", "cpPresetColorsChange"], exportAs: ["ngxColorPicker"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ColorPickerLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-color-picker-label', imports: [HraCommonModule, ColorPickerDirective, MatIconModule, OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  class=\"color-pick\"\n  [style.background]=\"hexColor()\"\n  [colorPicker]=\"hexColor()\"\n  cpWidth=\"264px\"\n  cpOutputFormat=\"hex\"\n  cpPositionOffset=\"-17%\"\n  [cpOKButton]=\"true\"\n  cpOKButtonClass=\"accept-button\"\n  cpOKButtonText=\"Accept\"\n  [cpCancelButton]=\"true\"\n  cpCancelButtonClass=\"cancel-button\"\n  cpAlphaChannel=\"disabled\"\n  [cpUseRootViewContainer]=\"true\"\n  (colorPickerOpen)=\"colorPickerOpen.emit(colorPicker)\"\n  (colorPickerClose)=\"colorPickerOpen.emit(null)\"\n  (colorPickerChange)=\"hexColor.set($event)\"\n  (colorPickerSelect)=\"selectColor($event)\"\n  data-testid=\"color-picker-button\"\n  #colorPicker=\"ngxColorPicker\"\n></span>\n@if (isAnchor()) {\n  <mat-icon\n    class=\"material-symbols-rounded anchor\"\n    cdkOverlayOrigin\n    #resetTrigger=\"cdkOverlayOrigin\"\n    (mouseover)=\"anchorOpen = true\"\n    (mouseout)=\"anchorOpen = false\"\n  >\n    anchor\n    <ng-container>\n      <ng-template\n        cdkConnectedOverlay\n        [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'anchor-tooltip']\"\n        [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n        [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n        [cdkConnectedOverlayOpen]=\"anchorOpen\"\n        [cdkConnectedOverlayOffsetX]=\"5\"\n      >\n        <div>\n          The anchor cell type represents the cell type to which the nearest cell distance distributions should be\n          computed and visualized. The nearest cell distance is computed based on the Euclidian distance between two\n          cells.\n        </div>\n      </ng-template>\n    </ng-container>\n  </mat-icon>\n}\n<div\n  cdkOverlayOrigin\n  #resetTrigger=\"cdkOverlayOrigin\"\n  class=\"label\"\n  (mouseover)=\"handleHover($event)\"\n  (mouseout)=\"tooltipOpen = false\"\n  data-testid=\"label\"\n>\n  {{ label() }}\n  <ng-container>\n    <ng-template\n      cdkConnectedOverlay\n      [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'label-tooltip']\"\n      [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n      [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n      [cdkConnectedOverlayOpen]=\"tooltipOpen\"\n      [cdkConnectedOverlayOffsetX]=\"5\"\n    >\n      <div>\n        {{ label() }}\n      </div>\n    </ng-template>\n  </ng-container>\n</div>\n", styles: [":host{display:flex;height:2rem;align-items:center}:host .color-pick{height:1.25rem;width:1.25rem;background-color:#201e3d;display:inline-block;border-radius:50%;vertical-align:middle;margin:.25rem .5rem .25rem .25rem;position:relative;cursor:pointer;border:1px solid #201e3d}:host .anchor{background-color:#201e3d;border-radius:50%;color:#fff;vertical-align:middle;height:1.25rem;width:1.25rem;font-size:1rem;text-align:center;align-content:center;margin:0 4px}:host .label{font:var(--mat-sys-label-small);color:var(--mat-sys-secondary);cursor:pointer;display:block;white-space:nowrap;max-width:calc(100% - 3.5rem);text-overflow:ellipsis;overflow:hidden;flex-grow:0}::ng-deep .label-tooltip div{margin:.75rem 1rem}::ng-deep .anchor-tooltip{max-width:21rem}::ng-deep color-picker div.color-picker{border-radius:.5rem;border:none;box-shadow:0 .3125rem 1rem #201e3d3d}::ng-deep color-picker div.color-picker .hex-text{display:flex!important;flex-direction:row-reverse;justify-content:flex-end;padding:0}::ng-deep color-picker div.color-picker .hex-text .box{width:100%;align-items:center}::ng-deep color-picker div.color-picker .hex-text .box:not(:has(input)){margin:0 1rem;padding:0;padding:.25rem 1.25rem;width:auto}::ng-deep color-picker div.color-picker .hex-text .box:not(:has(input)) div{font-size:.75rem;font-family:Metropolis;line-height:1.375rem;letter-spacing:.005em;color:#201e3d;font-weight:500;text-transform:uppercase}::ng-deep color-picker div.color-picker .hex-text .box:has(input){padding:1.25rem 0;margin-right:1rem}::ng-deep color-picker div.color-picker .hex-text .box input{border:none;box-shadow:0 5px 16px #201e3d3d;border-radius:1rem;padding:.5625rem 0;height:2.5rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}::ng-deep color-picker div.color-picker .arrow.arrow-right,::ng-deep color-picker div.color-picker .type-policy{display:none}::ng-deep color-picker div.color-picker .button-area{display:flex;flex-direction:row-reverse;padding:0;margin:.5rem 1rem 1rem}::ng-deep color-picker div.color-picker .button-area .accept-button,::ng-deep color-picker div.color-picker .button-area .cancel-button{cursor:pointer;border:none;background-color:transparent;font-size:.75rem;letter-spacing:.005em;line-height:1.375rem;font-family:Metropolis;padding:.25rem .5rem;font-weight:500;color:#201e3d}::ng-deep color-picker div.color-picker .cursor{border-color:#fff;border-width:.25rem}::ng-deep color-picker div.color-picker .selected-color{border:none}::ng-deep color-picker div.color-picker .hue-alpha{padding:0;margin:1.5rem 1.625rem .5rem}::ng-deep color-picker div.color-picker .hue-alpha .cursor{height:.5rem;width:.5rem;border-width:2px}::ng-deep color-picker div.color-picker .hue-alpha .hue,::ng-deep color-picker div.color-picker .hue-alpha .alpha{border-radius:.25rem;height:.5rem}\n"] }]
        }], propDecorators: { color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: true }] }, { type: i0.Output, args: ["colorChange"] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], isAnchor: [{ type: i0.Input, args: [{ isSignal: true, alias: "isAnchor", required: false }] }], colorPickerOpen: [{ type: i0.Output, args: ["colorPickerOpen"] }] } });

/**
 * Cell Type Component
 */
class CellTypesComponent {
    /** List of cell types */
    cellTypes = model.required(...(ngDevMode ? [{ debugName: "cellTypes" }] : []));
    /** List of selected cell types */
    cellTypesSelection = model.required(...(ngDevMode ? [{ debugName: "cellTypesSelection" }] : []));
    /** Currently selected cell type */
    selectedCellType = input('', ...(ngDevMode ? [{ debugName: "selectedCellType" }] : []));
    /** Record of adjustments for cell type counts */
    countAdjustments = input({}, ...(ngDevMode ? [{ debugName: "countAdjustments" }] : []));
    /** Output event for download colormap action */
    downloadColorMap = output();
    /** Output event for download edges action */
    downloadNodes = output();
    /** Output event for download edges action */
    downloadEdges = output();
    /** Output event for reset color */
    resetAllColors = output();
    /** Columns to be displayed in the table */
    columns = computed(() => {
        if (this.hideCellLinkData()) {
            return ['select', 'cellType', 'count'];
        }
        return ['select', 'cellType', 'count', 'links'];
    }, ...(ngDevMode ? [{ debugName: "columns" }] : []));
    /** Tooltip position configuration */
    tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;
    /** Reference to MatSort directive */
    sort = viewChild.required(MatSort);
    /** Content for Info Tooltip card */
    infoToolTipDescription = `Show/hide cell types in the visualization and plots. Hide cell links from this table view.
    Update colors for individual cell types. Download CSVs for the current configurations of
    cell types, cell links, and cell type color map formatting.`;
    /** Flag to toggle cell links row visibility */
    hideCellLinkData = signal(false, ...(ngDevMode ? [{ debugName: "hideCellLinkData" }] : []));
    /** Bind sort state to data source */
    sortBindRef = effect(() => (this.dataSource.sort = this.sort()), ...(ngDevMode ? [{ debugName: "sortBindRef" }] : []));
    /** Change detector reference */
    cdr = inject(ChangeDetectorRef);
    /** Data source for the table */
    dataSource = new MatTableDataSource();
    /** Bind data source to cell types */
    dataSourceBindRef = effect(() => {
        this.dataSource.data = this.cellTypes();
        this.cdr.markForCheck();
    }, ...(ngDevMode ? [{ debugName: "dataSourceBindRef" }] : []));
    /** Selection model for managing selected cell types */
    selectionModel = new SelectionModel(true);
    /** Bind selection model to cell types selection */
    selectionModelBindRef = effect(() => {
        this.selectionModel.setSelection(...this.cellTypesSelection());
        this.cdr.markForCheck();
    }, ...(ngDevMode ? [{ debugName: "selectionModelBindRef" }] : []));
    /** Observable stream of selection changes */
    selection$ = this.selectionModel.changed.pipe(map(() => this.selectionModel.selected));
    /** Signal for selection state */
    selection = toSignal(this.selection$, { initialValue: [] });
    /** Computed selection state */
    selectionState = computed(() => {
        const cellTypesLength = this.cellTypes().length;
        const selectionLength = this.selection().length;
        if (cellTypesLength === 0 || selectionLength === 0) {
            return 'none';
        }
        else if (selectionLength < cellTypesLength) {
            return 'partial';
        }
        return 'full';
    }, ...(ngDevMode ? [{ debugName: "selectionState" }] : []));
    /** Helper function to calculate the number of nodes or edges */
    sumCounts = (count, entry, key) => {
        if (this.isSelected(entry)) {
            const adjustment = this.countAdjustments()[entry.name]?.[key] ?? 0;
            const value = entry[key];
            return count + value - adjustment;
        }
        return count;
    };
    /** Computed total cell count based on selection */
    totalCellCount = computed(() => {
        // Grab dependency on current selection since selectionModel is used indirectly
        this.selection();
        return this.cellTypes().reduce((count, entry) => this.sumCounts(count, entry, 'count'), 0);
    }, ...(ngDevMode ? [{ debugName: "totalCellCount" }] : []));
    /** The total cell links count */
    totalCellLinksCount = computed(() => {
        // Grab dependency on current selection since selectionModel is used indirectly
        this.selection();
        return this.cellTypes().reduce((count, entry) => this.sumCounts(count, entry, 'outgoingEdgeCount'), 0);
    }, ...(ngDevMode ? [{ debugName: "totalCellLinksCount" }] : []));
    /** Toggle state for cell types info */
    cellTypesInfoOpen = false;
    /** Track cell type entries by name */
    trackByName(_index, item) {
        return item.name;
    }
    /** Generate checkbox label based on selection state */
    getCheckboxLabel(isSelected, row) {
        const action = isSelected ? 'deselect' : 'select';
        const where = row === undefined ? 'all' : `row ${row}`;
        return `${action} ${where}`;
    }
    /** Obtains count from a cell type entry after adjustments */
    getCount(obj, key) {
        const adjustment = this.countAdjustments()[obj.name]?.[key] ?? 0;
        const count = obj[key] - adjustment;
        return count.toLocaleString();
    }
    /** Check if a cell type entry is selected */
    isSelected(row) {
        return this.selectionModel.isSelected(row.name);
    }
    /** Toggle selection state of a cell type entry */
    toggleRow(row) {
        this.selectionModel.toggle(row.name);
        this.cellTypesSelection.set(this.selectionModel.selected);
    }
    /** Toggle selection state of all cell type entries */
    toggleAllRows() {
        const selection = this.selectionState() === 'full' ? [] : this.cellTypes().map((entry) => entry.name);
        this.cellTypesSelection.set(selection);
    }
    /** Update color for a cell type entry */
    updateColor(row, color) {
        const entries = this.cellTypes();
        const index = entries.indexOf(row);
        const copy = [...entries];
        copy[index] = { ...copy[index], color };
        this.cellTypes.set(copy);
    }
    /** Reset sort state to default */
    resetSort() {
        const sorter = this.sort();
        const sortable = sorter.sortables.get('count');
        if (sortable) {
            do {
                sorter.sort(sortable);
            } while (sorter.direction !== 'desc');
        }
    }
    /** Hides/shows cell link data */
    toggleLinksColumn() {
        this.hideCellLinkData.set(!this.hideCellLinkData());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: CellTypesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: CellTypesComponent, isStandalone: true, selector: "cde-cell-types", inputs: { cellTypes: { classPropertyName: "cellTypes", publicName: "cellTypes", isSignal: true, isRequired: true, transformFunction: null }, cellTypesSelection: { classPropertyName: "cellTypesSelection", publicName: "cellTypesSelection", isSignal: true, isRequired: true, transformFunction: null }, selectedCellType: { classPropertyName: "selectedCellType", publicName: "selectedCellType", isSignal: true, isRequired: false, transformFunction: null }, countAdjustments: { classPropertyName: "countAdjustments", publicName: "countAdjustments", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { cellTypes: "cellTypesChange", cellTypesSelection: "cellTypesSelectionChange", downloadColorMap: "downloadColorMap", downloadNodes: "downloadNodes", downloadEdges: "downloadEdges", resetAllColors: "resetAllColors" }, viewQueries: [{ propertyName: "sort", first: true, predicate: MatSort, descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Cell Types\" disabled>\n  <hra-expansion-panel-actions>\n    <span class=\"cell-types-label\">\n      <button\n        mat-icon-button\n        [matMenuTriggerFor]=\"menu\"\n        hraPlainTooltip=\"More\"\n        hraIconButtonSize=\"large\"\n        data-testid=\"trigger\"\n        hraFeature=\"menu\"\n        hraClickEvent\n      >\n        <mat-icon>more_vert</mat-icon>\n      </button>\n      <mat-menu #menu=\"matMenu\" hraFeature=\"menu\">\n        <button\n          mat-menu-item\n          [matMenuTriggerFor]=\"infoSubMenu\"\n          class=\"expanded\"\n          matRipple\n          matRippleColor=\"#201E3D14\"\n          hraFeature=\"info\"\n          hraClickEvent\n          hraHoverEvent\n          hraHoverEventTriggerOn=\"mouseenter\"\n        >\n          <mat-icon>info</mat-icon>\n          <span>Info</span>\n          <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n        </button>\n        <button\n          mat-menu-item\n          [matMenuTriggerFor]=\"downloadSubMenu\"\n          class=\"expanded\"\n          matRipple\n          matRippleColor=\"#201E3D14\"\n          hraFeature=\"download\"\n          hraClickEvent\n        >\n          <mat-icon>download</mat-icon>\n          <span>Download</span>\n          <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n        </button>\n        <button\n          mat-menu-item\n          (click)=\"toggleLinksColumn()\"\n          [hraFeature]=\"hideCellLinkData() ? 'show-cell-link' : 'hide-cell-link'\"\n          hraClickEvent\n        >\n          <mat-icon>{{ hideCellLinkData() ? 'visibility' : 'visibility_off' }}visibility</mat-icon>\n          {{ hideCellLinkData() ? 'Show' : 'Hide' }} Cell Link Data\n        </button>\n        <button mat-menu-item (click)=\"resetAllColors.emit()\" hraFeature=\"reset-all-colors\" hraClickEvent>\n          <mat-icon>reset_wrench</mat-icon>\n          Reset All Colors\n        </button>\n        <a\n          mat-menu-item\n          href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n          hraFeature=\"embed-app\"\n          hraClickEvent\n        >\n          <mat-icon>code</mat-icon>\n          Embed App\n        </a>\n      </mat-menu>\n      <mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\">\n        {{ infoToolTipDescription }}\n      </mat-menu>\n      <mat-menu #downloadSubMenu=\"matMenu\" hraFeature=\"menu.download\">\n        <button mat-menu-item (click)=\"downloadNodes.emit()\" hraFeature=\"download-cells-csv\" hraClickEvent>\n          <mat-icon>download</mat-icon>\n          <span>Cells CSV</span>\n        </button>\n        <button mat-menu-item (click)=\"downloadEdges.emit()\" hraFeature=\"download-cell-links-csv\" hraClickEvent>\n          <mat-icon>download</mat-icon>\n          <span>Cell Links CSV</span>\n        </button>\n        <button mat-menu-item (click)=\"downloadColorMap.emit()\" hraFeature=\"download-color-map-csv\" hraClickEvent>\n          <mat-icon>download</mat-icon>\n          <span>Cell Color Map CSV</span>\n        </button>\n      </mat-menu>\n    </span>\n  </hra-expansion-panel-actions>\n  <div class=\"total-ct-label\" hraFeature=\"total-cell-types\">\n    <span>{{ selection().length }}</span>\n    Total Cell Types\n  </div>\n  <div class=\"total-cells\" hraFeature=\"total-cells\">\n    <span data-testid=\"total-cell-count\">{{ totalCellCount() | number }}</span>\n    Total Cells\n  </div>\n  @if (!hideCellLinkData()) {\n    <div class=\"total-cell-links\" hraFeature=\"total-cell-links\">\n      <span data-testid=\"total-cell-link-count\">{{ totalCellLinksCount() | number }}</span>\n      Total Cell Links\n    </div>\n  }\n\n  <ng-scrollbar\n    class=\"table-overflow-container\"\n    externalViewport=\".scroll-viewport\"\n    externalContentWrapper=\"table\"\n    externalSpacer=\"table\"\n    asyncDetection=\"auto\"\n    hraFeature=\"cell-types-table\"\n  >\n    <div class=\"scroll-viewport\">\n      <table\n        mat-table\n        [dataSource]=\"dataSource\"\n        [trackBy]=\"trackByName\"\n        matSort\n        matSortDirection=\"desc\"\n        matSortActive=\"count\"\n        aria-label=\"Cell Types Count Table\"\n      >\n        <ng-container matColumnDef=\"select\">\n          <th mat-header-cell *matHeaderCellDef>\n            <mat-checkbox\n              (change)=\"toggleAllRows()\"\n              [checked]=\"selectionState() === 'full'\"\n              [indeterminate]=\"selectionState() === 'partial'\"\n              [aria-label]=\"getCheckboxLabel(selectionState() === 'full')\"\n              hraFeature=\"select-all\"\n              hraClickEvent\n            >\n            </mat-checkbox>\n          </th>\n          <td mat-cell *matCellDef=\"let row; let index = index\">\n            <mat-checkbox\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"toggleRow(row)\"\n              [checked]=\"isSelected(row)\"\n              [aria-label]=\"getCheckboxLabel(isSelected(row), index + 1)\"\n              [hraFeature]=\"row.name | slugify\"\n              hraClickEvent\n            >\n            </mat-checkbox>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"cellType\">\n          <th\n            mat-header-cell\n            *matHeaderCellDef\n            mat-sort-header=\"name\"\n            start=\"desc\"\n            hraFeature=\"sort-by-cell-type\"\n            hraClickEvent\n          >\n            Cell Type\n          </th>\n          <td mat-cell *matCellDef=\"let element\" class=\"name\">\n            <cde-color-picker-label\n              [label]=\"element.name\"\n              [color]=\"element.color\"\n              [isAnchor]=\"element.name === selectedCellType()\"\n              (colorChange)=\"updateColor(element, $event)\"\n            >\n            </cde-color-picker-label>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"count\">\n          <th\n            mat-header-cell\n            *matHeaderCellDef\n            mat-sort-header=\"count\"\n            start=\"desc\"\n            hraFeature=\"sort-by-cell-count\"\n            hraClickEvent\n          >\n            #Cells\n          </th>\n          <td mat-cell *matCellDef=\"let element\">{{ getCount(element, 'count') }}</td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"links\">\n          <th\n            mat-header-cell\n            *matHeaderCellDef\n            mat-sort-header=\"outgoingEdgeCount\"\n            start=\"desc\"\n            hraFeature=\"sort-by-links-count\"\n            hraClickEvent\n          >\n            #Links\n          </th>\n          <td mat-cell *matCellDef=\"let element\">{{ getCount(element, 'outgoingEdgeCount') }}</td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"columns(); sticky: true\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: columns()\"></tr>\n      </table>\n    </div>\n  </ng-scrollbar>\n</hra-expansion-panel>\n", styles: [":host{overflow:hidden;flex-grow:1;--mat-checkbox-unselected-icon-color: var(--mat-sys-secondary);--mat-checkbox-selected-icon-color: var(--mat-sys-secondary);--mat-checkbox-selected-checkmark-color: var(--mat-sys-secondary);--mat-checkbox-state-layer-size: 1.75rem;--mat-button-filled-container-height: 2rem;--mat-menu-item-label-text-color: var(--mat-sys-primary);--mat-sort-arrow-color: var(--mat-sys-secondary);--mat-table-background-color: var(--mat-sys-surface-container-low);--mat-table-row-item-container-height: 1.75rem;--mat-table-row-item-outline-width: 0;--mat-table-header-headline-color: var(--mat-sort-arrow-color);--mat-table-header-container-height: 2rem}:host ::ng-deep .celltypes-panel{max-width:21rem}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem 1rem .25rem}:host ::ng-deep hra-expansion-panel .content{padding:0 .75rem;height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{display:grid;grid:\"total-cell-types total-cells total-cell-links\" \"table table table\" 1fr/auto 1fr auto;overflow:hidden}:host ::ng-deep hra-expansion-panel .expansion-body:not(:has(.total-cell-links)){grid:\"total-cell-types . total-cells\" \"table table table\" 1fr/auto 1fr auto}:host .total-ct-label,:host .total-cells,:host .total-cell-links{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-medium-tracking);margin:.25rem}:host .total-ct-label span,:host .total-cells span,:host .total-cell-links span{display:block;color:var(--mat-sys-primary);font:var(--mat-sys-label-medium)}:host .total-ct-label{grid-area:total-cell-types}:host .total-cells{grid-area:total-cells;justify-self:center}:host .total-cell-links{grid-area:total-cell-links}:host .table-overflow-container{--hra-scroll-overflow-fade-color: var(--mat-sys-surface-container-low);overflow:auto;grid-area:table;height:100%}:host .table-overflow-container table ::ng-deep .mat-mdc-menu-content{color:var(--mat-sys-primary)}:host .table-overflow-container table ::ng-deep thead tr{font:var(--mat-sys-label-small)}:host .table-overflow-container table ::ng-deep thead tr .mat-mdc-checkbox .mdc-checkbox__background{background-color:#fff}:host .table-overflow-container table ::ng-deep thead .mat-sort-header-container{max-width:6rem}:host .table-overflow-container table ::ng-deep thead .mat-sort-header-container .mat-sort-header-content{font:var(--mat-sys-label-small);color:var(--mat-sys-secondary)}:host .table-overflow-container table ::ng-deep thead .mat-sort-header-arrow{opacity:1!important;transform:none!important}:host .table-overflow-container table ::ng-deep thead tr th:last-child>div{justify-content:flex-end;margin-right:.25rem;color:var(--mat-sys-primary)}:host .table-overflow-container table ::ng-deep tbody tr td.mdc-data-table__cell:nth-last-child(-n+2){text-align:end;padding-right:1.5rem;color:var(--mat-sys-primary);font:var(--mat-sys-label-small)}:host .table-overflow-container table ::ng-deep tbody tr,:host .table-overflow-container table ::ng-deep tbody td{font:var(--mat-sys-label-small)}:host .table-overflow-container table ::ng-deep tr:has(.anchor){background-color:#e6eaf0}:host .table-overflow-container table ::ng-deep tr:has(.anchor) td:first-child{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;border-top:solid var(--mat-sys-outline-variant) .0625rem;border-left:solid var(--mat-sys-outline-variant) .0625rem;border-bottom:solid var(--mat-sys-outline-variant) .0625rem}:host .table-overflow-container table ::ng-deep tr:has(.anchor) td:not(:first-child,:last-child){border-top:solid var(--mat-sys-outline-variant) .0625rem;border-bottom:solid var(--mat-sys-outline-variant) .0625rem}:host .table-overflow-container table ::ng-deep tr:has(.anchor) td:last-child{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem;border-top:solid var(--mat-sys-outline-variant) .0625rem;border-right:solid var(--mat-sys-outline-variant) .0625rem;border-bottom:solid var(--mat-sys-outline-variant) .0625rem}:host .table-overflow-container table ::ng-deep tr .mat-mdc-checkbox.mat-mdc-checkbox-checked .mdc-checkbox__background{background-color:#fff}:host .table-overflow-container table tr th:first-child,:host .table-overflow-container table tr th:last-child{padding-left:0}:host .table-overflow-container table tr .mat-mdc-checkbox{height:2rem;width:2rem;align-items:center;justify-content:center;display:flex}:host .table-overflow-container table .mat-mdc-header-row>*{padding-bottom:.25rem;padding-left:.5rem}:host .table-overflow-container table .mdc-data-table__cell,:host .table-overflow-container table .mdc-data-table__header-cell{padding:0}::ng-deep div.mat-mdc-menu-panel{max-width:19.25rem}::ng-deep div.mat-mdc-menu-panel.info-sub-menu .mat-mdc-menu-content{padding:1rem}::ng-deep .info-tooltip-panel{background-color:#fff;box-shadow:0 .3125rem 1rem #201e3d3d;border-radius:.5rem;max-width:21rem;font:var(--mat-sys-label-medium);color:var(--mat-sys-primary)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i3.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i3.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i3.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatTableModule }, { kind: "component", type: i4.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i4.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i4.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i4.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i4.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i4.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i4.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i4.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i4.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i4.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i5.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatSortModule }, { kind: "directive", type: i6.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i6.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i5$1.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelActionsComponent, selector: "hra-expansion-panel-actions" }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i9.NgScrollbarExt, selector: "ng-scrollbar[externalViewport]", inputs: ["externalViewport", "externalContentWrapper", "externalSpacer"], exportAs: ["ngScrollbar"] }, { kind: "directive", type: i9.AsyncDetection, selector: "ng-scrollbar[externalViewport][asyncDetection]", inputs: ["asyncDetection"] }, { kind: "component", type: ColorPickerLabelComponent, selector: "cde-color-picker-label", inputs: ["color", "label", "isAnchor"], outputs: ["colorChange", "colorPickerOpen"] }, { kind: "pipe", type: i10.DecimalPipe, name: "number" }, { kind: "pipe", type: i11.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: CellTypesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-cell-types', imports: [
                        HraCommonModule,
                        MatIconModule,
                        MatMenuModule,
                        MatTableModule,
                        MatCheckboxModule,
                        MatSortModule,
                        ButtonsModule,
                        ExpansionPanelComponent,
                        ExpansionPanelActionsComponent,
                        PlainTooltipDirective,
                        ScrollingModule,
                        ColorPickerLabelComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-expansion-panel tagline=\"Cell Types\" disabled>\n  <hra-expansion-panel-actions>\n    <span class=\"cell-types-label\">\n      <button\n        mat-icon-button\n        [matMenuTriggerFor]=\"menu\"\n        hraPlainTooltip=\"More\"\n        hraIconButtonSize=\"large\"\n        data-testid=\"trigger\"\n        hraFeature=\"menu\"\n        hraClickEvent\n      >\n        <mat-icon>more_vert</mat-icon>\n      </button>\n      <mat-menu #menu=\"matMenu\" hraFeature=\"menu\">\n        <button\n          mat-menu-item\n          [matMenuTriggerFor]=\"infoSubMenu\"\n          class=\"expanded\"\n          matRipple\n          matRippleColor=\"#201E3D14\"\n          hraFeature=\"info\"\n          hraClickEvent\n          hraHoverEvent\n          hraHoverEventTriggerOn=\"mouseenter\"\n        >\n          <mat-icon>info</mat-icon>\n          <span>Info</span>\n          <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n        </button>\n        <button\n          mat-menu-item\n          [matMenuTriggerFor]=\"downloadSubMenu\"\n          class=\"expanded\"\n          matRipple\n          matRippleColor=\"#201E3D14\"\n          hraFeature=\"download\"\n          hraClickEvent\n        >\n          <mat-icon>download</mat-icon>\n          <span>Download</span>\n          <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n        </button>\n        <button\n          mat-menu-item\n          (click)=\"toggleLinksColumn()\"\n          [hraFeature]=\"hideCellLinkData() ? 'show-cell-link' : 'hide-cell-link'\"\n          hraClickEvent\n        >\n          <mat-icon>{{ hideCellLinkData() ? 'visibility' : 'visibility_off' }}visibility</mat-icon>\n          {{ hideCellLinkData() ? 'Show' : 'Hide' }} Cell Link Data\n        </button>\n        <button mat-menu-item (click)=\"resetAllColors.emit()\" hraFeature=\"reset-all-colors\" hraClickEvent>\n          <mat-icon>reset_wrench</mat-icon>\n          Reset All Colors\n        </button>\n        <a\n          mat-menu-item\n          href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n          hraFeature=\"embed-app\"\n          hraClickEvent\n        >\n          <mat-icon>code</mat-icon>\n          Embed App\n        </a>\n      </mat-menu>\n      <mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\">\n        {{ infoToolTipDescription }}\n      </mat-menu>\n      <mat-menu #downloadSubMenu=\"matMenu\" hraFeature=\"menu.download\">\n        <button mat-menu-item (click)=\"downloadNodes.emit()\" hraFeature=\"download-cells-csv\" hraClickEvent>\n          <mat-icon>download</mat-icon>\n          <span>Cells CSV</span>\n        </button>\n        <button mat-menu-item (click)=\"downloadEdges.emit()\" hraFeature=\"download-cell-links-csv\" hraClickEvent>\n          <mat-icon>download</mat-icon>\n          <span>Cell Links CSV</span>\n        </button>\n        <button mat-menu-item (click)=\"downloadColorMap.emit()\" hraFeature=\"download-color-map-csv\" hraClickEvent>\n          <mat-icon>download</mat-icon>\n          <span>Cell Color Map CSV</span>\n        </button>\n      </mat-menu>\n    </span>\n  </hra-expansion-panel-actions>\n  <div class=\"total-ct-label\" hraFeature=\"total-cell-types\">\n    <span>{{ selection().length }}</span>\n    Total Cell Types\n  </div>\n  <div class=\"total-cells\" hraFeature=\"total-cells\">\n    <span data-testid=\"total-cell-count\">{{ totalCellCount() | number }}</span>\n    Total Cells\n  </div>\n  @if (!hideCellLinkData()) {\n    <div class=\"total-cell-links\" hraFeature=\"total-cell-links\">\n      <span data-testid=\"total-cell-link-count\">{{ totalCellLinksCount() | number }}</span>\n      Total Cell Links\n    </div>\n  }\n\n  <ng-scrollbar\n    class=\"table-overflow-container\"\n    externalViewport=\".scroll-viewport\"\n    externalContentWrapper=\"table\"\n    externalSpacer=\"table\"\n    asyncDetection=\"auto\"\n    hraFeature=\"cell-types-table\"\n  >\n    <div class=\"scroll-viewport\">\n      <table\n        mat-table\n        [dataSource]=\"dataSource\"\n        [trackBy]=\"trackByName\"\n        matSort\n        matSortDirection=\"desc\"\n        matSortActive=\"count\"\n        aria-label=\"Cell Types Count Table\"\n      >\n        <ng-container matColumnDef=\"select\">\n          <th mat-header-cell *matHeaderCellDef>\n            <mat-checkbox\n              (change)=\"toggleAllRows()\"\n              [checked]=\"selectionState() === 'full'\"\n              [indeterminate]=\"selectionState() === 'partial'\"\n              [aria-label]=\"getCheckboxLabel(selectionState() === 'full')\"\n              hraFeature=\"select-all\"\n              hraClickEvent\n            >\n            </mat-checkbox>\n          </th>\n          <td mat-cell *matCellDef=\"let row; let index = index\">\n            <mat-checkbox\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"toggleRow(row)\"\n              [checked]=\"isSelected(row)\"\n              [aria-label]=\"getCheckboxLabel(isSelected(row), index + 1)\"\n              [hraFeature]=\"row.name | slugify\"\n              hraClickEvent\n            >\n            </mat-checkbox>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"cellType\">\n          <th\n            mat-header-cell\n            *matHeaderCellDef\n            mat-sort-header=\"name\"\n            start=\"desc\"\n            hraFeature=\"sort-by-cell-type\"\n            hraClickEvent\n          >\n            Cell Type\n          </th>\n          <td mat-cell *matCellDef=\"let element\" class=\"name\">\n            <cde-color-picker-label\n              [label]=\"element.name\"\n              [color]=\"element.color\"\n              [isAnchor]=\"element.name === selectedCellType()\"\n              (colorChange)=\"updateColor(element, $event)\"\n            >\n            </cde-color-picker-label>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"count\">\n          <th\n            mat-header-cell\n            *matHeaderCellDef\n            mat-sort-header=\"count\"\n            start=\"desc\"\n            hraFeature=\"sort-by-cell-count\"\n            hraClickEvent\n          >\n            #Cells\n          </th>\n          <td mat-cell *matCellDef=\"let element\">{{ getCount(element, 'count') }}</td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"links\">\n          <th\n            mat-header-cell\n            *matHeaderCellDef\n            mat-sort-header=\"outgoingEdgeCount\"\n            start=\"desc\"\n            hraFeature=\"sort-by-links-count\"\n            hraClickEvent\n          >\n            #Links\n          </th>\n          <td mat-cell *matCellDef=\"let element\">{{ getCount(element, 'outgoingEdgeCount') }}</td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"columns(); sticky: true\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: columns()\"></tr>\n      </table>\n    </div>\n  </ng-scrollbar>\n</hra-expansion-panel>\n", styles: [":host{overflow:hidden;flex-grow:1;--mat-checkbox-unselected-icon-color: var(--mat-sys-secondary);--mat-checkbox-selected-icon-color: var(--mat-sys-secondary);--mat-checkbox-selected-checkmark-color: var(--mat-sys-secondary);--mat-checkbox-state-layer-size: 1.75rem;--mat-button-filled-container-height: 2rem;--mat-menu-item-label-text-color: var(--mat-sys-primary);--mat-sort-arrow-color: var(--mat-sys-secondary);--mat-table-background-color: var(--mat-sys-surface-container-low);--mat-table-row-item-container-height: 1.75rem;--mat-table-row-item-outline-width: 0;--mat-table-header-headline-color: var(--mat-sort-arrow-color);--mat-table-header-container-height: 2rem}:host ::ng-deep .celltypes-panel{max-width:21rem}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem 1rem .25rem}:host ::ng-deep hra-expansion-panel .content{padding:0 .75rem;height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{display:grid;grid:\"total-cell-types total-cells total-cell-links\" \"table table table\" 1fr/auto 1fr auto;overflow:hidden}:host ::ng-deep hra-expansion-panel .expansion-body:not(:has(.total-cell-links)){grid:\"total-cell-types . total-cells\" \"table table table\" 1fr/auto 1fr auto}:host .total-ct-label,:host .total-cells,:host .total-cell-links{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-medium-tracking);margin:.25rem}:host .total-ct-label span,:host .total-cells span,:host .total-cell-links span{display:block;color:var(--mat-sys-primary);font:var(--mat-sys-label-medium)}:host .total-ct-label{grid-area:total-cell-types}:host .total-cells{grid-area:total-cells;justify-self:center}:host .total-cell-links{grid-area:total-cell-links}:host .table-overflow-container{--hra-scroll-overflow-fade-color: var(--mat-sys-surface-container-low);overflow:auto;grid-area:table;height:100%}:host .table-overflow-container table ::ng-deep .mat-mdc-menu-content{color:var(--mat-sys-primary)}:host .table-overflow-container table ::ng-deep thead tr{font:var(--mat-sys-label-small)}:host .table-overflow-container table ::ng-deep thead tr .mat-mdc-checkbox .mdc-checkbox__background{background-color:#fff}:host .table-overflow-container table ::ng-deep thead .mat-sort-header-container{max-width:6rem}:host .table-overflow-container table ::ng-deep thead .mat-sort-header-container .mat-sort-header-content{font:var(--mat-sys-label-small);color:var(--mat-sys-secondary)}:host .table-overflow-container table ::ng-deep thead .mat-sort-header-arrow{opacity:1!important;transform:none!important}:host .table-overflow-container table ::ng-deep thead tr th:last-child>div{justify-content:flex-end;margin-right:.25rem;color:var(--mat-sys-primary)}:host .table-overflow-container table ::ng-deep tbody tr td.mdc-data-table__cell:nth-last-child(-n+2){text-align:end;padding-right:1.5rem;color:var(--mat-sys-primary);font:var(--mat-sys-label-small)}:host .table-overflow-container table ::ng-deep tbody tr,:host .table-overflow-container table ::ng-deep tbody td{font:var(--mat-sys-label-small)}:host .table-overflow-container table ::ng-deep tr:has(.anchor){background-color:#e6eaf0}:host .table-overflow-container table ::ng-deep tr:has(.anchor) td:first-child{border-top-left-radius:.5rem;border-bottom-left-radius:.5rem;border-top:solid var(--mat-sys-outline-variant) .0625rem;border-left:solid var(--mat-sys-outline-variant) .0625rem;border-bottom:solid var(--mat-sys-outline-variant) .0625rem}:host .table-overflow-container table ::ng-deep tr:has(.anchor) td:not(:first-child,:last-child){border-top:solid var(--mat-sys-outline-variant) .0625rem;border-bottom:solid var(--mat-sys-outline-variant) .0625rem}:host .table-overflow-container table ::ng-deep tr:has(.anchor) td:last-child{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem;border-top:solid var(--mat-sys-outline-variant) .0625rem;border-right:solid var(--mat-sys-outline-variant) .0625rem;border-bottom:solid var(--mat-sys-outline-variant) .0625rem}:host .table-overflow-container table ::ng-deep tr .mat-mdc-checkbox.mat-mdc-checkbox-checked .mdc-checkbox__background{background-color:#fff}:host .table-overflow-container table tr th:first-child,:host .table-overflow-container table tr th:last-child{padding-left:0}:host .table-overflow-container table tr .mat-mdc-checkbox{height:2rem;width:2rem;align-items:center;justify-content:center;display:flex}:host .table-overflow-container table .mat-mdc-header-row>*{padding-bottom:.25rem;padding-left:.5rem}:host .table-overflow-container table .mdc-data-table__cell,:host .table-overflow-container table .mdc-data-table__header-cell{padding:0}::ng-deep div.mat-mdc-menu-panel{max-width:19.25rem}::ng-deep div.mat-mdc-menu-panel.info-sub-menu .mat-mdc-menu-content{padding:1rem}::ng-deep .info-tooltip-panel{background-color:#fff;box-shadow:0 .3125rem 1rem #201e3d3d;border-radius:.5rem;max-width:21rem;font:var(--mat-sys-label-medium);color:var(--mat-sys-primary)}\n"] }]
        }], propDecorators: { cellTypes: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellTypes", required: true }] }, { type: i0.Output, args: ["cellTypesChange"] }], cellTypesSelection: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellTypesSelection", required: true }] }, { type: i0.Output, args: ["cellTypesSelectionChange"] }], selectedCellType: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedCellType", required: false }] }], countAdjustments: [{ type: i0.Input, args: [{ isSignal: true, alias: "countAdjustments", required: false }] }], downloadColorMap: [{ type: i0.Output, args: ["downloadColorMap"] }], downloadNodes: [{ type: i0.Output, args: ["downloadNodes"] }], downloadEdges: [{ type: i0.Output, args: ["downloadEdges"] }], resetAllColors: [{ type: i0.Output, args: ["resetAllColors"] }], sort: [{ type: i0.ViewChild, args: [i0.forwardRef(() => MatSort), { isSignal: true }] }] } });

/**
 * FileSaver Service
 */
class FileSaverService {
    /** Injects the document object */
    document = inject(DOCUMENT);
    /** Injects the MatSnackBar service for notifications */
    snackbar = inject(SnackbarService);
    /** Saves a file from a URL with a given filename */
    save(url, filename) {
        const { document } = this;
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', url);
        linkEl.setAttribute('target', '_blank');
        linkEl.setAttribute('download', filename);
        document.body.appendChild(linkEl);
        linkEl.dispatchEvent(new MouseEvent('click'));
        document.body.removeChild(linkEl);
        this.snackbar.open('File downloaded', '', false, 'end', { duration: 5000 });
    }
    /** Saves a Blob as a file with a given filename */
    saveData(data, filename) {
        const url = URL.createObjectURL(data);
        this.save(url, filename);
        URL.revokeObjectURL(url);
    }
    /** Saves data as a CSV file with a given filename and configuration */
    saveCsv(data, filename, config) {
        const blob = new Blob([unparse(data, config)]);
        this.saveData(blob, filename);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FileSaverService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FileSaverService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FileSaverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Menu for histogram expansion panel
 */
class HistogramMenuComponent {
    /** Flag to check if dialog is opened */
    dialogOpen = input(false, ...(ngDevMode ? [{ debugName: "dialogOpen", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Event to emit when dialog is opened */
    open = output();
    /** Event to emit to download assets */
    download = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: HistogramMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: HistogramMenuComponent, isStandalone: true, selector: "cde-histogram-menu", inputs: { dialogOpen: { classPropertyName: "dialogOpen", publicName: "dialogOpen", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "open", download: "download" }, ngImport: i0, template: "<button\n  mat-icon-button\n  [matMenuTriggerFor]=\"menu\"\n  hraIconButtonSize=\"large\"\n  aria-label=\"Icon to open nested menu\"\n  hraPlainTooltip=\"More\"\n  hraFeature=\"menu\"\n  hraClickEvent\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<mat-menu #menu=\"matMenu\" class=\"histogram-overlay\">\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"infoSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"info\"\n    hraClickEvent\n    hraHoverEvent\n    hraHoverEventTriggerOn=\"mouseenter\"\n  >\n    <mat-icon>info</mat-icon>\n    <span>Info</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"downloadSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"download\"\n    hraClickEvent\n  >\n    <mat-icon>download</mat-icon>\n    <span>Downloads</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  @if (!dialogOpen()) {\n    <button mat-menu-item (click)=\"open.emit()\" hraFeature=\"fullscreen\" hraClickEvent>\n      <mat-icon>fullscreen</mat-icon>\n      Full Screen\n    </button>\n  }\n  <a\n    mat-menu-item\n    href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed-app\"\n    hraClickEvent\n  >\n    <mat-icon>code</mat-icon>\n    Embed App\n  </a>\n</mat-menu>\n\n<mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\">\n  This histogram plot shows the cell-to-nearest-anchor cell distance distributions categorized by each cell type in the\n  dataset.\n</mat-menu>\n\n<mat-menu #downloadSubMenu=\"matMenu\" class=\"download-sub-menu\">\n  <button mat-menu-item (click)=\"download.emit('png')\" hraFeature=\"download-png\" hraClickEvent>\n    <mat-icon>download</mat-icon>\n    PNG\n  </button>\n  <button mat-menu-item (click)=\"download.emit('svg')\" hraFeature=\"download-svg\" hraClickEvent>\n    <mat-icon>download</mat-icon>\n    SVG\n  </button>\n</mat-menu>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i3.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i3.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i3.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i5$1.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: HistogramMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-histogram-menu', imports: [HraCommonModule, MatMenuModule, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  [matMenuTriggerFor]=\"menu\"\n  hraIconButtonSize=\"large\"\n  aria-label=\"Icon to open nested menu\"\n  hraPlainTooltip=\"More\"\n  hraFeature=\"menu\"\n  hraClickEvent\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<mat-menu #menu=\"matMenu\" class=\"histogram-overlay\">\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"infoSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"info\"\n    hraClickEvent\n    hraHoverEvent\n    hraHoverEventTriggerOn=\"mouseenter\"\n  >\n    <mat-icon>info</mat-icon>\n    <span>Info</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"downloadSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"download\"\n    hraClickEvent\n  >\n    <mat-icon>download</mat-icon>\n    <span>Downloads</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  @if (!dialogOpen()) {\n    <button mat-menu-item (click)=\"open.emit()\" hraFeature=\"fullscreen\" hraClickEvent>\n      <mat-icon>fullscreen</mat-icon>\n      Full Screen\n    </button>\n  }\n  <a\n    mat-menu-item\n    href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed-app\"\n    hraClickEvent\n  >\n    <mat-icon>code</mat-icon>\n    Embed App\n  </a>\n</mat-menu>\n\n<mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\">\n  This histogram plot shows the cell-to-nearest-anchor cell distance distributions categorized by each cell type in the\n  dataset.\n</mat-menu>\n\n<mat-menu #downloadSubMenu=\"matMenu\" class=\"download-sub-menu\">\n  <button mat-menu-item (click)=\"download.emit('png')\" hraFeature=\"download-png\" hraClickEvent>\n    <mat-icon>download</mat-icon>\n    PNG\n  </button>\n  <button mat-menu-item (click)=\"download.emit('svg')\" hraFeature=\"download-svg\" hraClickEvent>\n    <mat-icon>download</mat-icon>\n    SVG\n  </button>\n</mat-menu>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { dialogOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "dialogOpen", required: false }] }], open: [{ type: i0.Output, args: ["open"] }], download: [{ type: i0.Output, args: ["download"] }] } });

var $schema$1 = "https://vega.github.io/schema/vega-lite/v5.json";
var width = "container";
var height = "container";
var background$1 = "#fcfcfc";
var config$1 = {
	font: "Metropolis",
	padding: {
		top: 0,
		right: 16,
		bottom: 16,
		left: 16
	},
	axis: {
		labelFontSize: 12,
		titleFontSize: 14,
		titleFontWeight: 500,
		labelFontWeight: 500,
		titleLineHeight: 21,
		labelLineHeight: 18,
		titleColor: "#201E3D",
		labelColor: "#4B4B5E",
		ticks: false,
		domain: false,
		labelPadding: 8
	}
};
var data$1 = {
	name: "data",
	values: [
	]
};
var params$1 = [
	{
		name: "yAxisTickCount",
		value: 5
	},
	{
		name: "colors",
		value: [
		]
	}
];
var transform$1 = [
	{
		calculate: "[datum.type, 'All Cells']",
		as: "type"
	},
	{
		flatten: [
			"type"
		]
	}
];
var mark = {
	type: "line",
	interpolate: "step"
};
var encoding = {
	x: {
		field: "distance",
		title: "Distance (µm)",
		bandPosition: 0,
		bin: {
			step: 5
		},
		scale: {
			domainMin: -5
		},
		axis: {
			orient: "top",
			minExtent: 25,
			labelFlush: false,
			grid: true,
			labelAngle: 0,
			labelOverlap: true,
			labelSeparation: 4
		}
	},
	y: {
		aggregate: "count",
		title: "Number of Cells",
		axis: {
			minExtent: 70,
			tickCount: {
				expr: "yAxisTickCount"
			}
		}
	},
	color: {
		field: "type",
		legend: null,
		scale: {
			range: [
				{
					expr: "'Replaced/repeated in javascript' && colors[0] || '#000'"
				}
			]
		}
	},
	tooltip: {
		field: "type",
		type: "nominal"
	}
};
var histogram_vl = {
	$schema: $schema$1,
	width: width,
	height: height,
	background: background$1,
	config: config$1,
	data: data$1,
	params: params$1,
	transform: transform$1,
	mark: mark,
	encoding: encoding
};

var HISTOGRAM_SPEC = /*#__PURE__*/Object.freeze({
    __proto__: null,
    $schema: $schema$1,
    background: background$1,
    config: config$1,
    data: data$1,
    default: histogram_vl,
    encoding: encoding,
    height: height,
    mark: mark,
    params: params$1,
    transform: transform$1,
    width: width
});

/** Fonts used in the histogram */
const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];
/** Label for all cell types */
const ALL_CELLS_TYPE = 'All Cells';
/** Width of the exported image */
const EXPORT_IMAGE_WIDTH$1 = 1000;
/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT$1 = 500;
/** Padding for the exported image */
const EXPORT_IMAGE_PADDING$1 = 16;
/** Configuration for the legend in the exported image */
const EXPORT_IMAGE_LEGEND_CONFIG$1 = {
    title: null,
    symbolType: 'circle',
    symbolStrokeWidth: 10,
    labelFontSize: 14,
    titleFontSize: 14,
    titleLineHeight: 21,
    titleColor: '#201E3D',
    titleFontWeight: 500,
    labelFontWeight: 500,
    labelColor: '#4B4B5E',
};
/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH$1 = 2000;
/** Dynamic color range for the histogram */
const DYNAMIC_COLOR_RANGE$1 = Array(DYNAMIC_COLOR_RANGE_LENGTH$1)
    .fill(0)
    .map((_value, index) => ({ expr: `colors[${index}] || '#000'` }));
/**
 * Histogram Component
 */
class HistogramComponent {
    /** Data for the visualization */
    data = input.required(...(ngDevMode ? [{ debugName: "data" }] : []));
    /** Colors for the visualization */
    colors = input.required(...(ngDevMode ? [{ debugName: "colors" }] : []));
    /** Cell types to use for the visualization */
    filteredCellTypes = input.required(...(ngDevMode ? [{ debugName: "filteredCellTypes" }] : []));
    /** Tooltip position configuration */
    tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;
    /** Tooltip content */
    tooltipContent = [
        {
            description: 'The graph shows a histogram of cell-to-nearest-anchor cell distance distributions categorized by each cell type in the dataset.',
        },
    ];
    /** State indicating whether the info panel is open */
    infoOpen = false;
    /** Toggles full screen mode */
    fullscreen = signal(false, ...(ngDevMode ? [{ debugName: "fullscreen" }] : []));
    /** Sets the color picker directive */
    colorPicker = signal(null, ...(ngDevMode ? [{ debugName: "colorPicker" }] : []));
    /** State indicating whether overflow is visible */
    overflowVisible = computed(() => !!this.colorPicker(), ...(ngDevMode ? [{ debugName: "overflowVisible" }] : []));
    /** Label for the total cell type */
    totalCellTypeLabel = ALL_CELLS_TYPE;
    /** Color for the total cell type */
    totalCellTypeColor = signal([0, 0, 0], ...(ngDevMode ? [{ debugName: "totalCellTypeColor", equal: colorEquals }] : [{ equal: colorEquals }]));
    /** Reference to the document object */
    document = inject(DOCUMENT);
    /** Reference to the renderer for DOM manipulation */
    renderer = inject(Renderer2);
    /** Service for saving files */
    fileSaver = inject(FileSaverService);
    /** Element reference for the histogram container */
    histogramEl = viewChild.required(FullscreenPortalComponent);
    /** Vega view instance for the histogram */
    view = signal(undefined, ...(ngDevMode ? [{ debugName: "view" }] : []));
    /** Emits updated color data */
    updateColor = output();
    /** Array of all colors to use in the histogram */
    allColors = computed(() => {
        const totalCellType = { name: this.totalCellTypeLabel, color: this.totalCellTypeColor() };
        return [totalCellType, ...this.filteredCellTypes()]
            .sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1))
            .map(({ color }) => rgbToHex(color));
    }, ...(ngDevMode ? [{ debugName: "allColors" }] : []));
    /** Effect for updating view data */
    viewDataRef = effect(() => this.view()?.data('data', this.data()).run(), ...(ngDevMode ? [{ debugName: "viewDataRef" }] : []));
    /** Effect for updating view colors */
    viewColorsRef = effect(() => this.view()?.signal('colors', this.allColors()).run(), ...(ngDevMode ? [{ debugName: "viewColorsRef" }] : []));
    /** Effect for creating the Vega view */
    viewCreateRef = effect(async (onCleanup) => {
        const el = this.histogramEl().rootNodes()[0];
        await this.ensureFontsLoaded();
        const spec = produce(HISTOGRAM_SPEC, (draft) => {
            draft.encoding.color.scale.range = DYNAMIC_COLOR_RANGE$1;
        });
        const { finalize, view } = await embed(el, spec, {
            actions: false,
        });
        onCleanup(finalize);
        this.view.set(view);
    }, ...(ngDevMode ? [{ debugName: "viewCreateRef" }] : []));
    /** Resizes view when fullscreen is toggled */
    /* istanbul ignore next */
    resizeAndSyncView() {
        const container = this.view()?.container();
        const bbox = container?.getBoundingClientRect();
        if (bbox) {
            this.view()?.width(bbox.width).height(bbox.height);
        }
        this.view()?.resize().runAsync();
    }
    /** Download the histogram as an image in the specified format */
    /* istanbul ignore next */
    async download(format) {
        const spec = produce(HISTOGRAM_SPEC, (draft) => {
            draft.width = EXPORT_IMAGE_WIDTH$1;
            draft.height = EXPORT_IMAGE_HEIGHT$1;
            draft.config.padding.bottom = EXPORT_IMAGE_PADDING$1;
            draft.config.padding.top = EXPORT_IMAGE_PADDING$1;
            draft.config.padding.right = EXPORT_IMAGE_PADDING$1;
            draft.config.padding.left = EXPORT_IMAGE_PADDING$1;
            draft.encoding.color.legend = EXPORT_IMAGE_LEGEND_CONFIG$1;
            draft.data.values = this.data();
            draft.encoding.color.scale.range = this.colors();
        });
        const el = this.renderer.createElement('div');
        const { view, finalize } = await embed(el, spec, {
            actions: false,
        });
        const url = await view.toImageURL(format);
        this.fileSaver.save(url, `cde-histogram.${format}`);
        finalize();
    }
    /** Ensure required fonts are loaded for the histogram */
    async ensureFontsLoaded() {
        const loadPromises = HISTOGRAM_FONTS.map((font) => this.document.fonts.load(font));
        await Promise.all(loadPromises);
    }
    /** Reset the color of the total cell type */
    resetAllCellsColor() {
        this.totalCellTypeColor.set([0, 0, 0]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: HistogramComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.9", type: HistogramComponent, isStandalone: true, selector: "cde-histogram", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: true, transformFunction: null }, colors: { classPropertyName: "colors", publicName: "colors", isSignal: true, isRequired: true, transformFunction: null }, filteredCellTypes: { classPropertyName: "filteredCellTypes", publicName: "filteredCellTypes", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { updateColor: "updateColor" }, providers: [
            {
                provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
                useValue: {
                    collapsedHeight: '56px',
                    expandedHeight: '56px',
                    hideToggle: true,
                },
            },
        ], viewQueries: [{ propertyName: "histogramEl", first: true, predicate: FullscreenPortalComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Histogram\" hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-actions>\n    <cde-histogram-menu\n      (open)=\"histogramEl().open()\"\n      (download)=\"download($event)\"\n      hraFeature=\"menu\"\n    ></cde-histogram-menu>\n  </hra-expansion-panel-actions>\n  <hra-expansion-panel-header-content>\n    <cde-color-picker-label\n      [label]=\"totalCellTypeLabel\"\n      [(color)]=\"totalCellTypeColor\"\n      (colorPickerOpen)=\"colorPicker.set($event)\"\n      hraFeature=\"color-picker\"\n      hraClickEvent\n    >\n    </cde-color-picker-label>\n  </hra-expansion-panel-header-content>\n  <hra-fullscreen-portal\n    tagline=\"Histogram\"\n    (opened)=\"resizeAndSyncView()\"\n    (closed)=\"resizeAndSyncView()\"\n    hraFeature=\"fullscreen\"\n  >\n    <hra-fullscreen-actions>\n      <cde-histogram-menu dialogOpen=\"true\" (download)=\"download($event)\" hraFeature=\"menu\"></cde-histogram-menu>\n    </hra-fullscreen-actions>\n\n    <hra-fullscreen-portal-content data-testid=\"portal-content\">\n      <div\n        class=\"histogram\"\n        style=\"height: 100%; width: 100%\"\n        data-testid=\"histogram\"\n        #histogram\n        hraFeature=\"histogram-chart\"\n      ></div>\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{height:fit-content;position:sticky;max-height:22.5rem;--mat-button-filled-container-height: 2rem;--mat-expansion-header-hover-state-layer-color: transparent;--mat-expansion-container-shape: 0}:host ::ng-deep .header{padding:.5rem 1rem .25rem .5rem}:host ::ng-deep .header hra-expansion-panel-header-content{display:block}:host ::ng-deep .header hra-expansion-panel-header-content .label{max-width:unset}:host ::ng-deep .expansion-body{height:11.25rem;display:flex;gap:1rem}:host ::ng-deep .expansion-body hra-fullscreen-portal{width:100%}:host ::ng-deep .expansion-body .legend{--hra-scroll-overflow-fade-color: var(--mat-sys-surface-container-low);overflow-y:auto;flex-grow:1;margin-left:.125rem}:host ::ng-deep .expansion-body .histogram{width:100%;height:100%}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel hra-expansion-panel-header-content cde-color-picker-label .label{font:var(--mat-sys-label-small);display:flex;white-space:unset;max-width:unset}:host ::ng-deep hra-expansion-panel .mat-expansion-panel-body{padding:0 1rem .5rem .75rem}::ng-deep .mat-content-hide-toggle{margin-right:0!important}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "component", type: ColorPickerLabelComponent, selector: "cde-color-picker-label", inputs: ["color", "label", "isAnchor"], outputs: ["colorChange", "colorPickerOpen"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: FullscreenPortalComponent, selector: "hra-fullscreen-portal", inputs: ["tagline", "panelClass"], outputs: ["beforeOpened", "opened", "beforeClosed", "closed"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelActionsComponent, selector: "hra-expansion-panel-actions" }, { kind: "component", type: ExpansionPanelHeaderContentComponent, selector: "hra-expansion-panel-header-content" }, { kind: "component", type: FullscreenPortalContentComponent, selector: "hra-fullscreen-portal-content" }, { kind: "component", type: FullscreenActionsComponent, selector: "hra-fullscreen-actions" }, { kind: "component", type: HistogramMenuComponent, selector: "cde-histogram-menu", inputs: ["dialogOpen"], outputs: ["open", "download"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: HistogramComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-histogram', imports: [
                        HraCommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatExpansionModule,
                        ColorPickerLabelComponent,
                        OverlayModule,
                        ScrollingModule,
                        MatMenuModule,
                        FullscreenPortalComponent,
                        ExpansionPanelComponent,
                        ExpansionPanelActionsComponent,
                        ExpansionPanelHeaderContentComponent,
                        FullscreenPortalContentComponent,
                        FullscreenActionsComponent,
                        HistogramMenuComponent,
                    ], providers: [
                        {
                            provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
                            useValue: {
                                collapsedHeight: '56px',
                                expandedHeight: '56px',
                                hideToggle: true,
                            },
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-expansion-panel tagline=\"Histogram\" hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-actions>\n    <cde-histogram-menu\n      (open)=\"histogramEl().open()\"\n      (download)=\"download($event)\"\n      hraFeature=\"menu\"\n    ></cde-histogram-menu>\n  </hra-expansion-panel-actions>\n  <hra-expansion-panel-header-content>\n    <cde-color-picker-label\n      [label]=\"totalCellTypeLabel\"\n      [(color)]=\"totalCellTypeColor\"\n      (colorPickerOpen)=\"colorPicker.set($event)\"\n      hraFeature=\"color-picker\"\n      hraClickEvent\n    >\n    </cde-color-picker-label>\n  </hra-expansion-panel-header-content>\n  <hra-fullscreen-portal\n    tagline=\"Histogram\"\n    (opened)=\"resizeAndSyncView()\"\n    (closed)=\"resizeAndSyncView()\"\n    hraFeature=\"fullscreen\"\n  >\n    <hra-fullscreen-actions>\n      <cde-histogram-menu dialogOpen=\"true\" (download)=\"download($event)\" hraFeature=\"menu\"></cde-histogram-menu>\n    </hra-fullscreen-actions>\n\n    <hra-fullscreen-portal-content data-testid=\"portal-content\">\n      <div\n        class=\"histogram\"\n        style=\"height: 100%; width: 100%\"\n        data-testid=\"histogram\"\n        #histogram\n        hraFeature=\"histogram-chart\"\n      ></div>\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{height:fit-content;position:sticky;max-height:22.5rem;--mat-button-filled-container-height: 2rem;--mat-expansion-header-hover-state-layer-color: transparent;--mat-expansion-container-shape: 0}:host ::ng-deep .header{padding:.5rem 1rem .25rem .5rem}:host ::ng-deep .header hra-expansion-panel-header-content{display:block}:host ::ng-deep .header hra-expansion-panel-header-content .label{max-width:unset}:host ::ng-deep .expansion-body{height:11.25rem;display:flex;gap:1rem}:host ::ng-deep .expansion-body hra-fullscreen-portal{width:100%}:host ::ng-deep .expansion-body .legend{--hra-scroll-overflow-fade-color: var(--mat-sys-surface-container-low);overflow-y:auto;flex-grow:1;margin-left:.125rem}:host ::ng-deep .expansion-body .histogram{width:100%;height:100%}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel hra-expansion-panel-header-content cde-color-picker-label .label{font:var(--mat-sys-label-small);display:flex;white-space:unset;max-width:unset}:host ::ng-deep hra-expansion-panel .mat-expansion-panel-body{padding:0 1rem .5rem .75rem}::ng-deep .mat-content-hide-toggle{margin-right:0!important}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: true }] }], colors: [{ type: i0.Input, args: [{ isSignal: true, alias: "colors", required: true }] }], filteredCellTypes: [{ type: i0.Input, args: [{ isSignal: true, alias: "filteredCellTypes", required: true }] }], histogramEl: [{ type: i0.ViewChild, args: [i0.forwardRef(() => FullscreenPortalComponent), { isSignal: true }] }], updateColor: [{ type: i0.Output, args: ["updateColor"] }] } });

/** List of metadata fields that can be hidden */
const HIDABLE_FIELDS = [
    'title',
    'colorMapFileName',
    'organ',
    'technology',
    'sex',
    'age',
    'thickness',
    'pixelSize',
];
/** Defines a pipe that provides a default value if the input is undefined or empty */
class DefaultToPipe {
    transform(value, defaultValue) {
        return value !== undefined && value !== '' ? value : defaultValue;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DefaultToPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: DefaultToPipe, isStandalone: true, name: "defaultTo" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DefaultToPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'defaultTo',
                    pure: true,
                }]
        }] });
/**
 * Metadata Component
 */
class MetadataComponent {
    /** Input for Metadata Component */
    metadata = input.required(...(ngDevMode ? [{ debugName: "metadata" }] : []));
    /** Defines a computed property for the title label */
    titleLabel = computed(() => {
        const { sampleExtra } = this.metadata();
        return sampleExtra ? `Sample ${sampleExtra.type} Visualization (${sampleExtra.organ})` : 'Title';
    }, ...(ngDevMode ? [{ debugName: "titleLabel" }] : []));
    /** Defines a reactive signal to track the visibility of empty fields */
    showEmptyFields = signal(false, ...(ngDevMode ? [{ debugName: "showEmptyFields" }] : []));
    /** Defines a computed property to check for empty fields */
    hasEmptyFields = computed(() => {
        const metadata = this.metadata();
        return HIDABLE_FIELDS.some((field) => metadata[field] === undefined);
    }, ...(ngDevMode ? [{ debugName: "hasEmptyFields" }] : []));
    /** Sets the tooltip position to the right side */
    tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;
    /** Tooltip content */
    tooltipContent = [
        {
            description: 'Visualization metadata for the sample dataset. Sample files may be viewed in Google Sheets.',
        },
    ];
    /** Creates a date formatter with default locale */
    dateFormat = new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    /** Creates a time formatter with default locale */
    timeFormat = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    });
    /** Flag to check if info tooltip is open */
    tooltipOpen = false;
    /** Checks if a field is visible based on its value and the showEmptyFields signal */
    isFieldVisible(field) {
        const value = this.metadata()[field];
        return this.showEmptyFields() || (value !== undefined && value !== '');
    }
    /** Toggle function for the show/hide buttons */
    toggleEmptyFields() {
        this.showEmptyFields.set(!this.showEmptyFields());
    }
    /** Formats the creation timestamp using a given formatter */
    formatCreationTimestamp(format) {
        return format.format(this.metadata().creationTimestamp);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MetadataComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: MetadataComponent, isStandalone: true, selector: "cde-metadata", inputs: { metadata: { classPropertyName: "metadata", publicName: "metadata", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<hra-expansion-panel tagline=\"Sample Metadata\">\n  <hra-expansion-panel-actions>\n    <button\n      mat-icon-button\n      [matMenuTriggerFor]=\"menu\"\n      [hraIconButtonSize]=\"'large'\"\n      aria-label=\"Icon to open nested menu\"\n      hraPlainTooltip=\"More\"\n      hraFeature=\"menu\"\n      hraClickEvent\n    >\n      <mat-icon>more_vert</mat-icon>\n    </button>\n    <mat-menu #menu=\"matMenu\" class=\"metadata-overlay\" hraFeature=\"menu\">\n      <button\n        mat-menu-item\n        [matMenuTriggerFor]=\"infoSubMenu\"\n        class=\"expanded\"\n        matRipple\n        matRippleColor=\"#201E3D14\"\n        hraFeature=\"info\"\n        hraClickEvent\n        hraHoverEvent\n        hraHoverEventTriggerOn=\"mouseenter\"\n      >\n        <mat-icon>info</mat-icon>\n        <span>Info</span>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </button>\n      @if (hasEmptyFields()) {\n        <button\n          mat-menu-item\n          (click)=\"toggleEmptyFields()\"\n          [hraFeature]=\"showEmptyFields() ? 'show-metadata' : 'hide-metadata'\"\n          hraClickEvent\n        >\n          <mat-icon>{{ showEmptyFields() ? 'visibility_off' : 'visibility' }}visibility</mat-icon>\n          {{ showEmptyFields() ? 'Hide' : 'Show' }} Unknown Metadata\n        </button>\n      }\n      <a\n        mat-menu-item\n        href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        hraFeature=\"embed-app\"\n        hraClickEvent\n      >\n        <mat-icon>code</mat-icon>\n        Embed App\n      </a>\n      <mat-menu\n        #infoSubMenu=\"matMenu\"\n        class=\"info-sub-menu\"\n        hraFeature=\"metadata-info-submenu\"\n        hraHoverEvent\n        hraHoverEventTriggerOn=\"mouseenter\"\n      >\n        Visualization metadata for the sample dataset.\n      </mat-menu>\n    </mat-menu>\n  </hra-expansion-panel-actions>\n  <div class=\"metadata-details\" hraFeature=\"details\">\n    <div class=\"metadata-row\">\n      @if (isFieldVisible('title')) {\n        <span class=\"metadata-row-label\"> Source publication </span>\n        <span class=\"metadata-row-value\">\n          @if (metadata().sampleExtra; as extra) {\n            <a hraHyperlink [attr.href]=\"extra.sampleUrl\" target=\"_blank\" rel=\"noreferrer noopener\">\n              {{ extra.sampleUrl }}\n            </a>\n          } @else {\n            <span class=\"metadata-row-value\">{{ metadata().title | defaultTo: 'Unknown' }}</span>\n          }\n        </span>\n      }\n    </div>\n    <div class=\"metadata-row\">\n      <span class=\"metadata-row-label\">Source data</span>\n      <span>\n        @if (metadata().sampleExtra; as extra) {\n          <a hraHyperlink [attr.href]=\"extra.sourceDataUrl\" target=\"_blank\" rel=\"noreferrer noopener\">\n            {{ metadata().sourceFileName }}\n          </a>\n        } @else {\n          <span>{{ metadata().sourceFileName | defaultTo: 'Unknown' }}</span>\n        }\n      </span>\n    </div>\n    @if (isFieldVisible('colorMapFileName')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Color map</span>\n        <span class=\"metadata-row-value\">{{ metadata().colorMapFileName | defaultTo: 'Default' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('organ')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Organ</span>\n        <span class=\"metadata-row-value\">{{ metadata().organ | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('technology')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Technology</span>\n        <span class=\"metadata-row-value\">{{ metadata().technology | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('sex')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Sex</span>\n        <span class=\"metadata-row-value\">{{ metadata().sex | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('age')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Age</span>\n        <span class=\"metadata-row-value\">{{ metadata().age | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('thickness')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Thickness (\u00B5m)</span>\n        <span class=\"metadata-row-value\">{{ metadata().thickness | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('pixelSize')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Pixel size (\u00B5m/pixel)</span>\n        <span class=\"metadata-row-value\">{{ metadata().pixelSize | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    <div class=\"metadata-row\">\n      <span class=\"metadata-row-label\">Creation date</span>\n      <span class=\"metadata-row-value\">{{ formatCreationTimestamp(dateFormat) | defaultTo: 'Unknown' }}</span>\n    </div>\n    <div class=\"metadata-row\">\n      <span class=\"metadata-row-label\">Creation time</span>\n      <span class=\"metadata-row-value\">{{ formatCreationTimestamp(timeFormat) | defaultTo: 'Unknown' }}</span>\n    </div>\n  </div>\n</hra-expansion-panel>\n", styles: [":host{display:block;--mat-button-text-hover-state-layer-opacity: 0;--mat-button-text-pressed-state-layer-opacity: 0;--mat-expansion-container-shape: 0}:host hra-expansion-panel{box-shadow:none;--mat-expansion-container-shape: 0;--mat-expansion-header-expanded-state-height: auto;--mat-expansion-header-collapsed-state-height: auto;--mat-expansion-header-hover-state-layer-color: transparent}:host hra-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0 1rem}:host hra-expansion-panel ::ng-deep .header{padding:.5rem .75rem}:host hra-expansion-panel .metadata-details{display:flex;flex-direction:column;margin:0 .5rem 1rem 1rem}:host hra-expansion-panel .metadata-details>div{display:inline-flex;margin:1px 0}:host hra-expansion-panel .metadata-details>div span{font:var(--mat-sys-label-small)}:host hra-expansion-panel .metadata-details>div span a{color:var(--mat-sys-tertiary)}:host hra-expansion-panel .metadata-details span{display:block}:host hra-expansion-panel .metadata-row{display:flex;gap:.25rem}:host hra-expansion-panel .metadata-row-label{color:var(--mat-sys-secondary);min-width:7.25rem}:host hra-expansion-panel .metadata-row-value{color:var(--mat-sys-primary);overflow:hidden;text-wrap:nowrap;text-overflow:ellipsis}:host hra-expansion-panel .show-hide{height:21px;line-height:21px}:host hra-expansion-panel .show-hide .mdc-button{--mat-button-text-label-text-color: var(--mat-sys-on-tertiary-fixed);height:100%;padding:0}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "ngmodule", type: OverlayModule }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i3.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i3.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i3.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "directive", type: i5$1.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: i6$1.TextHyperlinkDirective, selector: "a[hraHyperlink]" }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelActionsComponent, selector: "hra-expansion-panel-actions" }, { kind: "pipe", type: DefaultToPipe, name: "defaultTo" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MetadataComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-metadata', imports: [
                        HraCommonModule,
                        MatButtonModule,
                        MatIconModule,
                        MatExpansionModule,
                        OverlayModule,
                        DefaultToPipe,
                        MatMenuModule,
                        PlainTooltipDirective,
                        ButtonsModule,
                        ExpansionPanelComponent,
                        ExpansionPanelActionsComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-expansion-panel tagline=\"Sample Metadata\">\n  <hra-expansion-panel-actions>\n    <button\n      mat-icon-button\n      [matMenuTriggerFor]=\"menu\"\n      [hraIconButtonSize]=\"'large'\"\n      aria-label=\"Icon to open nested menu\"\n      hraPlainTooltip=\"More\"\n      hraFeature=\"menu\"\n      hraClickEvent\n    >\n      <mat-icon>more_vert</mat-icon>\n    </button>\n    <mat-menu #menu=\"matMenu\" class=\"metadata-overlay\" hraFeature=\"menu\">\n      <button\n        mat-menu-item\n        [matMenuTriggerFor]=\"infoSubMenu\"\n        class=\"expanded\"\n        matRipple\n        matRippleColor=\"#201E3D14\"\n        hraFeature=\"info\"\n        hraClickEvent\n        hraHoverEvent\n        hraHoverEventTriggerOn=\"mouseenter\"\n      >\n        <mat-icon>info</mat-icon>\n        <span>Info</span>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </button>\n      @if (hasEmptyFields()) {\n        <button\n          mat-menu-item\n          (click)=\"toggleEmptyFields()\"\n          [hraFeature]=\"showEmptyFields() ? 'show-metadata' : 'hide-metadata'\"\n          hraClickEvent\n        >\n          <mat-icon>{{ showEmptyFields() ? 'visibility_off' : 'visibility' }}visibility</mat-icon>\n          {{ showEmptyFields() ? 'Hide' : 'Show' }} Unknown Metadata\n        </button>\n      }\n      <a\n        mat-menu-item\n        href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n        target=\"_blank\"\n        rel=\"noopener noreferrer\"\n        hraFeature=\"embed-app\"\n        hraClickEvent\n      >\n        <mat-icon>code</mat-icon>\n        Embed App\n      </a>\n      <mat-menu\n        #infoSubMenu=\"matMenu\"\n        class=\"info-sub-menu\"\n        hraFeature=\"metadata-info-submenu\"\n        hraHoverEvent\n        hraHoverEventTriggerOn=\"mouseenter\"\n      >\n        Visualization metadata for the sample dataset.\n      </mat-menu>\n    </mat-menu>\n  </hra-expansion-panel-actions>\n  <div class=\"metadata-details\" hraFeature=\"details\">\n    <div class=\"metadata-row\">\n      @if (isFieldVisible('title')) {\n        <span class=\"metadata-row-label\"> Source publication </span>\n        <span class=\"metadata-row-value\">\n          @if (metadata().sampleExtra; as extra) {\n            <a hraHyperlink [attr.href]=\"extra.sampleUrl\" target=\"_blank\" rel=\"noreferrer noopener\">\n              {{ extra.sampleUrl }}\n            </a>\n          } @else {\n            <span class=\"metadata-row-value\">{{ metadata().title | defaultTo: 'Unknown' }}</span>\n          }\n        </span>\n      }\n    </div>\n    <div class=\"metadata-row\">\n      <span class=\"metadata-row-label\">Source data</span>\n      <span>\n        @if (metadata().sampleExtra; as extra) {\n          <a hraHyperlink [attr.href]=\"extra.sourceDataUrl\" target=\"_blank\" rel=\"noreferrer noopener\">\n            {{ metadata().sourceFileName }}\n          </a>\n        } @else {\n          <span>{{ metadata().sourceFileName | defaultTo: 'Unknown' }}</span>\n        }\n      </span>\n    </div>\n    @if (isFieldVisible('colorMapFileName')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Color map</span>\n        <span class=\"metadata-row-value\">{{ metadata().colorMapFileName | defaultTo: 'Default' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('organ')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Organ</span>\n        <span class=\"metadata-row-value\">{{ metadata().organ | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('technology')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Technology</span>\n        <span class=\"metadata-row-value\">{{ metadata().technology | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('sex')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Sex</span>\n        <span class=\"metadata-row-value\">{{ metadata().sex | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('age')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Age</span>\n        <span class=\"metadata-row-value\">{{ metadata().age | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('thickness')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Thickness (\u00B5m)</span>\n        <span class=\"metadata-row-value\">{{ metadata().thickness | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    @if (isFieldVisible('pixelSize')) {\n      <div class=\"metadata-row\">\n        <span class=\"metadata-row-label\">Pixel size (\u00B5m/pixel)</span>\n        <span class=\"metadata-row-value\">{{ metadata().pixelSize | defaultTo: 'Unknown' }}</span>\n      </div>\n    }\n    <div class=\"metadata-row\">\n      <span class=\"metadata-row-label\">Creation date</span>\n      <span class=\"metadata-row-value\">{{ formatCreationTimestamp(dateFormat) | defaultTo: 'Unknown' }}</span>\n    </div>\n    <div class=\"metadata-row\">\n      <span class=\"metadata-row-label\">Creation time</span>\n      <span class=\"metadata-row-value\">{{ formatCreationTimestamp(timeFormat) | defaultTo: 'Unknown' }}</span>\n    </div>\n  </div>\n</hra-expansion-panel>\n", styles: [":host{display:block;--mat-button-text-hover-state-layer-opacity: 0;--mat-button-text-pressed-state-layer-opacity: 0;--mat-expansion-container-shape: 0}:host hra-expansion-panel{box-shadow:none;--mat-expansion-container-shape: 0;--mat-expansion-header-expanded-state-height: auto;--mat-expansion-header-collapsed-state-height: auto;--mat-expansion-header-hover-state-layer-color: transparent}:host hra-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0 1rem}:host hra-expansion-panel ::ng-deep .header{padding:.5rem .75rem}:host hra-expansion-panel .metadata-details{display:flex;flex-direction:column;margin:0 .5rem 1rem 1rem}:host hra-expansion-panel .metadata-details>div{display:inline-flex;margin:1px 0}:host hra-expansion-panel .metadata-details>div span{font:var(--mat-sys-label-small)}:host hra-expansion-panel .metadata-details>div span a{color:var(--mat-sys-tertiary)}:host hra-expansion-panel .metadata-details span{display:block}:host hra-expansion-panel .metadata-row{display:flex;gap:.25rem}:host hra-expansion-panel .metadata-row-label{color:var(--mat-sys-secondary);min-width:7.25rem}:host hra-expansion-panel .metadata-row-value{color:var(--mat-sys-primary);overflow:hidden;text-wrap:nowrap;text-overflow:ellipsis}:host hra-expansion-panel .show-hide{height:21px;line-height:21px}:host hra-expansion-panel .show-hide .mdc-button{--mat-button-text-label-text-color: var(--mat-sys-on-tertiary-fixed);height:100%;padding:0}\n"] }]
        }], propDecorators: { metadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "metadata", required: true }] }] } });

/**
 * Controls for node dist visualization
 */
class NodeDistVisualizationControlsComponent {
    /** Current view mode */
    viewMode = model('explore', ...(ngDevMode ? [{ debugName: "viewMode" }] : []));
    /** Whether delete button is disabled */
    deleteDisabled = input(false, ...(ngDevMode ? [{ debugName: "deleteDisabled", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Emits when delete button clicked */
    deleteClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NodeDistVisualizationControlsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: NodeDistVisualizationControlsComponent, isStandalone: true, selector: "cde-node-dist-visualization-controls", inputs: { viewMode: { classPropertyName: "viewMode", publicName: "viewMode", isSignal: true, isRequired: false, transformFunction: null }, deleteDisabled: { classPropertyName: "deleteDisabled", publicName: "deleteDisabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { viewMode: "viewModeChange", deleteClick: "deleteClick" }, ngImport: i0, template: "<button\n  mat-icon-button\n  class=\"delete\"\n  aria-label=\"Delete selected nodes\"\n  hraIconButtonSize=\"large\"\n  hraPlainTooltip=\"Select at least one cell to delete it from this dataset\"\n  [disabled]=\"deleteDisabled()\"\n  (click)=\"deleteClick.emit()\"\n  hraFeature=\"delete-selected-cells\"\n  hraClickEvent\n>\n  <mat-icon>delete</mat-icon>\n</button>\n\n<mat-button-toggle-group\n  aria-label=\"Visualization mode\"\n  hraButtonToggleSize=\"medium\"\n  [value]=\"viewMode()\"\n  (change)=\"viewMode.set($event.value)\"\n  hraFeature=\"toggle\"\n>\n  <mat-button-toggle\n    value=\"select\"\n    hraPlainTooltip=\"Select cells to delete from this dataset\"\n    hraFeature=\"select\"\n    hraClickEvent\n  >\n    Select\n  </mat-button-toggle>\n  <mat-button-toggle\n    value=\"inspect\"\n    hraPlainTooltip=\"Get information about individual cell types\"\n    hraFeature=\"inspect\"\n    hraClickEvent\n  >\n    Inspect\n  </mat-button-toggle>\n  <mat-button-toggle\n    value=\"explore\"\n    hraPlainTooltip=\"Zoom, pan, and rotate the view of this visualization\"\n    hraFeature=\"explore\"\n    hraClickEvent\n  >\n    Explore\n  </mat-button-toggle>\n</mat-button-toggle-group>\n", styles: [":host{display:flex;flex-direction:row;align-items:center}:host .delete{margin-right:1rem}::ng-deep mat-button-toggle-group{--mat-button-toggle-height: 1.3125rem}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i3$1.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled", "disabledInteractive", "hideSingleSelectionIndicator", "hideMultipleSelectionIndicator"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { kind: "component", type: i3$1.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "directive", type: i5$1.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: i5$2.ButtonToggleSizeDirective, selector: "mat-button-toggle-group[hraButtonToggleSize]", inputs: ["hraButtonToggleSize"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NodeDistVisualizationControlsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-node-dist-visualization-controls', imports: [MatIconModule, ButtonsModule, PlainTooltipDirective, HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  class=\"delete\"\n  aria-label=\"Delete selected nodes\"\n  hraIconButtonSize=\"large\"\n  hraPlainTooltip=\"Select at least one cell to delete it from this dataset\"\n  [disabled]=\"deleteDisabled()\"\n  (click)=\"deleteClick.emit()\"\n  hraFeature=\"delete-selected-cells\"\n  hraClickEvent\n>\n  <mat-icon>delete</mat-icon>\n</button>\n\n<mat-button-toggle-group\n  aria-label=\"Visualization mode\"\n  hraButtonToggleSize=\"medium\"\n  [value]=\"viewMode()\"\n  (change)=\"viewMode.set($event.value)\"\n  hraFeature=\"toggle\"\n>\n  <mat-button-toggle\n    value=\"select\"\n    hraPlainTooltip=\"Select cells to delete from this dataset\"\n    hraFeature=\"select\"\n    hraClickEvent\n  >\n    Select\n  </mat-button-toggle>\n  <mat-button-toggle\n    value=\"inspect\"\n    hraPlainTooltip=\"Get information about individual cell types\"\n    hraFeature=\"inspect\"\n    hraClickEvent\n  >\n    Inspect\n  </mat-button-toggle>\n  <mat-button-toggle\n    value=\"explore\"\n    hraPlainTooltip=\"Zoom, pan, and rotate the view of this visualization\"\n    hraFeature=\"explore\"\n    hraClickEvent\n  >\n    Explore\n  </mat-button-toggle>\n</mat-button-toggle-group>\n", styles: [":host{display:flex;flex-direction:row;align-items:center}:host .delete{margin-right:1rem}::ng-deep mat-button-toggle-group{--mat-button-toggle-height: 1.3125rem}\n"] }]
        }], propDecorators: { viewMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewMode", required: false }] }, { type: i0.Output, args: ["viewModeChange"] }], deleteDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "deleteDisabled", required: false }] }], deleteClick: [{ type: i0.Output, args: ["deleteClick"] }] } });

/**
 * Menu for node dist visualization expansion panel
 */
class NodeDistVisualizationMenuComponent {
    /** If visualization is in full screen */
    fullscreenMode = input(false, ...(ngDevMode ? [{ debugName: "fullscreenMode", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** If edges are disabled */
    edgesDisabled = model(false, ...(ngDevMode ? [{ debugName: "edgesDisabled" }] : []));
    /** Emits when full screen option clicked */
    fullscreenClick = output();
    /** Emits when download option clicked */
    downloadClick = output();
    /** Emits when reset visualization view option clicked */
    resetViewClick = output();
    /** Emits when reset deleted cells option option clicked */
    resetDeletedClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NodeDistVisualizationMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: NodeDistVisualizationMenuComponent, isStandalone: true, selector: "cde-node-dist-visualization-menu", inputs: { fullscreenMode: { classPropertyName: "fullscreenMode", publicName: "fullscreenMode", isSignal: true, isRequired: false, transformFunction: null }, edgesDisabled: { classPropertyName: "edgesDisabled", publicName: "edgesDisabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { edgesDisabled: "edgesDisabledChange", fullscreenClick: "fullscreenClick", downloadClick: "downloadClick", resetViewClick: "resetViewClick", resetDeletedClick: "resetDeletedClick" }, ngImport: i0, template: "<button\n  mat-icon-button\n  [matMenuTriggerFor]=\"menu\"\n  hraIconButtonSize=\"large\"\n  aria-label=\"Icon to open nested menu\"\n  hraPlainTooltip=\"More\"\n  hraFeature=\"menu\"\n  hraClickEvent\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<mat-menu #menu=\"matMenu\" class=\"vis-overlay\" hraFeature=\"menu\">\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"infoSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"info\"\n    hraClickEvent\n    hraHoverEvent\n    hraHoverEventTriggerOn=\"mouseenter\"\n  >\n    <mat-icon>info</mat-icon>\n    <span>Info</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"downloadSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"download\"\n    hraClickEvent\n  >\n    <mat-icon>download</mat-icon>\n    <span>Downloads</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"resetSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"reset\"\n    hraClickEvent\n  >\n    <mat-icon>reset_wrench</mat-icon>\n    <span>Reset</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  @if (!fullscreenMode()) {\n    <button mat-menu-item (click)=\"fullscreenClick.emit()\" hraFeature=\"fullscreen\" hraClickEvent>\n      <mat-icon>fullscreen</mat-icon>\n      Full Screen\n    </button>\n  }\n  <button\n    mat-menu-item\n    (click)=\"this.edgesDisabled.set(!this.edgesDisabled())\"\n    [hraFeature]=\"edgesDisabled() ? 'show-cell-links' : 'hide-cell-links'\"\n    hraClickEvent\n  >\n    <mat-icon>{{ edgesDisabled() ? 'visibility' : 'visibility_off' }}</mat-icon>\n    {{ edgesDisabled() ? 'Show' : 'Hide' }} Cell Links\n  </button>\n  <a\n    mat-menu-item\n    href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed-app\"\n    hraClickEvent\n  >\n    <mat-icon>code</mat-icon>\n    Embed App\n  </a>\n</mat-menu>\n\n<mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\">\n  <div>\n    <ul>\n      Zoom Options\n      <li>Mouse pinwheel</li>\n      <li>Trackpad Pinch</li>\n    </ul>\n    <ul>\n      Pan Options\n      <li>CTRL/CMD + mouse drag</li>\n      <li>Right click + mouse drag</li>\n      <li>Keyboard arrows</li>\n    </ul>\n    <ul>\n      Rotation Options\n      <li>CTRL/CMD + keyboard arrows</li>\n      <li>Mouse Drag</li>\n    </ul>\n  </div>\n</mat-menu>\n\n<mat-menu #downloadSubMenu=\"matMenu\" class=\"download-sub-menu\">\n  <button mat-menu-item (click)=\"downloadClick.emit()\" hraFeature=\"download-png\" hraClickEvent>\n    <mat-icon>download</mat-icon>\n    <span>PNG</span>\n  </button>\n</mat-menu>\n\n<mat-menu #resetSubMenu=\"matMenu\" class=\"reset-sub-menu\">\n  <button mat-menu-item (click)=\"resetViewClick.emit()\" hraFeature=\"reset-visualization-view\" hraClickEvent>\n    <mat-icon>reset_wrench</mat-icon>\n    <span>Reset Visualization View</span>\n  </button>\n\n  <button mat-menu-item (click)=\"resetDeletedClick.emit()\" hraFeature=\"reset-deleted-cells\" hraClickEvent>\n    <mat-icon>reset_wrench</mat-icon>\n    <span>Reset Deleted Cells</span>\n  </button>\n</mat-menu>\n", styles: [":host{display:block;width:2.5rem;height:2.5rem}::ng-deep .info-sub-menu div ul{padding:0;color:var(--mat-sys-secondary);margin:0}::ng-deep .info-sub-menu div ul:not(:last-child){margin-bottom:.5rem}::ng-deep .info-sub-menu div li{margin-left:1.5rem}::ng-deep .reset-sub-menu .mat-mdc-menu-content{color:var(--mat-sys-primary);background-color:var(--mat-sys-on-primary);font:var(--mat-sys-label-medium)}::ng-deep .reset-sub-menu .mat-mdc-menu-content .mat-mdc-menu-item-text{font:var(--mat-sys-label-medium)}\n"], dependencies: [{ kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i3.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i3.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i3.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i5$1.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NodeDistVisualizationMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-node-dist-visualization-menu', imports: [MatMenuModule, MatIconModule, ButtonsModule, PlainTooltipDirective, HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  [matMenuTriggerFor]=\"menu\"\n  hraIconButtonSize=\"large\"\n  aria-label=\"Icon to open nested menu\"\n  hraPlainTooltip=\"More\"\n  hraFeature=\"menu\"\n  hraClickEvent\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<mat-menu #menu=\"matMenu\" class=\"vis-overlay\" hraFeature=\"menu\">\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"infoSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"info\"\n    hraClickEvent\n    hraHoverEvent\n    hraHoverEventTriggerOn=\"mouseenter\"\n  >\n    <mat-icon>info</mat-icon>\n    <span>Info</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"downloadSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"download\"\n    hraClickEvent\n  >\n    <mat-icon>download</mat-icon>\n    <span>Downloads</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"resetSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    hraFeature=\"reset\"\n    hraClickEvent\n  >\n    <mat-icon>reset_wrench</mat-icon>\n    <span>Reset</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  @if (!fullscreenMode()) {\n    <button mat-menu-item (click)=\"fullscreenClick.emit()\" hraFeature=\"fullscreen\" hraClickEvent>\n      <mat-icon>fullscreen</mat-icon>\n      Full Screen\n    </button>\n  }\n  <button\n    mat-menu-item\n    (click)=\"this.edgesDisabled.set(!this.edgesDisabled())\"\n    [hraFeature]=\"edgesDisabled() ? 'show-cell-links' : 'hide-cell-links'\"\n    hraClickEvent\n  >\n    <mat-icon>{{ edgesDisabled() ? 'visibility' : 'visibility_off' }}</mat-icon>\n    {{ edgesDisabled() ? 'Show' : 'Hide' }} Cell Links\n  </button>\n  <a\n    mat-menu-item\n    href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed-app\"\n    hraClickEvent\n  >\n    <mat-icon>code</mat-icon>\n    Embed App\n  </a>\n</mat-menu>\n\n<mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\">\n  <div>\n    <ul>\n      Zoom Options\n      <li>Mouse pinwheel</li>\n      <li>Trackpad Pinch</li>\n    </ul>\n    <ul>\n      Pan Options\n      <li>CTRL/CMD + mouse drag</li>\n      <li>Right click + mouse drag</li>\n      <li>Keyboard arrows</li>\n    </ul>\n    <ul>\n      Rotation Options\n      <li>CTRL/CMD + keyboard arrows</li>\n      <li>Mouse Drag</li>\n    </ul>\n  </div>\n</mat-menu>\n\n<mat-menu #downloadSubMenu=\"matMenu\" class=\"download-sub-menu\">\n  <button mat-menu-item (click)=\"downloadClick.emit()\" hraFeature=\"download-png\" hraClickEvent>\n    <mat-icon>download</mat-icon>\n    <span>PNG</span>\n  </button>\n</mat-menu>\n\n<mat-menu #resetSubMenu=\"matMenu\" class=\"reset-sub-menu\">\n  <button mat-menu-item (click)=\"resetViewClick.emit()\" hraFeature=\"reset-visualization-view\" hraClickEvent>\n    <mat-icon>reset_wrench</mat-icon>\n    <span>Reset Visualization View</span>\n  </button>\n\n  <button mat-menu-item (click)=\"resetDeletedClick.emit()\" hraFeature=\"reset-deleted-cells\" hraClickEvent>\n    <mat-icon>reset_wrench</mat-icon>\n    <span>Reset Deleted Cells</span>\n  </button>\n</mat-menu>\n", styles: [":host{display:block;width:2.5rem;height:2.5rem}::ng-deep .info-sub-menu div ul{padding:0;color:var(--mat-sys-secondary);margin:0}::ng-deep .info-sub-menu div ul:not(:last-child){margin-bottom:.5rem}::ng-deep .info-sub-menu div li{margin-left:1.5rem}::ng-deep .reset-sub-menu .mat-mdc-menu-content{color:var(--mat-sys-primary);background-color:var(--mat-sys-on-primary);font:var(--mat-sys-label-medium)}::ng-deep .reset-sub-menu .mat-mdc-menu-content .mat-mdc-menu-item-text{font:var(--mat-sys-label-medium)}\n"] }]
        }], propDecorators: { fullscreenMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "fullscreenMode", required: false }] }], edgesDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgesDisabled", required: false }] }, { type: i0.Output, args: ["edgesDisabledChange"] }], fullscreenClick: [{ type: i0.Output, args: ["fullscreenClick"] }], downloadClick: [{ type: i0.Output, args: ["downloadClick"] }], resetViewClick: [{ type: i0.Output, args: ["resetViewClick"] }], resetDeletedClick: [{ type: i0.Output, args: ["resetDeletedClick"] }] } });

/** Number format for distances */
const DISTANCE_FORMAT = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
});
/**
 * Component for Node Distribution Visualization
 */
class NodeDistVisualizationComponent {
    /** Input for node data */
    nodes = input.required(...(ngDevMode ? [{ debugName: "nodes" }] : []));
    /** Input for edge data */
    edges = input.required(...(ngDevMode ? [{ debugName: "edges" }] : []));
    /** Input for the color map data */
    colorMap = input.required(...(ngDevMode ? [{ debugName: "colorMap" }] : []));
    /** Node filter */
    nodeFilter = model.required(...(ngDevMode ? [{ debugName: "nodeFilter" }] : []));
    /** Input for the maximum edge distance */
    maxEdgeDistance = input.required(...(ngDevMode ? [{ debugName: "maxEdgeDistance" }] : []));
    /** Output emitter for node click events */
    nodeClick = output();
    /** Output emitter for node hover events */
    nodeHover = output();
    /** Flag to check cell links visibility */
    edgesDisabled = signal(false, ...(ngDevMode ? [{ debugName: "edgesDisabled" }] : []));
    /** Current view mode */
    viewMode = signal('explore', ...(ngDevMode ? [{ debugName: "viewMode" }] : []));
    /** Current node selection */
    selection = signal([], ...(ngDevMode ? [{ debugName: "selection" }] : []));
    /** If there is a current node selection */
    hasSelection = computed(() => {
        return this.viewMode() === 'select' && this.selection().length > 0;
    }, ...(ngDevMode ? [{ debugName: "hasSelection" }] : []));
    /** Signal containing node event */
    cellInfo = signal(undefined, ...(ngDevMode ? [{ debugName: "cellInfo" }] : []));
    /** Opens cell info panel */
    cellInfoOpen = computed(() => this.viewMode() === 'inspect' && !!this.cellInfo(), ...(ngDevMode ? [{ debugName: "cellInfoOpen" }] : []));
    /** Position of cell info panel */
    cellInfoPosition = computed(() => [
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: this.cellInfo()?.clientX,
            offsetY: this.cellInfo()?.clientY,
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: this.cellInfo()?.clientX,
            offsetY: this.cellInfo()?.clientY,
        },
    ], ...(ngDevMode ? [{ debugName: "cellInfoPosition" }] : []));
    /** Data for cell info panel */
    cellInfoContent = computed(() => {
        const info = this.cellInfo();
        if (!info) {
            return [];
        }
        const nodes = this.nodes();
        const edges = this.edges();
        const { index, object: node } = info;
        const edge = this.findClosestEdge(index);
        const type = nodes.getCellTypeFor(node);
        const ontologyId = nodes.getCellOntologyIDFor(node) ?? '-';
        const distance = edge ? DISTANCE_FORMAT.format(edges.getDistanceFor(edge)) + ' µm' : '-';
        const x = DISTANCE_FORMAT.format(nodes.getXFor(node));
        const y = DISTANCE_FORMAT.format(nodes.getYFor(node));
        const z = DISTANCE_FORMAT.format(nodes.getZFor(node) ?? 0);
        return [
            { label: 'Cell Type', value: type },
            { label: 'CL ID', value: ontologyId },
            { label: 'Distance to Closest Anchor Cell', value: distance },
            { label: 'X Coordinate', value: `${x} µm` },
            { label: 'Y Coordinate', value: `${y} µm` },
            { label: 'Z Coordinate', value: `${z} µm` },
        ];
    }, ...(ngDevMode ? [{ debugName: "cellInfoContent" }] : []));
    /** Service to handle file saving */
    fileSaver = inject(FileSaverService);
    /** Full screen portal element */
    fullscreenPortal = viewChild.required(FullscreenPortalComponent);
    /** Visualization element */
    visEl = computed(() => this.fullscreenPortal().rootNodes()[0].childNodes[0], ...(ngDevMode ? [{ debugName: "visEl" }] : []));
    /** Cell info overlay element */
    cellInfoOverlay = viewChild.required('cellInfoOverlay');
    /** Bind data and events to the visualization element */
    constructor() {
        this.bindData('mode', this.viewMode);
        this.bindData('nodes', this.nodes);
        this.bindEvent('nodeClick', this.nodeClick);
        this.bindEvent('nodeClick', this.cellInfo);
        this.bindEvent('nodeHover', this.nodeHover);
        this.bindData('edges', this.edges);
        this.bindData('edgesDisabled', this.edgesDisabled);
        this.bindData('maxEdgeDistance', this.maxEdgeDistance);
        this.bindData('colorMap', this.colorMap);
        this.bindData('nodeFilter', this.nodeFilter);
        this.bindEvent('nodeSelectionChange', this.selection);
        effect(() => {
            if (this.viewMode() === 'select') {
                this.resetOrbit();
            }
        });
        effect(() => {
            // CdkConnectedOverlay only updates the position on changes to 'origin' and 'open'
            // Manually force an update to the position instead
            const info = this.cellInfo();
            const ref = this.cellInfoOverlay().overlayRef;
            if (info && ref) {
                setTimeout(() => ref.updatePosition());
            }
        });
    }
    /** Downloads the visualization as an image */
    async download() {
        const el = this.visEl().instance;
        const blob = await el?.toBlob();
        if (blob) {
            this.fileSaver.saveData(blob, 'cell-distance-vis.png');
        }
    }
    /** Resets the visualization view */
    resetView() {
        this.cellInfo.set(undefined);
        this.visEl().instance?.resetView();
    }
    /** Resets the orbit controls */
    resetOrbit() {
        this.visEl().instance?.resetOrbit();
    }
    /** Resets the deleted nodes filter */
    resetDeletedNodes() {
        const newFilter = this.nodeFilter().clear(false, true);
        this.nodeFilter.set(newFilter);
    }
    /** Deletes the selected nodes */
    deleteSelection() {
        const selection = this.selection();
        if (selection.length > 0) {
            const indices = selection.map((event) => event.index);
            const newFilter = this.nodeFilter().addEntries(undefined, indices);
            this.visEl().instance?.clearSelection();
            this.selection.set([]);
            this.nodeFilter.set(newFilter);
        }
    }
    /** Binds a property from the visualization element to a signal */
    bindData(prop, value) {
        effect(() => {
            const el = this.visEl();
            const data = value();
            el[prop] = data;
        });
    }
    /** Binds an event from the visualization element to an output emitter */
    bindEvent(type, outputRef) {
        const handler = (event) => {
            const { detail: data } = event;
            if (isSignal(outputRef)) {
                outputRef.set(data);
            }
            else {
                outputRef.emit(data);
            }
        };
        effect((onCleanup) => {
            const el = this.visEl();
            el.addEventListener(type, handler);
            onCleanup(() => el.removeEventListener(type, handler));
        });
    }
    findClosestEdge(index) {
        const edges = this.edges();
        for (const edge of edges) {
            if (edges.getCellIDFor(edge) === index) {
                return edge;
            }
        }
        return undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NodeDistVisualizationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.9", type: NodeDistVisualizationComponent, isStandalone: true, selector: "cde-node-dist-visualization", inputs: { nodes: { classPropertyName: "nodes", publicName: "nodes", isSignal: true, isRequired: true, transformFunction: null }, edges: { classPropertyName: "edges", publicName: "edges", isSignal: true, isRequired: true, transformFunction: null }, colorMap: { classPropertyName: "colorMap", publicName: "colorMap", isSignal: true, isRequired: true, transformFunction: null }, nodeFilter: { classPropertyName: "nodeFilter", publicName: "nodeFilter", isSignal: true, isRequired: true, transformFunction: null }, maxEdgeDistance: { classPropertyName: "maxEdgeDistance", publicName: "maxEdgeDistance", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { nodeFilter: "nodeFilterChange", nodeClick: "nodeClick", nodeHover: "nodeHover" }, viewQueries: [{ propertyName: "fullscreenPortal", first: true, predicate: FullscreenPortalComponent, descendants: true, isSignal: true }, { propertyName: "cellInfoOverlay", first: true, predicate: ["cellInfoOverlay"], descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Visualization\" disabled>\n  <hra-expansion-panel-actions>\n    <cde-node-dist-visualization-menu\n      [(edgesDisabled)]=\"edgesDisabled\"\n      (fullscreenClick)=\"fullscreen.open()\"\n      (downloadClick)=\"download()\"\n      (resetViewClick)=\"resetView()\"\n      (resetDeletedClick)=\"resetDeletedNodes()\"\n    >\n    </cde-node-dist-visualization-menu>\n  </hra-expansion-panel-actions>\n\n  <hra-expansion-panel-header-content>\n    <cde-node-dist-visualization-controls\n      [(viewMode)]=\"viewMode\"\n      [deleteDisabled]=\"!hasSelection()\"\n      (deleteClick)=\"deleteSelection()\"\n      (viewModeChange)=\"cellInfo.set(undefined)\"\n    >\n    </cde-node-dist-visualization-controls>\n  </hra-expansion-panel-header-content>\n\n  <hra-fullscreen-portal tagline=\"Visualization\" panelClass=\"node-dist-vis-fullscreen-panel\" #fullscreen>\n    <hra-fullscreen-actions>\n      <cde-node-dist-visualization-menu\n        fullscreenMode\n        [(edgesDisabled)]=\"edgesDisabled\"\n        (downloadClick)=\"download()\"\n        (resetViewClick)=\"resetView()\"\n        (resetDeletedClick)=\"resetDeletedNodes()\"\n      >\n      </cde-node-dist-visualization-menu>\n\n      <cde-node-dist-visualization-controls\n        [(viewMode)]=\"viewMode\"\n        [deleteDisabled]=\"!hasSelection()\"\n        (deleteClick)=\"deleteSelection()\"\n        (viewModeChange)=\"cellInfo.set(undefined)\"\n      >\n      </cde-node-dist-visualization-controls>\n    </hra-fullscreen-actions>\n\n    <hra-fullscreen-portal-content>\n      <hra-node-dist-vis\n        cdkOverlayOrigin\n        class=\"vis\"\n        data-testid=\"node-dist-vis\"\n        #cellInfoOrigin=\"cdkOverlayOrigin\"\n      ></hra-node-dist-vis>\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayDisposeOnNavigation]=\"true\"\n  [cdkConnectedOverlayHasBackdrop]=\"false\"\n  [cdkConnectedOverlayMinWidth]=\"540\"\n  [cdkConnectedOverlayOpen]=\"cellInfoOpen()\"\n  [cdkConnectedOverlayOrigin]=\"cellInfoOrigin\"\n  [cdkConnectedOverlayPositions]=\"cellInfoPosition()\"\n  [cdkConnectedOverlayPush]=\"true\"\n  [cdkConnectedOverlayViewportMargin]=\"16\"\n  (overlayOutsideClick)=\"cellInfo.set(undefined)\"\n  #cellInfoOverlay=\"cdkConnectedOverlay\"\n>\n  <hra-info-modal\n    [title]=\"'Cell Info'\"\n    [data]=\"cellInfoContent()\"\n    (close)=\"cellInfo.set(undefined)\"\n    data-testid=\"cell-info\"\n  >\n  </hra-info-modal>\n</ng-template>\n", styles: [":host{display:block;background-color:#000}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header{background-color:var(--mat-sys-surface-container-low);height:3.5rem;align-items:center;padding:0 1rem}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header hra-expansion-panel-header-content mat-icon{vertical-align:middle}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content{height:calc(100% - 4rem + 2px)}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal{display:flex;height:100%;width:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal .vis{width:100%}::ng-deep div.node-dist-vis-fullscreen-panel{--mat-dialog-container-color: black}::ng-deep div.node-dist-vis-fullscreen-panel .header{background-color:#fff}\n"], dependencies: [{ kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelActionsComponent, selector: "hra-expansion-panel-actions" }, { kind: "component", type: ExpansionPanelHeaderContentComponent, selector: "hra-expansion-panel-header-content" }, { kind: "component", type: FullscreenActionsComponent, selector: "hra-fullscreen-actions" }, { kind: "component", type: FullscreenPortalComponent, selector: "hra-fullscreen-portal", inputs: ["tagline", "panelClass"], outputs: ["beforeOpened", "opened", "beforeClosed", "closed"] }, { kind: "component", type: FullscreenPortalContentComponent, selector: "hra-fullscreen-portal-content" }, { kind: "component", type: InfoModalComponent, selector: "hra-info-modal", inputs: ["data", "title"], outputs: ["close"] }, { kind: "component", type: NodeDistVisualizationControlsComponent, selector: "cde-node-dist-visualization-controls", inputs: ["viewMode", "deleteDisabled"], outputs: ["viewModeChange", "deleteClick"] }, { kind: "component", type: NodeDistVisualizationMenuComponent, selector: "cde-node-dist-visualization-menu", inputs: ["fullscreenMode", "edgesDisabled"], outputs: ["edgesDisabledChange", "fullscreenClick", "downloadClick", "resetViewClick", "resetDeletedClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NodeDistVisualizationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-node-dist-visualization', imports: [
                        OverlayModule,
                        ExpansionPanelComponent,
                        ExpansionPanelActionsComponent,
                        ExpansionPanelHeaderContentComponent,
                        FullscreenActionsComponent,
                        FullscreenPortalComponent,
                        FullscreenPortalContentComponent,
                        InfoModalComponent,
                        NodeDistVisualizationControlsComponent,
                        NodeDistVisualizationMenuComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "<hra-expansion-panel tagline=\"Visualization\" disabled>\n  <hra-expansion-panel-actions>\n    <cde-node-dist-visualization-menu\n      [(edgesDisabled)]=\"edgesDisabled\"\n      (fullscreenClick)=\"fullscreen.open()\"\n      (downloadClick)=\"download()\"\n      (resetViewClick)=\"resetView()\"\n      (resetDeletedClick)=\"resetDeletedNodes()\"\n    >\n    </cde-node-dist-visualization-menu>\n  </hra-expansion-panel-actions>\n\n  <hra-expansion-panel-header-content>\n    <cde-node-dist-visualization-controls\n      [(viewMode)]=\"viewMode\"\n      [deleteDisabled]=\"!hasSelection()\"\n      (deleteClick)=\"deleteSelection()\"\n      (viewModeChange)=\"cellInfo.set(undefined)\"\n    >\n    </cde-node-dist-visualization-controls>\n  </hra-expansion-panel-header-content>\n\n  <hra-fullscreen-portal tagline=\"Visualization\" panelClass=\"node-dist-vis-fullscreen-panel\" #fullscreen>\n    <hra-fullscreen-actions>\n      <cde-node-dist-visualization-menu\n        fullscreenMode\n        [(edgesDisabled)]=\"edgesDisabled\"\n        (downloadClick)=\"download()\"\n        (resetViewClick)=\"resetView()\"\n        (resetDeletedClick)=\"resetDeletedNodes()\"\n      >\n      </cde-node-dist-visualization-menu>\n\n      <cde-node-dist-visualization-controls\n        [(viewMode)]=\"viewMode\"\n        [deleteDisabled]=\"!hasSelection()\"\n        (deleteClick)=\"deleteSelection()\"\n        (viewModeChange)=\"cellInfo.set(undefined)\"\n      >\n      </cde-node-dist-visualization-controls>\n    </hra-fullscreen-actions>\n\n    <hra-fullscreen-portal-content>\n      <hra-node-dist-vis\n        cdkOverlayOrigin\n        class=\"vis\"\n        data-testid=\"node-dist-vis\"\n        #cellInfoOrigin=\"cdkOverlayOrigin\"\n      ></hra-node-dist-vis>\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayDisposeOnNavigation]=\"true\"\n  [cdkConnectedOverlayHasBackdrop]=\"false\"\n  [cdkConnectedOverlayMinWidth]=\"540\"\n  [cdkConnectedOverlayOpen]=\"cellInfoOpen()\"\n  [cdkConnectedOverlayOrigin]=\"cellInfoOrigin\"\n  [cdkConnectedOverlayPositions]=\"cellInfoPosition()\"\n  [cdkConnectedOverlayPush]=\"true\"\n  [cdkConnectedOverlayViewportMargin]=\"16\"\n  (overlayOutsideClick)=\"cellInfo.set(undefined)\"\n  #cellInfoOverlay=\"cdkConnectedOverlay\"\n>\n  <hra-info-modal\n    [title]=\"'Cell Info'\"\n    [data]=\"cellInfoContent()\"\n    (close)=\"cellInfo.set(undefined)\"\n    data-testid=\"cell-info\"\n  >\n  </hra-info-modal>\n</ng-template>\n", styles: [":host{display:block;background-color:#000}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header{background-color:var(--mat-sys-surface-container-low);height:3.5rem;align-items:center;padding:0 1rem}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header hra-expansion-panel-header-content mat-icon{vertical-align:middle}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content{height:calc(100% - 4rem + 2px)}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal{display:flex;height:100%;width:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal .vis{width:100%}::ng-deep div.node-dist-vis-fullscreen-panel{--mat-dialog-container-color: black}::ng-deep div.node-dist-vis-fullscreen-panel .header{background-color:#fff}\n"] }]
        }], ctorParameters: () => [], propDecorators: { nodes: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodes", required: true }] }], edges: [{ type: i0.Input, args: [{ isSignal: true, alias: "edges", required: true }] }], colorMap: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMap", required: true }] }], nodeFilter: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeFilter", required: true }] }, { type: i0.Output, args: ["nodeFilterChange"] }], maxEdgeDistance: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxEdgeDistance", required: true }] }], nodeClick: [{ type: i0.Output, args: ["nodeClick"] }], nodeHover: [{ type: i0.Output, args: ["nodeHover"] }], fullscreenPortal: [{ type: i0.ViewChild, args: [i0.forwardRef(() => FullscreenPortalComponent), { isSignal: true }] }], cellInfoOverlay: [{ type: i0.ViewChild, args: ['cellInfoOverlay', { isSignal: true }] }] } });

/**
 * Menu for violin plot expansion panel
 */
class ViolinMenuComponent {
    /** Flag to check if dialog is opened */
    dialogOpen = input(false, ...(ngDevMode ? [{ debugName: "dialogOpen", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Event to emit when dialog is opened */
    open = output();
    /** Event to emit to download assets */
    download = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ViolinMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: ViolinMenuComponent, isStandalone: true, selector: "cde-violin-menu", inputs: { dialogOpen: { classPropertyName: "dialogOpen", publicName: "dialogOpen", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "open", download: "download" }, ngImport: i0, template: "<button\n  mat-icon-button\n  [matMenuTriggerFor]=\"menu\"\n  hraIconButtonSize=\"large\"\n  aria-label=\"Icon to open nested menu\"\n  hraPlainTooltip=\"More\"\n  (click)=\"$event.stopPropagation()\"\n  hraClickEvent\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n<mat-menu #menu=\"matMenu\" class=\"violin-overlay\">\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"infoSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    (click)=\"$event.stopImmediatePropagation()\"\n    hraFeature=\"info\"\n    hraClickEvent\n    hraHoverEvent\n    hraHoverEventTriggerOn=\"mouseenter\"\n  >\n    <mat-icon>info</mat-icon>\n    <span>Info</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"downloadSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    (click)=\"$event.stopImmediatePropagation()\"\n    hraFeature=\"download\"\n    hraClickEvent\n  >\n    <mat-icon>download</mat-icon>\n    <span>Downloads</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  @if (!dialogOpen()) {\n    <button mat-menu-item (click)=\"open.emit()\" hraFeature=\"fullscreen\" hraClickEvent>\n      <mat-icon>fullscreen</mat-icon>\n      Full Screen\n    </button>\n  }\n  <a\n    mat-menu-item\n    href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed-app\"\n    hraClickEvent\n  >\n    <mat-icon>code</mat-icon>\n    Embed App\n  </a>\n  <mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\" hraFeature=\"violin-info-submenu\">\n    This violin plot shows a cell-to-nearest-anchor cell distance distributions categorized by each cell type in the\n    dataset.\n  </mat-menu>\n  <mat-menu #downloadSubMenu=\"matMenu\" class=\"download-sub-menu\" hraFeature=\"download\">\n    <button\n      mat-menu-item\n      (click)=\"$event.stopPropagation(); download.emit('png')\"\n      hraFeature=\"download-png\"\n      hraClickEvent\n    >\n      <mat-icon>download</mat-icon>\n      PNG\n    </button>\n    <button\n      mat-menu-item\n      (click)=\"$event.stopPropagation(); download.emit('svg')\"\n      hraFeature=\"download-svg\"\n      hraClickEvent\n    >\n      <mat-icon>download</mat-icon>\n      SVG\n    </button>\n  </mat-menu>\n</mat-menu>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i3.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i3.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i3.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2$2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i5$1.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ViolinMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-violin-menu', imports: [HraCommonModule, MatIconModule, MatMenuModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  [matMenuTriggerFor]=\"menu\"\n  hraIconButtonSize=\"large\"\n  aria-label=\"Icon to open nested menu\"\n  hraPlainTooltip=\"More\"\n  (click)=\"$event.stopPropagation()\"\n  hraClickEvent\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n<mat-menu #menu=\"matMenu\" class=\"violin-overlay\">\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"infoSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    (click)=\"$event.stopImmediatePropagation()\"\n    hraFeature=\"info\"\n    hraClickEvent\n    hraHoverEvent\n    hraHoverEventTriggerOn=\"mouseenter\"\n  >\n    <mat-icon>info</mat-icon>\n    <span>Info</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  <button\n    mat-menu-item\n    [matMenuTriggerFor]=\"downloadSubMenu\"\n    matRipple\n    matRippleColor=\"#201E3D14\"\n    (click)=\"$event.stopImmediatePropagation()\"\n    hraFeature=\"download\"\n    hraClickEvent\n  >\n    <mat-icon>download</mat-icon>\n    <span>Downloads</span>\n    <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n  </button>\n  @if (!dialogOpen()) {\n    <button mat-menu-item (click)=\"open.emit()\" hraFeature=\"fullscreen\" hraClickEvent>\n      <mat-icon>fullscreen</mat-icon>\n      Full Screen\n    </button>\n  }\n  <a\n    mat-menu-item\n    href=\"https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed-app\"\n    hraClickEvent\n  >\n    <mat-icon>code</mat-icon>\n    Embed App\n  </a>\n  <mat-menu #infoSubMenu=\"matMenu\" class=\"info-sub-menu\" hraFeature=\"violin-info-submenu\">\n    This violin plot shows a cell-to-nearest-anchor cell distance distributions categorized by each cell type in the\n    dataset.\n  </mat-menu>\n  <mat-menu #downloadSubMenu=\"matMenu\" class=\"download-sub-menu\" hraFeature=\"download\">\n    <button\n      mat-menu-item\n      (click)=\"$event.stopPropagation(); download.emit('png')\"\n      hraFeature=\"download-png\"\n      hraClickEvent\n    >\n      <mat-icon>download</mat-icon>\n      PNG\n    </button>\n    <button\n      mat-menu-item\n      (click)=\"$event.stopPropagation(); download.emit('svg')\"\n      hraFeature=\"download-svg\"\n      hraClickEvent\n    >\n      <mat-icon>download</mat-icon>\n      SVG\n    </button>\n  </mat-menu>\n</mat-menu>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { dialogOpen: [{ type: i0.Input, args: [{ isSignal: true, alias: "dialogOpen", required: false }] }], open: [{ type: i0.Output, args: ["open"] }], download: [{ type: i0.Output, args: ["download"] }] } });

var $schema = "https://vega.github.io/schema/vega-lite/v5.json";
var spacing = -2;
var background = "#fcfcfc";
var config = {
	font: "Metropolis",
	padding: {
		top: 0,
		right: 12,
		bottom: 12,
		left: 12
	},
	view: {
		stroke: "transparent"
	},
	axis: {
		labelFontSize: 12,
		titleFontSize: 14,
		titleFontWeight: 500,
		labelFontWeight: 500,
		titleLineHeight: 21,
		labelLineHeight: 18,
		titleColor: "#201E3D",
		labelColor: "#4B4B5E",
		ticks: false,
		labelPadding: 8
	},
	scale: {
		continuousPadding: 20
	}
};
var data = {
	name: "data",
	values: [
	]
};
var params = [
	{
		name: "colors",
		value: [
		]
	}
];
var transform = [
	{
		joinaggregate: [
			{
				op: "count",
				as: "Count"
			}
		],
		groupby: [
			"type"
		]
	}
];
var facet = {
	row: {
		field: "type",
		sort: {
			field: "Count",
			order: "descending"
		},
		title: "Cell Types",
		header: {
			labelAngle: 0,
			labelPadding: 4,
			labelAlign: "left",
			labelLimit: 100,
			labelBaseline: "middle",
			titlePadding: 8,
			labelFontSize: 12,
			titleFontSize: 14,
			titleFontWeight: 500,
			labelFontWeight: 500
		}
	}
};
var resolve = {
	scale: {
		y: "independent"
	}
};
var spec = {
	height: 35,
	width: 0,
	layer: [
		{
			mark: {
				type: "area",
				stroke: "black",
				strokeWidth: 0.5
			},
			transform: [
				{
					density: "distance",
					bandwidth: 0,
					groupby: [
						"type"
					]
				}
			],
			encoding: {
				x: {
					field: "value",
					type: "quantitative",
					title: "Distance (µm)",
					axis: {
						orient: "top",
						minExtent: 25,
						labelFlush: false,
						grid: true,
						labelAngle: 0,
						labelOverlap: true,
						labelSeparation: 4
					},
					scale: {
						domainMin: 0
					}
				},
				y: {
					field: "density",
					type: "quantitative",
					stack: "center",
					impute: null,
					title: null,
					axis: {
						labels: false,
						grid: false
					},
					scale: {
						nice: false,
						padding: 4
					}
				},
				color: {
					field: "type",
					legend: null,
					scale: {
						range: [
							{
								expr: "'Replaced/repeated in javascript' && colors[0] || '#000'"
							}
						]
					}
				},
				tooltip: {
					field: "type",
					type: "nominal"
				}
			}
		},
		{
			mark: {
				type: "boxplot",
				extent: "min-max",
				size: 4
			},
			encoding: {
				x: {
					field: "distance",
					type: "quantitative",
					title: "Distance (µm)",
					scale: {
						domainMin: 0
					}
				},
				color: {
					value: "black"
				}
			}
		}
	]
};
var violin_vl = {
	$schema: $schema,
	spacing: spacing,
	background: background,
	config: config,
	data: data,
	params: params,
	transform: transform,
	facet: facet,
	resolve: resolve,
	spec: spec
};

var VIOLIN_SPEC = /*#__PURE__*/Object.freeze({
    __proto__: null,
    $schema: $schema,
    background: background,
    config: config,
    data: data,
    default: violin_vl,
    facet: facet,
    params: params,
    resolve: resolve,
    spacing: spacing,
    spec: spec,
    transform: transform
});

/** Fonts used in the violin */
const VIOLIN_FONTS = ['12px Metropolis', '14px Metropolis'];
/** Width of the exported image */
const EXPORT_IMAGE_WIDTH = 1000;
/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT = 40;
/** Padding for the exported image */
const EXPORT_IMAGE_PADDING = 16;
/** Minimum height for individual violin plots */
const MIN_VIOLIN_HEIGHT = 20;
/** Maximum height for individual violin plots */
const MAX_VIOLIN_HEIGHT = 35;
/** Width offset for individual violin plots */
const VIOLIN_WIDTH_OFFSET = 170;
/** Height offset for individual violin plots */
const VIOLIN_HEIGHT_OFFSET = 76;
/** Configuration for the legend in the exported image */
const EXPORT_IMAGE_LEGEND_CONFIG = {
    title: null,
    symbolType: 'circle',
    symbolStrokeWidth: 10,
    labelFontSize: 14,
    titleFontSize: 14,
    titleLineHeight: 21,
    titleColor: '#201E3D',
    titleFontWeight: 500,
    labelFontWeight: 500,
    labelColor: '#4B4B5E',
    symbolStrokeColor: 'type',
    symbolSize: 400,
};
/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH = 2000;
/** Dynamic color range for the violin */
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
    .fill(0)
    .map((_value, index) => ({ expr: `colors[${index}] || '#000'` }));
/**
 * Violin Component
 */
class ViolinComponent {
    /** Tooltip position configuration */
    tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;
    /** Tooltip content */
    tooltipContent = [
        {
            description: 'The graph shows a histogram of cell-to-nearest-anchor cell distance distributions categorized by each cell type in the dataset.',
        },
    ];
    /** State indicating whether the info panel is open */
    infoOpen = false;
    /** Data for the violin visualization */
    data = input.required(...(ngDevMode ? [{ debugName: "data" }] : []));
    /** Colors for the violin visualization */
    colors = input.required(...(ngDevMode ? [{ debugName: "colors" }] : []));
    /** Reference to the document object */
    document = inject(DOCUMENT);
    /** Reference to the renderer for DOM manipulation */
    renderer = inject(Renderer2);
    /** Service for saving files */
    fileSaver = inject(FileSaverService);
    /** Element reference for the violin container */
    violinEl = viewChild.required(FullscreenPortalComponent);
    /** Vega view instance for the violin */
    view = signal(undefined, ...(ngDevMode ? [{ debugName: "view" }] : []));
    /** Number of colors (cell types) in the visualization */
    colorCount = signal(0, ...(ngDevMode ? [{ debugName: "colorCount" }] : []));
    /** Whether vertical scrolling should be enabled for the violin visualization */
    enableScroll = signal(false, ...(ngDevMode ? [{ debugName: "enableScroll" }] : []));
    /** Effect for updating view data */
    viewDataRef = effect(() => {
        const view = this.view();
        const data = this.data();
        if (view && data.length > 0) {
            view.data('data', data).run();
        }
    }, ...(ngDevMode ? [{ debugName: "viewDataRef" }] : []));
    /** Effect for updating view colors */
    viewColorsRef = effect(() => {
        if (this.view() && this.view()?.getState()) {
            this.view()?.signal('colors', this.colors()).run();
            this.colorCount.set(this.view()?.getState().signals.colors.length);
            this.resizeAndSyncView();
        }
    }, ...(ngDevMode ? [{ debugName: "viewColorsRef" }] : []));
    /** Effect for creating the Vega view */
    viewCreateRef = effect(async (onCleanup) => {
        const container = this.violinEl().rootNodes()[0];
        const el = container.querySelector('.violin-container');
        await this.ensureFontsLoaded();
        const spec = produce(VIOLIN_SPEC, (draft) => {
            for (const layer of draft.spec.layer) {
                if (layer.encoding.color.legend === null) {
                    layer.encoding.color.scale = { range: DYNAMIC_COLOR_RANGE };
                }
            }
            draft.spec.width = el.clientWidth - VIOLIN_WIDTH_OFFSET;
            draft.spec.height = MAX_VIOLIN_HEIGHT;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { finalize, view } = await embed(el, spec, {
            actions: false,
        });
        onCleanup(finalize);
        this.view.set(view);
    }, ...(ngDevMode ? [{ debugName: "viewCreateRef" }] : []));
    /** Resizes view after full screen toggle or viewport resize */
    /* istanbul ignore next */
    resizeAndSyncView() {
        setTimeout(() => {
            const view = this.view();
            if (view) {
                const container = this.violinEl().rootNodes()[0];
                const el = container.querySelector('.violin');
                if (el) {
                    if (this.calculateViolinHeight(el.clientHeight) < MIN_VIOLIN_HEIGHT) {
                        view.signal('child_height', MAX_VIOLIN_HEIGHT);
                        this.enableScroll.set(true);
                    }
                    else {
                        view.signal('child_height', this.calculateViolinHeight(el.clientHeight));
                        this.enableScroll.set(false);
                    }
                    view.signal('child_width', el.clientWidth - VIOLIN_WIDTH_OFFSET);
                }
                view.resize().runAsync();
            }
        });
    }
    /**
     * Calculates violin plot height (in px) based on container height and number of entries
     * @param boxH container height
     * @returns Violin plot height
     */
    calculateViolinHeight(boxH) {
        return Math.min(MAX_VIOLIN_HEIGHT, (boxH - VIOLIN_HEIGHT_OFFSET) / this.colorCount());
    }
    /** Download the violin as an image in the specified format */
    /* istanbul ignore next */
    async download(format) {
        const spec = produce(VIOLIN_SPEC, (draft) => {
            draft.spec.width = EXPORT_IMAGE_WIDTH;
            for (const layer of draft.spec.layer) {
                if (layer.encoding.color.legend === null) {
                    layer.encoding.color.legend = EXPORT_IMAGE_LEGEND_CONFIG;
                    layer.encoding.color.scale = { range: this.colors() };
                }
            }
            draft.spec.height = EXPORT_IMAGE_HEIGHT;
            draft.config.padding.bottom = EXPORT_IMAGE_PADDING;
            draft.config.padding.top = EXPORT_IMAGE_PADDING;
            draft.config.padding.right = EXPORT_IMAGE_PADDING;
            draft.config.padding.left = EXPORT_IMAGE_PADDING;
            draft.data.values = this.data();
        });
        const el = this.renderer.createElement('div');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { view, finalize } = await embed(el, spec, {
            actions: false,
        });
        const url = await view.toImageURL(format);
        this.fileSaver.save(url, `cde-violin.${format}`);
        finalize();
    }
    /** Ensure required fonts are loaded for the violin */
    async ensureFontsLoaded() {
        const loadPromises = VIOLIN_FONTS.map((font) => this.document.fonts.load(font));
        await Promise.all(loadPromises);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ViolinComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.9", type: ViolinComponent, isStandalone: true, selector: "cde-violin", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: true, transformFunction: null }, colors: { classPropertyName: "colors", publicName: "colors", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "window:resize": "resizeAndSyncView()" } }, viewQueries: [{ propertyName: "violinEl", first: true, predicate: FullscreenPortalComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Violin Graph\" disabled hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-actions>\n    <cde-violin-menu (open)=\"violinEl().open()\" (download)=\"download($event)\" hraFeature=\"menu\"></cde-violin-menu>\n  </hra-expansion-panel-actions>\n  <hra-fullscreen-portal\n    tagline=\"Violin Graph\"\n    (opened)=\"resizeAndSyncView()\"\n    (closed)=\"resizeAndSyncView()\"\n    hraFeature=\"fullscreen-violin\"\n  >\n    <hra-fullscreen-actions>\n      <cde-violin-menu dialogOpen (download)=\"download($event)\" hraFeature=\"fullscreen-violin-menu\"></cde-violin-menu>\n    </hra-fullscreen-actions>\n    <hra-fullscreen-portal-content class=\"violin-fullscreen-portal\" [class.enableScroll]=\"enableScroll()\">\n      <ng-scrollbar class=\"violin\" hraScrollOverflowFade hraFeature=\"violin-scrollbar\">\n        <div class=\"violin-container\" data-testid=\"violin\" #violin></div>\n      </ng-scrollbar>\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{--mat-button-filled-container-height: 2rem;display:block;overflow:hidden}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem 1rem}:host ::ng-deep hra-expansion-panel .content{height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel ng-scrollbar{width:100%}:host hra-fullscreen-portal-content{display:flex}:host hra-fullscreen-portal{height:100%}::ng-deep hra-fullscreen-portal-content{display:flex}::ng-deep hra-fullscreen-portal-content ng-scrollbar{width:100%}::ng-deep hra-fullscreen-portal-content .ng-scroll-content{width:100%!important;max-height:100%;min-height:0rem!important}.enableScroll ::ng-deep .ng-scroll-content{max-height:unset}::ng-deep .violin-container{width:100%;height:100%}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "ngmodule", type: OverlayModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i9.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i3$2.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: FullscreenPortalComponent, selector: "hra-fullscreen-portal", inputs: ["tagline", "panelClass"], outputs: ["beforeOpened", "opened", "beforeClosed", "closed"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelActionsComponent, selector: "hra-expansion-panel-actions" }, { kind: "component", type: FullscreenPortalContentComponent, selector: "hra-fullscreen-portal-content" }, { kind: "component", type: FullscreenActionsComponent, selector: "hra-fullscreen-actions" }, { kind: "component", type: ViolinMenuComponent, selector: "cde-violin-menu", inputs: ["dialogOpen"], outputs: ["open", "download"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ViolinComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-violin', imports: [
                        HraCommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatExpansionModule,
                        OverlayModule,
                        ScrollingModule,
                        MatMenuModule,
                        FullscreenPortalComponent,
                        ExpansionPanelComponent,
                        ExpansionPanelActionsComponent,
                        FullscreenPortalContentComponent,
                        FullscreenActionsComponent,
                        ViolinMenuComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(window:resize)': 'resizeAndSyncView()',
                    }, template: "<hra-expansion-panel tagline=\"Violin Graph\" disabled hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-actions>\n    <cde-violin-menu (open)=\"violinEl().open()\" (download)=\"download($event)\" hraFeature=\"menu\"></cde-violin-menu>\n  </hra-expansion-panel-actions>\n  <hra-fullscreen-portal\n    tagline=\"Violin Graph\"\n    (opened)=\"resizeAndSyncView()\"\n    (closed)=\"resizeAndSyncView()\"\n    hraFeature=\"fullscreen-violin\"\n  >\n    <hra-fullscreen-actions>\n      <cde-violin-menu dialogOpen (download)=\"download($event)\" hraFeature=\"fullscreen-violin-menu\"></cde-violin-menu>\n    </hra-fullscreen-actions>\n    <hra-fullscreen-portal-content class=\"violin-fullscreen-portal\" [class.enableScroll]=\"enableScroll()\">\n      <ng-scrollbar class=\"violin\" hraScrollOverflowFade hraFeature=\"violin-scrollbar\">\n        <div class=\"violin-container\" data-testid=\"violin\" #violin></div>\n      </ng-scrollbar>\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{--mat-button-filled-container-height: 2rem;display:block;overflow:hidden}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem 1rem}:host ::ng-deep hra-expansion-panel .content{height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel ng-scrollbar{width:100%}:host hra-fullscreen-portal-content{display:flex}:host hra-fullscreen-portal{height:100%}::ng-deep hra-fullscreen-portal-content{display:flex}::ng-deep hra-fullscreen-portal-content ng-scrollbar{width:100%}::ng-deep hra-fullscreen-portal-content .ng-scroll-content{width:100%!important;max-height:100%;min-height:0rem!important}.enableScroll ::ng-deep .ng-scroll-content{max-height:unset}::ng-deep .violin-container{width:100%;height:100%}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: true }] }], colors: [{ type: i0.Input, args: [{ isSignal: true, alias: "colors", required: true }] }], violinEl: [{ type: i0.ViewChild, args: [i0.forwardRef(() => FullscreenPortalComponent), { isSignal: true }] }] } });

/**
 * Function to load metadata.
 * @param input - Signal representing the metadata input.
 * @param mixins - Object containing signals for each metadata property.
 * @param loading - Optional observer to track loading state.
 * @returns Signal representing the loaded metadata.
 */
function loadMetadata(input, mixins, loading) {
    const data = loadData(input, JsonFileLoaderService, {}, loading);
    return computed(() => {
        const result = data();
        const metadata = typeof result === 'object' && result !== null ? result : {};
        for (const key in mixins) {
            const value = mixins[key]?.();
            if (value !== undefined && value !== null && !Number.isNaN(value)) {
                metadata[key] = value;
            }
        }
        return metadata;
    });
}

/**
 * Same as angular's `numberAttribute` except it takes the fallback value first and
 * returns a transform function making the fallback parameter actually useful.
 * It also accepts any type as the fallback so undefined etc. can more easily be
 * used instead of NaN.
 */
function numberAttribute(fallback) {
    return (value) => {
        const isNumberValue = !isNaN(parseFloat(value)) && !isNaN(Number(value));
        return isNumberValue ? Number(value) : fallback;
    };
}

/**
 * Compares two arrays for equality, specifically checking if both are empty.
 *
 * @param array1 - The first array to compare.
 * @param array2 - The second array to compare.
 * @returns `true` if both arrays are the same reference or both are empty; otherwise, `false`.
 */
function emptyArrayEquals(array1, array2) {
    return array1 === array2 || (array1.length === 0 && array2.length === 0);
}

/**
 * Manages loading states across multiple asynchronous operations.
 */
class LoadingManager {
    /** A BehaviorSubject holding an array of BehaviorSubjects representing individual loading states */
    observers$ = new BehaviorSubject([]);
    /** An observable that emits a boolean indicating if any of the observers are in a loading state */
    isLoading$ = this.observers$.pipe(switchMap((sources) => combineLatest(sources)), map((values) => values.some((value) => value)), distinctUntilChanged());
    /**
     * Creates a new observer for tracking the loading state of an asynchronous operation.
     * @returns An Observer<boolean> that can be used to update the loading state.
     */
    createObserver() {
        const observers = this.observers$.getValue();
        const observer = new BehaviorSubject(false);
        this.observers$.next([...observers, observer]);
        return observer;
    }
}

/**
 * CDE Visualization Root Component
 */
class CdeVisualizationComponent {
    /** Link to the home page */
    homeLink = input('/', ...(ngDevMode ? [{ debugName: "homeLink" }] : []));
    /** Node data */
    nodes = input(...(ngDevMode ? [undefined, { debugName: "nodes" }] : []));
    /** Node key mapping data */
    nodeKeys = input(...(ngDevMode ? [undefined, { debugName: "nodeKeys" }] : []));
    /** Node target selector used when calculating edges */
    nodeTargetSelector = input(DEFAULT_NODE_TARGET_SELECTOR, ...(ngDevMode ? [{ debugName: "nodeTargetSelector" }] : []));
    /**
     * Column/property of the node's 'Cell Type' values
     *
     * @deprecated Use `nodeKeys` to specify the column instead
     */
    nodeTargetKey = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetKey" }] : []));
    /**
     * Node target selector used when calculating edges
     *
     * @deprecated Use `nodeTargetSelector` instead
     */
    nodeTargetValue = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetValue" }] : []));
    /** Edge data if already calculated */
    edges = input(...(ngDevMode ? [undefined, { debugName: "edges" }] : []));
    /** Edge key mapping data */
    edgeKeys = input(...(ngDevMode ? [undefined, { debugName: "edgeKeys" }] : []));
    /** Max distance to consider when calculating edges */
    maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, ...(ngDevMode ? [{ debugName: "maxEdgeDistance", transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE) }] : [{
            transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE),
        }]));
    /** Color map data */
    colorMap = input(...(ngDevMode ? [undefined, { debugName: "colorMap" }] : []));
    /** Color map key mapping data */
    colorMapKeys = input(...(ngDevMode ? [undefined, { debugName: "colorMapKeys" }] : []));
    /**
     * Column/property of the color map's 'Cell Type' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    colorMapKey = input(...(ngDevMode ? [undefined, { debugName: "colorMapKey" }] : []));
    /**
     * Column/property of the color map's 'Cell Color' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    colorMapValue = input(...(ngDevMode ? [undefined, { debugName: "colorMapValue" }] : []));
    /** Input metadata */
    metadata = input(...(ngDevMode ? [undefined, { debugName: "metadata" }] : []));
    /** Title of the visualization */
    title = input(...(ngDevMode ? [undefined, { debugName: "title" }] : []));
    /** Organ being visualized */
    organ = input(...(ngDevMode ? [undefined, { debugName: "organ" }] : []));
    /** Technology used in the visualization */
    technology = input(...(ngDevMode ? [undefined, { debugName: "technology" }] : []));
    /** Sex of the subject */
    sex = input(...(ngDevMode ? [undefined, { debugName: "sex" }] : []));
    /** Age of the subject */
    age = input(undefined, ...(ngDevMode ? [{ debugName: "age", transform: numberAttribute() }] : [{ transform: numberAttribute() }]));
    /** Thickness of the sample */
    thickness = input(undefined, ...(ngDevMode ? [{ debugName: "thickness", transform: numberAttribute() }] : [{ transform: numberAttribute() }]));
    /** Pixel size in the visualization */
    pixelSize = input(undefined, ...(ngDevMode ? [{ debugName: "pixelSize", transform: numberAttribute() }] : [{ transform: numberAttribute() }]));
    /** Creation timestamp (ms since 1/1/1970 UTC) */
    creationTimestamp = input(undefined, ...(ngDevMode ? [{ debugName: "creationTimestamp", transform: numberAttribute() }] : [{ transform: numberAttribute() }]));
    /** Name of data source file */
    sourceFileName = input(...(ngDevMode ? [undefined, { debugName: "sourceFileName" }] : []));
    /** Name of color map file */
    colorMapFileName = input(...(ngDevMode ? [undefined, { debugName: "colorMapFileName" }] : []));
    /** Event emitted when a node is clicked */
    nodeClick = output();
    /** Event emitted when a node is hovered */
    nodeHover = output();
    /** Emits nodes change */
    // eslint-disable-next-line @angular-eslint/no-output-rename -- Backwards compatibility
    nodesChange = output({ alias: 'nodes' });
    /** Emits edges change */
    // eslint-disable-next-line @angular-eslint/no-output-rename -- Backwards compatibility
    edgesChange = output({ alias: 'edges' });
    /** Emits color map change */
    // eslint-disable-next-line @angular-eslint/no-output-rename -- Backwards compatibility
    colorMapChange = output({ alias: 'colorMap' });
    /** View container. Do NOT change the name. It is used by ngx-color-picker! */
    vcRef = inject(ViewContainerRef);
    /** Whether there are loading resources, etc. */
    loadingManager = new LoadingManager();
    /** Sets the node target selector (uses default if not available) */
    nodeTargetSelectorWithDefault = computed(() => {
        return this.nodeTargetSelector() || this.nodeTargetValue() || DEFAULT_NODE_TARGET_SELECTOR;
    }, ...(ngDevMode ? [{ debugName: "nodeTargetSelectorWithDefault" }] : []));
    /** View of the node data */
    nodesView = loadNodes(this.nodes, this.nodeKeys, this.nodeTargetKey, this.loadingManager.createObserver());
    /** View of the edge data */
    edgesView = withDataViewDefaultGenerator(loadEdges(this.edges, this.edgeKeys, this.loadingManager.createObserver()), createEdgeGenerator(this.nodesView, this.edges, this.nodeTargetSelectorWithDefault, this.maxEdgeDistance, this.loadingManager.createObserver()), EMPTY_EDGES_VIEW, false);
    /** View of the color map */
    colorMapView = withDataViewDefaultGenerator(loadColorMap(this.colorMap, this.colorMapKeys, this.colorMapKey, this.colorMapValue, this.loadingManager.createObserver()), createColorMapGenerator(this.nodesView, this.colorMap), EMPTY_COLOR_MAP_VIEW);
    /** Combined metadata */
    metadataView = loadMetadata(this.metadata, {
        title: this.title,
        organ: this.organ,
        technology: this.technology,
        sex: this.sex,
        age: this.age,
        thickness: this.thickness,
        pixelSize: this.pixelSize,
        creationTimestamp: this.creationTimestamp,
        sourceFileName: this.sourceFileName,
        colorMapFileName: this.colorMapFileName,
    }, this.loadingManager.createObserver());
    /** Filter for node data */
    nodeFilterView = signal(new NodeFilterView(undefined, undefined), ...(ngDevMode ? [{ debugName: "nodeFilterView" }] : []));
    /** List of cell types */
    cellTypes = signal([], ...(ngDevMode ? [{ debugName: "cellTypes" }] : []));
    /** List of selected cell types */
    cellTypesSelection = signal([], ...(ngDevMode ? [{ debugName: "cellTypesSelection", equal: emptyArrayEquals }] : [{ equal: emptyArrayEquals }]));
    /** Counter for resetting cell types */
    cellTypesResetCounter = signal(0, ...(ngDevMode ? [{ debugName: "cellTypesResetCounter" }] : []));
    /** Computed cell types as color map entries */
    cellTypesAsColorMap = computed(() => new ColorMapView(this.cellTypes(), { 'Cell Type': 'name', 'Cell Color': 'color' }), ...(ngDevMode ? [{ debugName: "cellTypesAsColorMap" }] : []));
    /** Function that gets the node type from an edge */
    edgeTypeAccessor = computed(() => {
        const getNodeType = this.nodesView().getCellTypeAt;
        const getNodeIndex = this.edgesView().getCellIDFor;
        return (edge) => getNodeType(getNodeIndex(edge));
    }, ...(ngDevMode ? [{ debugName: "edgeTypeAccessor" }] : []));
    /** Gets current node counts */
    nodeCounts = computed(() => this.nodesView().getCounts(), ...(ngDevMode ? [{ debugName: "nodeCounts" }] : []));
    /** Gets current edge counts */
    edgeCounts = computed(() => this.edgesView().getCounts(this.edgeTypeAccessor()), ...(ngDevMode ? [{ debugName: "edgeCounts" }] : []));
    /** Gets edge counts by source node */
    edgeCountsBySourceNode = computed(() => this.edgesView().getCounts((obj) => `${this.edgesView().getCellIDFor(obj)}`), ...(ngDevMode ? [{ debugName: "edgeCountsBySourceNode" }] : []));
    /** Gets cell type entries from nodes */
    cellTypesFromNodes = computed(() => {
        const nodeCounts = this.nodeCounts();
        const edgeCounts = this.edgeCounts();
        const colorLookup = this.colorMapView().getColorLookup();
        return Array.from(nodeCounts).map(([name, count]) => ({
            name,
            count,
            outgoingEdgeCount: edgeCounts.get(name) ?? 0,
            color: colorLookup.get(name) ?? [255, 255, 255],
        }));
    }, ...(ngDevMode ? [{ debugName: "cellTypesFromNodes" }] : []));
    /** Adjustments for cell type counts */
    countAdjustments = computed(() => {
        const nodes = this.nodesView();
        const edgesCounts = this.edgeCountsBySourceNode();
        const { exclude = [] } = this.nodeFilterView();
        const indices = exclude.filter((entry) => typeof entry === 'number');
        const result = {};
        for (const index of indices) {
            const key = nodes.getCellTypeAt(index);
            result[key] ??= { count: 0, outgoingEdgeCount: 0 };
            result[key].count += 1;
            result[key].outgoingEdgeCount += edgesCounts.get(`${index}`) ?? 0;
        }
        return result;
    }, ...(ngDevMode ? [{ debugName: "countAdjustments" }] : []));
    /** Computed selection of cell types from nodes */
    cellTypesSelectionFromNodes = computed(() => this.cellTypesFromNodes().map((entry) => entry.name), ...(ngDevMode ? [{ debugName: "cellTypesSelectionFromNodes" }] : []));
    /** Effect to create cell types */
    cellTypesCreateRef = effect(() => {
        // Grab dependency on the reset counter
        this.cellTypesResetCounter();
        this.cellTypes.set(this.cellTypesFromNodes());
        this.cellTypesSelection.set(this.cellTypesSelectionFromNodes());
    }, ...(ngDevMode ? [{ debugName: "cellTypesCreateRef" }] : []));
    /** List of filtered cell types based on selection */
    filteredCellTypes = computed(() => {
        const selection = new Set(this.cellTypesSelection());
        selection.delete(this.nodeTargetSelectorWithDefault());
        const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
        return filtered.sort((a, b) => b.count - a.count);
    }, ...(ngDevMode ? [{ debugName: "filteredCellTypes", equal: emptyArrayEquals }] : [{ equal: emptyArrayEquals }]));
    /** Computed distances between nodes */
    distances = computed(() => this.computeDistances(), ...(ngDevMode ? [{ debugName: "distances", equal: emptyArrayEquals }] : [{ equal: emptyArrayEquals }]));
    /** Data for the histogram visualization */
    filteredDistances = computed(() => this.computeFilteredDistances(), ...(ngDevMode ? [{ debugName: "filteredDistances", equal: emptyArrayEquals }] : [{ equal: emptyArrayEquals }]));
    /** Colors for the histogram visualization */
    filteredColors = computed(() => this.computeFilteredColors(), ...(ngDevMode ? [{ debugName: "filteredColors", equal: emptyArrayEquals }] : [{ equal: emptyArrayEquals }]));
    /** Injected file saver service */
    fileSaver = inject(FileSaverService);
    /** Setup component */
    constructor() {
        // Workaround for getting ngx-color-picker to attach to the root view
        // Not populated for standalone/custom components so we forcefully insert ourself
        inject(ApplicationRef).componentTypes.splice(0, 0, CdeVisualizationComponent);
        effect(() => {
            const selection = this.cellTypesSelection();
            const filter = untracked(this.nodeFilterView);
            this.nodeFilterView.set(new NodeFilterView(selection, filter.exclude));
        });
        // Connect outputs
        this.bindDataOutput(this.nodesView, this.nodesChange);
        this.bindDataOutput(this.edgesView, this.edgesChange);
        this.bindDataOutput(this.colorMapView, this.colorMapChange);
    }
    /** Reset cell types */
    resetCellTypes() {
        this.cellTypesResetCounter.set(this.cellTypesResetCounter() + 1);
    }
    /** Update the color of a specific cell type entry */
    updateColor(entry, color) {
        const entries = this.cellTypes();
        const index = entries.indexOf(entry);
        const copy = [...entries];
        copy[index] = { ...copy[index], color };
        this.cellTypes.set(copy);
    }
    /** Downloads nodes */
    async downloadNodes() {
        const nodes = this.nodesView();
        const filter = nodes.createFilter(this.nodeFilterView());
        await this.downloadView(nodes, 'nodes.csv', { filter });
    }
    /** Downloads edges */
    async downloadEdges() {
        const nodes = this.nodesView();
        const edges = this.edgesView();
        const filter = edges.createFilter(nodes, this.nodeFilterView());
        const computedColumns = {
            Distance: edges.getDistanceFor,
        };
        const reindex = await nodes.createReindexer(this.nodeFilterView());
        const transform = (value, key) => {
            return key === 'Cell ID' || key === 'Target ID' ? reindex[value] : value;
        };
        await this.downloadView(edges, 'edges.csv', { filter, computedColumns, transform });
    }
    /** Downloads color map */
    async downloadColorMap() {
        const colorMap = this.cellTypesAsColorMap();
        const filter = colorMap.createFilter(this.nodeFilterView());
        await this.downloadView(colorMap, 'color-map.csv', { filter });
    }
    /** Downlaods view */
    async downloadView(view, filename, options) {
        if (view.length > 0) {
            const data = await toCsv(view, options);
            this.fileSaver.saveData(data, filename);
        }
    }
    /** Compute distances between nodes based on edges */
    computeDistances() {
        const nodes = this.nodesView();
        const edges = this.edgesView();
        if (nodes.length === 0 || edges.length === 0) {
            return [];
        }
        const selectedCellType = this.nodeTargetSelectorWithDefault();
        const distances = [];
        for (const edge of edges) {
            const type = nodes.getCellTypeAt(edges.getCellIDFor(edge));
            if (type !== selectedCellType) {
                distances.push({ edge, type, distance: edges.getDistanceFor(edge) });
            }
        }
        return distances;
    }
    /** Compute data for the violin visualization */
    computeFilteredDistances() {
        const distances = this.distances();
        const nodeFilter = this.nodeFilterView();
        const edgeFilterFn = this.edgesView().createFilter(this.nodesView(), this.nodeFilterView());
        if (nodeFilter.isEmpty()) {
            return distances;
        }
        return distances.filter(({ edge }) => edgeFilterFn(edge, -1));
    }
    /** Compute colors for the violin visualization */
    computeFilteredColors() {
        return this.filteredCellTypes()
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map(({ color }) => rgbToHex(color));
    }
    /** Binds data output */
    bindDataOutput(view, outputRef) {
        effect(() => {
            if (view().length !== 0) {
                outputRef.emit(view().data);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: CdeVisualizationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: CdeVisualizationComponent, isStandalone: true, selector: "cde-visualization-root", inputs: { homeLink: { classPropertyName: "homeLink", publicName: "homeLink", isSignal: true, isRequired: false, transformFunction: null }, nodes: { classPropertyName: "nodes", publicName: "nodes", isSignal: true, isRequired: false, transformFunction: null }, nodeKeys: { classPropertyName: "nodeKeys", publicName: "nodeKeys", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetSelector: { classPropertyName: "nodeTargetSelector", publicName: "nodeTargetSelector", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetKey: { classPropertyName: "nodeTargetKey", publicName: "nodeTargetKey", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetValue: { classPropertyName: "nodeTargetValue", publicName: "nodeTargetValue", isSignal: true, isRequired: false, transformFunction: null }, edges: { classPropertyName: "edges", publicName: "edges", isSignal: true, isRequired: false, transformFunction: null }, edgeKeys: { classPropertyName: "edgeKeys", publicName: "edgeKeys", isSignal: true, isRequired: false, transformFunction: null }, maxEdgeDistance: { classPropertyName: "maxEdgeDistance", publicName: "maxEdgeDistance", isSignal: true, isRequired: false, transformFunction: null }, colorMap: { classPropertyName: "colorMap", publicName: "colorMap", isSignal: true, isRequired: false, transformFunction: null }, colorMapKeys: { classPropertyName: "colorMapKeys", publicName: "colorMapKeys", isSignal: true, isRequired: false, transformFunction: null }, colorMapKey: { classPropertyName: "colorMapKey", publicName: "colorMapKey", isSignal: true, isRequired: false, transformFunction: null }, colorMapValue: { classPropertyName: "colorMapValue", publicName: "colorMapValue", isSignal: true, isRequired: false, transformFunction: null }, metadata: { classPropertyName: "metadata", publicName: "metadata", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, organ: { classPropertyName: "organ", publicName: "organ", isSignal: true, isRequired: false, transformFunction: null }, technology: { classPropertyName: "technology", publicName: "technology", isSignal: true, isRequired: false, transformFunction: null }, sex: { classPropertyName: "sex", publicName: "sex", isSignal: true, isRequired: false, transformFunction: null }, age: { classPropertyName: "age", publicName: "age", isSignal: true, isRequired: false, transformFunction: null }, thickness: { classPropertyName: "thickness", publicName: "thickness", isSignal: true, isRequired: false, transformFunction: null }, pixelSize: { classPropertyName: "pixelSize", publicName: "pixelSize", isSignal: true, isRequired: false, transformFunction: null }, creationTimestamp: { classPropertyName: "creationTimestamp", publicName: "creationTimestamp", isSignal: true, isRequired: false, transformFunction: null }, sourceFileName: { classPropertyName: "sourceFileName", publicName: "sourceFileName", isSignal: true, isRequired: false, transformFunction: null }, colorMapFileName: { classPropertyName: "colorMapFileName", publicName: "colorMapFileName", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { nodeClick: "nodeClick", nodeHover: "nodeHover", nodesChange: "nodes", edgesChange: "edges", colorMapChange: "colorMap" }, host: { classAttribute: "hra-app" }, ngImport: i0, template: "<ng-container hraFeature=\"cde-visualization\">\n  @if (loadingManager.isLoading$ | async) {\n    <mat-progress-bar class=\"progress\" mode=\"indeterminate\" hraFeature=\"loading-progress\"></mat-progress-bar>\n  }\n\n  <div class=\"metadata\">\n    <cde-metadata [metadata]=\"metadataView()\" hraFeature=\"metadata\"></cde-metadata>\n    <cde-cell-types\n      [(cellTypes)]=\"cellTypes\"\n      [(cellTypesSelection)]=\"cellTypesSelection\"\n      [selectedCellType]=\"nodeTargetSelector()\"\n      [countAdjustments]=\"countAdjustments()\"\n      (downloadNodes)=\"downloadNodes()\"\n      (downloadEdges)=\"downloadEdges()\"\n      (downloadColorMap)=\"downloadColorMap()\"\n      (resetAllColors)=\"histogram.resetAllCellsColor(); resetCellTypes()\"\n      hraFeature=\"cell-types\"\n      #cellTypesTable\n    ></cde-cell-types>\n  </div>\n\n  <div class=\"visualizations\">\n    <div class=\"top\">\n      <cde-node-dist-visualization\n        [nodes]=\"nodesView()\"\n        [edges]=\"edgesView()\"\n        [maxEdgeDistance]=\"maxEdgeDistance()\"\n        [colorMap]=\"cellTypesAsColorMap()\"\n        [(nodeFilter)]=\"nodeFilterView\"\n        (nodeClick)=\"nodeClick.emit($event)\"\n        (nodeHover)=\"nodeHover.emit($event)\"\n        (resetAllCells)=\"resetCellTypes()\"\n        hraFeature=\"visualization\"\n      ></cde-node-dist-visualization>\n\n      <cde-violin [colors]=\"filteredColors()\" [data]=\"filteredDistances()\" hraFeature=\"violin-graph\"></cde-violin>\n    </div>\n\n    <cde-histogram\n      [colors]=\"filteredColors()\"\n      [data]=\"filteredDistances()\"\n      [filteredCellTypes]=\"filteredCellTypes()\"\n      (updateColor)=\"updateColor($event.entry, $event.color)\"\n      hraFeature=\"histogram\"\n      #histogram\n    ></cde-histogram>\n  </div>\n</ng-container>\n", styles: [":host{width:100%;height:100%;display:grid;position:relative;grid-template-columns:22.75rem minmax(64.1875rem,calc(100% - 22.75rem));grid-template-rows:3.5rem minmax(548px,calc(100% - 3.5rem));grid-template-areas:\"metadata visualization\" \"metadata visualization\";color:var(--mat-sys-secondary);background:var(--mat-sys-surface-container-low)}:host .progress{position:absolute;inset:0 0 auto;--mat-progress-bar-active-indicator-color: var(--mat-sys-tertiary)}:host .metadata{display:flex;flex-direction:column;grid-area:metadata}:host .metadata cde-metadata{width:100%;height:fit-content;border-bottom:2px solid var(--mat-sys-outline-variant)}:host .visualizations{grid-area:visualization;display:flex;flex-direction:column;overflow:hidden}:host .visualizations .top{display:flex;height:0;flex-grow:1}:host .visualizations cde-node-dist-visualization{height:100%;min-width:32.75rem;flex-grow:1}:host .visualizations cde-node-dist-visualization ::ng-deep .header{border-left:2px solid var(--mat-sys-outline-variant);border-right:2px solid var(--mat-sys-outline-variant)}:host .visualizations cde-histogram{border-left:2px solid var(--mat-sys-outline-variant)}:host .visualizations cde-violin{height:100%;width:31.5rem;border-bottom:2px solid var(--mat-sys-outline-variant)}::ng-deep .metadata-overlay .mat-mdc-menu-content,::ng-deep .histogram-overlay .mat-mdc-menu-content,::ng-deep .vis-overlay .mat-mdc-menu-content,::ng-deep .violin-overlay .mat-mdc-menu-content{background-color:var(--mat-sys-on-primary);color:var(--mat-sys-secondary)}::ng-deep .metadata-overlay .mat-mdc-menu-content .mat-mdc-menu-item,::ng-deep .histogram-overlay .mat-mdc-menu-content .mat-mdc-menu-item,::ng-deep .vis-overlay .mat-mdc-menu-content .mat-mdc-menu-item,::ng-deep .violin-overlay .mat-mdc-menu-content .mat-mdc-menu-item{--mat-menu-item-leading-spacing: 1rem;--mat-menu-item-trailing-spacing: 1rem}::ng-deep .metadata-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text,::ng-deep .histogram-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text,::ng-deep .vis-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text,::ng-deep .violin-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{font:var(--mat-sys-label-medium)}::ng-deep div.mat-mdc-menu-panel{max-width:260px;min-width:208px}::ng-deep div.mat-mdc-menu-panel.info-sub-menu .mat-mdc-menu-content{padding:.75rem 1rem;background-color:var(--mat-sys-on-primary);font:var(--mat-sys-label-medium)}::ng-deep div.mat-mdc-menu-panel.download-sub-menu .mat-mdc-menu-content{background-color:var(--mat-sys-on-primary);font:var(--mat-sys-label-medium)}::ng-deep div.mat-mdc-menu-panel.download-sub-menu .mat-mdc-menu-content .mat-mdc-menu-item-text{font:var(--mat-sys-label-medium)}::ng-deep .download-snackbar-panel{translate:0 -2rem;text-align:center;--mat-snack-bar-container-color: var(--mat-sys-inverse-surface);--mat-snack-bar-supporting-text-color: var(--mat-sys-surface)}::ng-deep .download-snackbar-panel .mdc-snackbar__surface{border-radius:.5rem!important;min-width:13rem!important}::ng-deep .download-snackbar-panel button[mat-button][matSnackBarAction]{color:var(--mat-sys-inverse-primary)}::ng-deep .download-snackbar-panel button[mat-icon-button]{--mat-icon-button-icon-color: var(--mat-sys-surface)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatProgressBarModule }, { kind: "component", type: i2$3.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }, { kind: "component", type: CellTypesComponent, selector: "cde-cell-types", inputs: ["cellTypes", "cellTypesSelection", "selectedCellType", "countAdjustments"], outputs: ["cellTypesChange", "cellTypesSelectionChange", "downloadColorMap", "downloadNodes", "downloadEdges", "resetAllColors"] }, { kind: "component", type: HistogramComponent, selector: "cde-histogram", inputs: ["data", "colors", "filteredCellTypes"], outputs: ["updateColor"] }, { kind: "component", type: MetadataComponent, selector: "cde-metadata", inputs: ["metadata"] }, { kind: "component", type: NodeDistVisualizationComponent, selector: "cde-node-dist-visualization", inputs: ["nodes", "edges", "colorMap", "nodeFilter", "maxEdgeDistance"], outputs: ["nodeFilterChange", "nodeClick", "nodeHover"] }, { kind: "component", type: ViolinComponent, selector: "cde-violin", inputs: ["data", "colors"] }, { kind: "pipe", type: i10.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: CdeVisualizationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-visualization-root', imports: [
                        HraCommonModule,
                        MatProgressBarModule,
                        CellTypesComponent,
                        HistogramComponent,
                        MetadataComponent,
                        NodeDistVisualizationComponent,
                        ViolinComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'hra-app',
                    }, template: "<ng-container hraFeature=\"cde-visualization\">\n  @if (loadingManager.isLoading$ | async) {\n    <mat-progress-bar class=\"progress\" mode=\"indeterminate\" hraFeature=\"loading-progress\"></mat-progress-bar>\n  }\n\n  <div class=\"metadata\">\n    <cde-metadata [metadata]=\"metadataView()\" hraFeature=\"metadata\"></cde-metadata>\n    <cde-cell-types\n      [(cellTypes)]=\"cellTypes\"\n      [(cellTypesSelection)]=\"cellTypesSelection\"\n      [selectedCellType]=\"nodeTargetSelector()\"\n      [countAdjustments]=\"countAdjustments()\"\n      (downloadNodes)=\"downloadNodes()\"\n      (downloadEdges)=\"downloadEdges()\"\n      (downloadColorMap)=\"downloadColorMap()\"\n      (resetAllColors)=\"histogram.resetAllCellsColor(); resetCellTypes()\"\n      hraFeature=\"cell-types\"\n      #cellTypesTable\n    ></cde-cell-types>\n  </div>\n\n  <div class=\"visualizations\">\n    <div class=\"top\">\n      <cde-node-dist-visualization\n        [nodes]=\"nodesView()\"\n        [edges]=\"edgesView()\"\n        [maxEdgeDistance]=\"maxEdgeDistance()\"\n        [colorMap]=\"cellTypesAsColorMap()\"\n        [(nodeFilter)]=\"nodeFilterView\"\n        (nodeClick)=\"nodeClick.emit($event)\"\n        (nodeHover)=\"nodeHover.emit($event)\"\n        (resetAllCells)=\"resetCellTypes()\"\n        hraFeature=\"visualization\"\n      ></cde-node-dist-visualization>\n\n      <cde-violin [colors]=\"filteredColors()\" [data]=\"filteredDistances()\" hraFeature=\"violin-graph\"></cde-violin>\n    </div>\n\n    <cde-histogram\n      [colors]=\"filteredColors()\"\n      [data]=\"filteredDistances()\"\n      [filteredCellTypes]=\"filteredCellTypes()\"\n      (updateColor)=\"updateColor($event.entry, $event.color)\"\n      hraFeature=\"histogram\"\n      #histogram\n    ></cde-histogram>\n  </div>\n</ng-container>\n", styles: [":host{width:100%;height:100%;display:grid;position:relative;grid-template-columns:22.75rem minmax(64.1875rem,calc(100% - 22.75rem));grid-template-rows:3.5rem minmax(548px,calc(100% - 3.5rem));grid-template-areas:\"metadata visualization\" \"metadata visualization\";color:var(--mat-sys-secondary);background:var(--mat-sys-surface-container-low)}:host .progress{position:absolute;inset:0 0 auto;--mat-progress-bar-active-indicator-color: var(--mat-sys-tertiary)}:host .metadata{display:flex;flex-direction:column;grid-area:metadata}:host .metadata cde-metadata{width:100%;height:fit-content;border-bottom:2px solid var(--mat-sys-outline-variant)}:host .visualizations{grid-area:visualization;display:flex;flex-direction:column;overflow:hidden}:host .visualizations .top{display:flex;height:0;flex-grow:1}:host .visualizations cde-node-dist-visualization{height:100%;min-width:32.75rem;flex-grow:1}:host .visualizations cde-node-dist-visualization ::ng-deep .header{border-left:2px solid var(--mat-sys-outline-variant);border-right:2px solid var(--mat-sys-outline-variant)}:host .visualizations cde-histogram{border-left:2px solid var(--mat-sys-outline-variant)}:host .visualizations cde-violin{height:100%;width:31.5rem;border-bottom:2px solid var(--mat-sys-outline-variant)}::ng-deep .metadata-overlay .mat-mdc-menu-content,::ng-deep .histogram-overlay .mat-mdc-menu-content,::ng-deep .vis-overlay .mat-mdc-menu-content,::ng-deep .violin-overlay .mat-mdc-menu-content{background-color:var(--mat-sys-on-primary);color:var(--mat-sys-secondary)}::ng-deep .metadata-overlay .mat-mdc-menu-content .mat-mdc-menu-item,::ng-deep .histogram-overlay .mat-mdc-menu-content .mat-mdc-menu-item,::ng-deep .vis-overlay .mat-mdc-menu-content .mat-mdc-menu-item,::ng-deep .violin-overlay .mat-mdc-menu-content .mat-mdc-menu-item{--mat-menu-item-leading-spacing: 1rem;--mat-menu-item-trailing-spacing: 1rem}::ng-deep .metadata-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text,::ng-deep .histogram-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text,::ng-deep .vis-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text,::ng-deep .violin-overlay .mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{font:var(--mat-sys-label-medium)}::ng-deep div.mat-mdc-menu-panel{max-width:260px;min-width:208px}::ng-deep div.mat-mdc-menu-panel.info-sub-menu .mat-mdc-menu-content{padding:.75rem 1rem;background-color:var(--mat-sys-on-primary);font:var(--mat-sys-label-medium)}::ng-deep div.mat-mdc-menu-panel.download-sub-menu .mat-mdc-menu-content{background-color:var(--mat-sys-on-primary);font:var(--mat-sys-label-medium)}::ng-deep div.mat-mdc-menu-panel.download-sub-menu .mat-mdc-menu-content .mat-mdc-menu-item-text{font:var(--mat-sys-label-medium)}::ng-deep .download-snackbar-panel{translate:0 -2rem;text-align:center;--mat-snack-bar-container-color: var(--mat-sys-inverse-surface);--mat-snack-bar-supporting-text-color: var(--mat-sys-surface)}::ng-deep .download-snackbar-panel .mdc-snackbar__surface{border-radius:.5rem!important;min-width:13rem!important}::ng-deep .download-snackbar-panel button[mat-button][matSnackBarAction]{color:var(--mat-sys-inverse-primary)}::ng-deep .download-snackbar-panel button[mat-icon-button]{--mat-icon-button-icon-color: var(--mat-sys-surface)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { homeLink: [{ type: i0.Input, args: [{ isSignal: true, alias: "homeLink", required: false }] }], nodes: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodes", required: false }] }], nodeKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeKeys", required: false }] }], nodeTargetSelector: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetSelector", required: false }] }], nodeTargetKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetKey", required: false }] }], nodeTargetValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetValue", required: false }] }], edges: [{ type: i0.Input, args: [{ isSignal: true, alias: "edges", required: false }] }], edgeKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgeKeys", required: false }] }], maxEdgeDistance: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxEdgeDistance", required: false }] }], colorMap: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMap", required: false }] }], colorMapKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapKeys", required: false }] }], colorMapKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapKey", required: false }] }], colorMapValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapValue", required: false }] }], metadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "metadata", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], organ: [{ type: i0.Input, args: [{ isSignal: true, alias: "organ", required: false }] }], technology: [{ type: i0.Input, args: [{ isSignal: true, alias: "technology", required: false }] }], sex: [{ type: i0.Input, args: [{ isSignal: true, alias: "sex", required: false }] }], age: [{ type: i0.Input, args: [{ isSignal: true, alias: "age", required: false }] }], thickness: [{ type: i0.Input, args: [{ isSignal: true, alias: "thickness", required: false }] }], pixelSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "pixelSize", required: false }] }], creationTimestamp: [{ type: i0.Input, args: [{ isSignal: true, alias: "creationTimestamp", required: false }] }], sourceFileName: [{ type: i0.Input, args: [{ isSignal: true, alias: "sourceFileName", required: false }] }], colorMapFileName: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapFileName", required: false }] }], nodeClick: [{ type: i0.Output, args: ["nodeClick"] }], nodeHover: [{ type: i0.Output, args: ["nodeHover"] }], nodesChange: [{ type: i0.Output, args: ["nodes"] }], edgesChange: [{ type: i0.Output, args: ["edges"] }], colorMapChange: [{ type: i0.Output, args: ["colorMap"] }] } });

/** Default key for the color map type */
const DEFAULT_COLOR_MAP_KEY = 'Cell Type';
/** Default key for the color map value */
const DEFAULT_COLOR_MAP_VALUE_KEY = 'HEX';
/** Converts a color map array to a lookup map for quick access */
function colorMapToLookup(colorMap, typeKey, colorKey) {
    const lookup = new Map();
    for (const entry of colorMap) {
        lookup.set(entry[typeKey], entry[colorKey]);
    }
    return lookup;
}

/** Service to load color map entries from CSV files */
class ColorMapFileLoaderService {
    /** CSV loader service for handling CSV file loading */
    csvLoader = inject(CsvFileLoaderService);
    /** Loads a color map file and returns an observable of the loading events */
    load(file, options) {
        return this.csvLoader.load(file, options).pipe(map((event) => {
            if (event.type !== 'data') {
                return event;
            }
            return { type: 'data', data: this.parseColorMapEntries(event.data) };
        }));
    }
    /** Parses the raw CSV data into an array of ColorMapEntry objects */
    parseColorMapEntries(data) {
        if (data.length === 0) {
            return [];
        }
        let colorKey;
        for (const [key, value] of Object.entries(data[0])) {
            if (/^\[[\d\s,]+\]$/.test(value.trim())) {
                // Checks for r g b array
                colorKey = key;
                break;
            }
        }
        if (colorKey === undefined) {
            throw new Error('Could not parse color map');
        }
        return data.map((item) => ({ ...item, [colorKey]: JSON.parse(item[colorKey]) }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ColorMapFileLoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ColorMapFileLoaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ColorMapFileLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/** Custom element definition for CdeVisualizationComponent */
const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
    providers: [provideHttpClient(), provideAnimations(), provideDesignSystem()],
});

/**
 * Generated bundle index. Do not edit.
 */

export { CdeVisualizationComponent, CdeVisualizationElement, ColorMapFileLoaderService, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY, TOOLTIP_POSITION_BELOW, TOOLTIP_POSITION_COLOR_PICKER_LABEL, TOOLTIP_POSITION_LEFT_SIDE, TOOLTIP_POSITION_RIGHT_SIDE, colorMapToLookup, loadMetadata };
//# sourceMappingURL=hra-ui-cde-visualization.mjs.map
