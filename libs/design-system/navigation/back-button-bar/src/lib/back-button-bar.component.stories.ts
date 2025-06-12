import { Meta, StoryObj } from '@storybook/angular';
import { BackButtonBarComponent } from './back-button-bar.component';

const meta: Meta<BackButtonBarComponent> = {
  component: BackButtonBarComponent,
  title: 'Design System/Navigation/BackButtonBar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1819-14983',
    },
  },
};

export default meta;
type Story = StoryObj<BackButtonBarComponent>;

export const Primary: Story = {
  args: {},
};
