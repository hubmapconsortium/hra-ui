import { Component, OnInit, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { Error } from '../../models/response.model';
import { DOI } from '../../models/sheet.model';

@Component({
  selector: 'app-doi',
  imports: [HraCommonModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './doi.component.html',
  styleUrl: './doi.component.scss',
})
export class DoiComponent implements OnInit {
  readonly data: DOI[] = inject<DOI[]>(MAT_BOTTOM_SHEET_DATA);
  private readonly sheetRef = inject(MatBottomSheetRef);

  // Derived array used for rendering so the injected data stays immutable
  displayData: DOI[] = [];

  loading = true;
  noId = false;
  error: Error = { hasError: false };

  ngOnInit(): void {
    this.loading = false;

    // Populate a derived list with trimmed DOI values without mutating the injected data
    this.displayData = this.data.map((item) => {
      const doi = item.doi && item.doi.toUpperCase().startsWith('DOI') ? item.doi.substring(5).trim() : item.doi;
      return { ...item, doi } as DOI;
    });
  }

  close() {
    this.sheetRef.dismiss();
  }
}
