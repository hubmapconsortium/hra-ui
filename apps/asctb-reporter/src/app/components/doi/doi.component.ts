import { Component, OnInit, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Error } from '../../models/response.model';
import { DOI } from '../../models/sheet.model';

@Component({
  selector: 'app-doi',
  templateUrl: './doi.component.html',
  styleUrls: ['./doi.component.scss'],
  standalone: false,
})
export class DoiComponent implements OnInit {
  data = inject<DOI[]>(MAT_BOTTOM_SHEET_DATA);
  readonly sheetRef = inject(MatBottomSheetRef);

  loading = true;
  noId = false;
  error: Error = { hasError: false };

  ngOnInit(): void {
    this.loading = false;

    /**
     * Trimming the intial part of the doi property as it as "DOI: " in its respective property.
     */
    this.data = this.data.map((item) => {
      if (item.doi.toUpperCase().search('DOI') === 0) {
        item.doi = item.doi.substring(5);
      }
      return item;
    });
  }

  close() {
    this.sheetRef.dismiss();
  }
}
