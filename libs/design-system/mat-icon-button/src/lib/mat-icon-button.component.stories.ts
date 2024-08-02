import type { Meta, StoryObj } from '@storybook/angular';
import { MatIconButtonComponent } from './mat-icon-button.component';

const meta: Meta<MatIconButtonComponent> = {
  component: MatIconButtonComponent,
  title: 'MatIconButtonComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=24-876',
    },
  },
};
export default meta;
type Story = StoryObj<MatIconButtonComponent>;

export const Default: Story = {};
