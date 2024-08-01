import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { SetExecuteSearchOnGenerate } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';

/**
 * Popover box for filter settings
 */
@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersPopoverComponent implements OnChanges {
  /**
   * Allows the filters to be set from outside the component, and still render / function normally
   */
  @Input() filters!: Record<string, unknown | unknown[]>;

  /**
   * Keeps track of whether or not the containing drawer is expanded
   * Because the styles need to change accordingly
   */
  @Input() drawerExpanded!: boolean;

  /**
   * List of technologies in the data
   */
  @Input() technologyFilters!: string[];

  /**
   * List of providers in the data
   */
  @Input() providerFilters!: string[];

  /**
   * List of spatial searches
   */
  @Input() spatialSearchFilters: SpatialSearchFilterItem[] = [];

  /**
   * Emits the current filters
   */
  @Output() readonly filtersChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Emits when a spatial search is selected/deselected
   */
  @Output() readonly spatialSearchSelected = new EventEmitter<SpatialSearchFilterItem[]>();

  /**
   * Emits when a spatial search is removed/deleted
   */
  @Output() readonly spatialSearchRemoved = new EventEmitter<string>();

  /**
   * Popup container element ref
   */
  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  /**
   * Keeps track of whether or not the filters popover box is visible or not
   */
  filtersVisible = false;

  /**
   * Updates popup height when spatial search filters changes
   * @param changes Changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.containerRef && 'spatialSearchFilters' in changes) {
      const el = this.containerRef.nativeElement as HTMLElement;
      el.style.transitionDuration = '0s'; // Temporarily disable height transition
      el.style.height = 'fit-content';
      setTimeout(() => {
        el.style.height = `${el.clientHeight}px`;
      }, 1);
    }
  }

  /**
   * Toggles filter popup visibility
   */
  @Dispatch()
  toggleFilterVisible(): SetExecuteSearchOnGenerate {
    const el = this.containerRef.nativeElement as HTMLElement;
    el.style.transitionDuration = '0.2s';
    this.filtersVisible = !this.filtersVisible;
    if (!this.filtersVisible) {
      el.style.overflow = 'hidden';
    }
    if (this.filtersVisible) {
      el.style.overflow = 'auto';
      el.style.height = 'fit-content';
      el.style.width = 'fit-content';
      setTimeout(() => {
        el.style.height = `${el.clientHeight}px`;
        el.style.width = `${el.clientWidth}px`;
      }, 225);
    }
    return new SetExecuteSearchOnGenerate(false);
  }

  /**
   * Hides the filters popover box
   */
  @Dispatch()
  removeBox(): SetExecuteSearchOnGenerate {
    this.filtersVisible = false;
    return new SetExecuteSearchOnGenerate(true);
  }

  /**
   * Emits the current filters, and hides the popover box
   *
   * @param filters The object containing all the currently set filters
   */
  applyFilters(filters: Record<string, unknown>): void {
    this.filters = filters;
    this.filtersChange.emit(filters);
    this.removeBox();
  }
}
