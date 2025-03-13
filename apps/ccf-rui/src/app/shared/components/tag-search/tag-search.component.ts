/* eslint-disable @typescript-eslint/member-ordering */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { from, interval, ObservableInput, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, throttle } from 'rxjs/operators';

import { Tag, TagId, TagSearchResult } from '../../../core/models/anatomical-structure-tag';

/** Default search results limit */
const DEFAULT_SEARCH_LIMIT = 5;
/** Default search throttle time in ms */
const DEFAULT_SEARCH_THROTTLE = 100;
/** Empty search result object */
const EMPTY_RESULT: TagSearchResult = { totalCount: 0, results: [] };

/**
 * Component for searching, selecting, and adding tags.
 */
@Component({
  selector: 'ccf-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'openResults()',
    '(focusin)': 'openResults()',
    '(window:click)': 'closeResults($event)',
    '(window:focusin)': 'closeResults($event)',
  },
  standalone: false,
})
export class TagSearchComponent implements OnDestroy {
  private readonly el = inject<ElementRef<Node>>(ElementRef);
  private readonly ga = inject(GoogleAnalyticsService);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-search';

  /** Search method */
  @Input() search?: (text: string, limit: number) => ObservableInput<TagSearchResult>;

  /** Maximum number of results to show */
  @Input() searchLimit?: number;

  /** Throttle time between search calls */
  @Input() searchThrottle?: number;

  /** Emits when tags are added */
  @Output() readonly added = new EventEmitter<Tag[]>();

  /** Search field controller */
  readonly searchControl = new UntypedFormControl();

  /** Search results */
  searchResults = EMPTY_RESULT;

  /** Object of currently checked search results */
  checkedResults: Record<TagId, boolean> = {};

  /** Whether results are shown */
  resultsVisible = false;

  /** Emits and completes when component is destroyed. Used to clean up observables. */
  private readonly destroy$ = new Subject<void>();

  /**
   * Creates an instance of tag search component.
   */
  constructor() {
    const cdr = inject(ChangeDetectorRef);

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        throttle(() => interval(this.searchThrottle ?? DEFAULT_SEARCH_THROTTLE), { leading: true, trailing: true }),
        switchMap(this.executeSearch),
      )
      .subscribe((result) => {
        this.searchResults = result;
        this.checkedResults = this.getUpdatedCheckedResults(result);
        cdr.markForCheck();
      });
  }

  /**
   * Cleans up component on destruction
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Determines whether any tags have been checked
   *
   * @returns true if any tag has been checked by the user
   */
  hasCheckedTags(): boolean {
    return Object.values(this.checkedResults).some((v) => v);
  }

  /**
   * Emits selected tags and resets the search and selections
   */
  addTags(): void {
    const { searchControl, searchResults, checkedResults } = this;
    const tags = searchResults.results.filter((tag) => checkedResults[tag.id]);
    if (tags.length > 0) {
      searchControl.reset();
      this.searchResults = EMPTY_RESULT;
      this.checkedResults = {};
      this.ga.event('tags_added', 'tag_search', tags.map((tag) => tag.label).join(','));
      this.added.emit(tags);
    }
  }

  /**
   * Opens the results panel
   */
  openResults(): void {
    if (!this.resultsVisible) {
      this.resultsVisible = true;
    }
  }

  /**
   * Closes the results panel
   *
   * @param event DOM event
   */
  closeResults(event: Event): void {
    if (this.resultsVisible && event.target instanceof Node) {
      if (!this.el.nativeElement.contains(event.target)) {
        this.resultsVisible = false;
      }
    }
  }

  /**
   * Executes a search on a piece of text.
   *
   * @param text Search text
   * @returns An observable of the search result.
   */
  private readonly executeSearch = (text: string): ObservableInput<TagSearchResult> => {
    const { search, searchLimit = DEFAULT_SEARCH_LIMIT } = this;
    if (!text || !search) {
      return [EMPTY_RESULT];
    }

    return from(search(text, searchLimit)).pipe(
      catchError(() => [EMPTY_RESULT]),
      map(this.truncateResults),
    );
  };

  /**
   * Truncates the number of results returned by a search
   *
   * @param result The results
   * @returns Results with at most `searchLimit` items
   */
  private readonly truncateResults = (result: TagSearchResult): TagSearchResult => {
    const { searchLimit = DEFAULT_SEARCH_LIMIT } = this;
    const items = result.results;

    if (items.length > searchLimit) {
      return {
        ...result,
        results: items.slice(0, searchLimit),
      };
    }

    return result;
  };

  /**
   * Computes a new checked object for result items. Already checked items are preserved.
   *
   * @param result New results
   * @returns A new checked object
   */
  private getUpdatedCheckedResults(result: TagSearchResult): Record<TagId, boolean> {
    const prev = this.checkedResults;
    return result.results.reduce<Record<TagId, boolean>>((acc, { id }) => {
      acc[id] = prev[id] ?? false;
      return acc;
    }, {});
  }
}
