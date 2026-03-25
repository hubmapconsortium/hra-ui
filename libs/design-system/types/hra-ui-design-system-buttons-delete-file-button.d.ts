import * as _angular_core from '@angular/core';

/**
 * Button to give users an option to delete their file if they upload the wrong file
 */
declare class DeleteFileButtonComponent {
    /** File name */
    readonly fileName: _angular_core.InputSignal<string>;
    /** Cancels load */
    readonly cancelLoad: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DeleteFileButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<DeleteFileButtonComponent, "hra-delete-file-button", never, { "fileName": { "alias": "fileName"; "required": true; "isSignal": true; }; }, { "cancelLoad": "cancelLoad"; }, never, never, true, never>;
}

export { DeleteFileButtonComponent };
