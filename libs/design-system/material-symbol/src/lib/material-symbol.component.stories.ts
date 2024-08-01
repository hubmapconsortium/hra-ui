import { Meta, StoryObj } from '@storybook/angular';

import { MaterialSymbolComponent } from './material-symbol.component';

const meta: Meta<MaterialSymbolComponent> = {
  component: MaterialSymbolComponent,
  title: 'MaterialSymbolComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/Design-System-Repository?node-id=1790-54&t=7pLI9aOEH4FfwISb-4',
    },
  },
};
export default meta;
type Story = StoryObj<MaterialSymbolComponent>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    small: true,
  },
};
