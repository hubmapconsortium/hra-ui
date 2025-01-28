import { type Meta, type StoryObj } from '@storybook/angular';

import { DeleteFileButtonComponent } from './delete-file-button.component';

const meta: Meta<DeleteFileButtonComponent> = {
  component: DeleteFileButtonComponent,
  title: 'Design System/Buttons/DeleteFileButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/Explorer-Design-System-Repository?node-id=5676-22770&t=X0D1vCOZyGiIyp9H-4',
    },
  },
  args: {
    fileName: 'test.csv',
  },
  argTypes: {
    fileName: {
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<DeleteFileButtonComponent>;

export const Default: Story = {};
