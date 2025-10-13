import { Meta, StoryObj } from '@storybook/angular';
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
  render: (args) => ({
    props: args,
    template: `<hra-navigation-button>Label</hra-navigation-button>`,
  }),
};

export default meta;
type Story = StoryObj<NavigationButtonComponent>;

export const Primary: Story = {};
