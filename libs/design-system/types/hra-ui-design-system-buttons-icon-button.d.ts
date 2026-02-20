import * as i0 from '@angular/core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/material/icon';

/** Input options for icon button size */
type IconButtonSize = 'small' | 'large';
/**
 * Directive for icon buttons
 */
declare class IconButtonSizeDirective {
    /** Size of icon button to use */
    readonly size: i0.InputSignal<IconButtonSize>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconButtonSizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IconButtonSizeDirective, "[hraIconButtonSize]", never, { "size": { "alias": "hraIconButtonSize"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Input options for icon button color */
type IconButtonVariant = 'light' | 'dark' | 'color' | 'inverse';
/**
 * Directive for icon button variants (color)
 */
declare class IconButtonVariantDirective {
    /** Input for icon button color variant */
    readonly variant: i0.InputSignal<IconButtonVariant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconButtonVariantDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IconButtonVariantDirective, "[hraIconButtonVariant]", never, { "variant": { "alias": "hraIconButtonVariant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Module exporting icon button and related utilities */
declare class IconButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IconButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IconButtonModule, never, [typeof IconButtonSizeDirective, typeof IconButtonVariantDirective], [typeof i3.MatButtonModule, typeof i4.MatIconModule, typeof IconButtonSizeDirective, typeof IconButtonVariantDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IconButtonModule>;
}

export { IconButtonModule, IconButtonSizeDirective, IconButtonVariantDirective };
export type { IconButtonSize, IconButtonVariant };
