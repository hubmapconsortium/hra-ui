import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ProgressSpinnerComponent } from '@hra-ui/design-system/indicators/progress-spinner';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MarkdownModule } from 'ngx-markdown';
import { Observable } from 'rxjs';
import { GaAction, GaCategory } from '../../models/ga.model';
import { Error } from '../../models/response.model';
import { SheetInfo } from '../../models/sheet.model';

@Component({
  selector: 'app-info',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MarkdownModule,
    MatDivider,
    ProgressSpinnerComponent,
    TextHyperlinkDirective,
  ],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
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
