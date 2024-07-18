import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';
import { NgScrollDropped, NgScrollReached } from 'ngx-scrollbar/reached-event';

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
  readonly gradient = input(true);

  protected readonly atBottom = signal(false);
  protected readonly gradientBottomVisible = computed(() => this.gradient() && !this.atBottom());
}
