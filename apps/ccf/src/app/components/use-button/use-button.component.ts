import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UseButton } from './use-button';

@Component({
  selector: 'ccf-use-button',
  templateUrl: './use-button.component.html',
  styleUrls: ['./use-button.component.scss'],
})
export class UseButtonComponent {
  @Input() buttonData: UseButton;
}
