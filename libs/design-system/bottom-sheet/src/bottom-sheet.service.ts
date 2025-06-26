import { inject, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent, BottomSheetData } from './bottom-sheet.component';

@Injectable({ providedIn: 'root' })
export class BottomSheetService {
  private readonly _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(data: BottomSheetData) {
    return this._bottomSheet.open(BottomSheetComponent, { data });
  }
}
