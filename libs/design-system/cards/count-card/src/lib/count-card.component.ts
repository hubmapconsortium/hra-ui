import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { HraCommonModule, INTERSECTION_OBSERVER, WINDOW } from '@hra-ui/common';
import { IconsModule } from '@hra-ui/design-system/icons';

/** Fraction of the card that must be in view before the count starts */
const VISIBLE_THRESHOLD = 0.5;

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

  /** Whether the card has come into view */
  private readonly visible = signal(false);

  /** Whether the count animates up from zero once the card is in view */
  private readonly animated = this.observeVisibility();

  /** Number currently displayed in count */
  protected readonly currentCount = linkedSignal(() => (this.animated ? 0 : this.count()));

  /**
   * Constructor that initializes the count card component.
   * Starts the count up animation once the card is in view.
   */
  constructor() {
    effect((onCleanup) => {
      if (this.visible()) {
        const cleanup = this.startCountUp(this.count(), 100);
        onCleanup(cleanup);
      }
    });
  }

  /**
   * Watches for the card to come into view.
   * Skipped when the user prefers reduced motion or IntersectionObserver is unavailable.
   *
   * @returns Whether the card is being watched
   */
  private observeVisibility(): boolean {
    const IntersectionObserver = inject(INTERSECTION_OBSERVER);
    const reducedMotion = inject(WINDOW)?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!IntersectionObserver || reducedMotion) {
      return false;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.intersectionRatio >= VISIBLE_THRESHOLD)) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: VISIBLE_THRESHOLD },
    );

    observer.observe(inject(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
    return true;
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
