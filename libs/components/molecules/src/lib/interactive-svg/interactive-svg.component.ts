import { ChangeDetectionStrategy, Component } from '@angular/core';

import { svg } from './renal corpuscle';

@Component({
  selector: 'hra-interactive-svg',
  templateUrl: './interactive-svg.component.html',
  styleUrls: ['./interactive-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSvgComponent {
  svg = svg;
}
