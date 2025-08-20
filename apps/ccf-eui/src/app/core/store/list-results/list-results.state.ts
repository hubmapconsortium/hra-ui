import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable, inject } from '@angular/core';
import { NgxsOnInit, State } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { ListResult } from '../../models/list-result';
import { ColorAssignmentState } from '../color-assignment/color-assignment.state';
import { DataState } from '../data/data.state';
import { sortBy } from 'lodash';

/**
 * Interface representing the state model for list results.
 */
export interface ListResultsStateModel {
  /** List of tissue block results to display in the results section */
  listResults: ListResult[];
  /** ID of the current tissue block hovered in the body UI */
  highlightedNodeId?: string;
}

/**
 * State handling the list of results displayed in the results section.
 */
@StateRepository()
@State<ListResultsStateModel>({
  name: 'listResults',
  defaults: {
    listResults: [],
  },
})
@Injectable()
export class ListResultsState extends NgxsImmutableDataRepository<ListResultsStateModel> implements NgxsOnInit {
  /** Observable stream of list results */
  readonly listResults$ = this.state$.pipe(
    map((x) => x?.listResults),
    distinctUntilChanged(),
  );

  /** Observable stream of the highlighted node ID */
  readonly highlightedNodeId$ = this.state$.pipe(
    map((x) => x?.highlightedNodeId),
    distinctUntilChanged(),
    debounceTime(100),
  );

  /** Reference to the data state */
  private dataState!: DataState;

  /** Reference to the color assignments state */
  private colorAssignments!: ColorAssignmentState;

  /**
   * Constructor to create an instance of ListResultsState.
   */
  constructor() {
    super();
  }

  /**
   * Sets the list results
   *
   * @param listResults The list of results to display
   */
  @DataAction()
  setListResults(@Payload('listResults') listResults: ListResult[]): void {
    this.ctx.patchState({ listResults });
  }

  /**
   * Selects a list result and assigns a color to it
   *
   * @param result The list result to select
   */
  @DataAction()
  selectListResult(result: ListResult): void {
    this.colorAssignments.assignColor(result.tissueBlock.spatialEntityId ?? '');
  }

  /**
   * Deselects a list result and unassigns its color
   *
   * @param result The list result to deselect
   */
  @DataAction()
  deselectListResult(result: ListResult): void {
    const newResult = { ...result, expanded: false };
    this.changeExpansion(newResult);
    this.colorAssignments.unassignColor(newResult.tissueBlock.spatialEntityId ?? '');
  }

  /**
   * Replaces list result with updated list result with new expansion state
   *
   * @param result The updated list result
   */
  changeExpansion(result: ListResult): void {
    const listResultsCopy = [...this.ctx.getState().listResults];
    const i = listResultsCopy.findIndex((r) => r.tissueBlock['@id'] === result.tissueBlock['@id']);
    listResultsCopy[i] = result;
    this.setListResults(listResultsCopy as ListResult[]);
  }

  /**
   * Highlights node
   * @param id Node id
   */
  @DataAction()
  highlightNode(id: string): void {
    this.ctx.patchState({ highlightedNodeId: id });
  }

  /**
   * Unhighlights node
   * @param id Node id
   */
  @DataAction()
  unHighlightNode(): void {
    this.ctx.patchState({ highlightedNodeId: undefined });
  }

  /**
   * Initializes this state service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.dataState = inject(DataState);
    this.colorAssignments = inject(ColorAssignmentState);

    combineLatest([this.dataState.tissueBlockData$, this.colorAssignments.colorAssignments$])
      .pipe(
        map(([tissueBlocks, colors]) => {
          const topBlocks: ListResult[] = [];
          const otherBlocks: ListResult[] = [];
          for (const tissueBlock of tissueBlocks) {
            const color = colors[tissueBlock.spatialEntityId ?? ''];
            const expanded =
              this.ctx.getState().listResults.find((r) => r.tissueBlock['@id'] === tissueBlock['@id'])?.expanded ??
              false;
            if (color) {
              topBlocks.push({
                selected: true,
                color: color.color,
                rank: color.rank,
                tissueBlock,
                expanded,
              });
            } else {
              otherBlocks.push({
                selected: false,
                tissueBlock,
                expanded,
              });
            }
          }

          return sortBy(topBlocks, ['rank']).concat(otherBlocks);
        }),
        tap((results) => this.setListResults(results)),
      )
      .subscribe();
  }
}
