import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { InfoMessageIndicatorComponent } from '@hra-ui/design-system/indicators/message-indicator/info-message-indicator';
import { DangerMessageIndicatorComponent } from '@hra-ui/design-system/indicators/message-indicator/danger-message-indicator';

/**
 * Module that contains the message indicator components.
 */
class MessageIndicatorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: MessageIndicatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: MessageIndicatorModule, imports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent], exports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: MessageIndicatorModule, imports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: MessageIndicatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent],
                    exports: [InfoMessageIndicatorComponent, DangerMessageIndicatorComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MessageIndicatorModule };
//# sourceMappingURL=hra-ui-design-system-indicators-message-indicator.mjs.map
