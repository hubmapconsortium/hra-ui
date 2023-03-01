import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Label box component for reuse accross the page. */
@Component({
  selector: 'hra-label-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-box.component.html',
  styleUrls: ['./label-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelBoxComponent {
  /** No input or ouput required as we are projecting the data */
}
