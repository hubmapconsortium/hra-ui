import * as i0 from '@angular/core';

/** Menu option interface */
interface MenuDemoOption {
    /** Name of option */
    name: string;
    /** Material icon name */
    icon: string;
    /** Options to open in a second menu */
    expandedOptions?: MenuDemoOption[];
}
/**
 * Nested Angular Material menu component
 */
declare class MenuDemoComponent {
    /** List of menu options */
    readonly menuOptions: i0.InputSignal<MenuDemoOption[]>;
    /** List of suboptions to display in the second menu */
    suboptions: MenuDemoOption[];
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuDemoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuDemoComponent, "hra-menu", never, { "menuOptions": { "alias": "menuOptions"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { MenuDemoComponent };
export type { MenuDemoOption };
