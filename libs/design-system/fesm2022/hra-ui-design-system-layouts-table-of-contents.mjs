import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { providePageSectionNavigation } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsComponent } from '@hra-ui/design-system/navigation/table-of-contents';

/** Table of contents layout header */
class TableOfContentsLayoutHeaderComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: TableOfContentsLayoutHeaderComponent, isStandalone: true, selector: "hra-table-of-contents-layout-header", ngImport: i0, template: `<ng-content />`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-table-of-contents-layout-header',
                    template: `<ng-content />`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/** Table of contents layout */
class TableOfContentsLayoutComponent {
    /** Whether the screen width is currently greater than or equal to 1100px */
    isWideScreen = watchBreakpoint('(min-width: 1100px)');
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: TableOfContentsLayoutComponent, isStandalone: true, selector: "hra-table-of-contents-layout", providers: [providePageSectionNavigation()], ngImport: i0, template: "<div class=\"content-container\">\n  <ng-content select=\"hra-table-of-contents-layout-header\" />\n\n  @if (!isWideScreen()) {\n    <hra-table-of-contents class=\"toc\" />\n  }\n\n  <ng-content />\n</div>\n\n@if (isWideScreen()) {\n  <hra-table-of-contents class=\"toc\" />\n}\n", styles: [":host{display:flex;flex-direction:row;margin:2.5rem 1rem}:host .content-container{display:flex;width:100%;flex-direction:column;gap:3rem}@media(min-width:640px){:host{margin:2.5rem}}@media(min-width:1100px){:host{margin-right:0;gap:2.5rem}:host .content-container{flex:1;width:calc(100% - 19.5rem);max-width:87.5rem;margin:auto}:host .toc{position:sticky;top:var(--hra-table-of-contents-layout-top-offset, 7rem);width:17rem;height:min-content;margin:0 .75rem 1rem}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "component", type: TableOfContentsComponent, selector: "hra-table-of-contents", inputs: ["tagline"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-table-of-contents-layout', imports: [HraCommonModule, TableOfContentsComponent], providers: [providePageSectionNavigation()], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"content-container\">\n  <ng-content select=\"hra-table-of-contents-layout-header\" />\n\n  @if (!isWideScreen()) {\n    <hra-table-of-contents class=\"toc\" />\n  }\n\n  <ng-content />\n</div>\n\n@if (isWideScreen()) {\n  <hra-table-of-contents class=\"toc\" />\n}\n", styles: [":host{display:flex;flex-direction:row;margin:2.5rem 1rem}:host .content-container{display:flex;width:100%;flex-direction:column;gap:3rem}@media(min-width:640px){:host{margin:2.5rem}}@media(min-width:1100px){:host{margin-right:0;gap:2.5rem}:host .content-container{flex:1;width:calc(100% - 19.5rem);max-width:87.5rem;margin:auto}:host .toc{position:sticky;top:var(--hra-table-of-contents-layout-top-offset, 7rem);width:17rem;height:min-content;margin:0 .75rem 1rem}}\n"] }]
        }] });

/** Table of contents modules */
class TableOfContentsLayoutModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutModule, imports: [TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent], exports: [TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutModule, imports: [TableOfContentsLayoutComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TableOfContentsLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent],
                    exports: [TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent, TableOfContentsLayoutModule };
//# sourceMappingURL=hra-ui-design-system-layouts-table-of-contents.mjs.map
