import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SearchListOption } from '@hra-ui/design-system/search-list';
import { FilterMenuComponent, FilterOptionCategory } from './filter-menu.component';

const FILTER_OPTIONS = [
  { id: 'a', label: 'A', count: 9999 },
  { id: 'ab', label: 'AB', count: 4299 },
  { id: 'abc', label: 'ABC', count: 1799 },
  { id: 'abcd', label: 'ABCD', count: 899 },
  { id: 'abcde', label: 'ABCDE', count: 499 },
  { id: 'abcdef', label: 'ABCDEF', count: 299 },
  { id: 'abcdefg', label: 'ABCDEFG', count: 199 },
  { id: 'abcdefgh', label: 'BACDEFGH', count: 99 },
] as SearchListOption[];

const FILTER_CATEGORIES = [
  { id: 'category1', label: 'Category 1', options: FILTER_OPTIONS },
  { id: 'category2', label: 'Category 2', options: FILTER_OPTIONS },
  { id: 'category3', label: 'Category 3', options: FILTER_OPTIONS },
  { id: 'category4', label: 'Category 4', options: FILTER_OPTIONS },
  { id: 'category5', label: 'Category 5', options: FILTER_OPTIONS },
  { id: 'category6', label: 'Category 6', options: FILTER_OPTIONS },
  { id: 'category7', label: 'Category 7', options: FILTER_OPTIONS },
  { id: 'category8', label: 'Category 8', options: FILTER_OPTIONS },
  { id: 'category9', label: 'Category 9', options: FILTER_OPTIONS },
  { id: 'category10', label: 'Category 10', options: FILTER_OPTIONS },
] as FilterOptionCategory<SearchListOption>[];

const KG_FILTER_CATEGORIES = [
  {
    id: 'category1',
    label: 'Digital objects',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 1 tooltip',
      actionText: 'Learn more',
      actionUrl: 'https://example.com',
    },
  },
  {
    id: 'category2',
    label: 'HRA release version',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 2 tooltip',
    },
  },
  {
    id: 'category3',
    label: 'Organs',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 3 tooltip',
    },
  },
  {
    id: 'category4',
    label: 'Anatomical structures',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 4 tooltip',
    },
  },
  {
    id: 'category5',
    label: 'Cell types',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 5 tooltip',
    },
  },
  {
    id: 'category6',
    label: 'Biomarkers',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 6 tooltip',
    },
  },
  {
    id: 'category7',
    label: 'Creators',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 7 tooltip',
    },
  },
  {
    id: 'category8',
    label: 'Reviewers',
    options: FILTER_OPTIONS,
    tooltip: {
      description: 'This is the Category 8 tooltip',
    },
  },
] as FilterOptionCategory<SearchListOption>[];

const CUSTOM_CONTROLS = `
<mat-button-toggle-group class="toggle-group" [value]="toggleOptions[0]">
  @for (category of toggleOptions; track category.id) {
    <mat-button-toggle hraClickEvent [hraFeature]="category.id" [value]="category">
      {{ category.label }}
    </mat-button-toggle>
  }
</mat-button-toggle-group>

<mat-form-field subscriptSizing="dynamic">
  <hra-icon class="select-icon" matPrefix>table_view</hra-icon>
  <mat-label>View as</mat-label>
  <mat-select>
    @for (option of viewAsOptions; track option) {
      <mat-option [value]="option.id">{{ option.label }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<mat-form-field subscriptSizing="dynamic">
  <hra-icon class="select-icon" matPrefix>sort</hra-icon>
  <mat-label>Sort by</mat-label>
  <mat-select>
    @for (option of sortByOptions; track option) {
      <mat-option [value]="option.id">{{ option.label }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<mat-form-field subscriptSizing="dynamic">
  <hra-icon class="select-icon" matPrefix>category</hra-icon>
  <mat-label>Group by</mat-label>
  <mat-select>
    @for (option of filters; track option) {
      <mat-option [value]="option.id">{{ option.label }}</mat-option>
    }
  </mat-select>
</mat-form-field>
`;

const STYLES = `
  .hra-app {
    height: 100vh;
  }
  .toggle-group {
    width: fit-content;
    max-width: 100%;
    --mat-button-toggle-height: 2rem;
  }
  mat-button-toggle {
      font: var(--mat-sys-label-medium);
  }
  mat-label {
    font: var(--mat-sys-label-medium);
    --mat-form-field-filled-label-text-color: var(--mat-sys-primary);
  }
  .select-icon {
    padding-left: 0.75rem;
    padding-right: 0.5rem;
    --mat-form-field-leading-icon-color: var(--mat-sys-secondary);
  }
`;

const meta: Meta = {
  title: 'Design System/Filter Menu',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4929-40164',
    },
    layout: 'fullscreen',
  },
  args: {
    tagline: 'Database Headline',
    description: 'Supporting text here, if needed, but make it short and straightforward',
    enableClose: true,
    enableCollapse: false,
    enableTotalCount: false,
    filters: FILTER_CATEGORIES,
    toggleOptions: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' },
    ],
    viewAsOptions: [
      { id: 'table', label: 'Table' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'list', label: 'List' },
    ],
    sortByOptions: [
      { id: 'nameAsc', label: 'Name ascending' },
      { id: 'nameDesc', label: 'Name descending' },
      { id: 'oldest', label: 'Oldest' },
      { id: 'newest', label: 'Newest' },
      { id: 'hierachical', label: 'Hierarchical' },
    ],
  },
  decorators: [
    moduleMetadata({
      imports: [
        HraCommonModule,
        FilterMenuComponent,
        MatButtonToggleModule,
        MatFormFieldModule,
        IconsModule,
        MatSelectModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    enableTotalCount: true,
  },

  render: (args) => ({
    props: args,
    template: `
      <hra-filter-menu
        [filters]="filters"
        [tagline]="tagline"
        [description]="description"
        [enableClose]="enableClose"
        [enableCollapse]="enableCollapse"
        [enableTotalCount]="enableTotalCount"
      >
        ${CUSTOM_CONTROLS}
      </hra-filter-menu>
    `,
    styles: [STYLES],
  }),
};

export const WithoutCustomizeControls: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hra-filter-menu
        [filters]="filters"
        [tagline]="tagline"
        [description]="description"
        [enableClose]="enableClose"
      />
    `,
    styles: [STYLES],
  }),
};

export const KnowledgeGraphFilterMenu: Story = {
  args: {
    tagline: undefined,
    description: undefined,
    enableClose: false,
    enableCollapse: true,
    filters: KG_FILTER_CATEGORIES,
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-filter-menu
        [filters]="filters"
        [tagline]="tagline"
        [description]="description"
        [enableClose]="enableClose"
        [enableCollapse]="enableCollapse"
      />
    `,
    styles: [STYLES],
  }),
};
