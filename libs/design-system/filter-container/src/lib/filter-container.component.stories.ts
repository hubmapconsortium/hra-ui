import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { FilterContainerComponent, FilterChip } from './filter-container.component';

const meta: Meta<FilterContainerComponent> = {
  component: FilterContainerComponent,
  title: 'Design System/Filter Container',
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule],
    }),
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
  },
};

export default meta;
type Story = StoryObj<FilterContainerComponent>;

const sampleChips: FilterChip[] = [{ id: 'Option 1' }, { id: 'Option 2' }, { id: 'Option 3' }];

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<hra-filter-container [action]="action" [enableDivider]="enableDivider" />`,
  }),
};

export const WithInfoButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hra-filter-container [action]="action" [showTooltip]="true" [enableDivider]="enableDivider">
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
      <hra-filter-container [action]="action" [showTooltip]="true" [chips]="chips" [enableDivider]="enableDivider">
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
      <hra-filter-container [action]="action" [showTooltip]="true" [chips]="chips" [enableDivider]="enableDivider">
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
