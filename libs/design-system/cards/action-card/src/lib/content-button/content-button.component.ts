import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Content button action card component
 */
@Component({
  selector: 'hra-content-button',
  imports: [HraCommonModule, MatChipsModule, ButtonsModule, RouterModule],
  templateUrl: './content-button.component.html',
  styleUrl: './content-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentButtonComponent {
  /** Image url */
  readonly image = input<string>();
  /** Date to display on card */
  readonly date = input.required<string>();
  /** Card tagline (less than 2 lines or truncated) */
  readonly tagline = input.required<string>();
  /** Tags to display on bottom of card */
  readonly tags = input<string[]>();
  /** Url for the button */
  readonly link = input.required<string>();
  /** Whether the link is external */
  readonly external = input<boolean>(true);
}
