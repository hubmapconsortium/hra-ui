import * as i0 from '@angular/core';

/** Type for the navigation button variant */
type NavigationButtonVariant = 'cta' | 'basic';
/**
 * Navigation button component for global navigation
 * Used in mega menus and mobile menu overlays
 */
declare class NavigationButtonComponent {
    /** Link URL for the navigation item */
    readonly link: i0.InputSignal<string>;
    /** Variant type (cta or menu-item) */
    readonly variant: i0.InputSignal<NavigationButtonVariant>;
    /** Whether to show indent instead */
    readonly indented: i0.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationButtonComponent, "hra-navigation-button", never, { "link": { "alias": "link"; "required": true; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "indented": { "alias": "indented"; "required": false; "isSignal": true; }; }, {}, never, ["[hraNavigationIcon='leading']", "[hraNavigationButtonTagline]", "[hraNavigationButtonDescription]", "[hraNavigationIcon]:not([hraNavigationIcon='leading'])"], true, never>;
}

/**
 * Directive for navigation button description
 * Used for supporting text
 */
declare class NavigationButtonDescriptionDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationButtonDescriptionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationButtonDescriptionDirective, "[hraNavigationButtonDescription]", never, {}, {}, never, never, true, never>;
}

/**
 * Directive for navigation button tagline
 * Used for the primary label text
 */
declare class NavigationButtonTaglineDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationButtonTaglineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationButtonTaglineDirective, "[hraNavigationButtonTagline]", never, {}, {}, never, never, true, never>;
}

/** Position for navigation icon */
type NavigationIconPosition = 'leading' | 'trailing';
/**
 * Directive for navigation button icons
 * Use with mat-icon
 */
declare class NavigationIconDirective {
    /** Icon position (leading or trailing) */
    readonly hraNavigationIcon: i0.InputSignal<NavigationIconPosition>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationIconDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NavigationIconDirective, "[hraNavigationIcon]", never, { "hraNavigationIcon": { "alias": "hraNavigationIcon"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { NavigationButtonComponent, NavigationButtonDescriptionDirective, NavigationButtonTaglineDirective, NavigationIconDirective };
export type { NavigationButtonVariant, NavigationIconPosition };
