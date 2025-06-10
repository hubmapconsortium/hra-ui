import { Meta, StoryObj } from '@storybook/angular';

import { ApiCommandComponent } from './api-command.component';

const meta: Meta<ApiCommandComponent> = {
  component: ApiCommandComponent,
  title: 'Design System/Content Templates/API Command',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3690-4',
    },
  },
};

export default meta;
type Story = StoryObj<ApiCommandComponent>;

export const Get: Story = {
  args: {
    request: 'https://apps.humanatlas.io/api/hra-pop/supported-organs',
    method: 'GET',
    rightButton: {
      icon: 'api',
      label: 'Try me',
      url: 'https://apps.humanatlas.io/api/#get-/hra-pop/supported-organs',
    },
  },
};

export const Post: Story = {
  args: {
    request: 'https://apps.humanatlas.io/api/hra-pop/cell-summary-report',
    method: 'POST',
    rightButton: {
      icon: 'api',
      label: 'Try me',
      url: 'https://apps.humanatlas.io/api/#post-/hra-pop/cell-summary-report',
    },
  },
};
