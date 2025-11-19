import * as i0 from '@angular/core';
import { input, model, numberAttribute, Component } from '@angular/core';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i2 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';

/**
 * Search Filter Component
 */
class SearchFilterComponent {
    /** Label for the form field */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : []));
    /** Current search query as a model */
    search = model('', ...(ngDevMode ? [{ debugName: "search" }] : []));
    /** Total number of options */
    totalCount = input.required(...(ngDevMode ? [{ debugName: "totalCount", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Number of currently visible/filtered options */
    viewingCount = input.required(...(ngDevMode ? [{ debugName: "viewingCount", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SearchFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.12", type: SearchFilterComponent, isStandalone: true, selector: "hra-search-filter", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, search: { classPropertyName: "search", publicName: "search", isSignal: true, isRequired: false, transformFunction: null }, totalCount: { classPropertyName: "totalCount", publicName: "totalCount", isSignal: true, isRequired: true, transformFunction: null }, viewingCount: { classPropertyName: "viewingCount", publicName: "viewingCount", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { search: "searchChange" }, ngImport: i0, template: "<mat-form-field class=\"search-field\" subscriptSizing=\"dynamic\">\n  <mat-label>{{ label() }}</mat-label>\n\n  <mat-icon matPrefix>search</mat-icon>\n\n  <input matInput type=\"text\" [(ngModel)]=\"search\" />\n</mat-form-field>\n\n<hra-results-indicator class=\"results-counter\" [value]=\"viewingCount()\" [total]=\"totalCount()\" />\n", styles: [":host{display:flex;align-items:center;justify-content:space-between;width:100%}:host .search-field{flex:1;min-width:160px;max-width:580px}:host .results-counter{min-width:5.25rem;max-width:7.5rem;white-space:nowrap}@media(max-width:48rem){:host{flex-direction:column;align-items:stretch;gap:8px}:host .results-counter{align-self:flex-end}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: ResultsIndicatorComponent, selector: "hra-results-indicator", inputs: ["value", "total", "description", "separator"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SearchFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-search-filter', imports: [HraCommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ResultsIndicatorComponent], standalone: true, template: "<mat-form-field class=\"search-field\" subscriptSizing=\"dynamic\">\n  <mat-label>{{ label() }}</mat-label>\n\n  <mat-icon matPrefix>search</mat-icon>\n\n  <input matInput type=\"text\" [(ngModel)]=\"search\" />\n</mat-form-field>\n\n<hra-results-indicator class=\"results-counter\" [value]=\"viewingCount()\" [total]=\"totalCount()\" />\n", styles: [":host{display:flex;align-items:center;justify-content:space-between;width:100%}:host .search-field{flex:1;min-width:160px;max-width:580px}:host .results-counter{min-width:5.25rem;max-width:7.5rem;white-space:nowrap}@media(max-width:48rem){:host{flex-direction:column;align-items:stretch;gap:8px}:host .results-counter{align-self:flex-end}}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: false }] }, { type: i0.Output, args: ["searchChange"] }], totalCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalCount", required: true }] }], viewingCount: [{ type: i0.Input, args: [{ isSignal: true, alias: "viewingCount", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SearchFilterComponent };
//# sourceMappingURL=hra-ui-design-system-search-filter.mjs.map
