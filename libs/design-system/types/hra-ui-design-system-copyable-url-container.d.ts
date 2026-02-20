import * as i0 from '@angular/core';

/**
 * Contains a url link and a button to copy it to the clipboard.
 */
declare class CopyableUrlContainerComponent {
    /** Url to display */
    readonly url: i0.InputSignal<string>;
    /** Snackbar service */
    private readonly snackbar;
    /**
     * Copys url to clipboard and shows a snackbar notification.
     */
    copyUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CopyableUrlContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CopyableUrlContainerComponent, "hra-copyable-url-container", never, { "url": { "alias": "url"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { CopyableUrlContainerComponent };
