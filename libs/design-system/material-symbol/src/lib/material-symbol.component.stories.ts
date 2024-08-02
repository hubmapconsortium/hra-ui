import { Meta, StoryObj } from '@storybook/angular';

import { ALL_ICONS, MaterialSymbolComponent } from './material-symbol.component';

const meta: Meta<MaterialSymbolComponent> = {
  component: MaterialSymbolComponent,
  title: 'MaterialSymbolComponent',
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ALL_ICONS,
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/Design-System-Repository?node-id=1790-54&t=7pLI9aOEH4FfwISb-4',
    },
  },
};
export default meta;
type Story = StoryObj<MaterialSymbolComponent>;

export const Default: Story = {
  args: {
    icon: 'search',
  },
};

export const Small: Story = {
  args: {
    icon: 'search',
    small: true,
  },
};
