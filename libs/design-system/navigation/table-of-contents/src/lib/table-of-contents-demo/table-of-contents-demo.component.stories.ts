import { Meta, StoryObj } from '@storybook/angular';

import { TableOfContentsDemoComponent } from './table-of-contents-demo.component';

const meta: Meta<TableOfContentsDemoComponent> = {
  component: TableOfContentsDemoComponent,
  title: 'Design System/Navigation/Table of Contents/Table of Contents Demo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7632-22566&t=hb4zN0Dq78X9iuuM-4',
    },
  },
};

export default meta;
type Story = StoryObj<TableOfContentsDemoComponent>;

export const Primary: Story = {};
