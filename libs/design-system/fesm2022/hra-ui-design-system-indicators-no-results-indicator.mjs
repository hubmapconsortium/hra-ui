import * as i0 from '@angular/core';
import { output, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i1 from '@angular/material/button';

/** No Results Indicator component */
class NoResultsIndicatorComponent {
    /** Output event that gets triggered on button click */
    clearFilters = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: NoResultsIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: NoResultsIndicatorComponent, isStandalone: true, selector: "hra-no-results-indicator", outputs: { clearFilters: "clearFilters" }, ngImport: i0, template: "<div class=\"indicator-text\">No results. Adjust filters or search again.</div>\n<button mat-flat-button (click)=\"clearFilters.emit()\">Clear filters</button>\n", styles: [":host{display:block}:host .indicator-text{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-secondary);margin-bottom:1.5rem;text-align:center}:host button{display:block;margin:0 auto}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: NoResultsIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-no-results-indicator', imports: [HraCommonModule, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"indicator-text\">No results. Adjust filters or search again.</div>\n<button mat-flat-button (click)=\"clearFilters.emit()\">Clear filters</button>\n", styles: [":host{display:block}:host .indicator-text{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-secondary);margin-bottom:1.5rem;text-align:center}:host button{display:block;margin:0 auto}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NoResultsIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-no-results-indicator.mjs.map
