import { Immutable } from '@angular-ru/cdk/typings';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AggregateCount } from '@hra-api/ng-client';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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
    ScrollingModule,
    ScrollOverflowFadeDirective,
    MatDividerModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Output emitting the result that was clicked on and its relevant information.
   * Used for opening and rendering the result viewer.
   */
  readonly linkClicked = output<string>();

  /**
   * Output emitting the link result selected
   */
  readonly listResultSelected = output<Immutable<ListResult>>();

  /**
   * Output emitting the link result deselected
   */
  readonly listResultDeselected = output<Immutable<ListResult>>();

  /**
   * Creates an instance of results browser component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) {}

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

  /**
   * Notifies on link click
   *
   * @param link the link clicked
   */
  handleLinkClick(link: string): void {
    this.linkClicked.emit(link);
  }

  asMutable<T>(value: Immutable<T>): T {
    return value as T;
  }

  resetSelections(): void {
    const selectedResults = this.listResults().filter((result) => result.selected);
    for (const result of selectedResults) {
      this.listResultDeselected.emit({ ...result, selected: false });
    }
  }
}
