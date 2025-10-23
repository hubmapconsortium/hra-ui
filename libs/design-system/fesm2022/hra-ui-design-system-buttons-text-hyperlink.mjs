import * as i0 from '@angular/core';
import { Directive, ChangeDetectionStrategy, ViewEncapsulation, Component, makeEnvironmentProviders, input, inject, computed } from '@angular/core';
import * as i1 from '@hra-ui/common/analytics';
import { ClickEventDirective } from '@hra-ui/common/analytics';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i1$1 from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { isAbsolute } from '@hra-ui/common/url';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Applies hyperlink styles when placed on an <a> tag.
 * Also attaches a click event for analytics.
 */
class TextHyperlinkDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TextHyperlinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.7", type: TextHyperlinkDirective, isStandalone: true, selector: "a[hraHyperlink]", host: { classAttribute: "hra-text-hyperlink" }, hostDirectives: [{ directive: i1.ClickEventDirective, inputs: ["hraClickEvent", "hraHyperlink"] }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TextHyperlinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[hraHyperlink]',
                    standalone: true,
                    hostDirectives: [
                        {
                            directive: ClickEventDirective,
                            inputs: ['hraClickEvent: hraHyperlink'],
                        },
                    ],
                    host: {
                        class: 'hra-text-hyperlink',
                    },
                }]
        }] });

/** Global styles for text hyperlinks */
class TextHyperlinkGlobalStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TextHyperlinkGlobalStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: TextHyperlinkGlobalStylesComponent, isStandalone: true, selector: "hra-text-hyperlink-global-styles", ngImport: i0, template: '', isInline: true, styles: [".hra-app a.hra-text-hyperlink,.hra-app markdown a{text-decoration:underline solid currentColor .0625rem;text-underline-offset:.125rem}.hra-app a.hra-text-hyperlink:link,.hra-app a.hra-text-hyperlink:link mat-icon,.hra-app markdown a:link,.hra-app markdown a:link mat-icon{color:var(--mat-sys-tertiary)}.hra-app a.hra-text-hyperlink:visited,.hra-app a.hra-text-hyperlink:visited mat-icon,.hra-app markdown a:visited,.hra-app markdown a:visited mat-icon{color:var(--mat-sys-tertiary)}.hra-app a.hra-text-hyperlink:focus-visible,.hra-app markdown a:focus-visible{color:var(--mat-sys-secondary);outline:.125rem solid var(--mat-sys-tertiary);border-radius:.25rem}.hra-app a.hra-text-hyperlink:focus-visible mat-icon,.hra-app markdown a:focus-visible mat-icon{color:var(--mat-sys-secondary)}.hra-app a.hra-text-hyperlink:hover,.hra-app a.hra-text-hyperlink:hover mat-icon,.hra-app a.hra-text-hyperlink:active,.hra-app a.hra-text-hyperlink:active mat-icon,.hra-app markdown a:hover,.hra-app markdown a:hover mat-icon,.hra-app markdown a:active,.hra-app markdown a:active mat-icon{color:var(--mat-sys-tertiary)}.hra-app markdown pre{background-color:var(--mat-sys-surface-container);border-radius:.25rem;border:1px solid var(--mat-sys-outline);padding:.75rem;overflow-x:auto;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TextHyperlinkGlobalStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-text-hyperlink-global-styles', standalone: true, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".hra-app a.hra-text-hyperlink,.hra-app markdown a{text-decoration:underline solid currentColor .0625rem;text-underline-offset:.125rem}.hra-app a.hra-text-hyperlink:link,.hra-app a.hra-text-hyperlink:link mat-icon,.hra-app markdown a:link,.hra-app markdown a:link mat-icon{color:var(--mat-sys-tertiary)}.hra-app a.hra-text-hyperlink:visited,.hra-app a.hra-text-hyperlink:visited mat-icon,.hra-app markdown a:visited,.hra-app markdown a:visited mat-icon{color:var(--mat-sys-tertiary)}.hra-app a.hra-text-hyperlink:focus-visible,.hra-app markdown a:focus-visible{color:var(--mat-sys-secondary);outline:.125rem solid var(--mat-sys-tertiary);border-radius:.25rem}.hra-app a.hra-text-hyperlink:focus-visible mat-icon,.hra-app markdown a:focus-visible mat-icon{color:var(--mat-sys-secondary)}.hra-app a.hra-text-hyperlink:hover,.hra-app a.hra-text-hyperlink:hover mat-icon,.hra-app a.hra-text-hyperlink:active,.hra-app a.hra-text-hyperlink:active mat-icon,.hra-app markdown a:hover,.hra-app markdown a:hover mat-icon,.hra-app markdown a:active,.hra-app markdown a:active mat-icon{color:var(--mat-sys-tertiary)}.hra-app markdown pre{background-color:var(--mat-sys-surface-container);border-radius:.25rem;border:1px solid var(--mat-sys-outline);padding:.75rem;overflow-x:auto;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"] }]
        }] });

