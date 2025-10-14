import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';

/**
 * Error Pages Module - Contains components for displaying error pages
 */
class ErrorPagesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ErrorPagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.3", ngImport: i0, type: ErrorPagesModule, imports: [NotFoundPageComponent], exports: [NotFoundPageComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ErrorPagesModule, imports: [NotFoundPageComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ErrorPagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NotFoundPageComponent],
                    exports: [NotFoundPageComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ErrorPagesModule };
//# sourceMappingURL=hra-ui-design-system-error-pages.mjs.map
