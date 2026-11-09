import { provideHttpClient } from '@angular/common/http';
import * as i1 from '@hra-ui/common/analytics';
import { provideAnalytics, withErrorHandler } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideDesignSystem } from '@hra-ui/design-system';
import { PlainTooltipDirective, providePlainTooltipOptions } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { createCustomElement } from '@hra-ui/webcomponents';
import * as i1$1 from '@angular/cdk/a11y';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import { output, ChangeDetectionStrategy, Component, input, model, inject, computed, Injector, viewChild, afterNextRender, linkedSignal, signal, effect, ChangeDetectorRef, ElementRef, viewChildren, Injectable, DestroyRef, ApplicationRef, untracked, Renderer2, afterRenderEffect, Pipe, booleanAttribute, isSignal, CUSTOM_ELEMENTS_SCHEMA, PendingTasks } from '@angular/core';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i2$4 from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as i3$4 from '@angular/material/tabs';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import * as i8 from '@hra-ui/common';
import { HraCommonModule, monitorWidth } from '@hra-ui/common';
import { rgbToHex, hexToRgb, colorEquals } from '@hra-ui/design-system/color-picker';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { DEFAULT_MAX_EDGE_DISTANCE, DEFAULT_NODE_TARGET_SELECTOR } from '@hra-ui/node-dist-vis';
import { loadData, loadNodes, withDataViewDefaultGenerator, loadEdges, createEdgeGenerator, EMPTY_EDGES_VIEW, loadColorMap, createColorMapGenerator, EMPTY_COLOR_MAP_VIEW, NodeFilterView, ColorMapView, toCsv } from '@hra-ui/node-dist-vis/models';
import { map, debounceTime, distinctUntilChanged, pairwise } from 'rxjs';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i5 from '@hra-ui/design-system/scrolling';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from 'ngx-scrollbar';
import { SelectionModel } from '@angular/cdk/collections';
import * as i3$1 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i4$1 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as i2$2 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import * as i2$1 from '@angular/cdk/overlay';
import { Overlay, OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ColorPickerDirective } from 'ngx-color-picker';
import * as i7 from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { MatExpansionModule, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion';
import { FullscreenPortalComponent, FullscreenPortalContentComponent, FullscreenActionsComponent } from '@hra-ui/design-system/fullscreen';
import { produce } from 'immer';
import embed from 'vega-embed';
import { unparse } from 'papaparse';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i2$3 from '@hra-ui/design-system/buttons/text-hyperlink';
import { InfoModalComponent } from '@hra-ui/design-system/modal/info-modal';
import * as i3$2 from '@angular/material/button-toggle';
import * as i1$2 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i3$3 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i6 from '@hra-ui/design-system/navigation-rail';
import { NavigationRailModule } from '@hra-ui/design-system/navigation-rail';
import { JsonFileLoaderService, CsvFileLoaderService } from '@hra-ui/common/fs';

/** Text content for the About sheet, from the panels' former Info menus */
const ABOUT_CONTENT = {
    title: 'About the visualization',
    description: 'What each panel shows and how to explore it.',
    closeLabel: 'Close about',
    sections: [
        {
            heading: 'Metadata',
            description: 'Metadata for this dataset.',
        },
        {
            heading: 'Cell types',
            description: 'Show or hide cell types in the visualization and plots, and update the color of each cell type. ' +
                'Show or hide the cell link columns from Display in the toolbar.',
        },
        {
            heading: 'Spatial view',
            description: 'Each cell and the link from it to its nearest anchor cell.',
            lists: [
                { heading: 'Zoom', items: ['Mouse pinwheel', 'Trackpad pinch'] },
                { heading: 'Pan', items: ['CTRL/CMD + mouse drag', 'Right click + mouse drag', 'Keyboard arrows'] },
                { heading: 'Rotate', items: ['CTRL/CMD + keyboard arrows', 'Mouse drag'] },
            ],
        },
        {
            heading: 'Violin graph',
            description: 'This violin plot shows the cell-to-nearest-anchor cell distance distributions categorized by each cell ' +
                'type in the dataset.',
        },
        {
            heading: 'Histogram',
            description: 'This histogram plot shows the cell-to-nearest-anchor cell distance distributions categorized by each cell ' +
                'type in the dataset.',
        },
    ],
};

/** Counter to keep track of distinct instances */
let idCounter$2 = 0;
/**
 * Describes each panel of the visualization. Rendered inside the drawer when the toolbar's Info item is clicked.
 */
class AboutComponent {
    /** Emits when the close button is clicked */
    closeClick = output();
    /** Id attribute for the title, used to label the drawer */
    titleId = `cde-about-title-${idCounter$2}`;
    /** Id attribute for the description, used to describe the drawer */
    descriptionId = `cde-about-description-${idCounter$2++}`;
    /** Text content */
    content = ABOUT_CONTENT;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: AboutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: AboutComponent, isStandalone: true, selector: "cde-about", outputs: { closeClick: "closeClick" }, ngImport: i0, template: "<div class=\"header\">\n  <h2 class=\"title\" [id]=\"titleId\">{{ content.title }}</h2>\n  <button\n    mat-icon-button\n    class=\"close\"\n    hraFeature=\"close\"\n    hraClickEvent\n    [attr.aria-label]=\"content.closeLabel\"\n    [hraPlainTooltip]=\"content.closeLabel\"\n    (click)=\"closeClick.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <p class=\"description\" [id]=\"descriptionId\">{{ content.description }}</p>\n</div>\n\n<ng-scrollbar class=\"body\" orientation=\"vertical\" hraScrollOverflowFade>\n  <div class=\"sections\">\n    @for (section of content.sections; track section.heading) {\n      <section class=\"section\">\n        <h3 class=\"section-heading\">{{ section.heading }}</h3>\n        <p class=\"section-description\">{{ section.description }}</p>\n        @for (list of section.lists; track list.heading) {\n          <h4 class=\"list-heading\">{{ list.heading }}</h4>\n          <ul class=\"list\">\n            @for (item of list.items; track item) {\n              <li>{{ item }}</li>\n            }\n          </ul>\n        }\n      </section>\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;height:100%;color:var(--mat-sys-on-surface-variant)}:host .header{display:grid;grid-template-columns:1fr auto;grid-template-areas:\"title close\" \"description description\";align-items:center;gap:.25rem .5rem;padding:1rem .75rem 1.5rem 1.5rem}:host .title{grid-area:title;margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking)}:host .close{grid-area:close}:host .description{grid-area:description;margin:0;padding-right:.75rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .body{flex:1;min-height:0}:host .sections{padding:0 1.5rem 1.5rem}:host .section+.section{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--mat-sys-outline-variant)}:host .section-heading{margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking)}:host .section-description{margin:.5rem 0 0;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .list-heading{margin:1rem 0 0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .list{margin:.25rem 0 0;padding-left:1.5rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i4.NgScrollbar, selector: "ng-scrollbar:not([externalViewport]), [ngScrollbar]", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i5.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset", "scrollOverflowFadeBottomOffset"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: AboutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-about', imports: [HraCommonModule, MatIconModule, ButtonsModule, PlainTooltipDirective, ScrollingModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"header\">\n  <h2 class=\"title\" [id]=\"titleId\">{{ content.title }}</h2>\n  <button\n    mat-icon-button\n    class=\"close\"\n    hraFeature=\"close\"\n    hraClickEvent\n    [attr.aria-label]=\"content.closeLabel\"\n    [hraPlainTooltip]=\"content.closeLabel\"\n    (click)=\"closeClick.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <p class=\"description\" [id]=\"descriptionId\">{{ content.description }}</p>\n</div>\n\n<ng-scrollbar class=\"body\" orientation=\"vertical\" hraScrollOverflowFade>\n  <div class=\"sections\">\n    @for (section of content.sections; track section.heading) {\n      <section class=\"section\">\n        <h3 class=\"section-heading\">{{ section.heading }}</h3>\n        <p class=\"section-description\">{{ section.description }}</p>\n        @for (list of section.lists; track list.heading) {\n          <h4 class=\"list-heading\">{{ list.heading }}</h4>\n          <ul class=\"list\">\n            @for (item of list.items; track item) {\n              <li>{{ item }}</li>\n            }\n          </ul>\n        }\n      </section>\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;height:100%;color:var(--mat-sys-on-surface-variant)}:host .header{display:grid;grid-template-columns:1fr auto;grid-template-areas:\"title close\" \"description description\";align-items:center;gap:.25rem .5rem;padding:1rem .75rem 1.5rem 1.5rem}:host .title{grid-area:title;margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking)}:host .close{grid-area:close}:host .description{grid-area:description;margin:0;padding-right:.75rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .body{flex:1;min-height:0}:host .sections{padding:0 1.5rem 1.5rem}:host .section+.section{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--mat-sys-outline-variant)}:host .section-heading{margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking)}:host .section-description{margin:.5rem 0 0;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .list-heading{margin:1rem 0 0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .list{margin:.25rem 0 0;padding-left:1.5rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}\n"] }]
        }], propDecorators: { closeClick: [{ type: i0.Output, args: ["closeClick"] }] } });

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

/** Opens beside the origin: to its right, or to its left where there's no room */
const COLOR_PICKER_POSITIONS = [
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 8 },
    { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 8 },
    { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -8 },
    { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -8 },
];
/**
 * Color picker dialog that opens beside an origin element. It renders in the overlay container,
 * so it keeps the theme in every host and doesn't change the layout around the origin.
 * Apply or a click outside keeps the color, and Cancel or Escape discards it.
 * Closing returns focus to the origin.
 */
class ColorPickerComponent {
    /** Element the picker opens beside. It gets focus back when the picker closes. */
    origin = input.required(...(ngDevMode ? [{ debugName: "origin" }] : /* istanbul ignore next */ []));
    /** Accessible name of the picker dialog */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    /** Whether the picker is open */
    open = model(false, ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    /** Color being edited. Changes when a color is kept. */
    color = model.required(...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    /** Emits the color shown while picking, and the color in effect again when a change is discarded */
    preview = output();
    /** Positions beside the origin */
    positions = COLOR_PICKER_POSITIONS;
    /** Keeps the page from scrolling under the open picker, so a swipe on a phone doesn't move it */
    scrollStrategy = inject(Overlay).scrollStrategies.block();
    /** Hex representation of the color */
    hexColor = computed(() => rgbToHex(this.color()), ...(ngDevMode ? [{ debugName: "hexColor" }] : /* istanbul ignore next */ []));
    /** Injector, used to wait for the picker to render before focusing it */
    injector = inject(Injector);
    /** Picker dialog, while open */
    panel = viewChild('panel', ...(ngDevMode ? [{ debugName: "panel" }] : /* istanbul ignore next */ []));
    /** Color shown while picking */
    previewHex = '';
    /** Starts picking from the current color and moves focus into the picker once it renders */
    handleAttach() {
        this.previewHex = this.hexColor();
        afterNextRender(() => this.panel()?.nativeElement.querySelector('input')?.focus(), { injector: this.injector });
    }
    /**
     * Shows a color while picking
     *
     * @param hex Color shown in the picker
     */
    handleChange(hex) {
        this.previewHex = hex;
        this.preview.emit(hex);
    }
    /**
     * Keeps a color and closes the picker
     *
     * @param hex Color to keep. Defaults to the color shown while picking.
     */
    apply(hex = this.previewHex) {
        const rgb = hexToRgb(hex);
        if (!colorEquals(this.color(), rgb)) {
            this.color.set(rgb);
        }
        this.close();
    }
    /** Discards the color shown while picking and closes the picker */
    cancel() {
        this.preview.emit(this.hexColor());
        this.close();
    }
    /**
     * Discards the color shown while picking when Escape is pressed
     *
     * @param event Keyboard event in the picker
     */
    handleKeydown(event) {
        if (event.key === 'Escape' && !hasModifierKey(event)) {
            event.preventDefault();
            this.cancel();
        }
    }
    /** Closes the picker and returns focus to its origin */
    close() {
        if (this.open()) {
            this.open.set(false);
            this.origin().elementRef.nativeElement.focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "21.2.25", type: ColorPickerComponent, isStandalone: true, selector: "cde-color-picker", inputs: { origin: { classPropertyName: "origin", publicName: "origin", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { open: "openChange", color: "colorChange", preview: "preview" }, viewQueries: [{ propertyName: "panel", first: true, predicate: ["panel"], descendants: true, isSignal: true }], ngImport: i0, template: "<ng-template\n  cdkConnectedOverlay\n  cdkConnectedOverlayPush\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  cdkConnectedOverlayPanelClass=\"cde-color-picker-panel\"\n  [cdkConnectedOverlayOrigin]=\"origin()\"\n  [cdkConnectedOverlayOpen]=\"open()\"\n  [cdkConnectedOverlayPositions]=\"positions\"\n  [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n  (attach)=\"handleAttach()\"\n  (detach)=\"open.set(false)\"\n  (backdropClick)=\"apply()\"\n  (overlayKeydown)=\"handleKeydown($event)\"\n>\n  <div role=\"dialog\" aria-modal=\"true\" cdkTrapFocus [attr.aria-label]=\"label()\" #panel>\n    <span\n      cpDialogDisplay=\"inline\"\n      cpWidth=\"264px\"\n      cpOutputFormat=\"hex\"\n      cpAlphaChannel=\"disabled\"\n      cpOKButtonClass=\"accept-button\"\n      cpOKButtonText=\"Apply\"\n      cpCancelButtonClass=\"cancel-button\"\n      [colorPicker]=\"hexColor()\"\n      [cpToggle]=\"true\"\n      [cpOKButton]=\"true\"\n      [cpCancelButton]=\"true\"\n      (colorPickerChange)=\"handleChange($event)\"\n      (colorPickerSelect)=\"apply($event)\"\n      (colorPickerCancel)=\"cancel()\"\n    ></span>\n  </div>\n</ng-template>\n", styles: ["::ng-deep .cde-color-picker-panel color-picker div.color-picker{position:relative;background-color:var(--mat-sys-surface-container);border-radius:var(--mat-sys-corner-small);border:none;box-shadow:var(--mat-sys-level2)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text{display:flex!important;flex-direction:row-reverse;justify-content:flex-end;padding:0}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box{width:100%;align-items:center}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box:not(:has(input)){margin:0 1rem;padding:0;padding:.25rem 1.25rem;width:auto}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box:not(:has(input)) div{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box:has(input){padding:1.25rem 0;margin-right:1rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box input{box-sizing:border-box;height:2.5rem;padding:0 .9375rem;border:1px solid var(--mat-sys-outline);border-radius:var(--mat-sys-corner-extra-small);background-color:transparent;box-shadow:none;color:var(--mat-sys-on-surface);caret-color:var(--mat-sys-secondary);text-align:start;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box input:hover{border-color:var(--mat-sys-on-surface)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box input:focus{outline:none;padding:0 .875rem;border:2px solid var(--mat-sys-secondary)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .arrow,::ng-deep .cde-color-picker-panel color-picker div.color-picker .type-policy{display:none}::ng-deep .cde-color-picker-panel color-picker div.color-picker [slider]{touch-action:none}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area{display:flex;justify-content:flex-end;gap:.5rem;padding:0;margin:.5rem 1rem 1rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .accept-button,::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .cancel-button{height:2.5rem;margin:0;padding:0 .75rem;border:none;border-radius:var(--mat-sys-corner-full);background-color:transparent;color:var(--mat-sys-on-surface);cursor:pointer;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .accept-button:hover,::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .cancel-button:hover{background-color:rgb(from var(--mat-sys-on-surface) r g b/var(--mat-sys-hover-state-layer-opacity))}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .accept-button:focus-visible,::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .cancel-button:focus-visible{outline:.125rem solid var(--mat-sys-on-surface)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .cursor{border-color:#fff;border-width:.25rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .selected-color{border:none}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha{padding:0;margin:1.5rem 1.625rem .5rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha .cursor{height:.5rem;width:.5rem;border-width:2px}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha .hue,::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha .alpha{border-radius:var(--mat-sys-corner-full);height:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: A11yModule }, { kind: "directive", type: i1$1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { kind: "directive", type: ColorPickerDirective, selector: "[colorPicker]", inputs: ["colorPicker", "cpWidth", "cpHeight", "cpToggle", "cpDisabled", "cpIgnoredElements", "cpFallbackColor", "cpColorMode", "cpCmykEnabled", "cpOutputFormat", "cpAlphaChannel", "cpDisableInput", "cpDialogDisplay", "cpSaveClickOutside", "cpCloseClickOutside", "cpUseRootViewContainer", "cpPosition", "cpPositionOffset", "cpPositionRelativeToArrow", "cpOKButton", "cpOKButtonText", "cpOKButtonClass", "cpCancelButton", "cpCancelButtonText", "cpCancelButtonClass", "cpEyeDropper", "cpPresetLabel", "cpPresetColors", "cpPresetColorsClass", "cpMaxPresetColorsLength", "cpPresetEmptyMessage", "cpPresetEmptyMessageClass", "cpAddColorButton", "cpAddColorButtonText", "cpAddColorButtonClass", "cpRemoveColorButtonClass", "cpArrowPosition", "cpExtraTemplate"], outputs: ["cpInputChange", "cpToggleChange", "cpSliderChange", "cpSliderDragEnd", "cpSliderDragStart", "colorPickerOpen", "colorPickerClose", "colorPickerCancel", "colorPickerSelect", "colorPickerChange", "cpCmykColorChange", "cpPresetColorsChange"], exportAs: ["ngxColorPicker"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-color-picker', imports: [A11yModule, ColorPickerDirective, OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template\n  cdkConnectedOverlay\n  cdkConnectedOverlayPush\n  cdkConnectedOverlayHasBackdrop\n  cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\"\n  cdkConnectedOverlayPanelClass=\"cde-color-picker-panel\"\n  [cdkConnectedOverlayOrigin]=\"origin()\"\n  [cdkConnectedOverlayOpen]=\"open()\"\n  [cdkConnectedOverlayPositions]=\"positions\"\n  [cdkConnectedOverlayScrollStrategy]=\"scrollStrategy\"\n  (attach)=\"handleAttach()\"\n  (detach)=\"open.set(false)\"\n  (backdropClick)=\"apply()\"\n  (overlayKeydown)=\"handleKeydown($event)\"\n>\n  <div role=\"dialog\" aria-modal=\"true\" cdkTrapFocus [attr.aria-label]=\"label()\" #panel>\n    <span\n      cpDialogDisplay=\"inline\"\n      cpWidth=\"264px\"\n      cpOutputFormat=\"hex\"\n      cpAlphaChannel=\"disabled\"\n      cpOKButtonClass=\"accept-button\"\n      cpOKButtonText=\"Apply\"\n      cpCancelButtonClass=\"cancel-button\"\n      [colorPicker]=\"hexColor()\"\n      [cpToggle]=\"true\"\n      [cpOKButton]=\"true\"\n      [cpCancelButton]=\"true\"\n      (colorPickerChange)=\"handleChange($event)\"\n      (colorPickerSelect)=\"apply($event)\"\n      (colorPickerCancel)=\"cancel()\"\n    ></span>\n  </div>\n</ng-template>\n", styles: ["::ng-deep .cde-color-picker-panel color-picker div.color-picker{position:relative;background-color:var(--mat-sys-surface-container);border-radius:var(--mat-sys-corner-small);border:none;box-shadow:var(--mat-sys-level2)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text{display:flex!important;flex-direction:row-reverse;justify-content:flex-end;padding:0}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box{width:100%;align-items:center}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box:not(:has(input)){margin:0 1rem;padding:0;padding:.25rem 1.25rem;width:auto}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box:not(:has(input)) div{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box:has(input){padding:1.25rem 0;margin-right:1rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box input{box-sizing:border-box;height:2.5rem;padding:0 .9375rem;border:1px solid var(--mat-sys-outline);border-radius:var(--mat-sys-corner-extra-small);background-color:transparent;box-shadow:none;color:var(--mat-sys-on-surface);caret-color:var(--mat-sys-secondary);text-align:start;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box input:hover{border-color:var(--mat-sys-on-surface)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hex-text .box input:focus{outline:none;padding:0 .875rem;border:2px solid var(--mat-sys-secondary)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .arrow,::ng-deep .cde-color-picker-panel color-picker div.color-picker .type-policy{display:none}::ng-deep .cde-color-picker-panel color-picker div.color-picker [slider]{touch-action:none}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area{display:flex;justify-content:flex-end;gap:.5rem;padding:0;margin:.5rem 1rem 1rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .accept-button,::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .cancel-button{height:2.5rem;margin:0;padding:0 .75rem;border:none;border-radius:var(--mat-sys-corner-full);background-color:transparent;color:var(--mat-sys-on-surface);cursor:pointer;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .accept-button:hover,::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .cancel-button:hover{background-color:rgb(from var(--mat-sys-on-surface) r g b/var(--mat-sys-hover-state-layer-opacity))}::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .accept-button:focus-visible,::ng-deep .cde-color-picker-panel color-picker div.color-picker .button-area .cancel-button:focus-visible{outline:.125rem solid var(--mat-sys-on-surface)}::ng-deep .cde-color-picker-panel color-picker div.color-picker .cursor{border-color:#fff;border-width:.25rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .selected-color{border:none}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha{padding:0;margin:1.5rem 1.625rem .5rem}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha .cursor{height:.5rem;width:.5rem;border-width:2px}::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha .hue,::ng-deep .cde-color-picker-panel color-picker div.color-picker .hue-alpha .alpha{border-radius:var(--mat-sys-corner-full);height:.5rem}\n"] }]
        }], propDecorators: { origin: [{ type: i0.Input, args: [{ isSignal: true, alias: "origin", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], open: [{ type: i0.Input, args: [{ isSignal: true, alias: "open", required: false }] }, { type: i0.Output, args: ["openChange"] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: true }] }, { type: i0.Output, args: ["colorChange"] }], preview: [{ type: i0.Output, args: ["preview"] }], panel: [{ type: i0.ViewChild, args: ['panel', { isSignal: true }] }] } });

/**
 * Color Picker Label Component
 */
class ColorPickerLabelComponent {
    /** The RGB color value */
    color = model.required(...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    /** The label text for the color picker */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    /** Indicates if the row is an anchor */
    isAnchor = input(false, ...(ngDevMode ? [{ debugName: "isAnchor" }] : /* istanbul ignore next */ []));
    /** Swatch color: the color, or the color shown while picking */
    swatchColor = linkedSignal(() => rgbToHex(this.color()), ...(ngDevMode ? [{ debugName: "swatchColor" }] : /* istanbul ignore next */ []));
    /** Whether the color picker is open */
    pickerOpen = signal(false, ...(ngDevMode ? [{ debugName: "pickerOpen" }] : /* istanbul ignore next */ []));
    /** Accessible name of the swatch and the color picker */
    pickerLabel = computed(() => `${this.label()} color`, ...(ngDevMode ? [{ debugName: "pickerLabel" }] : /* istanbul ignore next */ []));
    /** Tooltip position for the color picker label */
    tooltipPosition = TOOLTIP_POSITION_COLOR_PICKER_LABEL;
    /** Tooltip open state */
    tooltipOpen = false;
    /** Anchor open state */
    anchorOpen = false;
    /** Handle hover event to open the tooltip if the label is truncated */
    handleHover(event) {
        const label = event.currentTarget;
        if (label.scrollWidth > label.clientWidth) {
            this.tooltipOpen = true;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorPickerLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: ColorPickerLabelComponent, isStandalone: true, selector: "cde-color-picker-label", inputs: { color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, isAnchor: { classPropertyName: "isAnchor", publicName: "isAnchor", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { color: "colorChange" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"color-pick\"\n  aria-haspopup=\"dialog\"\n  data-testid=\"color-picker-button\"\n  cdkOverlayOrigin\n  [attr.aria-label]=\"pickerLabel()\"\n  [attr.aria-expanded]=\"pickerOpen()\"\n  [style.background]=\"swatchColor()\"\n  (click)=\"pickerOpen.set(true)\"\n  #swatch=\"cdkOverlayOrigin\"\n></button>\n<cde-color-picker\n  [origin]=\"swatch\"\n  [label]=\"pickerLabel()\"\n  [(open)]=\"pickerOpen\"\n  [(color)]=\"color\"\n  (preview)=\"swatchColor.set($event)\"\n/>\n@if (isAnchor()) {\n  <mat-icon\n    class=\"material-symbols-rounded anchor\"\n    cdkOverlayOrigin\n    (mouseover)=\"anchorOpen = true\"\n    (mouseout)=\"anchorOpen = false\"\n    #resetTrigger=\"cdkOverlayOrigin\"\n  >\n    anchor\n    <ng-container>\n      <ng-template\n        cdkConnectedOverlay\n        [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'anchor-tooltip']\"\n        [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n        [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n        [cdkConnectedOverlayOpen]=\"anchorOpen\"\n        [cdkConnectedOverlayOffsetX]=\"5\"\n      >\n        <div>\n          The anchor cell type represents the cell type to which the nearest cell distance distributions should be\n          computed and visualized. The nearest cell distance is computed based on the Euclidean distance between two\n          cells.\n        </div>\n      </ng-template>\n    </ng-container>\n  </mat-icon>\n}\n<div\n  cdkOverlayOrigin\n  class=\"label\"\n  data-testid=\"label\"\n  (mouseover)=\"handleHover($event)\"\n  (mouseout)=\"tooltipOpen = false\"\n  #resetTrigger=\"cdkOverlayOrigin\"\n>\n  {{ label() }}\n  <ng-container>\n    <ng-template\n      cdkConnectedOverlay\n      [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'label-tooltip']\"\n      [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n      [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n      [cdkConnectedOverlayOpen]=\"tooltipOpen\"\n      [cdkConnectedOverlayOffsetX]=\"5\"\n    >\n      <div>\n        {{ label() }}\n      </div>\n    </ng-template>\n  </ng-container>\n</div>\n", styles: [":host{display:flex;height:2rem;align-items:center}:host .color-pick{flex-shrink:0;height:1.25rem;width:1.25rem;background-color:var(--mat-sys-secondary);display:inline-block;border-radius:50%;vertical-align:middle;margin:.25rem .5rem .25rem .25rem;position:relative;cursor:pointer;padding:0;border:1px solid var(--mat-sys-outline)}:host .color-pick:focus-visible{outline:2px solid var(--mat-sys-on-surface);outline-offset:2px}:host .anchor{flex-shrink:0;background-color:var(--mat-sys-secondary);border-radius:50%;color:var(--mat-sys-on-secondary);vertical-align:middle;height:1.25rem;width:1.25rem;font-size:1rem;text-align:center;align-content:center;margin:0 4px}:host .label{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface-variant);cursor:pointer;display:block;white-space:nowrap;max-width:calc(100% - 3.5rem);text-overflow:ellipsis;overflow:hidden;flex-grow:0}::ng-deep .info-tooltip-panel div{margin:.75rem 1rem}::ng-deep .anchor-tooltip{max-width:21rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "component", type: ColorPickerComponent, selector: "cde-color-picker", inputs: ["origin", "label", "open", "color"], outputs: ["openChange", "colorChange", "preview"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorPickerLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-color-picker-label', imports: [HraCommonModule, ColorPickerComponent, MatIconModule, OverlayModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"color-pick\"\n  aria-haspopup=\"dialog\"\n  data-testid=\"color-picker-button\"\n  cdkOverlayOrigin\n  [attr.aria-label]=\"pickerLabel()\"\n  [attr.aria-expanded]=\"pickerOpen()\"\n  [style.background]=\"swatchColor()\"\n  (click)=\"pickerOpen.set(true)\"\n  #swatch=\"cdkOverlayOrigin\"\n></button>\n<cde-color-picker\n  [origin]=\"swatch\"\n  [label]=\"pickerLabel()\"\n  [(open)]=\"pickerOpen\"\n  [(color)]=\"color\"\n  (preview)=\"swatchColor.set($event)\"\n/>\n@if (isAnchor()) {\n  <mat-icon\n    class=\"material-symbols-rounded anchor\"\n    cdkOverlayOrigin\n    (mouseover)=\"anchorOpen = true\"\n    (mouseout)=\"anchorOpen = false\"\n    #resetTrigger=\"cdkOverlayOrigin\"\n  >\n    anchor\n    <ng-container>\n      <ng-template\n        cdkConnectedOverlay\n        [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'anchor-tooltip']\"\n        [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n        [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n        [cdkConnectedOverlayOpen]=\"anchorOpen\"\n        [cdkConnectedOverlayOffsetX]=\"5\"\n      >\n        <div>\n          The anchor cell type represents the cell type to which the nearest cell distance distributions should be\n          computed and visualized. The nearest cell distance is computed based on the Euclidean distance between two\n          cells.\n        </div>\n      </ng-template>\n    </ng-container>\n  </mat-icon>\n}\n<div\n  cdkOverlayOrigin\n  class=\"label\"\n  data-testid=\"label\"\n  (mouseover)=\"handleHover($event)\"\n  (mouseout)=\"tooltipOpen = false\"\n  #resetTrigger=\"cdkOverlayOrigin\"\n>\n  {{ label() }}\n  <ng-container>\n    <ng-template\n      cdkConnectedOverlay\n      [cdkConnectedOverlayPanelClass]=\"['info-tooltip-panel', 'label-tooltip']\"\n      [cdkConnectedOverlayOrigin]=\"resetTrigger\"\n      [cdkConnectedOverlayPositions]=\"tooltipPosition\"\n      [cdkConnectedOverlayOpen]=\"tooltipOpen\"\n      [cdkConnectedOverlayOffsetX]=\"5\"\n    >\n      <div>\n        {{ label() }}\n      </div>\n    </ng-template>\n  </ng-container>\n</div>\n", styles: [":host{display:flex;height:2rem;align-items:center}:host .color-pick{flex-shrink:0;height:1.25rem;width:1.25rem;background-color:var(--mat-sys-secondary);display:inline-block;border-radius:50%;vertical-align:middle;margin:.25rem .5rem .25rem .25rem;position:relative;cursor:pointer;padding:0;border:1px solid var(--mat-sys-outline)}:host .color-pick:focus-visible{outline:2px solid var(--mat-sys-on-surface);outline-offset:2px}:host .anchor{flex-shrink:0;background-color:var(--mat-sys-secondary);border-radius:50%;color:var(--mat-sys-on-secondary);vertical-align:middle;height:1.25rem;width:1.25rem;font-size:1rem;text-align:center;align-content:center;margin:0 4px}:host .label{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface-variant);cursor:pointer;display:block;white-space:nowrap;max-width:calc(100% - 3.5rem);text-overflow:ellipsis;overflow:hidden;flex-grow:0}::ng-deep .info-tooltip-panel div{margin:.75rem 1rem}::ng-deep .anchor-tooltip{max-width:21rem}\n"] }]
        }], propDecorators: { color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: true }] }, { type: i0.Output, args: ["colorChange"] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], isAnchor: [{ type: i0.Input, args: [{ isSignal: true, alias: "isAnchor", required: false }] }] } });

/**
 * Placeholder shape shown while content loads. Size it from the parent's styles.
 * It's hidden from assistive technology, so mark the loading region with aria-busy instead.
 */
class SkeletonComponent {
    /** A line of text, a circle, or a rectangle */
    shape = input('text', ...(ngDevMode ? [{ debugName: "shape" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: SkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.25", type: SkeletonComponent, isStandalone: true, selector: "cde-skeleton", inputs: { shape: { classPropertyName: "shape", publicName: "shape", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "aria-hidden": "true" }, properties: { "attr.data-shape": "shape()" } }, ngImport: i0, template: '', isInline: true, styles: [":host{position:relative;display:block;overflow:hidden;background-color:var(--ang-skeleton-container-color, var(--mat-sys-surface-container-highest))}:host:after{content:\"\";position:absolute;inset:0;background:linear-gradient(90deg,transparent,var(--ang-skeleton-shimmer-color, rgb(from var(--mat-sys-on-surface) r g b/8%)),transparent);transform:translate(-100%);animation:shimmer 1.5s ease-in-out infinite}@media(prefers-reduced-motion:reduce){:host:after{display:none}}:host([data-shape=text]){height:.75em;margin-block:calc((1lh - .75em)/2);border-radius:var(--ang-skeleton-text-shape, var(--mat-sys-corner-extra-small))}:host([data-shape=circle]){border-radius:var(--ang-skeleton-circle-shape, var(--mat-sys-corner-full))}:host([data-shape=rect]){border-radius:var(--ang-skeleton-rect-shape, var(--mat-sys-corner-medium))}@keyframes shimmer{to{transform:translate(100%)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: SkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-skeleton', template: '', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'aria-hidden': 'true',
                        '[attr.data-shape]': 'shape()',
                    }, styles: [":host{position:relative;display:block;overflow:hidden;background-color:var(--ang-skeleton-container-color, var(--mat-sys-surface-container-highest))}:host:after{content:\"\";position:absolute;inset:0;background:linear-gradient(90deg,transparent,var(--ang-skeleton-shimmer-color, rgb(from var(--mat-sys-on-surface) r g b/8%)),transparent);transform:translate(-100%);animation:shimmer 1.5s ease-in-out infinite}@media(prefers-reduced-motion:reduce){:host:after{display:none}}:host([data-shape=text]){height:.75em;margin-block:calc((1lh - .75em)/2);border-radius:var(--ang-skeleton-text-shape, var(--mat-sys-corner-extra-small))}:host([data-shape=circle]){border-radius:var(--ang-skeleton-circle-shape, var(--mat-sys-corner-full))}:host([data-shape=rect]){border-radius:var(--ang-skeleton-rect-shape, var(--mat-sys-corner-medium))}@keyframes shimmer{to{transform:translate(100%)}}\n"] }]
        }], propDecorators: { shape: [{ type: i0.Input, args: [{ isSignal: true, alias: "shape", required: false }] }] } });

/** Name widths of the skeleton rows shown while the cell types load, varied like real names */
const SKELETON_NAME_WIDTHS = [
    '75%',
    '55%',
    '85%',
    '45%',
    '65%',
    '35%',
    '80%',
    '50%',
    '70%',
    '40%',
    '60%',
    '75%',
    '45%',
    '85%',
    '55%',
    '65%',
    '35%',
    '70%',
    '50%',
    '80%',
];
/**
 * Placeholder rows shown in the table while the cell types load. Their cells show skeletons in the table's own
 * columns, so the skeletons line up with the column headers.
 */
const SKELETON_ROWS$1 = SKELETON_NAME_WIDTHS.map((_width, index) => ({
    name: `skeleton-${index}`,
    count: 0,
    outgoingEdgeCount: 0,
    color: [0, 0, 0],
}));
/**
 * Cell Type Component
 */
class CellTypesComponent {
    /** List of cell types */
    cellTypes = model.required(...(ngDevMode ? [{ debugName: "cellTypes" }] : /* istanbul ignore next */ []));
    /** List of selected cell types */
    cellTypesSelection = model.required(...(ngDevMode ? [{ debugName: "cellTypesSelection" }] : /* istanbul ignore next */ []));
    /** Currently selected cell type */
    selectedCellType = input('', ...(ngDevMode ? [{ debugName: "selectedCellType" }] : /* istanbul ignore next */ []));
    /** Record of adjustments for cell type counts */
    countAdjustments = input({}, ...(ngDevMode ? [{ debugName: "countAdjustments" }] : /* istanbul ignore next */ []));
    /** Whether the cell types are loading, which shows skeleton rows and totals in the table */
    loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    /** Name widths of the skeleton rows */
    skeletonNameWidths = SKELETON_NAME_WIDTHS;
    /** Columns to be displayed in the table */
    columns = computed(() => {
        if (this.hideCellLinkData()) {
            return ['select', 'cellType', 'count'];
        }
        return ['select', 'cellType', 'count', 'links'];
    }, ...(ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []));
    /** Columns of the totals row, where the label spans the checkbox and cell type columns */
    footerColumns = computed(() => {
        if (this.hideCellLinkData()) {
            return ['total', 'count'];
        }
        return ['total', 'count', 'links'];
    }, ...(ngDevMode ? [{ debugName: "footerColumns" }] : /* istanbul ignore next */ []));
    /** Reference to MatSort directive */
    sort = viewChild.required(MatSort);
    /** Whether the cell link columns are hidden. Set from the toolbar's Display menu. */
    hideCellLinkData = input(false, ...(ngDevMode ? [{ debugName: "hideCellLinkData" }] : /* istanbul ignore next */ []));
    /** Bind sort state to data source */
    sortBindRef = effect(() => (this.dataSource.sort = this.sort()), ...(ngDevMode ? [{ debugName: "sortBindRef" }] : /* istanbul ignore next */ []));
    /** Change detector reference */
    cdr = inject(ChangeDetectorRef);
    /** Data source for the table */
    dataSource = new MatTableDataSource();
    /** Bind data source to cell types, or to the skeleton rows while they load */
    dataSourceBindRef = effect(() => {
        this.dataSource.data = this.loading() ? SKELETON_ROWS$1 : this.cellTypes();
        this.cdr.markForCheck();
    }, ...(ngDevMode ? [{ debugName: "dataSourceBindRef" }] : /* istanbul ignore next */ []));
    /** Selection model for managing selected cell types */
    selectionModel = new SelectionModel(true);
    /** Bind selection model to cell types selection */
    selectionModelBindRef = effect(() => {
        this.selectionModel.setSelection(...this.cellTypesSelection());
        this.cdr.markForCheck();
    }, ...(ngDevMode ? [{ debugName: "selectionModelBindRef" }] : /* istanbul ignore next */ []));
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
    }, ...(ngDevMode ? [{ debugName: "selectionState" }] : /* istanbul ignore next */ []));
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
    }, ...(ngDevMode ? [{ debugName: "totalCellCount" }] : /* istanbul ignore next */ []));
    /** The total cell links count */
    totalCellLinksCount = computed(() => {
        // Grab dependency on current selection since selectionModel is used indirectly
        this.selection();
        return this.cellTypes().reduce((count, entry) => this.sumCounts(count, entry, 'outgoingEdgeCount'), 0);
    }, ...(ngDevMode ? [{ debugName: "totalCellLinksCount" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: CellTypesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: CellTypesComponent, isStandalone: true, selector: "cde-cell-types", inputs: { cellTypes: { classPropertyName: "cellTypes", publicName: "cellTypes", isSignal: true, isRequired: true, transformFunction: null }, cellTypesSelection: { classPropertyName: "cellTypesSelection", publicName: "cellTypesSelection", isSignal: true, isRequired: true, transformFunction: null }, selectedCellType: { classPropertyName: "selectedCellType", publicName: "selectedCellType", isSignal: true, isRequired: false, transformFunction: null }, countAdjustments: { classPropertyName: "countAdjustments", publicName: "countAdjustments", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, hideCellLinkData: { classPropertyName: "hideCellLinkData", publicName: "hideCellLinkData", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { cellTypes: "cellTypesChange", cellTypesSelection: "cellTypesSelectionChange" }, host: { properties: { "attr.aria-busy": "loading() || null" } }, viewQueries: [{ propertyName: "sort", first: true, predicate: MatSort, descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Cell types\" disabled>\n  <!-- The fades start inside the 40px sticky header row and the 36px sticky totals row -->\n  <div class=\"table-frame\">\n    <ng-scrollbar\n      class=\"table-overflow-container\"\n      orientation=\"vertical\"\n      externalViewport=\".scroll-viewport\"\n      hraScrollOverflowFade\n      scrollOverflowFadeOffset=\"40\"\n      scrollOverflowFadeBottomOffset=\"36\"\n      hraFeature=\"cell-types-table\"\n    >\n      <div class=\"scroll-viewport\">\n        <table\n          mat-table\n          matSort\n          matSortDirection=\"desc\"\n          matSortActive=\"count\"\n          aria-label=\"Cell types count table\"\n          [dataSource]=\"dataSource\"\n          [trackBy]=\"trackByName\"\n        >\n          <ng-container matColumnDef=\"select\">\n            <th *matHeaderCellDef mat-header-cell>\n              <mat-checkbox\n                hraFeature=\"select-all\"\n                hraClickEvent\n                [checked]=\"selectionState() === 'full'\"\n                [indeterminate]=\"selectionState() === 'partial'\"\n                [aria-label]=\"getCheckboxLabel(selectionState() === 'full')\"\n                (change)=\"toggleAllRows()\"\n              />\n            </th>\n            <td *matCellDef=\"let row; let index = index\" mat-cell>\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-checkbox\" shape=\"rect\" />\n              } @else {\n                <mat-checkbox\n                  hraClickEvent\n                  [checked]=\"isSelected(row)\"\n                  [aria-label]=\"getCheckboxLabel(isSelected(row), index + 1)\"\n                  [hraFeature]=\"row.name | slugify\"\n                  (click)=\"$event.stopPropagation()\"\n                  (change)=\"toggleRow(row)\"\n                />\n              }\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"cellType\">\n            <th\n              *matHeaderCellDef\n              mat-header-cell\n              mat-sort-header=\"name\"\n              start=\"desc\"\n              hraFeature=\"sort-by-cell-type\"\n              hraClickEvent\n            >\n              Cell type\n            </th>\n            <td *matCellDef=\"let element; let index = index\" mat-cell>\n              @if (loading()) {\n                <span class=\"skeleton-name\">\n                  <cde-skeleton class=\"skeleton-swatch\" shape=\"circle\" />\n                  <cde-skeleton [style.width]=\"skeletonNameWidths[index]\" />\n                </span>\n              } @else {\n                <cde-color-picker-label\n                  [label]=\"element.name\"\n                  [color]=\"element.color\"\n                  [isAnchor]=\"element.name === selectedCellType()\"\n                  (colorChange)=\"updateColor(element, $event)\"\n                />\n              }\n            </td>\n          </ng-container>\n\n          <!-- Count headers put the sort arrow before the label, so the label lines up with the numbers -->\n          <ng-container matColumnDef=\"count\">\n            <th\n              *matHeaderCellDef\n              mat-header-cell\n              mat-sort-header=\"count\"\n              arrowPosition=\"before\"\n              start=\"desc\"\n              hraFeature=\"sort-by-cell-count\"\n              hraClickEvent\n            >\n              #Cells\n            </th>\n            <td *matCellDef=\"let element\" mat-cell>\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                {{ getCount(element, 'count') }}\n              }\n            </td>\n            <td *matFooterCellDef mat-footer-cell hraFeature=\"total-cells\">\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                <span data-testid=\"total-cell-count\">{{ totalCellCount() | number }}</span>\n                <span class=\"visually-hidden\"> total cells</span>\n              }\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"links\">\n            <th\n              *matHeaderCellDef\n              mat-header-cell\n              mat-sort-header=\"outgoingEdgeCount\"\n              arrowPosition=\"before\"\n              start=\"desc\"\n              hraFeature=\"sort-by-links-count\"\n              hraClickEvent\n            >\n              #Links\n            </th>\n            <td *matCellDef=\"let element\" mat-cell>\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                {{ getCount(element, 'outgoingEdgeCount') }}\n              }\n            </td>\n            <td *matFooterCellDef mat-footer-cell hraFeature=\"total-cell-links\">\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                <span data-testid=\"total-cell-link-count\">{{ totalCellLinksCount() | number }}</span>\n                <span class=\"visually-hidden\"> total cell links</span>\n              }\n            </td>\n          </ng-container>\n\n          <!-- The totals label spans the checkbox and cell type columns -->\n          <ng-container matColumnDef=\"total\">\n            <td *matFooterCellDef mat-footer-cell colspan=\"2\" hraFeature=\"total-cell-types\">\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-total-label\" />\n              } @else {\n                <span class=\"total-label\">\n                  Total ({{ selection().length }} cell type{{ selection().length === 1 ? '' : 's' }})\n                </span>\n              }\n            </td>\n          </ng-container>\n\n          <tr *matHeaderRowDef=\"columns(); sticky: true\" mat-header-row></tr>\n          <!-- While loading, the skeleton rows and totals are hidden from screen readers, and aria-busy marks the panel -->\n          <tr *matRowDef=\"let row; columns: columns()\" mat-row [attr.aria-hidden]=\"loading() || null\"></tr>\n          <tr\n            *matFooterRowDef=\"footerColumns(); sticky: true\"\n            mat-footer-row\n            [attr.aria-hidden]=\"loading() || null\"\n          ></tr>\n        </table>\n      </div>\n    </ng-scrollbar>\n  </div>\n</hra-expansion-panel>\n", styles: [":host{overflow:hidden;flex-grow:1;--mat-sort-arrow-color: var(--mat-sys-on-surface-variant);--mat-checkbox-state-layer-size: 2.25rem;--mat-table-background-color: var(--mat-sys-background);--mat-table-header-container-height: 2.5rem;--mat-table-header-headline-color: var(--mat-sys-on-surface);--mat-table-header-headline-font: var(--mat-sys-title-small-font);--mat-table-header-headline-line-height: var(--mat-sys-title-small-line-height);--mat-table-header-headline-size: var(--mat-sys-title-small-size);--mat-table-header-headline-tracking: var(--mat-sys-title-small-tracking);--mat-table-header-headline-weight: var(--mat-sys-title-small-weight);--mat-table-row-item-container-height: 2.25rem;--mat-table-row-item-label-text-color: var(--mat-sys-on-surface-variant);--mat-table-row-item-label-text-font: var(--mat-sys-body-medium-font);--mat-table-row-item-label-text-line-height: var(--mat-sys-body-medium-line-height);--mat-table-row-item-label-text-size: var(--mat-sys-body-medium-size);--mat-table-row-item-label-text-tracking: var(--mat-sys-body-medium-tracking);--mat-table-row-item-label-text-weight: var(--mat-sys-body-medium-weight);--mat-table-row-item-outline-color: var(--mat-sys-outline-variant);--mat-table-row-item-outline-width: 1px;--mat-table-footer-container-height: 2.25rem;--mat-table-footer-supporting-text-font: var(--mat-sys-body-medium-font);--mat-table-footer-supporting-text-line-height: var(--mat-sys-body-medium-line-height);--mat-table-footer-supporting-text-size: var(--mat-sys-body-medium-size);--mat-table-footer-supporting-text-tracking: var(--mat-sys-body-medium-tracking);--mat-table-footer-supporting-text-weight: var(--mat-sys-title-small-weight)}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem 1rem;min-height:3.5rem}:host ::ng-deep hra-expansion-panel .content{padding:0 1rem 1rem;height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{display:flex;flex-direction:column;overflow:hidden;flex-grow:1}:host .table-frame{position:relative;display:flex;flex-direction:column;flex:0 1 auto;min-height:0;overflow:hidden;border:1px solid var(--mat-sys-outline-variant);border-radius:var(--mat-sys-corner-small)}:host .table-overflow-container{display:flex;flex-direction:column;flex:0 1 auto;min-height:0}:host .scroll-viewport{flex:0 1 auto;min-height:0}:host table{width:100%}:host table .mat-mdc-header-row{background-color:var(--mat-sys-surface-variant)}:host table .mat-mdc-row:nth-child(2n){background-color:var(--mat-sys-surface-container-low)}:host table .mat-mdc-row:has(.anchor){background-color:var(--mat-sys-surface-container-high)}:host table .mat-mdc-row:last-child .mat-mdc-cell{border-bottom-width:0}:host table .mat-mdc-footer-cell{border-top:1px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}:host table .mat-column-select{width:2.25rem;min-width:2.25rem;padding:0}:host table .mat-column-select .mat-mdc-checkbox{display:flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem}:host table .mat-column-cellType{width:100%;padding:0}:host table .mat-column-cellType.mat-mdc-header-cell{padding-left:.25rem}:host table .mat-column-cellType cde-color-picker-label{contain:inline-size}:host table .mat-column-cellType cde-color-picker-label ::ng-deep .label{min-width:0;max-width:none}:host table .mat-column-count,:host table .mat-column-links{width:1%;padding:0 1rem 0 .5rem;text-align:end;white-space:nowrap;font-variant-numeric:tabular-nums}:host table .mat-column-count ::ng-deep .mat-sort-header-container,:host table .mat-column-links ::ng-deep .mat-sort-header-container{justify-content:end}:host table .mat-column-total{padding:0 .5rem 0 calc((2.25rem - 18px)/2)}:host table .total-label{display:block;contain:inline-size;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host table .mat-sort-header:hover{background-image:linear-gradient(rgb(from var(--mat-sys-on-surface-variant) r g b/var(--mat-sys-hover-state-layer-opacity)) 0 0)}:host table .mat-sort-header.cdk-keyboard-focused,:host table .mat-sort-header.cdk-program-focused{background-image:linear-gradient(rgb(from var(--mat-sys-on-surface-variant) r g b/var(--mat-sys-focus-state-layer-opacity)) 0 0)}:host .skeleton-checkbox{--ang-skeleton-rect-shape: var(--mat-sys-corner-extra-small);width:18px;height:18px;margin-inline:auto}:host .skeleton-name{display:flex;align-items:center;contain:inline-size}:host .skeleton-swatch{flex-shrink:0;width:1.25rem;height:1.25rem;margin:.25rem .5rem .25rem .25rem}:host .skeleton-count{width:2.5rem;margin-left:auto}:host .skeleton-total-label{width:7rem}:host .visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}::ng-deep .info-tooltip-panel{background-color:var(--mat-sys-surface-container);box-shadow:var(--mat-sys-level2);border-radius:var(--mat-sys-corner-medium);max-width:21rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface-variant)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatTableModule }, { kind: "component", type: i2$2.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i2$2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i2$2.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i2$2.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i2$2.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i2$2.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i2$2.MatFooterCellDef, selector: "[matFooterCellDef]" }, { kind: "directive", type: i2$2.MatFooterRowDef, selector: "[matFooterRowDef]", inputs: ["matFooterRowDef", "matFooterRowDefSticky"] }, { kind: "directive", type: i2$2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i2$2.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "directive", type: i2$2.MatFooterCell, selector: "mat-footer-cell, td[mat-footer-cell]" }, { kind: "component", type: i2$2.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i2$2.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i2$2.MatFooterRow, selector: "mat-footer-row, tr[mat-footer-row]", exportAs: ["matFooterRow"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i3$1.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { kind: "ngmodule", type: MatSortModule }, { kind: "directive", type: i4$1.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i4$1.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i4.NgScrollbarExt, selector: "ng-scrollbar[externalViewport]", inputs: ["externalViewport", "externalContentWrapper", "externalSpacer"], exportAs: ["ngScrollbar"] }, { kind: "directive", type: i5.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset", "scrollOverflowFadeBottomOffset"] }, { kind: "component", type: ColorPickerLabelComponent, selector: "cde-color-picker-label", inputs: ["color", "label", "isAnchor"], outputs: ["colorChange"] }, { kind: "component", type: SkeletonComponent, selector: "cde-skeleton", inputs: ["shape"] }, { kind: "pipe", type: i7.DecimalPipe, name: "number" }, { kind: "pipe", type: i8.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: CellTypesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-cell-types', imports: [
                        HraCommonModule,
                        MatTableModule,
                        MatCheckboxModule,
                        MatSortModule,
                        ExpansionPanelComponent,
                        ScrollingModule,
                        ColorPickerLabelComponent,
                        SkeletonComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-busy]': 'loading() || null',
                    }, template: "<hra-expansion-panel tagline=\"Cell types\" disabled>\n  <!-- The fades start inside the 40px sticky header row and the 36px sticky totals row -->\n  <div class=\"table-frame\">\n    <ng-scrollbar\n      class=\"table-overflow-container\"\n      orientation=\"vertical\"\n      externalViewport=\".scroll-viewport\"\n      hraScrollOverflowFade\n      scrollOverflowFadeOffset=\"40\"\n      scrollOverflowFadeBottomOffset=\"36\"\n      hraFeature=\"cell-types-table\"\n    >\n      <div class=\"scroll-viewport\">\n        <table\n          mat-table\n          matSort\n          matSortDirection=\"desc\"\n          matSortActive=\"count\"\n          aria-label=\"Cell types count table\"\n          [dataSource]=\"dataSource\"\n          [trackBy]=\"trackByName\"\n        >\n          <ng-container matColumnDef=\"select\">\n            <th *matHeaderCellDef mat-header-cell>\n              <mat-checkbox\n                hraFeature=\"select-all\"\n                hraClickEvent\n                [checked]=\"selectionState() === 'full'\"\n                [indeterminate]=\"selectionState() === 'partial'\"\n                [aria-label]=\"getCheckboxLabel(selectionState() === 'full')\"\n                (change)=\"toggleAllRows()\"\n              />\n            </th>\n            <td *matCellDef=\"let row; let index = index\" mat-cell>\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-checkbox\" shape=\"rect\" />\n              } @else {\n                <mat-checkbox\n                  hraClickEvent\n                  [checked]=\"isSelected(row)\"\n                  [aria-label]=\"getCheckboxLabel(isSelected(row), index + 1)\"\n                  [hraFeature]=\"row.name | slugify\"\n                  (click)=\"$event.stopPropagation()\"\n                  (change)=\"toggleRow(row)\"\n                />\n              }\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"cellType\">\n            <th\n              *matHeaderCellDef\n              mat-header-cell\n              mat-sort-header=\"name\"\n              start=\"desc\"\n              hraFeature=\"sort-by-cell-type\"\n              hraClickEvent\n            >\n              Cell type\n            </th>\n            <td *matCellDef=\"let element; let index = index\" mat-cell>\n              @if (loading()) {\n                <span class=\"skeleton-name\">\n                  <cde-skeleton class=\"skeleton-swatch\" shape=\"circle\" />\n                  <cde-skeleton [style.width]=\"skeletonNameWidths[index]\" />\n                </span>\n              } @else {\n                <cde-color-picker-label\n                  [label]=\"element.name\"\n                  [color]=\"element.color\"\n                  [isAnchor]=\"element.name === selectedCellType()\"\n                  (colorChange)=\"updateColor(element, $event)\"\n                />\n              }\n            </td>\n          </ng-container>\n\n          <!-- Count headers put the sort arrow before the label, so the label lines up with the numbers -->\n          <ng-container matColumnDef=\"count\">\n            <th\n              *matHeaderCellDef\n              mat-header-cell\n              mat-sort-header=\"count\"\n              arrowPosition=\"before\"\n              start=\"desc\"\n              hraFeature=\"sort-by-cell-count\"\n              hraClickEvent\n            >\n              #Cells\n            </th>\n            <td *matCellDef=\"let element\" mat-cell>\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                {{ getCount(element, 'count') }}\n              }\n            </td>\n            <td *matFooterCellDef mat-footer-cell hraFeature=\"total-cells\">\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                <span data-testid=\"total-cell-count\">{{ totalCellCount() | number }}</span>\n                <span class=\"visually-hidden\"> total cells</span>\n              }\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"links\">\n            <th\n              *matHeaderCellDef\n              mat-header-cell\n              mat-sort-header=\"outgoingEdgeCount\"\n              arrowPosition=\"before\"\n              start=\"desc\"\n              hraFeature=\"sort-by-links-count\"\n              hraClickEvent\n            >\n              #Links\n            </th>\n            <td *matCellDef=\"let element\" mat-cell>\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                {{ getCount(element, 'outgoingEdgeCount') }}\n              }\n            </td>\n            <td *matFooterCellDef mat-footer-cell hraFeature=\"total-cell-links\">\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-count\" />\n              } @else {\n                <span data-testid=\"total-cell-link-count\">{{ totalCellLinksCount() | number }}</span>\n                <span class=\"visually-hidden\"> total cell links</span>\n              }\n            </td>\n          </ng-container>\n\n          <!-- The totals label spans the checkbox and cell type columns -->\n          <ng-container matColumnDef=\"total\">\n            <td *matFooterCellDef mat-footer-cell colspan=\"2\" hraFeature=\"total-cell-types\">\n              @if (loading()) {\n                <cde-skeleton class=\"skeleton-total-label\" />\n              } @else {\n                <span class=\"total-label\">\n                  Total ({{ selection().length }} cell type{{ selection().length === 1 ? '' : 's' }})\n                </span>\n              }\n            </td>\n          </ng-container>\n\n          <tr *matHeaderRowDef=\"columns(); sticky: true\" mat-header-row></tr>\n          <!-- While loading, the skeleton rows and totals are hidden from screen readers, and aria-busy marks the panel -->\n          <tr *matRowDef=\"let row; columns: columns()\" mat-row [attr.aria-hidden]=\"loading() || null\"></tr>\n          <tr\n            *matFooterRowDef=\"footerColumns(); sticky: true\"\n            mat-footer-row\n            [attr.aria-hidden]=\"loading() || null\"\n          ></tr>\n        </table>\n      </div>\n    </ng-scrollbar>\n  </div>\n</hra-expansion-panel>\n", styles: [":host{overflow:hidden;flex-grow:1;--mat-sort-arrow-color: var(--mat-sys-on-surface-variant);--mat-checkbox-state-layer-size: 2.25rem;--mat-table-background-color: var(--mat-sys-background);--mat-table-header-container-height: 2.5rem;--mat-table-header-headline-color: var(--mat-sys-on-surface);--mat-table-header-headline-font: var(--mat-sys-title-small-font);--mat-table-header-headline-line-height: var(--mat-sys-title-small-line-height);--mat-table-header-headline-size: var(--mat-sys-title-small-size);--mat-table-header-headline-tracking: var(--mat-sys-title-small-tracking);--mat-table-header-headline-weight: var(--mat-sys-title-small-weight);--mat-table-row-item-container-height: 2.25rem;--mat-table-row-item-label-text-color: var(--mat-sys-on-surface-variant);--mat-table-row-item-label-text-font: var(--mat-sys-body-medium-font);--mat-table-row-item-label-text-line-height: var(--mat-sys-body-medium-line-height);--mat-table-row-item-label-text-size: var(--mat-sys-body-medium-size);--mat-table-row-item-label-text-tracking: var(--mat-sys-body-medium-tracking);--mat-table-row-item-label-text-weight: var(--mat-sys-body-medium-weight);--mat-table-row-item-outline-color: var(--mat-sys-outline-variant);--mat-table-row-item-outline-width: 1px;--mat-table-footer-container-height: 2.25rem;--mat-table-footer-supporting-text-font: var(--mat-sys-body-medium-font);--mat-table-footer-supporting-text-line-height: var(--mat-sys-body-medium-line-height);--mat-table-footer-supporting-text-size: var(--mat-sys-body-medium-size);--mat-table-footer-supporting-text-tracking: var(--mat-sys-body-medium-tracking);--mat-table-footer-supporting-text-weight: var(--mat-sys-title-small-weight)}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem 1rem;min-height:3.5rem}:host ::ng-deep hra-expansion-panel .content{padding:0 1rem 1rem;height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{display:flex;flex-direction:column;overflow:hidden;flex-grow:1}:host .table-frame{position:relative;display:flex;flex-direction:column;flex:0 1 auto;min-height:0;overflow:hidden;border:1px solid var(--mat-sys-outline-variant);border-radius:var(--mat-sys-corner-small)}:host .table-overflow-container{display:flex;flex-direction:column;flex:0 1 auto;min-height:0}:host .scroll-viewport{flex:0 1 auto;min-height:0}:host table{width:100%}:host table .mat-mdc-header-row{background-color:var(--mat-sys-surface-variant)}:host table .mat-mdc-row:nth-child(2n){background-color:var(--mat-sys-surface-container-low)}:host table .mat-mdc-row:has(.anchor){background-color:var(--mat-sys-surface-container-high)}:host table .mat-mdc-row:last-child .mat-mdc-cell{border-bottom-width:0}:host table .mat-mdc-footer-cell{border-top:1px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}:host table .mat-column-select{width:2.25rem;min-width:2.25rem;padding:0}:host table .mat-column-select .mat-mdc-checkbox{display:flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem}:host table .mat-column-cellType{width:100%;padding:0}:host table .mat-column-cellType.mat-mdc-header-cell{padding-left:.25rem}:host table .mat-column-cellType cde-color-picker-label{contain:inline-size}:host table .mat-column-cellType cde-color-picker-label ::ng-deep .label{min-width:0;max-width:none}:host table .mat-column-count,:host table .mat-column-links{width:1%;padding:0 1rem 0 .5rem;text-align:end;white-space:nowrap;font-variant-numeric:tabular-nums}:host table .mat-column-count ::ng-deep .mat-sort-header-container,:host table .mat-column-links ::ng-deep .mat-sort-header-container{justify-content:end}:host table .mat-column-total{padding:0 .5rem 0 calc((2.25rem - 18px)/2)}:host table .total-label{display:block;contain:inline-size;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host table .mat-sort-header:hover{background-image:linear-gradient(rgb(from var(--mat-sys-on-surface-variant) r g b/var(--mat-sys-hover-state-layer-opacity)) 0 0)}:host table .mat-sort-header.cdk-keyboard-focused,:host table .mat-sort-header.cdk-program-focused{background-image:linear-gradient(rgb(from var(--mat-sys-on-surface-variant) r g b/var(--mat-sys-focus-state-layer-opacity)) 0 0)}:host .skeleton-checkbox{--ang-skeleton-rect-shape: var(--mat-sys-corner-extra-small);width:18px;height:18px;margin-inline:auto}:host .skeleton-name{display:flex;align-items:center;contain:inline-size}:host .skeleton-swatch{flex-shrink:0;width:1.25rem;height:1.25rem;margin:.25rem .5rem .25rem .25rem}:host .skeleton-count{width:2.5rem;margin-left:auto}:host .skeleton-total-label{width:7rem}:host .visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}::ng-deep .info-tooltip-panel{background-color:var(--mat-sys-surface-container);box-shadow:var(--mat-sys-level2);border-radius:var(--mat-sys-corner-medium);max-width:21rem;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface-variant)}\n"] }]
        }], propDecorators: { cellTypes: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellTypes", required: true }] }, { type: i0.Output, args: ["cellTypesChange"] }], cellTypesSelection: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellTypesSelection", required: true }] }, { type: i0.Output, args: ["cellTypesSelectionChange"] }], selectedCellType: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectedCellType", required: false }] }], countAdjustments: [{ type: i0.Input, args: [{ isSignal: true, alias: "countAdjustments", required: false }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], sort: [{ type: i0.ViewChild, args: [i0.forwardRef(() => MatSort), { isSignal: true }] }], hideCellLinkData: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideCellLinkData", required: false }] }] } });

