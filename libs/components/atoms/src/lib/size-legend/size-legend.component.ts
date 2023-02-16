import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-size-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-legend.component.html',
  styleUrls: ['./size-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeLegendComponent {}
