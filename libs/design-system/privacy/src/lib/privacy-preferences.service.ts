import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConsentBannerComponent } from '../../consent-banner/consent-banner.component';
import store from 'store2';

/** Configuration options for the consent banner dialog */
export interface ConsentBannerConfig {
  /** Whether the dialog can be closed by clicking outside or pressing escape */
  disableClose?: boolean;
  /** Custom width for the dialog */
  width?: string;
  /** Custom height for the dialog */
  height?: string;
}

/** Privacy preferences data structure */
export interface PrivacyPreferences {
  /** Whether necessary cookies are allowed */
  necessary: boolean;
  /** Whether preference cookies are allowed */
  preferences: boolean;
  /** Whether statistical cookies are allowed */
  statistics: boolean;
  /** Whether marketing cookies are allowed */
  marketing: boolean;
}

/** Service for managing privacy preferences and consent banner */
@Injectable({
  providedIn: 'root',
})
export class PrivacyPreferencesService {
  private readonly dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<ConsentBannerComponent> | null = null;

  /**
   * Opens the consent banner as a Material dialog positioned at the bottom of the page
   * @param config Optional configuration for the dialog
   * @returns Reference to the opened dialog
   */
  openConsentBanner(config?: ConsentBannerConfig): MatDialogRef<ConsentBannerComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    const dialogConfig: MatDialogConfig = {
      position: {
        bottom: '0px',
        left: '0px',
        right: '0px',
      },
      width: config?.width || '100vw',
      height: config?.height || 'auto',
      hasBackdrop: false,
      disableClose: config?.disableClose ?? true,
      autoFocus: false,
      restoreFocus: true,
    };

    this.dialogRef = this.dialog.open(ConsentBannerComponent, dialogConfig);

    this.dialogRef.componentInstance.allowAllClick.subscribe(() => {
      this.handleAllowAll();
    });

    this.dialogRef.componentInstance.allowNecessaryOnlyClick.subscribe(() => {
      this.handleAllowNecessaryOnly();
    });

    this.dialogRef.componentInstance.customizeClick.subscribe(() => {
      this.handleCustomize();
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });

    return this.dialogRef;
  }

  /**
   * Closes the consent banner dialog if it's open
   */
  closeConsentBanner(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  /**
   * Checks if the consent banner dialog is currently open
   * @returns True if the dialog is open, false otherwise
   */
  isConsentBannerOpen(): boolean {
    return this.dialogRef !== null;
  }

  /**
   * Handle the "Allow All" action
   * Override this method or subscribe to events to implement custom logic
   */
  private handleAllowAll(): void {
    this.savePrivacyPreferences({
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    });

    this.closeConsentBanner();
  }

  /**
   * Handle the "Allow Necessary Only" action
   * Override this method or subscribe to events to implement custom logic
   */
  private handleAllowNecessaryOnly(): void {
    this.savePrivacyPreferences({
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    });

    this.closeConsentBanner();
  }

  /**
   * Handle the "Customize" action
   * Override this method or subscribe to events to implement custom logic
   */
  private handleCustomize(): void {
    this.closeConsentBanner();
    // TODO: Open detailed privacy preferences dialog
  }

  /**
   * Save privacy preferences to local storage or backend
   * @param preferences The privacy preferences to save
   */
  private savePrivacyPreferences(preferences: PrivacyPreferences): void {
    store.set('privacy-preferences', preferences);

    // TODO: Send to backend service
  }

  /**
   * Get saved privacy preferences
   * @returns The saved privacy preferences or null if none exist
   */
  getPrivacyPreferences(): PrivacyPreferences | null {
    return store.get('privacy-preferences') || null;
  }

  /**
   * Check if user has made privacy choices
   * @returns True if preferences have been set, false otherwise
   */
  hasPrivacyChoices(): boolean {
    return this.getPrivacyPreferences() !== null;
  }

  /**
   * Clear all saved privacy preferences
   */
  clearPrivacyPreferences(): void {
    store.remove('privacy-preferences');
  }
}
