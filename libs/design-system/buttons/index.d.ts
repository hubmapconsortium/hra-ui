import * as i0 from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import * as i1 from '@angular/material/button';
import * as i2 from '@angular/material/button-toggle';
import * as i3 from '@angular/material/chips';
import * as i4 from '@hra-ui/design-system/buttons/icon-button';
import * as i5 from '@hra-ui/design-system/buttons/app-nav-button';
import * as i6 from '@hra-ui/design-system/buttons/breadcrumbs';
import * as i7 from '@hra-ui/design-system/buttons/button';
import * as i8 from '@hra-ui/design-system/buttons/button-toggle';
import * as i9 from '@hra-ui/design-system/buttons/checkbox';
import * as i10 from '@hra-ui/design-system/buttons/help-button';
import * as i11 from '@hra-ui/design-system/buttons/navigation-category-toggle';
import * as i12 from '@hra-ui/design-system/buttons/social-media-button';
import * as i13 from '@hra-ui/design-system/buttons/text-hyperlink';

/** Packages up subpackage angular exports for easier use */
declare class ButtonsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ButtonsModule, never, [typeof i1.MatButtonModule, typeof i2.MatButtonToggleModule, typeof i3.MatChipsModule, typeof i4.IconButtonModule, typeof i5.AppNavButtonComponent, typeof i6.BreadcrumbsComponent, typeof i7.ButtonSizeDirective, typeof i8.ButtonToggleSizeDirective, typeof i7.ButtonVariantDirective, typeof i9.CheckboxErrorVariantDirective, typeof i7.CtaButtonDirective, typeof i10.HelpButtonComponent, typeof i11.NavigationCategoryToggleComponent, typeof i7.PrimaryButtonVariantDirective, typeof i7.SecondaryButtonVariantDirective, typeof i12.SocialMediaButtonComponent, typeof i13.TextHyperlinkComponent, typeof i13.TextHyperlinkDirective], [typeof i1.MatButtonModule, typeof i2.MatButtonToggleModule, typeof i3.MatChipsModule, typeof i4.IconButtonModule, typeof i5.AppNavButtonComponent, typeof i6.BreadcrumbsComponent, typeof i7.ButtonSizeDirective, typeof i8.ButtonToggleSizeDirective, typeof i7.ButtonVariantDirective, typeof i9.CheckboxErrorVariantDirective, typeof i7.CtaButtonDirective, typeof i10.HelpButtonComponent, typeof i11.NavigationCategoryToggleComponent, typeof i7.PrimaryButtonVariantDirective, typeof i7.SecondaryButtonVariantDirective, typeof i12.SocialMediaButtonComponent, typeof i13.TextHyperlinkComponent, typeof i13.TextHyperlinkDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ButtonsModule>;
}

/**
 * Collects all subpackage providers into a single provider function.
 *
 * @returns Button providers
 */
declare function provideButtons(): EnvironmentProviders;

export { ButtonsModule, provideButtons };
