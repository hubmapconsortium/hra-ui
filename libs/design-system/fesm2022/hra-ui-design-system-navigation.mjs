import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { BackButtonBarComponent } from '@hra-ui/design-system/navigation/back-button-bar';
import { CtaBarComponent } from '@hra-ui/design-system/navigation/cta-bar';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { SiteNavigationComponent } from '@hra-ui/design-system/navigation/site-navigation';

/** All sub library components, module, etc. */
const REEXPORTS = [BackButtonBarComponent, CtaBarComponent, FooterComponent, HeaderComponent, SiteNavigationComponent];
/** Exports all brand components, modules, etc. */
class NavigationModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: NavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.12", ngImport: i0, type: NavigationModule, imports: [BackButtonBarComponent, CtaBarComponent, FooterComponent, HeaderComponent, SiteNavigationComponent], exports: [BackButtonBarComponent, CtaBarComponent, FooterComponent, HeaderComponent, SiteNavigationComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: NavigationModule, imports: [REEXPORTS] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: NavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: REEXPORTS,
                    exports: REEXPORTS,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NavigationModule };
//# sourceMappingURL=hra-ui-design-system-navigation.mjs.map