/**
 * A downloadable file with a download button for each of its formats
 */
class DownloadFileComponent {
    /** File to show */
    file = input.required(...(ngDevMode ? [{ debugName: "file" }] : /* istanbul ignore next */ []));
    /** Whether the file can't be downloaded, which disables its format buttons */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    /** Emits the format to download when a format button is clicked */
    download = output();
    /** Host element */
    el = inject(ElementRef);
    /** Focuses the first format button */
    focus() {
        this.el.nativeElement.querySelector('button')?.focus();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: DownloadFileComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: DownloadFileComponent, isStandalone: true, selector: "cde-download-file", inputs: { file: { classPropertyName: "file", publicName: "file", isSignal: true, isRequired: true, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { download: "download" }, ngImport: i0, template: "@let data = file();\n\n<span class=\"name\">{{ data.name }}</span>\n<p class=\"description\">{{ data.description }}</p>\n<div class=\"formats\">\n  @for (format of data.formats; track format.id) {\n    <button\n      matButton=\"outlined\"\n      hraClickEvent\n      [hraFeature]=\"`download-${format.id}`\"\n      [attr.aria-label]=\"format.ariaLabel\"\n      [disabled]=\"disabled()\"\n      (click)=\"download.emit(format.id)\"\n    >\n      <mat-icon>download</mat-icon>\n      {{ format.label }}\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:.25rem}:host .name{color:var(--mat-sys-on-surface);font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .description{margin:0;color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .formats{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: DownloadFileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-download-file', imports: [HraCommonModule, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@let data = file();\n\n<span class=\"name\">{{ data.name }}</span>\n<p class=\"description\">{{ data.description }}</p>\n<div class=\"formats\">\n  @for (format of data.formats; track format.id) {\n    <button\n      matButton=\"outlined\"\n      hraClickEvent\n      [hraFeature]=\"`download-${format.id}`\"\n      [attr.aria-label]=\"format.ariaLabel\"\n      [disabled]=\"disabled()\"\n      (click)=\"download.emit(format.id)\"\n    >\n      <mat-icon>download</mat-icon>\n      {{ format.label }}\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:.25rem}:host .name{color:var(--mat-sys-on-surface);font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .description{margin:0;color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .formats{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem}\n"] }]
        }], propDecorators: { file: [{ type: i0.Input, args: [{ isSignal: true, alias: "file", required: true }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], download: [{ type: i0.Output, args: ["download"] }] } });

/** Guide for embedding the visualization in a website */
const EMBEDDING_GUIDE_URL = 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md';
/** Text content for the toolbar */
const TOOLBAR_CONTENT = {
    label: 'Visualization actions',
    panels: {
        label: 'Panels',
        tooltip: 'Show or hide panels',
        options: [
            { id: 'metadata', label: 'Metadata' },
            { id: 'distance-visualization', label: 'Spatial view' },
            { id: 'violin-graph', label: 'Violin graph' },
            { id: 'histogram', label: 'Histogram' },
        ],
        showAll: 'Show all panels',
    },
    display: {
        label: 'Display',
        tooltip: 'Show or hide cell links and metadata',
        cellLinks: { label: 'Cell links', description: 'Lines from each cell to its nearest anchor cell' },
        cellLinkData: { label: 'Cell link data', description: 'Link counts in the Cell types table' },
        allMetadata: { label: 'All metadata', description: 'Include fields with no value' },
    },
    reset: {
        label: 'Reset',
        tooltip: 'Restore the view, cells or colors',
        view: { label: 'Reset view', description: 'Zoom to fit and undo rotation' },
        deletedCells: { label: 'Restore deleted cells', description: 'Cells deleted in the spatial view' },
        colors: { label: 'Reset colors', description: 'Use default colors for all cell types' },
        everything: {
            label: 'Reset everything',
            description: 'View, panels, cells, colors, selection and display options',
        },
    },
    downloads: {
        label: 'Downloads',
        tooltip: 'Download data and images',
    },
    embed: {
        label: 'Embed',
        tooltip: 'Open the embedding guide on GitHub',
        url: EMBEDDING_GUIDE_URL,
    },
    theme: {
        label: 'Theme',
        tooltip: 'Choose a light or dark theme',
        options: [
            { id: 'system', label: 'System settings', icon: 'brightness_4' },
            { id: 'light', label: 'Light theme', icon: 'light_mode' },
            { id: 'dark', label: 'Dark theme', icon: 'dark_mode' },
        ],
    },
    info: {
        label: 'Info',
        tooltip: 'What each panel shows',
    },
    help: {
        label: 'Help',
        tooltip: 'Open guides and source code',
        links: [
            { id: 'user-guide', label: 'User guide', url: 'https://humanatlas.io/user-story/5' },
            {
                id: 'github',
                label: 'Code on GitHub',
                url: 'https://github.com/hubmapconsortium/hra-ui/tree/main/apps/cde-ui',
            },
            { id: 'embedding-guide', label: 'Embedding guide', url: EMBEDDING_GUIDE_URL },
        ],
    },
    more: {
        label: 'More',
        tooltip: 'More actions',
    },
};

/** Text content for the downloads button and drawer */
const DOWNLOADS_CONTENT = {
    title: 'Downloads',
    description: "Files match what's shown: visible cell types only, without deleted cells.",
    closeLabel: 'Close downloads',
    noticeLabel: 'Info',
    groups: [
        {
            heading: 'Images',
            files: [
                {
                    id: 'visualization',
                    name: 'Spatial view',
                    description: 'An image of the current view.',
                    formats: [{ id: 'png', label: 'PNG', ariaLabel: 'Download spatial view PNG' }],
                },
                {
                    id: 'violin-graph',
                    name: 'Violin graph',
                    description: 'Distance distribution for each cell type.',
                    formats: [
                        { id: 'png', label: 'PNG', ariaLabel: 'Download violin graph PNG' },
                        { id: 'svg', label: 'SVG', ariaLabel: 'Download violin graph SVG' },
                    ],
                },
                {
                    id: 'histogram',
                    name: 'Histogram',
                    description: 'Cell counts by distance to the nearest anchor cell.',
                    formats: [
                        { id: 'png', label: 'PNG', ariaLabel: 'Download histogram PNG' },
                        { id: 'svg', label: 'SVG', ariaLabel: 'Download histogram SVG' },
                    ],
                },
            ],
        },
        {
            heading: 'Data',
            files: [
                {
                    id: 'cells',
                    name: 'Cells',
                    description: 'Nodes: one row per cell, with its cell type and coordinates.',
                    formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cells CSV' }],
                },
                {
                    id: 'cell-links',
                    name: 'Cell links',
                    description: 'Edges: one row per link from a cell to its nearest anchor cell, with the distance.',
                    formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cell links CSV' }],
                },
                {
                    id: 'color-map',
                    name: 'Cell color map',
                    description: 'One row per cell type, with its color.',
                    formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cell color map CSV' }],
                },
            ],
            notice: {
                text: 'Embedding the visualization? It needs the Cells CSV. Cell links and the cell color map are optional and are generated when missing.',
                link: {
                    label: 'Embedding guide on GitHub',
                    url: EMBEDDING_GUIDE_URL,
                },
            },
        },
    ],
    unavailable: {
        noCellTypes: 'Select at least one cell type to download files.',
        noDistances: (anchorCellType) => `Select a cell type other than ${anchorCellType} to download the violin graph and histogram.`,
        hiddenPanels: 'Show a hidden panel from the Panels menu to download its image.',
        hiddenPanelsInTabs: "Images aren't available for hidden panels.",
        showAllPanels: 'Show all panels',
    },
};

/** Counter to keep track of distinct instances */
let idCounter$1 = 0;
/**
 * Lists every file available for download. Rendered inside the downloads drawer.
 */
