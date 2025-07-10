import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent, BottomSheetData } from './lib/bottom-sheet.component';

/**
 * Service to handle bottom sheet operations.
 * Provides a method to open a bottom sheet with specified data.
 */
@Injectable({ providedIn: 'root' })
export class BottomSheetService {
  /** Injects the MatBottomSheet service to open bottom sheets */
  private readonly _bottomSheet = inject(MatBottomSheet);

  /**
   * Opens a bottom sheet with the provided data.
   * @param data - The data to be passed to the bottom sheet component.
   */
  openBottomSheet(data: BottomSheetData) {
    return this._bottomSheet.open(BottomSheetComponent, { data });
  }
}