/**
 * Provides the global styles for text hyperlink elements.
 *
 * @returns Text hyperlink providers
 */
function provideTextHyperlink() {
    return makeEnvironmentProviders([provideStyleComponents(TextHyperlinkGlobalStylesComponent)]);
}

/**
 * Text hyperlink component
 */
class TextHyperlinkComponent {
    /**
     * Text hyperlink component text
     */
    text = input.required(...(ngDevMode ? [{ debugName: "text" }] : []));
    /**
     * Text hyperlink component href
     */
    url = input.required(...(ngDevMode ? [{ debugName: "url" }] : []));
    /**
     * Text hyperlink component icon
     */
    icon = input(...(ngDevMode ? [undefined, { debugName: "icon" }] : []));
    /**
     * Text hyperlink component router
     */
    router = inject(Router, { optional: true });
    /**
     * Text hyperlink component url tree
     */
    urlTree = computed(() => {
        const url = this.url();
        if (this.router && !isAbsolute(url)) {
            return this.router.parseUrl(url);
        }
        return undefined;
    }, ...(ngDevMode ? [{ debugName: "urlTree" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TextHyperlinkComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: TextHyperlinkComponent, isStandalone: true, selector: "hra-text-hyperlink", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: true, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (urlTree(); as link) {\n  <a hraHyperlink [routerLink]=\"link\">\n    {{ text() }}\n    @if (icon(); as fontIcon) {\n      <mat-icon iconPositionEnd>{{ fontIcon }}</mat-icon>\n    }\n  </a>\n} @else {\n  <a hraHyperlink [attr.href]=\"url()\" target=\"_blank\" rel=\"noopener noreferrer\">\n    {{ text() }}\n    @if (icon(); as fontIcon) {\n      <mat-icon iconPositionEnd>{{ fontIcon }}</mat-icon>\n    }\n  </a>\n}\n", styles: [":host a{display:inline-flex;gap:.375rem;align-items:center}:host mat-icon{width:1.5rem;height:1.5rem;font-size:1.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i1$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: TextHyperlinkDirective, selector: "a[hraHyperlink]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: TextHyperlinkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-text-hyperlink', imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, TextHyperlinkDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (urlTree(); as link) {\n  <a hraHyperlink [routerLink]=\"link\">\n    {{ text() }}\n    @if (icon(); as fontIcon) {\n      <mat-icon iconPositionEnd>{{ fontIcon }}</mat-icon>\n    }\n  </a>\n} @else {\n  <a hraHyperlink [attr.href]=\"url()\" target=\"_blank\" rel=\"noopener noreferrer\">\n    {{ text() }}\n    @if (icon(); as fontIcon) {\n      <mat-icon iconPositionEnd>{{ fontIcon }}</mat-icon>\n    }\n  </a>\n}\n", styles: [":host a{display:inline-flex;gap:.375rem;align-items:center}:host mat-icon{width:1.5rem;height:1.5rem;font-size:1.5rem}\n"] }]
        }], propDecorators: { text: [{ type: i0.Input, args: [{ isSignal: true, alias: "text", required: true }] }], url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: true }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }] } });

/**
 * Text hyperlink component schema
 */
const TextHyperlinkSchema = ContentTemplateSchema.extend({
    component: z.literal('TextHyperlink'),
    text: z.string(),
    url: z.string(),
    icon: z.string().optional(),
});

/**
 * Text hyperlink component definition
 */
const TextHyperlinkDef = {
    component: TextHyperlinkComponent,
    spec: TextHyperlinkSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { TextHyperlinkComponent, TextHyperlinkDef, TextHyperlinkDirective, TextHyperlinkSchema, provideTextHyperlink };
//# sourceMappingURL=hra-ui-design-system-buttons-text-hyperlink.mjs.map
