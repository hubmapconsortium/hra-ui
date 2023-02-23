import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 *  hra empty biomarker Component
 */
@Component({
  selector: 'hra-empty-biomarker',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './empty-biomarker.component.html',
  styleUrls: ['./empty-biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyBiomarkerComponent {
  /**
   * Input  collaborateText of empty biomarker component
   */
  @Input() collaborateText = '';

  /**
   * Input  emptyMessage of empty biomarker component
   */
  @Input() emptyMessage = '';

  /**
   * Input  contentMessage of empty biomarker component
   */
  @Input() contactUsMessage = '';
}
