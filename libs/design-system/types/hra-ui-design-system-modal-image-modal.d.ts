import * as _angular_core from '@angular/core';

/**
 * Modal to display an image with a title.
 */
declare class ImageModalComponent {
    /** Label to display as the modal title */
    readonly modalTitle: _angular_core.InputSignal<string>;
    /** URL of the image to display */
    readonly imageUrl: _angular_core.InputSignal<string>;
    /** Alt text for the image */
    readonly altText: _angular_core.InputSignal<string>;
    /** Emits when close icon clicked */
    readonly close: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ImageModalComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ImageModalComponent, "hra-image-modal", never, { "modalTitle": { "alias": "modalTitle"; "required": true; "isSignal": true; }; "imageUrl": { "alias": "imageUrl"; "required": true; "isSignal": true; }; "altText": { "alias": "altText"; "required": false; "isSignal": true; }; }, { "close": "close"; }, never, never, true, never>;
}

export { ImageModalComponent };
