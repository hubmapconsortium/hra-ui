import { Meta, StoryObj } from '@storybook/angular';

import { CopyableUrlContainerComponent } from './copyable-url-container.component';

const meta: Meta<CopyableUrlContainerComponent> = {
  component: CopyableUrlContainerComponent,
  title: 'Design System/Copyable URL Container',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4453-105',
    },
  },
  args: {
    url: 'https://example.com/purl',
  },
};

export default meta;
type Story = StoryObj<CopyableUrlContainerComponent>;

export const Primary: Story = {};
