import * as i0 from '@angular/core';
import { model, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import * as i5$1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i5 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i7 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import * as i9 from '@hra-ui/design-system/scrolling';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i1 from '@angular/cdk/accordion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import * as i6 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EventCategory } from '@hra-ui/common/analytics/events';
import * as i2 from '@angular/material/button';
import * as i3 from '@angular/material/icon';
import * as i4 from '@hra-ui/design-system/buttons/text-hyperlink';
import * as i1$1 from '@hra-ui/design-system/brand/logo';
import * as i4$1 from '@hra-ui/design-system/buttons/button';
import * as i8 from 'ngx-scrollbar';

/**
 * Definitions for each category
 */
const CATEGORY_DEFS = [
    {
        id: EventCategory.Necessary,
        title: 'Necessary',
        description: `Necessary cookies and similar technologies make websites usable by enabling basic functions like page navigation.
      The website cannot function properly without this feature.`,
        provider: 'Human Reference Atlas',
        providerLink: 'https://humanatlas.io/privacy-policy',
        required: true,
    },
    {
        id: EventCategory.Preferences,
        title: 'Preferences',
        description: `Preference cookies remember your choices, like your preferred language or display settings.
      They help the site behave in a way that matches your preferences.`,
        details: 'We do not use cookies or technology of this type',
    },
    {
        id: EventCategory.Statistics,
        title: 'Statistics',
        description: `We use statistics cookies and similar technologies to collect aggregated,
      anonymous data that help us understand traffic patterns, popular pages, and overall performance.
      This information supports continuous improvements to our website.`,
        provider: 'Human Reference Atlas',
        providerLink: 'https://humanatlas.io/privacy-policy',
    },
    {
        id: EventCategory.Marketing,
        title: 'Marketing',
        description: `These cookies are used by third-party services, such as YouTube, to enable embedded video playback.
      If these cookies are disabled, embedded videos will not play on this site.`,
        provider: 'YouTube',
        providerLink: 'https://policies.google.com/privacy',
    },
];

/**
 * Categories Component
 */
class CategoriesComponent {
    /**
     * Categories  of categories component
     */
    categories = model.required(...(ngDevMode ? [{ debugName: "categories" }] : []));
    /** Definitions of all categories */
    categoryDefs = CATEGORY_DEFS;
    /** Toggle a category on or off
     * @param id - ID of the category to toggle
     * @param checked - Whether the category is enabled or disabled
     */
    toggleCategory(id, checked) {
        this.categories.update((current) => ({ ...current, [id]: checked }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CategoriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: CategoriesComponent, isStandalone: true, selector: "hra-categories", inputs: { categories: { classPropertyName: "categories", publicName: "categories", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { categories: "categoriesChange" }, ngImport: i0, template: "<cdk-accordion>\n  @for (def of categoryDefs; track def.id) {\n    @let headerId = `privacy-preferences-category-${def.id}-header`;\n    @let bodyId = `privacy-preferences-category-${def.id}-body`;\n\n    <cdk-accordion-item #item=\"cdkAccordionItem\">\n      <div class=\"header\" [attr.id]=\"headerId\" [attr.aria-label]=\"`${def.title} cookies`\">\n        @let checked = categories()[def.id];\n        @let detailToggleLabel = `${item.expanded ? 'Close' : 'Open'} ${def.id.toLowerCase()} details`;\n        @let categoryToggleLabel = `${checked ? 'Disallow' : 'Allow'} ${def.id.toLowerCase()} cookies`;\n\n        <button\n          mat-icon-button\n          class=\"detail-toggle\"\n          [attr.aria-controls]=\"bodyId\"\n          [attr.aria-expanded]=\"item.expanded\"\n          [attr.aria-label]=\"detailToggleLabel\"\n          (click)=\"item.toggle()\"\n        >\n          <mat-icon>\n            {{ item.expanded ? 'remove' : 'add' }}\n          </mat-icon>\n        </button>\n\n        <span class=\"title\">{{ def.title }}</span>\n\n        <div class=\"filler\"></div>\n\n        <mat-slide-toggle\n          [checked]=\"checked\"\n          [disabled]=\"def.required\"\n          [aria-label]=\"categoryToggleLabel\"\n          (change)=\"toggleCategory(def.id, $event.checked)\"\n        />\n      </div>\n      <p class=\"description\">\n        {{ def.description }}\n      </p>\n\n      @if (item.expanded) {\n        <div class=\"details\" role=\"region\" [attr.id]=\"bodyId\" [attr.aria-labelledby]=\"headerId\">\n          <div class=\"privacy-details\">\n            @if (def.details) {\n              <p class=\"privacy-text\">{{ def.details }}</p>\n            }\n            @if (def.provider && def.providerLink) {\n              <p class=\"provider-title\">{{ def.provider }}</p>\n              <div class=\"provider-link-container\">\n                <a hraHyperlink class=\"provider-link\" [attr.href]=\"def.providerLink\">\n                  Learn more about this provider\n                </a>\n                <mat-icon>open_in_new</mat-icon>\n              </div>\n            }\n          </div>\n        </div>\n      }\n\n      @if (!$last) {\n        <mat-divider />\n      }\n    </cdk-accordion-item>\n  }\n</cdk-accordion>\n", styles: [":host{display:block}:host cdk-accordion{display:flex;flex-direction:column}:host cdk-accordion-item{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}:host cdk-accordion-item:first-of-type{margin-top:0}:host cdk-accordion-item:last-of-type{margin-bottom:0}:host .header{display:flex;align-items:center}:host .header .detail-toggle{margin-right:.5rem;transition:transform .2s ease}:host .title{margin:0;font:var(--mat-sys-label-large)}:host .filler{flex-grow:1}:host .description{font:var(--mat-sys-label-medium);margin:0}:host .details{animation:expandIn .2s ease-out}:host .privacy-details{font:var(--mat-sys-label-medium);color:var(--mat-sys-secondary);border:solid .0625rem var(--mat-sys-outline-variant);border-radius:.5rem;padding:.75rem 1rem}:host .privacy-details .privacy-text,:host .privacy-details .provider-title{margin:0}:host .privacy-details .provider-title{margin-bottom:.5rem}:host .privacy-details .provider-link-container{display:flex;gap:.5rem;align-items:center}@keyframes expandIn{0%{opacity:0;transform:translateY(-.5rem)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: CdkAccordionModule }, { kind: "directive", type: i1.CdkAccordion, selector: "cdk-accordion, [cdkAccordion]", inputs: ["multi"], exportAs: ["cdkAccordion"] }, { kind: "directive", type: i1.CdkAccordionItem, selector: "cdk-accordion-item, [cdkAccordionItem]", inputs: ["expanded", "disabled"], outputs: ["closed", "opened", "destroyed", "expandedChange"], exportAs: ["cdkAccordionItem"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.TextHyperlinkDirective, selector: "a[hraHyperlink]" }, { kind: "ngmodule", type: IconsModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i5.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatSlideToggleModule }, { kind: "component", type: i6.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "color", "disabled", "disableRipple", "tabIndex", "checked", "hideIcon", "disabledInteractive"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CategoriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-categories', imports: [HraCommonModule, CdkAccordionModule, ButtonsModule, IconsModule, MatDividerModule, MatSlideToggleModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<cdk-accordion>\n  @for (def of categoryDefs; track def.id) {\n    @let headerId = `privacy-preferences-category-${def.id}-header`;\n    @let bodyId = `privacy-preferences-category-${def.id}-body`;\n\n    <cdk-accordion-item #item=\"cdkAccordionItem\">\n      <div class=\"header\" [attr.id]=\"headerId\" [attr.aria-label]=\"`${def.title} cookies`\">\n        @let checked = categories()[def.id];\n        @let detailToggleLabel = `${item.expanded ? 'Close' : 'Open'} ${def.id.toLowerCase()} details`;\n        @let categoryToggleLabel = `${checked ? 'Disallow' : 'Allow'} ${def.id.toLowerCase()} cookies`;\n\n        <button\n          mat-icon-button\n          class=\"detail-toggle\"\n          [attr.aria-controls]=\"bodyId\"\n          [attr.aria-expanded]=\"item.expanded\"\n          [attr.aria-label]=\"detailToggleLabel\"\n          (click)=\"item.toggle()\"\n        >\n          <mat-icon>\n            {{ item.expanded ? 'remove' : 'add' }}\n          </mat-icon>\n        </button>\n\n        <span class=\"title\">{{ def.title }}</span>\n\n        <div class=\"filler\"></div>\n\n        <mat-slide-toggle\n          [checked]=\"checked\"\n          [disabled]=\"def.required\"\n          [aria-label]=\"categoryToggleLabel\"\n          (change)=\"toggleCategory(def.id, $event.checked)\"\n        />\n      </div>\n      <p class=\"description\">\n        {{ def.description }}\n      </p>\n\n      @if (item.expanded) {\n        <div class=\"details\" role=\"region\" [attr.id]=\"bodyId\" [attr.aria-labelledby]=\"headerId\">\n          <div class=\"privacy-details\">\n            @if (def.details) {\n              <p class=\"privacy-text\">{{ def.details }}</p>\n            }\n            @if (def.provider && def.providerLink) {\n              <p class=\"provider-title\">{{ def.provider }}</p>\n              <div class=\"provider-link-container\">\n                <a hraHyperlink class=\"provider-link\" [attr.href]=\"def.providerLink\">\n                  Learn more about this provider\n                </a>\n                <mat-icon>open_in_new</mat-icon>\n              </div>\n            }\n          </div>\n        </div>\n      }\n\n      @if (!$last) {\n        <mat-divider />\n      }\n    </cdk-accordion-item>\n  }\n</cdk-accordion>\n", styles: [":host{display:block}:host cdk-accordion{display:flex;flex-direction:column}:host cdk-accordion-item{display:flex;flex-direction:column;gap:1rem;margin:1rem 0}:host cdk-accordion-item:first-of-type{margin-top:0}:host cdk-accordion-item:last-of-type{margin-bottom:0}:host .header{display:flex;align-items:center}:host .header .detail-toggle{margin-right:.5rem;transition:transform .2s ease}:host .title{margin:0;font:var(--mat-sys-label-large)}:host .filler{flex-grow:1}:host .description{font:var(--mat-sys-label-medium);margin:0}:host .details{animation:expandIn .2s ease-out}:host .privacy-details{font:var(--mat-sys-label-medium);color:var(--mat-sys-secondary);border:solid .0625rem var(--mat-sys-outline-variant);border-radius:.5rem;padding:.75rem 1rem}:host .privacy-details .privacy-text,:host .privacy-details .provider-title{margin:0}:host .privacy-details .provider-title{margin-bottom:.5rem}:host .privacy-details .provider-link-container{display:flex;gap:.5rem;align-items:center}@keyframes expandIn{0%{opacity:0;transform:translateY(-.5rem)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], propDecorators: { categories: [{ type: i0.Input, args: [{ isSignal: true, alias: "categories", required: true }] }, { type: i0.Output, args: ["categoriesChange"] }] } });

/** Mapping of tab IDs to their respective index */
const tabIdToIndex = {
    consent: 0,
    manage: 1,
};
/**
 * Privacy Preferences Modal Component
 */
class PrivacyPreferencesComponent {
    /** Injected data */
    data = inject(MAT_DIALOG_DATA);
    /** Tab index */
    tabIndex = signal(tabIdToIndex[this.data.tab ?? 'consent'], ...(ngDevMode ? [{ debugName: "tabIndex" }] : []));
    /** Categories */
    categories = signal(this.data.categories, ...(ngDevMode ? [{ debugName: "categories" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: PrivacyPreferencesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: PrivacyPreferencesComponent, isStandalone: true, selector: "hra-privacy-preferences", ngImport: i0, template: "<div class=\"header\">\n  <hra-brand-logo size=\"small\" />\n\n  <button mat-icon-button mat-dialog-close=\"dismiss\" aria-label=\"Close privacy preferences\">\n    <mat-icon>close</mat-icon>\n  </button>\n</div>\n\n<mat-divider />\n\n<mat-tab-group mat-stretch-tabs class=\"tab-group\" dynamicHeight [(selectedIndex)]=\"tabIndex\">\n  <mat-tab label=\"Consent\">\n    <div class=\"consent-content\">\n      <p>This website uses cookies and similar technologies.</p>\n      <p>\n        We use anonymized statistics data insights to improve our website. Marketing cookies are needed to watch videos\n        on this website.\n      </p>\n    </div>\n  </mat-tab>\n  <mat-tab label=\"Details\">\n    <ng-scrollbar class=\"details\" hraScrollOverflowFade>\n      <hra-categories class=\"categories\" [(categories)]=\"categories\" />\n    </ng-scrollbar>\n  </mat-tab>\n</mat-tab-group>\n\n<mat-divider />\n\n<div class=\"footer-buttons\">\n  <button mat-flat-button hraCtaButton hraPrimaryButton mat-dialog-close=\"allow-necessary\">Allow necessary only</button>\n\n  @if (tabIndex() === 0) {\n    <button mat-button hraCtaButton hraSecondaryButton (click)=\"tabIndex.set(1)\">Customize</button>\n  } @else {\n    <button mat-flat-button hraCtaButton hraPrimaryButton [mat-dialog-close]=\"categories()\">Allow selection</button>\n  }\n\n  <button mat-flat-button hraCtaButton hraPrimaryButton mat-dialog-close=\"allow-all\">Allow all</button>\n</div>\n", styles: [":host{display:block;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-on-background) r g b/24%);border-radius:.5rem;background-color:var(--mat-sys-surface-container-low)}:host .header{display:flex;justify-content:space-between;align-items:center;padding:1rem}:host .header button[mat-icon-button]{color:var(--mat-sys-on-surface)}:host .header button[mat-icon-button] mat-icon{color:inherit}:host .details{max-height:calc(100vh - 16rem)}:host .details .categories{margin:1rem 1.5rem}:host ng-scrollbar{flex-grow:1}:host .consent-content{display:flex;flex-direction:column;gap:.75rem;padding:1.5rem;font:var(--mat-sys-label-large)}:host .consent-content p{margin:0}:host .footer-buttons{display:flex;flex-wrap:wrap;gap:.75rem;padding:1.5rem}:host .footer-buttons button{flex:1 1 auto;width:14.0831rem;white-space:nowrap}@media(min-width:640px){:host .footer-buttons{flex-wrap:nowrap}}@media(min-width:480px)and (max-width:639px){:host .footer-buttons button{flex:1 1 calc(50% - .5rem)}:host .footer-buttons button:nth-child(3){flex:1 1 100%}}@media(max-width:479px){:host .footer-buttons{flex-direction:column}:host .footer-buttons button{width:100%}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: BrandModule }, { kind: "component", type: i1$1.BrandLogoComponent, selector: "hra-brand-logo", inputs: ["size", "logos"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4$1.CtaButtonDirective, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]" }, { kind: "directive", type: i4$1.SecondaryButtonVariantDirective, selector: "button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]" }, { kind: "ngmodule", type: IconsModule }, { kind: "ngmodule", type: MatDialogModule }, { kind: "directive", type: i5$1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i5.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatTabsModule }, { kind: "component", type: i7.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass", "id"], exportAs: ["matTab"] }, { kind: "component", type: i7.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "fitInkBarToContent", "mat-stretch-tabs", "mat-align-tabs", "dynamicHeight", "selectedIndex", "headerPosition", "animationDuration", "contentTabIndex", "disablePagination", "disableRipple", "preserveContent", "backgroundColor", "aria-label", "aria-labelledby"], outputs: ["selectedIndexChange", "focusChange", "animationDone", "selectedTabChange"], exportAs: ["matTabGroup"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i8.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }, { kind: "directive", type: i9.ScrollOverflowFadeDirective, selector: "[hraScrollOverflowFade]", inputs: ["scrollOverflowFadeOffset"] }, { kind: "component", type: CategoriesComponent, selector: "hra-categories", inputs: ["categories"], outputs: ["categoriesChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: PrivacyPreferencesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-privacy-preferences', imports: [
                        HraCommonModule,
                        BrandModule,
                        ButtonsModule,
                        IconsModule,
                        MatDialogModule,
                        MatDividerModule,
                        MatTabsModule,
                        ScrollingModule,
                        CategoriesComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"header\">\n  <hra-brand-logo size=\"small\" />\n\n  <button mat-icon-button mat-dialog-close=\"dismiss\" aria-label=\"Close privacy preferences\">\n    <mat-icon>close</mat-icon>\n  </button>\n</div>\n\n<mat-divider />\n\n<mat-tab-group mat-stretch-tabs class=\"tab-group\" dynamicHeight [(selectedIndex)]=\"tabIndex\">\n  <mat-tab label=\"Consent\">\n    <div class=\"consent-content\">\n      <p>This website uses cookies and similar technologies.</p>\n      <p>\n        We use anonymized statistics data insights to improve our website. Marketing cookies are needed to watch videos\n        on this website.\n      </p>\n    </div>\n  </mat-tab>\n  <mat-tab label=\"Details\">\n    <ng-scrollbar class=\"details\" hraScrollOverflowFade>\n      <hra-categories class=\"categories\" [(categories)]=\"categories\" />\n    </ng-scrollbar>\n  </mat-tab>\n</mat-tab-group>\n\n<mat-divider />\n\n<div class=\"footer-buttons\">\n  <button mat-flat-button hraCtaButton hraPrimaryButton mat-dialog-close=\"allow-necessary\">Allow necessary only</button>\n\n  @if (tabIndex() === 0) {\n    <button mat-button hraCtaButton hraSecondaryButton (click)=\"tabIndex.set(1)\">Customize</button>\n  } @else {\n    <button mat-flat-button hraCtaButton hraPrimaryButton [mat-dialog-close]=\"categories()\">Allow selection</button>\n  }\n\n  <button mat-flat-button hraCtaButton hraPrimaryButton mat-dialog-close=\"allow-all\">Allow all</button>\n</div>\n", styles: [":host{display:block;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-on-background) r g b/24%);border-radius:.5rem;background-color:var(--mat-sys-surface-container-low)}:host .header{display:flex;justify-content:space-between;align-items:center;padding:1rem}:host .header button[mat-icon-button]{color:var(--mat-sys-on-surface)}:host .header button[mat-icon-button] mat-icon{color:inherit}:host .details{max-height:calc(100vh - 16rem)}:host .details .categories{margin:1rem 1.5rem}:host ng-scrollbar{flex-grow:1}:host .consent-content{display:flex;flex-direction:column;gap:.75rem;padding:1.5rem;font:var(--mat-sys-label-large)}:host .consent-content p{margin:0}:host .footer-buttons{display:flex;flex-wrap:wrap;gap:.75rem;padding:1.5rem}:host .footer-buttons button{flex:1 1 auto;width:14.0831rem;white-space:nowrap}@media(min-width:640px){:host .footer-buttons{flex-wrap:nowrap}}@media(min-width:480px)and (max-width:639px){:host .footer-buttons button{flex:1 1 calc(50% - .5rem)}:host .footer-buttons button:nth-child(3){flex:1 1 100%}}@media(max-width:479px){:host .footer-buttons{flex-direction:column}:host .footer-buttons button{width:100%}}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { PrivacyPreferencesComponent };
//# sourceMappingURL=hra-ui-design-system-privacy-privacy-preferences.mjs.map
