import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  readonly imageSrc = input.required<string>();
  /** Date timestamp */
  readonly date = input.required<number>();
  /** Card tagline (less than 2 lines or truncated) */
  readonly tagline = input.required<string>();
  /** Tags to display on bottom of card */
  readonly tags = input<string[]>();
  /** Url for the button */
  readonly link = input.required<string>();
  /** Whether the link is external */
  readonly external = input(true, { transform: booleanAttribute });

  /**
   * Converts date timestamp to readable format (ex: September 29, 2025)
   * @param time Date timestamp
   * @returns Date in readable format
   */
  toDateString(time: number): string {
    const date = new Date(time);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
