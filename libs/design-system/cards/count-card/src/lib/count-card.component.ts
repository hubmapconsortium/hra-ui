import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
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
export class CountCardComponent {
  /** Count */
  readonly count = input.required<number>();

  /** Show suffix for the count */
  readonly suffix = input<string>();

  /** Label text*/
  readonly label = input.required<string>();

  /** Icon */
  readonly icon = input.required<string>();

  /** Number currently displayed in count */
  protected readonly currentCount = signal(0);

  /**
   * Constructor that initializes the count card component.
   * Starts the count up animation.
   */
  constructor() {
    effect((onCleanup) => {
      const cleanup = this.startCountUp(this.count(), 100);
      onCleanup(cleanup);
    });
  }

  /**
   *  Starts the count up animation.
   *  @param target The target count to reach.
   *  @param numSteps The number of steps in the animation.
   */
  private startCountUp(target: number, numSteps: number): () => void {
    let animationFrameId: number | undefined;
    const step = Math.ceil(target / numSteps);
    const updateCounter = () => {
      this.currentCount.update((count) => Math.min(count + step, target));
      if (this.currentCount() < target) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    this.currentCount.set(0);
    animationFrameId = requestAnimationFrame(updateCounter);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }
}
