import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { provideDesignSystem } from '../../../src/lib/providers';
import { StepIndicatorComponent } from './step-indicator.component';

const meta: Meta<StepIndicatorComponent> = {
  component: StepIndicatorComponent,
  title: 'StepIndicatorComponent',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<StepIndicatorComponent>;

export const StepIndicator: Story = {
  args: {
    value: 1,
  },
};
