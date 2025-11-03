import { booleanAttribute, ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

/** A filter chip representing a selected filter option */
export interface FilterChip {
  /** Unique identifier for the chip */
  id: string;
}

/** Configuration for the rich tooltip info button */
export interface RichTooltipConfig {
  /** Tooltip description */
  description: string;
  /** Optional action text for the tooltip */
  actionText?: string;
  /** Optional action URL for the tooltip */
  actionUrl?: string;
}

/**
 * Design system filter container component
 */
@Component({
  selector: 'hra-filter-container',
  imports: [HraCommonModule, ButtonsModule, RichTooltipModule, MatIconModule, MatChipsModule, MatDividerModule],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent {
  /** tagline for the filter category */
  readonly action = input.required<string>();

  /** Optional rich tooltip configuration for info button */
  readonly tooltip = input<RichTooltipConfig | undefined>();

  /** Array of selected filter chips - two-way bindable */
  readonly chips = model<FilterChip[]>([]);

  /** Whether to show a divider below the container */
  readonly enableDivider = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Handles the removal of a chip
   * @param chip The chip to remove
   */
  removeChip(chip: FilterChip): void {
    this.chips.update((current) => current.filter((c) => c.id !== chip.id));
  }
}
