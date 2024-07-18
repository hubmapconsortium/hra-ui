import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';
import { NgScrollDropped, NgScrollReached } from 'ngx-scrollbar/reached-event';

/**
 * Scroll container component
 */
@Component({
  selector: 'hra-scroll-container',
  standalone: true,
  imports: [CommonModule, NgScrollbar, NgScrollReached, NgScrollDropped],
  templateUrl: './scroll-container.component.html',
  styleUrl: './scroll-container.component.scss',
  host: {
    '[class.gradient-bottom-visible]': 'gradientBottomVisible()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollContainerComponent {
  /** Flag to show/hide the graident */
  readonly gradient = input(true);

  /** Flag to check if we are at bottom of the viewport */
  protected readonly atBottom = signal(false);

  /** Computed value that decides to show/hide the gradient */
  protected readonly gradientBottomVisible = computed(() => this.gradient() && !this.atBottom());
}