class DownloadsComponent {
    /** Emits when the close button is clicked */
    closeClick = output();
    /** Emits when a file download is requested */
    download = output();
    /** Emits when the notice's Show all panels button is clicked */
    showAllPanelsClick = output();
    /** Files that can't be downloaded because they would be empty, or undefined when every file can be */
    unavailable = input(...(ngDevMode ? [undefined, { debugName: "unavailable" }] : /* istanbul ignore next */ []));
    /** Id attribute for the title, used to label the drawer */
    titleId = `cde-downloads-title-${idCounter$1}`;
    /** Id attribute for the description, used to describe the drawer */
    descriptionId = `cde-downloads-description-${idCounter$1}`;
    /** Id attribute for the unavailable files notice */
    unavailableNoticeId = `cde-downloads-unavailable-notice-${idCounter$1++}`;
    /** Ids of the elements describing the drawer: the description, and the unavailable files notice when it shows */
    describedBy = computed(() => this.unavailable() ? `${this.descriptionId} ${this.unavailableNoticeId}` : this.descriptionId, ...(ngDevMode ? [{ debugName: "describedBy" }] : /* istanbul ignore next */ []));
    /** Files that are disabled */
    disabledFiles = computed(() => new Set(this.unavailable()?.files), ...(ngDevMode ? [{ debugName: "disabledFiles" }] : /* istanbul ignore next */ []));
    /** Text content */
    content = DOWNLOADS_CONTENT;
    /** File rows, in the order they show */
    fileRows = viewChildren(DownloadFileComponent, ...(ngDevMode ? [{ debugName: "fileRows" }] : /* istanbul ignore next */ []));
    /** Injector for the render callback that moves focus */
    injector = inject(Injector);
    /**
     * Asks to show all panels, then moves focus to the first file that became available,
     * since the notice and its button can go away
     */
    showAllPanels() {
        const wasDisabled = this.disabledFiles();
        this.showAllPanelsClick.emit();
        afterNextRender(() => {
            const isEnabled = (row) => !this.disabledFiles().has(row.file().id);
            const rows = this.fileRows();
            const row = rows.find((r) => wasDisabled.has(r.file().id) && isEnabled(r)) ?? rows.find(isEnabled);
            row?.focus();
        }, { injector: this.injector });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: DownloadsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: DownloadsComponent, isStandalone: true, selector: "cde-downloads", inputs: { unavailable: { classPropertyName: "unavailable", publicName: "unavailable", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closeClick: "closeClick", download: "download", showAllPanelsClick: "showAllPanelsClick" }, viewQueries: [{ propertyName: "fileRows", predicate: DownloadFileComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"header\">\n  <h2 class=\"title\" [id]=\"titleId\">{{ content.title }}</h2>\n  <button\n    mat-icon-button\n    class=\"close\"\n    hraFeature=\"close\"\n    hraClickEvent\n    [attr.aria-label]=\"content.closeLabel\"\n    [hraPlainTooltip]=\"content.closeLabel\"\n    (click)=\"closeClick.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <p class=\"description\" [id]=\"descriptionId\">{{ content.description }}</p>\n</div>\n\n<ng-scrollbar class=\"body\" orientation=\"vertical\" hraScrollOverflowFade>\n  <div class=\"groups\">\n    @if (unavailable(); as unavailable) {\n      <div class=\"notice unavailable-notice\" hraFeature=\"unavailable-notice\">\n        <mat-icon class=\"notice-icon\">info</mat-icon>\n        <div class=\"notice-content\">\n          <p class=\"notice-body\" [id]=\"unavailableNoticeId\">\n            <span class=\"cdk-visually-hidden\">{{ content.noticeLabel }}:</span>\n            {{ unavailable.notice }}\n          </p>\n          @if (unavailable.showPanels) {\n            <button\n              matButton=\"outlined\"\n              class=\"notice-action\"\n              hraFeature=\"show-all-panels\"\n              hraClickEvent\n              (click)=\"showAllPanels()\"\n            >\n              <mat-icon>visibility</mat-icon>\n              {{ content.unavailable.showAllPanels }}\n            </button>\n          }\n        </div>\n      </div>\n    }\n\n    @for (group of content.groups; track group.heading) {\n      <section class=\"group\">\n        <h3 class=\"group-heading\">{{ group.heading }}</h3>\n        <ul class=\"files\">\n          @for (file of group.files; track file.id) {\n            <li [hraFeature]=\"file.id\">\n              <cde-download-file\n                [file]=\"file\"\n                [disabled]=\"disabledFiles().has(file.id)\"\n                (download)=\"download.emit({ file: file.id, format: $event })\"\n              />\n            </li>\n          }\n        </ul>\n\n        @if (group.notice; as notice) {\n          <div class=\"notice\">\n            <mat-icon class=\"notice-icon\">info</mat-icon>\n            <div class=\"notice-content\">\n              <p class=\"notice-body\">\n                <span class=\"cdk-visually-hidden\">{{ content.noticeLabel }}:</span>\n                {{ notice.text }}\n              </p>\n              @if (notice.link; as link) {\n                <a\n                  matButton=\"outlined\"\n                  class=\"notice-action\"\n                  target=\"_blank\"\n                  rel=\"noopener noreferrer\"\n                  hraFeature=\"embedding-guide\"\n                  hraClickEvent\n                  [attr.href]=\"link.url\"\n                >\n                  <mat-icon>open_in_new</mat-icon>\n                  {{ link.label }}\n                </a>\n              }\n            </div>\n          </div>\n        }\n      </section>\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;height:100%;color:var(--mat-sys-on-surface-variant)}:host .header{display:grid;grid-template-columns:1fr auto;grid-template-areas:\"title close\" \"description description\";align-items:center;gap:.25rem .5rem;padding:1rem .75rem 1.5rem 1.5rem}:host .title{grid-area:title;margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking)}:host .close{grid-area:close}:host .description{grid-area:description;margin:0;padding-right:.75rem;color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .body{flex:1;min-height:0}:host .groups{padding:0 1.5rem 1.5rem}:host .group+.group{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--mat-sys-outline-variant)}:host .group-heading{margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking)}:host .files{display:flex;flex-direction:column;gap:1.25rem;margin:1rem 0 0;padding:0;list-style:none}:host .notice{display:flex;align-items:flex-start;gap:1rem;margin-top:1.25rem;padding:1rem;border:2px solid var(--ang-notice-info-color, var(--ang-ext-info, var(--mat-sys-outline)));border-radius:var(--ang-notice-container-shape, var(--mat-sys-corner-extra-small));background-color:var(--ang-notice-info-container-color, var(--ang-ext-info-container, var(--mat-sys-surface-container-highest)));--mat-button-outlined-outline-color: var(--ang-notice-info-color, var(--ang-ext-info, var(--mat-sys-outline)));--mat-button-outlined-label-text-color: var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant)));--mat-button-outlined-state-layer-color: var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant)));--mat-button-outlined-ripple-color: rgb(from var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant))) r g b/var(--mat-sys-pressed-state-layer-opacity))}:host .notice .notice-icon{flex-shrink:0;color:var(--ang-notice-info-color, var(--ang-ext-info, var(--mat-sys-outline)))}:host .notice .notice-content{flex:1;min-width:0}:host .notice .notice-body{margin:0;overflow-wrap:anywhere;color:var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant)));font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .notice .notice-action{margin-top:.75rem}:host .unavailable-notice{margin:0 0 1.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i4.NgScrollbar, selector: "ng-scrollbar:not([externalViewport]), [ngScrollbar]", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i5.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset", "scrollOverflowFadeBottomOffset"] }, { kind: "component", type: DownloadFileComponent, selector: "cde-download-file", inputs: ["file", "disabled"], outputs: ["download"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: DownloadsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-downloads', imports: [
                        HraCommonModule,
                        MatIconModule,
                        ButtonsModule,
                        PlainTooltipDirective,
                        ScrollingModule,
                        DownloadFileComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"header\">\n  <h2 class=\"title\" [id]=\"titleId\">{{ content.title }}</h2>\n  <button\n    mat-icon-button\n    class=\"close\"\n    hraFeature=\"close\"\n    hraClickEvent\n    [attr.aria-label]=\"content.closeLabel\"\n    [hraPlainTooltip]=\"content.closeLabel\"\n    (click)=\"closeClick.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n  <p class=\"description\" [id]=\"descriptionId\">{{ content.description }}</p>\n</div>\n\n<ng-scrollbar class=\"body\" orientation=\"vertical\" hraScrollOverflowFade>\n  <div class=\"groups\">\n    @if (unavailable(); as unavailable) {\n      <div class=\"notice unavailable-notice\" hraFeature=\"unavailable-notice\">\n        <mat-icon class=\"notice-icon\">info</mat-icon>\n        <div class=\"notice-content\">\n          <p class=\"notice-body\" [id]=\"unavailableNoticeId\">\n            <span class=\"cdk-visually-hidden\">{{ content.noticeLabel }}:</span>\n            {{ unavailable.notice }}\n          </p>\n          @if (unavailable.showPanels) {\n            <button\n              matButton=\"outlined\"\n              class=\"notice-action\"\n              hraFeature=\"show-all-panels\"\n              hraClickEvent\n              (click)=\"showAllPanels()\"\n            >\n              <mat-icon>visibility</mat-icon>\n              {{ content.unavailable.showAllPanels }}\n            </button>\n          }\n        </div>\n      </div>\n    }\n\n    @for (group of content.groups; track group.heading) {\n      <section class=\"group\">\n        <h3 class=\"group-heading\">{{ group.heading }}</h3>\n        <ul class=\"files\">\n          @for (file of group.files; track file.id) {\n            <li [hraFeature]=\"file.id\">\n              <cde-download-file\n                [file]=\"file\"\n                [disabled]=\"disabledFiles().has(file.id)\"\n                (download)=\"download.emit({ file: file.id, format: $event })\"\n              />\n            </li>\n          }\n        </ul>\n\n        @if (group.notice; as notice) {\n          <div class=\"notice\">\n            <mat-icon class=\"notice-icon\">info</mat-icon>\n            <div class=\"notice-content\">\n              <p class=\"notice-body\">\n                <span class=\"cdk-visually-hidden\">{{ content.noticeLabel }}:</span>\n                {{ notice.text }}\n              </p>\n              @if (notice.link; as link) {\n                <a\n                  matButton=\"outlined\"\n                  class=\"notice-action\"\n                  target=\"_blank\"\n                  rel=\"noopener noreferrer\"\n                  hraFeature=\"embedding-guide\"\n                  hraClickEvent\n                  [attr.href]=\"link.url\"\n                >\n                  <mat-icon>open_in_new</mat-icon>\n                  {{ link.label }}\n                </a>\n              }\n            </div>\n          </div>\n        }\n      </section>\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;height:100%;color:var(--mat-sys-on-surface-variant)}:host .header{display:grid;grid-template-columns:1fr auto;grid-template-areas:\"title close\" \"description description\";align-items:center;gap:.25rem .5rem;padding:1rem .75rem 1.5rem 1.5rem}:host .title{grid-area:title;margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking)}:host .close{grid-area:close}:host .description{grid-area:description;margin:0;padding-right:.75rem;color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .body{flex:1;min-height:0}:host .groups{padding:0 1.5rem 1.5rem}:host .group+.group{margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--mat-sys-outline-variant)}:host .group-heading{margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking)}:host .files{display:flex;flex-direction:column;gap:1.25rem;margin:1rem 0 0;padding:0;list-style:none}:host .notice{display:flex;align-items:flex-start;gap:1rem;margin-top:1.25rem;padding:1rem;border:2px solid var(--ang-notice-info-color, var(--ang-ext-info, var(--mat-sys-outline)));border-radius:var(--ang-notice-container-shape, var(--mat-sys-corner-extra-small));background-color:var(--ang-notice-info-container-color, var(--ang-ext-info-container, var(--mat-sys-surface-container-highest)));--mat-button-outlined-outline-color: var(--ang-notice-info-color, var(--ang-ext-info, var(--mat-sys-outline)));--mat-button-outlined-label-text-color: var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant)));--mat-button-outlined-state-layer-color: var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant)));--mat-button-outlined-ripple-color: rgb(from var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant))) r g b/var(--mat-sys-pressed-state-layer-opacity))}:host .notice .notice-icon{flex-shrink:0;color:var(--ang-notice-info-color, var(--ang-ext-info, var(--mat-sys-outline)))}:host .notice .notice-content{flex:1;min-width:0}:host .notice .notice-body{margin:0;overflow-wrap:anywhere;color:var(--ang-notice-info-body-color, var(--ang-ext-on-info-container-variant, var(--mat-sys-on-surface-variant)));font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .notice .notice-action{margin-top:.75rem}:host .unavailable-notice{margin:0 0 1.5rem}\n"] }]
        }], propDecorators: { closeClick: [{ type: i0.Output, args: ["closeClick"] }], download: [{ type: i0.Output, args: ["download"] }], showAllPanelsClick: [{ type: i0.Output, args: ["showAllPanelsClick"] }], unavailable: [{ type: i0.Input, args: [{ isSignal: true, alias: "unavailable", required: false }] }], fileRows: [{ type: i0.ViewChildren, args: [i0.forwardRef(() => DownloadFileComponent), { isSignal: true }] }] } });

/** Label for the action that selects every cell type again */
const SELECT_ALL_LABEL = 'Select all cell types';
/** Shown in the visualization panels when no cell types are selected */
const NO_CELL_TYPES_SELECTED_CONTENT = {
    heading: 'No cell types selected',
    description: 'Select cell types to show their cells and distances.',
    actionLabel: SELECT_ALL_LABEL,
};
/**
 * Shown in the charts when only the anchor cell type is selected. The charts leave the anchor type out,
 * so they have no distances to show.
 *
 * @param anchorCellType Name of the anchor cell type
 * @returns Empty state content
 */
function noDistancesContent(anchorCellType) {
    return {
        heading: 'No distances to show',
        description: `Select a cell type other than ${anchorCellType} to show its distances.`,
        actionLabel: SELECT_ALL_LABEL,
    };
}

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: FileSaverService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: FileSaverService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: FileSaverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/** Media query matching a system preference for dark colors */
const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)';
/**
 * Watches the page's part of what decides whether theme colors resolve to their light or dark values:
 * the system color scheme preference and the `color-scheme` of the document's root element.
 * Must be called in an injection context.
 *
 * @returns A signal whose value changes when either one changes
 */
function watchPageColorScheme() {
    const root = inject(DOCUMENT).documentElement;
    const prefersDark$ = inject(BreakpointObserver).observe(PREFERS_DARK_QUERY);
    const prefersDark = toSignal(prefersDark$.pipe(map((state) => state.matches)), { requireSync: true });
    const readRootColorScheme = () => getComputedStyle(root).colorScheme ?? '';
    const rootColorScheme = signal(readRootColorScheme(), ...(ngDevMode ? [{ debugName: "rootColorScheme" }] : /* istanbul ignore next */ []));
    const observer = new MutationObserver(() => rootColorScheme.set(readRootColorScheme()));
    observer.observe(root, { attributes: true });
    inject(DestroyRef).onDestroy(() => observer.disconnect());
    return computed(() => `${rootColorScheme()} ${prefersDark() ? 'dark' : 'light'}`);
}

/**
 * Class on the document's root element while a theme change's view transition runs,
 * so its fade timing doesn't change the page's own view transitions
 */
const THEME_SWITCH_TRANSITION_CLASS = 'cde-visualization-theme-switch';
/** Color that computes to white where the dark theme is in effect, and to black elsewhere */
const THEME_PROBE_COLOR = 'light-dark(rgb(0, 0, 0), rgb(255, 255, 255))';
/**
 * Switches the visualization between the page's theme and the light and dark themes, like cde-ui's header theme menu.
 * It changes only the visualization: the color scheme of the visualization element and of the overlay container
 * that holds its menus, tooltips and fullscreen views, not the page's.
 * It starts on the page's theme and doesn't remember the choice.
 * Provided by the visualization's root component, whose element it switches.
 */
class ThemeSwitchService {
    /** Document, whose view transitions fade between the themes */
    document = inject(DOCUMENT);
    /** Application, used to wait until every view has updated to the new theme */
    appRef = inject(ApplicationRef);
    /** Visualization element */
    el = inject(ElementRef).nativeElement;
    /** Overlay container, which holds the visualization's menus, tooltips and fullscreen views */
    overlayContainer = inject(OverlayContainer);
    /** Changes when the page's color scheme might have changed */
    pageColorScheme = watchPageColorScheme();
    /** Theme the page gives the visualization */
    pageTheme = computed(() => {
        this.pageColorScheme();
        return this.readPageTheme();
    }, ...(ngDevMode ? [{ debugName: "pageTheme" }] : /* istanbul ignore next */ []));
    /** Theme menu choice, writable */
    preferenceSignal = signal('system', ...(ngDevMode ? [{ debugName: "preferenceSignal" }] : /* istanbul ignore next */ []));
    /** Theme menu choice */
    preference = this.preferenceSignal.asReadonly();
    /** Theme in effect */
    theme = computed(() => {
        const preference = this.preference();
        return preference === 'system' ? this.pageTheme() : preference;
    }, ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    /**
     * Switches to a theme menu choice. Where view transitions are supported, the visualization keeps showing
     * the old theme until everything, including the charts that redraw in the new colors, has updated,
     * then switches all at once.
     *
     * @param preference Theme menu choice
     */
    setPreference(preference) {
        if (preference === untracked(this.preference)) {
            return;
        }
        const colorScheme = preference === 'system' ? '' : preference;
        const apply = () => {
            this.preferenceSignal.set(preference);
            this.el.style.colorScheme = colorScheme;
            this.overlayContainer.getContainerElement().style.colorScheme = colorScheme;
        };
        if (typeof this.document.startViewTransition !== 'function') {
            apply();
            return;
        }
        const root = this.document.documentElement;
        const removeTransitionClass = () => root.classList.remove(THEME_SWITCH_TRANSITION_CLASS);
        root.classList.add(THEME_SWITCH_TRANSITION_CLASS);
        const transition = this.document.startViewTransition(async () => {
            apply();
            await this.appRef.whenStable();
        });
        transition.finished.then(removeTransitionClass, removeTransitionClass);
    }
    /**
     * Reads the theme the page gives the visualization by resolving a `light-dark()` color in the element's parent,
     * which has the page's color scheme but not the theme menu choice
     *
     * @returns The page's theme. Environments that don't resolve `light-dark()`, such as jsdom, get the light theme.
     */
    readPageTheme() {
        const parent = this.el.parentElement ?? this.document.documentElement;
        const probe = this.document.createElement('span');
        probe.style.display = 'none';
        probe.style.color = THEME_PROBE_COLOR;
        parent.appendChild(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color === 'rgb(255, 255, 255)' ? 'dark' : 'light';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ThemeSwitchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ThemeSwitchService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ThemeSwitchService, decorators: [{
            type: Injectable
        }] });

/** Type token used for all chart text */
const CHART_FONT_TOKEN = '--mat-sys-body-medium';
/** Chart font to use if the type token is not set: body medium in the AtlasNG HRA theme */
const CHART_FONT_FALLBACK = { font: 'Nunito Sans Variable', fontSize: 14, fontWeight: 400, lineHeight: 21 };
/** Theme token and fallback value for each chart theme color. Fallbacks are the AtlasNG HRA light theme's values. */
const CHART_THEME_TOKENS = {
    background: ['--mat-sys-background', '#fcfbfd'],
    titleColor: ['--mat-sys-on-surface', '#1a1c1e'],
    labelColor: ['--mat-sys-on-surface-variant', '#414751'],
    gridColor: ['--mat-sys-outline-variant', '#c1c7d4'],
    markColor: ['--mat-sys-on-surface', '#1a1c1e'],
};
/** Spec param (Vega signal) holding each chart theme color */
const CHART_THEME_PARAMS = {
    background: 'themeBackground',
    titleColor: 'themeTitleColor',
    labelColor: 'themeLabelColor',
    gridColor: 'themeGridColor',
    markColor: 'themeMarkColor',
};
/** Matches the `rgb()` and `rgba()` colors that `getComputedStyle` returns */
const RGB_COLOR = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/;
/**
 * Reads the chart theme from the CSS custom properties in effect on an element.
 * Properties whose token is not set use the AtlasNG HRA light theme's value.
 *
 * @param el Element to read the computed styles of
 * @returns The chart theme
 */
function getChartTheme(el) {
    return {
        ...resolveFont(el),
        background: resolveColor(el, CHART_THEME_TOKENS.background),
        titleColor: resolveColor(el, CHART_THEME_TOKENS.titleColor),
        labelColor: resolveColor(el, CHART_THEME_TOKENS.labelColor),
        gridColor: resolveColor(el, CHART_THEME_TOKENS.gridColor),
        markColor: resolveColor(el, CHART_THEME_TOKENS.markColor),
    };
}
/**
 * Resolves a color token to a hex color.
 * Color tokens can hold `light-dark()` values, which only the browser can resolve,
 * so the token is applied to a hidden probe element and its computed color is read back.
 *
 * @param el Element whose color scheme and tokens are used
 * @param tokenAndFallback Token to resolve and the color to use if it is not set
 * @returns The resolved color
 */
function resolveColor(el, [token, fallback]) {
    const probe = el.ownerDocument.createElement('span');
    probe.style.display = 'none';
    probe.style.color = `var(${token}, ${fallback})`;
    el.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    // Environments that don't resolve CSS variables, such as jsdom, return the value unresolved
    const match = RGB_COLOR.exec(color);
    return match ? rgbToHex([Number(match[1]), Number(match[2]), Number(match[3])]) : fallback;
}
/**
 * Resolves the chart type token to the font family, size, weight, and line height Vega needs.
 * The token is applied to a hidden probe element and its computed font is read back.
 *
 * @param el Element whose tokens are used
 * @returns The resolved font
 */
function resolveFont(el) {
    const { font, fontSize, fontWeight, lineHeight } = CHART_FONT_FALLBACK;
    const probe = el.ownerDocument.createElement('span');
    probe.style.display = 'none';
    probe.style.font = `var(${CHART_FONT_TOKEN}, ${fontWeight} ${fontSize}px/${lineHeight}px ${font})`;
    el.appendChild(probe);
    const styles = getComputedStyle(probe);
    const resolved = {
        font: styles.fontFamily,
        fontSize: Number.parseFloat(styles.fontSize),
        fontWeight: Number.parseFloat(styles.fontWeight),
        lineHeight: Number.parseFloat(styles.lineHeight),
    };
    probe.remove();
    // Environments that don't resolve CSS variables, such as jsdom, return no usable font
    if (!resolved.font || !Number.isFinite(resolved.fontSize)) {
        return CHART_FONT_FALLBACK;
    }
    return {
        font: resolved.font,
        fontSize: resolved.fontSize,
        fontWeight: Number.isFinite(resolved.fontWeight) ? resolved.fontWeight : fontWeight,
        lineHeight: Number.isFinite(resolved.lineHeight) ? resolved.lineHeight : Math.round(resolved.fontSize * 1.5),
    };
}
/**
 * Sets the font and the initial theme colors of a spec from a chart theme.
 * All chart labels and titles use the theme's body medium type.
 * Mutates the spec, so call it on an immer draft.
 *
 * @param spec Spec draft to update
 * @param theme Chart theme to apply
 */
function applyChartTheme(spec, theme) {
    const text = {
        labelFontSize: theme.fontSize,
        titleFontSize: theme.fontSize,
        labelFontWeight: theme.fontWeight,
        titleFontWeight: theme.fontWeight,
        labelLineHeight: theme.lineHeight,
        titleLineHeight: theme.lineHeight,
    };
    spec.config.font = theme.font;
    Object.assign(spec.config.axis, text);
    spec.config.header = { ...spec.config.header, ...text };
    spec.config.legend = {
        ...spec.config.legend,
        labelFontSize: theme.fontSize,
        titleFontSize: theme.fontSize,
        labelFontWeight: theme.fontWeight,
        titleFontWeight: theme.fontWeight,
        titleLineHeight: theme.lineHeight,
    };
    if (spec.config.title) {
        spec.config.title = {
            ...spec.config.title,
            fontSize: theme.fontSize,
            fontWeight: theme.fontWeight,
            lineHeight: theme.lineHeight,
        };
    }
    for (const param of spec.params) {
        const color = getThemeColorKey(param.name);
        if (color) {
            param.value = theme[color];
        }
    }
}
/**
 * Updates the theme colors of a rendered chart in place.
 * Only the colors are re-encoded, so data transforms such as binning and density estimates don't run again.
 *
 * @param view Vega view of a spec with the theme color params
 * @param theme Chart theme to apply
 */
function updateChartTheme(view, theme) {
    for (const [color, name] of Object.entries(CHART_THEME_PARAMS)) {
        view.signal(name, theme[color]);
    }
    view.run();
}
/**
 * Finds the chart theme color a spec param holds
 *
 * @param name Param name
 * @returns The chart theme color, or undefined if the param doesn't hold one
 */
function getThemeColorKey(name) {
    const entry = Object.entries(CHART_THEME_PARAMS).find(([, param]) => param === name);
    return entry?.[0];
}
/**
 * Watches what decides whether theme colors resolve to their light or dark values:
 * the system color scheme preference, the `color-scheme` of the document's root element,
 * and the theme picked with the visualization's theme switch.
 * Must be called in an injection context.
 *
 * @returns A signal whose value changes when any of them changes
 */
function watchColorScheme() {
    const pageColorScheme = watchPageColorScheme();
    const themeSwitch = inject(ThemeSwitchService, { optional: true });
    return computed(() => `${pageColorScheme()} ${themeSwitch?.theme() ?? ''}`);
}

/** Id of the element vega-tooltip shows tooltips in */
const TOOLTIP_ELEMENT_ID = 'vg-tooltip-element';
/**
 * Sets up a chart's tooltips. After each tooltip update, the tooltip element:
 * - Moves into the overlay holding the chart, such as a fullscreen view, or back to the body.
 *   vega-tooltip appends its element to the body, but CDK overlays open in the browser's top layer,
 *   which covers the rest of the page whatever its z-index.
 * - Takes the chart's font. The body is outside the app element that holds the theme's font tokens,
 *   so the tooltip can't read the font from the stylesheet.
 *
 * @param view Vega view using vega-embed's tooltip handler
 */
function setUpChartTooltips(view) {
    const tooltip = view.tooltip();
    view.tooltip(function (handler, event, item, value) {
        tooltip.call(this, handler, event, item, value);
        const chart = view.container();
        const el = (chart?.ownerDocument ?? document).getElementById(TOOLTIP_ELEMENT_ID);
        if (chart && el) {
            moveTooltipElement(el, chart);
            matchChartFont(el, chart);
        }
    });
}
/**
 * Moves the tooltip element into the overlay holding a chart,
 * or into the fullscreen element or body when the chart is not in an overlay
 *
 * @param el Tooltip element
 * @param chart Element the chart is rendered in
 */
function moveTooltipElement(el, chart) {
    const doc = chart.ownerDocument;
    const overlay = chart.closest('.cdk-overlay-pane')?.parentElement;
    const parent = overlay ?? doc.fullscreenElement ?? doc.body;
    if (el.parentElement !== parent) {
        parent.appendChild(el);
    }
}
/**
 * Sets the tooltip element's font family to the one the chart's container uses
 *
 * @param el Tooltip element
 * @param chart Element the chart is rendered in
 */
function matchChartFont(el, chart) {
    const font = getComputedStyle(chart).fontFamily;
    if (font && el.style.fontFamily !== font) {
        el.style.fontFamily = font;
    }
}

/**
 * Covers a chart while its data loads, in the same place as the empty state.
 * Place it in a positioned container next to the chart.
 */
class ChartSkeletonComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ChartSkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.25", type: ChartSkeletonComponent, isStandalone: true, selector: "cde-chart-skeleton", ngImport: i0, template: '<cde-skeleton shape="rect" />', isInline: true, styles: [":host{position:absolute;inset:0;z-index:1;display:flex;padding:0 1rem 1rem;background-color:var(--mat-sys-background)}:host cde-skeleton{flex-grow:1}\n"], dependencies: [{ kind: "component", type: SkeletonComponent, selector: "cde-skeleton", inputs: ["shape"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ChartSkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-chart-skeleton', imports: [SkeletonComponent], template: '<cde-skeleton shape="rect" />', changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{position:absolute;inset:0;z-index:1;display:flex;padding:0 1rem 1rem;background-color:var(--mat-sys-background)}:host cde-skeleton{flex-grow:1}\n"] }]
        }] });

/**
 * Covers a chart that has nothing to show, with a heading, supporting text, and an action.
 * Place it in a positioned container next to the chart.
 */
class EmptyStateComponent {
    /** Text content */
    content = input.required(...(ngDevMode ? [{ debugName: "content" }] : /* istanbul ignore next */ []));
    /** Emits when the action button is clicked */
    actionClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: EmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.25", type: EmptyStateComponent, isStandalone: true, selector: "cde-empty-state", inputs: { content: { classPropertyName: "content", publicName: "content", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { actionClick: "actionClick" }, ngImport: i0, template: "<p class=\"heading\">{{ content().heading }}</p>\n<p class=\"description\">{{ content().description }}</p>\n<button matButton=\"outlined\" class=\"action\" hraFeature=\"action\" hraClickEvent (click)=\"actionClick.emit()\">\n  {{ content().actionLabel }}\n</button>\n", styles: [":host{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.25rem;padding:1rem;text-align:center;background-color:var(--mat-sys-background)}:host .heading{margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .description{margin:0;color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .action{margin-top:.75rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: EmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-empty-state', imports: [HraCommonModule, MatButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p class=\"heading\">{{ content().heading }}</p>\n<p class=\"description\">{{ content().description }}</p>\n<button matButton=\"outlined\" class=\"action\" hraFeature=\"action\" hraClickEvent (click)=\"actionClick.emit()\">\n  {{ content().actionLabel }}\n</button>\n", styles: [":host{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.25rem;padding:1rem;text-align:center;background-color:var(--mat-sys-background)}:host .heading{margin:0;color:var(--mat-sys-on-surface);font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .description{margin:0;color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .action{margin-top:.75rem}\n"] }]
        }], propDecorators: { content: [{ type: i0.Input, args: [{ isSignal: true, alias: "content", required: true }] }], actionClick: [{ type: i0.Output, args: ["actionClick"] }] } });

var $schema$1 = "https://vega.github.io/schema/vega-lite/v5.json";
var width = "container";
var height = "container";
var background$1 = {
	expr: "themeBackground"
};
var config$1 = {
	font: "Nunito Sans Variable",
	padding: {
		top: 0,
		right: 16,
		bottom: 16,
		left: 16
	},
	axis: {
		labelFontSize: 14,
		titleFontSize: 14,
		titleFontWeight: 400,
		labelFontWeight: 400,
		titleLineHeight: 21,
		labelLineHeight: 21,
		titleColor: {
			expr: "themeTitleColor"
		},
		labelColor: {
			expr: "themeLabelColor"
		},
		ticks: false,
		domain: false,
		labelPadding: 8,
		gridColor: {
			expr: "themeGridColor"
		}
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
	},
	{
		name: "themeBackground",
		value: "#fcfbfd"
	},
	{
		name: "themeTitleColor",
		value: "#1a1c1e"
	},
	{
		name: "themeLabelColor",
		value: "#414751"
	},
	{
		name: "themeGridColor",
		value: "#c1c7d4"
	},
	{
		name: "themeMarkColor",
		value: "#1a1c1e"
	}
];
var transform$1 = [
	{
		calculate: "[datum.type, 'All cells']",
		as: "type"
	},
	{
		flatten: [
			"type"
		]
	},
	{
		bin: {
			step: 5
		},
		field: "distance",
		as: "bin_start"
	}
];
var mark = {
	type: "line",
	interpolate: "step"
};
var encoding = {
	x: {
		field: "bin_start",
		type: "quantitative",
		title: "Distance (µm)",
		scale: {
			domainMin: -5
		},
		axis: {
			orient: "top",
			tickCount: {
				expr: "ceil(width / 80)"
			},
			minExtent: 25,
			labelFlush: true,
			grid: true,
			labelAngle: 0,
			labelOverlap: true,
			labelSeparation: 4
		}
	},
	y: {
		aggregate: "count",
		title: "Number of cells",
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
					expr: "'Replaced/repeated in javascript' && colors[0] || themeMarkColor"
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

/** Font sizes used in the histogram, in pixels */
const HISTOGRAM_FONT_SIZES = [12, 14];
/** Label for all cell types */
const ALL_CELLS_TYPE = 'All cells';
/** Width of the exported image */
const EXPORT_IMAGE_WIDTH$1 = 1000;
/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT$1 = 500;
/** Padding for the exported image */
const EXPORT_IMAGE_PADDING$1 = 16;
/** Configuration for the legend in the exported image. Its text uses the chart theme's type (see applyChartTheme). */
const EXPORT_IMAGE_LEGEND_CONFIG$1 = {
    title: null,
    symbolType: 'circle',
    symbolStrokeWidth: 10,
};
/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH$1 = 2000;
/** Dynamic color range for the histogram */
const DYNAMIC_COLOR_RANGE$1 = Array(DYNAMIC_COLOR_RANGE_LENGTH$1)
    .fill(0)
    .map((_value, index) => ({ expr: `colors[${index}] || themeMarkColor` }));
/**
 * Histogram Component
 */
class HistogramComponent {
    /** Data for the visualization */
    data = input.required(...(ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []));
    /** Colors for the visualization */
    colors = input.required(...(ngDevMode ? [{ debugName: "colors" }] : /* istanbul ignore next */ []));
    /** Cell types to use for the visualization */
    filteredCellTypes = input.required(...(ngDevMode ? [{ debugName: "filteredCellTypes" }] : /* istanbul ignore next */ []));
    /** Whether the data is loading, which shows a skeleton in place of the histogram */
    loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    /** Empty state shown in place of the histogram, or undefined when there are distances to show */
    emptyState = input(...(ngDevMode ? [undefined, { debugName: "emptyState" }] : /* istanbul ignore next */ []));
    /** Emits when the empty state's action is clicked */
    emptyStateAction = output();
    /** Whether the panel can open in full screen. The tabbed layout turns it off, which also closes an open view. */
    fullscreenAvailable = input(true, ...(ngDevMode ? [{ debugName: "fullscreenAvailable" }] : /* istanbul ignore next */ []));
    /** Emits true when the panel opens in full screen and false when it closes */
    fullscreenChange = output();
    /** Toggles full screen mode */
    fullscreen = signal(false, ...(ngDevMode ? [{ debugName: "fullscreen" }] : /* istanbul ignore next */ []));
    /** Label for the total cell type */
    totalCellTypeLabel = ALL_CELLS_TYPE;
    /** Reference to the document object */
    document = inject(DOCUMENT);
    /** Host element, where the theme colors are read */
    el = inject(ElementRef).nativeElement;
    /** Changes when the color scheme changes */
    colorScheme = watchColorScheme();
    /** Chart theme, read again when the color scheme changes */
    theme = computed(() => {
        this.colorScheme();
        return getChartTheme(this.el);
    }, ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    /** Color picked for the total cell type, or undefined to use the theme's mark color */
    allCellsColor = model(undefined, ...(ngDevMode ? [{ debugName: "allCellsColor" }] : /* istanbul ignore next */ []));
    /** Color for the total cell type */
    totalCellTypeColor = computed(() => this.allCellsColor() ?? hexToRgb(this.theme().markColor), { ...(ngDevMode ? { debugName: "totalCellTypeColor" } : /* istanbul ignore next */ {}), equal: colorEquals });
    /** Reference to the renderer for DOM manipulation */
    renderer = inject(Renderer2);
    /** Service for saving files */
    fileSaver = inject(FileSaverService);
    /** Element reference for the histogram container */
    histogramEl = viewChild.required(FullscreenPortalComponent);
    /** Closes an open fullscreen view when full screen becomes unavailable */
    closeFullscreenRef = afterRenderEffect(() => {
        if (!this.fullscreenAvailable()) {
            untracked(() => this.histogramEl().close());
        }
    });
    /** Vega view instance for the histogram */
    view = signal(undefined, ...(ngDevMode ? [{ debugName: "view" }] : /* istanbul ignore next */ []));
    /** Emits updated color data */
    updateColor = output();
    /** Array of all colors to use in the histogram */
    allColors = computed(() => {
        const totalCellType = { name: this.totalCellTypeLabel, color: this.totalCellTypeColor() };
        return [totalCellType, ...this.filteredCellTypes()]
            .sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1))
            .map(({ color }) => rgbToHex(color));
    }, ...(ngDevMode ? [{ debugName: "allColors" }] : /* istanbul ignore next */ []));
    /** Effect for updating view data */
    viewDataRef = effect(() => this.view()?.data('data', this.data()).run(), ...(ngDevMode ? [{ debugName: "viewDataRef" }] : /* istanbul ignore next */ []));
    /** Effect for updating view colors */
    viewColorsRef = effect(() => this.view()?.signal('colors', this.allColors()).run(), ...(ngDevMode ? [{ debugName: "viewColorsRef" }] : /* istanbul ignore next */ []));
    /** Effect for updating the view's theme colors in place, without redrawing the histogram */
    viewThemeRef = effect(() => {
        const theme = this.theme();
        const view = this.view();
        if (view) {
            updateChartTheme(view, theme);
        }
    }, ...(ngDevMode ? [{ debugName: "viewThemeRef" }] : /* istanbul ignore next */ []));
    /** Effect for creating the Vega view */
    viewCreateRef = effect(async (onCleanup) => {
        // vega-embed clears the element it embeds into, so it gets the chart's own element and leaves the empty state alone
        const container = this.histogramEl().rootNodes()[0];
        const el = container.querySelector('.histogram');
        const theme = untracked(this.theme);
        await this.ensureFontsLoaded(theme.font);
        const spec = produce(HISTOGRAM_SPEC, (draft) => {
            applyChartTheme(draft, theme);
            draft.encoding.color.scale.range = DYNAMIC_COLOR_RANGE$1;
        });
        const { finalize, view } = await embed(el, spec, {
            actions: false,
        });
        setUpChartTooltips(view);
        onCleanup(finalize);
        this.view.set(view);
    }, ...(ngDevMode ? [{ debugName: "viewCreateRef" }] : /* istanbul ignore next */ []));
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
        const theme = this.theme();
        const spec = produce(HISTOGRAM_SPEC, (draft) => {
            applyChartTheme(draft, theme);
            draft.width = EXPORT_IMAGE_WIDTH$1;
            draft.height = EXPORT_IMAGE_HEIGHT$1;
            draft.config.padding.bottom = EXPORT_IMAGE_PADDING$1;
            draft.config.padding.top = EXPORT_IMAGE_PADDING$1;
            draft.config.padding.right = EXPORT_IMAGE_PADDING$1;
            draft.config.padding.left = EXPORT_IMAGE_PADDING$1;
            draft.encoding.color.legend = {
                ...EXPORT_IMAGE_LEGEND_CONFIG$1,
                titleColor: theme.titleColor,
                labelColor: theme.labelColor,
            };
            draft.data.values = this.data();
            draft.encoding.color.scale.range = this.allColors();
        });
        const el = this.renderer.createElement('div');
        const { view, finalize } = await embed(el, spec, {
            actions: false,
        });
        const url = await view.toImageURL(format);
        this.fileSaver.save(url, `cde-histogram.${format}`);
        finalize();
    }
    /**
     * Ensure required fonts are loaded for the histogram
     *
     * @param font Font family used by the histogram
     */
    async ensureFontsLoaded(font) {
        const loadPromises = HISTOGRAM_FONT_SIZES.map((size) => this.document.fonts.load(`${size}px ${font}`));
        await Promise.all(loadPromises);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: HistogramComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: HistogramComponent, isStandalone: true, selector: "cde-histogram", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: true, transformFunction: null }, colors: { classPropertyName: "colors", publicName: "colors", isSignal: true, isRequired: true, transformFunction: null }, filteredCellTypes: { classPropertyName: "filteredCellTypes", publicName: "filteredCellTypes", isSignal: true, isRequired: true, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, emptyState: { classPropertyName: "emptyState", publicName: "emptyState", isSignal: true, isRequired: false, transformFunction: null }, fullscreenAvailable: { classPropertyName: "fullscreenAvailable", publicName: "fullscreenAvailable", isSignal: true, isRequired: false, transformFunction: null }, allCellsColor: { classPropertyName: "allCellsColor", publicName: "allCellsColor", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { emptyStateAction: "emptyStateAction", fullscreenChange: "fullscreenChange", allCellsColor: "allCellsColorChange", updateColor: "updateColor" }, host: { properties: { "attr.aria-busy": "loading() || null" } }, providers: [
            {
                provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
                useValue: {
                    collapsedHeight: '56px',
                    expandedHeight: '56px',
                    hideToggle: true,
                },
            },
        ], viewQueries: [{ propertyName: "histogramEl", first: true, predicate: FullscreenPortalComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Histogram\" disabled hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-header-content>\n    <cde-color-picker-label\n      hraFeature=\"color-picker\"\n      hraClickEvent\n      [label]=\"totalCellTypeLabel\"\n      [color]=\"totalCellTypeColor()\"\n      (colorChange)=\"allCellsColor.set($event)\"\n    />\n    @if (fullscreenAvailable()) {\n      <button\n        mat-icon-button\n        aria-label=\"Open the histogram in full screen\"\n        hraPlainTooltip=\"Full screen\"\n        hraFeature=\"open-fullscreen\"\n        hraClickEvent\n        (click)=\"histogramEl().open()\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    }\n  </hra-expansion-panel-header-content>\n  <hra-fullscreen-portal\n    tagline=\"Histogram\"\n    hraFeature=\"fullscreen\"\n    (beforeOpened)=\"fullscreenChange.emit(true)\"\n    (beforeClosed)=\"fullscreenChange.emit(false)\"\n    (opened)=\"resizeAndSyncView()\"\n    (closed)=\"resizeAndSyncView()\"\n  >\n    <hra-fullscreen-portal-content data-testid=\"portal-content\">\n      <div\n        class=\"histogram\"\n        style=\"height: 100%; width: 100%\"\n        data-testid=\"histogram\"\n        hraFeature=\"histogram-chart\"\n        [attr.inert]=\"emptyState() ? '' : null\"\n        #histogram\n      ></div>\n      @if (loading()) {\n        <cde-chart-skeleton />\n      } @else if (emptyState(); as content) {\n        <cde-empty-state hraFeature=\"empty-state\" [content]=\"content\" (actionClick)=\"emptyStateAction.emit()\" />\n      }\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{height:fit-content;position:sticky;max-height:19.5rem;--mat-expansion-header-hover-state-layer-color: transparent;--mat-expansion-container-shape: 0}:host ::ng-deep .header{padding:.5rem .5rem .5rem 1rem;min-height:3.5rem}:host ::ng-deep .header hra-expansion-panel-header-content{display:flex;align-items:center;gap:.5rem}:host ::ng-deep .header hra-expansion-panel-header-content .label{max-width:unset}:host ::ng-deep .expansion-body{height:12rem;display:flex;gap:1rem}:host ::ng-deep .expansion-body hra-fullscreen-portal{width:100%}:host ::ng-deep .expansion-body .legend{overflow-y:auto;flex-grow:1;margin-left:.125rem}:host ::ng-deep .expansion-body .histogram{width:100%;height:100%}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel hra-expansion-panel-header-content cde-color-picker-label .label{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);display:flex;white-space:unset;max-width:unset}:host ::ng-deep hra-expansion-panel .mat-expansion-panel-body{padding:0 1rem .5rem .75rem}:host(.fill){height:0;flex-grow:1;max-height:none}:host(.fill) ::ng-deep hra-expansion-panel{height:100%}:host(.fill) ::ng-deep hra-expansion-panel .content{height:calc(100% - 3.5rem)}:host(.fill) ::ng-deep hra-expansion-panel .expansion-body{height:100%}hra-fullscreen-portal-content{position:relative}::ng-deep .mat-content-hide-toggle{margin-right:0!important}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "component", type: ColorPickerLabelComponent, selector: "cde-color-picker-label", inputs: ["color", "label", "isAnchor"], outputs: ["colorChange"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "component", type: FullscreenPortalComponent, selector: "hra-fullscreen-portal", inputs: ["tagline", "panelClass", "viewTransition"], outputs: ["beforeOpened", "opened", "beforeClosed", "closed", "transitionEnded"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelHeaderContentComponent, selector: "hra-expansion-panel-header-content" }, { kind: "component", type: FullscreenPortalContentComponent, selector: "hra-fullscreen-portal-content" }, { kind: "component", type: ChartSkeletonComponent, selector: "cde-chart-skeleton" }, { kind: "component", type: EmptyStateComponent, selector: "cde-empty-state", inputs: ["content"], outputs: ["actionClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: HistogramComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-histogram', imports: [
                        HraCommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatExpansionModule,
                        ColorPickerLabelComponent,
                        ScrollingModule,
                        PlainTooltipDirective,
                        FullscreenPortalComponent,
                        ExpansionPanelComponent,
                        ExpansionPanelHeaderContentComponent,
                        FullscreenPortalContentComponent,
                        ChartSkeletonComponent,
                        EmptyStateComponent,
                    ], providers: [
                        {
                            provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
                            useValue: {
                                collapsedHeight: '56px',
                                expandedHeight: '56px',
                                hideToggle: true,
                            },
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-busy]': 'loading() || null',
                    }, template: "<hra-expansion-panel tagline=\"Histogram\" disabled hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-header-content>\n    <cde-color-picker-label\n      hraFeature=\"color-picker\"\n      hraClickEvent\n      [label]=\"totalCellTypeLabel\"\n      [color]=\"totalCellTypeColor()\"\n      (colorChange)=\"allCellsColor.set($event)\"\n    />\n    @if (fullscreenAvailable()) {\n      <button\n        mat-icon-button\n        aria-label=\"Open the histogram in full screen\"\n        hraPlainTooltip=\"Full screen\"\n        hraFeature=\"open-fullscreen\"\n        hraClickEvent\n        (click)=\"histogramEl().open()\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    }\n  </hra-expansion-panel-header-content>\n  <hra-fullscreen-portal\n    tagline=\"Histogram\"\n    hraFeature=\"fullscreen\"\n    (beforeOpened)=\"fullscreenChange.emit(true)\"\n    (beforeClosed)=\"fullscreenChange.emit(false)\"\n    (opened)=\"resizeAndSyncView()\"\n    (closed)=\"resizeAndSyncView()\"\n  >\n    <hra-fullscreen-portal-content data-testid=\"portal-content\">\n      <div\n        class=\"histogram\"\n        style=\"height: 100%; width: 100%\"\n        data-testid=\"histogram\"\n        hraFeature=\"histogram-chart\"\n        [attr.inert]=\"emptyState() ? '' : null\"\n        #histogram\n      ></div>\n      @if (loading()) {\n        <cde-chart-skeleton />\n      } @else if (emptyState(); as content) {\n        <cde-empty-state hraFeature=\"empty-state\" [content]=\"content\" (actionClick)=\"emptyStateAction.emit()\" />\n      }\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{height:fit-content;position:sticky;max-height:19.5rem;--mat-expansion-header-hover-state-layer-color: transparent;--mat-expansion-container-shape: 0}:host ::ng-deep .header{padding:.5rem .5rem .5rem 1rem;min-height:3.5rem}:host ::ng-deep .header hra-expansion-panel-header-content{display:flex;align-items:center;gap:.5rem}:host ::ng-deep .header hra-expansion-panel-header-content .label{max-width:unset}:host ::ng-deep .expansion-body{height:12rem;display:flex;gap:1rem}:host ::ng-deep .expansion-body hra-fullscreen-portal{width:100%}:host ::ng-deep .expansion-body .legend{overflow-y:auto;flex-grow:1;margin-left:.125rem}:host ::ng-deep .expansion-body .histogram{width:100%;height:100%}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel hra-expansion-panel-header-content cde-color-picker-label .label{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);display:flex;white-space:unset;max-width:unset}:host ::ng-deep hra-expansion-panel .mat-expansion-panel-body{padding:0 1rem .5rem .75rem}:host(.fill){height:0;flex-grow:1;max-height:none}:host(.fill) ::ng-deep hra-expansion-panel{height:100%}:host(.fill) ::ng-deep hra-expansion-panel .content{height:calc(100% - 3.5rem)}:host(.fill) ::ng-deep hra-expansion-panel .expansion-body{height:100%}hra-fullscreen-portal-content{position:relative}::ng-deep .mat-content-hide-toggle{margin-right:0!important}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: true }] }], colors: [{ type: i0.Input, args: [{ isSignal: true, alias: "colors", required: true }] }], filteredCellTypes: [{ type: i0.Input, args: [{ isSignal: true, alias: "filteredCellTypes", required: true }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], emptyState: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyState", required: false }] }], emptyStateAction: [{ type: i0.Output, args: ["emptyStateAction"] }], fullscreenAvailable: [{ type: i0.Input, args: [{ isSignal: true, alias: "fullscreenAvailable", required: false }] }], fullscreenChange: [{ type: i0.Output, args: ["fullscreenChange"] }], allCellsColor: [{ type: i0.Input, args: [{ isSignal: true, alias: "allCellsColor", required: false }] }, { type: i0.Output, args: ["allCellsColorChange"] }], histogramEl: [{ type: i0.ViewChild, args: [i0.forwardRef(() => FullscreenPortalComponent), { isSignal: true }] }], updateColor: [{ type: i0.Output, args: ["updateColor"] }] } });

