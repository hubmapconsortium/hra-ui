import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { provideDesignSystem } from './providers';

const meta: Meta = {
  title: 'StepIndicator',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const StepIndicator: Story = {
  args: {
    value: 1,
  },
  argTypes: {
    value: {
      type: 'number',
      description: 'Number',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <span class="step-number">${args['value']}</span>
    `,
    styles: [
      `.step-number {
        display: flex;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        background-color: var(--sys-inverse-surface);
        color: var(--sys-on-primary);
        font: var(--sys-label-large);
        letter-spacing: var(--sys-label-large-tracking);
      }`,
    ],
  }),
};
