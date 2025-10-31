import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';

/** Option interface */
export interface Option {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
}

interface TuneMenuOptions {
  hideCloseButton?: boolean;
  hideHeaderSection?: boolean;
  headline?: string;
  subtext?: string;
  hideCustomizeSection?: boolean;
  /** Categories for button toggle */
  toggleCategories?: Option[];
  viewAsOptions?: Option[];
  sortByOptions: Option[];
  groupByOptions: Option[];
}

const TOGGLE_OPTIONS = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
];
const VIEW_AS_OPTIONS = [
  { id: 'table', label: 'Table' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'list', label: 'List' },
];
const SORT_BY_OPTIONS = [
  { id: 'nameAsc', label: 'Name ascending' },
  { id: 'nameDesc', label: 'Name descending' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'newest', label: 'Newest' },
  { id: 'hierachical', label: 'Hierarchical' },
];
const FILTER_CATEGORIES = [
  { id: 'category1', label: 'Category 1' },
  { id: 'category2', label: 'Category 2' },
  { id: 'category3', label: 'Category 3' },
  { id: 'category4', label: 'Category 4' },
  { id: 'category5', label: 'Category 5' },
  { id: 'category6', label: 'Category 6' },
  { id: 'category7', label: 'Category 7' },
  { id: 'category8', label: 'Category 8' },
  { id: 'category9', label: 'Category 9' },
  { id: 'category10', label: 'Category 10' },
];

const DEFAULT_OPTIONS: TuneMenuOptions = {
  headline: 'Database Headline',
  subtext: 'Supporting text here, if needed, but make it short and straightforward',
  toggleCategories: TOGGLE_OPTIONS,
  viewAsOptions: VIEW_AS_OPTIONS,
  sortByOptions: SORT_BY_OPTIONS,
  groupByOptions: FILTER_CATEGORIES,
};

@Component({
  selector: 'hra-tune-menu',
  imports: [
    HraCommonModule,
    ScrollingModule,
    ScrollOverflowFadeDirective,
    ButtonsModule,
    IconsModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './tune-menu.component.html',
  styleUrl: './tune-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closed]': 'formClosed()',
  },
})
export class TuneMenuComponent {
  readonly filterCategories = computed(() => {
    const result: Record<string, FormControl<Option[] | null>> = {};
    for (const category of FILTER_CATEGORIES) {
      result[category.id] = new FormControl<Option[]>([]);
    }
    return result;
  });

  readonly form = computed(() => {
    return new FormGroup({
      customize: new FormGroup({
        toggle: new FormControl<Option | null>(null),
        viewAs: new FormControl<Option | null>(null),
        sortBy: new FormControl<Option | null>(null),
        groupBy: new FormControl<Option | null>(null),
      }),
      filters: new FormGroup(this.filterCategories()),
    });
  });

  readonly formValues = computed<[string, FormControl<Option[] | null>][]>(() =>
    FILTER_CATEGORIES.map((filter) => [filter.label, this.form().controls.filters.controls[filter.id]]),
  );

  readonly menuOptions = input<TuneMenuOptions>(DEFAULT_OPTIONS);

  readonly formClosed = input(false);

  /** Emits when the form opening state is toggled */
  readonly toggleForm = output();

  /** Whether the user is on a wide screen */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  constructor() {
    const toggleCategories = this.menuOptions().toggleCategories;
    if (toggleCategories && toggleCategories.length > 0) {
      this.form().controls.customize.patchValue({ toggle: toggleCategories[0] });
    }
  }
}
