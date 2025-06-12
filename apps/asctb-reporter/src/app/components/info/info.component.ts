import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';
import { GaAction, GaCategory } from '../../models/ga.model';
import { Error } from '../../models/response.model';
import { SheetInfo } from '../../models/sheet.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  standalone: false,
})
export class InfoComponent implements OnInit {
  readonly data = inject<Observable<SheetInfo>>(MAT_BOTTOM_SHEET_DATA);
  readonly sheetRef = inject(MatBottomSheetRef);
  readonly ga = inject(GoogleAnalyticsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  loading = true;
  noId = false;
  error: Error = { hasError: false };
  info!: SheetInfo;

  ngOnInit(): void {
    this.loading = true;
    this.data.subscribe((info: SheetInfo) => {
      this.info = info;
      this.loading = false;

      if (info.hasError) {
        this.error = {
          hasError: info.hasError,
          msg: info.msg,
          status: info.status,
        };
      } else {
        this.error = { hasError: false };
        this.info = info;
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  close() {
    this.ga.event(GaAction.CLICK, GaCategory.GRAPH, 'Close Bottom Sheet Information', +false);
    this.sheetRef.dismiss();
  }
}
