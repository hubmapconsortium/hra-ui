import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import * as i0 from '@angular/core';
import { input, inject, ChangeDetectionStrategy, Component, Input, computed, HostBinding, model, output, EventEmitter, Renderer2, Output, ViewEncapsulation, signal, Injectable, ViewChild, HostListener, ChangeDetectorRef, ElementRef, effect } from '@angular/core';
import * as i1$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i8 from '@hra-ui/common';
import { HraCommonModule } from '@hra-ui/common';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { MarkdownModule } from 'ngx-markdown';
import * as i1 from '@hra-ui/common/analytics';
import * as i1$2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3$1 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import * as i2 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i1$3 from 'ng-inline-svg-2';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BehaviorSubject, debounce, timer, Subject, fromEventPattern, takeUntil, ReplaySubject } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import * as i2$1 from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as i3$2 from '@hra-ui/design-system/buttons/icon-button';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';
import { TableComponent } from '@hra-ui/design-system/table';
import { ScrollingModule as ScrollingModule$1, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i4 from '@angular/material/tree';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeModule } from '@angular/material/tree';
import { LinkDirective } from '@hra-ui/cdk';
import * as i7 from '@hra-ui/design-system/scrolling';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import * as i6 from 'ngx-scrollbar';
import * as i4$1 from 'ng-table-virtual-scroll';
import { TableVirtualScrollDataSource, TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import * as i2$2 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { BottomSheetService } from '@hra-ui/design-system/bottom-sheet';
import * as i9 from '@angular/material/divider';
import { MatDividerModule, MatDivider } from '@angular/material/divider';
import { selectSnapshot, selectQuerySnapshot, dispatch, select$ } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors, LinkRegistryActions } from '@hra-ui/cdk/state';
import { MessageIndicatorModule } from '@hra-ui/design-system/indicators/message-indicator';
import * as i8$1 from '@hra-ui/design-system/tooltips/rich-tooltip';
import { RichTooltipModule, RichTooltipDirective } from '@hra-ui/design-system/tooltips/rich-tooltip';
import { CellSummarySelectors, ResourceIds, ResourceTypes, SourceRefsSelectors, ActiveFtuSelectors, TissueLibrarySelectors, IllustratorSelectors, IllustratorActions, SourceRefsActions, ScreenModeAction, LinkIds, DownloadSelectors, DownloadActions } from '@hra-ui/state';
import * as i5 from '@hra-ui/design-system/buttons/button-toggle';
import * as i7$1 from '@hra-ui/design-system/indicators/message-indicator/info-message-indicator';
import * as i2$3 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '@hra-ui/design-system/dialog';

/**
 *  Component for any empty biomaker cell
 *  to inform about the empty data and has
 *  button to navigate to HRA Team.
 */
class EmptyBiomarkerComponent {
    /** Text to display for the empty behavior button */
    emptyBehaviorText = input.required(...(ngDevMode ? [{ debugName: "emptyBehaviorText" }] : []));
    /** Snackbar service */
    snackbar = inject(SnackbarService);
    /** Shows the copied snackbar message */
    showCopiedMessage() {
        this.snackbar.open('Email copied', '', undefined, undefined, {
            duration: 3000,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: EmptyBiomarkerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.7", type: EmptyBiomarkerComponent, isStandalone: true, selector: "ftu-empty-biomarker", inputs: { emptyBehaviorText: { classPropertyName: "emptyBehaviorText", publicName: "emptyBehaviorText", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-container hraFeature=\"empty-biomarker\">\n  <div class=\"content\">\n    <p>{{ emptyBehaviorText() }}</p>\n    <p>Please email the Human Reference Atlas team at infoccf&#64;iu.edu about your dataset.</p>\n  </div>\n\n  <div class=\"footer\">\n    <button\n      hraFeature=\"copy-email\"\n      hraClickEvent\n      mat-flat-button\n      class=\"collaborate-button\"\n      color=\"primary\"\n      cdkCopyToClipboard=\"infoccf@iu.edu\"\n      (click)=\"showCopiedMessage()\"\n    >\n      <mat-icon>content_copy</mat-icon>\n      Copy email\n    </button>\n  </div>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;height:100%}:host .content{padding:0 1rem;flex:1;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-primary)}:host .footer{padding:1rem}:host .footer .collaborate-button{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1$1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MarkdownModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: CdkCopyToClipboard, selector: "[cdkCopyToClipboard]", inputs: ["cdkCopyToClipboard", "cdkCopyToClipboardAttempts"], outputs: ["cdkCopyToClipboardCopied"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: EmptyBiomarkerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-empty-biomarker', imports: [HraCommonModule, MatButtonModule, MarkdownModule, MatIconModule, CdkCopyToClipboard], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"empty-biomarker\">\n  <div class=\"content\">\n    <p>{{ emptyBehaviorText() }}</p>\n    <p>Please email the Human Reference Atlas team at infoccf&#64;iu.edu about your dataset.</p>\n  </div>\n\n  <div class=\"footer\">\n    <button\n      hraFeature=\"copy-email\"\n      hraClickEvent\n      mat-flat-button\n      class=\"collaborate-button\"\n      color=\"primary\"\n      cdkCopyToClipboard=\"infoccf@iu.edu\"\n      (click)=\"showCopiedMessage()\"\n    >\n      <mat-icon>content_copy</mat-icon>\n      Copy email\n    </button>\n  </div>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;height:100%}:host .content{padding:0 1rem;flex:1;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-primary)}:host .footer{padding:1rem}:host .footer .collaborate-button{width:100%}\n"] }]
        }], propDecorators: { emptyBehaviorText: [{ type: i0.Input, args: [{ isSignal: true, alias: "emptyBehaviorText", required: true }] }] } });

/** Gradient legend for biomarkers */
class GradientLegendComponent {
    /** Gradient colors along with their stop points */
    gradient = [];
    /** Computes the css linear-gradient function for the gradient bar */
    get gradientCss() {
        const stops = this.gradient.map(({ color, percentage }) => `${color} ${percentage}%`).join(',');
        return `linear-gradient(90deg, ${stops})`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: GradientLegendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: GradientLegendComponent, isStandalone: true, selector: "ftu-gradient-legend", inputs: { gradient: "gradient" }, ngImport: i0, template: "<div class=\"start\">0.0</div>\n<div class=\"gradient-bar\" [style.background]=\"gradientCss\"></div>\n<div class=\"end\">1.0</div>\n", styles: [":host{display:flex;flex-direction:rows;align-items:center;justify-content:center;gap:.25rem}:host .start,:host .end{font:var(--mat-sys-label-micro);letter-spacing:var(--mat-sys-label-micro-tracking)}:host .gradient-bar{height:1.25rem;width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: GradientLegendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-gradient-legend', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"start\">0.0</div>\n<div class=\"gradient-bar\" [style.background]=\"gradientCss\"></div>\n<div class=\"end\">1.0</div>\n", styles: [":host{display:flex;flex-direction:rows;align-items:center;justify-content:center;gap:.25rem}:host .start,:host .end{font:var(--mat-sys-label-micro);letter-spacing:var(--mat-sys-label-micro-tracking)}:host .gradient-bar{height:1.25rem;width:100%}\n"] }]
        }], propDecorators: { gradient: [{
                type: Input
            }] } });

/** Label box component for reuse accross the page. The content with "end" selector will be added to the end of the label box */
class LabelBoxComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: LabelBoxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: LabelBoxComponent, isStandalone: true, selector: "ftu-label-box", ngImport: i0, template: "<ng-content></ng-content>\n<ng-content select=\".end\"></ng-content>\n", styles: [":host{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);display:flex;align-items:center;padding:.75rem .5rem 1rem 1rem;min-height:4rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: LabelBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-label-box', imports: [CommonModule], template: "<ng-content></ng-content>\n<ng-content select=\".end\"></ng-content>\n", styles: [":host{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);display:flex;align-items:center;padding:.75rem .5rem 1rem 1rem;min-height:4rem}\n"] }]
        }] });

/** Size legend component for the biomarkers table. */
class SizeLegendComponent {
    /** Taking input for the radius of the circle and the label to be displayed. */
    sizes = input([], ...(ngDevMode ? [{ debugName: "sizes" }] : []));
    /** Filtered sizes of size legend component */
    filteredSizes = computed(() => this.sizes().filter((size) => size.label !== '25%' && size.label !== '75%'), ...(ngDevMode ? [{ debugName: "filteredSizes" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SizeLegendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.7", type: SizeLegendComponent, isStandalone: true, selector: "ftu-size-legend", inputs: { sizes: { classPropertyName: "sizes", publicName: "sizes", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div *ngFor=\"let text of filteredSizes()\" class=\"item\">\n  <div class=\"circle\" style=\"--size: {{ text.radius }}rem\"></div>\n  <div class=\"label\">{{ text.label }}</div>\n</div>\n", styles: [":host{display:flex;flex-direction:row;column-gap:.4375rem}:host .item{font:var(--mat-sys-label-micro);letter-spacing:var(--mat-sys-label-micro-tracking);display:flex;flex-direction:row;align-items:center;justify-content:center;column-gap:.125rem}:host .item .circle{height:var(--size);width:var(--size);border-radius:50%;background-color:var(--mat-sys-secondary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SizeLegendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-size-legend', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let text of filteredSizes()\" class=\"item\">\n  <div class=\"circle\" style=\"--size: {{ text.radius }}rem\"></div>\n  <div class=\"label\">{{ text.label }}</div>\n</div>\n", styles: [":host{display:flex;flex-direction:row;column-gap:.4375rem}:host .item{font:var(--mat-sys-label-micro);letter-spacing:var(--mat-sys-label-micro-tracking);display:flex;flex-direction:row;align-items:center;justify-content:center;column-gap:.125rem}:host .item .circle{height:var(--size);width:var(--size);border-radius:50%;background-color:var(--mat-sys-secondary)}\n"] }]
        }], propDecorators: { sizes: [{ type: i0.Input, args: [{ isSignal: true, alias: "sizes", required: false }] }] } });

/**
 * Tooltips for illustrations
 */
class TooltipComponent {
    /**
     * Text to display
     */
    text = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: TooltipComponent, isStandalone: true, selector: "ftu-ui-tooltip", inputs: { text: "text" }, ngImport: i0, template: "<div class=\"tooltip\">{{ text }}</div>\n", styles: [":host .tooltip{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);background:color-mix(in srgb,var(--mat-sys-secondary) 96%,transparent);border-radius:.25rem;color:var(--mat-sys-on-primary);display:flex;flex-direction:column;gap:1rem;letter-spacing:unset;max-width:21rem;padding:.25rem .5rem;text-align:left}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-ui-tooltip', imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"tooltip\">{{ text }}</div>\n", styles: [":host .tooltip{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);background:color-mix(in srgb,var(--mat-sys-secondary) 96%,transparent);border-radius:.25rem;color:var(--mat-sys-on-primary);display:flex;flex-direction:column;gap:1rem;letter-spacing:unset;max-width:21rem;padding:.25rem .5rem;text-align:left}\n"] }]
        }], propDecorators: { text: [{
                type: Input
            }] } });

/**
 * Describes the data icon for the table
 */
class BiomarkerTableDataIconComponent {
    /** Represents the color of the icon */
    color = '';
    /** Represents the size of the icon  */
    size = 0;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerTableDataIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: BiomarkerTableDataIconComponent, isStandalone: true, selector: "ftu-biomarker-table-data-icon", inputs: { color: "color", size: "size" }, host: { properties: { "style.background-color": "this.color", "style.--radius.rem": "this.size" } }, ngImport: i0, template: '', isInline: true, styles: [":host{display:block;border-radius:50%;--radius: .625rem;width:var(--radius);height:var(--radius)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerTableDataIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-biomarker-table-data-icon', imports: [CommonModule], template: '', changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;border-radius:50%;--radius: .625rem;width:var(--radius);height:var(--radius)}\n"] }]
        }], propDecorators: { color: [{
                type: HostBinding,
                args: ['style.background-color']
            }, {
                type: Input
            }], size: [{
                type: HostBinding,
                args: ['style.--radius.rem']
            }, {
                type: Input
            }] } });

/** A component that wraps any child components of type FullscreenContentComponent and
 * sets their isFullScreen property to true or false based on its own fullscreen input property
 */
class FullscreenContainerComponent {
    /**
     * Illustration template of fullscreen container component
     */
    illustrationTemplate = input(null, ...(ngDevMode ? [{ debugName: "illustrationTemplate" }] : []));
    /**
     * Biomarker template of fullscreen container component
     */
    biomarkerTemplate = input(null, ...(ngDevMode ? [{ debugName: "biomarkerTemplate" }] : []));
    /**
     * Source list template of fullscreen container component
     */
    sourceListTemplate = input(null, ...(ngDevMode ? [{ debugName: "sourceListTemplate" }] : []));
    /** A boolean input property that controls the fullscreen mode */
    fullscreen = input(false, ...(ngDevMode ? [{ debugName: "fullscreen" }] : []));
    /**
     * Fullscreentab index of fullscreen container component
     */
    fullscreentabIndex = model(0, ...(ngDevMode ? [{ debugName: "fullscreentabIndex" }] : []));
    /**
     * Close fullscreen of fullscreen container component
     */
    closeFullscreen = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FullscreenContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: FullscreenContainerComponent, isStandalone: true, selector: "ftu-fullscreen-container", inputs: { illustrationTemplate: { classPropertyName: "illustrationTemplate", publicName: "illustrationTemplate", isSignal: true, isRequired: false, transformFunction: null }, biomarkerTemplate: { classPropertyName: "biomarkerTemplate", publicName: "biomarkerTemplate", isSignal: true, isRequired: false, transformFunction: null }, sourceListTemplate: { classPropertyName: "sourceListTemplate", publicName: "sourceListTemplate", isSignal: true, isRequired: false, transformFunction: null }, fullscreen: { classPropertyName: "fullscreen", publicName: "fullscreen", isSignal: true, isRequired: false, transformFunction: null }, fullscreentabIndex: { classPropertyName: "fullscreentabIndex", publicName: "fullscreentabIndex", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { fullscreentabIndex: "fullscreentabIndexChange", closeFullscreen: "closeFullscreen" }, ngImport: i0, template: "@if (!fullscreen()) {\n  <ng-container [ngTemplateOutlet]=\"illustrationTemplate()\"></ng-container>\n  <ng-container [ngTemplateOutlet]=\"biomarkerTemplate()\"></ng-container>\n} @else {\n  <div hraFeature=\"fullscreen-overlay\" class=\"fullscreen-overlay\">\n    <mat-tab-group\n      hraFeature=\"fullscreen-tabs\"\n      hraClickEvent\n      hraClickEventTriggerOn=\"none\"\n      #tabEvent=\"hraClickEvent\"\n      [(selectedIndex)]=\"fullscreentabIndex\"\n      class=\"tabs-group\"\n      (selectedTabChange)=\"tabEvent.logEvent(undefined, undefined, { tab: $event.tab.textLabel })\"\n    >\n      <mat-tab hraFeature=\"illustration-tab\" label=\"Illustration\">\n        <ng-container [ngTemplateOutlet]=\"illustrationTemplate()\"></ng-container>\n      </mat-tab>\n      <mat-tab hraFeature=\"source-data-tab\" label=\"Source data\">\n        <ng-container [ngTemplateOutlet]=\"sourceListTemplate()\"></ng-container>\n      </mat-tab>\n      <mat-tab hraFeature=\"biomarkers-tab\" label=\"Cell types by biomarkers\">\n        <ng-template matTabContent>\n          <ng-container [ngTemplateOutlet]=\"biomarkerTemplate()\"></ng-container>\n        </ng-template>\n      </mat-tab>\n    </mat-tab-group>\n    <button\n      hraFeature=\"close\"\n      hraClickEvent\n      mat-icon-button\n      class=\"closeButton\"\n      aria-label=\"Close fullscreen\"\n      (click)=\"closeFullscreen.emit()\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </div>\n}\n", styles: [":host{--mat-tab-active-indicator-color: var(--mat-sys-tertiary-fixed);--mat-tab-active-indicator-height: 2px;--mat-tab-active-label-text-color: var(--mat-sys-secondary);--mat-tab-divider-color: var(--mat-sys-outline-variant);--mat-tab-inactive-label-text-color: var(--mat-sys-primary);--mat-tab-label-text-font: var(--mat-sys-label-medium-font);--mat-tab-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-tab-label-text-size: var(--mat-sys-label-medium-size);--mat-tab-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-tab-label-text-weight: var(--mat-sys-label-medium-weight);--mat-tab-container-height: 4.3rem}.fullscreen-overlay{display:flex;justify-content:space-between;height:100%;width:100%;position:relative;overflow:hidden}.tabs-group{flex:1;display:flex;flex-direction:column;overflow:hidden}.tabs-group ::ng-deep .mat-mdc-tab-body-wrapper{flex:1;overflow:hidden}.tabs-group ::ng-deep .mat-mdc-tab-body{overflow:hidden}.tabs-group ::ng-deep .mat-mdc-tab-body-content{height:100%;overflow:hidden}.closeButton{position:absolute;right:1rem;top:.75rem;z-index:1}::ng-deep ftu-source-list .table-content{margin:0!important}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatTabsModule }, { kind: "directive", type: i3$1.MatTabContent, selector: "[matTabContent]" }, { kind: "component", type: i3$1.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass", "id"], exportAs: ["matTab"] }, { kind: "component", type: i3$1.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "fitInkBarToContent", "mat-stretch-tabs", "mat-align-tabs", "dynamicHeight", "selectedIndex", "headerPosition", "animationDuration", "contentTabIndex", "disablePagination", "disableRipple", "preserveContent", "backgroundColor", "aria-label", "aria-labelledby"], outputs: ["selectedIndexChange", "focusChange", "animationDone", "selectedTabChange"], exportAs: ["matTabGroup"] }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FullscreenContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-fullscreen-container', imports: [HraCommonModule, MatTabsModule, IconsModule, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!fullscreen()) {\n  <ng-container [ngTemplateOutlet]=\"illustrationTemplate()\"></ng-container>\n  <ng-container [ngTemplateOutlet]=\"biomarkerTemplate()\"></ng-container>\n} @else {\n  <div hraFeature=\"fullscreen-overlay\" class=\"fullscreen-overlay\">\n    <mat-tab-group\n      hraFeature=\"fullscreen-tabs\"\n      hraClickEvent\n      hraClickEventTriggerOn=\"none\"\n      #tabEvent=\"hraClickEvent\"\n      [(selectedIndex)]=\"fullscreentabIndex\"\n      class=\"tabs-group\"\n      (selectedTabChange)=\"tabEvent.logEvent(undefined, undefined, { tab: $event.tab.textLabel })\"\n    >\n      <mat-tab hraFeature=\"illustration-tab\" label=\"Illustration\">\n        <ng-container [ngTemplateOutlet]=\"illustrationTemplate()\"></ng-container>\n      </mat-tab>\n      <mat-tab hraFeature=\"source-data-tab\" label=\"Source data\">\n        <ng-container [ngTemplateOutlet]=\"sourceListTemplate()\"></ng-container>\n      </mat-tab>\n      <mat-tab hraFeature=\"biomarkers-tab\" label=\"Cell types by biomarkers\">\n        <ng-template matTabContent>\n          <ng-container [ngTemplateOutlet]=\"biomarkerTemplate()\"></ng-container>\n        </ng-template>\n      </mat-tab>\n    </mat-tab-group>\n    <button\n      hraFeature=\"close\"\n      hraClickEvent\n      mat-icon-button\n      class=\"closeButton\"\n      aria-label=\"Close fullscreen\"\n      (click)=\"closeFullscreen.emit()\"\n    >\n      <mat-icon>close</mat-icon>\n    </button>\n  </div>\n}\n", styles: [":host{--mat-tab-active-indicator-color: var(--mat-sys-tertiary-fixed);--mat-tab-active-indicator-height: 2px;--mat-tab-active-label-text-color: var(--mat-sys-secondary);--mat-tab-divider-color: var(--mat-sys-outline-variant);--mat-tab-inactive-label-text-color: var(--mat-sys-primary);--mat-tab-label-text-font: var(--mat-sys-label-medium-font);--mat-tab-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-tab-label-text-size: var(--mat-sys-label-medium-size);--mat-tab-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-tab-label-text-weight: var(--mat-sys-label-medium-weight);--mat-tab-container-height: 4.3rem}.fullscreen-overlay{display:flex;justify-content:space-between;height:100%;width:100%;position:relative;overflow:hidden}.tabs-group{flex:1;display:flex;flex-direction:column;overflow:hidden}.tabs-group ::ng-deep .mat-mdc-tab-body-wrapper{flex:1;overflow:hidden}.tabs-group ::ng-deep .mat-mdc-tab-body{overflow:hidden}.tabs-group ::ng-deep .mat-mdc-tab-body-content{height:100%;overflow:hidden}.closeButton{position:absolute;right:1rem;top:.75rem;z-index:1}::ng-deep ftu-source-list .table-content{margin:0!important}\n"] }]
        }], propDecorators: { illustrationTemplate: [{ type: i0.Input, args: [{ isSignal: true, alias: "illustrationTemplate", required: false }] }], biomarkerTemplate: [{ type: i0.Input, args: [{ isSignal: true, alias: "biomarkerTemplate", required: false }] }], sourceListTemplate: [{ type: i0.Input, args: [{ isSignal: true, alias: "sourceListTemplate", required: false }] }], fullscreen: [{ type: i0.Input, args: [{ isSignal: true, alias: "fullscreen", required: false }] }], fullscreentabIndex: [{ type: i0.Input, args: [{ isSignal: true, alias: "fullscreentabIndex", required: false }] }, { type: i0.Output, args: ["fullscreentabIndexChange"] }], closeFullscreen: [{ type: i0.Output, args: ["closeFullscreen"] }] } });

