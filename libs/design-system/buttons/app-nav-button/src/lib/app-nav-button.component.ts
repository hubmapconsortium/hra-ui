import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

/** Apps Card Component */
@Component({
  selector: 'hra-app-nav-button',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './app-nav-button.component.html',
  styleUrl: './app-nav-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavButtonComponent {
  /** URL for the icon */
  readonly icon = input.required<string>();
  /** Title of the card */
  readonly tagline = input.required<string>();
  /** Description of the card */
  readonly description = input.required<string>();
  /** Link of the card */
  readonly link = input.required<string>();
}
