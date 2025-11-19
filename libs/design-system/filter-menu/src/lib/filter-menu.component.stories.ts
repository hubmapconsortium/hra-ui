import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import {
  FilterMenuComponent,
  FilterMenuControlsComponent,
  FilterOptionCategory,
  FilterToggleOption,
} from './filter-menu.component';
import { FilterMenuCustomizeComponent } from './filter-menu-customize/filter-menu-customize.component';

const FILTER_OPTIONS = [
  { id: 'a', label: 'A', count: 9999 },
  { id: 'b', label: 'B', count: 4299 },
  { id: 'c', label: 'C', count: 1799 },
  { id: 'd', label: 'D', count: 899 },
  { id: 'e', label: 'E', count: 499 },
  { id: 'f', label: 'F', count: 299 },
  { id: 'g', label: 'G', count: 199 },
  { id: 'h', label: 'H', count: 99 },
];
const TOGGLE_OPTIONS = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
] as FilterToggleOption[];
const VIEW_AS_OPTIONS = [
  { id: 'table', label: 'Table' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'list', label: 'List' },
] as FilterToggleOption[];
const SORT_BY_OPTIONS = [
  { id: 'nameAsc', label: 'Name ascending' },
  { id: 'nameDesc', label: 'Name descending' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'newest', label: 'Newest' },
  { id: 'hierachical', label: 'Hierarchical' },
] as FilterToggleOption[];
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
] as FilterOptionCategory[];

const meta: Meta = {
  title: 'Design System / Filter Menu',
  decorators: [
    moduleMetadata({
      imports: [FilterMenuComponent, FilterMenuControlsComponent, FilterMenuCustomizeComponent],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12494-166042&t=U6WxS9uCkPILoojn-4',
    },
  },
  args: {
    tagline: 'Database Headline',
    description: 'Supporting text here, if needed, but make it short and straightforward',
    enableClose: true,
    filters: FILTER_CATEGORIES,
    toggleOptions: TOGGLE_OPTIONS,
    viewAsOptions: VIEW_AS_OPTIONS,
    sortByOptions: SORT_BY_OPTIONS,
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-filter-menu [filters]="filters" [tagline]="tagline" [description]="description" [enableClose]="enableClose">
        <hra-filter-menu-controls>
          <hra-filter-menu-customize
            [filters]="filters"
            [toggleOptions]="toggleOptions"
            [viewAsOptions]="viewAsOptions"
            [sortByOptions]="sortByOptions">
          </hra-filter-menu-customize>
        </hra-filter-menu-controls>
      </hra-filter-menu>
    `,
    styles: [
      `.hra-app {
          margin: -1rem;
          height: 100vh;
      }`,
    ],
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    enableClose: true,
  },
};
