import * as i6 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { input, model, output, signal, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterContainerComponent } from '@hra-ui/design-system/filter-container';
import * as i5 from '@hra-ui/design-system/icons';
import { IconsModule } from '@hra-ui/design-system/icons';
import * as i3 from '@hra-ui/design-system/scrolling';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { SearchListComponent } from '@hra-ui/design-system/search-list';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from 'ngx-scrollbar';
import * as i4 from '@angular/material/button';

/** Position of the filter menu overlay */
const FILTER_MENU_POSITIONS = [
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 16 },
];
/**
 * A collapsing menu with ways to refine databases to particular views, sorting and grouping preferences, and filters
 */
class FilterMenuComponent {
    /** Menu tagline */
    tagline = input(...(ngDevMode ? [undefined, { debugName: "tagline" }] : []));
    /** Menu description */
    description = input(...(ngDevMode ? [undefined, { debugName: "description" }] : []));
    /** Whether to show the close button */
    enableClose = input(...(ngDevMode ? [undefined, { debugName: "enableClose" }] : []));
    /** List of all filters with options */
    filters = model.required(...(ngDevMode ? [{ debugName: "filters" }] : []));
    /** Emits when the form opening state is toggled */
    closeClick = output();
    /** Whether the user is on a wide screen */
    isWideScreen = watchBreakpoint('(min-width: 1100px)');
    /** Overlay positions for the filter menu */
    filterMenuPositions = FILTER_MENU_POSITIONS;
    /** Current active filter */
    activeFilter = signal(undefined, ...(ngDevMode ? [{ debugName: "activeFilter" }] : []));
    /** Current active filter id */
    activeFilterId = computed(() => this.activeFilter()?.id, ...(ngDevMode ? [{ debugName: "activeFilterId" }] : []));
    /**
     * Updates filters on filter selection
     * @param category Filter category to update
     * @param selected Selected filter options
     */
    updateFilterSelection(category, selected = []) {
        const updated = { ...category, selected };
        this.filters.update((filters) => filters.map((filter) => (filter.id === category.id ? updated : filter)));
    }
    /**
     * Closes filter menu
     * @param category Filter category to close
     */
    closeFilterMenu(category) {
        this.activeFilter.update((current) => category !== undefined && current?.id !== category.id ? current : undefined);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FilterMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: FilterMenuComponent, isStandalone: true, selector: "hra-filter-menu", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, enableClose: { classPropertyName: "enableClose", publicName: "enableClose", isSignal: true, isRequired: false, transformFunction: null }, filters: { classPropertyName: "filters", publicName: "filters", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { filters: "filtersChange", closeClick: "closeClick" }, ngImport: i0, template: "@if (tagline() || description() || enableClose()) {\n  <div hraFeature=\"header\" class=\"intro section\">\n    <div class=\"tagline\">\n      <span class=\"title\">{{ tagline() }}</span>\n      <div class=\"filler\"></div>\n      @if (!isWideScreen() && enableClose()) {\n        <button\n          hraFeature=\"close\"\n          hraClickEvent\n          hraHoverEvent\n          mat-icon-button\n          aria-label=\"Close filter menu\"\n          (click)=\"closeClick.emit()\"\n        >\n          <hra-icon class=\"close\" fontIcon=\"close\" />\n        </button>\n      }\n    </div>\n    <div class=\"description\">{{ description() }}</div>\n  </div>\n}\n\n<ng-scrollbar hraScrollOverflowFade>\n  <div class=\"customize section\">\n    <div class=\"header\">\n      <hra-icon class=\"icon\" fontIcon=\"tune\" />\n      <span class=\"title\">Customize</span>\n    </div>\n    <div class=\"controls\">\n      <ng-content />\n    </div>\n  </div>\n\n  <div class=\"filters section\">\n    <div class=\"header\">\n      <hra-icon class=\"icon\" fontIcon=\"filter_list\" />\n      <span class=\"title\">Filters</span>\n    </div>\n    @for (filter of filters(); track $index) {\n      <hra-filter-container\n        enableDivider\n        cdkOverlayOrigin\n        [action]=\"filter.label\"\n        [chips]=\"filter.selected ?? []\"\n        (chipsChange)=\"updateFilterSelection(filter, $event)\"\n        (actionClick)=\"activeFilter.set(filter)\"\n        #filterMenuOrigin=\"cdkOverlayOrigin\"\n      />\n\n      <ng-template\n        cdkConnectedOverlay\n        cdkConnectedOverlayHasBackdrop=\"false\"\n        cdkConnectedOverlayLockPosition=\"true\"\n        cdkConnectedOverlayPush=\"true\"\n        [cdkConnectedOverlayOpen]=\"activeFilterId() === filter.id\"\n        [cdkConnectedOverlayOrigin]=\"filterMenuOrigin\"\n        [cdkConnectedOverlayPositions]=\"filterMenuPositions\"\n        (overlayOutsideClick)=\"closeFilterMenu(filter)\"\n        (detach)=\"closeFilterMenu(filter)\"\n      >\n        <hra-search-list\n          [options]=\"filter.options\"\n          [selected]=\"filter.selected ?? []\"\n          (selectedChange)=\"updateFilterSelection(filter, $event)\"\n        />\n      </ng-template>\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;height:100%;width:20rem;color:var(--mat-sys-secondary);gap:1.5rem}:host .header{display:flex;align-items:center;margin-bottom:1rem}:host .icon{padding:.5rem}:host .title{padding:.5rem 0;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .section{padding-right:1.5rem;padding-left:1.5rem;width:20rem}:host .intro{display:flex;flex-direction:column;gap:.25rem;margin-bottom:1rem;margin-top:1.5rem}:host .intro .tagline{display:flex;align-items:center;margin-bottom:.25rem}:host .intro .filler{flex-grow:1}:host .intro .description{color:var(--mat-sys-primary);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .customize:has(.customize-controls:empty){display:none}:host .customize .controls{display:flex;flex-direction:column;gap:1rem;padding-bottom:2.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "directive", type: i1.HoverEventDirective, selector: "[hraHoverEvent]", inputs: ["hraHoverEvent", "hraHoverEventTriggerOn", "hraHoverEventDisabled"], exportAs: ["hraHoverEvent"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i2.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i3.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i5.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "component", type: FilterContainerComponent, selector: "hra-filter-container", inputs: ["action", "showTooltip", "chips", "enableDivider"], outputs: ["chipsChange", "actionClick"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i6.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i6.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "component", type: SearchListComponent, selector: "hra-search-list", inputs: ["disableSearch", "disableRipple", "options", "selected", "search"], outputs: ["selectedChange", "searchChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FilterMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-filter-menu', imports: [
                        HraCommonModule,
                        ScrollingModule,
                        ScrollOverflowFadeDirective,
                        ButtonsModule,
                        IconsModule,
                        FilterContainerComponent,
                        OverlayModule,
                        SearchListComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (tagline() || description() || enableClose()) {\n  <div hraFeature=\"header\" class=\"intro section\">\n    <div class=\"tagline\">\n      <span class=\"title\">{{ tagline() }}</span>\n      <div class=\"filler\"></div>\n      @if (!isWideScreen() && enableClose()) {\n        <button\n          hraFeature=\"close\"\n          hraClickEvent\n          hraHoverEvent\n          mat-icon-button\n          aria-label=\"Close filter menu\"\n          (click)=\"closeClick.emit()\"\n        >\n          <hra-icon class=\"close\" fontIcon=\"close\" />\n        </button>\n      }\n    </div>\n    <div class=\"description\">{{ description() }}</div>\n  </div>\n}\n\n<ng-scrollbar hraScrollOverflowFade>\n  <div class=\"customize section\">\n    <div class=\"header\">\n      <hra-icon class=\"icon\" fontIcon=\"tune\" />\n      <span class=\"title\">Customize</span>\n    </div>\n    <div class=\"controls\">\n      <ng-content />\n    </div>\n  </div>\n\n  <div class=\"filters section\">\n    <div class=\"header\">\n      <hra-icon class=\"icon\" fontIcon=\"filter_list\" />\n      <span class=\"title\">Filters</span>\n    </div>\n    @for (filter of filters(); track $index) {\n      <hra-filter-container\n        enableDivider\n        cdkOverlayOrigin\n        [action]=\"filter.label\"\n        [chips]=\"filter.selected ?? []\"\n        (chipsChange)=\"updateFilterSelection(filter, $event)\"\n        (actionClick)=\"activeFilter.set(filter)\"\n        #filterMenuOrigin=\"cdkOverlayOrigin\"\n      />\n\n      <ng-template\n        cdkConnectedOverlay\n        cdkConnectedOverlayHasBackdrop=\"false\"\n        cdkConnectedOverlayLockPosition=\"true\"\n        cdkConnectedOverlayPush=\"true\"\n        [cdkConnectedOverlayOpen]=\"activeFilterId() === filter.id\"\n        [cdkConnectedOverlayOrigin]=\"filterMenuOrigin\"\n        [cdkConnectedOverlayPositions]=\"filterMenuPositions\"\n        (overlayOutsideClick)=\"closeFilterMenu(filter)\"\n        (detach)=\"closeFilterMenu(filter)\"\n      >\n        <hra-search-list\n          [options]=\"filter.options\"\n          [selected]=\"filter.selected ?? []\"\n          (selectedChange)=\"updateFilterSelection(filter, $event)\"\n        />\n      </ng-template>\n    }\n  </div>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;height:100%;width:20rem;color:var(--mat-sys-secondary);gap:1.5rem}:host .header{display:flex;align-items:center;margin-bottom:1rem}:host .icon{padding:.5rem}:host .title{padding:.5rem 0;font:var(--mat-sys-title-small);letter-spacing:var(--mat-sys-title-small-tracking)}:host .section{padding-right:1.5rem;padding-left:1.5rem;width:20rem}:host .intro{display:flex;flex-direction:column;gap:.25rem;margin-bottom:1rem;margin-top:1.5rem}:host .intro .tagline{display:flex;align-items:center;margin-bottom:.25rem}:host .intro .filler{flex-grow:1}:host .intro .description{color:var(--mat-sys-primary);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .customize:has(.customize-controls:empty){display:none}:host .customize .controls{display:flex;flex-direction:column;gap:1rem;padding-bottom:2.5rem}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }], enableClose: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableClose", required: false }] }], filters: [{ type: i0.Input, args: [{ isSignal: true, alias: "filters", required: true }] }, { type: i0.Output, args: ["filtersChange"] }], closeClick: [{ type: i0.Output, args: ["closeClick"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { FilterMenuComponent };
//# sourceMappingURL=hra-ui-design-system-filter-menu.mjs.map