/** List of metadata fields that can be hidden */
const HIDABLE_FIELDS = [
    'title',
    'sourceFileName',
    'colorMapFileName',
    'organ',
    'technology',
    'sex',
    'age',
    'thickness',
    'pixelSize',
    'creationTimestamp',
];
/** Fields that example datasets show only with all metadata, since their values are placeholders */
const EXAMPLE_PLACEHOLDER_FIELDS = ['creationTimestamp'];
/**
 * Checks whether a field holds a placeholder value, which example datasets have in place of real metadata
 *
 * @param metadata Metadata to check
 * @param field Field to check
 * @returns Whether the field holds a placeholder
 */
function isPlaceholder(metadata, field) {
    return metadata.sampleExtra !== undefined && EXAMPLE_PLACEHOLDER_FIELDS.includes(field);
}
/**
 * Checks whether the metadata has fields that only show with all metadata: empty ones and placeholders
 *
 * @param metadata Metadata to check
 * @returns Whether any field is hidden until all metadata shows
 */
function hasHiddenFields(metadata) {
    return HIDABLE_FIELDS.some((field) => metadata[field] === undefined || isPlaceholder(metadata, field));
}
/** Label and value widths of the skeleton rows shown while the metadata loads, varied like real rows */
const SKELETON_ROWS = [
    { label: '8.5rem', value: '90%' },
    { label: '6rem', value: '70%' },
    { label: '3.5rem', value: '45%' },
    { label: '6.5rem', value: '30%' },
    { label: '8rem', value: '15%' },
    { label: '7rem', value: '55%' },
];
/** Defines a pipe that provides a default value if the input is undefined or empty */
class DefaultToPipe {
    transform(value, defaultValue) {
        return value !== undefined && value !== '' ? value : defaultValue;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: DefaultToPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.25", ngImport: i0, type: DefaultToPipe, isStandalone: true, name: "defaultTo" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: DefaultToPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'defaultTo',
                    pure: true,
                }]
        }] });
/** Defines a pipe that drops a URL's protocol, so a link reads as `doi.org/...` instead of `https://doi.org/...` */
class WithoutProtocolPipe {
    transform(url) {
        return url.replace(/^https?:\/\//, '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: WithoutProtocolPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.25", ngImport: i0, type: WithoutProtocolPipe, isStandalone: true, name: "withoutProtocol" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: WithoutProtocolPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'withoutProtocol',
                    pure: true,
                }]
        }] });
/**
 * Metadata Component
 */
class MetadataComponent {
    /** Input for Metadata Component */
    metadata = input.required(...(ngDevMode ? [{ debugName: "metadata" }] : /* istanbul ignore next */ []));
    /** Whether the metadata is loading, which shows skeleton rows in place of the fields */
    loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    /** Skeleton rows shown while the metadata loads */
    skeletonRows = SKELETON_ROWS;
    /** Whether every field shows, including empty ones and placeholders. Set from the toolbar's Display menu. */
    showEmptyFields = input(false, ...(ngDevMode ? [{ debugName: "showEmptyFields" }] : /* istanbul ignore next */ []));
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
    /** Checks if a field is visible based on its value and the showEmptyFields signal */
    isFieldVisible(field) {
        if (this.loading()) {
            return false;
        }
        const value = this.metadata()[field];
        return this.showEmptyFields() || (value !== undefined && value !== '' && !isPlaceholder(this.metadata(), field));
    }
    /** Formats the creation timestamp using a given formatter */
    formatCreationTimestamp(format) {
        if (this.metadata().creationTimestamp === undefined) {
            return undefined;
        }
        return format.format(this.metadata().creationTimestamp);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: MetadataComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: MetadataComponent, isStandalone: true, selector: "cde-metadata", inputs: { metadata: { classPropertyName: "metadata", publicName: "metadata", isSignal: true, isRequired: true, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, showEmptyFields: { classPropertyName: "showEmptyFields", publicName: "showEmptyFields", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<hra-expansion-panel tagline=\"Metadata\" disabled>\n  <!-- A description list: each row holds a label (dt) and its value (dd) -->\n  <dl class=\"metadata-details\" hraFeature=\"details\" [attr.aria-busy]=\"loading() || null\">\n    @if (loading()) {\n      @for (row of skeletonRows; track $index) {\n        <div aria-hidden=\"true\">\n          <dt><cde-skeleton [style.width]=\"row.label\" /></dt>\n          <dd><cde-skeleton [style.width]=\"row.value\" /></dd>\n        </div>\n      }\n    }\n    @if (metadata().study && !loading()) {\n      <div>\n        <dt>Study</dt>\n        <dd>\n          @if (metadata().studyUrl; as url) {\n            <a hraHyperlink [attr.href]=\"url\">{{ metadata().study }}</a>\n          } @else {\n            {{ metadata().study }}\n          }\n        </dd>\n      </div>\n    }\n    @if (isFieldVisible('title')) {\n      <div>\n        <dt>Source publication</dt>\n        <dd>\n          @if (metadata().sampleExtra; as extra) {\n            <a hraHyperlink target=\"_blank\" rel=\"noreferrer noopener\" [attr.href]=\"extra.sampleUrl\">\n              {{ extra.sampleUrl | withoutProtocol }}\n            </a>\n          } @else {\n            {{ metadata().title | defaultTo: 'Unknown' }}\n          }\n        </dd>\n      </div>\n    }\n    @if (isFieldVisible('sourceFileName')) {\n      <div>\n        <dt>Source data</dt>\n        <dd>\n          @if (metadata().sampleExtra; as extra) {\n            <a hraHyperlink target=\"_blank\" rel=\"noreferrer noopener\" [attr.href]=\"extra.sourceDataUrl\">\n              {{ metadata().sourceFileName }}\n            </a>\n          } @else {\n            {{ metadata().sourceFileName | defaultTo: 'Unknown' }}\n          }\n        </dd>\n      </div>\n    }\n    @if (isFieldVisible('colorMapFileName')) {\n      <div>\n        <dt>Color map</dt>\n        <dd>{{ metadata().colorMapFileName | defaultTo: 'Default' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('organ')) {\n      <div>\n        <dt>Organ</dt>\n        <dd>{{ metadata().organ | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('technology')) {\n      <div>\n        <dt>Technology</dt>\n        <dd>{{ metadata().technology | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('sex')) {\n      <div>\n        <dt>Sex</dt>\n        <dd>{{ metadata().sex | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('age')) {\n      <div>\n        <dt>Age</dt>\n        <dd>{{ metadata().age | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('thickness')) {\n      <div>\n        <dt>Thickness (\u00B5m)</dt>\n        <dd>{{ metadata().thickness | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('pixelSize')) {\n      <div>\n        <dt>Pixel size (\u00B5m/pixel)</dt>\n        <dd>{{ metadata().pixelSize | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('creationTimestamp')) {\n      <div>\n        <dt>Creation date</dt>\n        <dd>{{ formatCreationTimestamp(dateFormat) | defaultTo: 'Unknown' }}</dd>\n      </div>\n      <div>\n        <dt>Creation time</dt>\n        <dd>{{ formatCreationTimestamp(timeFormat) | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n  </dl>\n</hra-expansion-panel>\n", styles: [":host{display:block;--mat-expansion-container-shape: 0}:host hra-expansion-panel{box-shadow:none;--mat-expansion-container-shape: 0;--mat-expansion-header-expanded-state-height: auto;--mat-expansion-header-collapsed-state-height: auto;--mat-expansion-header-hover-state-layer-color: transparent}:host hra-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0 1rem}:host hra-expansion-panel ::ng-deep .header{padding:.5rem 1rem;min-height:3.5rem}:host hra-expansion-panel .metadata-details{display:grid;grid-template-columns:fit-content(50%) minmax(0,1fr);margin:0;overflow:hidden;border:1px solid var(--mat-sys-outline-variant);border-radius:var(--mat-sys-corner-small);color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host hra-expansion-panel .metadata-details>div{display:grid;grid-column:1/-1;grid-template-columns:subgrid}:host hra-expansion-panel .metadata-details>div:nth-child(odd){background-color:var(--mat-sys-surface-container-low)}:host hra-expansion-panel .metadata-details>div:not(:last-child){border-bottom:1px solid var(--mat-sys-outline-variant)}:host hra-expansion-panel .metadata-details dt,:host hra-expansion-panel .metadata-details dd{min-width:0;margin:0;padding:.25rem 1rem}:host hra-expansion-panel .metadata-details dt{color:var(--mat-sys-on-surface)}:host hra-expansion-panel .metadata-details dd{overflow-wrap:anywhere}:host hra-expansion-panel .metadata-details{margin:0 1rem 1rem}:host hra-expansion-panel .metadata-details a{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--mat-sys-on-surface-variant)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "ngmodule", type: ButtonsModule }, { kind: "directive", type: i2$3.TextHyperlinkDirective, selector: "a[hraHyperlink]" }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: SkeletonComponent, selector: "cde-skeleton", inputs: ["shape"] }, { kind: "pipe", type: DefaultToPipe, name: "defaultTo" }, { kind: "pipe", type: WithoutProtocolPipe, name: "withoutProtocol" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: MetadataComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-metadata', imports: [
                        HraCommonModule,
                        MatExpansionModule,
                        DefaultToPipe,
                        WithoutProtocolPipe,
                        ButtonsModule,
                        ExpansionPanelComponent,
                        SkeletonComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-expansion-panel tagline=\"Metadata\" disabled>\n  <!-- A description list: each row holds a label (dt) and its value (dd) -->\n  <dl class=\"metadata-details\" hraFeature=\"details\" [attr.aria-busy]=\"loading() || null\">\n    @if (loading()) {\n      @for (row of skeletonRows; track $index) {\n        <div aria-hidden=\"true\">\n          <dt><cde-skeleton [style.width]=\"row.label\" /></dt>\n          <dd><cde-skeleton [style.width]=\"row.value\" /></dd>\n        </div>\n      }\n    }\n    @if (metadata().study && !loading()) {\n      <div>\n        <dt>Study</dt>\n        <dd>\n          @if (metadata().studyUrl; as url) {\n            <a hraHyperlink [attr.href]=\"url\">{{ metadata().study }}</a>\n          } @else {\n            {{ metadata().study }}\n          }\n        </dd>\n      </div>\n    }\n    @if (isFieldVisible('title')) {\n      <div>\n        <dt>Source publication</dt>\n        <dd>\n          @if (metadata().sampleExtra; as extra) {\n            <a hraHyperlink target=\"_blank\" rel=\"noreferrer noopener\" [attr.href]=\"extra.sampleUrl\">\n              {{ extra.sampleUrl | withoutProtocol }}\n            </a>\n          } @else {\n            {{ metadata().title | defaultTo: 'Unknown' }}\n          }\n        </dd>\n      </div>\n    }\n    @if (isFieldVisible('sourceFileName')) {\n      <div>\n        <dt>Source data</dt>\n        <dd>\n          @if (metadata().sampleExtra; as extra) {\n            <a hraHyperlink target=\"_blank\" rel=\"noreferrer noopener\" [attr.href]=\"extra.sourceDataUrl\">\n              {{ metadata().sourceFileName }}\n            </a>\n          } @else {\n            {{ metadata().sourceFileName | defaultTo: 'Unknown' }}\n          }\n        </dd>\n      </div>\n    }\n    @if (isFieldVisible('colorMapFileName')) {\n      <div>\n        <dt>Color map</dt>\n        <dd>{{ metadata().colorMapFileName | defaultTo: 'Default' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('organ')) {\n      <div>\n        <dt>Organ</dt>\n        <dd>{{ metadata().organ | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('technology')) {\n      <div>\n        <dt>Technology</dt>\n        <dd>{{ metadata().technology | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('sex')) {\n      <div>\n        <dt>Sex</dt>\n        <dd>{{ metadata().sex | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('age')) {\n      <div>\n        <dt>Age</dt>\n        <dd>{{ metadata().age | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('thickness')) {\n      <div>\n        <dt>Thickness (\u00B5m)</dt>\n        <dd>{{ metadata().thickness | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('pixelSize')) {\n      <div>\n        <dt>Pixel size (\u00B5m/pixel)</dt>\n        <dd>{{ metadata().pixelSize | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n    @if (isFieldVisible('creationTimestamp')) {\n      <div>\n        <dt>Creation date</dt>\n        <dd>{{ formatCreationTimestamp(dateFormat) | defaultTo: 'Unknown' }}</dd>\n      </div>\n      <div>\n        <dt>Creation time</dt>\n        <dd>{{ formatCreationTimestamp(timeFormat) | defaultTo: 'Unknown' }}</dd>\n      </div>\n    }\n  </dl>\n</hra-expansion-panel>\n", styles: [":host{display:block;--mat-expansion-container-shape: 0}:host hra-expansion-panel{box-shadow:none;--mat-expansion-container-shape: 0;--mat-expansion-header-expanded-state-height: auto;--mat-expansion-header-collapsed-state-height: auto;--mat-expansion-header-hover-state-layer-color: transparent}:host hra-expansion-panel ::ng-deep .mat-expansion-panel-body{padding:0 1rem}:host hra-expansion-panel ::ng-deep .header{padding:.5rem 1rem;min-height:3.5rem}:host hra-expansion-panel .metadata-details{display:grid;grid-template-columns:fit-content(50%) minmax(0,1fr);margin:0;overflow:hidden;border:1px solid var(--mat-sys-outline-variant);border-radius:var(--mat-sys-corner-small);color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host hra-expansion-panel .metadata-details>div{display:grid;grid-column:1/-1;grid-template-columns:subgrid}:host hra-expansion-panel .metadata-details>div:nth-child(odd){background-color:var(--mat-sys-surface-container-low)}:host hra-expansion-panel .metadata-details>div:not(:last-child){border-bottom:1px solid var(--mat-sys-outline-variant)}:host hra-expansion-panel .metadata-details dt,:host hra-expansion-panel .metadata-details dd{min-width:0;margin:0;padding:.25rem 1rem}:host hra-expansion-panel .metadata-details dt{color:var(--mat-sys-on-surface)}:host hra-expansion-panel .metadata-details dd{overflow-wrap:anywhere}:host hra-expansion-panel .metadata-details{margin:0 1rem 1rem}:host hra-expansion-panel .metadata-details a{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--mat-sys-on-surface-variant)}\n"] }]
        }], propDecorators: { metadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "metadata", required: true }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], showEmptyFields: [{ type: i0.Input, args: [{ isSignal: true, alias: "showEmptyFields", required: false }] }] } });

/** View mode toggles, in order */
const VIEW_MODES = [
    { value: 'select', label: 'Select', tooltip: 'Select cells to delete from this dataset' },
    { value: 'inspect', label: 'Inspect', tooltip: 'Get information about individual cell types' },
    { value: 'explore', label: 'Explore', tooltip: 'Zoom, pan, and rotate the view of this visualization' },
];
/**
 * Controls for node dist visualization
 */
class NodeDistVisualizationControlsComponent {
    /** Current view mode */
    viewMode = model('explore', ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
    /** Whether cells are selected, which shows the delete button */
    deleteAvailable = input(false, { ...(ngDevMode ? { debugName: "deleteAvailable" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Whether the controls float over the visualization, each on its own raised surface */
    floating = input(false, { ...(ngDevMode ? { debugName: "floating" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Emits when delete button clicked */
    deleteClick = output();
    /** View mode toggles */
    viewModes = VIEW_MODES;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NodeDistVisualizationControlsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: NodeDistVisualizationControlsComponent, isStandalone: true, selector: "cde-node-dist-visualization-controls", inputs: { viewMode: { classPropertyName: "viewMode", publicName: "viewMode", isSignal: true, isRequired: false, transformFunction: null }, deleteAvailable: { classPropertyName: "deleteAvailable", publicName: "deleteAvailable", isSignal: true, isRequired: false, transformFunction: null }, floating: { classPropertyName: "floating", publicName: "floating", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { viewMode: "viewModeChange", deleteClick: "deleteClick" }, host: { properties: { "class.floating": "floating()" } }, ngImport: i0, template: "@if (deleteAvailable()) {\n  <button\n    mat-icon-button\n    class=\"delete\"\n    aria-label=\"Delete selected cells\"\n    hraPlainTooltip=\"Delete the selected cells from this dataset\"\n    hraFeature=\"delete-selected-cells\"\n    hraClickEvent\n    (click)=\"deleteClick.emit()\"\n  >\n    <mat-icon>delete</mat-icon>\n  </button>\n}\n\n<mat-button-toggle-group\n  aria-label=\"Visualization mode\"\n  hraFeature=\"toggle\"\n  [value]=\"viewMode()\"\n  (change)=\"viewMode.set($event.value)\"\n>\n  @for (mode of viewModes; track mode.value) {\n    <mat-button-toggle hraClickEvent [value]=\"mode.value\" [hraPlainTooltip]=\"mode.tooltip\" [hraFeature]=\"mode.value\">\n      {{ mode.label }}\n    </mat-button-toggle>\n  }\n</mat-button-toggle-group>\n", styles: [":host{display:flex;flex-direction:row;align-items:center}:host .delete{margin-right:1rem}:host(.floating){flex-wrap:wrap;justify-content:center;gap:.5rem}:host(.floating) .delete{margin-right:0}:host(.floating) .delete,:host(.floating) mat-button-toggle-group{background-color:var(--mat-sys-surface-container);box-shadow:var(--mat-sys-level3)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i3$2.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled", "disabledInteractive", "hideSingleSelectionIndicator", "hideMultipleSelectionIndicator"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { kind: "component", type: i3$2.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NodeDistVisualizationControlsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-node-dist-visualization-controls', imports: [MatIconModule, ButtonsModule, PlainTooltipDirective, HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.floating]': 'floating()',
                    }, template: "@if (deleteAvailable()) {\n  <button\n    mat-icon-button\n    class=\"delete\"\n    aria-label=\"Delete selected cells\"\n    hraPlainTooltip=\"Delete the selected cells from this dataset\"\n    hraFeature=\"delete-selected-cells\"\n    hraClickEvent\n    (click)=\"deleteClick.emit()\"\n  >\n    <mat-icon>delete</mat-icon>\n  </button>\n}\n\n<mat-button-toggle-group\n  aria-label=\"Visualization mode\"\n  hraFeature=\"toggle\"\n  [value]=\"viewMode()\"\n  (change)=\"viewMode.set($event.value)\"\n>\n  @for (mode of viewModes; track mode.value) {\n    <mat-button-toggle hraClickEvent [value]=\"mode.value\" [hraPlainTooltip]=\"mode.tooltip\" [hraFeature]=\"mode.value\">\n      {{ mode.label }}\n    </mat-button-toggle>\n  }\n</mat-button-toggle-group>\n", styles: [":host{display:flex;flex-direction:row;align-items:center}:host .delete{margin-right:1rem}:host(.floating){flex-wrap:wrap;justify-content:center;gap:.5rem}:host(.floating) .delete{margin-right:0}:host(.floating) .delete,:host(.floating) mat-button-toggle-group{background-color:var(--mat-sys-surface-container);box-shadow:var(--mat-sys-level3)}\n"] }]
        }], propDecorators: { viewMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewMode", required: false }] }, { type: i0.Output, args: ["viewModeChange"] }], deleteAvailable: [{ type: i0.Input, args: [{ isSignal: true, alias: "deleteAvailable", required: false }] }], floating: [{ type: i0.Input, args: [{ isSignal: true, alias: "floating", required: false }] }], deleteClick: [{ type: i0.Output, args: ["deleteClick"] }] } });

/**
 * Menu for the fullscreen distance visualization, which covers the toolbar
 */
class NodeDistVisualizationMenuComponent {
    /** If edges are disabled */
    edgesDisabled = model(false, ...(ngDevMode ? [{ debugName: "edgesDisabled" }] : /* istanbul ignore next */ []));
    /** Whether any cells were deleted, so they can be restored */
    hasDeletedCells = input(false, ...(ngDevMode ? [{ debugName: "hasDeletedCells" }] : /* istanbul ignore next */ []));
    /** Emits when reset visualization view option clicked */
    resetViewClick = output();
    /** Emits when reset deleted cells option option clicked */
    resetDeletedClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NodeDistVisualizationMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.25", type: NodeDistVisualizationMenuComponent, isStandalone: true, selector: "cde-node-dist-visualization-menu", inputs: { edgesDisabled: { classPropertyName: "edgesDisabled", publicName: "edgesDisabled", isSignal: true, isRequired: false, transformFunction: null }, hasDeletedCells: { classPropertyName: "hasDeletedCells", publicName: "hasDeletedCells", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { edgesDisabled: "edgesDisabledChange", resetViewClick: "resetViewClick", resetDeletedClick: "resetDeletedClick" }, ngImport: i0, template: "<button\n  mat-icon-button\n  aria-label=\"More\"\n  hraPlainTooltip=\"More\"\n  hraFeature=\"menu\"\n  hraClickEvent\n  [matMenuTriggerFor]=\"menu\"\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<!-- The fullscreen view covers the toolbar, so it keeps the distance visualization's own actions -->\n<mat-menu class=\"vis-overlay\" hraFeature=\"menu\" #menu=\"matMenu\">\n  <button mat-menu-item hraFeature=\"reset-view\" hraClickEvent (click)=\"resetViewClick.emit()\">\n    <mat-icon>fit_screen</mat-icon>\n    Reset view\n  </button>\n  <button\n    mat-menu-item\n    hraFeature=\"restore-deleted-cells\"\n    hraClickEvent\n    [disabled]=\"!hasDeletedCells()\"\n    (click)=\"resetDeletedClick.emit()\"\n  >\n    <mat-icon>restore_from_trash</mat-icon>\n    Restore deleted cells\n  </button>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"cell-links\"\n    hraClickEvent\n    [attr.aria-checked]=\"!edgesDisabled()\"\n    (click)=\"$event.stopPropagation(); edgesDisabled.set(!edgesDisabled())\"\n  >\n    <mat-icon>{{ edgesDisabled() ? 'check_box_outline_blank' : 'check_box' }}</mat-icon>\n    Cell links\n  </button>\n</mat-menu>\n", styles: [":host{display:block;width:2.5rem;height:2.5rem}\n"], dependencies: [{ kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i1$2.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i1$2.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i1$2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NodeDistVisualizationMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-node-dist-visualization-menu', imports: [MatMenuModule, MatIconModule, ButtonsModule, PlainTooltipDirective, HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  aria-label=\"More\"\n  hraPlainTooltip=\"More\"\n  hraFeature=\"menu\"\n  hraClickEvent\n  [matMenuTriggerFor]=\"menu\"\n>\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<!-- The fullscreen view covers the toolbar, so it keeps the distance visualization's own actions -->\n<mat-menu class=\"vis-overlay\" hraFeature=\"menu\" #menu=\"matMenu\">\n  <button mat-menu-item hraFeature=\"reset-view\" hraClickEvent (click)=\"resetViewClick.emit()\">\n    <mat-icon>fit_screen</mat-icon>\n    Reset view\n  </button>\n  <button\n    mat-menu-item\n    hraFeature=\"restore-deleted-cells\"\n    hraClickEvent\n    [disabled]=\"!hasDeletedCells()\"\n    (click)=\"resetDeletedClick.emit()\"\n  >\n    <mat-icon>restore_from_trash</mat-icon>\n    Restore deleted cells\n  </button>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"cell-links\"\n    hraClickEvent\n    [attr.aria-checked]=\"!edgesDisabled()\"\n    (click)=\"$event.stopPropagation(); edgesDisabled.set(!edgesDisabled())\"\n  >\n    <mat-icon>{{ edgesDisabled() ? 'check_box_outline_blank' : 'check_box' }}</mat-icon>\n    Cell links\n  </button>\n</mat-menu>\n", styles: [":host{display:block;width:2.5rem;height:2.5rem}\n"] }]
        }], propDecorators: { edgesDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgesDisabled", required: false }] }, { type: i0.Output, args: ["edgesDisabledChange"] }], hasDeletedCells: [{ type: i0.Input, args: [{ isSignal: true, alias: "hasDeletedCells", required: false }] }], resetViewClick: [{ type: i0.Output, args: ["resetViewClick"] }], resetDeletedClick: [{ type: i0.Output, args: ["resetDeletedClick"] }] } });

/** Number format for distances */
const DISTANCE_FORMAT = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
});
/**
 * Component for Node Distribution Visualization
 */
class NodeDistVisualizationComponent {
    /** Input for node data */
    nodes = input.required(...(ngDevMode ? [{ debugName: "nodes" }] : /* istanbul ignore next */ []));
    /** Input for edge data */
    edges = input.required(...(ngDevMode ? [{ debugName: "edges" }] : /* istanbul ignore next */ []));
    /** Input for the color map data */
    colorMap = input.required(...(ngDevMode ? [{ debugName: "colorMap" }] : /* istanbul ignore next */ []));
    /** Node filter */
    nodeFilter = model.required(...(ngDevMode ? [{ debugName: "nodeFilter" }] : /* istanbul ignore next */ []));
    /** Input for the maximum edge distance */
    maxEdgeDistance = input.required(...(ngDevMode ? [{ debugName: "maxEdgeDistance" }] : /* istanbul ignore next */ []));
    /** Whether the data is loading, which shows a skeleton in place of the visualization */
    loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    /** Empty state shown in place of the visualization, or undefined when there are cells to show */
    emptyState = input(...(ngDevMode ? [undefined, { debugName: "emptyState" }] : /* istanbul ignore next */ []));
    /** Emits when the empty state's action is clicked */
    emptyStateAction = output();
    /** Whether the panel can open in full screen. The tabbed layout turns it off, which also closes an open view. */
    fullscreenAvailable = input(true, ...(ngDevMode ? [{ debugName: "fullscreenAvailable" }] : /* istanbul ignore next */ []));
    /**
     * Whether the view mode controls float at the top of the visualization instead of sitting in the header.
     * The tabbed layout floats them, so the header row's height goes to the visualization.
     */
    floatingControls = input(false, ...(ngDevMode ? [{ debugName: "floatingControls" }] : /* istanbul ignore next */ []));
    /**
     * Whether cell info docks at the bottom of the visualization instead of opening beside the cell.
     * Compact screens dock it, since a card beside the cell can run off a phone screen.
     */
    dockCellInfo = input(false, ...(ngDevMode ? [{ debugName: "dockCellInfo" }] : /* istanbul ignore next */ []));
    /** Emits true when the panel opens in full screen and false when it closes */
    fullscreenChange = output();
    /** Output emitter for node click events */
    nodeClick = output();
    /** Output emitter for node hover events */
    nodeHover = output();
    /** Whether cell links are hidden. Shared with the toolbar's Display menu. */
    edgesDisabled = model(false, ...(ngDevMode ? [{ debugName: "edgesDisabled" }] : /* istanbul ignore next */ []));
    /** Whether any cells were deleted */
    hasDeletedCells = computed(() => (this.nodeFilter().exclude?.length ?? 0) > 0, ...(ngDevMode ? [{ debugName: "hasDeletedCells" }] : /* istanbul ignore next */ []));
    /** Current view mode. The root sets it back to explore when everything is reset. */
    viewMode = model('explore', ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
    /** Current node selection. Cleared when the view mode changes, since the visualization drops it. */
    selection = linkedSignal({ ...(ngDevMode ? { debugName: "selection" } : /* istanbul ignore next */ {}), source: this.viewMode, computation: () => [] });
    /** If there is a current node selection */
    hasSelection = computed(() => {
        return this.viewMode() === 'select' && this.selection().length > 0;
    }, ...(ngDevMode ? [{ debugName: "hasSelection" }] : /* istanbul ignore next */ []));
    /** Signal containing node event. Cleared when the view mode changes. */
    cellInfo = linkedSignal({ ...(ngDevMode ? { debugName: "cellInfo" } : /* istanbul ignore next */ {}), source: this.viewMode,
        computation: () => undefined });
    /** Opens cell info panel */
    cellInfoOpen = computed(() => this.viewMode() === 'inspect' && !!this.cellInfo(), ...(ngDevMode ? [{ debugName: "cellInfoOpen" }] : /* istanbul ignore next */ []));
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
    ], ...(ngDevMode ? [{ debugName: "cellInfoPosition" }] : /* istanbul ignore next */ []));
    /** Data for cell info panel */
    cellInfoContent = computed(() => {
        // This is guarded by cellInfoOpen() so cellInfo() will always have a value here
        const info = this.cellInfo();
        const nodes = this.nodes();
        const edges = this.edges();
        const { index, raw: node } = info;
        const edge = this.findClosestEdge(index);
        const type = nodes.getCellTypeFor(node);
        const ontologyId = nodes.getCellOntologyIDFor(node) ?? '-';
        const distance = edge ? DISTANCE_FORMAT.format(edges.getDistanceFor(edge)) + ' µm' : '-';
        const x = DISTANCE_FORMAT.format(nodes.getXFor(node));
        const y = DISTANCE_FORMAT.format(nodes.getYFor(node));
        const z = DISTANCE_FORMAT.format(nodes.getZFor(node) ?? 0);
        return [
            { label: 'Cell type', value: type },
            { label: 'CL ID', value: ontologyId },
            { label: 'Distance to closest anchor cell', value: distance },
            { label: 'X coordinate', value: `${x} µm` },
            { label: 'Y coordinate', value: `${y} µm` },
            { label: 'Z coordinate', value: `${z} µm` },
        ];
    }, ...(ngDevMode ? [{ debugName: "cellInfoContent" }] : /* istanbul ignore next */ []));
    /** Service to handle file saving */
    fileSaver = inject(FileSaverService);
    /** Full screen portal element */
    fullscreenPortal = viewChild.required(FullscreenPortalComponent);
    /** Closes an open fullscreen view when full screen becomes unavailable */
    closeFullscreenRef = afterRenderEffect(() => {
        if (!this.fullscreenAvailable()) {
            untracked(() => this.fullscreenPortal().close());
        }
    });
    /** Visualization element, found by tag since the floating controls come before it */
    visEl = computed(() => this.fullscreenPortal().rootNodes()[0].querySelector('hra-node-dist-vis'), ...(ngDevMode ? [{ debugName: "visEl" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NodeDistVisualizationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: NodeDistVisualizationComponent, isStandalone: true, selector: "cde-node-dist-visualization", inputs: { nodes: { classPropertyName: "nodes", publicName: "nodes", isSignal: true, isRequired: true, transformFunction: null }, edges: { classPropertyName: "edges", publicName: "edges", isSignal: true, isRequired: true, transformFunction: null }, colorMap: { classPropertyName: "colorMap", publicName: "colorMap", isSignal: true, isRequired: true, transformFunction: null }, nodeFilter: { classPropertyName: "nodeFilter", publicName: "nodeFilter", isSignal: true, isRequired: true, transformFunction: null }, maxEdgeDistance: { classPropertyName: "maxEdgeDistance", publicName: "maxEdgeDistance", isSignal: true, isRequired: true, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, emptyState: { classPropertyName: "emptyState", publicName: "emptyState", isSignal: true, isRequired: false, transformFunction: null }, fullscreenAvailable: { classPropertyName: "fullscreenAvailable", publicName: "fullscreenAvailable", isSignal: true, isRequired: false, transformFunction: null }, floatingControls: { classPropertyName: "floatingControls", publicName: "floatingControls", isSignal: true, isRequired: false, transformFunction: null }, dockCellInfo: { classPropertyName: "dockCellInfo", publicName: "dockCellInfo", isSignal: true, isRequired: false, transformFunction: null }, edgesDisabled: { classPropertyName: "edgesDisabled", publicName: "edgesDisabled", isSignal: true, isRequired: false, transformFunction: null }, viewMode: { classPropertyName: "viewMode", publicName: "viewMode", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { nodeFilter: "nodeFilterChange", emptyStateAction: "emptyStateAction", fullscreenChange: "fullscreenChange", nodeClick: "nodeClick", nodeHover: "nodeHover", edgesDisabled: "edgesDisabledChange", viewMode: "viewModeChange" }, host: { properties: { "attr.aria-busy": "loading() || null", "class.floating-controls": "floatingControls()" } }, viewQueries: [{ propertyName: "fullscreenPortal", first: true, predicate: FullscreenPortalComponent, descendants: true, isSignal: true }, { propertyName: "cellInfoOverlay", first: true, predicate: ["cellInfoOverlay"], descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Spatial view\" disabled>\n  <hra-expansion-panel-header-content>\n    @if (!floatingControls()) {\n      <cde-node-dist-visualization-controls\n        [deleteAvailable]=\"hasSelection()\"\n        [(viewMode)]=\"viewMode\"\n        (deleteClick)=\"deleteSelection()\"\n      />\n    }\n    @if (fullscreenAvailable()) {\n      <button\n        mat-icon-button\n        class=\"fullscreen\"\n        aria-label=\"Open the spatial view in full screen\"\n        hraPlainTooltip=\"Full screen\"\n        hraFeature=\"open-fullscreen\"\n        hraClickEvent\n        (click)=\"fullscreen.open()\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    }\n  </hra-expansion-panel-header-content>\n\n  <hra-fullscreen-portal\n    tagline=\"Spatial view\"\n    panelClass=\"node-dist-vis-fullscreen-panel\"\n    (beforeOpened)=\"fullscreenChange.emit(true)\"\n    (beforeClosed)=\"fullscreenChange.emit(false)\"\n    #fullscreen\n  >\n    <hra-fullscreen-actions>\n      <cde-node-dist-visualization-menu\n        [hasDeletedCells]=\"hasDeletedCells()\"\n        [(edgesDisabled)]=\"edgesDisabled\"\n        (resetViewClick)=\"resetView()\"\n        (resetDeletedClick)=\"resetDeletedNodes()\"\n      />\n\n      <cde-node-dist-visualization-controls\n        [deleteAvailable]=\"hasSelection()\"\n        [(viewMode)]=\"viewMode\"\n        (deleteClick)=\"deleteSelection()\"\n      />\n    </hra-fullscreen-actions>\n\n    <hra-fullscreen-portal-content>\n      <!-- Before the visualization in the page, as on screen, so keyboard focus reaches the controls first.\n           Hidden while the skeleton or empty state covers the visualization, so focus never lands on hidden controls. -->\n      @if (floatingControls() && !loading() && !emptyState()) {\n        <div class=\"floating-controls\">\n          <cde-node-dist-visualization-controls\n            floating\n            [deleteAvailable]=\"hasSelection()\"\n            [(viewMode)]=\"viewMode\"\n            (deleteClick)=\"deleteSelection()\"\n          />\n        </div>\n      }\n      <hra-node-dist-vis\n        cdkOverlayOrigin\n        class=\"vis\"\n        data-testid=\"node-dist-vis\"\n        [attr.inert]=\"emptyState() ? '' : null\"\n        #cellInfoOrigin=\"cdkOverlayOrigin\"\n      />\n      @if (loading()) {\n        <cde-chart-skeleton />\n      } @else if (emptyState(); as content) {\n        <cde-empty-state hraFeature=\"empty-state\" [content]=\"content\" (actionClick)=\"emptyStateAction.emit()\" />\n      }\n      @if (cellInfoOpen() && dockCellInfo()) {\n        <hra-info-modal\n          class=\"docked-cell-info\"\n          title=\"Cell info\"\n          closeLabel=\"Close cell info\"\n          data-testid=\"cell-info\"\n          [data]=\"cellInfoContent()\"\n          (close)=\"cellInfo.set(undefined)\"\n        />\n      }\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayDisposeOnNavigation]=\"true\"\n  [cdkConnectedOverlayHasBackdrop]=\"false\"\n  [cdkConnectedOverlayOpen]=\"cellInfoOpen() && !dockCellInfo()\"\n  [cdkConnectedOverlayOrigin]=\"cellInfoOrigin\"\n  [cdkConnectedOverlayPositions]=\"cellInfoPosition()\"\n  [cdkConnectedOverlayPush]=\"true\"\n  [cdkConnectedOverlayViewportMargin]=\"16\"\n  (overlayOutsideClick)=\"cellInfo.set(undefined)\"\n  #cellInfoOverlay=\"cdkConnectedOverlay\"\n>\n  <hra-info-modal\n    title=\"Cell info\"\n    closeLabel=\"Close cell info\"\n    data-testid=\"cell-info\"\n    [data]=\"cellInfoContent()\"\n    (close)=\"cellInfo.set(undefined)\"\n  />\n</ng-template>\n", styles: [":host{display:block;background-color:#000}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header{background-color:var(--mat-sys-background);height:3.5rem;align-items:center;padding:0 .5rem 0 1rem;border-bottom:1px solid var(--mat-sys-outline)}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header hra-expansion-panel-header-content{display:flex;align-items:center;gap:.5rem}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content{height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal{display:flex;height:100%;width:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal .vis{width:100%}hra-fullscreen-portal-content{position:relative}.floating-controls{position:absolute;top:1rem;inset-inline:1rem;z-index:1;display:flex;justify-content:center;pointer-events:none}.floating-controls cde-node-dist-visualization-controls{pointer-events:auto}:host(.floating-controls) ::ng-deep hra-expansion-panel cdk-accordion-item .header{height:0;min-height:0;padding:0;border-bottom:none}:host(.floating-controls) ::ng-deep hra-expansion-panel cdk-accordion-item .content{height:100%}.docked-cell-info{position:absolute;inset-inline:1rem;bottom:1rem;z-index:1;min-width:0;max-width:none;max-height:calc(100% - 2rem);overflow-y:auto}cde-chart-skeleton{--ang-skeleton-rect-shape: var(--mat-sys-corner-none);color-scheme:dark;padding:0;background-color:transparent}::ng-deep div.node-dist-vis-fullscreen-panel{--mat-dialog-container-color: black}::ng-deep div.node-dist-vis-fullscreen-panel:has(cde-empty-state){--mat-dialog-container-color: var(--mat-sys-background)}::ng-deep div.node-dist-vis-fullscreen-panel .header{background-color:var(--mat-sys-background)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2$1.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation", "cdkConnectedOverlayUsePopover", "cdkConnectedOverlayMatchWidth", "cdkConnectedOverlay"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i2$1.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelHeaderContentComponent, selector: "hra-expansion-panel-header-content" }, { kind: "component", type: FullscreenActionsComponent, selector: "hra-fullscreen-actions" }, { kind: "component", type: FullscreenPortalComponent, selector: "hra-fullscreen-portal", inputs: ["tagline", "panelClass", "viewTransition"], outputs: ["beforeOpened", "opened", "beforeClosed", "closed", "transitionEnded"] }, { kind: "component", type: FullscreenPortalContentComponent, selector: "hra-fullscreen-portal-content" }, { kind: "component", type: InfoModalComponent, selector: "hra-info-modal", inputs: ["data", "title", "closeLabel"], outputs: ["close"] }, { kind: "component", type: NodeDistVisualizationControlsComponent, selector: "cde-node-dist-visualization-controls", inputs: ["viewMode", "deleteAvailable", "floating"], outputs: ["viewModeChange", "deleteClick"] }, { kind: "component", type: NodeDistVisualizationMenuComponent, selector: "cde-node-dist-visualization-menu", inputs: ["edgesDisabled", "hasDeletedCells"], outputs: ["edgesDisabledChange", "resetViewClick", "resetDeletedClick"] }, { kind: "component", type: ChartSkeletonComponent, selector: "cde-chart-skeleton" }, { kind: "component", type: EmptyStateComponent, selector: "cde-empty-state", inputs: ["content"], outputs: ["actionClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: NodeDistVisualizationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-node-dist-visualization', imports: [
                        HraCommonModule,
                        MatButtonModule,
                        MatIconModule,
                        OverlayModule,
                        PlainTooltipDirective,
                        ExpansionPanelComponent,
                        ExpansionPanelHeaderContentComponent,
                        FullscreenActionsComponent,
                        FullscreenPortalComponent,
                        FullscreenPortalContentComponent,
                        InfoModalComponent,
                        NodeDistVisualizationControlsComponent,
                        NodeDistVisualizationMenuComponent,
                        ChartSkeletonComponent,
                        EmptyStateComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-busy]': 'loading() || null',
                        '[class.floating-controls]': 'floatingControls()',
                    }, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "<hra-expansion-panel tagline=\"Spatial view\" disabled>\n  <hra-expansion-panel-header-content>\n    @if (!floatingControls()) {\n      <cde-node-dist-visualization-controls\n        [deleteAvailable]=\"hasSelection()\"\n        [(viewMode)]=\"viewMode\"\n        (deleteClick)=\"deleteSelection()\"\n      />\n    }\n    @if (fullscreenAvailable()) {\n      <button\n        mat-icon-button\n        class=\"fullscreen\"\n        aria-label=\"Open the spatial view in full screen\"\n        hraPlainTooltip=\"Full screen\"\n        hraFeature=\"open-fullscreen\"\n        hraClickEvent\n        (click)=\"fullscreen.open()\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    }\n  </hra-expansion-panel-header-content>\n\n  <hra-fullscreen-portal\n    tagline=\"Spatial view\"\n    panelClass=\"node-dist-vis-fullscreen-panel\"\n    (beforeOpened)=\"fullscreenChange.emit(true)\"\n    (beforeClosed)=\"fullscreenChange.emit(false)\"\n    #fullscreen\n  >\n    <hra-fullscreen-actions>\n      <cde-node-dist-visualization-menu\n        [hasDeletedCells]=\"hasDeletedCells()\"\n        [(edgesDisabled)]=\"edgesDisabled\"\n        (resetViewClick)=\"resetView()\"\n        (resetDeletedClick)=\"resetDeletedNodes()\"\n      />\n\n      <cde-node-dist-visualization-controls\n        [deleteAvailable]=\"hasSelection()\"\n        [(viewMode)]=\"viewMode\"\n        (deleteClick)=\"deleteSelection()\"\n      />\n    </hra-fullscreen-actions>\n\n    <hra-fullscreen-portal-content>\n      <!-- Before the visualization in the page, as on screen, so keyboard focus reaches the controls first.\n           Hidden while the skeleton or empty state covers the visualization, so focus never lands on hidden controls. -->\n      @if (floatingControls() && !loading() && !emptyState()) {\n        <div class=\"floating-controls\">\n          <cde-node-dist-visualization-controls\n            floating\n            [deleteAvailable]=\"hasSelection()\"\n            [(viewMode)]=\"viewMode\"\n            (deleteClick)=\"deleteSelection()\"\n          />\n        </div>\n      }\n      <hra-node-dist-vis\n        cdkOverlayOrigin\n        class=\"vis\"\n        data-testid=\"node-dist-vis\"\n        [attr.inert]=\"emptyState() ? '' : null\"\n        #cellInfoOrigin=\"cdkOverlayOrigin\"\n      />\n      @if (loading()) {\n        <cde-chart-skeleton />\n      } @else if (emptyState(); as content) {\n        <cde-empty-state hraFeature=\"empty-state\" [content]=\"content\" (actionClick)=\"emptyStateAction.emit()\" />\n      }\n      @if (cellInfoOpen() && dockCellInfo()) {\n        <hra-info-modal\n          class=\"docked-cell-info\"\n          title=\"Cell info\"\n          closeLabel=\"Close cell info\"\n          data-testid=\"cell-info\"\n          [data]=\"cellInfoContent()\"\n          (close)=\"cellInfo.set(undefined)\"\n        />\n      }\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayDisposeOnNavigation]=\"true\"\n  [cdkConnectedOverlayHasBackdrop]=\"false\"\n  [cdkConnectedOverlayOpen]=\"cellInfoOpen() && !dockCellInfo()\"\n  [cdkConnectedOverlayOrigin]=\"cellInfoOrigin\"\n  [cdkConnectedOverlayPositions]=\"cellInfoPosition()\"\n  [cdkConnectedOverlayPush]=\"true\"\n  [cdkConnectedOverlayViewportMargin]=\"16\"\n  (overlayOutsideClick)=\"cellInfo.set(undefined)\"\n  #cellInfoOverlay=\"cdkConnectedOverlay\"\n>\n  <hra-info-modal\n    title=\"Cell info\"\n    closeLabel=\"Close cell info\"\n    data-testid=\"cell-info\"\n    [data]=\"cellInfoContent()\"\n    (close)=\"cellInfo.set(undefined)\"\n  />\n</ng-template>\n", styles: [":host{display:block;background-color:#000}:host .filler{flex-grow:1}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion{display:block;height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header{background-color:var(--mat-sys-background);height:3.5rem;align-items:center;padding:0 .5rem 0 1rem;border-bottom:1px solid var(--mat-sys-outline)}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .header hra-expansion-panel-header-content{display:flex;align-items:center;gap:.5rem}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content{height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal{display:flex;height:100%;width:100%}:host ::ng-deep hra-expansion-panel cdk-accordion cdk-accordion-item .content .expansion-body hra-fullscreen-portal .vis{width:100%}hra-fullscreen-portal-content{position:relative}.floating-controls{position:absolute;top:1rem;inset-inline:1rem;z-index:1;display:flex;justify-content:center;pointer-events:none}.floating-controls cde-node-dist-visualization-controls{pointer-events:auto}:host(.floating-controls) ::ng-deep hra-expansion-panel cdk-accordion-item .header{height:0;min-height:0;padding:0;border-bottom:none}:host(.floating-controls) ::ng-deep hra-expansion-panel cdk-accordion-item .content{height:100%}.docked-cell-info{position:absolute;inset-inline:1rem;bottom:1rem;z-index:1;min-width:0;max-width:none;max-height:calc(100% - 2rem);overflow-y:auto}cde-chart-skeleton{--ang-skeleton-rect-shape: var(--mat-sys-corner-none);color-scheme:dark;padding:0;background-color:transparent}::ng-deep div.node-dist-vis-fullscreen-panel{--mat-dialog-container-color: black}::ng-deep div.node-dist-vis-fullscreen-panel:has(cde-empty-state){--mat-dialog-container-color: var(--mat-sys-background)}::ng-deep div.node-dist-vis-fullscreen-panel .header{background-color:var(--mat-sys-background)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { nodes: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodes", required: true }] }], edges: [{ type: i0.Input, args: [{ isSignal: true, alias: "edges", required: true }] }], colorMap: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMap", required: true }] }], nodeFilter: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeFilter", required: true }] }, { type: i0.Output, args: ["nodeFilterChange"] }], maxEdgeDistance: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxEdgeDistance", required: true }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], emptyState: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyState", required: false }] }], emptyStateAction: [{ type: i0.Output, args: ["emptyStateAction"] }], fullscreenAvailable: [{ type: i0.Input, args: [{ isSignal: true, alias: "fullscreenAvailable", required: false }] }], floatingControls: [{ type: i0.Input, args: [{ isSignal: true, alias: "floatingControls", required: false }] }], dockCellInfo: [{ type: i0.Input, args: [{ isSignal: true, alias: "dockCellInfo", required: false }] }], fullscreenChange: [{ type: i0.Output, args: ["fullscreenChange"] }], nodeClick: [{ type: i0.Output, args: ["nodeClick"] }], nodeHover: [{ type: i0.Output, args: ["nodeHover"] }], edgesDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgesDisabled", required: false }] }, { type: i0.Output, args: ["edgesDisabledChange"] }], viewMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewMode", required: false }] }, { type: i0.Output, args: ["viewModeChange"] }], fullscreenPortal: [{ type: i0.ViewChild, args: [i0.forwardRef(() => FullscreenPortalComponent), { isSignal: true }] }], cellInfoOverlay: [{ type: i0.ViewChild, args: ['cellInfoOverlay', { isSignal: true }] }] } });

