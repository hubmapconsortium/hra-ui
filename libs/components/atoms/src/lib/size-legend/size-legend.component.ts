import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeLegend } from '../size-legend';

@Component({
  selector: 'hra-size-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-legend.component.html',
  styleUrls: ['./size-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeLegendComponent {
  @Input() sizes: SizeLegend[] = [];
}
