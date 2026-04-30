import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  InfoButtonActionsDirective,
  InfoButtonComponent,
  InfoButtonTaglineDirective,
} from '@hra-ui/design-system/buttons/info-button';
import { ChipSizeDirective } from '@hra-ui/design-system/chips';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

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
    MatButtonToggleModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    InfoButtonComponent,
    InfoButtonTaglineDirective,
    InfoButtonActionsDirective,
    PlainTooltipDirective,
    ChipSizeDirective,
  ],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent<T extends FilterChip> {
  /** tagline for the filter category */
  readonly action = input.required<string>();

  /** Total count of filter options in the category */
  readonly totalCount = input<number>();

  /** Whether the filter container is active/open */
  readonly active = model(false);

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
