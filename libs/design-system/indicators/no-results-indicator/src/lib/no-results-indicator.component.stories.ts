import { Meta, StoryObj } from '@storybook/angular';
import { NoResultsIndicatorComponent } from './no-results-indicator.component';

const meta: Meta = {
  component: NoResultsIndicatorComponent,
  title: 'Design System/Indicators/No Results Indicator',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4958-37',
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
