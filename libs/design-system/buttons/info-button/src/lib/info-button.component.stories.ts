import { Meta, StoryObj } from '@storybook/angular';
import { InfoButtonComponent } from './info-button.component';

const meta: Meta<InfoButtonComponent> = {
  title: 'Design System/Buttons/Info Button',
  component: InfoButtonComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4763-728&t=yDozZcoDlynGt0D6-1',
    },
  },
};
export default meta;

type Story = StoryObj<InfoButtonComponent>;

export const Simple: Story = {
  name: 'Simple Info Button',
  render: () => ({
    template: `
      <hra-info-button
        richTooltipTagline="Information Title"
        richTooltipDescription="This is a detailed description that appears in the rich tooltip when you click the info button.">
      </hra-info-button>
    `,
  }),
};

export const WithLongDescription: Story = {
  name: 'Info Button with Long Description',
  render: () => ({
    template: `
      <hra-info-button
        richTooltipTagline="Detailed Information"
        richTooltipDescription="This is a much longer description that provides comprehensive information about the feature or data. It demonstrates how the rich tooltip can handle larger amounts of text while maintaining readability and proper formatting.">
      </hra-info-button>
    `,
  }),
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  args: {
    richTooltipTagline: 'Interactive Title',
    richTooltipDescription:
      'Click the info button to see the rich tooltip. Hover to see the plain tooltip. Click outside to close the rich tooltip.',
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-info-button
        [richTooltipTagline]="richTooltipTagline"
        [richTooltipDescription]="richTooltipDescription">
      </hra-info-button>
    `,
  }),
};
