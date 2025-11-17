import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { FilterMenuComponent, FilterMenuControlsComponent, FilterMenuOption } from './filter-menu.component';
import { FilterMenuCustomizeComponent } from './filter-menu-customize/filter-menu-customize.component';

const TOGGLE_OPTIONS = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
] as FilterMenuOption[];
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
] as FilterMenuOption[];
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
] as FilterMenuOption[];

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
    groupByOptions: FILTER_CATEGORIES,
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
            [sortByOptions]="sortByOptions"
            [groupByOptions]="groupByOptions">
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
