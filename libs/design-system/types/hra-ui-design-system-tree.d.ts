import * as _angular_core from '@angular/core';
import { EnvironmentProviders } from '@angular/core';

/** Input options for each tree size */
type TreeSize = 'small' | 'medium' | 'large';
/**
 * Directive for hra tree component size
 */
declare class TreeSizeDirective {
    /** Size of tree to use */
    readonly size: _angular_core.InputSignal<TreeSize>;
    /** Gets font size of tree in rem */
    protected readonly iconSize: _angular_core.Signal<number>;
    /** Gets font size of tree in rem */
    protected readonly fontSize: _angular_core.Signal<number>;
    /** Node heights */
    protected readonly nodeHeight: _angular_core.Signal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TreeSizeDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TreeSizeDirective, "[hraTreeSize]", never, { "size": { "alias": "hraTreeSize"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Returns providers for tree
 */
declare function provideTrees(): EnvironmentProviders;

export { TreeSizeDirective, provideTrees };
export type { TreeSize };
