import { type Meta, type StoryObj } from '@storybook/angular';
import { ResultsIndicatorComponent } from './results-indicator.component';

const meta: Meta<ResultsIndicatorComponent> = {
  component: ResultsIndicatorComponent,
  title: 'Design System/Indicators/Results Indicator',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2100-10720&t=DmEBvTGkDSWCMOf1-4',
    },
  },
};
export default meta;
type Story = StoryObj<ResultsIndicatorComponent>;

export const Default: Story = {};
