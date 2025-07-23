import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'hra-switch-button',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  readonly isChecked = model.required<boolean>();
  readonly isDisabled = input<boolean>();
  readonly hideIcon = input<boolean>(false);

  onSwitchToggle(event: MatSlideToggleChange) {
    this.isChecked.set(event.checked);
  }
}