/** Delay before tooltip becomes visible */
const HOVER_DELAY = 200;
/** Tooltip position settings */
const TOOLTIP_POSITIONS = [
    {
        originX: 'center',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: 8,
    },
    {
        originX: 'center',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -8,
    },
    {
        originX: 'center',
        originY: 'center',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 8,
    },
    {
        originX: 'center',
        originY: 'center',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
    },
];
/**
 * Interactive SVG component
 */
class InteractiveSvgComponent {
    /** SVG url */
    url;
    /** Mapping info */
    mapping = [];
    /** Highlighted ontology id */
    highlightId;
    /** Emits node id when hovered */
    nodeHover = new EventEmitter();
    /** Emits node id when clicked */
    nodeClick = new EventEmitter();
    /** SVG script eval mode */
    NEVER_EVAL_SCRIPTS = "never" /* SVGScriptEvalMode.NEVER */;
    /** Tooltip position settings */
    TOOLTIP_POSITIONS = TOOLTIP_POSITIONS;
    /** Observable of node hover data or undefined when there is no active hover */
    nodeHoverData$ = new BehaviorSubject(undefined);
    /** Observable of node hover with a timer */
    nodeHoverDelayedData$ = this.nodeHoverData$.pipe(debounce((event) => timer(event ? HOVER_DELAY : 0)));
    /** Custom renderer */
    renderer = inject(Renderer2);
    /** Destroys */
    destroy$ = new Subject();
    /** Crosswalk element of svg */
    crosswalkEl;
    /** List of highlighted svg elements */
    highlightedElements = [];
    /**
     * Updates the highlighting based on current highlight id
     * @param changes
     */
    ngOnChanges(changes) {
        if ('highlightId' in changes) {
            this.resetHighlight();
            this.setHighlight();
        }
    }
    /**
     * Highlights cells that match highlightId
     */
    setHighlight() {
        const { mapping, highlightId, crosswalkEl } = this;
        const entry = mapping.find(({ ontologyId }) => ontologyId === highlightId);
        if (!entry || !crosswalkEl) {
            return;
        }
        const encodedId = this.encodeId(entry.id);
        const element = crosswalkEl.querySelector(`#${entry.id}, #${encodedId}`);
        if (!element) {
            return;
        }
        const gElement = element.nodeName === 'g' ? element : element.parentElement;
        const id = gElement.id;
        const elements = crosswalkEl.querySelectorAll(`#${id} :is(path, polygon, polyline)`);
        this.highlightedElements = Array.from(elements);
        elements.forEach((el) => el.classList.add('click-active'));
    }
    /**
     * Resets all highlighted elements in the svg
     */
    resetHighlight() {
        for (const el of this.highlightedElements) {
            el.classList.remove('click-active');
        }
        this.highlightedElements = [];
    }
    /**
     * Clears observables on destroy
     */
    ngOnDestroy() {
        this.clear();
    }
    /**
     * Sets SVG element
     * @param el SVG element
     */
    setSvgElement(el) {
        this.clear();
        this.crosswalkEl = el.querySelector('[id^="Crosswalk"]') ?? undefined;
        if (this.crosswalkEl) {
            // Move to front (i.e. last child in svg)
            this.renderer.appendChild(el, this.crosswalkEl);
            this.attachCrosswalkHover(this.crosswalkEl);
            this.setHighlight();
        }
    }
    /**
     * Removes underscores from id
     * @param name Node name
     * @returns node name without underscores
     */
    formatNodeName(name) {
        return name.replace(/_/g, ' ');
    }
    /**
     * Attaches crosswalk hover
     * @param el element
     */
    attachCrosswalkHover(el) {
        this.attachEvent(el, 'mouseover').subscribe((event) => this.onCrosswalkHover(event));
        this.attachEvent(el, 'mouseout').subscribe(() => this.onCrosswalkHover(undefined));
        this.attachEvent(el, 'click').subscribe((event) => this.nodeClick.emit(this.getNode(event)));
    }
    /**
     * Finds matching node in data from a hovered element
     * @param event Mouse event
     */
    onCrosswalkHover(event) {
        if (event) {
            const node = this.getNode(event);
            if (node) {
                this.nodeHoverData$.next({
                    node: node.label,
                    origin: {
                        x: event.clientX,
                        y: event.clientY,
                    },
                });
                this.nodeHover.emit(node); //emits node entry
            }
        }
        else {
            this.nodeHoverData$.next(undefined);
            this.nodeHover.emit();
        }
    }
    /**
     * Clears observables
     */
    clear() {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$ = new Subject();
    }
    /**
     * Returns entry from mapping if target, parent, or grandparent id matches the node name
     * @param event Event
     * @returns Node entry that matches the target id
     */
    getNode(event) {
        const targetId = event.target.id;
        const parentId = event.target.parentElement?.id ?? '';
        const grandparentId = event.target.parentElement?.parentElement?.id ?? '';
        const idCollection = [targetId, parentId, grandparentId];
        for (const id of idCollection) {
            const decodedID = this.decodeId(id);
            const cellMatch = this.mapping.find((item) => item.id?.toLowerCase() === decodedID.toLowerCase());
            if (cellMatch) {
                return cellMatch;
            }
            const groupMatch = this.mapping.find((item) => item.groupId?.toLowerCase() === decodedID.toLowerCase());
            if (groupMatch) {
                return groupMatch;
            }
        }
        return undefined;
    }
    /**
     * Decodes id into a normal string
     * @param id Undecoded ID
     * @returns id
     */
    decodeId(id) {
        const replacer = (_match, hex) => String.fromCharCode(Number.parseInt(hex, 16));
        return id.replace(/_x([\da-f]+)_/gi, replacer);
    }
    /**
     * Turns normal string into decoded SVG id
     * @param id id
     * @returns Encoded id
     */
    encodeId(id) {
        const replacer = (match) => `_x${match.charCodeAt(0).toString(16).toUpperCase()}_`;
        return id.replace(/[^a-z0-9-]/gi, replacer);
    }
    /**
     * Attaches an event listener
     * @template K
     * @param el Element
     * @param event Event
     * @returns Observable
     */
    attachEvent(el, event) {
        const { renderer, destroy$ } = this;
        const add = (handler) => renderer.listen(el, event, handler);
        const remove = (_handler, unlisten) => unlisten();
        return fromEventPattern(add, remove).pipe(takeUntil(destroy$));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: InteractiveSvgComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: InteractiveSvgComponent, isStandalone: true, selector: "ftu-interactive-svg", inputs: { url: "url", mapping: "mapping", highlightId: "highlightId" }, outputs: { nodeHover: "nodeHover", nodeClick: "nodeClick" }, usesOnChanges: true, ngImport: i0, template: "@if (url) {\n  <div\n    class=\"svg\"\n    [class.hover-active]=\"nodeHoverData$ | async\"\n    [inlineSVG]=\"url\"\n    [evalScripts]=\"NEVER_EVAL_SCRIPTS\"\n    (onSVGInserted)=\"setSvgElement($event)\"\n  ></div>\n}\n\n@if (nodeHoverDelayedData$ | async; as hover) {\n  <ng-template\n    cdkConnectedOverlay\n    cdkConnectedOverlayPanelClass=\"ftu-interactive-svg-tooltip-panel\"\n    [cdkConnectedOverlayOrigin]=\"hover.origin\"\n    [cdkConnectedOverlayPositions]=\"TOOLTIP_POSITIONS\"\n    [cdkConnectedOverlayViewportMargin]=\"16\"\n    [cdkConnectedOverlayOpen]=\"true\"\n  >\n    <ftu-ui-tooltip [text]=\"formatNodeName(hover.node)\"></ftu-ui-tooltip>\n  </ng-template>\n}\n", styles: [":host{background-color:var(--mat-sys-on-primary);display:flex;overflow:hidden}.svg{height:100%;width:100%;max-width:100%;min-height:20rem;overflow:hidden}svg{width:100%;height:100%;object-fit:contain}#Crosswalk :is(path,polygon,polyline),.hover-active #Crosswalk .inset-group:hover :is(path,polygon,polyline){fill:transparent;stroke:transparent}.hover-active #Crosswalk g:hover :is(path,polygon,polyline),.hover-active #Crosswalk .inset-group>g:hover :is(path,polygon,polyline),#Crosswalk .click-active{fill:red;mix-blend-mode:saturation}::-webkit-scrollbar{width:.5rem;height:.5rem}::-webkit-scrollbar-track{background:#f8f9fa;border:.063rem solid #d3d3d3}::-webkit-scrollbar-thumb{background:#a0abb4;border-radius:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: InlineSVGModule }, { kind: "directive", type: i1$3.InlineSVGDirective, selector: "[inlineSVG]", inputs: ["inlineSVG", "resolveSVGUrl", "replaceContents", "prepend", "injectComponent", "cacheSVG", "setSVGAttributes", "removeSVGAttributes", "forceEvalStyles", "evalScripts", "fallbackImgUrl", "fallbackSVG", "onSVGLoaded"], outputs: ["onSVGInserted", "onSVGFailed"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "component", type: TooltipComponent, selector: "ftu-ui-tooltip", inputs: ["text"] }, { kind: "pipe", type: i1$2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.ShadowDom });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: InteractiveSvgComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-interactive-svg', imports: [CommonModule, InlineSVGModule, OverlayModule, TooltipComponent], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.ShadowDom, template: "@if (url) {\n  <div\n    class=\"svg\"\n    [class.hover-active]=\"nodeHoverData$ | async\"\n    [inlineSVG]=\"url\"\n    [evalScripts]=\"NEVER_EVAL_SCRIPTS\"\n    (onSVGInserted)=\"setSvgElement($event)\"\n  ></div>\n}\n\n@if (nodeHoverDelayedData$ | async; as hover) {\n  <ng-template\n    cdkConnectedOverlay\n    cdkConnectedOverlayPanelClass=\"ftu-interactive-svg-tooltip-panel\"\n    [cdkConnectedOverlayOrigin]=\"hover.origin\"\n    [cdkConnectedOverlayPositions]=\"TOOLTIP_POSITIONS\"\n    [cdkConnectedOverlayViewportMargin]=\"16\"\n    [cdkConnectedOverlayOpen]=\"true\"\n  >\n    <ftu-ui-tooltip [text]=\"formatNodeName(hover.node)\"></ftu-ui-tooltip>\n  </ng-template>\n}\n", styles: [":host{background-color:var(--mat-sys-on-primary);display:flex;overflow:hidden}.svg{height:100%;width:100%;max-width:100%;min-height:20rem;overflow:hidden}svg{width:100%;height:100%;object-fit:contain}#Crosswalk :is(path,polygon,polyline),.hover-active #Crosswalk .inset-group:hover :is(path,polygon,polyline){fill:transparent;stroke:transparent}.hover-active #Crosswalk g:hover :is(path,polygon,polyline),.hover-active #Crosswalk .inset-group>g:hover :is(path,polygon,polyline),#Crosswalk .click-active{fill:red;mix-blend-mode:saturation}::-webkit-scrollbar{width:.5rem;height:.5rem}::-webkit-scrollbar-track{background:#f8f9fa;border:.063rem solid #d3d3d3}::-webkit-scrollbar-thumb{background:#a0abb4;border-radius:.5rem}\n"] }]
        }], propDecorators: { url: [{
                type: Input
            }], mapping: [{
                type: Input
            }], highlightId: [{
                type: Input
            }], nodeHover: [{
                type: Output
            }], nodeClick: [{
                type: Output
            }] } });

/**
 * Full screen tab index enum
 */
var FullscreenTab;
(function (FullscreenTab) {
    FullscreenTab[FullscreenTab["Illustration"] = 0] = "Illustration";
    FullscreenTab[FullscreenTab["SourceList"] = 1] = "SourceList";
    FullscreenTab[FullscreenTab["BiomarkerDetails"] = 2] = "BiomarkerDetails";
})(FullscreenTab || (FullscreenTab = {}));
/**
 * Ftu Full screen service
 */
