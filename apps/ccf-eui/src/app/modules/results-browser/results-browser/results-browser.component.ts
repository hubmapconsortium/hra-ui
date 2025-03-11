import { Immutable } from '@angular-ru/cdk/typings';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AggregateCount } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ListResult } from '../../../core/models/list-result';
import { DonorCardComponent } from '../donor-card/donor-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

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
    ScrollingModule,
    ScrollOverflowFadeDirective,
    MatDividerModule,
    MicroTooltipDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ResultsBrowserComponent {
  /**
   * Input array of List Results to display
   */
  readonly listResults = input.required<Immutable<ListResult[]>>();

  /**
   * Input used to add a list of stats at the top the results browser
   */
  readonly aggregateData = input.required<Immutable<AggregateCount[]>>();

  readonly header = input.required<boolean>();

  /**
   * Output emitting the link result selected
   */
  readonly listResultSelected = output<Immutable<ListResult>>();

  /**
   * Output emitting the link result deselected
   */
  readonly listResultDeselected = output<Immutable<ListResult>>();

  readonly listResultExpansionChange = output<Immutable<ListResult>>();

  readonly showSelected = signal(false);

  anyItemsSelected = false;

  /**
   * Creates an instance of results browser component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) {
    effect(() => {
      const results = this.listResults() as ListResult[];
      this.anyItemsSelected = results.some((result) => result.selected);
    });
  }

  /**
   * Notifies listeners when a selection/deselection is made
   *
   * @param result the list result
   * @param selected whether to select or deselect the result
   */
  handleSelection(result: Immutable<ListResult>, selected: boolean): void {
    this.ga.event('list_result_selected', 'results_browser', result.tissueBlock.label, +selected);
    if (selected) {
      this.listResultSelected.emit(result);
    } else {
      this.listResultDeselected.emit(result);
    }
  }

  asMutable<T>(value: Immutable<T>): T {
    return value as T;
  }

  resetSelections(): void {
    const selectedResults = this.listResults().filter((result) => result.selected);
    for (const result of selectedResults) {
      this.listResultDeselected.emit({ ...result, selected: false });
    }
    this.showSelected.set(false);
  }

  changeExpansion(result: Immutable<ListResult>, value: boolean) {
    this.listResultExpansionChange.emit({ ...result, expanded: value });
  }

  getColor(result: Immutable<ListResult>): string {
    return result.selected ? result.color || '' : 'transparent';
  }

  toggleShowSelected(): void {
    this.showSelected.set(!this.showSelected());
  }
}
