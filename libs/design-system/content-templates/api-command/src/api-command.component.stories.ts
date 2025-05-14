import { Meta, StoryObj } from '@storybook/angular';

import { APICommandComponent } from './api-command.component';

const meta: Meta<APICommandComponent> = {
  component: APICommandComponent,
  title: 'Design System/API Command',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3690-4',
    },
  },
};

export default meta;
type Story = StoryObj<APICommandComponent>;

export const Get: Story = {
  args: {
    url: 'https://apps.humanatlas.io/api/hra-pop/supported-organs',
    function: 'GET',
    leftButton: {
      icon: 'content_copy',
      label: 'Copy',
    },
    rightButton: {
      icon: 'api',
      label: 'Try me',
      url: 'https://apps.humanatlas.io/api/#get-/hra-pop/supported-organs',
    },
  },
};

export const Post: Story = {
  args: {
    url: 'https://apps.humanatlas.io/api/hra-pop/cell-summary-report',
    function: 'POST',
    leftButton: {
      icon: 'content_copy',
      label: 'Copy',
    },
    rightButton: {
      icon: 'api',
      label: 'Try me',
      url: 'https://apps.humanatlas.io/api/#post-/hra-pop/cell-summary-report',
    },
  },
};
