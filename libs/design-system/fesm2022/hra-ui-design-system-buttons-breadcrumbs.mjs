import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Component used to help the user understand their location within websites
 */
class BreadcrumbsComponent {
    /** Crumbs to display */
    crumbs = input([], ...(ngDevMode ? [{ debugName: "crumbs" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BreadcrumbsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: BreadcrumbsComponent, isStandalone: true, selector: "hra-breadcrumbs", inputs: { crumbs: { classPropertyName: "crumbs", publicName: "crumbs", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<nav class=\"navigation\">\n  <ol class=\"crumbs\">\n    @for (crumb of crumbs(); track $index) {\n      <li class=\"crumb\">\n        @if (crumb.route) {\n          @if (crumb.route.startsWith('http')) {\n            <a class=\"label\" hraHyperlink [href]=\"crumb.route\">{{ crumb.name }}</a>\n          } @else {\n            <a class=\"label\" hraHyperlink [routerLink]=\"crumb.route\">{{ crumb.name }}</a>\n          }\n        } @else {\n          <span class=\"label\">{{ crumb.name }}</span>\n        }\n\n        @if (!$last) {\n          <div class=\"separator\">/</div>\n        }\n      </li>\n    }\n  </ol>\n</nav>\n", styles: [":host{display:block}:host .navigation .crumbs{display:flex;align-items:center;list-style-type:none;height:2.5rem;width:100%;margin:0;padding:0;color:var(--mat-sys-primary);font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking);white-space:nowrap}:host .navigation .crumbs .crumb{display:flex;vertical-align:middle;align-items:center}:host .navigation .crumbs .crumb:last-child{text-wrap:auto}:host .navigation .crumbs .label{padding:.125rem}:host .navigation .crumbs .separator{padding:.125rem .25rem;color:var(--mat-sys-outline);-webkit-user-select:none;user-select:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "directive", type: TextHyperlinkDirective, selector: "a[hraHyperlink]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: BreadcrumbsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-breadcrumbs', imports: [CommonModule, RouterModule, MatIconModule, TextHyperlinkDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav class=\"navigation\">\n  <ol class=\"crumbs\">\n    @for (crumb of crumbs(); track $index) {\n      <li class=\"crumb\">\n        @if (crumb.route) {\n          @if (crumb.route.startsWith('http')) {\n            <a class=\"label\" hraHyperlink [href]=\"crumb.route\">{{ crumb.name }}</a>\n          } @else {\n            <a class=\"label\" hraHyperlink [routerLink]=\"crumb.route\">{{ crumb.name }}</a>\n          }\n        } @else {\n          <span class=\"label\">{{ crumb.name }}</span>\n        }\n\n        @if (!$last) {\n          <div class=\"separator\">/</div>\n        }\n      </li>\n    }\n  </ol>\n</nav>\n", styles: [":host{display:block}:host .navigation .crumbs{display:flex;align-items:center;list-style-type:none;height:2.5rem;width:100%;margin:0;padding:0;color:var(--mat-sys-primary);font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking);white-space:nowrap}:host .navigation .crumbs .crumb{display:flex;vertical-align:middle;align-items:center}:host .navigation .crumbs .crumb:last-child{text-wrap:auto}:host .navigation .crumbs .label{padding:.125rem}:host .navigation .crumbs .separator{padding:.125rem .25rem;color:var(--mat-sys-outline);-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { crumbs: [{ type: i0.Input, args: [{ isSignal: true, alias: "crumbs", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BreadcrumbsComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-breadcrumbs.mjs.map