/** Panels that the toolbar's Panels menu shows and hides, in layout order. The cell types panel always shows. */
const PANEL_IDS = ['metadata', 'distance-visualization', 'violin-graph', 'histogram'];
/**
 * Tabs of the tabbed layout, in order: the cell types tab, the visualizations, and the metadata last.
 * Every tab but cell types shows when its panel does.
 */
const TAB_IDS = ['cell-types', 'distance-visualization', 'violin-graph', 'histogram', 'metadata'];
/** Local storage key for the hidden panels, when the visualization remembers them */
const HIDDEN_PANELS_STORAGE_KEY = 'cde-visualization-hidden-panels';
/**
 * Reads hidden panels from an array or a comma or space separated string. Unknown ids are dropped.
 *
 * @param value Panel ids
 * @returns Hidden panels in layout order
 */
function parseHiddenPanels(value) {
    const items = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[\s,]+/) : [];
    return PANEL_IDS.filter((id) => items.includes(id));
}
/**
 * Reads the remembered hidden panels from local storage
 *
 * @returns Hidden panels, or undefined if none are stored
 */
function loadHiddenPanels() {
    try {
        const value = localStorage.getItem(HIDDEN_PANELS_STORAGE_KEY);
        return value === null ? undefined : parseHiddenPanels(JSON.parse(value));
    }
    catch {
        return undefined;
    }
}
/**
 * Remembers the hidden panels in local storage
 *
 * @param panels Hidden panels
 */
function saveHiddenPanels(panels) {
    try {
        localStorage.setItem(HIDDEN_PANELS_STORAGE_KEY, JSON.stringify(panels));
    }
    catch {
        // Storage is unavailable, for example when site data is blocked. The layout lasts until reload.
    }
}

/** Counter to keep track of distinct instances */
let idCounter = 0;
/**
 * Vertical toolbar with the visualization's app-wide actions: panels, display options, resets, downloads,
 * the embedding guide, the theme menu, the About sheet and help links.
 * On compact screens it's a bar along the bottom, with Embed, Theme, Info and Help in a More menu.
 * The tabbed layout hides the Panels menu.
 */
class ToolbarComponent {
    /** Panels hidden from the Panels menu */
    hiddenPanels = model([], ...(ngDevMode ? [{ debugName: "hiddenPanels" }] : /* istanbul ignore next */ []));
    /** Whether the distance visualization shows cell links */
    cellLinks = model(true, ...(ngDevMode ? [{ debugName: "cellLinks" }] : /* istanbul ignore next */ []));
    /** Whether the cell types table shows the cell link columns */
    cellLinkData = model(true, ...(ngDevMode ? [{ debugName: "cellLinkData" }] : /* istanbul ignore next */ []));
    /** Whether the metadata panel shows every field, including empty ones */
    allMetadata = model(false, ...(ngDevMode ? [{ debugName: "allMetadata" }] : /* istanbul ignore next */ []));
    /** Whether the metadata has fields that only show with all metadata */
    hasHiddenMetadata = input(false, ...(ngDevMode ? [{ debugName: "hasHiddenMetadata" }] : /* istanbul ignore next */ []));
    /** Whether any cells were deleted from the distance visualization */
    hasDeletedCells = input(false, ...(ngDevMode ? [{ debugName: "hasDeletedCells" }] : /* istanbul ignore next */ []));
    /** Sheet that's open in the drawer, if any. The Downloads and Info items open their sheets */
    openSheet = model(...(ngDevMode ? [undefined, { debugName: "openSheet" }] : /* istanbul ignore next */ []));
    /** Whether the toolbar shows the Theme menu */
    showThemeMenu = input(false, ...(ngDevMode ? [{ debugName: "showThemeMenu" }] : /* istanbul ignore next */ []));
    /** Whether the toolbar shows the Help menu */
    showHelpMenu = input(true, ...(ngDevMode ? [{ debugName: "showHelpMenu" }] : /* istanbul ignore next */ []));
    /** Whether the toolbar shows the Panels menu. The tabbed layout hides it, since the tabs reach every panel. */
    showPanelsMenu = input(true, ...(ngDevMode ? [{ debugName: "showPanelsMenu" }] : /* istanbul ignore next */ []));
    /** Whether the toolbar is a bar along the bottom of a compact screen */
    compact = input(false, ...(ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []));
    /** Theme menu choice */
    themePreference = model('system', ...(ngDevMode ? [{ debugName: "themePreference" }] : /* istanbul ignore next */ []));
    /** Emits when Reset view is clicked */
    resetViewClick = output();
    /** Emits when Restore deleted cells is clicked */
    restoreDeletedCellsClick = output();
    /** Emits when Reset colors is clicked */
    resetColorsClick = output();
    /** Emits when Reset everything is clicked */
    resetEverythingClick = output();
    /** Text content */
    content = TOOLBAR_CONTENT;
    /** Orientation of the rail and its menus */
    orientation = computed(() => this.compact() ? 'horizontal' : 'vertical', ...(ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
    /** Prefix of the ids that tie menu items to their labels and supporting text */
    idPrefix = `cde-toolbar-${idCounter++}`;
    /** Shows or hides a panel */
    togglePanel(id) {
        const hidden = this.hiddenPanels();
        this.hiddenPanels.set(hidden.includes(id)
            ? hidden.filter((panel) => panel !== id)
            : PANEL_IDS.filter((panel) => panel === id || hidden.includes(panel)));
    }
    /** Icon of the Theme item, showing the current choice */
    themeIcon = computed(() => this.content.theme.options.find((option) => option.id === this.themePreference())?.icon ?? 'brightness_4', ...(ngDevMode ? [{ debugName: "themeIcon" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: ToolbarComponent, isStandalone: true, selector: "cde-toolbar", inputs: { hiddenPanels: { classPropertyName: "hiddenPanels", publicName: "hiddenPanels", isSignal: true, isRequired: false, transformFunction: null }, cellLinks: { classPropertyName: "cellLinks", publicName: "cellLinks", isSignal: true, isRequired: false, transformFunction: null }, cellLinkData: { classPropertyName: "cellLinkData", publicName: "cellLinkData", isSignal: true, isRequired: false, transformFunction: null }, allMetadata: { classPropertyName: "allMetadata", publicName: "allMetadata", isSignal: true, isRequired: false, transformFunction: null }, hasHiddenMetadata: { classPropertyName: "hasHiddenMetadata", publicName: "hasHiddenMetadata", isSignal: true, isRequired: false, transformFunction: null }, hasDeletedCells: { classPropertyName: "hasDeletedCells", publicName: "hasDeletedCells", isSignal: true, isRequired: false, transformFunction: null }, openSheet: { classPropertyName: "openSheet", publicName: "openSheet", isSignal: true, isRequired: false, transformFunction: null }, showThemeMenu: { classPropertyName: "showThemeMenu", publicName: "showThemeMenu", isSignal: true, isRequired: false, transformFunction: null }, showHelpMenu: { classPropertyName: "showHelpMenu", publicName: "showHelpMenu", isSignal: true, isRequired: false, transformFunction: null }, showPanelsMenu: { classPropertyName: "showPanelsMenu", publicName: "showPanelsMenu", isSignal: true, isRequired: false, transformFunction: null }, compact: { classPropertyName: "compact", publicName: "compact", isSignal: true, isRequired: false, transformFunction: null }, themePreference: { classPropertyName: "themePreference", publicName: "themePreference", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { hiddenPanels: "hiddenPanelsChange", cellLinks: "cellLinksChange", cellLinkData: "cellLinkDataChange", allMetadata: "allMetadataChange", openSheet: "openSheetChange", themePreference: "themePreferenceChange", resetViewClick: "resetViewClick", restoreDeletedCellsClick: "restoreDeletedCellsClick", resetColorsClick: "resetColorsClick", resetEverythingClick: "resetEverythingClick" }, ngImport: i0, template: "<hra-navigation-rail [attr.aria-label]=\"content.label\" [orientation]=\"orientation()\">\n  @if (showPanelsMenu()) {\n    <button\n      hraNavigationRailItem\n      icon=\"space_dashboard\"\n      hraFeature=\"panels\"\n      hraClickEvent\n      [hraPlainTooltip]=\"content.panels.tooltip\"\n      [matMenuTriggerFor]=\"panelsMenu\"\n    >\n      {{ content.panels.label }}\n    </button>\n  }\n  <button\n    hraNavigationRailItem\n    icon=\"layers\"\n    hraFeature=\"display\"\n    hraClickEvent\n    [hraPlainTooltip]=\"content.display.tooltip\"\n    [matMenuTriggerFor]=\"displayMenu\"\n  >\n    {{ content.display.label }}\n  </button>\n  <button\n    hraNavigationRailItem\n    icon=\"restart_alt\"\n    hraFeature=\"reset\"\n    hraClickEvent\n    [hraPlainTooltip]=\"content.reset.tooltip\"\n    [matMenuTriggerFor]=\"resetMenu\"\n  >\n    {{ content.reset.label }}\n  </button>\n\n  @if (!compact()) {\n    <mat-divider />\n  }\n\n  <button\n    hraNavigationRailItem\n    icon=\"download\"\n    hraFeature=\"downloads\"\n    hraClickEvent\n    [active]=\"openSheet() === 'downloads'\"\n    [hraPlainTooltip]=\"content.downloads.tooltip\"\n    (click)=\"openSheet.set('downloads')\"\n  >\n    {{ content.downloads.label }}\n  </button>\n  <!-- One item per block, so each block projects by its item's selector (the bottom items pin to the bottom) -->\n  @if (!compact()) {\n    <a\n      hraNavigationRailItem\n      icon=\"code\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      hraFeature=\"embed\"\n      hraClickEvent\n      [attr.href]=\"content.embed.url\"\n      [hraPlainTooltip]=\"content.embed.tooltip\"\n    >\n      {{ content.embed.label }}\n    </a>\n  }\n\n  @if (showThemeMenu() && !compact()) {\n    <button\n      hraNavigationRailItem\n      hraNavigationRailBottom\n      hraFeature=\"theme\"\n      hraClickEvent\n      [icon]=\"themeIcon()\"\n      [hraPlainTooltip]=\"content.theme.tooltip\"\n      [matMenuTriggerFor]=\"themeMenu\"\n    >\n      {{ content.theme.label }}\n    </button>\n  }\n  @if (!compact()) {\n    <button\n      hraNavigationRailItem\n      hraNavigationRailBottom\n      icon=\"info\"\n      hraFeature=\"info\"\n      hraClickEvent\n      [active]=\"openSheet() === 'about'\"\n      [hraPlainTooltip]=\"content.info.tooltip\"\n      (click)=\"openSheet.set('about')\"\n    >\n      {{ content.info.label }}\n    </button>\n  }\n  <!-- Each block holds one element, so the rail can project it into its bottom group -->\n  @if (showHelpMenu() && !compact()) {\n    <button\n      hraNavigationRailItem\n      hraNavigationRailBottom\n      icon=\"help\"\n      hraFeature=\"help\"\n      hraClickEvent\n      [hraPlainTooltip]=\"content.help.tooltip\"\n      [matMenuTriggerFor]=\"helpMenu\"\n    >\n      {{ content.help.label }}\n    </button>\n  }\n  @if (compact()) {\n    <button\n      hraNavigationRailItem\n      icon=\"more_horiz\"\n      hraFeature=\"more\"\n      hraClickEvent\n      [active]=\"openSheet() === 'about'\"\n      [hraPlainTooltip]=\"content.more.tooltip\"\n      [matMenuTriggerFor]=\"moreMenu\"\n    >\n      {{ content.more.label }}\n    </button>\n  }\n</hra-navigation-rail>\n\n<!-- Menu items: the label names the item and the supporting text under it describes it -->\n<ng-template let-item let-id=\"id\" #menuItemText>\n  <span class=\"menu-item-text\">\n    <span [id]=\"id\">{{ item.label }}</span>\n    <span class=\"menu-item-description\" [id]=\"`${id}-description`\">{{ item.description }}</span>\n  </span>\n</ng-template>\n\n<!-- Panel clicks stop propagating so the menu stays open while panels are shown and hidden -->\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"panels-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #panelsMenu=\"matMenu\"\n>\n  @for (panel of content.panels.options; track panel.id) {\n    <button\n      mat-menu-item\n      role=\"menuitemcheckbox\"\n      hraClickEvent\n      [hraFeature]=\"panel.id\"\n      [attr.aria-checked]=\"!hiddenPanels().includes(panel.id)\"\n      (click)=\"$event.stopPropagation(); togglePanel(panel.id)\"\n    >\n      <mat-icon>{{ hiddenPanels().includes(panel.id) ? 'check_box_outline_blank' : 'check_box' }}</mat-icon>\n      {{ panel.label }}\n    </button>\n  }\n  <mat-divider />\n  <button\n    mat-menu-item\n    hraFeature=\"show-all-panels\"\n    hraClickEvent\n    [disabled]=\"hiddenPanels().length === 0\"\n    (click)=\"hiddenPanels.set([])\"\n  >\n    <mat-icon>visibility</mat-icon>\n    {{ content.panels.showAll }}\n  </button>\n</mat-menu>\n\n<!-- Clicks stop propagating so the menu stays open while options are toggled -->\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"display-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #displayMenu=\"matMenu\"\n>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"cell-links\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-cell-links`\"\n    [attr.aria-describedby]=\"`${idPrefix}-cell-links-description`\"\n    [attr.aria-checked]=\"cellLinks()\"\n    (click)=\"$event.stopPropagation(); cellLinks.set(!cellLinks())\"\n  >\n    <mat-icon>{{ cellLinks() ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"menuItemText; context: { $implicit: content.display.cellLinks, id: `${idPrefix}-cell-links` }\"\n    />\n  </button>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"cell-link-data\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-cell-link-data`\"\n    [attr.aria-describedby]=\"`${idPrefix}-cell-link-data-description`\"\n    [attr.aria-checked]=\"cellLinkData()\"\n    (click)=\"$event.stopPropagation(); cellLinkData.set(!cellLinkData())\"\n  >\n    <mat-icon>{{ cellLinkData() ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.display.cellLinkData, id: `${idPrefix}-cell-link-data` }\n      \"\n    />\n  </button>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"all-metadata\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-all-metadata`\"\n    [attr.aria-describedby]=\"`${idPrefix}-all-metadata-description`\"\n    [attr.aria-checked]=\"allMetadata()\"\n    [disabled]=\"!hasHiddenMetadata()\"\n    (click)=\"$event.stopPropagation(); allMetadata.set(!allMetadata())\"\n  >\n    <mat-icon>{{ allMetadata() ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.display.allMetadata, id: `${idPrefix}-all-metadata` }\n      \"\n    />\n  </button>\n</mat-menu>\n\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"reset-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #resetMenu=\"matMenu\"\n>\n  <button\n    mat-menu-item\n    hraFeature=\"reset-view\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-reset-view`\"\n    [attr.aria-describedby]=\"`${idPrefix}-reset-view-description`\"\n    (click)=\"resetViewClick.emit()\"\n  >\n    <mat-icon>fit_screen</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"menuItemText; context: { $implicit: content.reset.view, id: `${idPrefix}-reset-view` }\"\n    />\n  </button>\n  <button\n    mat-menu-item\n    hraFeature=\"restore-deleted-cells\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-restore-deleted-cells`\"\n    [attr.aria-describedby]=\"`${idPrefix}-restore-deleted-cells-description`\"\n    [disabled]=\"!hasDeletedCells()\"\n    (click)=\"restoreDeletedCellsClick.emit()\"\n  >\n    <mat-icon>restore_from_trash</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.reset.deletedCells, id: `${idPrefix}-restore-deleted-cells` }\n      \"\n    />\n  </button>\n  <button\n    mat-menu-item\n    hraFeature=\"reset-colors\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-reset-colors`\"\n    [attr.aria-describedby]=\"`${idPrefix}-reset-colors-description`\"\n    (click)=\"resetColorsClick.emit()\"\n  >\n    <mat-icon>settings_backup_restore</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"menuItemText; context: { $implicit: content.reset.colors, id: `${idPrefix}-reset-colors` }\"\n    />\n  </button>\n  <mat-divider />\n  <button\n    mat-menu-item\n    hraFeature=\"reset-everything\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-reset-everything`\"\n    [attr.aria-describedby]=\"`${idPrefix}-reset-everything-description`\"\n    (click)=\"resetEverythingClick.emit()\"\n  >\n    <mat-icon>restart_alt</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.reset.everything, id: `${idPrefix}-reset-everything` }\n      \"\n    />\n  </button>\n</mat-menu>\n\n<mat-menu\n  hraNavigationRailMenu\n  yPosition=\"above\"\n  hraFeature=\"theme-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #themeMenu=\"matMenu\"\n>\n  @for (option of content.theme.options; track option.id) {\n    <button\n      mat-menu-item\n      role=\"menuitemradio\"\n      hraClickEvent\n      [hraFeature]=\"option.id\"\n      [attr.aria-checked]=\"themePreference() === option.id\"\n      (click)=\"themePreference.set(option.id)\"\n    >\n      <mat-icon>{{ themePreference() === option.id ? 'radio_button_checked' : 'radio_button_unchecked' }}</mat-icon>\n      {{ option.label }}\n    </button>\n  }\n</mat-menu>\n\n<mat-menu\n  hraNavigationRailMenu\n  yPosition=\"above\"\n  hraFeature=\"help-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #helpMenu=\"matMenu\"\n>\n  @for (link of content.help.links; track link.id) {\n    <a\n      mat-menu-item\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      hraClickEvent\n      [hraFeature]=\"link.id\"\n      [attr.href]=\"link.url\"\n    >\n      <mat-icon>open_in_new</mat-icon>\n      {{ link.label }}\n    </a>\n  }\n</mat-menu>\n\n<!-- On compact screens, Embed, Theme, Info and Help move here. Theme and Help open as submenus. -->\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"more-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #moreMenu=\"matMenu\"\n>\n  <a\n    mat-menu-item\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed\"\n    hraClickEvent\n    [attr.href]=\"content.embed.url\"\n  >\n    <mat-icon>open_in_new</mat-icon>\n    {{ content.embed.label }}\n  </a>\n  @if (showThemeMenu()) {\n    <button mat-menu-item hraFeature=\"theme\" hraClickEvent [matMenuTriggerFor]=\"themeMenu\">\n      <mat-icon>{{ themeIcon() }}</mat-icon>\n      {{ content.theme.label }}\n    </button>\n  }\n  <button mat-menu-item hraFeature=\"info\" hraClickEvent (click)=\"openSheet.set('about')\">\n    <mat-icon>info</mat-icon>\n    {{ content.info.label }}\n  </button>\n  @if (showHelpMenu()) {\n    <button mat-menu-item hraFeature=\"help\" hraClickEvent [matMenuTriggerFor]=\"helpMenu\">\n      <mat-icon>help</mat-icon>\n      {{ content.help.label }}\n    </button>\n  }\n</mat-menu>\n", styles: [":host{display:block;height:100%}.menu-item-text{display:flex;flex-direction:column;padding:.5rem 0}.menu-item-text .menu-item-description{font:var(--mat-sys-body-small);letter-spacing:var(--mat-sys-body-small-tracking);color:var(--mat-sys-on-surface-variant)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i3$3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i1$2.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i1$2.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i1$2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: NavigationRailModule }, { kind: "component", type: i6.NavigationRailComponent, selector: "hra-navigation-rail", inputs: ["orientation"] }, { kind: "component", type: i6.NavigationRailItemComponent, selector: "button[hraNavigationRailItem], a[hraNavigationRailItem]", inputs: ["icon", "active"] }, { kind: "directive", type: i6.NavigationRailBottomDirective, selector: "[hraNavigationRailBottom]" }, { kind: "directive", type: i6.NavigationRailMenuDirective, selector: "mat-menu[hraNavigationRailMenu]", inputs: ["hraNavigationRailMenuOrientation"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-toolbar', imports: [
                        HraCommonModule,
                        MatDividerModule,
                        MatIconModule,
                        MatMenuModule,
                        NavigationRailModule,
                        PlainTooltipDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-navigation-rail [attr.aria-label]=\"content.label\" [orientation]=\"orientation()\">\n  @if (showPanelsMenu()) {\n    <button\n      hraNavigationRailItem\n      icon=\"space_dashboard\"\n      hraFeature=\"panels\"\n      hraClickEvent\n      [hraPlainTooltip]=\"content.panels.tooltip\"\n      [matMenuTriggerFor]=\"panelsMenu\"\n    >\n      {{ content.panels.label }}\n    </button>\n  }\n  <button\n    hraNavigationRailItem\n    icon=\"layers\"\n    hraFeature=\"display\"\n    hraClickEvent\n    [hraPlainTooltip]=\"content.display.tooltip\"\n    [matMenuTriggerFor]=\"displayMenu\"\n  >\n    {{ content.display.label }}\n  </button>\n  <button\n    hraNavigationRailItem\n    icon=\"restart_alt\"\n    hraFeature=\"reset\"\n    hraClickEvent\n    [hraPlainTooltip]=\"content.reset.tooltip\"\n    [matMenuTriggerFor]=\"resetMenu\"\n  >\n    {{ content.reset.label }}\n  </button>\n\n  @if (!compact()) {\n    <mat-divider />\n  }\n\n  <button\n    hraNavigationRailItem\n    icon=\"download\"\n    hraFeature=\"downloads\"\n    hraClickEvent\n    [active]=\"openSheet() === 'downloads'\"\n    [hraPlainTooltip]=\"content.downloads.tooltip\"\n    (click)=\"openSheet.set('downloads')\"\n  >\n    {{ content.downloads.label }}\n  </button>\n  <!-- One item per block, so each block projects by its item's selector (the bottom items pin to the bottom) -->\n  @if (!compact()) {\n    <a\n      hraNavigationRailItem\n      icon=\"code\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      hraFeature=\"embed\"\n      hraClickEvent\n      [attr.href]=\"content.embed.url\"\n      [hraPlainTooltip]=\"content.embed.tooltip\"\n    >\n      {{ content.embed.label }}\n    </a>\n  }\n\n  @if (showThemeMenu() && !compact()) {\n    <button\n      hraNavigationRailItem\n      hraNavigationRailBottom\n      hraFeature=\"theme\"\n      hraClickEvent\n      [icon]=\"themeIcon()\"\n      [hraPlainTooltip]=\"content.theme.tooltip\"\n      [matMenuTriggerFor]=\"themeMenu\"\n    >\n      {{ content.theme.label }}\n    </button>\n  }\n  @if (!compact()) {\n    <button\n      hraNavigationRailItem\n      hraNavigationRailBottom\n      icon=\"info\"\n      hraFeature=\"info\"\n      hraClickEvent\n      [active]=\"openSheet() === 'about'\"\n      [hraPlainTooltip]=\"content.info.tooltip\"\n      (click)=\"openSheet.set('about')\"\n    >\n      {{ content.info.label }}\n    </button>\n  }\n  <!-- Each block holds one element, so the rail can project it into its bottom group -->\n  @if (showHelpMenu() && !compact()) {\n    <button\n      hraNavigationRailItem\n      hraNavigationRailBottom\n      icon=\"help\"\n      hraFeature=\"help\"\n      hraClickEvent\n      [hraPlainTooltip]=\"content.help.tooltip\"\n      [matMenuTriggerFor]=\"helpMenu\"\n    >\n      {{ content.help.label }}\n    </button>\n  }\n  @if (compact()) {\n    <button\n      hraNavigationRailItem\n      icon=\"more_horiz\"\n      hraFeature=\"more\"\n      hraClickEvent\n      [active]=\"openSheet() === 'about'\"\n      [hraPlainTooltip]=\"content.more.tooltip\"\n      [matMenuTriggerFor]=\"moreMenu\"\n    >\n      {{ content.more.label }}\n    </button>\n  }\n</hra-navigation-rail>\n\n<!-- Menu items: the label names the item and the supporting text under it describes it -->\n<ng-template let-item let-id=\"id\" #menuItemText>\n  <span class=\"menu-item-text\">\n    <span [id]=\"id\">{{ item.label }}</span>\n    <span class=\"menu-item-description\" [id]=\"`${id}-description`\">{{ item.description }}</span>\n  </span>\n</ng-template>\n\n<!-- Panel clicks stop propagating so the menu stays open while panels are shown and hidden -->\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"panels-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #panelsMenu=\"matMenu\"\n>\n  @for (panel of content.panels.options; track panel.id) {\n    <button\n      mat-menu-item\n      role=\"menuitemcheckbox\"\n      hraClickEvent\n      [hraFeature]=\"panel.id\"\n      [attr.aria-checked]=\"!hiddenPanels().includes(panel.id)\"\n      (click)=\"$event.stopPropagation(); togglePanel(panel.id)\"\n    >\n      <mat-icon>{{ hiddenPanels().includes(panel.id) ? 'check_box_outline_blank' : 'check_box' }}</mat-icon>\n      {{ panel.label }}\n    </button>\n  }\n  <mat-divider />\n  <button\n    mat-menu-item\n    hraFeature=\"show-all-panels\"\n    hraClickEvent\n    [disabled]=\"hiddenPanels().length === 0\"\n    (click)=\"hiddenPanels.set([])\"\n  >\n    <mat-icon>visibility</mat-icon>\n    {{ content.panels.showAll }}\n  </button>\n</mat-menu>\n\n<!-- Clicks stop propagating so the menu stays open while options are toggled -->\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"display-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #displayMenu=\"matMenu\"\n>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"cell-links\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-cell-links`\"\n    [attr.aria-describedby]=\"`${idPrefix}-cell-links-description`\"\n    [attr.aria-checked]=\"cellLinks()\"\n    (click)=\"$event.stopPropagation(); cellLinks.set(!cellLinks())\"\n  >\n    <mat-icon>{{ cellLinks() ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"menuItemText; context: { $implicit: content.display.cellLinks, id: `${idPrefix}-cell-links` }\"\n    />\n  </button>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"cell-link-data\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-cell-link-data`\"\n    [attr.aria-describedby]=\"`${idPrefix}-cell-link-data-description`\"\n    [attr.aria-checked]=\"cellLinkData()\"\n    (click)=\"$event.stopPropagation(); cellLinkData.set(!cellLinkData())\"\n  >\n    <mat-icon>{{ cellLinkData() ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.display.cellLinkData, id: `${idPrefix}-cell-link-data` }\n      \"\n    />\n  </button>\n  <button\n    mat-menu-item\n    role=\"menuitemcheckbox\"\n    hraFeature=\"all-metadata\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-all-metadata`\"\n    [attr.aria-describedby]=\"`${idPrefix}-all-metadata-description`\"\n    [attr.aria-checked]=\"allMetadata()\"\n    [disabled]=\"!hasHiddenMetadata()\"\n    (click)=\"$event.stopPropagation(); allMetadata.set(!allMetadata())\"\n  >\n    <mat-icon>{{ allMetadata() ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.display.allMetadata, id: `${idPrefix}-all-metadata` }\n      \"\n    />\n  </button>\n</mat-menu>\n\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"reset-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #resetMenu=\"matMenu\"\n>\n  <button\n    mat-menu-item\n    hraFeature=\"reset-view\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-reset-view`\"\n    [attr.aria-describedby]=\"`${idPrefix}-reset-view-description`\"\n    (click)=\"resetViewClick.emit()\"\n  >\n    <mat-icon>fit_screen</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"menuItemText; context: { $implicit: content.reset.view, id: `${idPrefix}-reset-view` }\"\n    />\n  </button>\n  <button\n    mat-menu-item\n    hraFeature=\"restore-deleted-cells\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-restore-deleted-cells`\"\n    [attr.aria-describedby]=\"`${idPrefix}-restore-deleted-cells-description`\"\n    [disabled]=\"!hasDeletedCells()\"\n    (click)=\"restoreDeletedCellsClick.emit()\"\n  >\n    <mat-icon>restore_from_trash</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.reset.deletedCells, id: `${idPrefix}-restore-deleted-cells` }\n      \"\n    />\n  </button>\n  <button\n    mat-menu-item\n    hraFeature=\"reset-colors\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-reset-colors`\"\n    [attr.aria-describedby]=\"`${idPrefix}-reset-colors-description`\"\n    (click)=\"resetColorsClick.emit()\"\n  >\n    <mat-icon>settings_backup_restore</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"menuItemText; context: { $implicit: content.reset.colors, id: `${idPrefix}-reset-colors` }\"\n    />\n  </button>\n  <mat-divider />\n  <button\n    mat-menu-item\n    hraFeature=\"reset-everything\"\n    hraClickEvent\n    [attr.aria-labelledby]=\"`${idPrefix}-reset-everything`\"\n    [attr.aria-describedby]=\"`${idPrefix}-reset-everything-description`\"\n    (click)=\"resetEverythingClick.emit()\"\n  >\n    <mat-icon>restart_alt</mat-icon>\n    <ng-container\n      *ngTemplateOutlet=\"\n        menuItemText;\n        context: { $implicit: content.reset.everything, id: `${idPrefix}-reset-everything` }\n      \"\n    />\n  </button>\n</mat-menu>\n\n<mat-menu\n  hraNavigationRailMenu\n  yPosition=\"above\"\n  hraFeature=\"theme-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #themeMenu=\"matMenu\"\n>\n  @for (option of content.theme.options; track option.id) {\n    <button\n      mat-menu-item\n      role=\"menuitemradio\"\n      hraClickEvent\n      [hraFeature]=\"option.id\"\n      [attr.aria-checked]=\"themePreference() === option.id\"\n      (click)=\"themePreference.set(option.id)\"\n    >\n      <mat-icon>{{ themePreference() === option.id ? 'radio_button_checked' : 'radio_button_unchecked' }}</mat-icon>\n      {{ option.label }}\n    </button>\n  }\n</mat-menu>\n\n<mat-menu\n  hraNavigationRailMenu\n  yPosition=\"above\"\n  hraFeature=\"help-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #helpMenu=\"matMenu\"\n>\n  @for (link of content.help.links; track link.id) {\n    <a\n      mat-menu-item\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      hraClickEvent\n      [hraFeature]=\"link.id\"\n      [attr.href]=\"link.url\"\n    >\n      <mat-icon>open_in_new</mat-icon>\n      {{ link.label }}\n    </a>\n  }\n</mat-menu>\n\n<!-- On compact screens, Embed, Theme, Info and Help move here. Theme and Help open as submenus. -->\n<mat-menu\n  hraNavigationRailMenu\n  hraFeature=\"more-menu\"\n  [hraNavigationRailMenuOrientation]=\"orientation()\"\n  #moreMenu=\"matMenu\"\n>\n  <a\n    mat-menu-item\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    hraFeature=\"embed\"\n    hraClickEvent\n    [attr.href]=\"content.embed.url\"\n  >\n    <mat-icon>open_in_new</mat-icon>\n    {{ content.embed.label }}\n  </a>\n  @if (showThemeMenu()) {\n    <button mat-menu-item hraFeature=\"theme\" hraClickEvent [matMenuTriggerFor]=\"themeMenu\">\n      <mat-icon>{{ themeIcon() }}</mat-icon>\n      {{ content.theme.label }}\n    </button>\n  }\n  <button mat-menu-item hraFeature=\"info\" hraClickEvent (click)=\"openSheet.set('about')\">\n    <mat-icon>info</mat-icon>\n    {{ content.info.label }}\n  </button>\n  @if (showHelpMenu()) {\n    <button mat-menu-item hraFeature=\"help\" hraClickEvent [matMenuTriggerFor]=\"helpMenu\">\n      <mat-icon>help</mat-icon>\n      {{ content.help.label }}\n    </button>\n  }\n</mat-menu>\n", styles: [":host{display:block;height:100%}.menu-item-text{display:flex;flex-direction:column;padding:.5rem 0}.menu-item-text .menu-item-description{font:var(--mat-sys-body-small);letter-spacing:var(--mat-sys-body-small-tracking);color:var(--mat-sys-on-surface-variant)}\n"] }]
        }], propDecorators: { hiddenPanels: [{ type: i0.Input, args: [{ isSignal: true, alias: "hiddenPanels", required: false }] }, { type: i0.Output, args: ["hiddenPanelsChange"] }], cellLinks: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellLinks", required: false }] }, { type: i0.Output, args: ["cellLinksChange"] }], cellLinkData: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellLinkData", required: false }] }, { type: i0.Output, args: ["cellLinkDataChange"] }], allMetadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "allMetadata", required: false }] }, { type: i0.Output, args: ["allMetadataChange"] }], hasHiddenMetadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "hasHiddenMetadata", required: false }] }], hasDeletedCells: [{ type: i0.Input, args: [{ isSignal: true, alias: "hasDeletedCells", required: false }] }], openSheet: [{ type: i0.Input, args: [{ isSignal: true, alias: "openSheet", required: false }] }, { type: i0.Output, args: ["openSheetChange"] }], showThemeMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "showThemeMenu", required: false }] }], showHelpMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "showHelpMenu", required: false }] }], showPanelsMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "showPanelsMenu", required: false }] }], compact: [{ type: i0.Input, args: [{ isSignal: true, alias: "compact", required: false }] }], themePreference: [{ type: i0.Input, args: [{ isSignal: true, alias: "themePreference", required: false }] }, { type: i0.Output, args: ["themePreferenceChange"] }], resetViewClick: [{ type: i0.Output, args: ["resetViewClick"] }], restoreDeletedCellsClick: [{ type: i0.Output, args: ["restoreDeletedCellsClick"] }], resetColorsClick: [{ type: i0.Output, args: ["resetColorsClick"] }], resetEverythingClick: [{ type: i0.Output, args: ["resetEverythingClick"] }] } });

