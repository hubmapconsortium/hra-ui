import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Brand Logo Component */
@Component({
  selector: 'hra-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
  /** Flag to check if the Logo is small */
  readonly small = input(false, { transform: booleanAttribute });

  /** Text color of the brand name */
  readonly color = input('#201E3D');
}
