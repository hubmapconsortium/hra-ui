import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  /** Display label for the chip */
  label: string;
  /** Optional secondary label */
  secondaryLabel?: string;
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
  /** Label for the filter category */
  readonly label = input.required<string>();

  /** Optional rich tooltip configuration for info button */
  readonly tooltip = input<RichTooltipConfig | undefined>();

  /** Array of selected filter chips */
  readonly chips = input<FilterChip[]>([]);

  /** Whether to show a divider below the container */
  readonly showDivider = input<boolean>(false);

  /** Emitted when the filter button is clicked to open the filter menu/flyout */
  readonly filterButtonClick = output<void>();

  /** Emitted when a chip is removed */
  readonly chipRemoved = output<FilterChip>();

  /**
   * Handles the removal of a chip
   * @param chip The chip to remove
   */
  removeChip(chip: FilterChip): void {
    this.chipRemoved.emit(chip);
  }

  /**
   * Handles click on the filter button
   */
  onFilterButtonClick(): void {
    this.filterButtonClick.emit();
  }

  /**
   * Handles action click from the info button tooltip
   */
  onTooltipActionClick(): void {
    const url = this.tooltip()?.actionUrl;
    if (url) {
      window.open(url, '_blank');
    }
  }
}
