import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Gallery card component for displaying content with images, dates, and tags
 */
class GalleryCardComponent {
    /** Title/tagline text */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Image source URL to display at the top */
    imageSrc = input.required(...(ngDevMode ? [{ debugName: "imageSrc" }] : []));
    /** Date to display */
    date = input.required(...(ngDevMode ? [{ debugName: "date" }] : []));
    /** URL for the tagline link */
    link = input.required(...(ngDevMode ? [{ debugName: "link" }] : []));
    /** Whether the link opens in new tab */
    external = input(false, ...(ngDevMode ? [{ debugName: "external" }] : []));
    /** Tags to display */
    tags = input([], ...(ngDevMode ? [{ debugName: "tags" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: GalleryCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: GalleryCardComponent, isStandalone: true, selector: "hra-gallery-card", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, imageSrc: { classPropertyName: "imageSrc", publicName: "imageSrc", isSignal: true, isRequired: true, transformFunction: null }, date: { classPropertyName: "date", publicName: "date", isSignal: true, isRequired: true, transformFunction: null }, link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: true, transformFunction: null }, external: { classPropertyName: "external", publicName: "external", isSignal: true, isRequired: false, transformFunction: null }, tags: { classPropertyName: "tags", publicName: "tags", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<img class=\"image\" alt=\"\" [attr.src]=\"imageSrc() | assetUrl\" />\n<div class=\"content\">\n  <div class=\"date\">{{ date() }}</div>\n  <a class=\"tagline-link\" hraHyperlink [hraLink]=\"link()\" [hraLinkExternal]=\"external()\" [hraPlainTooltip]=\"tagline()\">\n    {{ tagline() }}\n  </a>\n  @if (tags().length > 0) {\n    <mat-chip-set class=\"tags\">\n      @for (tag of tags(); track tag) {\n        <mat-chip>{{ tag }}</mat-chip>\n      }\n    </mat-chip-set>\n  }\n</div>\n", styles: [":host{min-width:17rem;max-width:28rem}:host .image{width:100%;max-height:12.5rem;object-fit:cover;aspect-ratio:16/9}:host .content{display:flex;flex-direction:column;gap:.5rem;padding-top:1rem;min-height:6.875rem}:host .content .date{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-on-secondary-fixed)}:host .content .tagline-link{color:var(--mat-sys-tertiary);text-decoration:underline;cursor:pointer;font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}@supports (line-clamp: 2){:host .content .tagline-link{display:block;line-clamp:2}}:host .content .tags{padding-top:1.25rem}\n"], dependencies: [{ kind: "directive", type: LinkDirective, selector: "a[hraLink], area[hraLink]", inputs: ["hraLink", "hraLinkExternal"] }, { kind: "ngmodule", type: MatChipsModule }, { kind: "component", type: i1.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "component", type: i1.MatChipSet, selector: "mat-chip-set", inputs: ["disabled", "role", "tabIndex"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "directive", type: TextHyperlinkDirective, selector: "a[hraHyperlink]" }, { kind: "pipe", type: AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: GalleryCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-gallery-card', imports: [AssetUrlPipe, LinkDirective, MatChipsModule, PlainTooltipDirective, TextHyperlinkDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<img class=\"image\" alt=\"\" [attr.src]=\"imageSrc() | assetUrl\" />\n<div class=\"content\">\n  <div class=\"date\">{{ date() }}</div>\n  <a class=\"tagline-link\" hraHyperlink [hraLink]=\"link()\" [hraLinkExternal]=\"external()\" [hraPlainTooltip]=\"tagline()\">\n    {{ tagline() }}\n  </a>\n  @if (tags().length > 0) {\n    <mat-chip-set class=\"tags\">\n      @for (tag of tags(); track tag) {\n        <mat-chip>{{ tag }}</mat-chip>\n      }\n    </mat-chip-set>\n  }\n</div>\n", styles: [":host{min-width:17rem;max-width:28rem}:host .image{width:100%;max-height:12.5rem;object-fit:cover;aspect-ratio:16/9}:host .content{display:flex;flex-direction:column;gap:.5rem;padding-top:1rem;min-height:6.875rem}:host .content .date{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-on-secondary-fixed)}:host .content .tagline-link{color:var(--mat-sys-tertiary);text-decoration:underline;cursor:pointer;font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}@supports (line-clamp: 2){:host .content .tagline-link{display:block;line-clamp:2}}:host .content .tags{padding-top:1.25rem}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], imageSrc: [{ type: i0.Input, args: [{ isSignal: true, alias: "imageSrc", required: true }] }], date: [{ type: i0.Input, args: [{ isSignal: true, alias: "date", required: true }] }], link: [{ type: i0.Input, args: [{ isSignal: true, alias: "link", required: true }] }], external: [{ type: i0.Input, args: [{ isSignal: true, alias: "external", required: false }] }], tags: [{ type: i0.Input, args: [{ isSignal: true, alias: "tags", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { GalleryCardComponent };
//# sourceMappingURL=hra-ui-design-system-cards-gallery-card.mjs.map
