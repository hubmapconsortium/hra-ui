import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { ActionCardComponent, ActionCardActionComponent } from '@hra-ui/design-system/cards/action-card';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';

class CardsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: CardsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: CardsModule, imports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent], exports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: CardsModule, imports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent, FlatCardModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: CardsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent],
                    exports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CardsModule };
//# sourceMappingURL=hra-ui-design-system-cards.mjs.map
