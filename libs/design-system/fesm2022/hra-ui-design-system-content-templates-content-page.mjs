import { coerceArray } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import { ContentTemplateOutletDirective, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import * as i5 from '@hra-ui/design-system/layouts/table-of-contents';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import * as i1 from '@angular/material/button';
import * as i3 from '@hra-ui/design-system/buttons/button';
import * as i6 from '@hra-ui/design-system/navigation/footer';
import { IconListSchema } from '@hra-ui/design-system/icons';
import * as z from 'zod';

/**
 * Content Page Component
 */
class ContentPageComponent {
    /** input data for content page */
    data = input.required(...(ngDevMode ? [{ debugName: "data" }] : []));
    /** header content data */
    headerContent = computed(() => coerceArray(this.data().headerContent ?? []), ...(ngDevMode ? [{ debugName: "headerContent" }] : []));
    /** content data */
    content = computed(() => coerceArray(this.data().content), ...(ngDevMode ? [{ debugName: "content" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ContentPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: ContentPageComponent, isStandalone: true, selector: "hra-content-page", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<hra-table-of-contents-layout>\n  <hra-table-of-contents-layout-header>\n    <hra-page-section [tagline]=\"data().title\" [icons]=\"data().icons\">\n      <hra-markdown class=\"subtitle\" [data]=\"data().subtitle\" />\n      @if (data().action; as action) {\n        @if (action.url.startsWith('http')) {\n          <a\n            mat-button\n            hraCtaButton\n            hraPrimaryButton\n            class=\"action\"\n            target=\"_self\"\n            rel=\"noopener noreferrer\"\n            [attr.href]=\"action.url\"\n          >\n            {{ action.label }}\n            <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n          </a>\n        } @else {\n          <a mat-button hraCtaButton hraPrimaryButton class=\"action\" [routerLink]=\"action.url\">\n            {{ action.label }}\n            <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n          </a>\n        }\n      }\n\n      @for (item of headerContent(); track $index) {\n        <ng-container *hraContentTemplateOutlet=\"item\" />\n      }\n    </hra-page-section>\n  </hra-table-of-contents-layout-header>\n\n  @for (item of content(); track $index) {\n    <ng-container *hraContentTemplateOutlet=\"item\" />\n  }\n</hra-table-of-contents-layout>\n<hra-footer />\n", styles: [":host{display:block}:host .action{width:fit-content}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3.CtaButtonDirective, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]" }, { kind: "directive", type: i3.PrimaryButtonVariantDirective, selector: "button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]" }, { kind: "directive", type: ContentTemplateOutletDirective, selector: "[hraContentTemplateOutlet]", inputs: ["hraContentTemplateOutlet"] }, { kind: "component", type: MarkdownComponent, selector: "hra-markdown", inputs: ["data", "src"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: PageSectionComponent, selector: "hra-page-section", inputs: ["tagline", "level", "icons", "anchor", "breadcrumbs", "date", "tags"] }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: TableOfContentsLayoutModule }, { kind: "component", type: i5.TableOfContentsLayoutComponent, selector: "hra-table-of-contents-layout" }, { kind: "component", type: i5.TableOfContentsLayoutHeaderComponent, selector: "hra-table-of-contents-layout-header" }, { kind: "ngmodule", type: NavigationModule }, { kind: "component", type: i6.FooterComponent, selector: "hra-footer", inputs: ["funders", "socials"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ContentPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-content-page', imports: [
                        HraCommonModule,
                        ButtonsModule,
                        ContentTemplateOutletDirective,
                        MarkdownComponent,
                        MatIconModule,
                        PageSectionComponent,
                        RouterModule,
                        TableOfContentsLayoutModule,
                        NavigationModule,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-table-of-contents-layout>\n  <hra-table-of-contents-layout-header>\n    <hra-page-section [tagline]=\"data().title\" [icons]=\"data().icons\">\n      <hra-markdown class=\"subtitle\" [data]=\"data().subtitle\" />\n      @if (data().action; as action) {\n        @if (action.url.startsWith('http')) {\n          <a\n            mat-button\n            hraCtaButton\n            hraPrimaryButton\n            class=\"action\"\n            target=\"_self\"\n            rel=\"noopener noreferrer\"\n            [attr.href]=\"action.url\"\n          >\n            {{ action.label }}\n            <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n          </a>\n        } @else {\n          <a mat-button hraCtaButton hraPrimaryButton class=\"action\" [routerLink]=\"action.url\">\n            {{ action.label }}\n            <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n          </a>\n        }\n      }\n\n      @for (item of headerContent(); track $index) {\n        <ng-container *hraContentTemplateOutlet=\"item\" />\n      }\n    </hra-page-section>\n  </hra-table-of-contents-layout-header>\n\n  @for (item of content(); track $index) {\n    <ng-container *hraContentTemplateOutlet=\"item\" />\n  }\n</hra-table-of-contents-layout>\n<hra-footer />\n", styles: [":host{display:block}:host .action{width:fit-content}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: true }] }] } });

/** Schema for content page data */
const ContentPageDataSchema = z
    .object({
    $schema: z.string(),
    title: z.string(),
    subtitle: z.string(),
    icons: IconListSchema.optional(),
    action: z
        .object({
        label: z.string(),
        url: z.string(),
    })
        .optional(),
    headerContent: ProjectedContentTemplateSchema.optional(),
    content: ProjectedContentTemplateSchema,
})
    .meta({ id: 'ContentPageData' });

/**
 * Generated bundle index. Do not edit.
 */

export { ContentPageComponent, ContentPageDataSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-content-page.mjs.map
