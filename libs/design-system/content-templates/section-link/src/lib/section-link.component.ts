import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Section link for navigation
 */
@Component({
  selector: 'hra-section-link',
  imports: [CommonModule, MatDividerModule, MatIconModule, ButtonsModule],
  templateUrl: './section-link.component.html',
  styleUrl: './section-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': 'anchor() || null',
    '[class]': '"hra-section-link-level-" + level()',
  },
})
export class SectionLinkComponent {
  /** Level of header text */
  readonly level = input.required({ transform: numberAttribute });

  /** Anchor for href */
  readonly anchor = input<string>();

  /** Whether to display the underline */
  readonly underlined = input(false, { transform: booleanAttribute });

  /** Href derived from base url and anchor */
  protected readonly href = computed(() => `#${this.anchor()}`);
}
