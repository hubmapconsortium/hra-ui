import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  InfoButtonComponent,
  InfoButtonTaglineDirective,
  InfoButtonActionsDirective,
} from '@hra-ui/design-system/buttons/info-button';

/** A filter chip representing a selected filter option */
export interface FilterChip {
  /** Label for the chip */
  label: string;
}

/**
 * Design system filter container component
 */
@Component({
  selector: 'hra-filter-container',
  imports: [
    HraCommonModule,
    ButtonsModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    InfoButtonComponent,
    InfoButtonTaglineDirective,
    InfoButtonActionsDirective,
  ],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent<T extends FilterChip> {
  /** tagline for the filter category */
  readonly action = input.required<string>();

  /** Whether to show the info button with tooltip */
  readonly showTooltip = input(false, { transform: booleanAttribute });

  /** Array of selected filter chips - two-way bindable */
  readonly chips = model<T[]>([]);

  /** Whether to show a divider below the container */
  readonly enableDivider = input(false, { transform: booleanAttribute });

  /** Emits when the category button is clicked */
  readonly actionClick = output<void>();

  /**
   * Handles the removal of a chip
   * @param chip The chip to remove
   */
  removeChip(chip: T): void {
    this.chips.update((current) => current.filter((c) => c.label !== chip.label));
  }
}