var padding = {
	top: 0,
	right: 16,
	bottom: 0,
	left: 16
};
var facet$1 = {
	column: {
		field: "type",
		sort: {
			field: "Count",
			order: "descending"
		},
		title: "Cell types",
		header: {
			titleOrient: "bottom",
			titlePadding: 8,
			labelOrient: "bottom",
			labelAngle: -45,
			labelAlign: "right",
			labelBaseline: "middle",
			labelPadding: 8,
			labelLimit: 160
		}
	}
};
var resolve$1 = {
	scale: {
		x: "independent"
	}
};
var spec$1 = {
	height: 0,
	width: 0,
	layer: [
		{
			mark: {
				type: "area",
				orient: "horizontal",
				stroke: {
					expr: "themeMarkColor"
				},
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
				y: {
					field: "value",
					type: "quantitative",
					title: "Distance (µm)",
					axis: {
						minExtent: 25,
						labelFlush: false,
						grid: true,
						labelOverlap: true,
						labelSeparation: 4
					},
					scale: {
						domainMin: 0
					}
				},
				x: {
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
								expr: "'Replaced/repeated in javascript' && colors[0] || themeMarkColor"
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
				size: 4,
				color: "black",
				rule: {
					color: {
						expr: "themeMarkColor"
					}
				}
			},
			encoding: {
				y: {
					field: "distance",
					type: "quantitative",
					title: "Distance (µm)",
					scale: {
						domainMin: 0
					}
				}
			}
		}
	]
};
var violinFullscreen_vl = {
	padding: padding,
	facet: facet$1,
	resolve: resolve$1,
	spec: spec$1
};

var VIOLIN_FULLSCREEN_OVERRIDES = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: violinFullscreen_vl,
    facet: facet$1,
    padding: padding,
    resolve: resolve$1,
    spec: spec$1
});

var $schema = "https://vega.github.io/schema/vega-lite/v5.json";
var spacing = -2;
var title = {
	text: "Cell types",
	anchor: "start",
	frame: "bounds",
	orient: "top",
	offset: -14
};
var background = {
	expr: "themeBackground"
};
var config = {
	font: "Nunito Sans Variable",
	padding: {
		top: 0,
		right: 16,
		bottom: 16,
		left: 16
	},
	view: {
		stroke: "transparent"
	},
	axis: {
		labelFontSize: 14,
		titleFontSize: 14,
		titleFontWeight: 400,
		labelFontWeight: 400,
		titleLineHeight: 21,
		labelLineHeight: 21,
		titleColor: {
			expr: "themeTitleColor"
		},
		labelColor: {
			expr: "themeLabelColor"
		},
		ticks: false,
		labelPadding: 8,
		gridColor: {
			expr: "themeGridColor"
		}
	},
	scale: {
		continuousPadding: 20
	},
	title: {
		fontSize: 14,
		fontWeight: 400,
		lineHeight: 21,
		color: {
			expr: "themeTitleColor"
		}
	},
	header: {
		titleColor: {
			expr: "themeTitleColor"
		},
		labelColor: {
			expr: "themeLabelColor"
		}
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
	},
	{
		name: "themeBackground",
		value: "#fcfbfd"
	},
	{
		name: "themeTitleColor",
		value: "#1a1c1e"
	},
	{
		name: "themeLabelColor",
		value: "#414751"
	},
	{
		name: "themeGridColor",
		value: "#c1c7d4"
	},
	{
		name: "themeMarkColor",
		value: "#1a1c1e"
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
		title: null,
		header: {
			labelAngle: 0,
			labelPadding: 12,
			labelAlign: "left",
			labelLimit: 100,
			labelBaseline: "middle"
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
				stroke: {
					expr: "themeMarkColor"
				},
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
								expr: "'Replaced/repeated in javascript' && colors[0] || themeMarkColor"
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
				size: 4,
				color: "black",
				rule: {
					color: {
						expr: "themeMarkColor"
					}
				}
			},
			encoding: {
				x: {
					field: "distance",
					type: "quantitative",
					title: "Distance (µm)",
					scale: {
						domainMin: 0
					}
				}
			}
		}
	]
};
var violin_vl = {
	$schema: $schema,
	spacing: spacing,
	title: title,
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
    title: title,
    transform: transform
});

/** Font sizes used in the violin, in pixels */
const VIOLIN_FONT_SIZES = [12, 14];
/** Width of the exported image */
const EXPORT_IMAGE_WIDTH = 1000;
/** Height of the exported image */
const EXPORT_IMAGE_HEIGHT = 40;
/** Padding for the exported image */
const EXPORT_IMAGE_PADDING = 16;
/** Minimum height for individual violin plots. Below it, the violins scroll at their maximum height instead. */
const MIN_VIOLIN_HEIGHT = 40;
/** Maximum height for individual violin plots */
const MAX_VIOLIN_HEIGHT = 44;
/**
 * Width offset for individual violin plots: an estimate of the space the cell type labels and padding take.
 * The chart is fitted to its container after it renders (see fitViolinView).
 */
const VIOLIN_WIDTH_OFFSET = 150;
/** Height offset for individual violin plots: an estimate of the space the titles, axis, and padding take */
const VIOLIN_HEIGHT_OFFSET = 60;
/**
 * Width offset for the fullscreen violins: an estimate of the space the distance axis, the first cell type label,
 * and padding take. The chart is fitted to its container after it renders (see fitFullscreenViolinView).
 */
const FULLSCREEN_VIOLIN_WIDTH_OFFSET = 130;
/** Height offset for the fullscreen violins: an estimate of the space the cell type labels and title take */
const FULLSCREEN_VIOLIN_HEIGHT_OFFSET = 160;
/** Most passes taken to fit the fullscreen chart to its container */
const FULLSCREEN_FIT_PASSES = 3;
/**
 * Spec for the fullscreen view, where the violins stand upright side by side with the cell types along the bottom.
 * It swaps in its own facet, scales, and layers, and titles the cell types in the facet header, not the chart title.
 */
const VIOLIN_FULLSCREEN_SPEC = { ...VIOLIN_SPEC, title: undefined, ...VIOLIN_FULLSCREEN_OVERRIDES };
/** Configuration for the legend in the exported image. Its text uses the chart theme's type (see applyChartTheme). */
const EXPORT_IMAGE_LEGEND_CONFIG = {
    title: null,
    symbolType: 'circle',
    symbolStrokeWidth: 10,
    symbolStrokeColor: 'type',
    symbolSize: 400,
};
/** Length of the dynamic color range */
const DYNAMIC_COLOR_RANGE_LENGTH = 2000;
/** Dynamic color range for the violin */
const DYNAMIC_COLOR_RANGE = Array(DYNAMIC_COLOR_RANGE_LENGTH)
    .fill(0)
    .map((_value, index) => ({ expr: `colors[${index}] || themeMarkColor` }));
/**
 * Violin Component
 */
