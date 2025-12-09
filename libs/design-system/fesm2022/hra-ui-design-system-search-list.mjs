import * as i0 from '@angular/core';
import { input, booleanAttribute, model, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i6 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i10 from '@hra-ui/common';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import * as i4 from '@hra-ui/design-system/scrolling';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import * as i5 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i7 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i8 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@angular/material/icon';
import * as i3 from 'ngx-scrollbar';
import * as i9 from '@angular/common';

/**
 * Keyboard-accessible filter list flyout menu with an optional search text field with autocomplete
 */
class SearchListComponent {
    /** Whether to hide the autocomplete search bar */
    disableSearch = input(false, ...(ngDevMode ? [{ debugName: "disableSearch", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Whether to disable the ripple effect for list items */
    disableRipple = input(false, ...(ngDevMode ? [{ debugName: "disableRipple", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** All filter options */
    options = input.required(...(ngDevMode ? [{ debugName: "options" }] : []));
    /** Currently selected filters */
    selected = model([], ...(ngDevMode ? [{ debugName: "selected" }] : []));
    /** Current search bar value */
    search = model('', ...(ngDevMode ? [{ debugName: "search" }] : []));
    /** Filtered options (after typing in search bar) */
    filteredOptions = computed(() => this.doSearch(), ...(ngDevMode ? [{ debugName: "filteredOptions" }] : []));
    /**
     * Updates selected options on update
     * @param event Selected options in list
     */
    selectionUpdate(event) {
        this.selected.set(event.map((option) => option.value));
    }
    /** Filters options according to the search bar value */
    doSearch() {
        const searchTerm = this.search().toLowerCase();
        return this.options().filter((option) => option.label.toLowerCase().includes(searchTerm));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SearchListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: SearchListComponent, isStandalone: true, selector: "hra-search-list", inputs: { disableSearch: { classPropertyName: "disableSearch", publicName: "disableSearch", isSignal: true, isRequired: false, transformFunction: null }, disableRipple: { classPropertyName: "disableRipple", publicName: "disableRipple", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: true, transformFunction: null }, selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null }, search: { classPropertyName: "search", publicName: "search", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange", search: "searchChange" }, ngImport: i0, template: "@if (!disableSearch()) {\n  <mat-form-field hraFeature=\"search\" hraClickEvent class=\"search field\" subscriptSizing=\"dynamic\">\n    <mat-label class=\"search-label\">Search</mat-label>\n    <mat-icon class=\"search-icon\" matPrefix>search</mat-icon>\n    <input matInput type=\"text\" [(ngModel)]=\"search\" />\n  </mat-form-field>\n}\n\n<ng-scrollbar hraScrollOverflowFade class=\"filter-options\">\n  <mat-selection-list\n    [disableRipple]=\"disableRipple()\"\n    (selectionChange)=\"selectionUpdate(list.selectedOptions.selected)\"\n    #list\n  >\n    @for (option of filteredOptions(); track option.id) {\n      <mat-list-option\n        togglePosition=\"before\"\n        [hraFeature]=\"option.label | slugify\"\n        [value]=\"option\"\n        [selected]=\"selected().includes(option)\"\n        [attr.aria-label]=\"`Toggle ${option.id}`\"\n      >\n        <mat-label class=\"labels-count\">\n          <span class=\"option-labels\">\n            <div class=\"option-primary-label\">{{ option.label }}</div>\n            @if (option.secondaryLabel) {\n              <div class=\"option-secondary-label\">{{ option.secondaryLabel }}</div>\n            }\n          </span>\n          @if (option.count) {\n            <span class=\"option-count\">{{ option.count | number }}</span>\n          }\n        </mat-label>\n      </mat-list-option>\n    }\n  </mat-selection-list>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;width:19.5rem;max-height:22.25rem;background-color:var(--mat-sys-surface-container-low);border-radius:.5rem;box-shadow:0 5px 4px rgb(from var(--mat-sys-on-background) r g b/16%);--mat-list-list-item-one-line-container-height: 2.5rem;--mat-form-field-container-vertical-padding: 13.5px}:host .search{width:100%;padding:1rem 1rem 0rem}:host .search .search-label{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .filter-options{margin:.5rem 0}:host .labels-count{display:flex;justify-content:space-between;align-items:center;height:2.5rem;gap:.75rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .option-labels{display:flex;flex-direction:column;width:0;flex-grow:1}:host .option-primary-label{overflow:hidden;text-overflow:ellipsis}:host .option-secondary-label{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .option-secondary-label,:host .option-count{color:var(--mat-sys-primary)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i3.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i4.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset"] }, { kind: "ngmodule", type: MatAutocompleteModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "ngmodule", type: MatListModule }, { kind: "component", type: i8.MatSelectionList, selector: "mat-selection-list", inputs: ["color", "compareWith", "multiple", "hideSingleSelectionIndicator", "disabled"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { kind: "component", type: i8.MatListOption, selector: "mat-list-option", inputs: ["togglePosition", "checkboxPosition", "color", "value", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { kind: "pipe", type: i9.DecimalPipe, name: "number" }, { kind: "pipe", type: i10.SlugifyPipe, name: "slugify" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SearchListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-search-list', imports: [
                        HraCommonModule,
                        IconsModule,
                        ButtonsModule,
                        ScrollingModule,
                        ScrollOverflowFadeDirective,
                        MatAutocompleteModule,
                        FormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        ReactiveFormsModule,
                        MatListModule,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!disableSearch()) {\n  <mat-form-field hraFeature=\"search\" hraClickEvent class=\"search field\" subscriptSizing=\"dynamic\">\n    <mat-label class=\"search-label\">Search</mat-label>\n    <mat-icon class=\"search-icon\" matPrefix>search</mat-icon>\n    <input matInput type=\"text\" [(ngModel)]=\"search\" />\n  </mat-form-field>\n}\n\n<ng-scrollbar hraScrollOverflowFade class=\"filter-options\">\n  <mat-selection-list\n    [disableRipple]=\"disableRipple()\"\n    (selectionChange)=\"selectionUpdate(list.selectedOptions.selected)\"\n    #list\n  >\n    @for (option of filteredOptions(); track option.id) {\n      <mat-list-option\n        togglePosition=\"before\"\n        [hraFeature]=\"option.label | slugify\"\n        [value]=\"option\"\n        [selected]=\"selected().includes(option)\"\n        [attr.aria-label]=\"`Toggle ${option.id}`\"\n      >\n        <mat-label class=\"labels-count\">\n          <span class=\"option-labels\">\n            <div class=\"option-primary-label\">{{ option.label }}</div>\n            @if (option.secondaryLabel) {\n              <div class=\"option-secondary-label\">{{ option.secondaryLabel }}</div>\n            }\n          </span>\n          @if (option.count) {\n            <span class=\"option-count\">{{ option.count | number }}</span>\n          }\n        </mat-label>\n      </mat-list-option>\n    }\n  </mat-selection-list>\n</ng-scrollbar>\n", styles: [":host{display:flex;flex-direction:column;width:19.5rem;max-height:22.25rem;background-color:var(--mat-sys-surface-container-low);border-radius:.5rem;box-shadow:0 5px 4px rgb(from var(--mat-sys-on-background) r g b/16%);--mat-list-list-item-one-line-container-height: 2.5rem;--mat-form-field-container-vertical-padding: 13.5px}:host .search{width:100%;padding:1rem 1rem 0rem}:host .search .search-label{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .filter-options{margin:.5rem 0}:host .labels-count{display:flex;justify-content:space-between;align-items:center;height:2.5rem;gap:.75rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .option-labels{display:flex;flex-direction:column;width:0;flex-grow:1}:host .option-primary-label{overflow:hidden;text-overflow:ellipsis}:host .option-secondary-label{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking)}:host .option-secondary-label,:host .option-count{color:var(--mat-sys-primary)}\n"] }]
        }], propDecorators: { disableSearch: [{ type: i0.Input, args: [{ isSignal: true, alias: "disableSearch", required: false }] }], disableRipple: [{ type: i0.Input, args: [{ isSignal: true, alias: "disableRipple", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: true }] }], selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }, { type: i0.Output, args: ["selectedChange"] }], search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: false }] }, { type: i0.Output, args: ["searchChange"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SearchListComponent };
//# sourceMappingURL=hra-ui-design-system-search-list.mjs.map
