import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Label box component for reuse accross the page. The content with "end" selector will be added to the end of the label box */
@Component({
  selector: 'hra-label-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-box.component.html',
  styleUrls: ['./label-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelBoxComponent {}
