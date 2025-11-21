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
import { FilterOptionCategory } from '../filter-menu.component';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';

/** A filter chip representing a selected filter option */
export interface FilterChip {
  /** Label for the chip */
  label: string;
}

/** Position of the desktop menu overlay */
const DESKTOP_MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 16 },
];

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
    OverlayModule,
  ],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContainerComponent<T extends FilterChip> {
  /** tagline for the filter category */
  readonly action = input.required<string>();

  readonly filter = input.required<FilterOptionCategory>();

  /** Whether to show the info button with tooltip */
  readonly showTooltip = input(false, { transform: booleanAttribute });

  /** Array of selected filter chips - two-way bindable */
  readonly chips = model<T[]>([]);

  readonly menuActive = model<boolean>(false);

  /** Whether to show a divider below the container */
  readonly enableDivider = input(false, { transform: booleanAttribute });

  /** Emits when the category button is clicked */
  readonly actionClick = output<void>();

  /** Overlay positions for the desktop menu */
  protected readonly desktopMenuPositions = DESKTOP_MENU_POSITIONS;

  /**
   * Handles the removal of a chip
   * @param chip The chip to remove
   */
  removeChip(chip: T): void {
    this.chips.update((current) => current.filter((c) => c.label !== chip.label));
  }

  toggleMenu(): void {
    this.menuActive.set(!this.menuActive());
    this.actionClick.emit();
  }
}
