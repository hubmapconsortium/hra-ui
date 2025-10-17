import { type Meta, type StoryObj } from '@storybook/angular';
import { ContentButtonComponent } from './content-button.component';

const meta: Meta<ContentButtonComponent> = {
  title: 'Design System/Cards/Action Card/Content Button',
  component: ContentButtonComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12375-18526&t=RByvD8E755CUPo7v-4',
    },
  },
  args: {
    image: 'assets/ui-images/placeholder.png',
    date: 'September 20, 2025',
    tagline: 'Card tagline that is less than 100 characters or truncated.',
    tags: ['Label', 'Longer label'],
    link: 'https://google.com',
    external: true,
  },
};
export default meta;
type Story = StoryObj<ContentButtonComponent>;

export const Default: Story = {};
