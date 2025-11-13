import * as i0 from '@angular/core';
import { input, computed, Directive, ViewEncapsulation, ChangeDetectionStrategy, Component, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';

/** Icon sizes for each tree size (rem) */
const ICON_SIZES = {
    small: 1.25,
    medium: 1.5,
    large: 1.5,
};
/** Font sizes for each tree size (rem) */
const FONT_SIZES = {
    small: 0.75,
    medium: 0.875,
    large: 1,
};
/** Node heights for each tree size (rem) */
const NODE_HEIGHTS = {
    small: 1.5,
    medium: 1.75,
    large: 2,
};
/**
 * Directive for hra tree component size
 */
class TreeSizeDirective {
    /** Size of tree to use */
    size = input.required(...(ngDevMode ? [{ debugName: "size", alias: 'hraTreeSize' }] : [{ alias: 'hraTreeSize' }]));
    /** Gets font size of tree in rem */
    iconSize = computed(() => ICON_SIZES[this.size()], ...(ngDevMode ? [{ debugName: "iconSize" }] : []));
    /** Gets font size of tree in rem */
    fontSize = computed(() => FONT_SIZES[this.size()], ...(ngDevMode ? [{ debugName: "fontSize" }] : []));
    /** Node heights */
    nodeHeight = computed(() => NODE_HEIGHTS[this.size()], ...(ngDevMode ? [{ debugName: "nodeHeight" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TreeSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.11", type: TreeSizeDirective, isStandalone: true, selector: "[hraTreeSize]", inputs: { size: { classPropertyName: "size", publicName: "hraTreeSize", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "style.--mat-tree-node-text-size.rem": "fontSize()", "style.--mat-tree-node-min-height.rem": "nodeHeight()", "style.--mat-icon-button-state-layer-size.rem": "nodeHeight()", "style.--mat-icon-button-icon-size.rem": "iconSize()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TreeSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraTreeSize]',
                    host: {
                        '[style.--mat-tree-node-text-size.rem]': 'fontSize()',
                        '[style.--mat-tree-node-min-height.rem]': 'nodeHeight()',
                        '[style.--mat-icon-button-state-layer-size.rem]': 'nodeHeight()',
                        '[style.--mat-icon-button-icon-size.rem]': 'iconSize()',
                    },
                }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraTreeSize", required: true }] }] } });

/**
 * Applies mat tree styles globally
 */
class TreeStylesComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TreeStylesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.11", type: TreeStylesComponent, isStandalone: true, selector: "hra-tree-styles", ngImport: i0, template: '', isInline: true, styles: [".hra-app{--mat-tree-container-background-color: var(--mat-sys-on-primary);--mat-tree-node-text-font: var(--mat-sys-label-medium-font);--mat-tree-node-text-weight: var(--mat-sys-label-medium-weight);--mat-tree-node-text-color: var(--mat-sys-secondary)}.hra-app mat-tree{letter-spacing:var(--mat-sys-label-medium-tracking);cursor:pointer;-webkit-user-select:none;user-select:none;outline:none}.hra-app mat-tree:focus-visible .node-content{border-color:var(--mat-sys-tertiary)}.hra-app .node-content{display:flex;height:var(--mat-tree-node-min-height);line-height:var(--mat-tree-node-min-height);border-radius:.25rem;width:100%;border-width:2px;border-style:solid;border-color:transparent;align-items:center;--mat-button-text-hover-state-layer-opacity: 0;--mat-button-text-pressed-state-layer-opacity: 0}.hra-app .node-content.leaf{padding-left:.5rem}.hra-app .node-content:hover{background:rgb(from var(--mat-sys-secondary) r g b/.08)}.hra-app .node-content:active{background:rgb(from var(--mat-sys-secondary) r g b/.16);border-color:transparent}.hra-app .node-content.selected{background:rgb(from var(--mat-sys-tertiary) r g b/.2)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: TreeStylesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-tree-styles', template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".hra-app{--mat-tree-container-background-color: var(--mat-sys-on-primary);--mat-tree-node-text-font: var(--mat-sys-label-medium-font);--mat-tree-node-text-weight: var(--mat-sys-label-medium-weight);--mat-tree-node-text-color: var(--mat-sys-secondary)}.hra-app mat-tree{letter-spacing:var(--mat-sys-label-medium-tracking);cursor:pointer;-webkit-user-select:none;user-select:none;outline:none}.hra-app mat-tree:focus-visible .node-content{border-color:var(--mat-sys-tertiary)}.hra-app .node-content{display:flex;height:var(--mat-tree-node-min-height);line-height:var(--mat-tree-node-min-height);border-radius:.25rem;width:100%;border-width:2px;border-style:solid;border-color:transparent;align-items:center;--mat-button-text-hover-state-layer-opacity: 0;--mat-button-text-pressed-state-layer-opacity: 0}.hra-app .node-content.leaf{padding-left:.5rem}.hra-app .node-content:hover{background:rgb(from var(--mat-sys-secondary) r g b/.08)}.hra-app .node-content:active{background:rgb(from var(--mat-sys-secondary) r g b/.16);border-color:transparent}.hra-app .node-content.selected{background:rgb(from var(--mat-sys-tertiary) r g b/.2)}\n"] }]
        }] });

/**
 * Returns providers for tree
 */
function provideTrees() {
    return makeEnvironmentProviders([provideStyleComponents(TreeStylesComponent)]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { TreeSizeDirective, provideTrees };
//# sourceMappingURL=hra-ui-design-system-tree.mjs.map
