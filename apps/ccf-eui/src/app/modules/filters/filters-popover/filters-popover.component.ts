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

  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  /**
   * Keeps track of whether or not the filters popover box is visible or not
   */
  filtersVisible = false;

  containerWidth?: number;

  get defaultHeight(): number {
    return Math.ceil(this.technologyFilters.length / 5) * 32 + Math.ceil(this.providerFilters.length / 3) * 32 + 289;
  }

  /**
   * Calculate the popup height based on length of spatial search list
   */
  get spatialHeight(): number {
    return this.spatialSearchFilters.length > 0 ? (this.spatialSearchFilters.length + 1) * 48 : 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.containerRef && 'spatialSearchFilters' in changes) {
      const el = this.containerRef.nativeElement as HTMLElement;
      el.style.transition = 'unset';
      el.style.height = `${this.defaultHeight + this.spatialHeight}px`;
    }
  }

  /**
   * Toggles filter visible
   */
  @Dispatch()
  toggleFilterVisible(): SetExecuteSearchOnGenerate {
    const el = this.containerRef.nativeElement as HTMLElement;
    this.filtersVisible = !this.filtersVisible;
    if (!this.filtersVisible) {
      el.style.transition = 'all 0.2s ease-in-out 0.3s';
    } else {
      el.style.transition = 'all 0.2s ease-in-out 0s';
      setTimeout(() => {
        el.style.height = `${this.defaultHeight + this.spatialHeight}px`;
        if (!this.containerWidth) {
          this.containerWidth = el.clientWidth;
        }

        el.style.width = `${this.containerWidth}px`;
      }, 200);
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
