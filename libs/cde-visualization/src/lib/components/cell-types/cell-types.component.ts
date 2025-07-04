import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { ExpansionPanelActionsComponent, ExpansionPanelComponent } from '@hra-ui/design-system/expansion-panel';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { map } from 'rxjs';

import { CellTypeEntry } from '../../models/cell-type';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '../../shared/tooltip-position';
import { ColorPickerLabelComponent } from '../color-picker-label/color-picker-label.component';

/**
 * Cell Type Component
 */
@Component({
  selector: 'cde-cell-types',
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    ButtonsModule,
    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    IconButtonSizeDirective,
    PlainTooltipDirective,
    ScrollingModule,
    ColorPickerLabelComponent,
  ],
  templateUrl: './cell-types.component.html',
  styleUrl: './cell-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTypesComponent {
  /** List of cell types */
  readonly cellTypes = model.required<CellTypeEntry[]>();

  /** List of selected cell types */
  readonly cellTypesSelection = model.required<string[]>();

  /** Currently selected cell type */
  readonly selectedCellType = input<string>('');

  /** Record of adjustments for cell type counts */
  readonly countAdjustments = input<Record<string, { count: number; outgoingEdgeCount: number }>>({});

  /** Output event for download colormap action */
  readonly downloadColorMap = output();

  /** Output event for download edges action */
  readonly downloadNodes = output();

  /** Output event for download edges action */
  readonly downloadEdges = output();

  /** Output event for reset color */
  readonly resetAllColors = output();

  /** Columns to be displayed in the table */
  protected readonly columns = computed(() => {
    if (this.hideCellLinkData()) {
      return ['select', 'cellType', 'count'];
    }
    return ['select', 'cellType', 'count', 'links'];
  });

  /** Tooltip position configuration */
  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Reference to MatSort directive */
  protected readonly sort = viewChild.required(MatSort);

  /** Content for Info Tooltip card */
  protected readonly infoToolTipDescription: string = `Show/hide cell types in the visualization and plots. Hide cell links from this table view.
    Update colors for individual cell types. Download CSVs for the current configurations of
    cell types, cell links, and cell type color map formatting.`;

  /** Flag to toggle cell links row visibility */
  protected readonly hideCellLinkData = signal(false);

  /** Bind sort state to data source */
  protected readonly sortBindRef = effect(() => (this.dataSource.sort = this.sort()));

  /** Change detector reference */
  private readonly cdr = inject(ChangeDetectorRef);

  /** Data source for the table */
  protected readonly dataSource = new MatTableDataSource<CellTypeEntry>();

  /** Bind data source to cell types */
  protected readonly dataSourceBindRef = effect(() => {
    this.dataSource.data = this.cellTypes();
    this.cdr.markForCheck();
  });

  /** Selection model for managing selected cell types */
  protected readonly selectionModel = new SelectionModel<string>(true);

  /** Bind selection model to cell types selection */
  protected readonly selectionModelBindRef = effect(() => {
    this.selectionModel.setSelection(...this.cellTypesSelection());
    this.cdr.markForCheck();
  });

  /** Observable stream of selection changes */
  protected readonly selection$ = this.selectionModel.changed.pipe(map(() => this.selectionModel.selected));

  /** Signal for selection state */
  protected readonly selection = toSignal(this.selection$, { initialValue: [] });

  /** Computed selection state */
  protected readonly selectionState = computed(() => {
    const cellTypesLength = this.cellTypes().length;
    const selectionLength = this.selection().length;
    if (cellTypesLength === 0 || selectionLength === 0) {
      return 'none';
    } else if (selectionLength < cellTypesLength) {
      return 'partial';
    }
    return 'full';
  });

  /** Helper function to calculate the number of nodes or edges */
  protected readonly sumCounts = (count: number, entry: CellTypeEntry, key: 'count' | 'outgoingEdgeCount') => {
    if (this.isSelected(entry)) {
      const adjustment = this.countAdjustments()[entry.name]?.[key] ?? 0;
      const value = entry[key];
      return count + value - adjustment;
    }

    return count;
  };

  /** Computed total cell count based on selection */
  protected readonly totalCellCount = computed(() => {
    // Grab dependency on current selection since selectionModel is used indirectly
    this.selection();

    return this.cellTypes().reduce((count, entry) => this.sumCounts(count, entry, 'count'), 0);
  });

  /** The total cell links count */
  protected readonly totalCellLinksCount = computed(() => {
    // Grab dependency on current selection since selectionModel is used indirectly
    this.selection();

    return this.cellTypes().reduce((count, entry) => this.sumCounts(count, entry, 'outgoingEdgeCount'), 0);
  });

  /** Toggle state for cell types info */
  protected cellTypesInfoOpen = false;

  /** Track cell type entries by name */
  trackByName(_index: number, item: CellTypeEntry): string {
    return item.name;
  }

  /** Generate checkbox label based on selection state */
  getCheckboxLabel(isSelected: boolean, row?: number): string {
    const action = isSelected ? 'deselect' : 'select';
    const where = row === undefined ? 'all' : `row ${row}`;
    return `${action} ${where}`;
  }

  /** Obtains count from a cell type entry after adjustments */
  getCount(obj: CellTypeEntry, key: 'count' | 'outgoingEdgeCount'): string {
    const adjustment = this.countAdjustments()[obj.name]?.[key] ?? 0;
    const count = obj[key] - adjustment;
    return count.toLocaleString();
  }

  /** Check if a cell type entry is selected */
  isSelected(row: CellTypeEntry): boolean {
    return this.selectionModel.isSelected(row.name);
  }

  /** Toggle selection state of a cell type entry */
  toggleRow(row: CellTypeEntry): void {
    this.selectionModel.toggle(row.name);
    this.cellTypesSelection.set(this.selectionModel.selected);
  }

  /** Toggle selection state of all cell type entries */
  toggleAllRows(): void {
    const selection = this.selectionState() === 'full' ? [] : this.cellTypes().map((entry) => entry.name);
    this.cellTypesSelection.set(selection);
  }

  /** Update color for a cell type entry */
  updateColor(row: CellTypeEntry, color: Rgb): void {
    const entries = this.cellTypes();
    const index = entries.indexOf(row);
    const copy = [...entries];

    copy[index] = { ...copy[index], color };
    this.cellTypes.set(copy);
  }

  /** Reset sort state to default */
  resetSort(): void {
    const sorter = this.sort();
    const sortable = sorter.sortables.get('count');
    if (sortable) {
      do {
        sorter.sort(sortable);
      } while (sorter.direction !== 'desc');
    }
  }

  /** Hides/shows cell link data */
  toggleLinksColumn(): void {
    this.hideCellLinkData.set(!this.hideCellLinkData());
  }
}
