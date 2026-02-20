import * as i0 from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/** Interface for Dialog Data */
interface DialogData {
    /** Title of the dialog */
    title: string;
    /** Message of the dialog */
    message: string;
    /** Action Button Object */
    action?: {
        /** Label for the action button */
        label: string;
        /** Callback function for the action button */
        callback: () => void;
    };
}
/** Notice Component */
declare class NoticeComponent {
    /** Instance of Mat Dialog Data */
    protected readonly data: DialogData;
    static ɵfac: i0.ɵɵFactoryDeclaration<NoticeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NoticeComponent, "hra-notice", never, {}, {}, never, never, true, never>;
}

/** Service to open dialog */
declare class DialogService {
    /** Instance of MatDialog */
    private readonly matDialog;
    /** Opens the dialog with necessary data and config */
    openNotice(title: string, message: string, action?: DialogData['action']): MatDialogRef<NoticeComponent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogService>;
}

export { DialogService, NoticeComponent };
export type { DialogData };
