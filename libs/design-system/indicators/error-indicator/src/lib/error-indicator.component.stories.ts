import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '../../../../src';
import { ErrorIndicatorComponent } from './error-indicator.component';

const meta: Meta = {
  component: ErrorIndicatorComponent,
  title: 'Design System/Indicators/Error Indicator',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Explorer-Components?node-id=1294-4977',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
  argTypes: {
    errors: {
      control: 'object',
      description: 'List of errors to be shown in the indicator',
    },
    actionLink: {
      control: 'text',
      description: 'Call to action link',
    },
    actionLinkLabel: {
      control: 'text',
      description: 'Call to action link label',
    },
  },
};
export default meta;
type Story = StoryObj;

export const SingleError: Story = {
  args: {
    errors: ['Please upload a dataset.'],
  },
};

export const MultipleErrors: Story = {
  args: {
    errors: ['Required columns missing: Column Name, Column Name', 'Please upload a file with all required columns.'],
  },
};

export const WithLink: Story = {
  args: {
    errors: ['Unexpected Error Occurred. Please contact support.'],
    actionLink: 'https://example.com',
    actionLinkLabel: 'Submit a ticket',
  },
};
