import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
  /** Timestamp or date string */
  readonly date = input.required<string | number>();
  /** Card tagline (less than 2 lines or truncated) */
  readonly tagline = input.required<string>();
  /** Tags to display on bottom of card */
  readonly tags = input<string[]>();
  /** Url for the button */
  readonly link = input.required<string>();
  /** Whether the link is external */
  readonly external = input(true, { transform: booleanAttribute });

  /** Content button date converted into date string */
  protected readonly dateString = computed(() => {
    const dateFormat = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (typeof this.date() === 'number') {
      return dateFormat.format(this.date() as number);
    }
    if (!isNaN(Date.parse(this.date() as string))) {
      const timestamp = new Date(this.date()).getTime();
      return dateFormat.format(timestamp);
    }
    return this.date();
  });
}
