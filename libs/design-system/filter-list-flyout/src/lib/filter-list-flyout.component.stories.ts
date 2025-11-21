import { type Meta, type StoryObj } from '@storybook/angular';

import { FilterListFlyoutComponent, FilterMenuOption } from './filter-list-flyout.component';

const FILTER_OPTIONS = [
  { id: 'a', label: 'A', count: 9999 },
  { id: 'ab', label: 'AB', count: 4299 },
  { id: 'abc', label: 'ABC', count: 1799 },
  { id: 'abcd', label: 'ABCD', count: 899 },
  { id: 'abcde', label: 'ABCDE', count: 499 },
  { id: 'abcdef', label: 'ABCDEF', count: 299 },
  { id: 'abcdefg', label: 'ABCDEFG', count: 199 },
  { id: 'abcdefgh', label: 'BACDEFGH', count: 99 },
] as FilterMenuOption[];

const FILTER_OPTIONS_MULTI = [
  { id: 'a', label: 'A', secondaryLabel: 'short description', count: 9999 },
  { id: 'ab', label: 'AB', secondaryLabel: 'short description', count: 4299 },
  { id: 'abc', label: 'ABC', secondaryLabel: 'short description', count: 1799 },
  { id: 'abcd', label: 'ABCD', secondaryLabel: 'short description', count: 899 },
  { id: 'abcde', label: 'ABCDE', secondaryLabel: 'short description', count: 499 },
  { id: 'abcdef', label: 'ABCDEF', secondaryLabel: 'short description', count: 299 },
  { id: 'abcdefg', label: 'ABCDEFG', secondaryLabel: 'short description', count: 199 },
  { id: 'abcdefgh', label: 'BACDEFGH', secondaryLabel: 'short description', count: 99 },
] as FilterMenuOption[];

const meta: Meta<FilterListFlyoutComponent> = {
  component: FilterListFlyoutComponent,
  title: 'Design System / Filter List Flyout',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12492-44301&t=P7zcWFRIyuDoIlRW-4',
    },
  },
  args: {
    currentFilters: ['a', 'abc', 'abcde'],
    showSearch: true,
    disableRipple: false,
  },
};

export default meta;
type Story = StoryObj<FilterListFlyoutComponent>;

export const Default: Story = {
  args: {
    filterOptions: FILTER_OPTIONS,
  },
};

export const MultiLine: Story = {
  args: {
    filterOptions: FILTER_OPTIONS_MULTI,
  },
};
