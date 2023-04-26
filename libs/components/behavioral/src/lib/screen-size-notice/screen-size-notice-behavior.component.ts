import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';
import { HostListener, Renderer2, ElementRef } from '@angular/core';
import { StorageId, StorageState, StorageActions } from '@hra-ui/cdk/state';

@Component({
  selector: 'ftu-screen-size-notice-behavior',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, MatButtonModule, ScreenSizeNoticeComponent],
  templateUrl: './screen-size-notice-behavior.component.html',
  styleUrls: ['./screen-size-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeBehaviorComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {
    StorageState.getStorage(StorageId.Local).setItem('screenSizeProceedClick', '');
  }

  @Input() screenResized = false;

  url = 'abcd';

  proceedClick() {
    const screenSizeProceedClick: string | null = StorageState.getStorage(StorageId.Local).getItem(
      'screenSizeProceedClick'
    );
    if (screenSizeProceedClick === null || screenSizeProceedClick === '') {
      StorageState.getStorage(StorageId.Local).setItem('screenSizeProceedClick', 'clicked');
      this.screenResized = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    if (window.innerWidth < 480) {
      if (window.innerWidth < 480) {
        if (StorageState.getStorage(StorageId.Local).getItem('screenSizeProceedClick') === 'clicked') {
          this.screenResized = false;
        } else {
          this.screenResized = true;
        }
      }
    }
  }
}
