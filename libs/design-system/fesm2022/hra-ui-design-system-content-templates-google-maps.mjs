import * as i0 from '@angular/core';
import { inject, input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HraCommonModule } from '@hra-ui/common';
import * as i1 from '@hra-ui/common/analytics';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import * as i2 from '@angular/material/button';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Google Maps wrapper component to load and display Google Maps.
 */
class GoogleMapsComponent {
    /** DOM sanitizer */
    sanitizer = inject(DomSanitizer);
    /** Maps URL for the iframe */
    url = input.required(...(ngDevMode ? [{ debugName: "url" }] : []));
    /** Trusted URL for the iframe */
    mapsUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.url()), ...(ngDevMode ? [{ debugName: "mapsUrl" }] : []));
    /** External URL to open in new tab if cookies are disabled */
    externalUrl = input.required(...(ngDevMode ? [{ debugName: "externalUrl" }] : []));
    /** Fallback image URL to show if cookies are disabled */
    fallbackImageUrl = input.required(...(ngDevMode ? [{ debugName: "fallbackImageUrl" }] : []));
    /** Consent service */
    consentService = inject(ConsentService);
    /** Privacy preferences service */
    privacyPreferencesService = inject(PrivacyPreferencesService);
    /** Flag indicating whether marketing cookies are enabled */
    enabled = computed(() => this.consentService.isCategoryEnabled(EventCategory.Marketing), ...(ngDevMode ? [{ debugName: "enabled" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: GoogleMapsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: GoogleMapsComponent, isStandalone: true, selector: "hra-google-maps", inputs: { url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: true, transformFunction: null }, externalUrl: { classPropertyName: "externalUrl", publicName: "externalUrl", isSignal: true, isRequired: true, transformFunction: null }, fallbackImageUrl: { classPropertyName: "fallbackImageUrl", publicName: "fallbackImageUrl", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@if (enabled()) {\n  <iframe frameBorder=\"0\" class=\"google-maps\" [attr.src]=\"mapsUrl()\"></iframe>\n} @else {\n  <a hraFeature=\"maps-placeholder\" hraClickEvent target=\"_blank\" [attr.href]=\"externalUrl()\">\n    <img class=\"maps-placeholder\" alt=\"Google Maps\" [attr.src]=\"fallbackImageUrl()\" />\n  </a>\n  <div class=\"enable-cookies\">\n    <!-- TODO: Change to hraTextButton once implemented -->\n    <button\n      hraFeature=\"enable-cookies\"\n      hraClickEvent\n      mat-button\n      class=\"link\"\n      disableRipple\n      (click)=\"privacyPreferencesService.openPrivacyPreferences('consent')\"\n    >\n      Enable cookies\n    </button>\n    to view Google Maps\n  </div>\n}\n", styles: [":host{display:block}:host .google-maps{width:100%;height:100%;aspect-ratio:16/9}:host .maps-placeholder{aspect-ratio:16/9;width:100%;height:auto}:host .enable-cookies{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-primary);margin-top:.5rem}:host .enable-cookies .link{color:var(--mat-sys-primary);text-decoration:underline;--mat-button-text-container-height: auto;--mat-button-text-horizontal-padding: .125rem;--mat-button-text-hover-state-layer-opacity: 0;--mat-button-text-pressed-state-layer-opacity: 0}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: GoogleMapsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-google-maps', imports: [HraCommonModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (enabled()) {\n  <iframe frameBorder=\"0\" class=\"google-maps\" [attr.src]=\"mapsUrl()\"></iframe>\n} @else {\n  <a hraFeature=\"maps-placeholder\" hraClickEvent target=\"_blank\" [attr.href]=\"externalUrl()\">\n    <img class=\"maps-placeholder\" alt=\"Google Maps\" [attr.src]=\"fallbackImageUrl()\" />\n  </a>\n  <div class=\"enable-cookies\">\n    <!-- TODO: Change to hraTextButton once implemented -->\n    <button\n      hraFeature=\"enable-cookies\"\n      hraClickEvent\n      mat-button\n      class=\"link\"\n      disableRipple\n      (click)=\"privacyPreferencesService.openPrivacyPreferences('consent')\"\n    >\n      Enable cookies\n    </button>\n    to view Google Maps\n  </div>\n}\n", styles: [":host{display:block}:host .google-maps{width:100%;height:100%;aspect-ratio:16/9}:host .maps-placeholder{aspect-ratio:16/9;width:100%;height:auto}:host .enable-cookies{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-primary);margin-top:.5rem}:host .enable-cookies .link{color:var(--mat-sys-primary);text-decoration:underline;--mat-button-text-container-height: auto;--mat-button-text-horizontal-padding: .125rem;--mat-button-text-hover-state-layer-opacity: 0;--mat-button-text-pressed-state-layer-opacity: 0}\n"] }]
        }], propDecorators: { url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: true }] }], externalUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "externalUrl", required: true }] }], fallbackImageUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "fallbackImageUrl", required: true }] }] } });

/** Schema for Google Maps component */
const GoogleMapsSchema = ContentTemplateSchema.extend({
    component: z.literal('GoogleMaps'),
    url: z.string(),
    externalUrl: z.string(),
    fallbackImageUrl: z.string(),
});

/** Content template definition for GoogleMapsComponent */
const GoogleMapsDef = {
    component: GoogleMapsComponent,
    spec: GoogleMapsSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { GoogleMapsComponent, GoogleMapsDef, GoogleMapsSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-google-maps.mjs.map