class ViolinComponent {
    /** Data for the violin visualization */
    data = input.required(...(ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []));
    /** Colors for the violin visualization */
    colors = input.required(...(ngDevMode ? [{ debugName: "colors" }] : /* istanbul ignore next */ []));
    /** Whether the data is loading, which shows a skeleton in place of the violins */
    loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    /** Empty state shown in place of the violins, or undefined when there are distances to show */
    emptyState = input(...(ngDevMode ? [undefined, { debugName: "emptyState" }] : /* istanbul ignore next */ []));
    /** Emits when the empty state's action is clicked */
    emptyStateAction = output();
    /** Whether the panel can open in full screen. The tabbed layout turns it off, which also closes an open view. */
    fullscreenAvailable = input(true, ...(ngDevMode ? [{ debugName: "fullscreenAvailable" }] : /* istanbul ignore next */ []));
    /** Emits true when the panel opens in full screen and false when it closes */
    fullscreenChange = output();
    /** Reference to the document object */
    document = inject(DOCUMENT);
    /** Reference to the renderer for DOM manipulation */
    renderer = inject(Renderer2);
    /** Service for saving files */
    fileSaver = inject(FileSaverService);
    /** Pending tasks, used to keep the app unstable while the violins resize */
    pendingTasks = inject(PendingTasks);
    /** Host element, where the theme colors are read */
    el = inject(ElementRef).nativeElement;
    /** Changes when the color scheme changes */
    colorScheme = watchColorScheme();
    /** Chart theme, read again when the color scheme changes */
    theme = computed(() => {
        this.colorScheme();
        return getChartTheme(this.el);
    }, ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    /** Element reference for the violin container */
    violinEl = viewChild.required(FullscreenPortalComponent);
    /** Closes an open fullscreen view when full screen becomes unavailable */
    closeFullscreenRef = afterRenderEffect(() => {
        if (!this.fullscreenAvailable()) {
            untracked(() => this.violinEl().close());
        }
    });
    /** Whether the violin is in the fullscreen view, where the violins stand upright and fit without scrolling */
    fullscreen = signal(false, ...(ngDevMode ? [{ debugName: "fullscreen" }] : /* istanbul ignore next */ []));
    /** Whether the fullscreen dialog has finished opening, so the fullscreen view can draw new data */
    fullscreenReady = signal(false, ...(ngDevMode ? [{ debugName: "fullscreenReady" }] : /* istanbul ignore next */ []));
    /** Whether the fullscreen view is waiting to draw new data, which shows a skeleton */
    fullscreenLoading = signal(false, ...(ngDevMode ? [{ debugName: "fullscreenLoading" }] : /* istanbul ignore next */ []));
    /** Vega view for the docked panel */
    dockedView = signal(undefined, ...(ngDevMode ? [{ debugName: "dockedView" }] : /* istanbul ignore next */ []));
    /** Vega view for the fullscreen view. Both views stay alive, so switching between them doesn't redraw the violins. */
    fullscreenView = signal(undefined, ...(ngDevMode ? [{ debugName: "fullscreenView" }] : /* istanbul ignore next */ []));
    /** Vega view that is showing */
    view = computed(() => (this.fullscreen() ? this.fullscreenView() : this.dockedView()), ...(ngDevMode ? [{ debugName: "view" }] : /* istanbul ignore next */ []));
    /** Data each view last received, so a view that already has the current data doesn't estimate the densities again */
    viewData = new WeakMap();
    /** Number of colors (cell types) in the visualization */
    colorCount = signal(0, ...(ngDevMode ? [{ debugName: "colorCount" }] : /* istanbul ignore next */ []));
    /** Number of cell types in the data, one violin each */
    cellTypeCount = computed(() => new Set(this.data().map(({ type }) => type)).size, ...(ngDevMode ? [{ debugName: "cellTypeCount" }] : /* istanbul ignore next */ []));
    /** Whether vertical scrolling should be enabled for the violin visualization */
    enableScroll = signal(false, ...(ngDevMode ? [{ debugName: "enableScroll" }] : /* istanbul ignore next */ []));
    /**
     * Effect for updating view data. Estimating the densities can take seconds for large datasets, so the fullscreen
     * view shows a skeleton and waits until its dialog has finished opening. Otherwise opening would wait on it.
     */
    viewDataRef = effect(() => {
        const view = this.view();
        const data = this.data();
        if (!view || data.length === 0 || this.viewData.get(view) === data) {
            return;
        }
        if (!this.fullscreen()) {
            this.viewData.set(view, data);
            view.data('data', data).run();
        }
        else if (this.fullscreenReady()) {
            this.drawFullscreenData(view, data);
        }
        else {
            this.fullscreenLoading.set(true);
        }
    }, ...(ngDevMode ? [{ debugName: "viewDataRef" }] : /* istanbul ignore next */ []));
    /** Effect for updating view colors */
    viewColorsRef = effect(() => {
        if (this.view() && this.view()?.getState()) {
            this.view()?.signal('colors', this.colors()).run();
            this.colorCount.set(this.view()?.getState().signals.colors.length);
            this.resizeAndSyncView();
        }
    }, ...(ngDevMode ? [{ debugName: "viewColorsRef" }] : /* istanbul ignore next */ []));
    /** Effect for updating the view's theme colors in place, without redrawing the violins */
    viewThemeRef = effect(() => {
        const theme = this.theme();
        const view = this.view();
        if (view) {
            updateChartTheme(view, theme);
        }
    }, ...(ngDevMode ? [{ debugName: "viewThemeRef" }] : /* istanbul ignore next */ []));
    /** Effect for creating the docked Vega view */
    viewCreateRef = effect((onCleanup) => this.createView(false, onCleanup), ...(ngDevMode ? [{ debugName: "viewCreateRef" }] : /* istanbul ignore next */ []));
    /** Effect for creating the fullscreen Vega view, sized when the fullscreen view opens */
    fullscreenViewCreateRef = effect((onCleanup) => this.createView(true, onCleanup), ...(ngDevMode ? [{ debugName: "fullscreenViewCreateRef" }] : /* istanbul ignore next */ []));
    /**
     * Resizes view after full screen toggle or viewport resize.
     * The resize is a pending task, so the fullscreen view transition waits until the violins fit.
     */
    /* istanbul ignore next */
    resizeAndSyncView() {
        const done = this.pendingTasks.add();
        setTimeout(async () => {
            try {
                await this.resizeView();
            }
            finally {
                done();
            }
        });
    }
    /** Leaves the fullscreen view. A fullscreen view still waiting for its data draws it the next time it opens. */
    closeFullscreen() {
        this.fullscreen.set(false);
        this.fullscreenReady.set(false);
        this.fullscreenLoading.set(false);
    }
    /**
     * Draws new data in the fullscreen view and fits it, then hides the skeleton.
     * It's a pending task, so a view transition that closes the dialog meanwhile waits for it.
     *
     * @param view Fullscreen Vega view
     * @param data Data to draw
     */
    drawFullscreenData(view, data) {
        this.viewData.set(view, data);
        this.fullscreenLoading.set(true);
        const done = this.pendingTasks.add();
        setTimeout(async () => {
            try {
                await view.data('data', data).runAsync();
                await this.resizeView();
            }
            finally {
                if (this.viewData.get(view) === data) {
                    this.fullscreenLoading.set(false);
                }
                done();
            }
        });
    }
    /** Resizes the view that is showing to its container */
    /* istanbul ignore next */
    async resizeView() {
        const view = this.view();
        if (view) {
            const container = this.violinEl().rootNodes()[0];
            const el = container.querySelector('.violin');
            // A hidden panel has no size. The violins resize when it shows again.
            if (el?.clientWidth === 0) {
                return;
            }
            if (el && this.fullscreen()) {
                this.enableScroll.set(false);
                // The fullscreen violins start at 0 by 0 (see the spec). They are sized from the estimates the first time,
                // and fitted from their current size after that, so they don't jump back to the estimates.
                if (view.signal('child_height') < 1) {
                    view.signal('child_width', this.calculateFullscreenViolinWidth(el.clientWidth));
                    view.signal('child_height', Math.max(el.clientHeight - FULLSCREEN_VIOLIN_HEIGHT_OFFSET, 1));
                }
            }
            else if (el) {
                if (this.calculateViolinHeight(el.clientHeight) < MIN_VIOLIN_HEIGHT) {
                    view.signal('child_height', MAX_VIOLIN_HEIGHT);
                    this.enableScroll.set(true);
                }
                else {
                    view.signal('child_height', this.calculateViolinHeight(el.clientHeight));
                    this.enableScroll.set(false);
                }
                view.signal('child_width', Math.max(el.clientWidth - VIOLIN_WIDTH_OFFSET, 1));
            }
            await view.resize().runAsync();
            if (el && this.fullscreen()) {
                await this.fitFullscreenViolinView(view, el);
            }
            else if (el) {
                await this.fitViolinView(view, el);
            }
        }
    }
    /**
     * Creates the docked or the fullscreen Vega view in its container
     *
     * @param fullscreen Whether to create the fullscreen view
     * @param onCleanup Registers the view's cleanup with the effect creating it
     */
    async createView(fullscreen, onCleanup) {
        const container = this.violinEl().rootNodes()[0];
        const el = container.querySelector(fullscreen ? '.violin-fullscreen-chart' : '.violin-docked-chart');
        const theme = untracked(this.theme);
        await this.ensureFontsLoaded(theme.font);
        const spec = produce((fullscreen ? VIOLIN_FULLSCREEN_SPEC : VIOLIN_SPEC), (draft) => {
            applyChartTheme(draft, theme);
            for (const layer of draft.spec.layer) {
                if (layer.encoding.color?.legend === null) {
                    layer.encoding.color.scale = { range: DYNAMIC_COLOR_RANGE };
                }
            }
            if (!fullscreen) {
                draft.spec.width = Math.max(el.clientWidth - VIOLIN_WIDTH_OFFSET, 1);
                draft.spec.height = MAX_VIOLIN_HEIGHT;
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { finalize, view } = await embed(el, spec, {
            actions: false,
        });
        setUpChartTooltips(view);
        onCleanup(finalize);
        (fullscreen ? this.fullscreenView : this.dockedView).set(view);
    }
    /**
     * Fits the chart to its container after it renders. The width and height offsets only estimate the space
     * the labels, titles, and padding take, which varies with the cell type names.
     * - The violins widen or narrow so the chart fills the container's width, with no gap on its right side.
     * - When the violins don't scroll but the chart is taller than the container, they shrink to fit,
     *   or scroll at their maximum height if that would take them below the minimum.
     *
     * @param view Vega view
     * @param el Scroll container holding the chart
     */
    /* istanbul ignore next */
    async fitViolinView(view, el) {
        const chart = view.container()?.querySelector('canvas, svg');
        if (!chart) {
            return;
        }
        const { width, height } = chart.getBoundingClientRect();
        const widthGap = el.clientWidth - width;
        const heightGap = el.clientHeight - height;
        let changed = false;
        if (Math.abs(widthGap) >= 1) {
            view.signal('child_width', Math.max(view.signal('child_width') + widthGap, 1));
            changed = true;
        }
        if (!this.enableScroll() && heightGap <= -1) {
            const violinHeight = view.signal('child_height') + heightGap / Math.max(this.colorCount(), 1);
            const scroll = violinHeight < MIN_VIOLIN_HEIGHT;
            view.signal('child_height', scroll ? MAX_VIOLIN_HEIGHT : violinHeight);
            this.enableScroll.set(scroll);
            changed = true;
        }
        if (changed) {
            await view.resize().runAsync();
        }
    }
    /**
     * Fits the fullscreen chart to its container after it renders, so the whole chart shows without scrolling.
     * Every violin widens or narrows by an equal share of the width gap, and the violins grow or shrink to fill
     * the height. The first rotated cell type label can stick out past the distance axis by an amount that depends
     * on the violin width, so fitting can take more than one pass.
     *
     * @param view Vega view
     * @param el Scroll container holding the chart
     */
    /* istanbul ignore next */
    async fitFullscreenViolinView(view, el) {
        const count = Math.max(this.cellTypeCount(), 1);
        for (let pass = 0; pass < FULLSCREEN_FIT_PASSES; pass++) {
            const chart = view.container()?.querySelector('canvas, svg');
            if (!chart) {
                return;
            }
            // Layout sizes, unlike the bounding box, aren't scaled by the dialog's opening animation
            const widthGap = el.clientWidth - chart.clientWidth;
            const heightGap = el.clientHeight - chart.clientHeight;
            if (Math.abs(widthGap) < 1 && Math.abs(heightGap) < 1) {
                return;
            }
            view.signal('child_width', Math.max(view.signal('child_width') + widthGap / count, 1));
            view.signal('child_height', Math.max(view.signal('child_height') + heightGap, 1));
            await view.resize().runAsync();
        }
    }
    /**
     * Calculates the width (in px) of each fullscreen violin based on container width and number of cell types
     * @param boxW container width
     * @returns Violin width
     */
    calculateFullscreenViolinWidth(boxW) {
        return Math.max((boxW - FULLSCREEN_VIOLIN_WIDTH_OFFSET) / Math.max(this.cellTypeCount(), 1), 1);
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
        const theme = this.theme();
        const spec = produce(VIOLIN_SPEC, (draft) => {
            applyChartTheme(draft, theme);
            draft.spec.width = EXPORT_IMAGE_WIDTH;
            for (const layer of draft.spec.layer) {
                if (layer.encoding.color?.legend === null) {
                    layer.encoding.color.legend = {
                        ...EXPORT_IMAGE_LEGEND_CONFIG,
                        titleColor: theme.titleColor,
                        labelColor: theme.labelColor,
                    };
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
    /**
     * Ensure required fonts are loaded for the violin
     *
     * @param font Font family used by the violin
     */
    async ensureFontsLoaded(font) {
        const loadPromises = VIOLIN_FONT_SIZES.map((size) => this.document.fonts.load(`${size}px ${font}`));
        await Promise.all(loadPromises);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ViolinComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: ViolinComponent, isStandalone: true, selector: "cde-violin", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: true, transformFunction: null }, colors: { classPropertyName: "colors", publicName: "colors", isSignal: true, isRequired: true, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, emptyState: { classPropertyName: "emptyState", publicName: "emptyState", isSignal: true, isRequired: false, transformFunction: null }, fullscreenAvailable: { classPropertyName: "fullscreenAvailable", publicName: "fullscreenAvailable", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { emptyStateAction: "emptyStateAction", fullscreenChange: "fullscreenChange" }, host: { listeners: { "window:resize": "resizeAndSyncView()" }, properties: { "attr.aria-busy": "loading() || null" } }, viewQueries: [{ propertyName: "violinEl", first: true, predicate: FullscreenPortalComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<hra-expansion-panel tagline=\"Violin graph\" disabled hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-header-content>\n    @if (fullscreenAvailable()) {\n      <button\n        mat-icon-button\n        aria-label=\"Open the violin graph in full screen\"\n        hraPlainTooltip=\"Full screen\"\n        hraFeature=\"open-fullscreen\"\n        hraClickEvent\n        (click)=\"violinEl().open()\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    }\n  </hra-expansion-panel-header-content>\n  <hra-fullscreen-portal\n    tagline=\"Violin graph\"\n    hraFeature=\"fullscreen-violin\"\n    viewTransition\n    (beforeOpened)=\"fullscreen.set(true); fullscreenChange.emit(true)\"\n    (opened)=\"resizeAndSyncView()\"\n    (transitionEnded)=\"fullscreenReady.set(fullscreen())\"\n    (beforeClosed)=\"closeFullscreen(); fullscreenChange.emit(false)\"\n    (closed)=\"resizeAndSyncView()\"\n  >\n    <hra-fullscreen-portal-content class=\"violin-fullscreen-portal\" [class.enableScroll]=\"enableScroll()\">\n      <ng-scrollbar\n        class=\"violin\"\n        orientation=\"vertical\"\n        hraScrollOverflowFade\n        hraFeature=\"violin-scrollbar\"\n        [attr.inert]=\"emptyState() ? '' : null\"\n      >\n        <div class=\"violin-container violin-docked-chart\" data-testid=\"violin\" [class.hidden]=\"fullscreen()\"></div>\n        <div class=\"violin-container violin-fullscreen-chart\" [class.hidden]=\"!fullscreen()\"></div>\n      </ng-scrollbar>\n      @if (loading() || fullscreenLoading()) {\n        <cde-chart-skeleton />\n      } @else if (emptyState(); as content) {\n        <cde-empty-state hraFeature=\"empty-state\" [content]=\"content\" (actionClick)=\"emptyStateAction.emit()\" />\n      }\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{display:block;overflow:hidden}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem .5rem .5rem 1rem;min-height:3.5rem}:host ::ng-deep hra-expansion-panel .content{height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel ng-scrollbar{width:100%}:host hra-fullscreen-portal-content{display:flex}:host hra-fullscreen-portal{height:100%}hra-fullscreen-portal-content{position:relative}::ng-deep hra-fullscreen-portal-content{display:flex}::ng-deep hra-fullscreen-portal-content ng-scrollbar{width:100%}::ng-deep hra-fullscreen-portal-content .ng-scroll-content{width:100%!important;max-height:100%;min-height:0rem!important}.enableScroll ::ng-deep .ng-scroll-content{max-height:unset}::ng-deep .violin-container{width:100%;height:100%}::ng-deep .violin-container.vega-embed,::ng-deep .violin-container canvas,::ng-deep .violin-container svg{display:block}::ng-deep .violin-container.hidden{display:none}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i4.NgScrollbar, selector: "ng-scrollbar:not([externalViewport]), [ngScrollbar]", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i5.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset", "scrollOverflowFadeBottomOffset"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "component", type: FullscreenPortalComponent, selector: "hra-fullscreen-portal", inputs: ["tagline", "panelClass", "viewTransition"], outputs: ["beforeOpened", "opened", "beforeClosed", "closed", "transitionEnded"] }, { kind: "component", type: ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "component", type: ExpansionPanelHeaderContentComponent, selector: "hra-expansion-panel-header-content" }, { kind: "component", type: FullscreenPortalContentComponent, selector: "hra-fullscreen-portal-content" }, { kind: "component", type: ChartSkeletonComponent, selector: "cde-chart-skeleton" }, { kind: "component", type: EmptyStateComponent, selector: "cde-empty-state", inputs: ["content"], outputs: ["actionClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ViolinComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-violin', imports: [
                        HraCommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatExpansionModule,
                        ScrollingModule,
                        PlainTooltipDirective,
                        FullscreenPortalComponent,
                        ExpansionPanelComponent,
                        ExpansionPanelHeaderContentComponent,
                        FullscreenPortalContentComponent,
                        ChartSkeletonComponent,
                        EmptyStateComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-busy]': 'loading() || null',
                        '(window:resize)': 'resizeAndSyncView()',
                    }, template: "<hra-expansion-panel tagline=\"Violin graph\" disabled hraHoverEvent hraHoverEventTriggerOn=\"mouseenter\">\n  <hra-expansion-panel-header-content>\n    @if (fullscreenAvailable()) {\n      <button\n        mat-icon-button\n        aria-label=\"Open the violin graph in full screen\"\n        hraPlainTooltip=\"Full screen\"\n        hraFeature=\"open-fullscreen\"\n        hraClickEvent\n        (click)=\"violinEl().open()\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    }\n  </hra-expansion-panel-header-content>\n  <hra-fullscreen-portal\n    tagline=\"Violin graph\"\n    hraFeature=\"fullscreen-violin\"\n    viewTransition\n    (beforeOpened)=\"fullscreen.set(true); fullscreenChange.emit(true)\"\n    (opened)=\"resizeAndSyncView()\"\n    (transitionEnded)=\"fullscreenReady.set(fullscreen())\"\n    (beforeClosed)=\"closeFullscreen(); fullscreenChange.emit(false)\"\n    (closed)=\"resizeAndSyncView()\"\n  >\n    <hra-fullscreen-portal-content class=\"violin-fullscreen-portal\" [class.enableScroll]=\"enableScroll()\">\n      <ng-scrollbar\n        class=\"violin\"\n        orientation=\"vertical\"\n        hraScrollOverflowFade\n        hraFeature=\"violin-scrollbar\"\n        [attr.inert]=\"emptyState() ? '' : null\"\n      >\n        <div class=\"violin-container violin-docked-chart\" data-testid=\"violin\" [class.hidden]=\"fullscreen()\"></div>\n        <div class=\"violin-container violin-fullscreen-chart\" [class.hidden]=\"!fullscreen()\"></div>\n      </ng-scrollbar>\n      @if (loading() || fullscreenLoading()) {\n        <cde-chart-skeleton />\n      } @else if (emptyState(); as content) {\n        <cde-empty-state hraFeature=\"empty-state\" [content]=\"content\" (actionClick)=\"emptyStateAction.emit()\" />\n      }\n    </hra-fullscreen-portal-content>\n  </hra-fullscreen-portal>\n</hra-expansion-panel>\n", styles: [":host{display:block;overflow:hidden}:host ::ng-deep hra-expansion-panel{height:100%}:host ::ng-deep hra-expansion-panel .header{padding:.5rem .5rem .5rem 1rem;min-height:3.5rem}:host ::ng-deep hra-expansion-panel .content{height:calc(100% - 3.5rem)}:host ::ng-deep hra-expansion-panel .expansion-body{height:100%}:host ::ng-deep hra-expansion-panel ng-scrollbar{width:100%}:host hra-fullscreen-portal-content{display:flex}:host hra-fullscreen-portal{height:100%}hra-fullscreen-portal-content{position:relative}::ng-deep hra-fullscreen-portal-content{display:flex}::ng-deep hra-fullscreen-portal-content ng-scrollbar{width:100%}::ng-deep hra-fullscreen-portal-content .ng-scroll-content{width:100%!important;max-height:100%;min-height:0rem!important}.enableScroll ::ng-deep .ng-scroll-content{max-height:unset}::ng-deep .violin-container{width:100%;height:100%}::ng-deep .violin-container.vega-embed,::ng-deep .violin-container canvas,::ng-deep .violin-container svg{display:block}::ng-deep .violin-container.hidden{display:none}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: true }] }], colors: [{ type: i0.Input, args: [{ isSignal: true, alias: "colors", required: true }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], emptyState: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyState", required: false }] }], emptyStateAction: [{ type: i0.Output, args: ["emptyStateAction"] }], fullscreenAvailable: [{ type: i0.Input, args: [{ isSignal: true, alias: "fullscreenAvailable", required: false }] }], fullscreenChange: [{ type: i0.Output, args: ["fullscreenChange"] }], violinEl: [{ type: i0.ViewChild, args: [i0.forwardRef(() => FullscreenPortalComponent), { isSignal: true }] }] } });

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
 * Creates an observer that tracks a data loader's loading state in a signal,
 * so the panels that use the data can show skeletons while it loads.
 *
 * @param state Signal to update
 * @returns Observer to pass to the data loader
 */
function loadingObserver(state) {
    return { next: (value) => state.set(value) };
}

/** Announced to screen readers once all data has loaded */
const LOADED_ANNOUNCEMENT = 'Visualization loaded';
/** Time in ms that loading must stay finished before the loaded announcement */
const LOADED_ANNOUNCEMENT_DEBOUNCE = 250;
/** Action of the snackbars shown after a reset */
const UNDO_ACTION = 'Undo';
/** Snackbar message after the colors are reset */
const RESET_COLORS_MESSAGE = 'Colors reset';
/** Snackbar message after everything is reset */
const RESET_EVERYTHING_MESSAGE = 'Visualization reset';
/** Time in ms the snackbars shown after a reset stay open */
const UNDO_SNACKBAR_DURATION = 10000;
/** Announced after the downloads notice shows all panels */
const ALL_PANELS_SHOWN_ANNOUNCEMENT = 'All panels shown';
/** Image downloads of the panels that can be hidden */
const PANEL_IMAGE_DOWNLOADS = {
    'distance-visualization': 'visualization',
    'violin-graph': 'violin-graph',
    histogram: 'histogram',
};
/** Below this width the panels show as tabs. Angular Material's Large breakpoint starts here. */
const TABBED_LAYOUT_BREAKPOINT = 1280;
/** Below this width the toolbar is a bar along the bottom. Angular Material's Small breakpoint starts here. */
const COMPACT_LAYOUT_BREAKPOINT = 600;
/** Name of the tab bar */
const TABS_LABEL = 'Panels';
/** Labels of the tabs */
const TAB_LABELS = {
    'cell-types': 'Cell types',
    'distance-visualization': 'Spatial view',
    'violin-graph': 'Violin graph',
    histogram: 'Histogram',
    metadata: 'Metadata',
};
/** Number of visualizations created so far, which keeps each one's tab ids unique */
let visualizationCount = 0;
/** Waits for the next animation frame */
function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
/**
 * CDE Visualization Root Component
 */
class CdeVisualizationComponent {
    /** Link to the home page */
    homeLink = input('/', ...(ngDevMode ? [{ debugName: "homeLink" }] : /* istanbul ignore next */ []));
    /** Node data */
    nodes = input(...(ngDevMode ? [undefined, { debugName: "nodes" }] : /* istanbul ignore next */ []));
    /** Node key mapping data */
    nodeKeys = input(...(ngDevMode ? [undefined, { debugName: "nodeKeys" }] : /* istanbul ignore next */ []));
    /** Node target selector used when calculating edges */
    nodeTargetSelector = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetSelector" }] : /* istanbul ignore next */ []));
    /**
     * Column/property of the node's 'Cell Type' values
     *
     * @deprecated Use `nodeKeys` to specify the column instead
     */
    nodeTargetKey = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetKey" }] : /* istanbul ignore next */ []));
    /**
     * Node target selector used when calculating edges
     *
     * @deprecated Use `nodeTargetSelector` instead
     */
    nodeTargetValue = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetValue" }] : /* istanbul ignore next */ []));
    /** Edge data if already calculated */
    edges = input(...(ngDevMode ? [undefined, { debugName: "edges" }] : /* istanbul ignore next */ []));
    /** Edge key mapping data */
    edgeKeys = input(...(ngDevMode ? [undefined, { debugName: "edgeKeys" }] : /* istanbul ignore next */ []));
    /** Max distance to consider when calculating edges */
    maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, { ...(ngDevMode ? { debugName: "maxEdgeDistance" } : /* istanbul ignore next */ {}), transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE) });
    /** Color map data */
    colorMap = input(...(ngDevMode ? [undefined, { debugName: "colorMap" }] : /* istanbul ignore next */ []));
    /** Color map key mapping data */
    colorMapKeys = input(...(ngDevMode ? [undefined, { debugName: "colorMapKeys" }] : /* istanbul ignore next */ []));
    /**
     * Column/property of the color map's 'Cell Type' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    colorMapKey = input(...(ngDevMode ? [undefined, { debugName: "colorMapKey" }] : /* istanbul ignore next */ []));
    /**
     * Column/property of the color map's 'Cell Color' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    colorMapValue = input(...(ngDevMode ? [undefined, { debugName: "colorMapValue" }] : /* istanbul ignore next */ []));
    /** Input metadata */
    metadata = input(...(ngDevMode ? [undefined, { debugName: "metadata" }] : /* istanbul ignore next */ []));
    /** Study the data comes from, shown first in the metadata panel */
    study = input(...(ngDevMode ? [undefined, { debugName: "study" }] : /* istanbul ignore next */ []));
    /** Url of the study's page, which the study name links to */
    studyUrl = input(...(ngDevMode ? [undefined, { debugName: "studyUrl" }] : /* istanbul ignore next */ []));
    /** Title of the visualization */
    title = input(...(ngDevMode ? [undefined, { debugName: "title" }] : /* istanbul ignore next */ []));
    /** Organ being visualized */
    organ = input(...(ngDevMode ? [undefined, { debugName: "organ" }] : /* istanbul ignore next */ []));
    /** Technology used in the visualization */
    technology = input(...(ngDevMode ? [undefined, { debugName: "technology" }] : /* istanbul ignore next */ []));
    /** Sex of the subject */
    sex = input(...(ngDevMode ? [undefined, { debugName: "sex" }] : /* istanbul ignore next */ []));
    /** Age of the subject */
    age = input(undefined, { ...(ngDevMode ? { debugName: "age" } : /* istanbul ignore next */ {}), transform: numberAttribute() });
    /** Thickness of the sample */
    thickness = input(undefined, { ...(ngDevMode ? { debugName: "thickness" } : /* istanbul ignore next */ {}), transform: numberAttribute() });
    /** Pixel size in the visualization */
    pixelSize = input(undefined, { ...(ngDevMode ? { debugName: "pixelSize" } : /* istanbul ignore next */ {}), transform: numberAttribute() });
    /** Creation timestamp (ms since 1/1/1970 UTC) */
    creationTimestamp = input(undefined, { ...(ngDevMode ? { debugName: "creationTimestamp" } : /* istanbul ignore next */ {}), transform: numberAttribute() });
    /** Name of data source file */
    sourceFileName = input(...(ngDevMode ? [undefined, { debugName: "sourceFileName" }] : /* istanbul ignore next */ []));
    /** Name of color map file */
    colorMapFileName = input(...(ngDevMode ? [undefined, { debugName: "colorMapFileName" }] : /* istanbul ignore next */ []));
    /** Hides the toolbar's Theme menu, for pages that switch the theme themselves */
    hideThemeMenu = input(false, { ...(ngDevMode ? { debugName: "hideThemeMenu" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Hides the toolbar's Help menu, for pages that link to help themselves */
    hideHelpMenu = input(false, { ...(ngDevMode ? { debugName: "hideHelpMenu" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Panels hidden at first and after Reset everything, as an array or a comma or space separated list of
     * metadata, distance-visualization, violin-graph and histogram. The cell types panel always shows.
     */
    hiddenPanels = input([], { ...(ngDevMode ? { debugName: "hiddenPanels" } : /* istanbul ignore next */ {}), transform: parseHiddenPanels });
    /** Remembers the panels shown and hidden from the toolbar in this browser's local storage */
    rememberPanels = input(false, { ...(ngDevMode ? { debugName: "rememberPanels" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
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
    /** Whether the nodes are loading */
    nodesLoading = signal(false, ...(ngDevMode ? [{ debugName: "nodesLoading" }] : /* istanbul ignore next */ []));
    /** Whether the edges are loading */
    edgesLoading = signal(false, ...(ngDevMode ? [{ debugName: "edgesLoading" }] : /* istanbul ignore next */ []));
    /** Whether the edges are being generated from the nodes */
    edgesGenerating = signal(false, ...(ngDevMode ? [{ debugName: "edgesGenerating" }] : /* istanbul ignore next */ []));
    /** Whether the color map is loading */
    colorMapLoading = signal(false, ...(ngDevMode ? [{ debugName: "colorMapLoading" }] : /* istanbul ignore next */ []));
    /** Whether the metadata is loading */
    metadataLoading = signal(false, ...(ngDevMode ? [{ debugName: "metadataLoading" }] : /* istanbul ignore next */ []));
    /** Whether the cell types are loading. They come from the nodes and the color map. */
    cellTypesLoading = computed(() => this.nodesLoading() || this.colorMapLoading(), ...(ngDevMode ? [{ debugName: "cellTypesLoading" }] : /* istanbul ignore next */ []));
    /** Whether the distances are loading. They need the nodes and the loaded or generated edges. */
    distancesLoading = computed(() => this.nodesLoading() || this.edgesLoading() || this.edgesGenerating(), ...(ngDevMode ? [{ debugName: "distancesLoading" }] : /* istanbul ignore next */ []));
    /** Whether any data is loading */
    anyLoading = computed(() => this.cellTypesLoading() || this.distancesLoading() || this.metadataLoading(), ...(ngDevMode ? [{ debugName: "anyLoading" }] : /* istanbul ignore next */ []));
    /** Sets the node target selector (uses default if not available) */
    nodeTargetSelectorWithDefault = computed(() => {
        return this.nodeTargetSelector() || this.nodeTargetValue() || DEFAULT_NODE_TARGET_SELECTOR;
    }, ...(ngDevMode ? [{ debugName: "nodeTargetSelectorWithDefault" }] : /* istanbul ignore next */ []));
    /** View of the node data */
    nodesView = loadNodes(this.nodes, this.nodeKeys, this.nodeTargetKey, loadingObserver(this.nodesLoading));
    /** View of the edge data */
    edgesView = withDataViewDefaultGenerator(loadEdges(this.edges, this.edgeKeys, loadingObserver(this.edgesLoading)), createEdgeGenerator(this.nodesView, this.edges, this.nodeTargetSelectorWithDefault, this.maxEdgeDistance, loadingObserver(this.edgesGenerating)), EMPTY_EDGES_VIEW, false);
    /** View of the color map */
    colorMapView = withDataViewDefaultGenerator(loadColorMap(this.colorMap, this.colorMapKeys, this.colorMapKey, this.colorMapValue, loadingObserver(this.colorMapLoading)), createColorMapGenerator(this.nodesView, this.colorMap), EMPTY_COLOR_MAP_VIEW);
    /** Combined metadata */
    metadataView = loadMetadata(this.metadata, {
        study: this.study,
        studyUrl: this.studyUrl,
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
    }, loadingObserver(this.metadataLoading));
    /** Filter for node data */
    nodeFilterView = signal(new NodeFilterView(undefined, undefined), ...(ngDevMode ? [{ debugName: "nodeFilterView" }] : /* istanbul ignore next */ []));
    /** List of cell types */
    cellTypes = signal([], ...(ngDevMode ? [{ debugName: "cellTypes" }] : /* istanbul ignore next */ []));
    /** All cells color picked in the histogram, or undefined to use the theme's color */
    allCellsColor = signal(undefined, ...(ngDevMode ? [{ debugName: "allCellsColor" }] : /* istanbul ignore next */ []));
    /** List of selected cell types */
    cellTypesSelection = signal([], { ...(ngDevMode ? { debugName: "cellTypesSelection" } : /* istanbul ignore next */ {}), equal: emptyArrayEquals });
    /** Computed cell types as color map entries */
    cellTypesAsColorMap = computed(() => new ColorMapView(this.cellTypes(), { 'Cell Type': 'name', 'Cell Color': 'color' }), ...(ngDevMode ? [{ debugName: "cellTypesAsColorMap" }] : /* istanbul ignore next */ []));
    /** Function that gets the node type from an edge */
    edgeTypeAccessor = computed(() => {
        const getNodeType = this.nodesView().getCellTypeAt;
        const getNodeIndex = this.edgesView().getCellIDFor;
        return (edge) => getNodeType(getNodeIndex(edge));
    }, ...(ngDevMode ? [{ debugName: "edgeTypeAccessor" }] : /* istanbul ignore next */ []));
    /** Gets current node counts */
    nodeCounts = computed(() => this.nodesView().getCounts(), ...(ngDevMode ? [{ debugName: "nodeCounts" }] : /* istanbul ignore next */ []));
    /** Gets current edge counts */
    edgeCounts = computed(() => this.edgesView().getCounts(this.edgeTypeAccessor()), ...(ngDevMode ? [{ debugName: "edgeCounts" }] : /* istanbul ignore next */ []));
    /** Gets edge counts by source node */
    edgeCountsBySourceNode = computed(() => this.edgesView().getCounts((obj) => `${this.edgesView().getCellIDFor(obj)}`), ...(ngDevMode ? [{ debugName: "edgeCountsBySourceNode" }] : /* istanbul ignore next */ []));
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
    }, ...(ngDevMode ? [{ debugName: "cellTypesFromNodes" }] : /* istanbul ignore next */ []));
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
    }, ...(ngDevMode ? [{ debugName: "countAdjustments" }] : /* istanbul ignore next */ []));
    /** Computed selection of cell types from nodes */
    cellTypesSelectionFromNodes = computed(() => this.cellTypesFromNodes().map((entry) => entry.name), ...(ngDevMode ? [{ debugName: "cellTypesSelectionFromNodes" }] : /* istanbul ignore next */ []));
    /** Effect to create cell types */
    cellTypesCreateRef = effect(() => {
        this.cellTypes.set(this.cellTypesFromNodes());
        this.cellTypesSelection.set(this.cellTypesSelectionFromNodes());
    }, ...(ngDevMode ? [{ debugName: "cellTypesCreateRef" }] : /* istanbul ignore next */ []));
    /** List of filtered cell types based on selection */
    filteredCellTypes = computed(() => {
        const selection = new Set(this.cellTypesSelection());
        selection.delete(this.nodeTargetSelectorWithDefault());
        const filtered = this.cellTypes().filter(({ name }) => selection.has(name));
        return filtered.sort((a, b) => b.count - a.count);
    }, { ...(ngDevMode ? { debugName: "filteredCellTypes" } : /* istanbul ignore next */ {}), equal: emptyArrayEquals });
    /** Whether the cell types have loaded and none of them are selected, so every panel is empty */
    noCellTypesSelected = computed(() => this.cellTypes().length > 0 && this.cellTypesSelection().length === 0, ...(ngDevMode ? [{ debugName: "noCellTypesSelected" }] : /* istanbul ignore next */ []));
    /**
     * Whether there are cell types besides the anchor type but none of them are selected.
     * The charts leave the anchor type out, so they have no distances to show.
     */
    noDistancesSelected = computed(() => {
        const anchor = this.nodeTargetSelectorWithDefault();
        return this.cellTypes().some(({ name }) => name !== anchor) && this.filteredCellTypes().length === 0;
    }, ...(ngDevMode ? [{ debugName: "noDistancesSelected" }] : /* istanbul ignore next */ []));
    /** Empty state for the distance visualization */
    visualizationEmptyState = computed(() => this.noCellTypesSelected() ? NO_CELL_TYPES_SELECTED_CONTENT : undefined, ...(ngDevMode ? [{ debugName: "visualizationEmptyState" }] : /* istanbul ignore next */ []));
    /** Empty state for the violin graph and histogram */
    chartsEmptyState = computed(() => {
        if (this.noCellTypesSelected()) {
            return NO_CELL_TYPES_SELECTED_CONTENT;
        }
        else if (this.noDistancesSelected()) {
            return noDistancesContent(this.nodeTargetSelectorWithDefault());
        }
        return undefined;
    }, ...(ngDevMode ? [{ debugName: "chartsEmptyState" }] : /* istanbul ignore next */ []));
    /**
     * Files that would be empty with the current selection, and images of hidden panels,
     * so the downloads drawer disables them
     */
    unavailableDownloads = computed(() => {
        const { unavailable, groups } = DOWNLOADS_CONTENT;
        if (this.noCellTypesSelected()) {
            const files = groups.flatMap((group) => group.files.map((file) => file.id));
            return { files, notice: unavailable.noCellTypes };
        }
        const files = [];
        const notices = [];
        if (this.noDistancesSelected()) {
            files.push('violin-graph', 'histogram');
            notices.push(unavailable.noDistances(this.nodeTargetSelectorWithDefault()));
        }
        // The tabs have no Panels menu, so their notice doesn't point to it or offer to show the panels
        const tabbed = this.tabbed();
        const hiddenImages = this.layoutHiddenPanels()
            .map((panel) => PANEL_IMAGE_DOWNLOADS[panel])
            .filter((file) => file !== undefined && !files.includes(file));
        if (hiddenImages.length > 0) {
            files.push(...hiddenImages);
            notices.push(tabbed ? unavailable.hiddenPanelsInTabs : unavailable.hiddenPanels);
        }
        const showPanels = hiddenImages.length > 0 && !tabbed;
        return files.length > 0 ? { files, notice: notices.join(' '), showPanels } : undefined;
    }, ...(ngDevMode ? [{ debugName: "unavailableDownloads" }] : /* istanbul ignore next */ []));
    /** Computed distances between nodes */
    distances = computed(() => this.computeDistances(), { ...(ngDevMode ? { debugName: "distances" } : /* istanbul ignore next */ {}), equal: emptyArrayEquals });
    /** Data for the histogram visualization */
    filteredDistances = computed(() => this.computeFilteredDistances(), { ...(ngDevMode ? { debugName: "filteredDistances" } : /* istanbul ignore next */ {}), equal: emptyArrayEquals });
    /** Colors for the histogram visualization */
    filteredColors = computed(() => this.computeFilteredColors(), { ...(ngDevMode ? { debugName: "filteredColors" } : /* istanbul ignore next */ {}), equal: emptyArrayEquals });
    /** Whether the distance visualization hides cell links. Set from the toolbar and the fullscreen menu. */
    edgesDisabled = signal(false, ...(ngDevMode ? [{ debugName: "edgesDisabled" }] : /* istanbul ignore next */ []));
    /** Whether the cell types table shows the cell link columns */
    showCellLinkData = signal(true, ...(ngDevMode ? [{ debugName: "showCellLinkData" }] : /* istanbul ignore next */ []));
    /** Whether the metadata panel shows every field, including empty ones */
    showAllMetadata = signal(false, ...(ngDevMode ? [{ debugName: "showAllMetadata" }] : /* istanbul ignore next */ []));
    /** Distance visualization's view mode */
    viewMode = signal('explore', ...(ngDevMode ? [{ debugName: "viewMode" }] : /* istanbul ignore next */ []));
    /** Panels hidden from the toolbar, starting from the remembered panels or the hiddenPanels input */
    panelsHidden = linkedSignal(() => this.rememberPanels() ? (loadHiddenPanels() ?? this.hiddenPanels()) : this.hiddenPanels(), ...(ngDevMode ? [{ debugName: "panelsHidden" }] : /* istanbul ignore next */ []));
    /** Host element */
    elementRef = inject(ElementRef);
    /** Width of the visualization, which picks between the panel and tabbed layouts */
    width = monitorWidth(() => this.elementRef);
    /** Whether the panels show as tabs. A visualization that isn't laid out yet (0 wide) keeps the panel layout. */
    tabbed = computed(() => this.width() > 0 && this.width() < TABBED_LAYOUT_BREAKPOINT, ...(ngDevMode ? [{ debugName: "tabbed" }] : /* istanbul ignore next */ []));
    /** Whether the visualization is phone-sized: the toolbar runs along the bottom and the controls get compact */
    compact = computed(() => this.width() > 0 && this.width() < COMPACT_LAYOUT_BREAKPOINT, ...(ngDevMode ? [{ debugName: "compact" }] : /* istanbul ignore next */ []));
    /**
     * Panels hidden in the current layout. The tabs have no Panels menu, so they follow only the hiddenPanels input,
     * and panels hidden from the toolbar apply to the panel layout.
     */
    layoutHiddenPanels = computed(() => (this.tabbed() ? this.hiddenPanels() : this.panelsHidden()), ...(ngDevMode ? [{ debugName: "layoutHiddenPanels" }] : /* istanbul ignore next */ []));
    /** Tabs that show: the cell types tab and the tabs of the panels that the hiddenPanels input doesn't hide */
    tabs = computed(() => {
        const hidden = this.hiddenPanels();
        return TAB_IDS.filter((tab) => tab === 'cell-types' || !hidden.includes(tab));
    }, ...(ngDevMode ? [{ debugName: "tabs" }] : /* istanbul ignore next */ []));
    /** Tab picked in the tab bar */
    selectedTab = signal(undefined, ...(ngDevMode ? [{ debugName: "selectedTab" }] : /* istanbul ignore next */ []));
    /** Tab that shows: the picked tab while it's available, otherwise the distance visualization or the cell types */
    activeTab = computed(() => {
        const tabs = this.tabs();
        const selected = this.selectedTab();
        if (selected !== undefined && tabs.includes(selected)) {
            return selected;
        }
        return tabs.includes('distance-visualization') ? 'distance-visualization' : 'cell-types';
    }, ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    /** Panel open in full screen. It becomes the active tab if the panels switch to tabs. */
    fullscreenPanel = signal(undefined, ...(ngDevMode ? [{ debugName: "fullscreenPanel" }] : /* istanbul ignore next */ []));
    /** Name of the tab bar */
    tabsLabel = TABS_LABEL;
    /** Labels of the tabs */
    tabLabels = TAB_LABELS;
    /** Prefix of this visualization's tab ids */
    tabIdPrefix = `cde-visualization-tab-${visualizationCount++}-`;
    /**
     * Which panels show, and whether the top row and the visualizations column still have a panel showing.
     * In the tabbed layout, only the active tab's panels show.
     */
    layout = computed(() => {
        const hidden = this.layoutHiddenPanels();
        const tab = this.tabbed() ? this.activeTab() : undefined;
        const shows = (panel) => !hidden.includes(panel) && (tab === undefined || tab === panel);
        const cellTypes = tab === undefined || tab === 'cell-types';
        const metadata = shows('metadata');
        const distanceVisualization = shows('distance-visualization');
        const violinGraph = shows('violin-graph');
        const histogram = shows('histogram');
        const topRow = distanceVisualization || violinGraph;
        return {
            sidebar: cellTypes || metadata,
            cellTypes,
            metadata,
            distanceVisualization,
            violinGraph,
            histogram,
            topRow,
            visualizations: topRow || histogram,
        };
    }, ...(ngDevMode ? [{ debugName: "layout" }] : /* istanbul ignore next */ []));
    /** Whether the metadata has fields that only show with all metadata */
    hasHiddenMetadata = computed(() => hasHiddenFields(this.metadataView()), ...(ngDevMode ? [{ debugName: "hasHiddenMetadata" }] : /* istanbul ignore next */ []));
    /** Whether any cells were deleted from the distance visualization */
    hasDeletedCells = computed(() => (this.nodeFilterView().exclude?.length ?? 0) > 0, ...(ngDevMode ? [{ debugName: "hasDeletedCells" }] : /* istanbul ignore next */ []));
    /** Sheet that's open in the drawer, if any. The toolbar's Downloads and Info items open it */
    openSheet = signal(undefined, ...(ngDevMode ? [{ debugName: "openSheet" }] : /* istanbul ignore next */ []));
    /** Sheet shown in the drawer. Keeps the last open sheet while the drawer closes, so it doesn't vanish mid-animation */
    sheet = linkedSignal({ ...(ngDevMode ? { debugName: "sheet" } : /* istanbul ignore next */ {}), source: this.openSheet,
        computation: (openSheet, previous) => openSheet ?? previous?.value ?? 'downloads' });
    /** Injected file saver service */
    fileSaver = inject(FileSaverService);
    /** Announces the charts' empty state to screen readers */
    liveAnnouncer = inject(LiveAnnouncer);
    /** Switches the visualization between the page's theme and the light and dark themes */
    themeSwitch = inject(ThemeSwitchService);
    /** Downloads sheet, while it's the drawer's sheet */
    downloadsSheet = viewChild(DownloadsComponent, ...(ngDevMode ? [{ debugName: "downloadsSheet" }] : /* istanbul ignore next */ []));
    /** About sheet, while it's the drawer's sheet */
    aboutSheet = viewChild(AboutComponent, ...(ngDevMode ? [{ debugName: "aboutSheet" }] : /* istanbul ignore next */ []));
    /** Id of the sheet's title, which labels the drawer */
    sheetLabelledBy = computed(() => this.sheet() === 'downloads' ? this.downloadsSheet()?.titleId : this.aboutSheet()?.titleId, ...(ngDevMode ? [{ debugName: "sheetLabelledBy" }] : /* istanbul ignore next */ []));
    /** Ids of the elements that describe the drawer */
    sheetDescribedBy = computed(() => this.sheet() === 'downloads' ? this.downloadsSheet()?.describedBy() : this.aboutSheet()?.descriptionId, ...(ngDevMode ? [{ debugName: "sheetDescribedBy" }] : /* istanbul ignore next */ []));
    /** Distance visualization panel */
    nodeDistVisualizationComponent = viewChild.required(NodeDistVisualizationComponent);
    /** Violin graph panel */
    violinComponent = viewChild.required(ViolinComponent);
    /** Histogram panel */
    histogramComponent = viewChild.required(HistogramComponent);
    /** Shows the snackbars that undo a reset */
    snackbar = inject(SnackbarService);
    /** Application, used to wait for a tab to render before downloading its image */
    appRef = inject(ApplicationRef);
    /** Setup component */
    constructor() {
        effect(() => {
            const selection = this.cellTypesSelection();
            const filter = untracked(this.nodeFilterView);
            this.nodeFilterView.set(new NodeFilterView(selection, filter.exclude));
        });
        // Announced once here, not by each panel's empty state
        effect(() => {
            const emptyState = this.chartsEmptyState();
            if (emptyState) {
                this.liveAnnouncer.announce(`${emptyState.heading}. ${emptyState.description}`);
            }
        });
        // Announced once everything has loaded. The debounce skips the short gap between loading the nodes
        // and generating the edges.
        toObservable(this.anyLoading)
            .pipe(debounceTime(LOADED_ANNOUNCEMENT_DEBOUNCE), distinctUntilChanged(), pairwise(), takeUntilDestroyed())
            .subscribe(([wasLoading, isLoading]) => {
            if (wasLoading && !isLoading) {
                this.liveAnnouncer.announce(LOADED_ANNOUNCEMENT);
            }
        });
        // The charts only resize with the window, so they resize again after panels show or hide
        afterRenderEffect(() => {
            const { violinGraph, histogram } = this.layout();
            untracked(() => {
                if (violinGraph) {
                    this.violinComponent().resizeAndSyncView();
                }
                if (histogram) {
                    this.histogramComponent().resizeAndSyncView();
                }
            });
        });
        // When the panels switch to tabs, an open fullscreen view closes (see the panels' fullscreenAvailable input)
        // and its panel becomes the active tab
        effect(() => {
            if (this.tabbed()) {
                const panel = untracked(this.fullscreenPanel);
                if (panel !== undefined) {
                    this.selectedTab.set(panel);
                }
            }
        });
        // Connect outputs
        this.bindDataOutput(this.nodesView, this.nodesChange);
        this.bindDataOutput(this.edgesView, this.edgesChange);
        this.bindDataOutput(this.colorMapView, this.colorMapChange);
    }
    /** Selects every cell type, like the cell types table's select all checkbox */
    selectAllCellTypes() {
        this.cellTypesSelection.set(this.cellTypes().map((entry) => entry.name));
    }
    /** Update the color of a specific cell type entry */
    updateColor(entry, color) {
        const entries = this.cellTypes();
        const index = entries.indexOf(entry);
        const copy = [...entries];
        copy[index] = { ...copy[index], color };
        this.cellTypes.set(copy);
    }
    /** Resets the distance visualization's view */
    resetView() {
        this.nodeDistVisualizationComponent().resetView();
    }
    /** Restores the cells deleted from the distance visualization */
    restoreDeletedCells() {
        this.nodeFilterView.set(this.nodeFilterView().clear(false, true));
    }
    /**
     * Resets every cell type's color and the all cells color. The cell type selection stays.
     * A snackbar offers to undo the reset, as long as the data hasn't changed since.
     */
    resetColors() {
        const cellTypes = this.cellTypes();
        const allCellsColor = this.allCellsColor();
        this.useDefaultColors();
        this.openUndoSnackbar(RESET_COLORS_MESSAGE, () => {
            this.cellTypes.set(cellTypes);
            this.allCellsColor.set(allCellsColor);
        });
    }
    /** Shows and hides panels, and remembers them if rememberPanels is set */
    setHiddenPanels(panels) {
        this.panelsHidden.set(panels);
        if (this.rememberPanels()) {
            saveHiddenPanels(panels);
        }
    }
    /** Shows every panel from the downloads notice, and announces it since the notice's button goes away */
    showAllPanels() {
        this.setHiddenPanels([]);
        this.liveAnnouncer.announce(ALL_PANELS_SHOWN_ANNOUNCEMENT);
    }
    /**
     * Resets the view, panels, deleted cells and colors, selects every cell type, restores the default display
     * options, and switches the distance visualization back to explore. Panels go back to the hiddenPanels input.
     * A snackbar offers to undo everything but the view, as long as the data hasn't changed since.
     */
    resetEverything() {
        const panelsHidden = this.panelsHidden();
        const cellTypes = this.cellTypes();
        const allCellsColor = this.allCellsColor();
        const cellTypesSelection = this.cellTypesSelection();
        const nodeFilterView = this.nodeFilterView();
        const edgesDisabled = this.edgesDisabled();
        const showCellLinkData = this.showCellLinkData();
        const showAllMetadata = this.showAllMetadata();
        const viewMode = this.viewMode();
        this.resetView();
        this.setHiddenPanels(this.hiddenPanels());
        this.restoreDeletedCells();
        this.useDefaultColors();
        this.selectAllCellTypes();
        this.edgesDisabled.set(false);
        this.showCellLinkData.set(true);
        this.showAllMetadata.set(false);
        this.viewMode.set('explore');
        this.openUndoSnackbar(RESET_EVERYTHING_MESSAGE, () => {
            this.setHiddenPanels(panelsHidden);
            this.cellTypes.set(cellTypes);
            this.allCellsColor.set(allCellsColor);
            this.cellTypesSelection.set(cellTypesSelection);
            this.nodeFilterView.set(nodeFilterView);
            this.edgesDisabled.set(edgesDisabled);
            this.showCellLinkData.set(showCellLinkData);
            this.showAllMetadata.set(showAllMetadata);
            this.viewMode.set(viewMode);
        });
    }
    /** Gives every cell type its default color and the all cells color back to the theme */
    useDefaultColors() {
        this.cellTypes.set(this.cellTypesFromNodes());
        this.allCellsColor.set(undefined);
    }
    /** Opens a snackbar whose Undo action calls `undo`, unless the data has changed since */
    openUndoSnackbar(message, undo) {
        const cellTypesFromNodes = this.cellTypesFromNodes();
        this.snackbar
            .open(message, UNDO_ACTION, false, 'end', { duration: UNDO_SNACKBAR_DURATION })
            .onAction()
            .subscribe(() => {
            if (this.cellTypesFromNodes() === cellTypesFromNodes) {
                undo();
            }
        });
    }
    /** Downloads the requested file */
    async handleDownload({ file, format }) {
        if (this.unavailableDownloads()?.files.includes(file)) {
            return;
        }
        switch (file) {
            case 'cells':
                return this.downloadNodes();
            case 'cell-links':
                return this.downloadEdges();
            case 'color-map':
                return this.downloadColorMap();
            case 'visualization':
                await this.showTab('distance-visualization');
                return this.nodeDistVisualizationComponent().download();
            case 'violin-graph':
                await this.showTab('violin-graph');
                return this.violinComponent().download(format);
            case 'histogram':
                await this.showTab('histogram');
                return this.histogramComponent().download(format);
        }
    }
    /**
     * Id of a tab in the tab bar, which also labels the tab panel
     *
     * @param tab Tab to get the id of
     * @returns The tab's id
     */
    tabLinkId(tab) {
        return this.tabIdPrefix + tab;
    }
    /**
     * Shows a panel's tab before its image downloads. Panels in other tabs aren't laid out, so they have no size
     * to draw at.
     *
     * @param tab Tab of the panel
     */
    async showTab(tab) {
        if (!this.tabbed() || this.activeTab() === tab) {
            return;
        }
        this.selectedTab.set(tab);
        // Waits for the render and the violin's resize, then for deck.gl to size its canvas on an animation frame
        await this.appRef.whenStable();
        await nextFrame();
        await nextFrame();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: CdeVisualizationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.25", type: CdeVisualizationComponent, isStandalone: true, selector: "cde-visualization-root", inputs: { homeLink: { classPropertyName: "homeLink", publicName: "homeLink", isSignal: true, isRequired: false, transformFunction: null }, nodes: { classPropertyName: "nodes", publicName: "nodes", isSignal: true, isRequired: false, transformFunction: null }, nodeKeys: { classPropertyName: "nodeKeys", publicName: "nodeKeys", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetSelector: { classPropertyName: "nodeTargetSelector", publicName: "nodeTargetSelector", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetKey: { classPropertyName: "nodeTargetKey", publicName: "nodeTargetKey", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetValue: { classPropertyName: "nodeTargetValue", publicName: "nodeTargetValue", isSignal: true, isRequired: false, transformFunction: null }, edges: { classPropertyName: "edges", publicName: "edges", isSignal: true, isRequired: false, transformFunction: null }, edgeKeys: { classPropertyName: "edgeKeys", publicName: "edgeKeys", isSignal: true, isRequired: false, transformFunction: null }, maxEdgeDistance: { classPropertyName: "maxEdgeDistance", publicName: "maxEdgeDistance", isSignal: true, isRequired: false, transformFunction: null }, colorMap: { classPropertyName: "colorMap", publicName: "colorMap", isSignal: true, isRequired: false, transformFunction: null }, colorMapKeys: { classPropertyName: "colorMapKeys", publicName: "colorMapKeys", isSignal: true, isRequired: false, transformFunction: null }, colorMapKey: { classPropertyName: "colorMapKey", publicName: "colorMapKey", isSignal: true, isRequired: false, transformFunction: null }, colorMapValue: { classPropertyName: "colorMapValue", publicName: "colorMapValue", isSignal: true, isRequired: false, transformFunction: null }, metadata: { classPropertyName: "metadata", publicName: "metadata", isSignal: true, isRequired: false, transformFunction: null }, study: { classPropertyName: "study", publicName: "study", isSignal: true, isRequired: false, transformFunction: null }, studyUrl: { classPropertyName: "studyUrl", publicName: "studyUrl", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, organ: { classPropertyName: "organ", publicName: "organ", isSignal: true, isRequired: false, transformFunction: null }, technology: { classPropertyName: "technology", publicName: "technology", isSignal: true, isRequired: false, transformFunction: null }, sex: { classPropertyName: "sex", publicName: "sex", isSignal: true, isRequired: false, transformFunction: null }, age: { classPropertyName: "age", publicName: "age", isSignal: true, isRequired: false, transformFunction: null }, thickness: { classPropertyName: "thickness", publicName: "thickness", isSignal: true, isRequired: false, transformFunction: null }, pixelSize: { classPropertyName: "pixelSize", publicName: "pixelSize", isSignal: true, isRequired: false, transformFunction: null }, creationTimestamp: { classPropertyName: "creationTimestamp", publicName: "creationTimestamp", isSignal: true, isRequired: false, transformFunction: null }, sourceFileName: { classPropertyName: "sourceFileName", publicName: "sourceFileName", isSignal: true, isRequired: false, transformFunction: null }, colorMapFileName: { classPropertyName: "colorMapFileName", publicName: "colorMapFileName", isSignal: true, isRequired: false, transformFunction: null }, hideThemeMenu: { classPropertyName: "hideThemeMenu", publicName: "hideThemeMenu", isSignal: true, isRequired: false, transformFunction: null }, hideHelpMenu: { classPropertyName: "hideHelpMenu", publicName: "hideHelpMenu", isSignal: true, isRequired: false, transformFunction: null }, hiddenPanels: { classPropertyName: "hiddenPanels", publicName: "hiddenPanels", isSignal: true, isRequired: false, transformFunction: null }, rememberPanels: { classPropertyName: "rememberPanels", publicName: "rememberPanels", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { nodeClick: "nodeClick", nodeHover: "nodeHover", nodesChange: "nodes", edgesChange: "edges", colorMapChange: "colorMap" }, host: { classAttribute: "hra-app" }, providers: [ThemeSwitchService, { provide: MAT_TABS_CONFIG, useValue: {} }], viewQueries: [{ propertyName: "downloadsSheet", first: true, predicate: DownloadsComponent, descendants: true, isSignal: true }, { propertyName: "aboutSheet", first: true, predicate: AboutComponent, descendants: true, isSignal: true }, { propertyName: "nodeDistVisualizationComponent", first: true, predicate: NodeDistVisualizationComponent, descendants: true, isSignal: true }, { propertyName: "violinComponent", first: true, predicate: ViolinComponent, descendants: true, isSignal: true }, { propertyName: "histogramComponent", first: true, predicate: HistogramComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<ng-container hraFeature=\"cde-visualization\">\n  <mat-drawer-container class=\"drawer-container\">\n    <mat-drawer\n      position=\"end\"\n      mode=\"over\"\n      role=\"region\"\n      [hraFeature]=\"sheet() === 'downloads' ? 'downloads-drawer' : 'about-drawer'\"\n      [attr.aria-labelledby]=\"sheetLabelledBy()\"\n      [attr.aria-describedby]=\"sheetDescribedBy()\"\n      [opened]=\"openSheet() !== undefined\"\n      (closedStart)=\"openSheet.set(undefined)\"\n    >\n      @if (sheet() === 'downloads') {\n        <cde-downloads\n          [unavailable]=\"unavailableDownloads()\"\n          (closeClick)=\"openSheet.set(undefined)\"\n          (download)=\"handleDownload($event)\"\n          (showAllPanelsClick)=\"showAllPanels()\"\n        />\n      } @else {\n        <cde-about (closeClick)=\"openSheet.set(undefined)\" />\n      }\n    </mat-drawer>\n\n    <mat-drawer-content\n      class=\"layout\"\n      [class.tabbed]=\"tabbed()\"\n      [class.compact]=\"compact()\"\n      [class.visualizations-hidden]=\"!layout().visualizations\"\n    >\n      <cde-toolbar\n        class=\"toolbar\"\n        hraFeature=\"toolbar\"\n        [hiddenPanels]=\"panelsHidden()\"\n        [cellLinks]=\"!edgesDisabled()\"\n        [hasHiddenMetadata]=\"hasHiddenMetadata()\"\n        [hasDeletedCells]=\"hasDeletedCells()\"\n        [showThemeMenu]=\"!hideThemeMenu()\"\n        [showHelpMenu]=\"!hideHelpMenu()\"\n        [showPanelsMenu]=\"!tabbed()\"\n        [compact]=\"compact()\"\n        [themePreference]=\"themeSwitch.preference()\"\n        [(openSheet)]=\"openSheet\"\n        [(cellLinkData)]=\"showCellLinkData\"\n        [(allMetadata)]=\"showAllMetadata\"\n        (hiddenPanelsChange)=\"setHiddenPanels($event)\"\n        (cellLinksChange)=\"edgesDisabled.set(!$event)\"\n        (resetViewClick)=\"resetView()\"\n        (restoreDeletedCellsClick)=\"restoreDeletedCells()\"\n        (resetColorsClick)=\"resetColors()\"\n        (resetEverythingClick)=\"resetEverything()\"\n        (themePreferenceChange)=\"themeSwitch.setPreference($event)\"\n      />\n\n      @if (tabbed()) {\n        <nav mat-tab-nav-bar class=\"tabs\" hraFeature=\"tabs\" [tabPanel]=\"tabPanel\" [attr.aria-label]=\"tabsLabel\">\n          @for (tab of tabs(); track tab) {\n            <button\n              mat-tab-link\n              hraClickEvent\n              [id]=\"tabLinkId(tab)\"\n              [active]=\"activeTab() === tab\"\n              [hraFeature]=\"`${tab}-tab`\"\n              (click)=\"selectedTab.set(tab)\"\n            >\n              {{ tabLabels[tab] }}\n            </button>\n          }\n        </nav>\n      }\n\n      <!-- One tab panel holds every panel, so switching layouts or tabs never moves or re-creates them -->\n      <mat-tab-nav-panel\n        class=\"panels\"\n        [attr.role]=\"tabbed() ? 'tabpanel' : null\"\n        [attr.aria-labelledby]=\"tabbed() ? tabLinkId(activeTab()) : null\"\n        #tabPanel\n      >\n        <!-- Hidden panels stay rendered, so they keep their views and state -->\n        <div class=\"metadata\" [class.panel-hidden]=\"!layout().sidebar\" [class.fill]=\"!layout().visualizations\">\n          <cde-metadata\n            hraFeature=\"metadata\"\n            [class.panel-hidden]=\"!layout().metadata\"\n            [metadata]=\"metadataView()\"\n            [loading]=\"metadataLoading()\"\n            [showEmptyFields]=\"showAllMetadata()\"\n          />\n          <cde-cell-types\n            hraFeature=\"cell-types\"\n            [class.panel-hidden]=\"!layout().cellTypes\"\n            [selectedCellType]=\"nodeTargetSelectorWithDefault()\"\n            [countAdjustments]=\"countAdjustments()\"\n            [loading]=\"cellTypesLoading()\"\n            [hideCellLinkData]=\"!showCellLinkData()\"\n            [(cellTypes)]=\"cellTypes\"\n            [(cellTypesSelection)]=\"cellTypesSelection\"\n          />\n        </div>\n\n        <div class=\"visualizations\" [class.panel-hidden]=\"!layout().visualizations\">\n          <div class=\"top\" [class.panel-hidden]=\"!layout().topRow\" [class.fill]=\"!layout().histogram\">\n            <cde-node-dist-visualization\n              hraFeature=\"visualization\"\n              [class.panel-hidden]=\"!layout().distanceVisualization\"\n              [nodes]=\"nodesView()\"\n              [edges]=\"edgesView()\"\n              [maxEdgeDistance]=\"maxEdgeDistance()\"\n              [colorMap]=\"cellTypesAsColorMap()\"\n              [loading]=\"nodesLoading()\"\n              [emptyState]=\"visualizationEmptyState()\"\n              [fullscreenAvailable]=\"!tabbed()\"\n              [floatingControls]=\"tabbed()\"\n              [dockCellInfo]=\"compact()\"\n              [(nodeFilter)]=\"nodeFilterView\"\n              [(edgesDisabled)]=\"edgesDisabled\"\n              [(viewMode)]=\"viewMode\"\n              (fullscreenChange)=\"fullscreenPanel.set($event ? 'distance-visualization' : undefined)\"\n              (nodeClick)=\"nodeClick.emit($event)\"\n              (nodeHover)=\"nodeHover.emit($event)\"\n              (emptyStateAction)=\"selectAllCellTypes()\"\n            />\n\n            <cde-violin\n              hraFeature=\"violin-graph\"\n              [class.panel-hidden]=\"!layout().violinGraph\"\n              [class.fill]=\"!layout().distanceVisualization\"\n              [colors]=\"filteredColors()\"\n              [data]=\"filteredDistances()\"\n              [loading]=\"distancesLoading()\"\n              [emptyState]=\"chartsEmptyState()\"\n              [fullscreenAvailable]=\"!tabbed()\"\n              (fullscreenChange)=\"fullscreenPanel.set($event ? 'violin-graph' : undefined)\"\n              (emptyStateAction)=\"selectAllCellTypes()\"\n            />\n          </div>\n\n          <cde-histogram\n            hraFeature=\"histogram\"\n            [class.panel-hidden]=\"!layout().histogram\"\n            [class.fill]=\"!layout().topRow\"\n            [colors]=\"filteredColors()\"\n            [data]=\"filteredDistances()\"\n            [filteredCellTypes]=\"filteredCellTypes()\"\n            [loading]=\"distancesLoading()\"\n            [emptyState]=\"chartsEmptyState()\"\n            [fullscreenAvailable]=\"!tabbed()\"\n            [(allCellsColor)]=\"allCellsColor\"\n            (fullscreenChange)=\"fullscreenPanel.set($event ? 'histogram' : undefined)\"\n            (updateColor)=\"updateColor($event.entry, $event.color)\"\n            (emptyStateAction)=\"selectAllCellTypes()\"\n          />\n        </div>\n      </mat-tab-nav-panel>\n    </mat-drawer-content>\n  </mat-drawer-container>\n</ng-container>\n", styles: [":host{display:block;width:100%;height:100%;position:relative;--hra-scroll-overflow-fade-color: var(--mat-sys-background);--ang-text-link-color: var(--mat-sys-on-surface)}:host ::ng-deep a.hra-text-hyperlink{font-weight:600}:host{--mat-sidenav-content-text-color: var(--mat-sys-on-surface);--mat-sidenav-content-background-color: var(--mat-sys-background);--mat-sidenav-container-text-color: var(--mat-sys-on-surface);--mat-sidenav-container-background-color: light-dark(var(--mat-sys-surface-container-low), var(--mat-sys-surface-container));--mat-sidenav-container-elevation-shadow: var(--mat-sys-level1);--mat-sidenav-container-shape: var(--mat-sys-corner-large);--mat-sidenav-container-width: 28rem;--mat-sidenav-scrim-color: rgb(from var(--mat-sys-scrim) r g b/.24)}:host .drawer-container{height:100%}:host mat-drawer{max-width:100%;border-left:2px solid var(--mat-sys-outline);--hra-scroll-overflow-fade-color: light-dark(var(--mat-sys-surface-container-low), var(--mat-sys-surface-container))}:host .layout{display:grid;position:relative;grid-template-columns:calc(6rem + 1px) clamp(21rem,26%,26rem) minmax(0,1fr);grid-template-rows:3.5rem minmax(548px,calc(100% - 3.5rem));grid-template-areas:\"toolbar metadata visualization\" \"toolbar metadata visualization\"}:host .layout.visualizations-hidden{grid-template-columns:calc(6rem + 1px) 1fr 0}:host .layout.tabbed{grid-template-columns:calc(6rem + 1px) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:\"toolbar tabs\" \"toolbar panels\"}:host .layout.compact{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr) auto;grid-template-areas:\"tabs\" \"panels\" \"toolbar\"}:host .layout.compact .toolbar{height:auto;border-right:none;border-top:1px solid var(--mat-sys-outline)}:host .tabs{grid-area:tabs}:host .panels{display:contents}:host .layout.tabbed .panels{grid-area:panels;display:flex;min-width:0;min-height:0}:host .layout.tabbed .panels .metadata,:host .layout.tabbed .panels .visualizations{flex-grow:1;min-width:0}:host .layout.tabbed .panels cde-metadata{height:auto;min-height:0;overflow-y:auto;border-bottom:none}:host .layout.tabbed ::ng-deep hra-expansion-panel .title{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host .layout.tabbed ::ng-deep :is(cde-cell-types,cde-metadata,cde-violin) hra-expansion-panel .header{min-height:0;padding:0}:host .layout.tabbed ::ng-deep :is(cde-cell-types,cde-metadata,cde-violin) hra-expansion-panel .content{height:100%}:host .layout.tabbed ::ng-deep :is(cde-cell-types,cde-violin) hra-expansion-panel .content{padding-top:1rem}:host .layout.tabbed ::ng-deep cde-metadata .metadata-details{margin-top:1rem}:host .layout.tabbed ::ng-deep cde-histogram hra-expansion-panel .header{padding:1rem 1rem .5rem}:host .toolbar{grid-area:toolbar;border-right:1px solid var(--mat-sys-outline);--hra-navigation-rail-container-color: var(--mat-sys-surface-container)}:host .metadata{display:flex;flex-direction:column;grid-area:metadata;border-right:1px solid var(--mat-sys-outline)}:host .metadata.fill{border-right:none}:host .metadata cde-metadata{width:100%;height:fit-content;border-bottom:1px solid var(--mat-sys-outline)}:host .visualizations{grid-area:visualization;display:flex;flex-direction:column;overflow:hidden}:host .visualizations .top{display:flex;height:0;flex-grow:1;border-bottom:1px solid var(--mat-sys-outline)}:host .visualizations .top.fill{border-bottom:none}:host .visualizations cde-node-dist-visualization{height:100%;flex:1 1 32.75rem;min-width:0;overflow:hidden}:host .visualizations cde-violin{height:100%;flex:0 2 31.5rem;min-width:0;border-left:1px solid var(--mat-sys-outline)}:host .visualizations cde-violin.fill{flex-grow:1;border-left:none}:host .panel-hidden{display:none!important}::ng-deep html.cde-visualization-theme-switch::view-transition-old(root),::ng-deep html.cde-visualization-theme-switch::view-transition-new(root){animation-duration:.15s}@media(prefers-reduced-motion:reduce){::ng-deep html.cde-visualization-theme-switch::view-transition-old(root),::ng-deep html.cde-visualization-theme-switch::view-transition-new(root){animation:none}}::ng-deep .hra-app hra-expansion-panel .title{font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking);white-space:nowrap}::ng-deep .hra-app hra-expansion-panel .expansion-body{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}::ng-deep .hra-app .fullscreen-panel:not(.node-dist-vis-fullscreen-panel){--mat-dialog-container-color: var(--mat-sys-background);--hra-scroll-overflow-fade-color: var(--mat-sys-background)}::ng-deep .hra-app .fullscreen-panel .header{padding:.5rem .5rem .5rem 1rem}::ng-deep .hra-app .fullscreen-panel .content{height:calc(100vh - 4.5rem)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatSidenavModule }, { kind: "component", type: i2$4.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i2$4.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i2$4.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "ngmodule", type: MatTabsModule }, { kind: "component", type: i3$4.MatTabNav, selector: "[mat-tab-nav-bar]", inputs: ["fitInkBarToContent", "mat-stretch-tabs", "animationDuration", "backgroundColor", "disableRipple", "color", "tabPanel"], exportAs: ["matTabNavBar", "matTabNav"] }, { kind: "component", type: i3$4.MatTabNavPanel, selector: "mat-tab-nav-panel", inputs: ["id"], exportAs: ["matTabNavPanel"] }, { kind: "component", type: i3$4.MatTabLink, selector: "[mat-tab-link], [matTabLink]", inputs: ["active", "disabled", "disableRipple", "tabIndex", "id"], exportAs: ["matTabLink"] }, { kind: "component", type: AboutComponent, selector: "cde-about", outputs: ["closeClick"] }, { kind: "component", type: CellTypesComponent, selector: "cde-cell-types", inputs: ["cellTypes", "cellTypesSelection", "selectedCellType", "countAdjustments", "loading", "hideCellLinkData"], outputs: ["cellTypesChange", "cellTypesSelectionChange"] }, { kind: "component", type: DownloadsComponent, selector: "cde-downloads", inputs: ["unavailable"], outputs: ["closeClick", "download", "showAllPanelsClick"] }, { kind: "component", type: HistogramComponent, selector: "cde-histogram", inputs: ["data", "colors", "filteredCellTypes", "loading", "emptyState", "fullscreenAvailable", "allCellsColor"], outputs: ["emptyStateAction", "fullscreenChange", "allCellsColorChange", "updateColor"] }, { kind: "component", type: MetadataComponent, selector: "cde-metadata", inputs: ["metadata", "loading", "showEmptyFields"] }, { kind: "component", type: NodeDistVisualizationComponent, selector: "cde-node-dist-visualization", inputs: ["nodes", "edges", "colorMap", "nodeFilter", "maxEdgeDistance", "loading", "emptyState", "fullscreenAvailable", "floatingControls", "dockCellInfo", "edgesDisabled", "viewMode"], outputs: ["nodeFilterChange", "emptyStateAction", "fullscreenChange", "nodeClick", "nodeHover", "edgesDisabledChange", "viewModeChange"] }, { kind: "component", type: ToolbarComponent, selector: "cde-toolbar", inputs: ["hiddenPanels", "cellLinks", "cellLinkData", "allMetadata", "hasHiddenMetadata", "hasDeletedCells", "openSheet", "showThemeMenu", "showHelpMenu", "showPanelsMenu", "compact", "themePreference"], outputs: ["hiddenPanelsChange", "cellLinksChange", "cellLinkDataChange", "allMetadataChange", "openSheetChange", "themePreferenceChange", "resetViewClick", "restoreDeletedCellsClick", "resetColorsClick", "resetEverythingClick"] }, { kind: "component", type: ViolinComponent, selector: "cde-violin", inputs: ["data", "colors", "loading", "emptyState", "fullscreenAvailable"], outputs: ["emptyStateAction", "fullscreenChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: CdeVisualizationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cde-visualization-root', imports: [
                        HraCommonModule,
                        MatSidenavModule,
                        MatTabsModule,
                        AboutComponent,
                        CellTypesComponent,
                        DownloadsComponent,
                        HistogramComponent,
                        MetadataComponent,
                        NodeDistVisualizationComponent,
                        ToolbarComponent,
                        ViolinComponent,
                    ], providers: [ThemeSwitchService, { provide: MAT_TABS_CONFIG, useValue: {} }], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'hra-app',
                    }, template: "<ng-container hraFeature=\"cde-visualization\">\n  <mat-drawer-container class=\"drawer-container\">\n    <mat-drawer\n      position=\"end\"\n      mode=\"over\"\n      role=\"region\"\n      [hraFeature]=\"sheet() === 'downloads' ? 'downloads-drawer' : 'about-drawer'\"\n      [attr.aria-labelledby]=\"sheetLabelledBy()\"\n      [attr.aria-describedby]=\"sheetDescribedBy()\"\n      [opened]=\"openSheet() !== undefined\"\n      (closedStart)=\"openSheet.set(undefined)\"\n    >\n      @if (sheet() === 'downloads') {\n        <cde-downloads\n          [unavailable]=\"unavailableDownloads()\"\n          (closeClick)=\"openSheet.set(undefined)\"\n          (download)=\"handleDownload($event)\"\n          (showAllPanelsClick)=\"showAllPanels()\"\n        />\n      } @else {\n        <cde-about (closeClick)=\"openSheet.set(undefined)\" />\n      }\n    </mat-drawer>\n\n    <mat-drawer-content\n      class=\"layout\"\n      [class.tabbed]=\"tabbed()\"\n      [class.compact]=\"compact()\"\n      [class.visualizations-hidden]=\"!layout().visualizations\"\n    >\n      <cde-toolbar\n        class=\"toolbar\"\n        hraFeature=\"toolbar\"\n        [hiddenPanels]=\"panelsHidden()\"\n        [cellLinks]=\"!edgesDisabled()\"\n        [hasHiddenMetadata]=\"hasHiddenMetadata()\"\n        [hasDeletedCells]=\"hasDeletedCells()\"\n        [showThemeMenu]=\"!hideThemeMenu()\"\n        [showHelpMenu]=\"!hideHelpMenu()\"\n        [showPanelsMenu]=\"!tabbed()\"\n        [compact]=\"compact()\"\n        [themePreference]=\"themeSwitch.preference()\"\n        [(openSheet)]=\"openSheet\"\n        [(cellLinkData)]=\"showCellLinkData\"\n        [(allMetadata)]=\"showAllMetadata\"\n        (hiddenPanelsChange)=\"setHiddenPanels($event)\"\n        (cellLinksChange)=\"edgesDisabled.set(!$event)\"\n        (resetViewClick)=\"resetView()\"\n        (restoreDeletedCellsClick)=\"restoreDeletedCells()\"\n        (resetColorsClick)=\"resetColors()\"\n        (resetEverythingClick)=\"resetEverything()\"\n        (themePreferenceChange)=\"themeSwitch.setPreference($event)\"\n      />\n\n      @if (tabbed()) {\n        <nav mat-tab-nav-bar class=\"tabs\" hraFeature=\"tabs\" [tabPanel]=\"tabPanel\" [attr.aria-label]=\"tabsLabel\">\n          @for (tab of tabs(); track tab) {\n            <button\n              mat-tab-link\n              hraClickEvent\n              [id]=\"tabLinkId(tab)\"\n              [active]=\"activeTab() === tab\"\n              [hraFeature]=\"`${tab}-tab`\"\n              (click)=\"selectedTab.set(tab)\"\n            >\n              {{ tabLabels[tab] }}\n            </button>\n          }\n        </nav>\n      }\n\n      <!-- One tab panel holds every panel, so switching layouts or tabs never moves or re-creates them -->\n      <mat-tab-nav-panel\n        class=\"panels\"\n        [attr.role]=\"tabbed() ? 'tabpanel' : null\"\n        [attr.aria-labelledby]=\"tabbed() ? tabLinkId(activeTab()) : null\"\n        #tabPanel\n      >\n        <!-- Hidden panels stay rendered, so they keep their views and state -->\n        <div class=\"metadata\" [class.panel-hidden]=\"!layout().sidebar\" [class.fill]=\"!layout().visualizations\">\n          <cde-metadata\n            hraFeature=\"metadata\"\n            [class.panel-hidden]=\"!layout().metadata\"\n            [metadata]=\"metadataView()\"\n            [loading]=\"metadataLoading()\"\n            [showEmptyFields]=\"showAllMetadata()\"\n          />\n          <cde-cell-types\n            hraFeature=\"cell-types\"\n            [class.panel-hidden]=\"!layout().cellTypes\"\n            [selectedCellType]=\"nodeTargetSelectorWithDefault()\"\n            [countAdjustments]=\"countAdjustments()\"\n            [loading]=\"cellTypesLoading()\"\n            [hideCellLinkData]=\"!showCellLinkData()\"\n            [(cellTypes)]=\"cellTypes\"\n            [(cellTypesSelection)]=\"cellTypesSelection\"\n          />\n        </div>\n\n        <div class=\"visualizations\" [class.panel-hidden]=\"!layout().visualizations\">\n          <div class=\"top\" [class.panel-hidden]=\"!layout().topRow\" [class.fill]=\"!layout().histogram\">\n            <cde-node-dist-visualization\n              hraFeature=\"visualization\"\n              [class.panel-hidden]=\"!layout().distanceVisualization\"\n              [nodes]=\"nodesView()\"\n              [edges]=\"edgesView()\"\n              [maxEdgeDistance]=\"maxEdgeDistance()\"\n              [colorMap]=\"cellTypesAsColorMap()\"\n              [loading]=\"nodesLoading()\"\n              [emptyState]=\"visualizationEmptyState()\"\n              [fullscreenAvailable]=\"!tabbed()\"\n              [floatingControls]=\"tabbed()\"\n              [dockCellInfo]=\"compact()\"\n              [(nodeFilter)]=\"nodeFilterView\"\n              [(edgesDisabled)]=\"edgesDisabled\"\n              [(viewMode)]=\"viewMode\"\n              (fullscreenChange)=\"fullscreenPanel.set($event ? 'distance-visualization' : undefined)\"\n              (nodeClick)=\"nodeClick.emit($event)\"\n              (nodeHover)=\"nodeHover.emit($event)\"\n              (emptyStateAction)=\"selectAllCellTypes()\"\n            />\n\n            <cde-violin\n              hraFeature=\"violin-graph\"\n              [class.panel-hidden]=\"!layout().violinGraph\"\n              [class.fill]=\"!layout().distanceVisualization\"\n              [colors]=\"filteredColors()\"\n              [data]=\"filteredDistances()\"\n              [loading]=\"distancesLoading()\"\n              [emptyState]=\"chartsEmptyState()\"\n              [fullscreenAvailable]=\"!tabbed()\"\n              (fullscreenChange)=\"fullscreenPanel.set($event ? 'violin-graph' : undefined)\"\n              (emptyStateAction)=\"selectAllCellTypes()\"\n            />\n          </div>\n\n          <cde-histogram\n            hraFeature=\"histogram\"\n            [class.panel-hidden]=\"!layout().histogram\"\n            [class.fill]=\"!layout().topRow\"\n            [colors]=\"filteredColors()\"\n            [data]=\"filteredDistances()\"\n            [filteredCellTypes]=\"filteredCellTypes()\"\n            [loading]=\"distancesLoading()\"\n            [emptyState]=\"chartsEmptyState()\"\n            [fullscreenAvailable]=\"!tabbed()\"\n            [(allCellsColor)]=\"allCellsColor\"\n            (fullscreenChange)=\"fullscreenPanel.set($event ? 'histogram' : undefined)\"\n            (updateColor)=\"updateColor($event.entry, $event.color)\"\n            (emptyStateAction)=\"selectAllCellTypes()\"\n          />\n        </div>\n      </mat-tab-nav-panel>\n    </mat-drawer-content>\n  </mat-drawer-container>\n</ng-container>\n", styles: [":host{display:block;width:100%;height:100%;position:relative;--hra-scroll-overflow-fade-color: var(--mat-sys-background);--ang-text-link-color: var(--mat-sys-on-surface)}:host ::ng-deep a.hra-text-hyperlink{font-weight:600}:host{--mat-sidenav-content-text-color: var(--mat-sys-on-surface);--mat-sidenav-content-background-color: var(--mat-sys-background);--mat-sidenav-container-text-color: var(--mat-sys-on-surface);--mat-sidenav-container-background-color: light-dark(var(--mat-sys-surface-container-low), var(--mat-sys-surface-container));--mat-sidenav-container-elevation-shadow: var(--mat-sys-level1);--mat-sidenav-container-shape: var(--mat-sys-corner-large);--mat-sidenav-container-width: 28rem;--mat-sidenav-scrim-color: rgb(from var(--mat-sys-scrim) r g b/.24)}:host .drawer-container{height:100%}:host mat-drawer{max-width:100%;border-left:2px solid var(--mat-sys-outline);--hra-scroll-overflow-fade-color: light-dark(var(--mat-sys-surface-container-low), var(--mat-sys-surface-container))}:host .layout{display:grid;position:relative;grid-template-columns:calc(6rem + 1px) clamp(21rem,26%,26rem) minmax(0,1fr);grid-template-rows:3.5rem minmax(548px,calc(100% - 3.5rem));grid-template-areas:\"toolbar metadata visualization\" \"toolbar metadata visualization\"}:host .layout.visualizations-hidden{grid-template-columns:calc(6rem + 1px) 1fr 0}:host .layout.tabbed{grid-template-columns:calc(6rem + 1px) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:\"toolbar tabs\" \"toolbar panels\"}:host .layout.compact{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr) auto;grid-template-areas:\"tabs\" \"panels\" \"toolbar\"}:host .layout.compact .toolbar{height:auto;border-right:none;border-top:1px solid var(--mat-sys-outline)}:host .tabs{grid-area:tabs}:host .panels{display:contents}:host .layout.tabbed .panels{grid-area:panels;display:flex;min-width:0;min-height:0}:host .layout.tabbed .panels .metadata,:host .layout.tabbed .panels .visualizations{flex-grow:1;min-width:0}:host .layout.tabbed .panels cde-metadata{height:auto;min-height:0;overflow-y:auto;border-bottom:none}:host .layout.tabbed ::ng-deep hra-expansion-panel .title{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host .layout.tabbed ::ng-deep :is(cde-cell-types,cde-metadata,cde-violin) hra-expansion-panel .header{min-height:0;padding:0}:host .layout.tabbed ::ng-deep :is(cde-cell-types,cde-metadata,cde-violin) hra-expansion-panel .content{height:100%}:host .layout.tabbed ::ng-deep :is(cde-cell-types,cde-violin) hra-expansion-panel .content{padding-top:1rem}:host .layout.tabbed ::ng-deep cde-metadata .metadata-details{margin-top:1rem}:host .layout.tabbed ::ng-deep cde-histogram hra-expansion-panel .header{padding:1rem 1rem .5rem}:host .toolbar{grid-area:toolbar;border-right:1px solid var(--mat-sys-outline);--hra-navigation-rail-container-color: var(--mat-sys-surface-container)}:host .metadata{display:flex;flex-direction:column;grid-area:metadata;border-right:1px solid var(--mat-sys-outline)}:host .metadata.fill{border-right:none}:host .metadata cde-metadata{width:100%;height:fit-content;border-bottom:1px solid var(--mat-sys-outline)}:host .visualizations{grid-area:visualization;display:flex;flex-direction:column;overflow:hidden}:host .visualizations .top{display:flex;height:0;flex-grow:1;border-bottom:1px solid var(--mat-sys-outline)}:host .visualizations .top.fill{border-bottom:none}:host .visualizations cde-node-dist-visualization{height:100%;flex:1 1 32.75rem;min-width:0;overflow:hidden}:host .visualizations cde-violin{height:100%;flex:0 2 31.5rem;min-width:0;border-left:1px solid var(--mat-sys-outline)}:host .visualizations cde-violin.fill{flex-grow:1;border-left:none}:host .panel-hidden{display:none!important}::ng-deep html.cde-visualization-theme-switch::view-transition-old(root),::ng-deep html.cde-visualization-theme-switch::view-transition-new(root){animation-duration:.15s}@media(prefers-reduced-motion:reduce){::ng-deep html.cde-visualization-theme-switch::view-transition-old(root),::ng-deep html.cde-visualization-theme-switch::view-transition-new(root){animation:none}}::ng-deep .hra-app hra-expansion-panel .title{font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking);white-space:nowrap}::ng-deep .hra-app hra-expansion-panel .expansion-body{font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}::ng-deep .hra-app .fullscreen-panel:not(.node-dist-vis-fullscreen-panel){--mat-dialog-container-color: var(--mat-sys-background);--hra-scroll-overflow-fade-color: var(--mat-sys-background)}::ng-deep .hra-app .fullscreen-panel .header{padding:.5rem .5rem .5rem 1rem}::ng-deep .hra-app .fullscreen-panel .content{height:calc(100vh - 4.5rem)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { homeLink: [{ type: i0.Input, args: [{ isSignal: true, alias: "homeLink", required: false }] }], nodes: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodes", required: false }] }], nodeKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeKeys", required: false }] }], nodeTargetSelector: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetSelector", required: false }] }], nodeTargetKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetKey", required: false }] }], nodeTargetValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetValue", required: false }] }], edges: [{ type: i0.Input, args: [{ isSignal: true, alias: "edges", required: false }] }], edgeKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgeKeys", required: false }] }], maxEdgeDistance: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxEdgeDistance", required: false }] }], colorMap: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMap", required: false }] }], colorMapKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapKeys", required: false }] }], colorMapKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapKey", required: false }] }], colorMapValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapValue", required: false }] }], metadata: [{ type: i0.Input, args: [{ isSignal: true, alias: "metadata", required: false }] }], study: [{ type: i0.Input, args: [{ isSignal: true, alias: "study", required: false }] }], studyUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "studyUrl", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], organ: [{ type: i0.Input, args: [{ isSignal: true, alias: "organ", required: false }] }], technology: [{ type: i0.Input, args: [{ isSignal: true, alias: "technology", required: false }] }], sex: [{ type: i0.Input, args: [{ isSignal: true, alias: "sex", required: false }] }], age: [{ type: i0.Input, args: [{ isSignal: true, alias: "age", required: false }] }], thickness: [{ type: i0.Input, args: [{ isSignal: true, alias: "thickness", required: false }] }], pixelSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "pixelSize", required: false }] }], creationTimestamp: [{ type: i0.Input, args: [{ isSignal: true, alias: "creationTimestamp", required: false }] }], sourceFileName: [{ type: i0.Input, args: [{ isSignal: true, alias: "sourceFileName", required: false }] }], colorMapFileName: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapFileName", required: false }] }], hideThemeMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideThemeMenu", required: false }] }], hideHelpMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideHelpMenu", required: false }] }], hiddenPanels: [{ type: i0.Input, args: [{ isSignal: true, alias: "hiddenPanels", required: false }] }], rememberPanels: [{ type: i0.Input, args: [{ isSignal: true, alias: "rememberPanels", required: false }] }], nodeClick: [{ type: i0.Output, args: ["nodeClick"] }], nodeHover: [{ type: i0.Output, args: ["nodeHover"] }], nodesChange: [{ type: i0.Output, args: ["nodes"] }], edgesChange: [{ type: i0.Output, args: ["edges"] }], colorMapChange: [{ type: i0.Output, args: ["colorMap"] }], downloadsSheet: [{ type: i0.ViewChild, args: [i0.forwardRef(() => DownloadsComponent), { isSignal: true }] }], aboutSheet: [{ type: i0.ViewChild, args: [i0.forwardRef(() => AboutComponent), { isSignal: true }] }], nodeDistVisualizationComponent: [{ type: i0.ViewChild, args: [i0.forwardRef(() => NodeDistVisualizationComponent), { isSignal: true }] }], violinComponent: [{ type: i0.ViewChild, args: [i0.forwardRef(() => ViolinComponent), { isSignal: true }] }], histogramComponent: [{ type: i0.ViewChild, args: [i0.forwardRef(() => HistogramComponent), { isSignal: true }] }] } });

