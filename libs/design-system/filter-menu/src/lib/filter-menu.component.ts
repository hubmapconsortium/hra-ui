import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/** Option interface */
export interface Option {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
}

@Component({
  selector: 'hra-filter-menu-controls',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuControlsComponent {}

@Component({
  selector: 'hra-filter-menu',
  imports: [HraCommonModule, ScrollingModule, ScrollOverflowFadeDirective, ButtonsModule, IconsModule],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent {
  readonly tagline = input<string>();

  readonly description = input<string>();

  readonly enableClose = input<boolean>();

  readonly filters = input.required<Option[]>();

  /** Emits when the form opening state is toggled */
  readonly closeClick = output();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');
}
