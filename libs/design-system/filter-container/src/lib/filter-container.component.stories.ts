import { Meta, StoryObj } from '@storybook/angular';
import { FilterContainerComponent, FilterChip } from './filter-container.component';

const meta: Meta<FilterContainerComponent<FilterChip>> = {
  component: FilterContainerComponent,
  title: 'Design System/Filter Container',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4896-3821&t=iEqgiqNdW1eC3Rpz-4',
    },
  },
  args: {
    action: 'Action',
    enableDivider: false,
    showTooltip: false,
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
    showTooltip: {
      control: 'boolean',
      description: 'Whether to show the info button with tooltip',
    },
    actionClick: {
      action: 'actionClick',
      description: 'Event emitted when the category button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<FilterContainerComponent<FilterChip>>;

const sampleChips: FilterChip[] = [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }];

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<hra-filter-container [action]="action" [enableDivider]="enableDivider" (actionClick)="actionClick($event)" />`,
  }),
};

export const WithInfoButton: Story = {
  render: (args) => ({
    props: args,
    template: `
     <hra-filter-container [action]="action" [showTooltip]="true" [enableDivider]="enableDivider" (actionClick)="actionClick($event)">
       <p tooltipContent>This filter allows you to refine your search by selecting specific options from the available choices.</p>
       <button mat-button color="accent" tooltipActions>
         <a href="https://example.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
           Learn more
         </a>
       </button>
     </hra-filter-container>
   `,
  }),
};

export const WithChipsAndInfo: Story = {
  render: (args) => ({
    props: { ...args, chips: sampleChips },
    template: `
      <hra-filter-container [action]="action" [showTooltip]="true" [chips]="chips" [enableDivider]="enableDivider" (actionClick)="actionClick($event)">
       <p tooltipContent>This filter allows you to refine your search by selecting specific options from the available choices.</p>
       <button mat-button color="accent" tooltipActions>
         <a href="https://example.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
           Learn more
         </a>
       </button>
     </hra-filter-container>
   `,
  }),
  args: {
    action: 'Category',
  },
};

export const WithDivider: Story = {
  render: (args) => ({
    props: { ...args, chips: sampleChips },
    template: `
      <hra-filter-container [action]="action" [showTooltip]="true" [chips]="chips" [enableDivider]="enableDivider" (actionClick)="actionClick($event)">
       <p tooltipContent>This filter allows you to refine your search by selecting specific options from the available choices.</p>
       <button mat-button color="accent" tooltipActions>
         <a href="https://example.com" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
           Learn more
         </a>
       </button>
     </hra-filter-container>
   `,
  }),
  args: {
    action: 'Category',
    enableDivider: true,
  },
};
