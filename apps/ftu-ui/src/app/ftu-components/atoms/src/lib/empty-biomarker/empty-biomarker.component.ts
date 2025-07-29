import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';

/**
 *  Component for any empty biomaker cell
 *  to inform about the empty data and has
 *  button to navigate to HRA Team.
 */
@Component({
  selector: 'ftu-empty-biomarker',
  imports: [CommonModule, MatButtonModule, MarkdownModule, MatIconModule],
  templateUrl: './empty-biomarker.component.html',
  styleUrls: ['./empty-biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyBiomarkerComponent {
  /**
   * Input button on text of empty biomarker component.
   */
  @Input() collaborateText = '';

  /**
   * Input  message markdown of empty biomarker component.
   */
  @Input() message = `
  <p>
    We currently do not have cell type by biomarker data for the selected biomarker.
  </p>
  <p>
  Please email the Human Reference Atlas team at infoccf@iu.edu about your dataset.
  </p>
`;

  /**
   * An event emitter that emits the user button click event
   */
  @Output() readonly collaborateClick = new EventEmitter();
}
