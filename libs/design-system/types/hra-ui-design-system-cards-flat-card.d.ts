import * as i0 from '@angular/core';

/**
 * Component representing the footer of a flat card.
 */
declare class FlatCardActionsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<FlatCardActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlatCardActionsComponent, "hra-flat-card-actions", never, {}, {}, never, ["*"], true, never>;
}
/**
 * Component representing a flat card component.
 * Displays an header including component title, optional help icon, clsoing icon, placeholder for content, and an optional footer.
 */
declare class FlatCardComponent {
    /** Title of the card */
    readonly tagline: i0.InputSignal<string>;
    /** Optional help icon */
    readonly showHelpButton: i0.InputSignal<boolean>;
    /** Help icon button link */
    readonly helpLink: i0.InputSignal<string>;
    /** Optional divider */
    readonly showDivider: i0.InputSignal<boolean>;
    /** Optional footer content */
    readonly showButtonsFooter: i0.InputSignal<boolean>;
    /** Emits when the close button is clicked */
    readonly closeClick: i0.OutputEmitterRef<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlatCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlatCardComponent, "hra-flat-card", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "showHelpButton": { "alias": "showHelpButton"; "required": false; "isSignal": true; }; "helpLink": { "alias": "helpLink"; "required": false; "isSignal": true; }; "showDivider": { "alias": "showDivider"; "required": false; "isSignal": true; }; "showButtonsFooter": { "alias": "showButtonsFooter"; "required": false; "isSignal": true; }; }, { "closeClick": "closeClick"; }, never, ["*", "hra-flat-card-actions"], true, never>;
}

declare class FlatCardModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FlatCardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FlatCardModule, never, [typeof FlatCardComponent, typeof FlatCardActionsComponent], [typeof FlatCardComponent, typeof FlatCardActionsComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FlatCardModule>;
}

export { FlatCardActionsComponent, FlatCardComponent, FlatCardModule };
