import { Component, Input } from '@angular/core';
import { UseButton } from './use-button';

/** Displays a button with custom text */
@Component({
  selector: 'ccf-use-button',
  templateUrl: './use-button.component.html',
  styleUrls: ['./use-button.component.scss'],
})
export class UseButtonComponent {
  /** Details of the button */
  @Input() buttonData!: UseButton;
}
