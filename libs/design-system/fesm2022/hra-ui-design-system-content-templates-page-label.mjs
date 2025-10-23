import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, numberAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import * as i1 from '@hra-ui/design-system/icons';
import { coerceIconList, IconsModule } from '@hra-ui/design-system/icons';

/** Label for a page section. Can also be used standalone */
class PageLabelComponent {
    /** Label */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Which level of <hx> to use */
    level = input(1, ...(ngDevMode ? [{ debugName: "level", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Icons to display as part of the label */
    icons = input([], ...(ngDevMode ? [{ debugName: "icons", transform: coerceIconList }] : [{ transform: coerceIconList }]));
    /** Anchor id of this label */
    anchor = input(...(ngDevMode ? [undefined, { debugName: "anchor" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: PageLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: PageLabelComponent, isStandalone: true, selector: "hra-page-label", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: false, transformFunction: null }, icons: { classPropertyName: "icons", publicName: "icons", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (icons().length > 0) {\n  <div class=\"header-icons\">\n    @for (icon of icons(); track $index) {\n      <hra-icon [icon]=\"icon\" />\n    }\n  </div>\n}\n\n@switch (level()) {\n  @case (1) {\n    <h1 hra-section-link [anchor]=\"anchor()\" underlined>{{ tagline() }}</h1>\n  }\n  @case (2) {\n    <h2 hra-section-link [anchor]=\"anchor()\" underlined>{{ tagline() }}</h2>\n  }\n  @case (3) {\n    <h3 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h3>\n  }\n  @case (4) {\n    <h4 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h4>\n  }\n  @case (5) {\n    <h5 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h5>\n  }\n  @case (6) {\n    <h6 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h6>\n  }\n  @default {\n    <h1 hra-section-link [anchor]=\"anchor()\" underlined>{{ tagline() }}</h1>\n  }\n}\n", styles: [":host .header-icons{display:flex;gap:.75rem;margin-bottom:1rem}:host hra-icon{height:4rem;width:4rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i1.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "component", type: SectionLinkComponent, selector: "h1[hra-section-link], h2[hra-section-link], h3[hra-section-link],    h4[hra-section-link], h5[hra-section-link], h6[hra-section-link]", inputs: ["anchor", "underlined"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: PageLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-page-label', imports: [CommonModule, IconsModule, SectionLinkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (icons().length > 0) {\n  <div class=\"header-icons\">\n    @for (icon of icons(); track $index) {\n      <hra-icon [icon]=\"icon\" />\n    }\n  </div>\n}\n\n@switch (level()) {\n  @case (1) {\n    <h1 hra-section-link [anchor]=\"anchor()\" underlined>{{ tagline() }}</h1>\n  }\n  @case (2) {\n    <h2 hra-section-link [anchor]=\"anchor()\" underlined>{{ tagline() }}</h2>\n  }\n  @case (3) {\n    <h3 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h3>\n  }\n  @case (4) {\n    <h4 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h4>\n  }\n  @case (5) {\n    <h5 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h5>\n  }\n  @case (6) {\n    <h6 hra-section-link [anchor]=\"anchor()\">{{ tagline() }}</h6>\n  }\n  @default {\n    <h1 hra-section-link [anchor]=\"anchor()\" underlined>{{ tagline() }}</h1>\n  }\n}\n", styles: [":host .header-icons{display:flex;gap:.75rem;margin-bottom:1rem}:host hra-icon{height:4rem;width:4rem}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], level: [{ type: i0.Input, args: [{ isSignal: true, alias: "level", required: false }] }], icons: [{ type: i0.Input, args: [{ isSignal: true, alias: "icons", required: false }] }], anchor: [{ type: i0.Input, args: [{ isSignal: true, alias: "anchor", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { PageLabelComponent };
//# sourceMappingURL=hra-ui-design-system-content-templates-page-label.mjs.map
