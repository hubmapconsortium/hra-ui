import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Section header with link for navigation
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
  readonly level = input.required({ transform: numberAttribute });
  readonly anchor = input<string>();
  readonly underlined = input(false, { transform: booleanAttribute });

  private readonly baseUrl = inject(Router).url.split('#')[0];
  protected readonly href = computed(() => `${this.baseUrl}#${this.anchor()}`);
}
