import * as i0 from '@angular/core';
import { ValueOf } from 'type-fest';

/** Density levels */
type Density = ValueOf<typeof Densities>;
/** Density level enum */
declare const Densities: {
    readonly Compact0: "compact-0";
    readonly Compact2: "compact-2";
    readonly Compact4: "compact-4";
};
/** Style a component to a specific density level */
declare class DensityDirective {
    /** Density level of the component */
    readonly density: i0.InputSignal<Density>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DensityDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DensityDirective, "[hraDensity]", never, { "density": { "alias": "hraDensity"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { Densities, DensityDirective };
export type { Density };
