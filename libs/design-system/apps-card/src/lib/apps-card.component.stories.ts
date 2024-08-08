import { AppsCardComponent } from './apps-card.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<AppsCardComponent> = {
  component: AppsCardComponent,
  title: 'AppsCardComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=78-355',
    },
  },
};
export default meta;
type Story = StoryObj<AppsCardComponent>;

export const Primary: Story = {
  args: {},
};
