import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component for design system
 */
@Component({
  selector: 'hra-ui-design-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent {}
