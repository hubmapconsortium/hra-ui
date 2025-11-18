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
    resultCount: 2,
  },
  argTypes: {
    resultCount: {
      control: 'number',
      description: 'Number of filtered results to display',
    },
    resultsLabel: {
      control: 'text',
      description: 'Custom label for results count',
    },
    endLabel: {
      control: 'text',
      description: 'Custom label for end message',
    },
  },
};

export default meta;
type Story = StoryObj<EndOfResultsIndicatorComponent>;

export const Default: Story = {
  args: {
    resultCount: 2,
  },
};

export const ManyResults: Story = {
  args: {
    resultCount: 150,
  },
};

export const CustomLabels: Story = {
  args: {
    resultCount: 25,
    resultsLabel: 'Total Found:',
    endLabel: 'No more items to display',
  },
};

export const SingleResult: Story = {
  args: {
    resultCount: 1,
  },
};

export const LargeNumber: Story = {
  args: {
    resultCount: 44102,
  },
};
