import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as i3 from '@hra-ui/design-system/tooltips/rich-tooltip';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

/** Tagline component for info button rich tooltip */
class InfoButtonTooltipTaglineComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoButtonTooltipTaglineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: InfoButtonTooltipTaglineComponent, isStandalone: true, selector: "hra-info-button-tooltip-tagline", ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoButtonTooltipTaglineComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-info-button-tooltip-tagline',
                    standalone: true,
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/** Content component for info button rich tooltip */
class InfoButtonTooltipContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoButtonTooltipContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: InfoButtonTooltipContentComponent, isStandalone: true, selector: "hra-info-button-tooltip-content", ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoButtonTooltipContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-info-button-tooltip-content',
                    standalone: true,
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/** Info Button Component */
class InfoButtonComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: InfoButtonComponent, isStandalone: true, selector: "hra-info-button", ngImport: i0, template: "<button mat-icon-button hraPlainTooltip=\"Info\" [hraRichTooltip]=\"tooltip\" aria-label=\"Click for more information\">\n  <mat-icon>info</mat-icon>\n</button>\n\n<hra-rich-tooltip-container #tooltip>\n  <hra-rich-tooltip-tagline>\n    <ng-content select=\"hra-info-button-tooltip-tagline\" />\n  </hra-rich-tooltip-tagline>\n  <hra-rich-tooltip-content>\n    <ng-content />\n  </hra-rich-tooltip-content>\n</hra-rich-tooltip-container>\n", styles: [":host{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: RichTooltipModule }, { kind: "directive", type: i3.RichTooltipDirective, selector: "[hraRichTooltip]", inputs: ["hraRichTooltip", "hraRichTooltipTagline", "hraRichTooltipDescription", "hraRichTooltipActionText", "hraRichTooltipPositions"], outputs: ["hraRichTooltipActionClick"] }, { kind: "component", type: i3.RichTooltipTaglineComponent, selector: "hra-rich-tooltip-tagline" }, { kind: "component", type: i3.RichTooltipContentComponent, selector: "hra-rich-tooltip-content" }, { kind: "component", type: i3.RichTooltipContainerComponent, selector: "hra-rich-tooltip-container", exportAs: ["hraRichTooltipContainer"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: InfoButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-info-button', standalone: true, imports: [MatIconModule, MatButtonModule, PlainTooltipDirective, RichTooltipModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button mat-icon-button hraPlainTooltip=\"Info\" [hraRichTooltip]=\"tooltip\" aria-label=\"Click for more information\">\n  <mat-icon>info</mat-icon>\n</button>\n\n<hra-rich-tooltip-container #tooltip>\n  <hra-rich-tooltip-tagline>\n    <ng-content select=\"hra-info-button-tooltip-tagline\" />\n  </hra-rich-tooltip-tagline>\n  <hra-rich-tooltip-content>\n    <ng-content />\n  </hra-rich-tooltip-content>\n</hra-rich-tooltip-container>\n", styles: [":host{display:inline-block}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { InfoButtonComponent, InfoButtonTooltipContentComponent, InfoButtonTooltipTaglineComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-info-button.mjs.map