class FtuFullScreenService {
    /**
     * Boolean input signal to determine if full screen is enabled
     */
    isFullscreen = signal(false, ...(ngDevMode ? [{ debugName: "isFullscreen" }] : []));
    /**
     * Input signal to store the current fullscreen tab index
     */
    fullscreentabIndex = signal(0, ...(ngDevMode ? [{ debugName: "fullscreentabIndex" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FtuFullScreenService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FtuFullScreenService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: FtuFullScreenService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/** This component shows list of sources with title and links to the datasets */
class SourceListComponent {
    /** List of sources with titles and links displayed to the user */
    sources = [];
    /** Text that appears in the empty biomarker message */
    message = '';
    /** Whether to hide the title of the source list */
    hideTitle = input(false, ...(ngDevMode ? [{ debugName: "hideTitle" }] : []));
    /** Fullscreen service */
    fullscreenService = inject(FtuFullScreenService);
    /** Whether to show the biomarker table */
    showTable = signal(true, ...(ngDevMode ? [{ debugName: "showTable" }] : []));
    /** Number of selected sources */
    selectedCount = signal(0, ...(ngDevMode ? [{ debugName: "selectedCount" }] : []));
    /** Emits when source selection changed */
    selectionChanged = new EventEmitter();
    /** Reference to the table component */
    sourceTable;
    /** Table columns configuration */
    tableColumns = [
        {
            column: 'authors',
            label: 'Authors',
            type: 'text',
        },
        {
            column: 'year',
            label: 'Year',
            type: 'text',
        },
        {
            column: 'title',
            label: 'Paper Title',
            type: 'text',
        },
        {
            column: 'link',
            label: 'Paper DOI',
            type: {
                type: 'link',
                urlColumn: 'link',
            },
        },
    ];
    /** Opens the source list in fullscreen mode */
    openSourceListFullscreen() {
        this.fullscreenService.fullscreentabIndex.set(FullscreenTab.SourceList);
        this.fullscreenService.isFullscreen.set(true);
    }
    /** On sources change, resets selection and selects all sources */
    ngOnChanges(changes) {
        if ('sources' in changes) {
            // Wait for the table to be initialized, then select all
            setTimeout(() => {
                if (this.sourceTable && this.sources.length > 0) {
                    this.sourceTable.selection.clear();
                    this.sourceTable.selection.select(...this.sources);
                    this.selectedCount.set(this.sourceTable.selection.selected.length);
                    this.selectionChanged.emit(this.sourceTable.selection.selected);
                }
            });
        }
    }
    /**
     * It changes the value of showTable to false if value it true
     * and vice versa
     */
    toggleTable() {
        this.showTable.set(!this.showTable());
    }
    /**
     * Handle selection changes from the table
     */
    onSelectionChange() {
        if (this.sourceTable) {
            this.selectedCount.set(this.sourceTable.selection.selected.length);
            this.selectionChanged.emit(this.sourceTable.selection.selected);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SourceListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: SourceListComponent, isStandalone: true, selector: "ftu-source-list", inputs: { sources: { classPropertyName: "sources", publicName: "sources", isSignal: false, isRequired: false, transformFunction: null }, message: { classPropertyName: "message", publicName: "message", isSignal: false, isRequired: false, transformFunction: null }, hideTitle: { classPropertyName: "hideTitle", publicName: "hideTitle", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selectionChanged: "selectionChanged" }, host: { properties: { "class.full-screen": "hideTitle()", "class.no-data-full-screen": "hideTitle() && sources.length === 0" } }, viewQueries: [{ propertyName: "sourceTable", first: true, predicate: ["sourceTable"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-container hraFeature=\"source-data-list\">\n  <div class=\"source-list-header\">\n    @if (!hideTitle()) {\n      <span class=\"source-list-title\">Source data</span>\n    }\n    <div class=\"view-fullscreen\" [class.hide-title]=\"hideTitle()\">\n      `\n      <hra-results-indicator [value]=\"selectedCount()\" [total]=\"sources.length\" description=\"Viewing\" />\n      @if (!hideTitle()) {\n        <button\n          mat-icon-button\n          hraIconButtonSize=\"large\"\n          hraFeature=\"open-source-fullscreen\"\n          hraClickEvent\n          (click)=\"openSourceListFullscreen()\"\n        >\n          <mat-icon>fullscreen</mat-icon>\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"table-content\" [class.hidden]=\"!showTable()\">\n    @if (sources.length !== 0) {\n      <hra-table\n        [rows]=\"sources\"\n        [columns]=\"tableColumns\"\n        [enableRowSelection]=\"true\"\n        [enableSort]=\"true\"\n        [style]=\"'alternating'\"\n        [verticalDividers]=\"true\"\n        #sourceTable\n        (selectionChange)=\"onSelectionChange()\"\n      >\n      </hra-table>\n    } @else {\n      <!--\n        TODO: Need to do in a way that FTU hides the source list completely from the grid,\n        will handle in the future.\n    -->\n      <ftu-empty-biomarker emptyBehaviorText=\"We currently do not have data for this functional tissue unit.\" />\n    }\n  </div>\n\n  <ng-template #dataHover let-columnName>\n    <div class=\"biomarker-table-hover full-column-name\" [class.empty]=\"columnName.toString() === ''\">\n      {{ columnName }}\n    </div>\n  </ng-template>\n</ng-container>\n", styles: [":host{display:block;height:100%}:host .source-list-header{display:flex;align-items:center;justify-content:space-between;height:4rem;padding:0 16px}:host .source-list-header .view-fullscreen{display:flex;align-items:center}:host .source-list-header .view-fullscreen.hide-title{justify-content:flex-end;flex:1}:host .source-list-header .view-fullscreen hra-results-indicator{--hra-results-indicator-height: 2.375rem;border-radius:624.9375rem}:host .source-list-header .source-list-title{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-secondary)}:host.no-data-full-screen .source-list-header{display:none}:host.no-data-full-screen ::ng-deep ftu-empty-biomarker .footer{display:flex;justify-content:end;border-top:.0625rem solid var(--mat-sys-outline-variant)}:host.no-data-full-screen ::ng-deep ftu-empty-biomarker .footer .collaborate-button{width:auto!important}:host.no-data-full-screen .table-content{height:100%}:host.full-screen .table-content{margin:0 1rem 1rem}:host.full-screen .table-content hra-table{border-radius:.25rem}:host .table-content{overflow:auto}:host .table-content.hidden{display:none}:host .table-content hra-table{max-height:163px;border-radius:0;border-left:none;border-right:none;--mat-table-row-item-label-text-size: var(--mat-sys-label-small-size)}:host .table-content hra-table ::ng-deep td{max-width:143.6704px;max-height:32px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .table-content hra-table ::ng-deep th[data-column-type=text]{max-width:640px}:host .table-content hra-table ::ng-deep th[data-column-type=numeric]{max-width:80px;min-width:80px}:host .table-content hra-table ::ng-deep th[data-column-type=link]{max-width:196px}:host .table-content hra-table ::ng-deep th:nth-child(3)[data-column-type=text],:host .table-content hra-table ::ng-deep td:nth-child(3){width:80px!important;min-width:80px!important;max-width:80px!important}:host .end{cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3$2.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatTableModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MatSortModule }, { kind: "ngmodule", type: IconButtonModule }, { kind: "component", type: EmptyBiomarkerComponent, selector: "ftu-empty-biomarker", inputs: ["emptyBehaviorText"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: TableComponent, selector: "hra-table", inputs: ["csvUrl", "columns", "rows", "style", "enableSort", "verticalDividers", "enableRowSelection", "hideHeaders"], outputs: ["selectionChange", "routeClicked", "downloadHovered"] }, { kind: "component", type: ResultsIndicatorComponent, selector: "hra-results-indicator", inputs: ["value", "total", "description"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SourceListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-source-list', imports: [
                        ButtonsModule,
                        HraCommonModule,
                        MatButtonModule,
                        MatTableModule,
                        MatIconModule,
                        MatSortModule,
                        IconButtonModule,
                        EmptyBiomarkerComponent,
                        MatCheckboxModule,
                        TableComponent,
                        ResultsIndicatorComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.full-screen]': 'hideTitle()',
                        '[class.no-data-full-screen]': 'hideTitle() && sources.length === 0',
                    }, template: "<ng-container hraFeature=\"source-data-list\">\n  <div class=\"source-list-header\">\n    @if (!hideTitle()) {\n      <span class=\"source-list-title\">Source data</span>\n    }\n    <div class=\"view-fullscreen\" [class.hide-title]=\"hideTitle()\">\n      `\n      <hra-results-indicator [value]=\"selectedCount()\" [total]=\"sources.length\" description=\"Viewing\" />\n      @if (!hideTitle()) {\n        <button\n          mat-icon-button\n          hraIconButtonSize=\"large\"\n          hraFeature=\"open-source-fullscreen\"\n          hraClickEvent\n          (click)=\"openSourceListFullscreen()\"\n        >\n          <mat-icon>fullscreen</mat-icon>\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"table-content\" [class.hidden]=\"!showTable()\">\n    @if (sources.length !== 0) {\n      <hra-table\n        [rows]=\"sources\"\n        [columns]=\"tableColumns\"\n        [enableRowSelection]=\"true\"\n        [enableSort]=\"true\"\n        [style]=\"'alternating'\"\n        [verticalDividers]=\"true\"\n        #sourceTable\n        (selectionChange)=\"onSelectionChange()\"\n      >\n      </hra-table>\n    } @else {\n      <!--\n        TODO: Need to do in a way that FTU hides the source list completely from the grid,\n        will handle in the future.\n    -->\n      <ftu-empty-biomarker emptyBehaviorText=\"We currently do not have data for this functional tissue unit.\" />\n    }\n  </div>\n\n  <ng-template #dataHover let-columnName>\n    <div class=\"biomarker-table-hover full-column-name\" [class.empty]=\"columnName.toString() === ''\">\n      {{ columnName }}\n    </div>\n  </ng-template>\n</ng-container>\n", styles: [":host{display:block;height:100%}:host .source-list-header{display:flex;align-items:center;justify-content:space-between;height:4rem;padding:0 16px}:host .source-list-header .view-fullscreen{display:flex;align-items:center}:host .source-list-header .view-fullscreen.hide-title{justify-content:flex-end;flex:1}:host .source-list-header .view-fullscreen hra-results-indicator{--hra-results-indicator-height: 2.375rem;border-radius:624.9375rem}:host .source-list-header .source-list-title{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-secondary)}:host.no-data-full-screen .source-list-header{display:none}:host.no-data-full-screen ::ng-deep ftu-empty-biomarker .footer{display:flex;justify-content:end;border-top:.0625rem solid var(--mat-sys-outline-variant)}:host.no-data-full-screen ::ng-deep ftu-empty-biomarker .footer .collaborate-button{width:auto!important}:host.no-data-full-screen .table-content{height:100%}:host.full-screen .table-content{margin:0 1rem 1rem}:host.full-screen .table-content hra-table{border-radius:.25rem}:host .table-content{overflow:auto}:host .table-content.hidden{display:none}:host .table-content hra-table{max-height:163px;border-radius:0;border-left:none;border-right:none;--mat-table-row-item-label-text-size: var(--mat-sys-label-small-size)}:host .table-content hra-table ::ng-deep td{max-width:143.6704px;max-height:32px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .table-content hra-table ::ng-deep th[data-column-type=text]{max-width:640px}:host .table-content hra-table ::ng-deep th[data-column-type=numeric]{max-width:80px;min-width:80px}:host .table-content hra-table ::ng-deep th[data-column-type=link]{max-width:196px}:host .table-content hra-table ::ng-deep th:nth-child(3)[data-column-type=text],:host .table-content hra-table ::ng-deep td:nth-child(3){width:80px!important;min-width:80px!important;max-width:80px!important}:host .end{cursor:pointer}\n"] }]
        }], propDecorators: { sources: [{
                type: Input
            }], message: [{
                type: Input
            }], hideTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideTitle", required: false }] }], selectionChanged: [{
                type: Output
            }], sourceTable: [{
                type: ViewChild,
                args: ['sourceTable']
            }] } });

/**
 * Tabular View for hubMap tissue side-bar
 */
class TissueTreeListComponent {
    /**
     * Input  of tissue tree list component
     */
    nodes = {};
    /**
     * Node selected, to view the data associated with it
     */
    selected = undefined;
    /**
     * Output  of tissue tree list component
     */
    selectedChange = new EventEmitter();
    /**
     * Navigates to an illustration page
     */
    navigate = new EventEmitter();
    /**
     * Whether keyboard navigation is enabled
     */
    enableNav = true;
    /**
     * tree controller, used to control the nodes in the tree
     */
    control = new FlatTreeControl((node) => node.level, (node) => node.expandable);
    /**
     * Flattener of tissue tree list component, returns flat-data structure
     */
    flattener = new MatTreeFlattener((node, level) => ({
        label: node.label.charAt(0).toUpperCase() + node.label.slice(1),
        expandable: !!node.children?.length,
        level,
        data: node,
    }), (node) => node.level, (node) => node.expandable, (node) => (node.children ?? []).map((id) => this.nodes[id]).sort((a, b) => a.label.localeCompare(b.label)));
    /**
     * Data source of tissue tree list component, defines the data in mat-tree
     */
    dataSource = new MatTreeFlatDataSource(this.control, this.flattener);
    /**
     * Take actions if any data changes
     * @param changes changes in data
     */
    ngOnChanges(changes) {
        if ('nodes' in changes) {
            this.dataSource.data = this.findRootNodes();
            this.control.expandAll();
        }
        if ('selected' in changes) {
            if (!this.selected) {
                this.control.expandAll();
            }
            const path = this.selected ? this.dfsFindPath(this.findRootNodes(), this.selected) : [];
            const node = this.control.dataNodes.find((n) => n.data === changes['selected'].currentValue);
            if (!node?.expandable) {
                this.expandPath(path);
            }
        }
    }
    /**
     * check if the current node has children
     * @param node current selected node
     * @returns boolean, which means if node has children
     */
    hasChild(_, node) {
        return node.expandable;
    }
    /**
     * It selects the node, which is clicked.
     * @param node Tissue Tree Item, which is clicked
     */
    selectNode(node) {
        if (this.selected !== node) {
            this.selected = node;
            this.selectedChange.emit(this.selected);
        }
    }
    /**
     * Resets selection and collapes all nodes of the tree.
     */
    resetSelection() {
        this.selected = undefined;
        this.control.collapseAll();
    }
    /**
     * It creates a copy of the input nodes object.
     * It iterates over it and removes all the children nodes from it.
     * @returns remaining nodes which are root nodes.
     */
    findRootNodes() {
        const { nodes } = this;
        const roots = { ...this.nodes };
        for (const key in nodes) {
            for (const child of nodes[key].children ?? []) {
                delete roots[child];
            }
        }
        return Object.values(roots);
    }
    /**
     * expands the tree nodes based on the path provided.
     * @param path is given as an input.
     */
    expandPath(path) {
        const nodes = this.control.dataNodes.filter((node) => path.includes(node.data));
        nodes.forEach((node) => this.control.expand(node));
    }
    /**
     * It used the logic of depth first search to find the target node.
     * returns the path to the target node.
     */
    dfsFindPath(nodes, target, path = []) {
        for (const node of nodes) {
            path.push(node);
            if (node === target) {
                return path;
            }
            const savedLength = path.length;
            const children = node.children?.map((id) => this.nodes[id]) ?? [];
            if (this.dfsFindPath(children, target, path).length > savedLength) {
                return path;
            }
            path.pop();
        }
        return path;
    }
    /**
     * Keyboard navigation for tissue tree list
     * @param event Keyboard event
     */
    onKeyDown(event) {
        if (!this.enableNav) {
            return;
        }
        if (this.control) {
            const nodes = this.control.dataNodes;
            const selectedIndex = this.control.dataNodes.findIndex((node) => node.data.id === this.selected?.id);
            const currentNode = nodes[selectedIndex];
            if (currentNode && currentNode.expandable) {
                const expandableNodes = nodes.filter((node) => node.expandable);
                const index = expandableNodes.indexOf(currentNode);
                if (event.key === 'ArrowLeft') {
                    this.control.collapse(currentNode);
                }
                else if (event.key === 'ArrowRight') {
                    this.control.expand(currentNode);
                }
                else if (event.key === 'ArrowDown' &&
                    index + 1 < expandableNodes.length &&
                    !this.control.isExpanded(currentNode)) {
                    this.selectNode(expandableNodes[index + 1].data);
                    return;
                }
                else if (event.key === 'ArrowUp' && index - 1 >= 0 && !this.control.isExpanded(expandableNodes[index - 1])) {
                    this.selectNode(expandableNodes[index - 1].data);
                    return;
                }
            }
            if (event.key === 'ArrowDown' && selectedIndex + 1 < nodes.length) {
                this.selectNode(nodes[selectedIndex + 1].data);
            }
            if (event.key === 'ArrowUp' && selectedIndex - 1 >= 0) {
                this.selectNode(nodes[selectedIndex - 1].data);
            }
            if (event.key === 'Enter' && !currentNode.expandable) {
                this.navigate.emit(currentNode.data);
            }
        }
    }
    /**
     * Disable keyboard nav on click
     */
    handlePageClick() {
        this.enableNav = false;
    }
    /**
     * Enables keyboard nav only if the tissue tree list is clicked
     * @param event Click event
     */
    handleListClick(event) {
        event.stopPropagation();
        this.enableNav = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TissueTreeListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: TissueTreeListComponent, isStandalone: true, selector: "ftu-tissue-tree-list", inputs: { nodes: "nodes", selected: "selected" }, outputs: { selectedChange: "selectedChange", navigate: "navigate" }, host: { listeners: { "document:keydown": "onKeyDown($event)", "document:click": "handlePageClick()", "click": "handleListClick($event)" } }, usesOnChanges: true, ngImport: i0, template: "<ng-scrollbar hraScrollOverflowFade>\n  <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"control\" class=\"tree\">\n    <mat-tree-node\n      [hraFeature]=\"node.label | slugify\"\n      *matTreeNodeDef=\"let node; let level = level\"\n      [class.selected]=\"node.data === selected\"\n      class=\"row\"\n      [class.child]=\"hasChild\"\n      tabIndex=\"0\"\n    >\n      <ng-container [ngTemplateOutlet]=\"label\" [ngTemplateOutletContext]=\"node\"> </ng-container>\n    </mat-tree-node>\n    <mat-tree-node\n      [hraFeature]=\"node.label | slugify\"\n      *matTreeNodeDef=\"let node; let level = level; when: hasChild\"\n      class=\"row\"\n      [class.selected]=\"node.data === selected\"\n      (mouseup)=\"selectNode(node.data)\"\n    >\n      <button\n        hraClickEvent\n        hraFeature=\"toggle\"\n        mat-icon-button\n        matTreeNodeToggle\n        class=\"toggle\"\n        [attr.aria-label]=\"'Toggle ' + node.label\"\n      >\n        <mat-icon class=\"material-symbols-outlined\">\n          {{ control.isExpanded(node) ? 'keyboard_arrow_up' : 'chevron_right' }}\n        </mat-icon>\n      </button>\n\n      <ng-container [hraFeature]=\"node.label | slugify\" [ngTemplateOutlet]=\"label\" [ngTemplateOutletContext]=\"node\">\n      </ng-container>\n    </mat-tree-node>\n  </mat-tree>\n</ng-scrollbar>\n\n<ng-template let-label=\"label\" let-data=\"data\" #label>\n  <div class=\"label-container\">\n    <a\n      hraClickEvent\n      [hraFeature]=\"label | slugify\"\n      *ngIf=\"data.link; else noLink\"\n      [hraLink]=\"data.link\"\n      [queryParams]=\"{ id: data.id }\"\n      class=\"link\"\n      (mouseup)=\"selectNode(data)\"\n    >\n      {{ label }}\n    </a>\n    <ng-template #noLink>\n      <span>{{ label }}</span>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: [":host{height:100%;overflow:hidden;max-width:17rem;min-width:272px;max-width:272px;--mat-tree-node-min-height: 24px;--mat-tree-node-text-color: var(--mat-sys-secondary);--mat-tree-node-text-font: var(--mat-sys-label-small-font);--mat-tree-node-text-size: var(--mat-sys-label-small-size);--mat-tree-node-text-weight: var(--mat-sys-label-small-weight)}:host ng-scrollbar{flex-grow:1}:host .tree{background-color:transparent}:host .row{min-height:unset}:host .row:first-child{margin-top:.5rem}:host .row.child{margin:0 1rem .25rem 2.5rem!important}:host .row.child.selected{background-color:rgb(from var(--mat-sys-tertiary) r g b/20%);border-radius:.25rem;padding:2px 0 2px 2px}:host .row .toggle{display:flex;align-items:center;justify-content:center;width:2.5rem;height:1.5rem}:host .row:has(.toggle):not(:first-child){border-top:.0625rem solid var(--mat-sys-outline-variant);padding-top:.25rem}:host .row .label-container{display:flex;align-items:center;min-height:1.375rem;border-radius:.25rem;width:100%;text-decoration:none;padding-left:.5rem}:host .row .label-container .link{cursor:pointer;text-decoration:none;line-height:normal;width:100%;height:100%;align-items:center;display:flex;color:var(--mat-sys-primary)}:host .row .label-container.selected{background-color:rgb(from var(--mat-sys-tertiary) r g b/33%);padding:2px 0 2px 2px}:host .row.selected .label-container .link{color:var(--mat-sys-secondary)}:host .row:focus-visible{outline:none}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatTreeModule }, { kind: "directive", type: i4.MatTreeNodeDef, selector: "[matTreeNodeDef]", inputs: ["matTreeNodeDefWhen", "matTreeNode"] }, { kind: "directive", type: i4.MatTreeNodeToggle, selector: "[matTreeNodeToggle]", inputs: ["matTreeNodeToggleRecursive"] }, { kind: "component", type: i4.MatTree, selector: "mat-tree", exportAs: ["matTree"] }, { kind: "directive", type: i4.MatTreeNode, selector: "mat-tree-node", inputs: ["tabIndex", "disabled"], outputs: ["activation", "expandedChange"], exportAs: ["matTreeNode"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "ngmodule", type: MatRippleModule }, { kind: "directive", type: LinkDirective, selector: "[hraLink]", inputs: ["hraLink", "queryParams", "queryParamsHandling", "fragment", "preserveFragment", "relativeTo"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i6.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i7.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset"] }, { kind: "ngmodule", type: ScrollingModule$1 }, { kind: "pipe", type: i8.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TissueTreeListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-tissue-tree-list', imports: [
                        HraCommonModule,
                        MatButtonModule,
                        MatTreeModule,
                        MatIconModule,
                        MatExpansionModule,
                        MatRippleModule,
                        LinkDirective,
                        ScrollingModule,
                        ScrollOverflowFadeDirective,
                        ScrollingModule$1,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-scrollbar hraScrollOverflowFade>\n  <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"control\" class=\"tree\">\n    <mat-tree-node\n      [hraFeature]=\"node.label | slugify\"\n      *matTreeNodeDef=\"let node; let level = level\"\n      [class.selected]=\"node.data === selected\"\n      class=\"row\"\n      [class.child]=\"hasChild\"\n      tabIndex=\"0\"\n    >\n      <ng-container [ngTemplateOutlet]=\"label\" [ngTemplateOutletContext]=\"node\"> </ng-container>\n    </mat-tree-node>\n    <mat-tree-node\n      [hraFeature]=\"node.label | slugify\"\n      *matTreeNodeDef=\"let node; let level = level; when: hasChild\"\n      class=\"row\"\n      [class.selected]=\"node.data === selected\"\n      (mouseup)=\"selectNode(node.data)\"\n    >\n      <button\n        hraClickEvent\n        hraFeature=\"toggle\"\n        mat-icon-button\n        matTreeNodeToggle\n        class=\"toggle\"\n        [attr.aria-label]=\"'Toggle ' + node.label\"\n      >\n        <mat-icon class=\"material-symbols-outlined\">\n          {{ control.isExpanded(node) ? 'keyboard_arrow_up' : 'chevron_right' }}\n        </mat-icon>\n      </button>\n\n      <ng-container [hraFeature]=\"node.label | slugify\" [ngTemplateOutlet]=\"label\" [ngTemplateOutletContext]=\"node\">\n      </ng-container>\n    </mat-tree-node>\n  </mat-tree>\n</ng-scrollbar>\n\n<ng-template let-label=\"label\" let-data=\"data\" #label>\n  <div class=\"label-container\">\n    <a\n      hraClickEvent\n      [hraFeature]=\"label | slugify\"\n      *ngIf=\"data.link; else noLink\"\n      [hraLink]=\"data.link\"\n      [queryParams]=\"{ id: data.id }\"\n      class=\"link\"\n      (mouseup)=\"selectNode(data)\"\n    >\n      {{ label }}\n    </a>\n    <ng-template #noLink>\n      <span>{{ label }}</span>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: [":host{height:100%;overflow:hidden;max-width:17rem;min-width:272px;max-width:272px;--mat-tree-node-min-height: 24px;--mat-tree-node-text-color: var(--mat-sys-secondary);--mat-tree-node-text-font: var(--mat-sys-label-small-font);--mat-tree-node-text-size: var(--mat-sys-label-small-size);--mat-tree-node-text-weight: var(--mat-sys-label-small-weight)}:host ng-scrollbar{flex-grow:1}:host .tree{background-color:transparent}:host .row{min-height:unset}:host .row:first-child{margin-top:.5rem}:host .row.child{margin:0 1rem .25rem 2.5rem!important}:host .row.child.selected{background-color:rgb(from var(--mat-sys-tertiary) r g b/20%);border-radius:.25rem;padding:2px 0 2px 2px}:host .row .toggle{display:flex;align-items:center;justify-content:center;width:2.5rem;height:1.5rem}:host .row:has(.toggle):not(:first-child){border-top:.0625rem solid var(--mat-sys-outline-variant);padding-top:.25rem}:host .row .label-container{display:flex;align-items:center;min-height:1.375rem;border-radius:.25rem;width:100%;text-decoration:none;padding-left:.5rem}:host .row .label-container .link{cursor:pointer;text-decoration:none;line-height:normal;width:100%;height:100%;align-items:center;display:flex;color:var(--mat-sys-primary)}:host .row .label-container.selected{background-color:rgb(from var(--mat-sys-tertiary) r g b/33%);padding:2px 0 2px 2px}:host .row.selected .label-container .link{color:var(--mat-sys-secondary)}:host .row:focus-visible{outline:none}\n"] }]
        }], propDecorators: { nodes: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], navigate: [{
                type: Output
            }], onKeyDown: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }], handlePageClick: [{
                type: HostListener,
                args: ['document:click']
            }], handleListClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/** Cell types table, describing the types and quanitites of cells for a specific organ */
class BiomarkerTableComponent {
    /**
     * Input: TissueInfo carrying the details of the tissue open
     */
    tissueInfo = {
        id: '',
        label: '',
    };
    /** Columns for the table */
    columns = [];
    /** Source list for biomarker table */
    dataSources = [];
    /** Rows of the table */
    data = [];
    /** Gradient colors along with their stop points */
    gradient = [];
    /** Taking input for the radius of the circle and the label to be displayed. */
    sizes = [];
    /** Cell id which is hovered, used for highlighting */
    highlightedCellId = '';
    /** List of cell ids in the illustration */
    illustrationIds = [];
    /** Emits cell type label when row is hovered */
    rowHover = new EventEmitter();
    /** Reference to virtual scroll viewport */
    vscroll;
    /** Reference to biomarker table */
    table;
    /** Columns replaysubject */
    columns$ = new ReplaySubject(1);
    /** Cell width (px) */
    cellWidth = 44;
    /** Extra columns to render outside the visible viewport */
    extraDisplayedColumnCount = 2;
    /** Current horizontal viewport size */
    horizontalViewportSize = 400;
    /** Current horizontal scroll offset */
    horizontalScrollOffset = 0;
    /** Current displayed column count */
    displayedColumnCount = 10;
    /** Current displayed column offset */
    displayedColumnOffset = 0;
    /** Injects BottomSheetService */
    bottomSheetService = inject(BottomSheetService);
    /** row height */
    rowHeight = 28;
    /** header height */
    headerHeight = 97;
    /** max visible rows */
    maxVisibleRows = 10;
    /**
     * Gets viewport height
     * @returns viewport height in pixels
     */
    get viewportHeight() {
        const rows = this.dataSource.data.length;
        const visible = Math.min(rows, this.maxVisibleRows) + 1; // offset
        return this.headerHeight + visible * this.rowHeight;
    }
    /** Gets the current width of the prefiller column */
    get preFillerWidth() {
        return `${this.cellWidth * this.displayedColumnOffset}px`;
    }
    /** Gets the current width of the postfiller column */
    get postFillerWidth() {
        const count = this.columns.length - this.displayedColumnCount - this.displayedColumnOffset;
        return `${this.cellWidth * count}px`;
    }
    /** Source for the table */
    dataSource = new TableVirtualScrollDataSource([]);
    /** Change detection */
    cdr = inject(ChangeDetectorRef);
    /**
     * Subscribes to scroll event on virtual scroll viewport and checks displayed columns
     */
    ngOnInit() {
        const scroll$ = this.vscroll.scrollable.elementScrolled();
        scroll$.subscribe(() => this.checkDisplayedColumns());
        this.vscroll.checkViewportSize();
    }
    /**
     * Sets the data source for the table on every change
     * Sorts the biomarker table on illustrationIds change
     * @param changes object consisting of change in the Input
     */
    ngOnChanges(changes) {
        this.checkDisplayedColumns('columns' in changes);
        if ('data' in changes || 'illustrationIds' in changes) {
            this.dataSource.data = this.sortTableData(this.data);
        }
    }
    /**
     * Checks for column updates on mouse move
     */
    onMouseMove() {
        this.checkDisplayedColumns();
    }
    /**
     * Returns index value
     */
    trackByIndex(index) {
        return index;
    }
    /**
     * Checks to see if columns should be updated
     */
    checkDisplayedColumns(forceUpdate = false) {
        // Ensure viewport size is up to date
        this.vscroll.checkViewportSize();
        const scrollable = this.vscroll.scrollable;
        const size = scrollable.measureViewportSize('horizontal');
        const offset = scrollable.measureScrollOffset('start');
        let shouldUpdate = forceUpdate;
        if (size !== this.horizontalViewportSize) {
            this.updateHorizontalViewportSize(size);
            shouldUpdate = true;
        }
        if (offset !== this.horizontalScrollOffset) {
            this.updateHorizontalViewportOffset(offset);
            shouldUpdate = true;
        }
        if (shouldUpdate) {
            this.updateColumns();
        }
    }
    /**
     * Opens bottom sheet
     * @param cellData
     */
    openBottomSheet(cellData) {
        const row = this.dataSource.data.find((r) => r.slice(2).some((cell) => cell === cellData));
        if (!row) {
            return;
        }
        const cellIndex = row.indexOf(cellData);
        if (cellIndex === -1) {
            return;
        }
        const hoverData = this.getHoverData([cellIndex, row]);
        const rows = hoverData.flat().map((item) => ({
            property: item.label,
            value: item.value,
        }));
        const columns = [
            { column: 'property', label: 'Property', type: 'text' },
            { column: 'value', label: 'Value', type: 'text' },
        ];
        this.bottomSheetService.openTableBottomSheet(rows, columns, true);
    }
    /**
     * Updates horizontal viewport size and updates displayed column count
     */
    updateHorizontalViewportSize(size) {
        this.horizontalViewportSize = size;
        this.displayedColumnCount =
            Math.ceil(this.horizontalViewportSize / this.cellWidth) + this.extraDisplayedColumnCount;
    }
    /**
     * Updates horizontal viewport offset and updates displayed column offset
     */
    updateHorizontalViewportOffset(offset) {
        this.horizontalScrollOffset = offset;
        this.displayedColumnOffset = Math.max(Math.floor(offset / this.cellWidth) - this.extraDisplayedColumnCount / 2, 0);
    }
    /**
     * Updates table columns with prefiller and postfiller columns
     */
    updateColumns() {
        const { displayedColumnCount, displayedColumnOffset } = this;
        const columns = ['type', 'count'];
        if (this.displayedColumnOffset > 0) {
            columns.push('preFiller');
        }
        const displayedColumns = this.columns.slice(displayedColumnOffset, displayedColumnOffset + displayedColumnCount);
        columns.push(...displayedColumns);
        if (displayedColumnOffset + displayedColumnCount < this.columns.length) {
            columns.push('postFiller');
        }
        this.columns$.next(columns);
        this.cdr.detectChanges();
    }
    /**
     * Sorts table by cell type alphabetically, then puts cells that are in the illustration on top
     */
    sortTableData(data) {
        const illustrationIdsSet = new Set(this.illustrationIds);
        const inIllustration = new Map();
        for (const row of data) {
            const id = this.getHoverId(row);
            inIllustration.set(row, illustrationIdsSet.has(id));
        }
        return [...data].sort((row1, row2) => {
            const in1 = inIllustration.get(row1);
            const in2 = inIllustration.get(row2);
            if (in1 && !in2) {
                return -1;
            }
            else if (!in1 && in2) {
                return 1;
            }
            return row1[0].localeCompare(row2[0]);
        });
    }
    /**
     * Returns true if id matches the cell id of the row
     * @param row Highlighted row
     */
    isHighlighted(row) {
        return this.getHoverId(row) === this.highlightedCellId;
    }
    /**
     * Gets hover id from row
     * @param data row data
     * @returns cell type id
     */
    getHoverId(data) {
        const entry = data.slice(2).find((item) => item);
        return entry?.data.cell;
    }
    /** Lerp function to give value beween min and max value based on the given value
     *
     * @param value
     * @param min
     * @param max
     * @returns
     */
    lerp(value, min, max) {
        return min * (1 - value) + max * value;
    }
    /**
     * Converts HexCode to RGB
     * @param hex
     * @returns
     */
    hex2rgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }
    /**
     * Gets Min and Max color grade based on the meanExpression value
     * @param meanExpression
     * @returns
     */
    getMinMaxColor(meanExpression) {
        const index = this.gradient.findIndex((item, i, arr) => {
            return meanExpression >= item.percentage && meanExpression <= arr[i + 1]?.percentage;
        });
        const minColor = this.hex2rgb(this.gradient[index]?.color ?? this.gradient[0].color);
        const maxColor = this.hex2rgb(this.gradient[index + 1].color);
        return { minColor, maxColor };
    }
    /**
     * Gets Min and Max size grade based on the Percentage value
     * @param percentage
     * @returns
     */
    getMinMaxSize(percentage) {
        const index = this.sizes.findIndex((item, i, arr) => {
            return percentage >= parseFloat(item.label) / 100 && percentage <= parseFloat(arr[i + 1]?.label) / 100;
        });
        const minSize = this.sizes[index]?.radius;
        const maxSize = this.sizes[index + 1].radius;
        return { minSize, maxSize };
    }
    /**
     * Calculates the color of this value on this gradient
     * @param value
     * @returns
     */
    getColor(value) {
        const { minColor, maxColor } = this.getMinMaxColor(value * 100);
        return ('#' +
            minColor
                .map((min, index) => this.lerp(value, min, maxColor[index]))
                .map((component) => {
                const hex = Math.round(component).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
                .join(''));
    }
    /**
     * gets Size of the Cell based on the percentage value
     * @param value
     * @returns
     */
    getSize(value) {
        const { minSize, maxSize } = this.getMinMaxSize(value);
        return this.lerp(value, minSize, maxSize);
    }
    /**
     * Processes the object for hover data for Table Cell
     * @param index index of the row of the datasource
     * @param row row of the datasource
     * @returns
     */
    getHoverData([index, row]) {
        if (row[index] === undefined) {
            return [];
        }
        const { tissueInfo: { id, label }, } = this;
        const { data: { cell, biomarker, meanExpression, dataset_count }, } = row[index];
        return [
            [
                { label: 'Functional Tissue Unit Name', value: label },
                { label: 'Uberon ID', value: id },
                { label: '#Datasets', value: `${dataset_count ?? 0}` },
            ],
            [
                { label: 'Cell Type Name', value: row[0] },
                { label: 'CL ID', value: cell },
                { label: 'Number of Cells', value: `${row[1]}` },
            ],
            [
                { label: 'Gene Name', value: this.columns[index - 2] },
                { label: 'HGNC ID', value: biomarker },
                { label: 'Mean Expression Value', value: meanExpression.toFixed(6) },
            ],
        ];
    }
    /**
     * Sets and emits cell type id on row hover
     * @param hoverId cell type id
     */
    setHoverId(hoverId) {
        this.highlightedCellId = hoverId ?? '';
        this.rowHover.emit(hoverId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: BiomarkerTableComponent, isStandalone: true, selector: "ftu-biomarker-table", inputs: { tissueInfo: "tissueInfo", columns: "columns", dataSources: "dataSources", data: "data", gradient: "gradient", sizes: "sizes", highlightedCellId: "highlightedCellId", illustrationIds: "illustrationIds" }, outputs: { rowHover: "rowHover" }, host: { listeners: { "window:mousemove": "onMouseMove($event)" } }, viewQueries: [{ propertyName: "vscroll", first: true, predicate: CdkVirtualScrollViewport, descendants: true, static: true }, { propertyName: "table", first: true, predicate: ["table"], descendants: true, read: ElementRef, static: true }], usesOnChanges: true, ngImport: i0, template: "<!-- eslint-disable @angular-eslint/template/mouse-events-have-key-events -->\n<cdk-virtual-scroll-viewport\n  hraFeature=\"biomarker-table\"\n  [tvsItemSize]=\"rowHeight\"\n  [headerHeight]=\"headerHeight\"\n  [style.height.px]=\"viewportHeight\"\n>\n  <table class=\"table\" mat-table [dataSource]=\"dataSource\" #table>\n    <ng-container matColumnDef=\"type\" sticky>\n      <th mat-header-cell *matHeaderCellDef>Cell types</th>\n      <td\n        class=\"type\"\n        mat-cell\n        *matCellDef=\"let element\"\n        [class.highlight]=\"isHighlighted(element)\"\n        [hraPlainTooltip]=\"element[0]\"\n      >\n        {{ element[0] }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"count\" sticky>\n      <th class=\"count\" mat-header-cell *matHeaderCellDef>#Cells</th>\n      <td class=\"count\" mat-cell *matCellDef=\"let element\" [class.highlight]=\"isHighlighted(element)\">\n        {{ element[1] !== undefined ? (element[1] | number) : 'no data' }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"preFiller\">\n      <th mat-header-cell *matHeaderCellDef></th>\n      <td mat-cell *matCellDef=\"let element\" style=\"max-width: unset\">\n        <div [style.width]=\"preFillerWidth\"></div>\n      </td>\n    </ng-container>\n\n    @for (column of columns; track column; let index = $index) {\n      <ng-container [matColumnDef]=\"column\">\n        <th class=\"icon-header\" mat-header-cell *matHeaderCellDef [hraPlainTooltip]=\"column\">\n          <div class=\"header-column-text\">\n            {{ column }}\n          </div>\n        </th>\n\n        <td\n          hraFeature=\"open-biomarker-bottom-sheet\"\n          hraClickEvent\n          class=\"icon-cell\"\n          mat-cell\n          *matCellDef=\"let element\"\n          [class.highlight]=\"isHighlighted(element)\"\n          (click)=\"openBottomSheet(element[index + 2])\"\n          style=\"cursor: pointer\"\n        >\n          @if (element[index + 2] !== undefined) {\n            <ftu-biomarker-table-data-icon\n              class=\"icon\"\n              [color]=\"getColor(element[index + 2].color)\"\n              [size]=\"getSize(element[index + 2].size)\"\n            >\n            </ftu-biomarker-table-data-icon>\n          } @else {\n            <div class=\"empty\"></div>\n          }\n        </td>\n      </ng-container>\n    }\n\n    <ng-container matColumnDef=\"postFiller\">\n      <th mat-header-cell *matHeaderCellDef></th>\n      <td mat-cell *matCellDef=\"let element\" style=\"max-width: unset\">\n        <div [style.width]=\"postFillerWidth\"></div>\n      </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"(columns$ | async) ?? []; sticky: true\" class=\"column-header-row\"></tr>\n    <tr\n      mat-row\n      *matRowDef=\"let row; columns: (columns$ | async) ?? []\"\n      (mouseover)=\"setHoverId(getHoverId(row))\"\n      (mouseout)=\"setHoverId(undefined)\"\n    ></tr>\n  </table>\n</cdk-virtual-scroll-viewport>\n", styles: [":host{display:block;position:relative;width:100%;table-layout:fixed;--mat-table-header-container-height: 6rem;--mat-table-header-headline-color: var(--mat-sys-secondary);--mat-table-header-headline-font: var(--mat-sys-label-small-font);--mat-table-header-headline-size: var(--mat-sys-label-small-size);--mat-table-header-headline-weight: var(--mat-sys-label-small-weight);--mat-table-row-item-container-height: 1.75rem;--mat-table-row-item-label-text-color: var(--mat-sys-primary);--mat-table-row-item-label-text-font: var(--mat-sys-label-small-font);--mat-table-row-item-label-text-size: var(--mat-sys-label-small-size);--mat-table-row-item-label-text-weight: var(--mat-sys-label-small-weight);--mat-button-toggle-divider-color: 1px solid var(--mat-sys-primary);--mat-button-toggle-disabled-state-text-color: rgb(from var(--mat-sys-secondary) r g b/38%);--mat-button-toggle-height: 2rem;--mat-button-toggle-label-text-font: var(--mat-sys-label-medium-font);--mat-button-toggle-label-text-line-height: 1.3125rem;--mat-button-toggle-label-text-size: .875rem;--mat-button-toggle-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-selected-state-background-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-button-toggle-selected-state-text-color: var(--mat-sys-secondary)}:host cdk-virtual-scroll-viewport{width:100%}:host .absolute-toggle{position:absolute;top:1rem;left:1rem;z-index:1000;width:14.625rem;border:1px solid var(--mat-sys-primary);border-radius:6px;overflow:hidden;display:flex}:host .absolute-toggle .mat-button-toggle{flex:1;font-weight:var(--mat-sys-label-medium-weight);text-transform:none;transition:all .2s ease;height:100%;display:flex;align-items:center;justify-content:center}:host .absolute-toggle .mat-button-toggle:not(:first-child){border-left:1px solid var(--mat-sys-outline-variant)}:host .absolute-toggle .mat-button-toggle .mat-button-toggle-label-content{line-height:1;padding:0}:host .table{background-color:var(--mat-sys-surface-container-low);width:100%}:host .table .highlight:first-child,:host .table .highlight:nth-child(2){background-color:color-mix(in srgb,white,var(--mat-sys-secondary) 8%)}:host .table td.type{text-transform:capitalize}:host .table th{padding:0;border-bottom:1px solid var(--mat-sys-outline-variant);background-color:var(--mat-sys-surface-container-low)}:host .table th:first-child{max-width:164px;min-width:164px;width:164px}:host .table th:nth-child(2){max-width:120px;min-width:120px;width:120px;text-align:right}:host .table td{border-bottom:none}:host .table td:first-child,:host .table td:nth-child(2){background:var(--mat-sys-surface-container-low)}:host .table td:nth-child(2){padding-left:0!important;padding-right:30px;max-width:120px}:host .table td:not(:first-child):not(:nth-child(2)){background-color:var(--mat-sys-on-primary)}:host .table tr:first-child td:first-child{max-width:164px}:host .table tr:first-child td:nth-child(2){max-width:120px}:host .type{height:1.75rem;max-width:164px;white-space:nowrap;padding:0 .5rem 0 1rem}:host .count{height:1.75rem;min-width:4.25rem;max-width:120px;border-right:1px solid var(--mat-sys-outline-variant);text-align:right}:host th:first-child,:host th:nth-child(2){vertical-align:bottom}:host th:first-child{padding:4px 12px 4px 16px!important}:host th:nth-child(2){padding:4px 30px 4px 0!important;max-width:120px}:host .icon-header .header-column-text{max-width:28px;writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:auto;max-height:calc(6rem - 16px)}:host .icon-cell .icon{margin:auto}::ng-deep hra-bottom-sheet hra-table tr td:first-child{color:var(--mat-sys-secondary)!important;border-right:1px solid var(--mat-sys-outline-variant)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatTableModule }, { kind: "component", type: i2$1.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i2$1.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i2$1.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i2$1.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i2$1.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i2$1.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i2$1.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i2$1.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i2$1.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i2$1.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: BiomarkerTableDataIconComponent, selector: "ftu-biomarker-table-data-icon", inputs: ["color", "size"] }, { kind: "ngmodule", type: ScrollingModule$1 }, { kind: "component", type: i2.ɵɵCdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "ngmodule", type: TableVirtualScrollModule }, { kind: "directive", type: i4$1.TableItemSizeDirective, selector: "cdk-virtual-scroll-viewport[tvsItemSize]", inputs: ["tvsItemSize", "headerEnabled", "headerHeight", "footerEnabled", "footerHeight", "bufferMultiplier"] }, { kind: "ngmodule", type: MatButtonToggleModule }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "pipe", type: i1$2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$2.DecimalPipe, name: "number" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-biomarker-table', imports: [
                        HraCommonModule,
                        MatTableModule,
                        BiomarkerTableDataIconComponent,
                        ScrollingModule$1,
                        TableVirtualScrollModule,
                        MatButtonToggleModule,
                        PlainTooltipDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- eslint-disable @angular-eslint/template/mouse-events-have-key-events -->\n<cdk-virtual-scroll-viewport\n  hraFeature=\"biomarker-table\"\n  [tvsItemSize]=\"rowHeight\"\n  [headerHeight]=\"headerHeight\"\n  [style.height.px]=\"viewportHeight\"\n>\n  <table class=\"table\" mat-table [dataSource]=\"dataSource\" #table>\n    <ng-container matColumnDef=\"type\" sticky>\n      <th mat-header-cell *matHeaderCellDef>Cell types</th>\n      <td\n        class=\"type\"\n        mat-cell\n        *matCellDef=\"let element\"\n        [class.highlight]=\"isHighlighted(element)\"\n        [hraPlainTooltip]=\"element[0]\"\n      >\n        {{ element[0] }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"count\" sticky>\n      <th class=\"count\" mat-header-cell *matHeaderCellDef>#Cells</th>\n      <td class=\"count\" mat-cell *matCellDef=\"let element\" [class.highlight]=\"isHighlighted(element)\">\n        {{ element[1] !== undefined ? (element[1] | number) : 'no data' }}\n      </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"preFiller\">\n      <th mat-header-cell *matHeaderCellDef></th>\n      <td mat-cell *matCellDef=\"let element\" style=\"max-width: unset\">\n        <div [style.width]=\"preFillerWidth\"></div>\n      </td>\n    </ng-container>\n\n    @for (column of columns; track column; let index = $index) {\n      <ng-container [matColumnDef]=\"column\">\n        <th class=\"icon-header\" mat-header-cell *matHeaderCellDef [hraPlainTooltip]=\"column\">\n          <div class=\"header-column-text\">\n            {{ column }}\n          </div>\n        </th>\n\n        <td\n          hraFeature=\"open-biomarker-bottom-sheet\"\n          hraClickEvent\n          class=\"icon-cell\"\n          mat-cell\n          *matCellDef=\"let element\"\n          [class.highlight]=\"isHighlighted(element)\"\n          (click)=\"openBottomSheet(element[index + 2])\"\n          style=\"cursor: pointer\"\n        >\n          @if (element[index + 2] !== undefined) {\n            <ftu-biomarker-table-data-icon\n              class=\"icon\"\n              [color]=\"getColor(element[index + 2].color)\"\n              [size]=\"getSize(element[index + 2].size)\"\n            >\n            </ftu-biomarker-table-data-icon>\n          } @else {\n            <div class=\"empty\"></div>\n          }\n        </td>\n      </ng-container>\n    }\n\n    <ng-container matColumnDef=\"postFiller\">\n      <th mat-header-cell *matHeaderCellDef></th>\n      <td mat-cell *matCellDef=\"let element\" style=\"max-width: unset\">\n        <div [style.width]=\"postFillerWidth\"></div>\n      </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"(columns$ | async) ?? []; sticky: true\" class=\"column-header-row\"></tr>\n    <tr\n      mat-row\n      *matRowDef=\"let row; columns: (columns$ | async) ?? []\"\n      (mouseover)=\"setHoverId(getHoverId(row))\"\n      (mouseout)=\"setHoverId(undefined)\"\n    ></tr>\n  </table>\n</cdk-virtual-scroll-viewport>\n", styles: [":host{display:block;position:relative;width:100%;table-layout:fixed;--mat-table-header-container-height: 6rem;--mat-table-header-headline-color: var(--mat-sys-secondary);--mat-table-header-headline-font: var(--mat-sys-label-small-font);--mat-table-header-headline-size: var(--mat-sys-label-small-size);--mat-table-header-headline-weight: var(--mat-sys-label-small-weight);--mat-table-row-item-container-height: 1.75rem;--mat-table-row-item-label-text-color: var(--mat-sys-primary);--mat-table-row-item-label-text-font: var(--mat-sys-label-small-font);--mat-table-row-item-label-text-size: var(--mat-sys-label-small-size);--mat-table-row-item-label-text-weight: var(--mat-sys-label-small-weight);--mat-button-toggle-divider-color: 1px solid var(--mat-sys-primary);--mat-button-toggle-disabled-state-text-color: rgb(from var(--mat-sys-secondary) r g b/38%);--mat-button-toggle-height: 2rem;--mat-button-toggle-label-text-font: var(--mat-sys-label-medium-font);--mat-button-toggle-label-text-line-height: 1.3125rem;--mat-button-toggle-label-text-size: .875rem;--mat-button-toggle-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-selected-state-background-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-button-toggle-selected-state-text-color: var(--mat-sys-secondary)}:host cdk-virtual-scroll-viewport{width:100%}:host .absolute-toggle{position:absolute;top:1rem;left:1rem;z-index:1000;width:14.625rem;border:1px solid var(--mat-sys-primary);border-radius:6px;overflow:hidden;display:flex}:host .absolute-toggle .mat-button-toggle{flex:1;font-weight:var(--mat-sys-label-medium-weight);text-transform:none;transition:all .2s ease;height:100%;display:flex;align-items:center;justify-content:center}:host .absolute-toggle .mat-button-toggle:not(:first-child){border-left:1px solid var(--mat-sys-outline-variant)}:host .absolute-toggle .mat-button-toggle .mat-button-toggle-label-content{line-height:1;padding:0}:host .table{background-color:var(--mat-sys-surface-container-low);width:100%}:host .table .highlight:first-child,:host .table .highlight:nth-child(2){background-color:color-mix(in srgb,white,var(--mat-sys-secondary) 8%)}:host .table td.type{text-transform:capitalize}:host .table th{padding:0;border-bottom:1px solid var(--mat-sys-outline-variant);background-color:var(--mat-sys-surface-container-low)}:host .table th:first-child{max-width:164px;min-width:164px;width:164px}:host .table th:nth-child(2){max-width:120px;min-width:120px;width:120px;text-align:right}:host .table td{border-bottom:none}:host .table td:first-child,:host .table td:nth-child(2){background:var(--mat-sys-surface-container-low)}:host .table td:nth-child(2){padding-left:0!important;padding-right:30px;max-width:120px}:host .table td:not(:first-child):not(:nth-child(2)){background-color:var(--mat-sys-on-primary)}:host .table tr:first-child td:first-child{max-width:164px}:host .table tr:first-child td:nth-child(2){max-width:120px}:host .type{height:1.75rem;max-width:164px;white-space:nowrap;padding:0 .5rem 0 1rem}:host .count{height:1.75rem;min-width:4.25rem;max-width:120px;border-right:1px solid var(--mat-sys-outline-variant);text-align:right}:host th:first-child,:host th:nth-child(2){vertical-align:bottom}:host th:first-child{padding:4px 12px 4px 16px!important}:host th:nth-child(2){padding:4px 30px 4px 0!important;max-width:120px}:host .icon-header .header-column-text{max-width:28px;writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:auto;max-height:calc(6rem - 16px)}:host .icon-cell .icon{margin:auto}::ng-deep hra-bottom-sheet hra-table tr td:first-child{color:var(--mat-sys-secondary)!important;border-right:1px solid var(--mat-sys-outline-variant)}\n"] }]
        }], propDecorators: { tissueInfo: [{
                type: Input
            }], columns: [{
                type: Input
            }], dataSources: [{
                type: Input
            }], data: [{
                type: Input
            }], gradient: [{
                type: Input
            }], sizes: [{
                type: Input
            }], highlightedCellId: [{
                type: Input
            }], illustrationIds: [{
                type: Input
            }], rowHover: [{
                type: Output
            }], vscroll: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { static: true }]
            }], table: [{
                type: ViewChild,
                args: ['table', { static: true, read: ElementRef }]
            }], onMouseMove: [{
                type: HostListener,
                args: ['window:mousemove', ['$event']]
            }] } });

