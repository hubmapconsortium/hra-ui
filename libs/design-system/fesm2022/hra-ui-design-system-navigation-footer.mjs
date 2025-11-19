import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatIconModule } from '@angular/material/icon';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i3 from '@hra-ui/design-system/buttons/social-media-button';
import { SOCIAL_IDS } from '@hra-ui/design-system/buttons/social-media-button';
import * as z from 'zod';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@hra-ui/common/url';
import * as i5 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import * as i2$1 from '@hra-ui/design-system/brand/logo';
import * as i4 from '@hra-ui/design-system/buttons/text-hyperlink';

/** Schema for a funder item */
const FunderSchema = z
    .object({
    id: z.string().brand(),
    name: z.string(),
    link: z.string().url(),
    image: z.string(),
})
    .meta({ id: 'Funder' });
/** Schema for multiple funders */
const FundersSchema = z
    .object({
    $schema: z.string(),
    funders: FunderSchema.array(),
})
    .meta({ id: 'Funders' });

var $schema = "../types/funders.schema.json";
var funders = [
	{
		id: "nih",
		name: "National Institutes of Health",
		link: "https://www.nih.gov/",
		image: "assets/logo/nih.svg"
	},
	{
		id: "ada",
		name: "American Dental Association",
		link: "https://www.ada.org/",
		image: "assets/logo/ada.svg"
	},
	{
		id: "iu",
		name: "Indiana University",
		link: "https://www.iu.edu/",
		image: "assets/logo/iu.svg"
	},
	{
		id: "cifar",
		name: "The Canadian Institute for Advanced Research",
		link: "https://cifar.ca/",
		image: "assets/logo/cifar.svg"
	}
];
var RAW_FUNDERS = {
	$schema: $schema,
	funders: funders
};

/** Parsed funders static data */
const FUNDERS = FundersSchema.parse(RAW_FUNDERS).funders;
/** All available funder ids */
const FUNDER_IDS = FUNDERS.map(({ id }) => id);

/** Displays a list of funders */
class FundingComponent {
    /** Funders to display */
    funders = input.required(...(ngDevMode ? [{ debugName: "funders" }] : []));
    /** Associated data for each funder displayed */
    fundersData = computed(() => {
        const ids = new Set(this.funders());
        return FUNDERS.filter((item) => ids.has(item.id));
    }, ...(ngDevMode ? [{ debugName: "fundersData" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FundingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: FundingComponent, isStandalone: true, selector: "hra-funding", inputs: { funders: { classPropertyName: "funders", publicName: "funders", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-container hraFeature=\"funder\">\n  <span class=\"title\">Funded By:</span>\n  <div class=\"funders\">\n    @for (funder of fundersData(); track funder.name) {\n      <a hraClickEvent class=\"funder\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"funder.link\">\n        <img [attr.src]=\"funder.image | assetUrl\" [alt]=\"funder.name\" />\n      </a>\n    }\n  </div>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;color:var(--mat-sys-primary)}:host .title{margin-bottom:.5rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .funders{display:flex;gap:1rem}:host .funder{display:flex;flex-direction:row;width:2.5rem}:host .funder img{min-width:2.5rem;height:2.5rem;object-fit:none}:host .funder span{margin:0 1rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "pipe", type: i2.AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FundingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-funding', imports: [HraCommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"funder\">\n  <span class=\"title\">Funded By:</span>\n  <div class=\"funders\">\n    @for (funder of fundersData(); track funder.name) {\n      <a hraClickEvent class=\"funder\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"funder.link\">\n        <img [attr.src]=\"funder.image | assetUrl\" [alt]=\"funder.name\" />\n      </a>\n    }\n  </div>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;color:var(--mat-sys-primary)}:host .title{margin-bottom:.5rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .funders{display:flex;gap:1rem}:host .funder{display:flex;flex-direction:row;width:2.5rem}:host .funder img{min-width:2.5rem;height:2.5rem;object-fit:none}:host .funder span{margin:0 1rem}\n"] }]
        }], propDecorators: { funders: [{ type: i0.Input, args: [{ isSignal: true, alias: "funders", required: true }] }] } });

