import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-brandmark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brandmark.component.html',
  styleUrl: './brandmark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandmarkComponent {
  readonly color = input<string>('red');
}