/**
 * PlaceHolder for Empty Tissue Info
 */
const EMPTY_TISSUE_INFO$1 = {
    id: '',
    label: '',
};
/** The component displays the biomarker details which includes the details, gradient legends, size legends and source lists*/
class BiomarkerDetailsComponent {
    /** Reference to biomarker table */
    table;
    /** Tooltip text for percentage of cells legend */
    static PERCENTAGE_TOOLTIP_TEXT = 'The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.';
    /** Tooltip text for biomarker expression mean legend */
    static EXPRESSION_TOOLTIP_TEXT = 'Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.';
    /** Instance access to percentage tooltip text */
    percentageTooltipText = BiomarkerDetailsComponent.PERCENTAGE_TOOLTIP_TEXT;
    /** Instance access to expression tooltip text */
    expressionTooltipText = BiomarkerDetailsComponent.EXPRESSION_TOOLTIP_TEXT;
    /** Table tabs */
    getTabs = selectSnapshot(CellSummarySelectors.aggregates);
    /** Info to be shown on the tooltip for Gradient Legend */
    gradientHoverInfo = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.GradientLegendInfo);
    /** Info to be shown on the tooltip for Size Legend */
    sizeHoverInfo = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.SizeLegendInfo);
    /** Indicates if the table is fully shown, defaults to false*/
    isTableFullScreen = false;
    /** Gradient colors along with their stop points */
    gradients = (selectQuerySnapshot(ResourceRegistrySelectors.field, ResourceIds.GradientLegend, ResourceTypes.Gradient, 'points', []));
    /** Taking input for the radius of the circle and the label to be displayed. */
    sizes = (selectQuerySnapshot(ResourceRegistrySelectors.field, ResourceIds.SizeLegend, ResourceTypes.Size, 'sizes', []));
    /** List of sources with titles and links displayed to the user */
    source = selectSnapshot(SourceRefsSelectors.sourceReferences);
    /**
     * Iri  of medical illustration behavior component
     */
    iri = selectSnapshot(ActiveFtuSelectors.iri);
    /**
     * Get all tissues
     */
    tissues = selectSnapshot(TissueLibrarySelectors.tissues);
    /** Selects the cells hovered currently to highlight in table */
    selectedOnHovered = selectSnapshot(IllustratorSelectors.selectedOnHovered);
    /** Illustration mapping data */
    mapping = selectSnapshot(IllustratorSelectors.mapping);
    /** Action to highlight a cell type */
    highlightCell = dispatch(IllustratorActions.HighlightCellType);
    /** Action to set selected sources */
    setSelectedSources = dispatch(SourceRefsActions.SetSelectedSources);
    /** List of selected sources */
    selectedSources = signal([], ...(ngDevMode ? [{ debugName: "selectedSources" }] : []));
    /** Active tab index */
    activeTabIndex = 0;
    /** Fullscreen service */
    fullscreenService = inject(FtuFullScreenService);
    /**
     * Determines whether biomarkerfullscreen is in fullscreen mode
     */
    isBiomarkerfullscreen = this.fullscreenService.isFullscreen;
    /**
     * View child of source list component
     */
    sourceListRef;
    /**
     * Source list template of biomarker details component
     */
    sourceListTemplate = output();
    ngAfterViewInit() {
        if (this.sourceListRef) {
            this.sourceListTemplate.emit(this.sourceListRef);
        }
    }
    /** Table tabs */
    get tab() {
        const tabs = this.getTabs();
        return tabs[this.activeTabIndex] ?? { label: '', columns: [], rows: [] };
    }
    /** Toggle options for the biomarker table */
    toggleOptions = [
        { value: 'genes', label: 'Genes' },
        { value: 'proteins', label: 'Proteins' },
        { value: 'lipids', label: 'Lipids' },
    ];
    /** Selected toggle value */
    selectedToggleValue = 'genes';
    /**
     * Handle toggle change from biomarker table
     * @param value selected toggle value
     */
    onToggleChange(value) {
        const index = this.toggleOptions.findIndex((option) => option.value === value);
        if (index !== -1) {
            this.activeTabIndex = index;
        }
    }
    /**
     * Determines if a toggle option is disabled.
     * @param index index of the toggle option
     * @returns true if the toggle option is disabled, false otherwise
     */
    isToggleOptionDisabled(index) {
        const tab = this.getTabs()[index] ?? { label: '', columns: [], rows: [] };
        return tab ? tab.rows.length === 0 : true;
    }
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueInfo() {
        const iri = this.iri();
        const tissues = this.tissues();
        if (iri === undefined || tissues === undefined) {
            return EMPTY_TISSUE_INFO$1;
        }
        const { id, label } = tissues[iri];
        return { id, label };
    }
    /**
     * Gets ids for cells in the illustration
     */
    get illustrationIds() {
        const mapping = this.mapping();
        if (mapping !== this.mapping_) {
            this.mapping_ = mapping;
            this.illustrationIds_ = Array.from(new Set(this.mapping().map((data) => data.ontologyId)));
        }
        return this.illustrationIds_;
    }
    /**
     * button text of empty biomarker component.
     */
    collaborateText = 'Collaborate with the HRA Team';
    /** A dispatcher function to set the screen mode */
    setScreenMode = dispatch(ScreenModeAction.Set);
    /** Table tabs */
    tabs_ = [];
    /** Mapping items reference */
    mapping_ = [];
    /** Illustration ids reference */
    illustrationIds_ = [];
    /**
     * Track a tab by it's label
     *
     * @param _index Unused index of tab
     * @param tab Tab data
     */
    trackByLabel(_index, tab) {
        return tab.label;
    }
    /** A function that toggles isTableFullScreen and
     * calls the setScreenMode function.
     */
    toggleFullscreen() {
        setTimeout(() => {
            this.table.checkDisplayedColumns();
        }, 250);
        this.isTableFullScreen = !this.isTableFullScreen;
        this.fullscreenService.fullscreentabIndex.set(FullscreenTab.BiomarkerDetails);
        this.fullscreenService.isFullscreen.set(this.isTableFullScreen);
        this.setScreenMode(this.isTableFullScreen);
    }
    /**
     * Highlights cells matching the label
     * @param event
     */
    highlightCells(label) {
        this.highlightCell(label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerDetailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: BiomarkerDetailsComponent, isStandalone: true, selector: "ftu-biomarker-details", outputs: { sourceListTemplate: "sourceListTemplate" }, host: { properties: { "class.full-screen-grid": "isBiomarkerfullscreen()", "class.no-data-full-screen-grid": "source().length === 0 && isBiomarkerfullscreen()", "class.no-data-sources": "source().length === 0 && !isBiomarkerfullscreen()", "class.no-data": "(source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) && !isBiomarkerfullscreen()", "class.no-data-selected": "source().length > 0 && selectedSources().length === 0 && !isBiomarkerfullscreen()" } }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }, { propertyName: "sourceListRef", first: true, predicate: ["sourceList"], descendants: true, static: true }], ngImport: i0, template: "<ng-container hraFeature=\"biomarker-details\">\n  @if (!isBiomarkerfullscreen()) {\n    <div hraFeature=\"header\" class=\"biomarker-header\">\n      <span class=\"biomarker-header-title\">Cell types by biomarkers</span>\n      @if (tab.rows.length !== 0) {\n        <button\n          hraFeature=\"open-fullscreen\"\n          hraClickEvent\n          mat-icon-button\n          hraIconButtonSize=\"large\"\n          hraPlainTooltip=\"Open in full screen\"\n          (click)=\"toggleFullscreen()\"\n        >\n          <mat-icon>fullscreen</mat-icon>\n        </button>\n      }\n    </div>\n  }\n\n  <mat-button-toggle-group\n    hraFeature=\"biomarker-toggle\"\n    class=\"biomarker-toggle-group absolute-toggle\"\n    hraButtonToggleSize=\"medium\"\n    [value]=\"tab.rows.length !== 0 ? selectedToggleValue : null\"\n    (change)=\"onToggleChange($event.value)\"\n  >\n    @for (option of toggleOptions; track option.value) {\n      <mat-button-toggle\n        [hraClickEvent]=\"{ toggle: option.value }\"\n        [value]=\"option.value\"\n        [disabled]=\"isToggleOptionDisabled($index)\"\n      >\n        {{ option.label }}\n      </mat-button-toggle>\n    }\n  </mat-button-toggle-group>\n\n  @if (tab.rows.length !== 0) {\n    <ftu-biomarker-table\n      #table\n      [class.small]=\"tab.rows.length < 10\"\n      [data]=\"$any(tab.rows)\"\n      [columns]=\"tab.columns\"\n      [gradient]=\"gradients()\"\n      [sizes]=\"sizes()\"\n      [tissueInfo]=\"tissueInfo\"\n      [illustrationIds]=\"illustrationIds\"\n      [dataSources]=\"source()\"\n      [highlightedCellId]=\"selectedOnHovered()?.ontologyId ?? ''\"\n      (rowHover)=\"highlightCells($event)\"\n    ></ftu-biomarker-table>\n  }\n\n  @if (source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) {\n    @if (!isBiomarkerfullscreen()) {\n      <mat-divider class=\"empty-state-divider\"></mat-divider>\n    }\n    <ftu-empty-biomarker\n      emptyBehaviorText=\"We currently do not have cell type data for the selected biomarker.\"\n    ></ftu-empty-biomarker>\n  }\n\n  @if (source().length > 0 && selectedSources().length === 0) {\n    <div class=\"select-data-message\">\n      <hra-info-message-indicator> Select source data to view cell types by biomarkers. </hra-info-message-indicator>\n    </div>\n  }\n\n  @if (tab.rows.length > 0) {\n    <div class=\"legend\" hraFeature=\"legends\">\n      <button\n        hraClickEvent\n        hraFeature=\"percentage\"\n        class=\"legend-percentage\"\n        [hraRichTooltip]\n        hraRichTooltipTagline=\"Percentage of cells\"\n        [hraRichTooltipDescription]=\"percentageTooltipText\"\n      >\n        <span class=\"legend-header-percentage\">Percentage of cells</span>\n        <ftu-size-legend [sizes]=\"sizes()\" class=\"content\"></ftu-size-legend>\n      </button>\n      <button\n        hraClickEvent\n        hraFeature=\"expression\"\n        class=\"legend-gradient\"\n        [hraRichTooltip]\n        hraRichTooltipTagline=\"Biomarker expression mean\"\n        [hraRichTooltipDescription]=\"expressionTooltipText\"\n      >\n        <span class=\"legend-header-gradient\">Biomarker expression mean</span>\n        <ftu-gradient-legend [gradient]=\"gradients()\" class=\"content\"></ftu-gradient-legend>\n      </button>\n    </div>\n  }\n\n  @if (!(source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) {\n    <div class=\"source-list\" [style.display]=\"isBiomarkerfullscreen() ? 'none' : undefined\">\n      <ftu-source-list\n        [sources]=\"source()\"\n        (selectionChanged)=\"setSelectedSources($event); selectedSources.set($event)\"\n        class=\"content\"\n      ></ftu-source-list>\n    </div>\n  }\n\n  <ng-template #infoTooltip let-tooltip>\n    <div class=\"biomarker-details info-tooltip\">\n      {{ tooltip }}\n    </div>\n  </ng-template>\n\n  <ng-template #sourceList>\n    <ftu-source-list\n      [sources]=\"source()\"\n      (selectionChanged)=\"setSelectedSources($event)\"\n      class=\"content\"\n      [hideTitle]=\"true\"\n    ></ftu-source-list>\n  </ng-template>\n</ng-container>\n", styles: [":host{border-left:.0625rem solid var(--mat-sys-outline-variant);display:grid;grid-template-columns:1fr 1fr;grid-template-rows:4rem auto 1fr;grid-template-areas:\"headline legend-area\" \"table table\" \"source-list source-list\";gap:.0625rem;background-color:var(--mat-sys-outline-variant);--mat-button-toggle-divider-color: 1px solid var(--mat-sys-primary);--mat-button-toggle-disabled-state-text-color: rgb(from var(--mat-sys-secondary) r g b/38%);--mat-button-toggle-height: 2rem;--mat-button-toggle-label-text-font: var(--mat-sys-label-medium-font);--mat-button-toggle-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-button-toggle-label-text-size: var(--mat-sys-label-medium-size);--mat-button-toggle-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-selected-state-background-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-button-toggle-selected-state-text-color: var(--mat-sys-secondary)}:host>*{background-color:var(--mat-sys-surface-container-lowest)}:host .biomarker-header{grid-area:headline;display:flex;flex-direction:row;align-items:center;justify-content:space-between;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);padding:12px 16px}:host.full-screen-grid{grid-template-columns:1fr;grid-template-rows:4rem auto;grid-template-areas:\"legend-area\" \"table\"}:host.full-screen-grid .legend .legend-percentage{width:284px;max-width:284px;min-width:284px;flex-grow:0}:host.full-screen-grid .legend .legend-gradient{align-items:flex-start;padding-left:1rem}:host.full-screen-grid .legend .legend-gradient .legend-header-gradient{margin-left:1.55rem}:host.full-screen-grid .legend .legend-gradient .content{align-self:flex-start}:host ::ng-deep ftu-empty-biomarker .footer{border-top:.0625rem solid var(--mat-sys-outline-variant)}:host.no-data-full-screen-grid{grid-template-rows:1fr;grid-template-areas:\"empty\"}:host.no-data-full-screen-grid ftu-empty-biomarker{padding-top:0}:host.no-data-full-screen-grid ::ng-deep ftu-empty-biomarker .footer{display:flex;justify-content:end}:host.no-data-full-screen-grid ::ng-deep ftu-empty-biomarker .footer .collaborate-button{width:auto!important}:host.no-data-full-screen-grid .absolute-toggle{visibility:hidden}:host .empty-state-divider{grid-area:empty;margin-top:64px;border-top-color:var(--mat-sys-outline-variant);align-self:start;z-index:1}:host.no-data-sources{grid-template-areas:\"headline headline\" \"empty empty\"!important}:host.no-data-sources .source-list{display:none}:host.no-data-sources ftu-empty-biomarker{grid-area:empty}:host.no-data{grid-template-rows:4rem auto;grid-template-areas:\"headline headline\" \"empty empty\"}:host.no-data .biomarker-header{height:4rem}:host.no-data-selected{grid-template-areas:\"headline headline\" \"select-data-message select-data-message\" \"source-list source-list\"}:host.no-data-selected .select-data-message{padding:4.875rem 1rem 0;grid-area:select-data-message;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-primary)}:host .absolute-toggle{position:absolute;top:5rem;left:1rem;z-index:1000;width:14.625rem;border:1px solid var(--mat-sys-primary);border-radius:6px;overflow:hidden;display:flex}:host .absolute-toggle .mat-button-toggle{flex:1}:host .absolute-toggle .mat-button-toggle:not(:first-child){border-left:1px solid var(--mat-sys-outline-variant)}:host .absolute-toggle .mat-button-toggle .mat-button-toggle-label-content{line-height:1;padding:0}:host .table{grid-area:table;width:100%}:host .table .cursor{pointer-events:auto}:host .legend{grid-area:legend-area;min-width:21.5rem;display:flex;flex-direction:row;align-content:space-around;width:100%}:host .legend .legend-percentage,:host .legend .legend-gradient{display:flex;flex-direction:column;align-items:center;justify-content:center;row-gap:.25rem;flex-grow:1;background:none;border:none;border-right:1px solid var(--mat-sys-outline-variant);padding:0;cursor:pointer;transition:opacity .2s ease}:host .legend .legend-percentage:hover,:host .legend .legend-gradient:hover{opacity:.7}:host .legend .legend-header-percentage,:host .legend .legend-header-gradient{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .legend .legend-gradient .content{width:12.5rem}:host .source-list{height:100%;grid-area:source-list;overflow:hidden}:host ftu-biomarker-table{grid-area:table;width:100%}:host ftu-empty-biomarker{grid-area:empty;padding-top:4rem}\n"], dependencies: [{ kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i2$2.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled", "disabledInteractive", "hideSingleSelectionIndicator", "hideMultipleSelectionIndicator"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { kind: "component", type: i2$2.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3$2.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: i5.ButtonToggleSizeDirective, selector: "mat-button-toggle-group[hraButtonToggleSize]", inputs: ["hraButtonToggleSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MatTabsModule }, { kind: "ngmodule", type: IconButtonModule }, { kind: "component", type: BiomarkerTableComponent, selector: "ftu-biomarker-table", inputs: ["tissueInfo", "columns", "dataSources", "data", "gradient", "sizes", "highlightedCellId", "illustrationIds"], outputs: ["rowHover"] }, { kind: "component", type: GradientLegendComponent, selector: "ftu-gradient-legend", inputs: ["gradient"] }, { kind: "component", type: SizeLegendComponent, selector: "ftu-size-legend", inputs: ["sizes"] }, { kind: "component", type: SourceListComponent, selector: "ftu-source-list", inputs: ["sources", "message", "hideTitle"], outputs: ["selectionChanged"] }, { kind: "component", type: EmptyBiomarkerComponent, selector: "ftu-empty-biomarker", inputs: ["emptyBehaviorText"] }, { kind: "ngmodule", type: MatButtonToggleModule }, { kind: "ngmodule", type: MessageIndicatorModule }, { kind: "component", type: i7$1.InfoMessageIndicatorComponent, selector: "hra-info-message-indicator" }, { kind: "ngmodule", type: RichTooltipModule }, { kind: "directive", type: i8$1.RichTooltipDirective, selector: "[hraRichTooltip]", inputs: ["hraRichTooltip", "hraRichTooltipTagline", "hraRichTooltipDescription", "hraRichTooltipActionText", "hraRichTooltipPositions"], outputs: ["hraRichTooltipActionClick"] }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i9.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-biomarker-details', imports: [
                        ButtonsModule,
                        HraCommonModule,
                        MatButtonModule,
                        MatIconModule,
                        MatTabsModule,
                        IconButtonModule,
                        BiomarkerTableComponent,
                        GradientLegendComponent,
                        SizeLegendComponent,
                        SourceListComponent,
                        EmptyBiomarkerComponent,
                        MatButtonToggleModule,
                        MessageIndicatorModule,
                        RichTooltipModule,
                        RichTooltipDirective,
                        MatDividerModule,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.full-screen-grid]': 'isBiomarkerfullscreen()',
                        '[class.no-data-full-screen-grid]': 'source().length === 0 && isBiomarkerfullscreen()',
                        '[class.no-data-sources]': 'source().length === 0 && !isBiomarkerfullscreen()',
                        '[class.no-data]': '(source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) && !isBiomarkerfullscreen()',
                        '[class.no-data-selected]': 'source().length > 0 && selectedSources().length === 0 && !isBiomarkerfullscreen()',
                    }, template: "<ng-container hraFeature=\"biomarker-details\">\n  @if (!isBiomarkerfullscreen()) {\n    <div hraFeature=\"header\" class=\"biomarker-header\">\n      <span class=\"biomarker-header-title\">Cell types by biomarkers</span>\n      @if (tab.rows.length !== 0) {\n        <button\n          hraFeature=\"open-fullscreen\"\n          hraClickEvent\n          mat-icon-button\n          hraIconButtonSize=\"large\"\n          hraPlainTooltip=\"Open in full screen\"\n          (click)=\"toggleFullscreen()\"\n        >\n          <mat-icon>fullscreen</mat-icon>\n        </button>\n      }\n    </div>\n  }\n\n  <mat-button-toggle-group\n    hraFeature=\"biomarker-toggle\"\n    class=\"biomarker-toggle-group absolute-toggle\"\n    hraButtonToggleSize=\"medium\"\n    [value]=\"tab.rows.length !== 0 ? selectedToggleValue : null\"\n    (change)=\"onToggleChange($event.value)\"\n  >\n    @for (option of toggleOptions; track option.value) {\n      <mat-button-toggle\n        [hraClickEvent]=\"{ toggle: option.value }\"\n        [value]=\"option.value\"\n        [disabled]=\"isToggleOptionDisabled($index)\"\n      >\n        {{ option.label }}\n      </mat-button-toggle>\n    }\n  </mat-button-toggle-group>\n\n  @if (tab.rows.length !== 0) {\n    <ftu-biomarker-table\n      #table\n      [class.small]=\"tab.rows.length < 10\"\n      [data]=\"$any(tab.rows)\"\n      [columns]=\"tab.columns\"\n      [gradient]=\"gradients()\"\n      [sizes]=\"sizes()\"\n      [tissueInfo]=\"tissueInfo\"\n      [illustrationIds]=\"illustrationIds\"\n      [dataSources]=\"source()\"\n      [highlightedCellId]=\"selectedOnHovered()?.ontologyId ?? ''\"\n      (rowHover)=\"highlightCells($event)\"\n    ></ftu-biomarker-table>\n  }\n\n  @if (source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) {\n    @if (!isBiomarkerfullscreen()) {\n      <mat-divider class=\"empty-state-divider\"></mat-divider>\n    }\n    <ftu-empty-biomarker\n      emptyBehaviorText=\"We currently do not have cell type data for the selected biomarker.\"\n    ></ftu-empty-biomarker>\n  }\n\n  @if (source().length > 0 && selectedSources().length === 0) {\n    <div class=\"select-data-message\">\n      <hra-info-message-indicator> Select source data to view cell types by biomarkers. </hra-info-message-indicator>\n    </div>\n  }\n\n  @if (tab.rows.length > 0) {\n    <div class=\"legend\" hraFeature=\"legends\">\n      <button\n        hraClickEvent\n        hraFeature=\"percentage\"\n        class=\"legend-percentage\"\n        [hraRichTooltip]\n        hraRichTooltipTagline=\"Percentage of cells\"\n        [hraRichTooltipDescription]=\"percentageTooltipText\"\n      >\n        <span class=\"legend-header-percentage\">Percentage of cells</span>\n        <ftu-size-legend [sizes]=\"sizes()\" class=\"content\"></ftu-size-legend>\n      </button>\n      <button\n        hraClickEvent\n        hraFeature=\"expression\"\n        class=\"legend-gradient\"\n        [hraRichTooltip]\n        hraRichTooltipTagline=\"Biomarker expression mean\"\n        [hraRichTooltipDescription]=\"expressionTooltipText\"\n      >\n        <span class=\"legend-header-gradient\">Biomarker expression mean</span>\n        <ftu-gradient-legend [gradient]=\"gradients()\" class=\"content\"></ftu-gradient-legend>\n      </button>\n    </div>\n  }\n\n  @if (!(source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) {\n    <div class=\"source-list\" [style.display]=\"isBiomarkerfullscreen() ? 'none' : undefined\">\n      <ftu-source-list\n        [sources]=\"source()\"\n        (selectionChanged)=\"setSelectedSources($event); selectedSources.set($event)\"\n        class=\"content\"\n      ></ftu-source-list>\n    </div>\n  }\n\n  <ng-template #infoTooltip let-tooltip>\n    <div class=\"biomarker-details info-tooltip\">\n      {{ tooltip }}\n    </div>\n  </ng-template>\n\n  <ng-template #sourceList>\n    <ftu-source-list\n      [sources]=\"source()\"\n      (selectionChanged)=\"setSelectedSources($event)\"\n      class=\"content\"\n      [hideTitle]=\"true\"\n    ></ftu-source-list>\n  </ng-template>\n</ng-container>\n", styles: [":host{border-left:.0625rem solid var(--mat-sys-outline-variant);display:grid;grid-template-columns:1fr 1fr;grid-template-rows:4rem auto 1fr;grid-template-areas:\"headline legend-area\" \"table table\" \"source-list source-list\";gap:.0625rem;background-color:var(--mat-sys-outline-variant);--mat-button-toggle-divider-color: 1px solid var(--mat-sys-primary);--mat-button-toggle-disabled-state-text-color: rgb(from var(--mat-sys-secondary) r g b/38%);--mat-button-toggle-height: 2rem;--mat-button-toggle-label-text-font: var(--mat-sys-label-medium-font);--mat-button-toggle-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-button-toggle-label-text-size: var(--mat-sys-label-medium-size);--mat-button-toggle-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-selected-state-background-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-button-toggle-selected-state-text-color: var(--mat-sys-secondary)}:host>*{background-color:var(--mat-sys-surface-container-lowest)}:host .biomarker-header{grid-area:headline;display:flex;flex-direction:row;align-items:center;justify-content:space-between;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);padding:12px 16px}:host.full-screen-grid{grid-template-columns:1fr;grid-template-rows:4rem auto;grid-template-areas:\"legend-area\" \"table\"}:host.full-screen-grid .legend .legend-percentage{width:284px;max-width:284px;min-width:284px;flex-grow:0}:host.full-screen-grid .legend .legend-gradient{align-items:flex-start;padding-left:1rem}:host.full-screen-grid .legend .legend-gradient .legend-header-gradient{margin-left:1.55rem}:host.full-screen-grid .legend .legend-gradient .content{align-self:flex-start}:host ::ng-deep ftu-empty-biomarker .footer{border-top:.0625rem solid var(--mat-sys-outline-variant)}:host.no-data-full-screen-grid{grid-template-rows:1fr;grid-template-areas:\"empty\"}:host.no-data-full-screen-grid ftu-empty-biomarker{padding-top:0}:host.no-data-full-screen-grid ::ng-deep ftu-empty-biomarker .footer{display:flex;justify-content:end}:host.no-data-full-screen-grid ::ng-deep ftu-empty-biomarker .footer .collaborate-button{width:auto!important}:host.no-data-full-screen-grid .absolute-toggle{visibility:hidden}:host .empty-state-divider{grid-area:empty;margin-top:64px;border-top-color:var(--mat-sys-outline-variant);align-self:start;z-index:1}:host.no-data-sources{grid-template-areas:\"headline headline\" \"empty empty\"!important}:host.no-data-sources .source-list{display:none}:host.no-data-sources ftu-empty-biomarker{grid-area:empty}:host.no-data{grid-template-rows:4rem auto;grid-template-areas:\"headline headline\" \"empty empty\"}:host.no-data .biomarker-header{height:4rem}:host.no-data-selected{grid-template-areas:\"headline headline\" \"select-data-message select-data-message\" \"source-list source-list\"}:host.no-data-selected .select-data-message{padding:4.875rem 1rem 0;grid-area:select-data-message;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-primary)}:host .absolute-toggle{position:absolute;top:5rem;left:1rem;z-index:1000;width:14.625rem;border:1px solid var(--mat-sys-primary);border-radius:6px;overflow:hidden;display:flex}:host .absolute-toggle .mat-button-toggle{flex:1}:host .absolute-toggle .mat-button-toggle:not(:first-child){border-left:1px solid var(--mat-sys-outline-variant)}:host .absolute-toggle .mat-button-toggle .mat-button-toggle-label-content{line-height:1;padding:0}:host .table{grid-area:table;width:100%}:host .table .cursor{pointer-events:auto}:host .legend{grid-area:legend-area;min-width:21.5rem;display:flex;flex-direction:row;align-content:space-around;width:100%}:host .legend .legend-percentage,:host .legend .legend-gradient{display:flex;flex-direction:column;align-items:center;justify-content:center;row-gap:.25rem;flex-grow:1;background:none;border:none;border-right:1px solid var(--mat-sys-outline-variant);padding:0;cursor:pointer;transition:opacity .2s ease}:host .legend .legend-percentage:hover,:host .legend .legend-gradient:hover{opacity:.7}:host .legend .legend-header-percentage,:host .legend .legend-header-gradient{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .legend .legend-gradient .content{width:12.5rem}:host .source-list{height:100%;grid-area:source-list;overflow:hidden}:host ftu-biomarker-table{grid-area:table;width:100%}:host ftu-empty-biomarker{grid-area:empty;padding-top:4rem}\n"] }]
        }], propDecorators: { table: [{
                type: ViewChild,
                args: ['table']
            }], sourceListRef: [{
                type: ViewChild,
                args: ['sourceList', { static: true }]
            }], sourceListTemplate: [{ type: i0.Output, args: ["sourceListTemplate"] }] } });