/**
 * Global footer component
 */
class FooterComponent {
    /** List of funders to show */
    funders = input(FUNDER_IDS, ...(ngDevMode ? [{ debugName: "funders" }] : []));
    /** List of social media link to show */
    socials = input(SOCIAL_IDS, ...(ngDevMode ? [{ debugName: "socials" }] : []));
    /** inject Privacy Preference Service */
    privacyPreferences = inject(PrivacyPreferencesService);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: FooterComponent, isStandalone: true, selector: "hra-footer", inputs: { funders: { classPropertyName: "funders", publicName: "funders", isSignal: true, isRequired: false, transformFunction: null }, socials: { classPropertyName: "socials", publicName: "socials", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<ng-container hraFeature=\"footer\">\n  <div class=\"content-container\">\n    <hra-brand-logo class=\"logo\" />\n\n    <hra-funding [funders]=\"funders()\" />\n    <div class=\"disclaimer\">\n      <p style=\"margin-bottom: 0.75rem\">\n        Medical Disclaimer: This resource is intended for research purposes only. It should not be used for emergencies\n        or medical or professional advice.\n      </p>\n      <p>\n        <a hraHyperlink hraFeature=\"hubmap-consortium\" href=\"https://hubmapconsortium.org/\">HuBMAP</a>\n        data is managed and published in the\n        <a hraHyperlink hraFeature=\"hubmap-data-portal\" href=\"https://portal.hubmapconsortium.org/\">Data Portal</a> and\n        <a hraHyperlink hraFeature=\"hra\" href=\"https://humanatlas.io/\">Human Reference Atlas</a> according to\n        <a hraHyperlink hraFeature=\"fair-principles\" href=\"https://www.go-fair.org/fair-principles/\">FAIR principles</a\n        >, including standardized processing with reproducible pipelines. HuBMAP data may also be processed by other\n        methods in scientific results published by HuBMAP consortium collaborations.\n      </p>\n    </div>\n  </div>\n\n  <mat-divider />\n\n  <div class=\"socials-container\">\n    <div class=\"socials\">\n      @for (id of socials(); track id) {\n        <hra-social-media-button size=\"large\" variant=\"color\" [id]=\"$any(id)\" />\n      }\n    </div>\n\n    <span class=\"privacy\">\n      <button hraTextButton (click)=\"privacyPreferences.openPrivacyPreferences('manage')\">Privacy Preferences</button>\n      &#183;\n      <a hraHyperlink hraFeature=\"hra-privacy-policy\" href=\"https://humanatlas.io/privacy-policy\">Privacy Policy</a>\n    </span>\n\n    <span class=\"copyright\">\n      \u00A9 2025\n      <a hraHyperlink hraFeature=\"cns-landing-page\" href=\"https://cns.iu.edu/\"\n        >Cyberinfrastructure for Network Science Center</a\n      >\n      at\n      <a hraHyperlink hraFeature=\"iu-landing-page\" href=\"https://www.iu.edu/\">Indiana University</a>\n    </span>\n  </div>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;padding:2.5rem;background-color:var(--mat-sys-surface-bright);align-items:center;--mat-divider-color: var(--mat-sys-outline-variant)}:host>*{width:100%;max-width:1440px;min-width:640px}:host .content-container{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;gap:2.5rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);margin-bottom:2.5rem}:host .content-container hra-brand-logo,:host .content-container hra-funding{flex:0 0 auto}:host .content-container .disclaimer{flex:1 1 560px;min-width:0}:host .socials-container{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;align-items:center;font:var(--mat-sys-label-medium);margin-top:2.5rem;gap:2.5rem}:host .disclaimer p{margin:0}@media(min-width:1024px){:host .content-container{flex-wrap:nowrap;justify-content:flex-start}}@media(min-width:320px)and (max-width:639px){:host{padding:2.5rem 1.25rem}:host>*{min-width:320px}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: BrandModule }, { kind: "component", type: i2$1.BrandLogoComponent, selector: "hra-brand-logo", inputs: ["size", "logos"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.SocialMediaButtonComponent, selector: "hra-social-media-button", inputs: ["id", "size", "variant"] }, { kind: "directive", type: i4.TextButtonDirective, selector: "button[hraTextButton]" }, { kind: "directive", type: i4.TextHyperlinkDirective, selector: "a[hraHyperlink]" }, { kind: "component", type: FundingComponent, selector: "hra-funding", inputs: ["funders"] }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i5.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-footer', imports: [HraCommonModule, MatIconModule, BrandModule, ButtonsModule, FundingComponent, MatDividerModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"footer\">\n  <div class=\"content-container\">\n    <hra-brand-logo class=\"logo\" />\n\n    <hra-funding [funders]=\"funders()\" />\n    <div class=\"disclaimer\">\n      <p style=\"margin-bottom: 0.75rem\">\n        Medical Disclaimer: This resource is intended for research purposes only. It should not be used for emergencies\n        or medical or professional advice.\n      </p>\n      <p>\n        <a hraHyperlink hraFeature=\"hubmap-consortium\" href=\"https://hubmapconsortium.org/\">HuBMAP</a>\n        data is managed and published in the\n        <a hraHyperlink hraFeature=\"hubmap-data-portal\" href=\"https://portal.hubmapconsortium.org/\">Data Portal</a> and\n        <a hraHyperlink hraFeature=\"hra\" href=\"https://humanatlas.io/\">Human Reference Atlas</a> according to\n        <a hraHyperlink hraFeature=\"fair-principles\" href=\"https://www.go-fair.org/fair-principles/\">FAIR principles</a\n        >, including standardized processing with reproducible pipelines. HuBMAP data may also be processed by other\n        methods in scientific results published by HuBMAP consortium collaborations.\n      </p>\n    </div>\n  </div>\n\n  <mat-divider />\n\n  <div class=\"socials-container\">\n    <div class=\"socials\">\n      @for (id of socials(); track id) {\n        <hra-social-media-button size=\"large\" variant=\"color\" [id]=\"$any(id)\" />\n      }\n    </div>\n\n    <span class=\"privacy\">\n      <button hraTextButton (click)=\"privacyPreferences.openPrivacyPreferences('manage')\">Privacy Preferences</button>\n      &#183;\n      <a hraHyperlink hraFeature=\"hra-privacy-policy\" href=\"https://humanatlas.io/privacy-policy\">Privacy Policy</a>\n    </span>\n\n    <span class=\"copyright\">\n      \u00A9 2025\n      <a hraHyperlink hraFeature=\"cns-landing-page\" href=\"https://cns.iu.edu/\"\n        >Cyberinfrastructure for Network Science Center</a\n      >\n      at\n      <a hraHyperlink hraFeature=\"iu-landing-page\" href=\"https://www.iu.edu/\">Indiana University</a>\n    </span>\n  </div>\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;padding:2.5rem;background-color:var(--mat-sys-surface-bright);align-items:center;--mat-divider-color: var(--mat-sys-outline-variant)}:host>*{width:100%;max-width:1440px;min-width:640px}:host .content-container{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;gap:2.5rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);margin-bottom:2.5rem}:host .content-container hra-brand-logo,:host .content-container hra-funding{flex:0 0 auto}:host .content-container .disclaimer{flex:1 1 560px;min-width:0}:host .socials-container{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap;align-items:center;font:var(--mat-sys-label-medium);margin-top:2.5rem;gap:2.5rem}:host .disclaimer p{margin:0}@media(min-width:1024px){:host .content-container{flex-wrap:nowrap;justify-content:flex-start}}@media(min-width:320px)and (max-width:639px){:host{padding:2.5rem 1.25rem}:host>*{min-width:320px}}\n"] }]
        }], propDecorators: { funders: [{ type: i0.Input, args: [{ isSignal: true, alias: "funders", required: false }] }], socials: [{ type: i0.Input, args: [{ isSignal: true, alias: "socials", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { FUNDER_IDS, FooterComponent };
//# sourceMappingURL=hra-ui-design-system-navigation-footer.mjs.map
