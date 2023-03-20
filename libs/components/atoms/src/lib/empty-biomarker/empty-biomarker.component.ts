import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';

/**
 *  Component for any empty biomaker cell
 *  to inform about the empty data and has
 *  button to navigate to HRA Team.
 */
@Component({
  selector: 'hra-empty-biomarker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MarkdownModule],
  templateUrl: './empty-biomarker.component.html',
  styleUrls: ['./empty-biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyBiomarkerComponent {
  /**
   * Input  buttonon text of empty biomarker component.
   */
  @Input() collaborateText = '';

  /**
   * Input  message markdown of empty biomarker component.
   */
  @Input() message = '';

  /**
   * An event emitter that emits the user button click event
   */
  @Output() readonly collaborateClick = new EventEmitter();
}
