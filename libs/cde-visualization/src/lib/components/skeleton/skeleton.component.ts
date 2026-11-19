import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Shape of a skeleton placeholder */
export type SkeletonShape = 'text' | 'circle' | 'rect';

/**
 * Placeholder shape shown while content loads. Size it from the parent's styles.
 * It's hidden from assistive technology, so mark the loading region with aria-busy instead.
 */
@Component({
  selector: 'cde-skeleton',
  template: '',
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[attr.data-shape]': 'shape()',
  },
})
export class SkeletonComponent {
  /** A line of text, a circle, or a rectangle */
  readonly shape = input<SkeletonShape>('text');
}