/**
 * Behavior component for medical illustration component
 */
class MedicalIllustrationBehaviorComponent {
    /**
     * Current illustration url
     */
    currentUrl = selectSnapshot(IllustratorSelectors.url);
    /**
     * Current mapping file
     */
    mapping = selectSnapshot(IllustratorSelectors.mapping);
    /**
     * Curent highlighted cell id
     */
    highlightId = selectSnapshot(IllustratorSelectors.highlightedCell);
    /**
     * Iri  of medical illustration behavior component
     */
    iri = selectSnapshot(ActiveFtuSelectors.iri);
    /**
     * Get all tissues
     */
    tissues = selectSnapshot(TissueLibrarySelectors.tissues);
    /**
     * Whether the illustration is in fullscreen mode
     */
    isFullscreen = model(false, ...(ngDevMode ? [{ debugName: "isFullscreen" }] : []));
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueTitle() {
        const iri = this.iri();
        const tissues = this.tissues();
        return iri && tissues ? tissues[iri].label : '';
    }
    /**
     * Updates the active node on node hover
     */
    updateNodeOnHover = dispatch(IllustratorActions.SetHover);
    /**
     * Updates the active node on node click
     */
    updateNodeOnClicked = dispatch(IllustratorActions.SetClicked);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: MedicalIllustrationBehaviorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: MedicalIllustrationBehaviorComponent, isStandalone: true, selector: "ftu-medical-illustration-behavior", inputs: { isFullscreen: { classPropertyName: "isFullscreen", publicName: "isFullscreen", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { isFullscreen: "isFullscreenChange" }, ngImport: i0, template: "<ng-container hraFeature=\"medical-illustration\">\n  @if (!isFullscreen()) {\n    <div hraFeature=\"header\" class=\"illustration-header\">\n      <span class=\"content\">Illustration</span>\n      <button\n        hraClickEvent\n        hraFeature=\"open-fullscreen\"\n        mat-icon-button\n        hraIconButtonSize=\"large\"\n        hraPlainTooltip=\"Open in full screen\"\n        (click)=\"isFullscreen.set(true)\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    </div>\n  }\n  <ftu-interactive-svg\n    hraHoverEvent\n    hraFeature=\"illustration\"\n    [url]=\"currentUrl()\"\n    [mapping]=\"mapping()\"\n    [highlightId]=\"highlightId()\"\n    (nodeHover)=\"updateNodeOnHover($event)\"\n    (nodeClick)=\"updateNodeOnClicked($event)\"\n  >\n  </ftu-interactive-svg>\n</ng-container>\n", styles: [":host{flex-grow:1;display:flex;flex-direction:column;overflow:hidden}:host ftu-label-box{height:4.0625rem;border-bottom:.0625rem solid var(--mat-sys-outline-variant)}:host .illustration-header{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid var(--mat-sys-outline-variant);background-color:var(--mat-sys-surface-container-low)}:host .illustration-header .content{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host ftu-interactive-svg{flex:1;overflow:hidden}@media(min-height:49.5rem){:host hra-label-box{font-size:.9375rem;height:3rem}}@media(min-height:60.75rem){:host hra-label-box{font-size:1.25rem}}\n"], dependencies: [{ kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3$2.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: InteractiveSvgComponent, selector: "ftu-interactive-svg", inputs: ["url", "mapping", "highlightId"], outputs: ["nodeHover", "nodeClick"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: MedicalIllustrationBehaviorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-medical-illustration-behavior', imports: [
                        ButtonsModule,
                        HraCommonModule,
                        MatButtonModule,
                        MatIconModule,
                        InteractiveSvgComponent,
                        PlainTooltipDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"medical-illustration\">\n  @if (!isFullscreen()) {\n    <div hraFeature=\"header\" class=\"illustration-header\">\n      <span class=\"content\">Illustration</span>\n      <button\n        hraClickEvent\n        hraFeature=\"open-fullscreen\"\n        mat-icon-button\n        hraIconButtonSize=\"large\"\n        hraPlainTooltip=\"Open in full screen\"\n        (click)=\"isFullscreen.set(true)\"\n      >\n        <mat-icon>fullscreen</mat-icon>\n      </button>\n    </div>\n  }\n  <ftu-interactive-svg\n    hraHoverEvent\n    hraFeature=\"illustration\"\n    [url]=\"currentUrl()\"\n    [mapping]=\"mapping()\"\n    [highlightId]=\"highlightId()\"\n    (nodeHover)=\"updateNodeOnHover($event)\"\n    (nodeClick)=\"updateNodeOnClicked($event)\"\n  >\n  </ftu-interactive-svg>\n</ng-container>\n", styles: [":host{flex-grow:1;display:flex;flex-direction:column;overflow:hidden}:host ftu-label-box{height:4.0625rem;border-bottom:.0625rem solid var(--mat-sys-outline-variant)}:host .illustration-header{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid var(--mat-sys-outline-variant);background-color:var(--mat-sys-surface-container-low)}:host .illustration-header .content{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host ftu-interactive-svg{flex:1;overflow:hidden}@media(min-height:49.5rem){:host hra-label-box{font-size:.9375rem;height:3rem}}@media(min-height:60.75rem){:host hra-label-box{font-size:1.25rem}}\n"] }]
        }], propDecorators: { isFullscreen: [{ type: i0.Input, args: [{ isSignal: true, alias: "isFullscreen", required: false }] }, { type: i0.Output, args: ["isFullscreenChange"] }] } });

