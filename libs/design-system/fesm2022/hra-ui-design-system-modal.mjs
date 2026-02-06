import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { InfoModalComponent } from '@hra-ui/design-system/modal/info-modal';
import { ImageModalComponent } from '@hra-ui/design-system/modal/image-modal';

/** All sub library components, module, etc. */
const REEXPORTS = [InfoModalComponent, ImageModalComponent];
/** Exports all brand components, modules, etc. */
class ModalModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: ModalModule, imports: [InfoModalComponent, ImageModalComponent], exports: [InfoModalComponent, ImageModalComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ModalModule, imports: [REEXPORTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: REEXPORTS,
                    exports: REEXPORTS,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ModalModule };
//# sourceMappingURL=hra-ui-design-system-modal.mjs.map
