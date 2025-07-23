import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

/**
 * Component representing a toggle button that allows users to switch between two states.
 */
@Component({
  selector: 'hra-switch-button',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  /** Determines whether toggle is checked or not */
  readonly isChecked = model.required<boolean>();
  /** Determines if the toggle is disabled or not */
  readonly isDisabled = input<boolean>();
  /** Determines if the icon should be hidden */
  readonly hideIcon = input<boolean>(false);

  /** Event emitted when the toggle state changes */
  onSwitchToggle(event: MatSlideToggleChange) {
    this.isChecked.set(event.checked);
  }
}
