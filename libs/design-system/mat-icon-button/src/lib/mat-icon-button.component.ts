import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** Accepted size inputs */
type IconSize = 'small' | 'medium' | 'large';

/**
 * Icon buttons in dense application interface environments to achieve a specific task
 */
@Component({
  selector: 'hra-mat-icon-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './mat-icon-button.component.html',
  styleUrl: './mat-icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--mdc-icon-button-state-layer-size.rem]': 'buttonSize',
    '[style.--mdc-icon-button-icon-size.rem]': 'iconSize',
  },
})
export class MatIconButtonComponent {
  /** Size variant of icon button */
  size = input<IconSize>('large');
  /** Icon to display */
  icon = input.required<string>();

  /** Gets the button size in rem */
  get buttonSize(): number {
    switch (this.size()) {
      case 'small':
        return 1.5;
      case 'medium':
        return 2.25;
      case 'large':
        return 2.5;
      default:
        return 2.5;
    }
  }

  /** Gets the icon size in rem */
  get iconSize(): number {
    return this.size() === 'small' ? 1.25 : 1.5;
  }
}
