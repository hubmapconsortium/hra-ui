import { Immutable } from '@angular-ru/cdk/typings';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AggregateCount } from '@hra-api/ng-client';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ListResult } from '../../../core/models/list-result';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
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
    ButtonModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsBrowserComponent {
  /**
   * Input array of List Results to display
   */
  @Input() listResults!: Immutable<ListResult[]>;

  /**
   * Input used to add a list of stats at the top the results browser
   */
  @Input() aggregateData!: Immutable<AggregateCount[]>;

  /**
   * Input allowing the title of the result browser to be set outside of the component
   */
  @Input() resultLabel!: string;

  @Input() header!: boolean;

  /**
   * Output emitting the result that was clicked on and its relevant information.
   * Used for opening and rendering the result viewer.
   */
  @Output() readonly linkClicked = new EventEmitter<string>();

  /**
   * Output emitting the link result selected
   */
  @Output() readonly listResultSelected = new EventEmitter<Immutable<ListResult>>();

  /**
   * Output emitting the link result deselected
   */
  @Output() readonly listResultDeselected = new EventEmitter<Immutable<ListResult>>();

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
    this.ga.event('list_result_selected', 'results_browser', this.resultLabel, +selected);
    if (selected) {
      this.listResultSelected.next(result);
    } else {
      this.listResultDeselected.next(result);
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
}
