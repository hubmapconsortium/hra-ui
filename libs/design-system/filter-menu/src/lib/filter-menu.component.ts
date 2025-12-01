import { ChangeDetectionStrategy, Component, contentChildren, input, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/** Filter menu option interface */
export interface FilterMenuOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
  /** Secondary label */
  secondaryLabel?: string;
  /** Number of results for the filter option in the data */
  count: number;
}

/** Filter option category interface */
export interface FilterOptionCategory {
  /** Category id */
  id: string;
  /** Category label */
  label: string;
  /** Filter options for the category */
  options?: FilterMenuOption[];
}

/**
 * A collapsing menu with ways to refine databases to particular views, sorting and grouping preferences, and filters
 */
@Component({
  selector: 'hra-filter-menu',
  imports: [
    HraCommonModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    ButtonsModule,
    IconsModule,
    FilterContainerComponent,
  ],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent {
  /** Filter options */
  readonly filters = input.required<FilterOptionCategory[]>();

  /** Menu tagline */
  readonly tagline = input<string>();

  /** Menu description */
  readonly description = input<string>();

  /** Whether to show the close button */
  readonly enableClose = input<boolean>();

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  /** Emits when the filter options change */
  readonly filterChange = output();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Detects if there are controls in the component */
  readonly controls = contentChildren('*');
}
