import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../../src';
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
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
