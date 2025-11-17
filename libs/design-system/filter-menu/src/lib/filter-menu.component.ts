import { ChangeDetectionStrategy, Component, contentChildren, input, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/** Filter menu option interface */
export interface FilterMenuOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
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
  imports: [HraCommonModule, ScrollingModule, ScrollOverflowFadeDirective, ButtonsModule, IconsModule],
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
  readonly filters = input.required<FilterMenuOption[]>();

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  /** Detects if there are controls in the component */
  readonly controls = contentChildren('*');
}
