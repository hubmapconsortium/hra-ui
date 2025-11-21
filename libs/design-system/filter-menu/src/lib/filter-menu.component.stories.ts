import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { FilterMenuComponent, FilterOptionCategory } from './filter-menu.component';

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
  title: 'Design System/Filter Menu',
  decorators: [
    moduleMetadata({
      imports: [FilterMenuComponent],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4929-40164',
    },
  },
  args: {
    tagline: 'Database Headline',
    description: 'Supporting text here, if needed, but make it short and straightforward',
    enableClose: true,
    filters: FILTER_CATEGORIES,
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-filter-menu
        [filters]="filters"
        [tagline]="tagline"
        [description]="description"
        [enableClose]="enableClose">
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
