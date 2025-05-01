import { Immutable } from '@angular-ru/cdk/typings';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AggregateCount } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { ScrollingModule as HraScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListResult } from '../../../core/models/list-result';
import { DonorCardComponent } from '../donor-card/donor-card.component';

/**
 * ResultsBrowser is the container component in charge of rendering the label and stats of
 * the results as well as handling the virtual scrolling and click emitters of
 * ResultsBrowserItems.
 */
@Component({
  selector: 'ccf-results-browser',
  templateUrl: './results-browser.component.html',
  styleUrls: ['./results-browser.component.scss'],
  imports: [
    CommonModule,
    DonorCardComponent,
    ExpansionPanelModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    ButtonsModule,
    HraScrollingModule,
    ScrollOverflowFadeDirective,
    MatDividerModule,
    PlainTooltipDirective,
    ScrollingModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsBrowserComponent {
  /** Input array of List Results to display */
  readonly listResults = input.required<Immutable<ListResult[]>>();

  /** Input used to add a list of stats at the top the results browser */
  readonly aggregateData = input.required<Immutable<AggregateCount[]>>();

  /** Whether to show the header */
  readonly header = input.required<boolean>();

  /** Highlighted tissue block id */
  readonly highlighted = input<string>();

  /** Output emitting the link result selected */
  readonly listResultSelected = output<Immutable<ListResult>>();

  /** Output emitting the link result deselected */
  readonly listResultDeselected = output<Immutable<ListResult>>();

  /** Emits when the expansion panel state changes */
  readonly listResultExpansionChange = output<Immutable<ListResult>>();

  /** Emits currently hovered result id */
  readonly itemHovered = output<string>();

  /** Emits when result is unhovered */
  readonly itemUnhovered = output();

  /** Whether to show the selected */
  readonly showSelected = signal(false);

  /** Whether at least one item is selected */
  readonly hasSelectedItems = computed(() => this.listResults().some((item) => item.selected));

  /** Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * Notifies listeners when a selection/deselection is made
   *
   * @param result the list result
   * @param selected whether to select or deselect the result
   */
  handleSelection(result: Immutable<ListResult>, selected: boolean): void {
    this.ga.event('list_result_selected', 'results_browser', result.tissueBlock.label, +selected);
    if (!this.hasSelectedItems()) {
      this.showSelected.set(false);
    }

    if (selected) {
      this.listResultSelected.emit(result);
    } else {
      this.listResultDeselected.emit(result);
    }
  }

  /** Cast an immutable value to it's mutable type */
  asMutable<T>(value: Immutable<T>): T {
    return value as T;
  }

  /** Reset selections */
  resetSelections(): void {
    const selectedResults = this.listResults().filter((result) => result.selected);
    for (const result of selectedResults) {
      this.listResultDeselected.emit({ ...result, selected: false });
    }
    this.showSelected.set(false);
  }

  /** Change expansion panel result */
  changeExpansion(result: Immutable<ListResult>, value: boolean) {
    this.listResultExpansionChange.emit({ ...result, expanded: value });
  }

  /** Get the color of an item */
  getColor(result: Immutable<ListResult>): string {
    return result.selected ? result.color || '' : 'transparent';
  }

  /** Toggle the selected items */
  toggleShowSelected(): void {
    this.showSelected.set(!this.showSelected());
  }

  /** Track by function for the list of results */
  trackByResult(index: number) {
    return index;
  }
}
