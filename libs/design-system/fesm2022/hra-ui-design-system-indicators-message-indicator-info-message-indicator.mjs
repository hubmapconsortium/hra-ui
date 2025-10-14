import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';

/**
 * Info Message Indicator Component
 */
class InfoMessageIndicatorComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoMessageIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: InfoMessageIndicatorComponent, isStandalone: true, selector: "hra-info-message-indicator", ngImport: i0, template: "<mat-icon class=\"material-symbols-filled\">info</mat-icon>\n<div class=\"message\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;background-color:#1791ff1f;padding:.625rem .75rem;border-radius:.5rem;gap:.75rem}:host mat-icon{color:#00529c}:host .message{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-secondary);flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoMessageIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-info-message-indicator', imports: [CommonModule, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-icon class=\"material-symbols-filled\">info</mat-icon>\n<div class=\"message\">\n  <ng-content />\n</div>\n", styles: [":host{display:flex;background-color:#1791ff1f;padding:.625rem .75rem;border-radius:.5rem;gap:.75rem}:host mat-icon{color:#00529c}:host .message{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-secondary);flex:1}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { InfoMessageIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-message-indicator-info-message-indicator.mjs.map
