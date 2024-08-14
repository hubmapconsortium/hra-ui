import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

/** Divider Component */
@Component({
  selector: 'hra-divider',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  /** Flag to render vertical divider */
  readonly vertical = input(false, { transform: booleanAttribute });
}
