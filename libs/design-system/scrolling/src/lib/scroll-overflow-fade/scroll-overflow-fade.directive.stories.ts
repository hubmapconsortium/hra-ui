import { type Meta, type StoryObj } from '@storybook/angular';
import { utils } from '../scrolling.stories';
import { ScrollOverflowFadeDirective } from './scroll-overflow-fade.directive';

const meta: Meta<ScrollOverflowFadeDirective> = {
  component: ScrollOverflowFadeDirective,
  title: 'ScrollOverflowFade',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=214-1697',
    },
  },
  decorators: [...utils.sharedDecorators],
  render: (args) => ({
    props: args,
    template: `
      <ng-scrollbar hraScrollOverflowFade>
        ${utils.sharedContentTemplate}
      </ng-scrollbar>
    `,
    styles: [...utils.sharedStyles],
  }),
};
export default meta;
type Story = StoryObj<ScrollOverflowFadeDirective>;

export const Primary: Story = {
  args: {},
};
