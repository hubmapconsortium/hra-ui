import * as i0 from '@angular/core';
import { input, inject, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { HraCommonModule } from '@hra-ui/common';
import { FragmentLinkDirective } from '@hra-ui/common/router-ext';
import { PageSectionService, PageSectionActivationService } from '@hra-ui/design-system/content-templates/page-section';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i2 from 'ngx-scrollbar';

/**
 * Table of contents component for navigating between different sections on a page
 */
class TableOfContentsComponent {
    /** Title for the table of content */
    tagline = input('On this page', ...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** All page sections sorted by dom order */
    sections = inject(PageSectionService).sortedSections;
    /** Currently active section */
    activeSection = inject(PageSectionActivationService).activeSection;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: TableOfContentsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: TableOfContentsComponent, isStandalone: true, selector: "hra-table-of-contents", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<ng-scrollbar class=\"scrollbar\">\n  <nav class=\"nav\" aria-labelledby=\"table-of-contents-navigation\">\n    <div id=\"table-of-contents-navigation\" class=\"tagline\">{{ tagline() }}</div>\n    <div class=\"links\">\n      @for (section of sections(); track section) {\n        @if (section.anchor(); as anchor) {\n          <a\n            class=\"link\"\n            matRipple\n            [class.active]=\"activeSection() === section\"\n            [style.--indentation-level]=\"section.level()\"\n            [hraFragmentLink]=\"anchor\"\n          >\n            {{ section.tagline() }}\n          </a>\n        }\n      }\n    </div>\n  </nav>\n</ng-scrollbar>\n", styles: [":host{display:block;border:.0625rem solid var(--mat-sys-outline-variant);border-radius:.5rem}:host .tagline{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);min-height:3rem;padding:.75rem 1.5rem;border-bottom:.0625rem solid var(--mat-sys-outline-variant);border-top-left-radius:.5rem;border-top-right-radius:.5rem;color:var(--mat-sys-secondary);background-color:var(--mat-sys-surface-container-low)}:host .links{display:flex;flex-direction:column;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);padding:.5rem}:host .links .link{min-height:2rem;border-radius:.5rem;padding:.3438rem 1rem;margin-left:calc((var(--indentation-level, 1) - 1) * .75rem);color:var(--mat-sys-primary);text-decoration:none}:host .links .link:hover{background-color:rgb(from var(--mat-sys-secondary) r g b/8%)}:host .links .link:focus-visible{outline:2px solid var(--mat-sys-primary);outline-offset:-2px}@media(min-width:1100px){:host{border:none}:host .tagline{min-height:2.5rem;padding:.5rem 1rem;border-bottom:none;background-color:unset}:host .links{padding:0}:host .links .link.active{background-color:rgb(from var(--mat-sys-tertiary) r g b/20%);color:var(--mat-sys-secondary)}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: MatRippleModule }, { kind: "directive", type: i1.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: FragmentLinkDirective, selector: "a[hraFragmentLink], area[hraFragmentLink]", inputs: ["hraFragmentLink"] }, { kind: "ngmodule", type: ScrollingModule }, { kind: "component", type: i2.NgScrollbar, selector: "ng-scrollbar:not([externalViewport])", exportAs: ["ngScrollbar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: TableOfContentsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-table-of-contents', imports: [HraCommonModule, MatRippleModule, FragmentLinkDirective, ScrollingModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-scrollbar class=\"scrollbar\">\n  <nav class=\"nav\" aria-labelledby=\"table-of-contents-navigation\">\n    <div id=\"table-of-contents-navigation\" class=\"tagline\">{{ tagline() }}</div>\n    <div class=\"links\">\n      @for (section of sections(); track section) {\n        @if (section.anchor(); as anchor) {\n          <a\n            class=\"link\"\n            matRipple\n            [class.active]=\"activeSection() === section\"\n            [style.--indentation-level]=\"section.level()\"\n            [hraFragmentLink]=\"anchor\"\n          >\n            {{ section.tagline() }}\n          </a>\n        }\n      }\n    </div>\n  </nav>\n</ng-scrollbar>\n", styles: [":host{display:block;border:.0625rem solid var(--mat-sys-outline-variant);border-radius:.5rem}:host .tagline{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);min-height:3rem;padding:.75rem 1.5rem;border-bottom:.0625rem solid var(--mat-sys-outline-variant);border-top-left-radius:.5rem;border-top-right-radius:.5rem;color:var(--mat-sys-secondary);background-color:var(--mat-sys-surface-container-low)}:host .links{display:flex;flex-direction:column;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);padding:.5rem}:host .links .link{min-height:2rem;border-radius:.5rem;padding:.3438rem 1rem;margin-left:calc((var(--indentation-level, 1) - 1) * .75rem);color:var(--mat-sys-primary);text-decoration:none}:host .links .link:hover{background-color:rgb(from var(--mat-sys-secondary) r g b/8%)}:host .links .link:focus-visible{outline:2px solid var(--mat-sys-primary);outline-offset:-2px}@media(min-width:1100px){:host{border:none}:host .tagline{min-height:2.5rem;padding:.5rem 1rem;border-bottom:none;background-color:unset}:host .links{padding:0}:host .links .link.active{background-color:rgb(from var(--mat-sys-tertiary) r g b/20%);color:var(--mat-sys-secondary)}}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TableOfContentsComponent };
//# sourceMappingURL=hra-ui-design-system-navigation-table-of-contents.mjs.map
