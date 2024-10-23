import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Fullscreen Component */
@Component({
  selector: 'hra-fullscreen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fullscreen.component.html',
  styleUrl: './fullscreen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenComponent {
  /** Reference to the mat dialog data */
  private readonly viewRef = inject(MAT_DIALOG_DATA);
}