/**
 * Component for Tissue Library Behavior
 */
class TissueLibraryBehaviorComponent {
    /** Options for full screen */
    FullScreenTab = FullscreenTab;
    /**
     * Reference to the TissueTreeListComponent.
     */
    list;
    /**
     * Input for tissues data
     */
    tissues = selectSnapshot(TissueLibrarySelectors.tissues);
    /**
     * Selected  of tissue library behavior component
     */
    selected = model(...(ngDevMode ? [undefined, { debugName: "selected" }] : []));
    /**
     * Navigates to a tissue page
     */
    navigate = dispatch(LinkRegistryActions.Navigate);
    /** Data for Menus */
    /** Illustration Metadata */
    illustrationMetadata = LinkIds.Illustration;
    /** Available Download Formats */
    downloadFormats = selectSnapshot(DownloadSelectors.formats);
    /** Download Action Dispatcher */
    download = dispatch(DownloadActions.Download);
    /** Full Screen Service */
    fullScreenService = inject(FtuFullScreenService);
    /** Compact Mode */
    isCompactMode = signal(false, ...(ngDevMode ? [{ debugName: "isCompactMode" }] : []));
    /**
     * Sets the TissueItem instance as undefined if the url is undefined
     */
    constructor() {
        /** Get iris from the observable else reset selection if iri is undefined */
        select$(ActiveFtuSelectors.iri).subscribe((iri) => {
            this.selected.set(iri && this.tissues() && this.tissues()[iri]);
            if (iri === undefined) {
                this.list?.resetSelection();
            }
        });
        effect(() => {
            const isFullscreen = this.fullScreenService.isFullscreen();
            this.isCompactMode.set(isFullscreen);
        });
    }
    /**
     * Opens the full screen mode with the specified tab index.
     */
    openFullScreen(mode) {
        this.fullScreenService.fullscreentabIndex.set(mode);
        this.fullScreenService.isFullscreen.set(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TissueLibraryBehaviorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: TissueLibraryBehaviorComponent, isStandalone: true, selector: "ftu-tissue-library-behavior", inputs: { selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange" }, viewQueries: [{ propertyName: "list", first: true, predicate: ["list"], descendants: true, static: true }], ngImport: i0, template: "<ng-container hraFeature=\"tissue-tree-list\">\n  <ftu-label-box>\n    <span [class.hidden]=\"isCompactMode()\"> Functional Tissue Unit Explorer </span>\n    <button hraClickEvent hraFeature=\"more-menu\" mat-icon-button [matMenuTriggerFor]=\"moreMenu\" hraPlainTooltip=\"More\">\n      <mat-icon>more_vert</mat-icon>\n    </button>\n\n    <!-- More Menu -->\n    <mat-menu hraFeature=\"more-menu\" #moreMenu=\"matMenu\" class=\"more-menu\">\n      <a hraFeature=\"help-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"helpMenu\">\n        <mat-icon>help</mat-icon>\n        <div>Help & documentation</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n      <mat-divider />\n      <a hraFeature=\"fullscreen-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"fullScreenMenu\">\n        <mat-icon>fullscreen</mat-icon>\n        <div>Open in full screen</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n      <button\n        hraClickEvent\n        hraHoverEvent\n        hraFeature=\"toggle-compact-mode\"\n        mat-menu-item\n        (click)=\"isCompactMode.set(!isCompactMode())\"\n      >\n        <mat-icon>visibility_{{ isCompactMode() ? 'off' : 'on' }}</mat-icon>\n        <div>{{ isCompactMode() ? 'Show' : 'Hide' }} functional tissue unit list</div>\n      </button>\n      <mat-divider />\n      <button\n        hraClickEvent\n        hraHoverEvent\n        hraFeature=\"view-illustration-metadata\"\n        mat-menu-item\n        [hraLink]=\"illustrationMetadata\"\n      >\n        <mat-icon>database</mat-icon>\n        <div>View illustration metadata</div>\n      </button>\n      <a hraFeature=\"download-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"downloadMenu\">\n        <mat-icon>download</mat-icon>\n        <div>Download illustation</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n      <mat-divider />\n\n      <a hraFeature=\"embed-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"embedMenu\">\n        <mat-icon>code</mat-icon>\n        <div>Embed app</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n    </mat-menu>\n\n    <!-- Help & documentation Menu -->\n    <mat-menu hraFeature=\"help-menu\" #helpMenu class=\"more-menu\">\n      <a\n        hraFeature=\"documentation\"\n        hraClickEvent\n        mat-menu-item\n        href=\"https://humanatlas.io/2d-ftu-illustrations\"\n        target=\"_blank\"\n      >\n        <div class=\"title\">Functional Tissue Unit Illustrations</div>\n        <div class=\"description\">Data documentation</div>\n      </a>\n      <a\n        hraFeature=\"app-guidance\"\n        hraClickEvent\n        mat-menu-item\n        href=\"https://humanatlas.io/user-story/4\"\n        target=\"_blank\"\n      >\n        <div class=\"title\">Functional Tissue Unit Explorer</div>\n        <div class=\"description\">App guidance & documentation</div>\n      </a>\n      <mat-divider />\n      <a\n        mat-menu-item\n        href=\"https://doi.org/10.1038/s41467-024-54591-6\"\n        target=\"_blank\"\n        hraFeature=\"publication\"\n        hraClickEvent\n      >\n        <div>Read publication</div>\n      </a>\n    </mat-menu>\n\n    <!-- Full Screen Menu -->\n    <mat-menu hraFeature=\"fullscreen-menu\" #fullScreenMenu>\n      <button\n        mat-menu-item\n        (click)=\"openFullScreen(FullScreenTab.Illustration)\"\n        hraClickEvent\n        hraFeature=\"toggle-illustration\"\n      >\n        <div>Illustration</div>\n      </button>\n      <button\n        mat-menu-item\n        (click)=\"openFullScreen(FullScreenTab.BiomarkerDetails)\"\n        hraClickEvent\n        hraFeature=\"toggle-biomarker\"\n      >\n        <div>Cell types by biomarkers</div>\n      </button>\n      <button\n        mat-menu-item\n        (click)=\"openFullScreen(FullScreenTab.SourceList)\"\n        hraClickEvent\n        hraFeature=\"toggle-source-list\"\n      >\n        <div>Source data</div>\n      </button>\n    </mat-menu>\n\n    <!-- Download Menu -->\n    <mat-menu hraFeature=\"download-menu\" #downloadMenu>\n      @for (format of downloadFormats(); track format.label) {\n        <button\n          mat-menu-item\n          (click)=\"download(format.id)\"\n          hraClickEvent\n          [hraFeature]=\"'download-' + (format.label | slugify)\"\n        >\n          <div>{{ format.label }}</div>\n        </button>\n      }\n    </mat-menu>\n\n    <!-- Embed Menu -->\n    <mat-menu hraFeature=\"embed-menu\" #embedMenu>\n      <a\n        mat-menu-item\n        href=\"https://docs.humanatlas.io/dev/web-components#ftu-explorer\"\n        target=\"_blank\"\n        hraFeature=\"embed-full-app\"\n        hraClickEvent\n      >\n        <div>Full app</div>\n      </a>\n      <a\n        mat-menu-item\n        href=\"https://docs.humanatlas.io/dev/web-components#ftu-explorer-swc\"\n        target=\"_blank\"\n        hraFeature=\"embed-wc\"\n        hraClickEvent\n      >\n        <div>Web component</div>\n      </a>\n      <a\n        mat-menu-item\n        href=\"https://docs.humanatlas.io/dev/web-components#ftu-explorer-illustration-viewer\"\n        target=\"_blank\"\n        hraFeature=\"illustration-viewer\"\n        hraClickEvent\n      >\n        <div>Illustration viewer</div>\n      </a>\n    </mat-menu>\n  </ftu-label-box>\n\n  <ftu-tissue-tree-list\n    class=\"tissue-tree\"\n    [class.hidden]=\"isCompactMode()\"\n    [nodes]=\"tissues()\"\n    (navigate)=\"navigate($event.link, { queryParams: { id: $event.id } })\"\n    [(selected)]=\"selected\"\n    #list\n  >\n  </ftu-tissue-tree-list>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;border-right:.0625rem solid var(--mat-sys-outline-variant)}:host .hidden{display:none}::ng-deep .more-menu{width:17.75rem!important;--mat-divider-color: var(--mat-sys-outline-variant)}::ng-deep .more-menu a .title{color:var(--mat-sys-secondary)}::ng-deep .more-menu a .description{color:var(--mat-sys-primary)}::ng-deep ftu-label-box{border-bottom:1px solid var(--mat-sys-outline-variant)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "component", type: LabelBoxComponent, selector: "ftu-label-box" }, { kind: "component", type: TissueTreeListComponent, selector: "ftu-tissue-tree-list", inputs: ["nodes", "selected"], outputs: ["selectedChange", "navigate"] }, { kind: "component", type: MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i2$3.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i2$3.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i2$3.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: LinkDirective, selector: "[hraLink]", inputs: ["hraLink", "queryParams", "queryParamsHandling", "fragment", "preserveFragment", "relativeTo"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "pipe", type: i8.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TissueLibraryBehaviorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-tissue-library-behavior', imports: [
                        HraCommonModule,
                        LabelBoxComponent,
                        TissueTreeListComponent,
                        MatDivider,
                        MatMenuModule,
                        MatIconModule,
                        ButtonsModule,
                        LinkDirective,
                        PlainTooltipDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"tissue-tree-list\">\n  <ftu-label-box>\n    <span [class.hidden]=\"isCompactMode()\"> Functional Tissue Unit Explorer </span>\n    <button hraClickEvent hraFeature=\"more-menu\" mat-icon-button [matMenuTriggerFor]=\"moreMenu\" hraPlainTooltip=\"More\">\n      <mat-icon>more_vert</mat-icon>\n    </button>\n\n    <!-- More Menu -->\n    <mat-menu hraFeature=\"more-menu\" #moreMenu=\"matMenu\" class=\"more-menu\">\n      <a hraFeature=\"help-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"helpMenu\">\n        <mat-icon>help</mat-icon>\n        <div>Help & documentation</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n      <mat-divider />\n      <a hraFeature=\"fullscreen-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"fullScreenMenu\">\n        <mat-icon>fullscreen</mat-icon>\n        <div>Open in full screen</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n      <button\n        hraClickEvent\n        hraHoverEvent\n        hraFeature=\"toggle-compact-mode\"\n        mat-menu-item\n        (click)=\"isCompactMode.set(!isCompactMode())\"\n      >\n        <mat-icon>visibility_{{ isCompactMode() ? 'off' : 'on' }}</mat-icon>\n        <div>{{ isCompactMode() ? 'Show' : 'Hide' }} functional tissue unit list</div>\n      </button>\n      <mat-divider />\n      <button\n        hraClickEvent\n        hraHoverEvent\n        hraFeature=\"view-illustration-metadata\"\n        mat-menu-item\n        [hraLink]=\"illustrationMetadata\"\n      >\n        <mat-icon>database</mat-icon>\n        <div>View illustration metadata</div>\n      </button>\n      <a hraFeature=\"download-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"downloadMenu\">\n        <mat-icon>download</mat-icon>\n        <div>Download illustation</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n      <mat-divider />\n\n      <a hraFeature=\"embed-menu\" hraHoverEvent hraClickEvent mat-menu-item [matMenuTriggerFor]=\"embedMenu\">\n        <mat-icon>code</mat-icon>\n        <div>Embed app</div>\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </a>\n    </mat-menu>\n\n    <!-- Help & documentation Menu -->\n    <mat-menu hraFeature=\"help-menu\" #helpMenu class=\"more-menu\">\n      <a\n        hraFeature=\"documentation\"\n        hraClickEvent\n        mat-menu-item\n        href=\"https://humanatlas.io/2d-ftu-illustrations\"\n        target=\"_blank\"\n      >\n        <div class=\"title\">Functional Tissue Unit Illustrations</div>\n        <div class=\"description\">Data documentation</div>\n      </a>\n      <a\n        hraFeature=\"app-guidance\"\n        hraClickEvent\n        mat-menu-item\n        href=\"https://humanatlas.io/user-story/4\"\n        target=\"_blank\"\n      >\n        <div class=\"title\">Functional Tissue Unit Explorer</div>\n        <div class=\"description\">App guidance & documentation</div>\n      </a>\n      <mat-divider />\n      <a\n        mat-menu-item\n        href=\"https://doi.org/10.1038/s41467-024-54591-6\"\n        target=\"_blank\"\n        hraFeature=\"publication\"\n        hraClickEvent\n      >\n        <div>Read publication</div>\n      </a>\n    </mat-menu>\n\n    <!-- Full Screen Menu -->\n    <mat-menu hraFeature=\"fullscreen-menu\" #fullScreenMenu>\n      <button\n        mat-menu-item\n        (click)=\"openFullScreen(FullScreenTab.Illustration)\"\n        hraClickEvent\n        hraFeature=\"toggle-illustration\"\n      >\n        <div>Illustration</div>\n      </button>\n      <button\n        mat-menu-item\n        (click)=\"openFullScreen(FullScreenTab.BiomarkerDetails)\"\n        hraClickEvent\n        hraFeature=\"toggle-biomarker\"\n      >\n        <div>Cell types by biomarkers</div>\n      </button>\n      <button\n        mat-menu-item\n        (click)=\"openFullScreen(FullScreenTab.SourceList)\"\n        hraClickEvent\n        hraFeature=\"toggle-source-list\"\n      >\n        <div>Source data</div>\n      </button>\n    </mat-menu>\n\n    <!-- Download Menu -->\n    <mat-menu hraFeature=\"download-menu\" #downloadMenu>\n      @for (format of downloadFormats(); track format.label) {\n        <button\n          mat-menu-item\n          (click)=\"download(format.id)\"\n          hraClickEvent\n          [hraFeature]=\"'download-' + (format.label | slugify)\"\n        >\n          <div>{{ format.label }}</div>\n        </button>\n      }\n    </mat-menu>\n\n    <!-- Embed Menu -->\n    <mat-menu hraFeature=\"embed-menu\" #embedMenu>\n      <a\n        mat-menu-item\n        href=\"https://docs.humanatlas.io/dev/web-components#ftu-explorer\"\n        target=\"_blank\"\n        hraFeature=\"embed-full-app\"\n        hraClickEvent\n      >\n        <div>Full app</div>\n      </a>\n      <a\n        mat-menu-item\n        href=\"https://docs.humanatlas.io/dev/web-components#ftu-explorer-swc\"\n        target=\"_blank\"\n        hraFeature=\"embed-wc\"\n        hraClickEvent\n      >\n        <div>Web component</div>\n      </a>\n      <a\n        mat-menu-item\n        href=\"https://docs.humanatlas.io/dev/web-components#ftu-explorer-illustration-viewer\"\n        target=\"_blank\"\n        hraFeature=\"illustration-viewer\"\n        hraClickEvent\n      >\n        <div>Illustration viewer</div>\n      </a>\n    </mat-menu>\n  </ftu-label-box>\n\n  <ftu-tissue-tree-list\n    class=\"tissue-tree\"\n    [class.hidden]=\"isCompactMode()\"\n    [nodes]=\"tissues()\"\n    (navigate)=\"navigate($event.link, { queryParams: { id: $event.id } })\"\n    [(selected)]=\"selected\"\n    #list\n  >\n  </ftu-tissue-tree-list>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;border-right:.0625rem solid var(--mat-sys-outline-variant)}:host .hidden{display:none}::ng-deep .more-menu{width:17.75rem!important;--mat-divider-color: var(--mat-sys-outline-variant)}::ng-deep .more-menu a .title{color:var(--mat-sys-secondary)}::ng-deep .more-menu a .description{color:var(--mat-sys-primary)}::ng-deep ftu-label-box{border-bottom:1px solid var(--mat-sys-outline-variant)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { list: [{
                type: ViewChild,
                args: ['list', { static: true }]
            }], selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }, { type: i0.Output, args: ["selectedChange"] }] } });

