import { ChangeDetectionStrategy, Component, contentChildren, input, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { FilterContainerComponent } from './filter-container/filter-container.component';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/** Filter option interface */
export interface FilterToggleOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
}

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
  id: string;
  /** Category label */
  label: string;
  /** Filter options for the category */
  options?: FilterMenuOption[];
}

/**
 * Controls section for filter menu (controls inserted with ng-content)
 */
@Component({
  selector: 'hra-filter-menu-controls',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuControlsComponent {}

/**
 * A collapsing menu with waysto refine databases to particular views, sorting and grouping preferences, and filters
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
  /** Menu tagline */
  readonly tagline = input<string>();

  /** Menu description */
  readonly description = input<string>();

  /** Whether to show the close button */
  readonly enableClose = input<boolean>();

  /** Filter options */
  readonly filters = input.required<FilterOptionCategory[]>();

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  readonly filterChange = output();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Detects if there are controls in the component */
  readonly controls = contentChildren('*');
}
