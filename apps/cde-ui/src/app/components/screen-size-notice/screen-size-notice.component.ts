import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cde-screen-size-notice',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './screen-size-notice.component.html',
  styleUrl: './screen-size-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {
  private readonly ref = inject(MatDialogRef, { optional: true });

  close(): void {
    localStorage.setItem('cde-screen-size-notice-seen', 'true');
    this.ref?.close();
  }
}
