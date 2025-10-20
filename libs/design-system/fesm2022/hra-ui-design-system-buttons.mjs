import * as i0 from '@angular/core';
import { NgModule, makeEnvironmentProviders } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { AppNavButtonComponent } from '@hra-ui/design-system/buttons/app-nav-button';
import { BreadcrumbsComponent } from '@hra-ui/design-system/buttons/breadcrumbs';
import { ButtonSizeDirective, ButtonVariantDirective, CtaButtonDirective, PrimaryButtonVariantDirective, SecondaryButtonVariantDirective } from '@hra-ui/design-system/buttons/button';
import { ButtonToggleSizeDirective, provideButtonToggle } from '@hra-ui/design-system/buttons/button-toggle';
import { CheckboxErrorVariantDirective } from '@hra-ui/design-system/buttons/checkbox';
import { HelpButtonComponent } from '@hra-ui/design-system/buttons/help-button';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { InfoButtonComponent, InfoButtonTooltipContentComponent } from '@hra-ui/design-system/buttons/info-button';
import { NavigationCategoryToggleComponent } from '@hra-ui/design-system/buttons/navigation-category-toggle';
import { SocialMediaButtonComponent } from '@hra-ui/design-system/buttons/social-media-button';
import { TextHyperlinkComponent, TextHyperlinkDirective, provideTextHyperlink } from '@hra-ui/design-system/buttons/text-hyperlink';
import { provideRadioButton } from '@hra-ui/design-system/buttons/radio-button';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    IconButtonModule,
    InfoButtonComponent,
    InfoButtonTooltipContentComponent,
    AppNavButtonComponent,
    BreadcrumbsComponent,
    ButtonSizeDirective,
    ButtonToggleSizeDirective,
    ButtonVariantDirective,
    CheckboxErrorVariantDirective,
    CtaButtonDirective,
    HelpButtonComponent,
    NavigationCategoryToggleComponent,
    PrimaryButtonVariantDirective,
    SecondaryButtonVariantDirective,
    SocialMediaButtonComponent,
    TextHyperlinkComponent,
    TextHyperlinkDirective,
];
/** Packages up subpackage angular exports for easier use */
class ButtonsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.3", ngImport: i0, type: ButtonsModule, imports: [MatButtonModule,
            MatButtonToggleModule,
            MatChipsModule,
            IconButtonModule,
            InfoButtonComponent,
            InfoButtonTooltipContentComponent,
            AppNavButtonComponent,
            BreadcrumbsComponent,
            ButtonSizeDirective,
            ButtonToggleSizeDirective,
            ButtonVariantDirective,
            CheckboxErrorVariantDirective,
            CtaButtonDirective,
            HelpButtonComponent,
            NavigationCategoryToggleComponent,
            PrimaryButtonVariantDirective,
            SecondaryButtonVariantDirective,
            SocialMediaButtonComponent,
            TextHyperlinkComponent,
            TextHyperlinkDirective], exports: [MatButtonModule,
            MatButtonToggleModule,
            MatChipsModule,
            IconButtonModule,
            InfoButtonComponent,
            InfoButtonTooltipContentComponent,
            AppNavButtonComponent,
            BreadcrumbsComponent,
            ButtonSizeDirective,
            ButtonToggleSizeDirective,
            ButtonVariantDirective,
            CheckboxErrorVariantDirective,
            CtaButtonDirective,
            HelpButtonComponent,
            NavigationCategoryToggleComponent,
            PrimaryButtonVariantDirective,
            SecondaryButtonVariantDirective,
            SocialMediaButtonComponent,
            TextHyperlinkComponent,
            TextHyperlinkDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ButtonsModule, imports: [MatButtonModule,
            MatButtonToggleModule,
            MatChipsModule,
            IconButtonModule,
            InfoButtonComponent,
            InfoButtonTooltipContentComponent,
            AppNavButtonComponent,
            BreadcrumbsComponent,
            HelpButtonComponent,
            NavigationCategoryToggleComponent,
            SocialMediaButtonComponent,
            TextHyperlinkComponent,
            MatButtonModule,
            MatButtonToggleModule,
            MatChipsModule,
            IconButtonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: REEXPORTS,
                    exports: REEXPORTS,
                }]
        }] });

/**
 * Collects all subpackage providers into a single provider function.
 *
 * @returns Button providers
 */
function provideButtons() {
    return makeEnvironmentProviders([provideButtonToggle(), provideRadioButton(), provideTextHyperlink()]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonsModule, provideButtons };
//# sourceMappingURL=hra-ui-design-system-buttons.mjs.map
