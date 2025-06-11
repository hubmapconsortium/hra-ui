import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { IconsModule } from '@hra-ui/design-system/icons';

/**
 * Component representing a count card.
 * Displays a count, a label, and an icon.
 */
@Component({
  selector: 'hra-count-card',
  imports: [HraCommonModule, IconsModule],
  templateUrl: './count-card.component.html',
  styleUrl: './count-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountCardComponent implements OnInit {
  /** Count */
  readonly count = input.required<number>();

  /** Show suffix for the count */
  readonly showSuffix = input<boolean>();

  /** Label text*/
  readonly label = input.required<string>();

  /** Icon */
  readonly icon = input.required<string>();

  /** Number currently displayed in count */
  readonly currentCount = signal(0);

  /**
   * Initializes count up animation on init
   */
  ngOnInit() {
    const updateCounter = () => {
      const d = Math.ceil(this.count() / 100); //Counts faster if count is larger
      if (this.currentCount() && this.currentCount() + d >= this.count()) {
        this.currentCount.set(this.count());
        return;
      }
      this.currentCount.update((count) => count + d);
      requestAnimationFrame(updateCounter);
    };
    requestAnimationFrame(updateCounter);
  }
}
