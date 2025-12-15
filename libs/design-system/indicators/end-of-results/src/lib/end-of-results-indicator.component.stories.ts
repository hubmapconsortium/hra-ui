import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { EndOfResultsIndicatorComponent } from './end-of-results-indicator.component';

const meta: Meta<EndOfResultsIndicatorComponent> = {
  component: EndOfResultsIndicatorComponent,
  title: 'Design System/Indicators/End of Results',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  args: {
    count: 2,
  },
  argTypes: {
    count: {
      control: 'number',
      description: 'Number of filtered results to display',
    },
    label: {
      control: 'text',
      description: 'Custom label for results count',
    },
    description: {
      control: 'text',
      description: 'Custom label for end message',
    },
  },
};

export default meta;
type Story = StoryObj<EndOfResultsIndicatorComponent>;

export const Default: Story = {
  args: {
    count: 2,
  },
};

export const ManyResults: Story = {
  args: {
    count: 150,
  },
};

export const CustomLabels: Story = {
  args: {
    count: 25,
    label: 'Total Found:',
    description: 'No more items to display',
  },
};

export const SingleResult: Story = {
  args: {
    count: 1,
  },
};

export const LargeNumber: Story = {
  args: {
    count: 44102,
  },
};
