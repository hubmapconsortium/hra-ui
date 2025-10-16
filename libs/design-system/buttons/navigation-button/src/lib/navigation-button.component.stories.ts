import { type Meta, type StoryObj } from '@storybook/angular';
import { NavigationButtonComponent } from './navigation-button.component';

const meta: Meta<NavigationButtonComponent> = {
  component: NavigationButtonComponent,
  title: 'Design System/Buttons/Navigation Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4878-235&p=f',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['cta', 'menu-item'],
    },
  },
  args: {
    label: 'Label text',
    link: '#',
    variant: 'menu-item',
    supportingText: 'Supporting text',
    showLeadingIcon: true,
    showTrailingicon: true,
  },
};
export default meta;
type Story = StoryObj<NavigationButtonComponent>;

export const Default: Story = {};
