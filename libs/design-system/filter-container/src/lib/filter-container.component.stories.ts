import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { FilterContainerComponent, FilterChip, RichTooltipConfig } from './filter-container.component';

const meta: Meta<FilterContainerComponent> = {
  component: FilterContainerComponent,
  title: 'Design System/Filter Container',
  decorators: [
    applicationConfig({
      providers: [],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4896-3821&t=iEqgiqNdW1eC3Rpz-4',
    },
  },
  args: {
    action: 'Action',
    enableDivider: false,
  },
  argTypes: {
    action: {
      control: 'text',
      description: 'Tagline for the filter category',
    },
    enableDivider: {
      control: 'boolean',
      description: 'Whether to show a divider below the container',
    },
  },
};

export default meta;
type Story = StoryObj<FilterContainerComponent>;

const sampleChips: FilterChip[] = [{ id: 'Option 1' }, { id: 'Option 2' }, { id: 'Option 3' }];

const sampleTooltip: RichTooltipConfig = {
  description: 'This filter allows you to refine your search by selecting specific options from the available choices.',
  actionText: 'Learn more',
  actionUrl: 'https://example.com',
};

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<hra-filter-container [action]="action" [enableDivider]="enableDivider" />`,
  }),
};

export const WithInfoButton: Story = {
  render: (args) => ({
    props: { ...args, tooltip: sampleTooltip },
    template: `<hra-filter-container [action]="action" [tooltip]="tooltip" [enableDivider]="enableDivider" />`,
  }),
};

export const WithChipsAndInfo: Story = {
  render: (args) => ({
    props: { ...args, tooltip: sampleTooltip, chips: sampleChips },
    template: `<hra-filter-container [action]="action" [tooltip]="tooltip" [chips]="chips" [enableDivider]="enableDivider" />`,
  }),
  args: {
    action: 'Category',
  },
};

export const WithDivider: Story = {
  render: (args) => ({
    props: { ...args, tooltip: sampleTooltip, chips: sampleChips },
    template: `<hra-filter-container [action]="action" [tooltip]="tooltip" [chips]="chips" [enableDivider]="enableDivider" />`,
  }),
  args: {
    action: 'Category',
    enableDivider: true,
  },
};
