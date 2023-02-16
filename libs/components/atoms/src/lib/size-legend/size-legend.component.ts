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

  /*   texts:SizeLegend[]=[
    {
      "label":"0%",
      "radius":0.5,
    },
    {
      "label":"50%",
      "radius":1
    },
    {
      "label":"100%",
      "radius":1.5
    }
  ] */
}
