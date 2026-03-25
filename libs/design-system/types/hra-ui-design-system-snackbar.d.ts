import { MatSnackBarRef, MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from '@angular/core';

/** Type for button position */
type ButtonPosition = 'start' | 'end';
/** interface for snackbar data */
interface SnackbarData {
    /** Message in the snackbar */
    message: string;
    /** Action button */
    action?: string;
    /** Flag to show/hide the close button */
    close?: boolean;
    /** Position of the action button */
    actionButtonPosition?: ButtonPosition;
}
/** Snackbar component */
declare class SnackbarComponent {
    /** Reference to the MatSnackbarRef */
    protected readonly snackbarRef: MatSnackBarRef<any>;
    /** Injection token for the snackbar data*/
    protected readonly data: SnackbarData;
    static ɵfac: i0.ɵɵFactoryDeclaration<SnackbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SnackbarComponent, "hra-snackbar", never, {}, {}, never, never, true, never>;
}

/** Snackbar configuration */
type SnackbarConfig = Omit<MatSnackBarConfig, 'data' | 'panelClass'>;
/** Service for snackbar. Opens the snackbar and configures it */
declare class SnackbarService {
    /** Reference to the MatSnackbar */
    readonly matSnackbar: MatSnackBar;
    /** Opens the snackbar with provided config */
    open(message: string, action: string, close?: boolean, actionButtonPosition?: ButtonPosition, config?: SnackbarConfig): MatSnackBarRef<SnackbarComponent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SnackbarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SnackbarService>;
}

export { SnackbarComponent, SnackbarService };
export type { ButtonPosition, SnackbarConfig, SnackbarData };