/**
 * PlaceHolder for Empty Tissue Info
 */
const EMPTY_TISSUE_INFO = {
    id: '',
    label: '',
};
/** Component for Biomarker Table Details Web component */
class BiomarkerDetailsWcComponent {
    /** Tooltip text for percentage of cells legend */
    static PERCENTAGE_TOOLTIP_TEXT = 'The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.';
    /** Tooltip text for biomarker expression mean legend */
    static EXPRESSION_TOOLTIP_TEXT = 'Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.';
    /** Instance access to percentage tooltip text */
    percentageTooltipText = BiomarkerDetailsWcComponent.PERCENTAGE_TOOLTIP_TEXT;
    /** Instance access to expression tooltip text */
    expressionTooltipText = BiomarkerDetailsWcComponent.EXPRESSION_TOOLTIP_TEXT;
    /** Dialog service for opening notice dialogs */
    dialogService = inject(DialogService);
    /** Text to be copied to clipboard */
    emailText = 'infoccf@iu.edu';
    /** Component constructor */
    constructor() {
        effect(() => {
            const hasUrl = !!this.currentUrl();
            const hasMapping = !!this.mapping();
            const tabs = this.getTabs();
            if (!hasUrl || !hasMapping) {
                return;
            }
            const dataLoadingComplete = Array.isArray(tabs);
            if (dataLoadingComplete) {
                const hasNoData = tabs.length === 0 || tabs.every((tab) => tab.rows.length === 0);
                if (hasNoData) {
                    this.dialogService.openNotice('', 'We currently do not have cell type by gene, protein, or lipid biomarker data for this functional tissue unit. Please email us at infoccf@iu.edu to discuss your dataset.', {
                        label: 'Copy email',
                        callback: () => {
                            this.copyEmailToClipboard();
                        },
                    });
                }
            }
        });
    }
    /**
     * Copies email to clipboard
     */
    copyEmailToClipboard() {
        return navigator.clipboard.writeText(this.emailText);
    }
    /**
     * Reference to the biomarker table component
     */
    table;
    /**
     * Current illustration url
     */
    currentUrl = selectSnapshot(IllustratorSelectors.url);
    /**
     * Current mapping file
     */
    mapping = selectSnapshot(IllustratorSelectors.mapping);
    /**
     * Iri  of medical illustration behavior component
     */
    iri = selectSnapshot(ActiveFtuSelectors.iri);
    /**
     * Get all tissues
     */
    tissues = selectSnapshot(TissueLibrarySelectors.tissues);
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueTitle() {
        const iri = this.iri();
        const tissues = this.tissues();
        return iri ? tissues[iri].label : '';
    }
    /**
     * Updates the active node on node hover
     */
    updateNodeOnHover = dispatch(IllustratorActions.SetHover);
    /**
     * Updates the active node on node click
     */
    updateNodeOnClicked = dispatch(IllustratorActions.SetClicked);
    /** Table tabs */
    getTabs = selectSnapshot(CellSummarySelectors.aggregates);
    /** Info to be shown on the tooltip for Gradient Legend */
    gradientHoverInfo = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.GradientLegendInfo);
    /** Info to be shown on the tooltip for Size Legend */
    sizeHoverInfo = selectQuerySnapshot(ResourceRegistrySelectors.anyText, ResourceIds.SizeLegendInfo);
    /** Action to highlight a cell type */
    highlightCell = dispatch(IllustratorActions.HighlightCellType);
    /** Indicates if the table is fully shown, defaults to false*/
    isTableFullScreen = false;
    /** Gradient colors along with their stop points */
    gradients = (selectQuerySnapshot(ResourceRegistrySelectors.field, ResourceIds.GradientLegend, ResourceTypes.Gradient, 'points', []));
    /** Taking input for the radius of the circle and the label to be displayed. */
    sizes = (selectQuerySnapshot(ResourceRegistrySelectors.field, ResourceIds.SizeLegend, ResourceTypes.Size, 'sizes', []));
    /** List of sources with titles and links displayed to the user */
    source = selectSnapshot(SourceRefsSelectors.sourceReferences);
    /** List of selected sources */
    selectedSources = signal([], ...(ngDevMode ? [{ debugName: "selectedSources" }] : []));
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueInfo() {
        const iri = this.iri();
        const tissues = this.tissues();
        if (iri === undefined) {
            return EMPTY_TISSUE_INFO;
        }
        const { id, label } = tissues[iri];
        return { id, label };
    }
    /**
     * Gets tabs containing cell summary aggregate data
     */
    get tabs() {
        const tabs = this.getTabs();
        if (tabs !== this.tabs_ && tabs.length !== 0) {
            this.tabs_ = tabs;
        }
        return this.tabs_;
    }
    /**
     * Gets ids for cells in the illustration
     */
    get illustrationIds() {
        const mapping = this.mapping();
        if (mapping !== this.mapping_) {
            this.mapping_ = mapping;
            this.illustrationIds_ = Array.from(new Set(this.mapping().map((data) => data.ontologyId)));
        }
        return this.illustrationIds_;
    }
    /**
     * button text of empty biomarker component.
     */
    collaborateText = 'Collaborate with the HRA Team';
    /**
     * message markdown of empty biomarker component.
     */
    message = `We currently do not have cell type data for this biomarker.
<br><br> Please contact us to discuss your dataset.`;
    /** Sets currently selected sources */
    setSelectedSources = dispatch(SourceRefsActions.SetSelectedSources);
    /** Selects the cells hovered currently to highlight in table */
    selectedOnHovered = selectSnapshot(IllustratorSelectors.selectedOnHovered);
    /** A dispatcher function to set the screen mode */
    setScreenMode = dispatch(ScreenModeAction.Set);
    /** Mapping item reference */
    mapping_ = [];
    /** Illustration ids reference */
    illustrationIds_ = [];
    /** Tabs reference */
    tabs_ = [];
    /** Returns the index number */
    trackByIndex(index) {
        return index;
    }
    /** A function that toggles isTableFullScreen and
     * calls the setScreenMode function.
     */
    toggleFullscreen() {
        setTimeout(() => {
            this.table.checkDisplayedColumns();
        }, 250);
        this.isTableFullScreen = !this.isTableFullScreen;
        this.setScreenMode(this.isTableFullScreen);
    }
    /** Toggle options for the biomarker table */
    toggleOptions = [
        { value: 'genes', label: 'Genes' },
        { value: 'proteins', label: 'Proteins' },
        { value: 'lipids', label: 'Lipids' },
    ];
    /** Active tab index */
    activeTabIndex = 0;
    /** Selected toggle value */
    selectedToggleValue = 'genes';
    /**
     * Handle toggle change from biomarker table
     * @param value selected toggle value
     */
    onToggleChange(value) {
        const index = this.toggleOptions.findIndex((option) => option.value === value);
        if (index !== -1) {
            this.activeTabIndex = index;
        }
    }
    /** Table tabs */
    get tab() {
        const tabs = this.getTabs();
        return tabs[this.activeTabIndex] ?? { label: '', columns: [], rows: [] };
    }
    /**
     * Determines if a toggle option is disabled.
     * @param index index of the toggle option
     * @returns true if the toggle option is disabled, false otherwise
     */
    isToggleOptionDisabled(index) {
        const tab = this.getTabs()[index] ?? { label: '', columns: [], rows: [] };
        return tab ? tab.rows.length === 0 : true;
    }
    /**
     * Highlights cells matching the label
     * @param event
     */
    highlightCells(label) {
        this.highlightCell(label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerDetailsWcComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: BiomarkerDetailsWcComponent, isStandalone: true, selector: "ftu-wc-biomarker-details", host: { properties: { "class.no-data-sources": "source().length === 0", "class.no-data": "source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)", "class.no-data-selected": "source().length > 0 && selectedSources().length === 0" } }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }], ngImport: i0, template: "<mat-tab-group\n  hraFeature=\"tabs\"\n  hraClickEvent\n  hraClickEventTriggerOn=\"none\"\n  #tabEvent=\"hraClickEvent\"\n  [class.table-fullscreen]=\"isTableFullScreen\"\n  (selectedTabChange)=\"tabEvent.logEvent(undefined, undefined, { tab: $event.tab.textLabel })\"\n  disablePagination=\"true\"\n  disableRipple=\"true\"\n>\n  <mat-tab hraFeature=\"illustration-tab\" label=\"FTU Illustration\">\n    <ftu-interactive-svg\n      hraHoverEvent\n      hraFeature=\"illustration\"\n      [url]=\"currentUrl()\"\n      [mapping]=\"mapping()\"\n      (nodeHover)=\"updateNodeOnHover($event)\"\n      (nodeClick)=\"updateNodeOnClicked($event)\"\n    >\n    </ftu-interactive-svg>\n  </mat-tab>\n\n  <mat-tab hraFeature=\"source-data-tab\" label=\"Source Data\">\n    <div class=\"source-list\">\n      @if (source().length > 0) {\n        <ftu-source-list\n          [message]=\"message\"\n          [sources]=\"source()\"\n          [hideTitle]=\"true\"\n          (selectionChanged)=\"setSelectedSources($event); selectedSources.set($event)\"\n          class=\"content\"\n        ></ftu-source-list>\n      }\n\n      @if (source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) {\n        <ftu-empty-biomarker\n          class=\"wc-empty-biomarker\"\n          emptyBehaviorText=\"We currently do not have cell type by biomarker data for genes, proteins, or lipids.\"\n        ></ftu-empty-biomarker>\n      }\n    </div>\n  </mat-tab>\n\n  <mat-tab hraFeature=\"biomarkers-tab\" label=\"Cell types by Biomarkers\" [disabled]=\"tab.rows.length === 0\">\n    <div class=\"biomarker-details\">\n      <div class=\"legend\" hraFeature=\"legends\">\n        <button\n          hraClickEvent\n          hraFeature=\"percentage\"\n          class=\"legend-percentage\"\n          [hraRichTooltip]\n          hraRichTooltipTagline=\"Percentage of cells\"\n          [hraRichTooltipDescription]=\"percentageTooltipText\"\n        >\n          <span class=\"legend-header-percentage\">Percentage of cells</span>\n          <ftu-size-legend [sizes]=\"sizes()\" class=\"content\"></ftu-size-legend>\n        </button>\n        <mat-divider [vertical]=\"true\"></mat-divider>\n        <button\n          hraClickEvent\n          hraFeature=\"expression\"\n          class=\"legend-gradient\"\n          [hraRichTooltip]\n          hraRichTooltipTagline=\"Biomarker expression mean\"\n          [hraRichTooltipDescription]=\"expressionTooltipText\"\n        >\n          <span class=\"legend-header-gradient\">Biomarker expression mean</span>\n          <ftu-gradient-legend [gradient]=\"gradients()\" class=\"content\"></ftu-gradient-legend>\n        </button>\n      </div>\n      <mat-button-toggle-group\n        hraButtonToggleSize=\"medium\"\n        [value]=\"tab.rows.length !== 0 ? selectedToggleValue : null\"\n        (change)=\"onToggleChange($event.value)\"\n        class=\"biomarker-toggle-group absolute-toggle\"\n      >\n        @for (option of toggleOptions; track option.value) {\n          <mat-button-toggle [value]=\"option.value\" [disabled]=\"isToggleOptionDisabled($index)\">{{\n            option.label\n          }}</mat-button-toggle>\n        }\n      </mat-button-toggle-group>\n\n      @if (tab.rows.length !== 0) {\n        <ftu-biomarker-table\n          #table\n          [class.small]=\"tab.rows.length < 10\"\n          [data]=\"$any(tab.rows)\"\n          [columns]=\"tab.columns\"\n          [gradient]=\"gradients()\"\n          [sizes]=\"sizes()\"\n          [tissueInfo]=\"tissueInfo\"\n          [illustrationIds]=\"illustrationIds\"\n          [dataSources]=\"source()\"\n          [highlightedCellId]=\"selectedOnHovered()?.ontologyId ?? ''\"\n          (rowHover)=\"highlightCells($event)\"\n        ></ftu-biomarker-table>\n      }\n    </div>\n  </mat-tab>\n</mat-tab-group>\n", styles: [":host{display:flex;flex-direction:column;height:100%;--mat-tab-container-height: 4rem;--mat-tab-active-indicator-color: var(--mat-sys-on-tertiary-fixed);--mat-tab-active-label-text-color: var(--mat-sys-secondary);--mat-tab-inactive-label-text-color: var(--mat-sys-primary);--mat-tab-background-color: var(--mat-sys-surface-container-low);--mat-tab-label-text-font: var(--mat-sys-label-medium-font);--mat-tab-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-tab-label-text-size: var(--mat-sys-label-medium-size);--mat-tab-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-tab-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-disabled-state-text-color: rgb(from var(--mat-sys-secondary) r g b/38%);--mat-button-toggle-height: 2rem;--mat-button-toggle-label-text-font: var(--mat-sys-label-medium-font);--mat-button-toggle-label-text-line-height: 1.3125rem;--mat-button-toggle-label-text-size: .875rem;--mat-button-toggle-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-selected-state-background-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-button-toggle-selected-state-text-color: var(--mat-sys-secondary)}:host mat-tab-group{flex:1;display:flex;flex-direction:column;overflow:hidden}:host mat-tab-group ::ng-deep .mat-mdc-tab-body-wrapper{flex:1;overflow:hidden}:host mat-tab-group ::ng-deep .mat-mdc-tab-body{overflow:hidden}:host mat-tab-group ::ng-deep .mat-mdc-tab-body-content{height:100%;overflow:hidden}:host.no-data ::ng-deep ftu-empty-biomarker .footer{display:flex;justify-content:end;border-top:.0625rem solid var(--mat-sys-outline-variant)}:host.no-data ::ng-deep ftu-empty-biomarker .footer .collaborate-button{width:auto!important}@media(min-width:800px)and (min-height:480px){:host .biomarker-details{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:minmax(4rem,6rem) 1fr;grid-template-areas:\"legend-area legend-area\" \"table table\";position:relative;height:100%;overflow:hidden}:host .biomarker-details .legend{grid-area:legend-area;min-width:21.5rem;display:flex;flex-direction:row;align-content:space-around;align-items:stretch;width:100%}:host .biomarker-details .legend .legend-percentage{display:flex;flex-direction:column;align-items:center;justify-content:center;row-gap:.25rem;flex-grow:1;background:none;border:none;padding:0;cursor:pointer;transition:opacity .2s ease}:host .biomarker-details .legend .legend-percentage:hover{opacity:.7}:host .biomarker-details .legend .legend-percentage .legend-header-percentage{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .biomarker-details .legend .legend-gradient{display:flex;flex-direction:column;align-items:center;justify-content:center;row-gap:.25rem;flex-grow:1;background:none;border:none;padding:0;cursor:pointer;transition:opacity .2s ease}:host .biomarker-details .legend .legend-gradient .content{width:9.75rem}:host .biomarker-details .legend .legend-gradient:hover{opacity:.7}:host .biomarker-details .legend .legend-gradient .legend-header-gradient{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .biomarker-details ftu-biomarker-table{grid-area:table;width:100%;height:100%;border-top:1px solid var(--mat-sys-outline-variant);min-height:21.25rem;overflow:auto}:host .biomarker-details ftu-biomarker-table ::ng-deep th:first-child,:host .biomarker-details ftu-biomarker-table ::ng-deep td.type{width:10.75rem;min-width:10.75rem;max-width:10.75rem}:host .biomarker-details ftu-biomarker-table ::ng-deep th:nth-child(2),:host .biomarker-details ftu-biomarker-table ::ng-deep td.count{width:10.75rem;min-width:10.75rem;max-width:10.75rem}:host .biomarker-details .biomarker-toggle-group.absolute-toggle{position:absolute;top:7rem;left:1rem;z-index:10;border:1px solid var(--mat-sys-primary);overflow:hidden}:host .biomarker-details .biomarker-toggle-group.absolute-toggle .mat-button-toggle{flex:1}:host .biomarker-details .biomarker-toggle-group.absolute-toggle .mat-button-toggle:not(:first-child){border-left:1px solid var(--mat-sys-outline-variant)}:host .biomarker-details .biomarker-toggle-group.absolute-toggle .mat-button-toggle .mat-button-toggle-label-content{line-height:1;padding:0}:host ::ng-deep ftu-empty-biomarker .footer{border-top:1px solid var(--mat-sys-outline-variant)}:host ::ng-deep ftu-empty-biomarker .footer button{width:auto!important;margin-left:23.4375rem}}\n"], dependencies: [{ kind: "ngmodule", type: ButtonsModule }, { kind: "directive", type: i2$2.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled", "disabledInteractive", "hideSingleSelectionIndicator", "hideMultipleSelectionIndicator"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { kind: "component", type: i2$2.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "directive", type: i5.ButtonToggleSizeDirective, selector: "mat-button-toggle-group[hraButtonToggleSize]", inputs: ["hraButtonToggleSize"] }, { kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i9.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MatTabsModule }, { kind: "component", type: i3$1.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass", "id"], exportAs: ["matTab"] }, { kind: "component", type: i3$1.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "fitInkBarToContent", "mat-stretch-tabs", "mat-align-tabs", "dynamicHeight", "selectedIndex", "headerPosition", "animationDuration", "contentTabIndex", "disablePagination", "disableRipple", "preserveContent", "backgroundColor", "aria-label", "aria-labelledby"], outputs: ["selectedIndexChange", "focusChange", "animationDone", "selectedTabChange"], exportAs: ["matTabGroup"] }, { kind: "component", type: SourceListComponent, selector: "ftu-source-list", inputs: ["sources", "message", "hideTitle"], outputs: ["selectionChanged"] }, { kind: "component", type: InteractiveSvgComponent, selector: "ftu-interactive-svg", inputs: ["url", "mapping", "highlightId"], outputs: ["nodeHover", "nodeClick"] }, { kind: "component", type: EmptyBiomarkerComponent, selector: "ftu-empty-biomarker", inputs: ["emptyBehaviorText"] }, { kind: "component", type: GradientLegendComponent, selector: "ftu-gradient-legend", inputs: ["gradient"] }, { kind: "component", type: SizeLegendComponent, selector: "ftu-size-legend", inputs: ["sizes"] }, { kind: "component", type: BiomarkerTableComponent, selector: "ftu-biomarker-table", inputs: ["tissueInfo", "columns", "dataSources", "data", "gradient", "sizes", "highlightedCellId", "illustrationIds"], outputs: ["rowHover"] }, { kind: "ngmodule", type: RichTooltipModule }, { kind: "directive", type: i8$1.RichTooltipDirective, selector: "[hraRichTooltip]", inputs: ["hraRichTooltip", "hraRichTooltipTagline", "hraRichTooltipDescription", "hraRichTooltipActionText", "hraRichTooltipPositions"], outputs: ["hraRichTooltipActionClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BiomarkerDetailsWcComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ftu-wc-biomarker-details', imports: [
                        ButtonsModule,
                        HraCommonModule,
                        MatButtonModule,
                        MatDividerModule,
                        MatIconModule,
                        MatTabsModule,
                        SourceListComponent,
                        InteractiveSvgComponent,
                        EmptyBiomarkerComponent,
                        GradientLegendComponent,
                        SizeLegendComponent,
                        BiomarkerTableComponent,
                        RichTooltipModule,
                        RichTooltipDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.no-data-sources]': 'source().length === 0',
                        '[class.no-data]': 'source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)',
                        '[class.no-data-selected]': 'source().length > 0 && selectedSources().length === 0',
                    }, template: "<mat-tab-group\n  hraFeature=\"tabs\"\n  hraClickEvent\n  hraClickEventTriggerOn=\"none\"\n  #tabEvent=\"hraClickEvent\"\n  [class.table-fullscreen]=\"isTableFullScreen\"\n  (selectedTabChange)=\"tabEvent.logEvent(undefined, undefined, { tab: $event.tab.textLabel })\"\n  disablePagination=\"true\"\n  disableRipple=\"true\"\n>\n  <mat-tab hraFeature=\"illustration-tab\" label=\"FTU Illustration\">\n    <ftu-interactive-svg\n      hraHoverEvent\n      hraFeature=\"illustration\"\n      [url]=\"currentUrl()\"\n      [mapping]=\"mapping()\"\n      (nodeHover)=\"updateNodeOnHover($event)\"\n      (nodeClick)=\"updateNodeOnClicked($event)\"\n    >\n    </ftu-interactive-svg>\n  </mat-tab>\n\n  <mat-tab hraFeature=\"source-data-tab\" label=\"Source Data\">\n    <div class=\"source-list\">\n      @if (source().length > 0) {\n        <ftu-source-list\n          [message]=\"message\"\n          [sources]=\"source()\"\n          [hideTitle]=\"true\"\n          (selectionChanged)=\"setSelectedSources($event); selectedSources.set($event)\"\n          class=\"content\"\n        ></ftu-source-list>\n      }\n\n      @if (source().length === 0 || (source().length > 0 && selectedSources().length > 0 && tab.rows.length === 0)) {\n        <ftu-empty-biomarker\n          class=\"wc-empty-biomarker\"\n          emptyBehaviorText=\"We currently do not have cell type by biomarker data for genes, proteins, or lipids.\"\n        ></ftu-empty-biomarker>\n      }\n    </div>\n  </mat-tab>\n\n  <mat-tab hraFeature=\"biomarkers-tab\" label=\"Cell types by Biomarkers\" [disabled]=\"tab.rows.length === 0\">\n    <div class=\"biomarker-details\">\n      <div class=\"legend\" hraFeature=\"legends\">\n        <button\n          hraClickEvent\n          hraFeature=\"percentage\"\n          class=\"legend-percentage\"\n          [hraRichTooltip]\n          hraRichTooltipTagline=\"Percentage of cells\"\n          [hraRichTooltipDescription]=\"percentageTooltipText\"\n        >\n          <span class=\"legend-header-percentage\">Percentage of cells</span>\n          <ftu-size-legend [sizes]=\"sizes()\" class=\"content\"></ftu-size-legend>\n        </button>\n        <mat-divider [vertical]=\"true\"></mat-divider>\n        <button\n          hraClickEvent\n          hraFeature=\"expression\"\n          class=\"legend-gradient\"\n          [hraRichTooltip]\n          hraRichTooltipTagline=\"Biomarker expression mean\"\n          [hraRichTooltipDescription]=\"expressionTooltipText\"\n        >\n          <span class=\"legend-header-gradient\">Biomarker expression mean</span>\n          <ftu-gradient-legend [gradient]=\"gradients()\" class=\"content\"></ftu-gradient-legend>\n        </button>\n      </div>\n      <mat-button-toggle-group\n        hraButtonToggleSize=\"medium\"\n        [value]=\"tab.rows.length !== 0 ? selectedToggleValue : null\"\n        (change)=\"onToggleChange($event.value)\"\n        class=\"biomarker-toggle-group absolute-toggle\"\n      >\n        @for (option of toggleOptions; track option.value) {\n          <mat-button-toggle [value]=\"option.value\" [disabled]=\"isToggleOptionDisabled($index)\">{{\n            option.label\n          }}</mat-button-toggle>\n        }\n      </mat-button-toggle-group>\n\n      @if (tab.rows.length !== 0) {\n        <ftu-biomarker-table\n          #table\n          [class.small]=\"tab.rows.length < 10\"\n          [data]=\"$any(tab.rows)\"\n          [columns]=\"tab.columns\"\n          [gradient]=\"gradients()\"\n          [sizes]=\"sizes()\"\n          [tissueInfo]=\"tissueInfo\"\n          [illustrationIds]=\"illustrationIds\"\n          [dataSources]=\"source()\"\n          [highlightedCellId]=\"selectedOnHovered()?.ontologyId ?? ''\"\n          (rowHover)=\"highlightCells($event)\"\n        ></ftu-biomarker-table>\n      }\n    </div>\n  </mat-tab>\n</mat-tab-group>\n", styles: [":host{display:flex;flex-direction:column;height:100%;--mat-tab-container-height: 4rem;--mat-tab-active-indicator-color: var(--mat-sys-on-tertiary-fixed);--mat-tab-active-label-text-color: var(--mat-sys-secondary);--mat-tab-inactive-label-text-color: var(--mat-sys-primary);--mat-tab-background-color: var(--mat-sys-surface-container-low);--mat-tab-label-text-font: var(--mat-sys-label-medium-font);--mat-tab-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-tab-label-text-size: var(--mat-sys-label-medium-size);--mat-tab-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-tab-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-disabled-state-text-color: rgb(from var(--mat-sys-secondary) r g b/38%);--mat-button-toggle-height: 2rem;--mat-button-toggle-label-text-font: var(--mat-sys-label-medium-font);--mat-button-toggle-label-text-line-height: 1.3125rem;--mat-button-toggle-label-text-size: .875rem;--mat-button-toggle-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-toggle-selected-state-background-color: rgb(from var(--mat-sys-tertiary) r g b/20%);--mat-button-toggle-selected-state-text-color: var(--mat-sys-secondary)}:host mat-tab-group{flex:1;display:flex;flex-direction:column;overflow:hidden}:host mat-tab-group ::ng-deep .mat-mdc-tab-body-wrapper{flex:1;overflow:hidden}:host mat-tab-group ::ng-deep .mat-mdc-tab-body{overflow:hidden}:host mat-tab-group ::ng-deep .mat-mdc-tab-body-content{height:100%;overflow:hidden}:host.no-data ::ng-deep ftu-empty-biomarker .footer{display:flex;justify-content:end;border-top:.0625rem solid var(--mat-sys-outline-variant)}:host.no-data ::ng-deep ftu-empty-biomarker .footer .collaborate-button{width:auto!important}@media(min-width:800px)and (min-height:480px){:host .biomarker-details{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:minmax(4rem,6rem) 1fr;grid-template-areas:\"legend-area legend-area\" \"table table\";position:relative;height:100%;overflow:hidden}:host .biomarker-details .legend{grid-area:legend-area;min-width:21.5rem;display:flex;flex-direction:row;align-content:space-around;align-items:stretch;width:100%}:host .biomarker-details .legend .legend-percentage{display:flex;flex-direction:column;align-items:center;justify-content:center;row-gap:.25rem;flex-grow:1;background:none;border:none;padding:0;cursor:pointer;transition:opacity .2s ease}:host .biomarker-details .legend .legend-percentage:hover{opacity:.7}:host .biomarker-details .legend .legend-percentage .legend-header-percentage{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .biomarker-details .legend .legend-gradient{display:flex;flex-direction:column;align-items:center;justify-content:center;row-gap:.25rem;flex-grow:1;background:none;border:none;padding:0;cursor:pointer;transition:opacity .2s ease}:host .biomarker-details .legend .legend-gradient .content{width:9.75rem}:host .biomarker-details .legend .legend-gradient:hover{opacity:.7}:host .biomarker-details .legend .legend-gradient .legend-header-gradient{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .biomarker-details ftu-biomarker-table{grid-area:table;width:100%;height:100%;border-top:1px solid var(--mat-sys-outline-variant);min-height:21.25rem;overflow:auto}:host .biomarker-details ftu-biomarker-table ::ng-deep th:first-child,:host .biomarker-details ftu-biomarker-table ::ng-deep td.type{width:10.75rem;min-width:10.75rem;max-width:10.75rem}:host .biomarker-details ftu-biomarker-table ::ng-deep th:nth-child(2),:host .biomarker-details ftu-biomarker-table ::ng-deep td.count{width:10.75rem;min-width:10.75rem;max-width:10.75rem}:host .biomarker-details .biomarker-toggle-group.absolute-toggle{position:absolute;top:7rem;left:1rem;z-index:10;border:1px solid var(--mat-sys-primary);overflow:hidden}:host .biomarker-details .biomarker-toggle-group.absolute-toggle .mat-button-toggle{flex:1}:host .biomarker-details .biomarker-toggle-group.absolute-toggle .mat-button-toggle:not(:first-child){border-left:1px solid var(--mat-sys-outline-variant)}:host .biomarker-details .biomarker-toggle-group.absolute-toggle .mat-button-toggle .mat-button-toggle-label-content{line-height:1;padding:0}:host ::ng-deep ftu-empty-biomarker .footer{border-top:1px solid var(--mat-sys-outline-variant)}:host ::ng-deep ftu-empty-biomarker .footer button{width:auto!important;margin-left:23.4375rem}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { table: [{
                type: ViewChild,
                args: ['table']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BiomarkerDetailsComponent, BiomarkerDetailsWcComponent, BiomarkerTableComponent, BiomarkerTableDataIconComponent, EmptyBiomarkerComponent, FtuFullScreenService, FullscreenContainerComponent, FullscreenTab, GradientLegendComponent, InteractiveSvgComponent, LabelBoxComponent, MedicalIllustrationBehaviorComponent, SizeLegendComponent, SourceListComponent, TissueLibraryBehaviorComponent, TissueTreeListComponent, TooltipComponent };
//# sourceMappingURL=hra-ui-ftu-ui-components.mjs.map
