import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const HEADER_FONTS: Record<number, string[]> = {
  1: ['var(--mat-sys-display-medium)', 'var(--mat-sys-display-medium-tracking)'],
  2: ['var(--mat-sys-headline-large)', 'var(--mat-sys-headline-large-tracking)'],
  3: ['var(--mat-sys-headline-medium)', 'var(--mat-sys-headline-medium-tracking)'],
  4: ['var(--mat-sys-headline-small)', 'var(--mat-sys-headline-small-tracking)'],
  5: ['var(--mat-sys-title-large)', 'var(--mat-sys-title-large-tracking)'],
  6: ['var(--mat-sys-title-medium)', 'var(--mat-sys-title-medium-tracking)'],
};

@Component({
  selector: 'hra-section-link',
  imports: [CommonModule, MatIconModule],
  templateUrl: './section-link.component.html',
  styleUrl: './section-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': 'linkId()',
  },
})
export class SectionLinkComponent {
  readonly size = input<number>(1);
  readonly tagline = input.required<string>();
  protected readonly headerFont = computed(() => HEADER_FONTS[this.size()] ?? HEADER_FONTS[1]);

  protected readonly linkId = computed(() => this.tagline().toLowerCase().replace(' ', '-'));
}