/** Default key for the color map type */
const DEFAULT_COLOR_MAP_KEY = 'Cell Type';
/** Default key for the color map value */
const DEFAULT_COLOR_MAP_VALUE_KEY = 'Cell Color';
/** Converts a color map array to a lookup map for quick access */
function colorMapToLookup(colorMap, typeKey, colorKey) {
    const lookup = new Map();
    for (const entry of colorMap) {
        lookup.set(entry[typeKey], entry[colorKey]);
    }
    return lookup;
}

/** Regular expression to match hex color values */
const HEX_COLOR_REGEX = /^#([0-9a-f]{3}){1,2}$/i;
/** Regular expression to match RGB color values in the format [r, g, b] */
const RGBA_COLOR_REGEX = /^\[(\s*\d+\s*,){2}\s*\d+\s*\]$/;
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
        const colorKeys = new Map();
        for (const [key, value] of Object.entries(data[0])) {
            const trimmedValue = value.trim();
            if (HEX_COLOR_REGEX.test(trimmedValue)) {
                colorKeys.set(key, 'hex');
            }
            else if (RGBA_COLOR_REGEX.test(trimmedValue)) {
                colorKeys.set(key, 'rgb');
            }
        }
        if (colorKeys.size === 0) {
            throw new Error('Could not parse color map');
        }
        const result = [];
        for (const item of data) {
            const entry = { ...item };
            for (const [key, type] of colorKeys.entries()) {
                entry[key] = this.parseColorValue(item[key], type);
            }
            result.push(entry);
        }
        return result;
    }
    /**
     * Parses a color value string into an array of RGB values or returns the original string if it cannot be parsed.
     *
     * @param value Value to parse
     * @param type Format of the color value ('hex' or 'rgb')
     * @returns An array of RGB values if the value is valid, or the original string if it cannot be parsed
     */
    parseColorValue(value, type) {
        value = value.trim();
        if (type === 'hex') {
            value = value.slice(1);
            const step = value.length === 3 ? 1 : 2;
            const rgb = [];
            for (let index = 0; index < 3; index++) {
                const start = index * step;
                const hexValue = value.slice(start, start + step);
                let parsedValue = parseInt(hexValue, 16);
                if (step === 1) {
                    parsedValue = (parsedValue << 4) | parsedValue;
                }
                rgb.push(parsedValue);
            }
            return rgb;
        }
        else if (type === 'rgb') {
            const rgb = JSON.parse(value);
            if (Array.isArray(rgb) && rgb.length === 3) {
                return rgb;
            }
        }
        return value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorMapFileLoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorMapFileLoaderService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.25", ngImport: i0, type: ColorMapFileLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/** Custom element definition for CdeVisualizationComponent */
const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
    providers: [
        provideAppConfiguration({
            name: 'cde-visualization',
            version: '1.1.0',
        }),
        provideAnalytics(withErrorHandler()),
        provideDesignSystem(),
        provideHttpClient(),
        providePlainTooltipOptions({ hraStyles: false }),
    ],
});

/**
 * Generated bundle index. Do not edit.
 */

export { CdeVisualizationComponent, CdeVisualizationElement, ColorMapFileLoaderService, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY, TOOLTIP_POSITION_BELOW, TOOLTIP_POSITION_COLOR_PICKER_LABEL, TOOLTIP_POSITION_LEFT_SIDE, TOOLTIP_POSITION_RIGHT_SIDE, colorMapToLookup, loadMetadata };
//# sourceMappingURL=hra-ui-cde-visualization.mjs.map
