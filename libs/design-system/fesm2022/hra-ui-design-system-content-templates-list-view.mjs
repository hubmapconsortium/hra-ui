import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

/**
 * List view component for displaying markdown content in groups
 */
class ListViewComponent {
    /** Pre-grouped data to display */
    data = input([], ...(ngDevMode ? [{ debugName: "data" }] : []));
    /** Whether to show groupBy headers */
    groupBy = input(false, ...(ngDevMode ? [{ debugName: "groupBy" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ListViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: ListViewComponent, isStandalone: true, selector: "hra-list-view", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, groupBy: { classPropertyName: "groupBy", publicName: "groupBy", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@for (data of data(); track data.group) {\n  <div class=\"list-view-group\">\n    @if (groupBy()) {\n      <h3 hra-section-link underlined>{{ data.group }}</h3>\n    }\n\n    @for (item of data.items; track $index) {\n      <hra-markdown class=\"content\" [data]=\"item.content\" />\n    }\n  </div>\n}\n", styles: [":host{display:flex;flex-direction:column;gap:3rem}:host .list-view-group{display:flex;flex-direction:column;gap:1rem}:host .list-view-group:not(:has(h3)){gap:2rem}:host .content{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary)}:host .content ::ng-deep p{margin-bottom:0}\n"], dependencies: [{ kind: "component", type: MarkdownComponent, selector: "hra-markdown", inputs: ["data", "src"] }, { kind: "component", type: SectionLinkComponent, selector: "h1[hra-section-link], h2[hra-section-link], h3[hra-section-link],    h4[hra-section-link], h5[hra-section-link], h6[hra-section-link]", inputs: ["anchor", "underlined"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ListViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-list-view', imports: [MarkdownComponent, SectionLinkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (data of data(); track data.group) {\n  <div class=\"list-view-group\">\n    @if (groupBy()) {\n      <h3 hra-section-link underlined>{{ data.group }}</h3>\n    }\n\n    @for (item of data.items; track $index) {\n      <hra-markdown class=\"content\" [data]=\"item.content\" />\n    }\n  </div>\n}\n", styles: [":host{display:flex;flex-direction:column;gap:3rem}:host .list-view-group{display:flex;flex-direction:column;gap:1rem}:host .list-view-group:not(:has(h3)){gap:2rem}:host .content{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking);color:var(--mat-sys-primary)}:host .content ::ng-deep p{margin-bottom:0}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], groupBy: [{ type: i0.Input, args: [{ isSignal: true, alias: "groupBy", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ListViewComponent };
//# sourceMappingURL=hra-ui-design-system-content-templates-list-view.mjs.map
