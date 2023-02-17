import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svgs/2d-ftu-liver-liver-lobule.svg',
  styleUrls: ['./interactive-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSvgComponent {
}
