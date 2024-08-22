import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '@hra-ui/design-system';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';

const meta: Meta<TreeDemoComponent> = {
  component: TreeDemoComponent,
  title: 'Tree',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=786-4',
    },
  },
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<TreeDemoComponent>;

export const Primary: Story = {};
