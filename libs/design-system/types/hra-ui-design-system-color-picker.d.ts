import * as _angular_core from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';

/** Type representing an RGB color as a tuple of three numbers */
type Rgb = [red: number, green: number, blue: number];
/** Converts an RGB color to its hexadecimal string representation */
declare function rgbToHex(rgb: Rgb): string;
/** Converts a hexadecimal color string to an RGB color */
declare function hexToRgb(hex: string): Rgb;
/** Compares two RGB colors for equality */
declare function colorEquals(color1: Rgb, color2: Rgb): boolean;

/** Color Picker Component */
declare class ColorPickerComponent {
    /** The RGB color value */
    readonly color: _angular_core.ModelSignal<Rgb>;
    /** Emits when the color picker is opened or closed */
    readonly colorPickerOpen: _angular_core.OutputEmitterRef<ColorPickerDirective | null>;
    /** Hex representation of the color */
    readonly hexColor: _angular_core.WritableSignal<string>;
    /** Select a new color from the color picker */
    selectColor(hex: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ColorPickerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ColorPickerComponent, "hra-color-picker", never, { "color": { "alias": "color"; "required": true; "isSignal": true; }; }, { "color": "colorChange"; "colorPickerOpen": "colorPickerOpen"; }, never, never, true, never>;
}

export { ColorPickerComponent, colorEquals, hexToRgb, rgbToHex };
export type { Rgb };
