import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatListOption, MatSelectionList } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Store } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { UpdateConfig } from '../../actions/sheet.actions';
import { DiscrepencyId, DiscrepencyLabel, DoSearch, DuplicateId } from '../../actions/tree.actions';
import { CloseSearch, OpenSearch } from '../../actions/ui.actions';
import { GaAction, GaCategory } from '../../models/ga.model';
import { SearchStructure } from '../../models/tree.model';
import { SheetState } from '../../store/sheet.state';
import { TreeState } from '../../store/tree.state';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    NgxMatSelectSearchModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    A11yModule,
    ButtonsModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private readonly store = inject(Store);
  private readonly ga = inject(GoogleAnalyticsService);
  private readonly elementRef = inject(ElementRef);

  @Input() disabled = false;

  private readonly multiSelect = viewChild<MatSelectionList>('multiSelect');

  private readonly treeData = this.store.selectSignal(TreeState.getTreeData);
  private readonly bimodal = this.store.selectSignal(TreeState.getBimodal);
  private readonly structures = computed(() => {
    const ids = new Set<number>();
    const items: SearchStructure[] = [];

    for (const node of this.treeData()) {
      if (node.children > 0 && !ids.has(node.id)) {
        ids.add(node.id);
        items.push({ ...node, groupName: 'Anatomical Structures' });
      }
    }

    for (const node of this.bimodal().nodes) {
      if (!ids.has(node.id)) {
        ids.add(node.id);
        items.push(node);
      }
    }

    return items;
  });

  protected readonly searchValue = signal('');
  protected readonly categories = signal<string[]>([]);
  protected readonly filteredStructures = computed(() => {
    const structures = this.structures();
    const searchValue = this.searchValue().toLowerCase();
    const categories = this.categories();
    let filtered = structures;

    if (categories.length > 0) {
      filtered = filtered.filter((struct) => categories.includes(struct.groupName));
    }
    if (searchValue) {
      filtered = filtered.filter((struct) => struct.name.toLowerCase().includes(searchValue));
    }

    return filtered;
  });

  protected readonly selection = signal<SearchStructure[]>([]);
  protected readonly selectionSet = computed(() => new Set(this.selection()));
  protected readonly selectionLabel = computed(() => {
    return this.selection()
      .map((struct) => struct.name)
      .join(', ');
  });
  protected readonly selectionCompareFunction = (o1: SearchStructure, o2: SearchStructure) => o1.id === o2.id;

  protected readonly searchOpen = signal(false);

  constructor() {
    // On tree selection, reset the selected options and structures array
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.searchValue.set('');
          this.categories.set([]);
          this.selection.set([]);
        }
      });
  }

  toggleOption(option: MatListOption): void {
    const struct = option.value as SearchStructure;
    const selected = option.selected;
    this.selection.update((values) => {
      if (selected) {
        return [...values, struct];
      }
      return values.filter((value) => value !== struct);
    });

    // Toggling the Discrepency fields to off
    const config = this.store.selectSnapshot(SheetState.getSheetConfig);
    this.store.dispatch(
      new UpdateConfig({
        ...config,
        discrepencyId: false,
        discrepencyLabel: false,
        duplicateId: false,
      }),
    );

    // Dispatch the search data to the tree store
    this.store.dispatch(new DoSearch(this.selection(), struct));

    // Clearing Discrepency fields so that searched options can appear
    this.store.dispatch(new DiscrepencyLabel([]));
    this.store.dispatch(new DiscrepencyId([]));
    this.store.dispatch(new DuplicateId([]));

    this.ga.event(GaAction.CLICK, GaCategory.NAVBAR, 'Select/Deselect Search Filters');
  }

  deselectAllOptions() {
    if (this.selection().length === 0) {
      return;
    }

    this.selection.set([]);
    this.multiSelect()?.deselectAll();
    this.store.dispatch(new DoSearch([], null as unknown as SearchStructure));
    this.ga.event(GaAction.CLICK, GaCategory.NAVBAR, 'Deselect All Search Filters');
  }

  selectAllOptions() {
    const structures = this.structures();
    if (this.selection().length === structures.length) {
      return;
    }

    this.selection.set(structures);
    this.multiSelect()?.selectAll();
    this.store.dispatch(new DoSearch(structures, structures[0]));
    this.ga.event(GaAction.CLICK, GaCategory.NAVBAR, 'Select All Searched Options');
  }

  openSearchList() {
    this.store.dispatch(new OpenSearch());
    this.searchOpen.set(true);
  }

  closeSearchList() {
    if (this.searchOpen()) {
      this.store.dispatch(new CloseSearch());
      this.searchOpen.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutsideSearchList(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.closeSearchList();
    }
  }
}
