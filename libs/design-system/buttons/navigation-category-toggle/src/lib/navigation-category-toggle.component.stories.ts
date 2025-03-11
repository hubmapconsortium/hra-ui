import { type Meta, type StoryObj } from '@storybook/angular';
import { NavigationCategoryToggleComponent } from './navigation-category-toggle.component';

const meta: Meta<NavigationCategoryToggleComponent> = {
  component: NavigationCategoryToggleComponent,
  title: 'Design System/Buttons/Navigation Category Toggle',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2101-11132',
    },
  },
  render: (args) => ({
    props: args,
    template: `<hra-navigation-category-toggle>Label</hra-navigation-category-toggle>`,
  }),
};
export default meta;
type Story = StoryObj<NavigationCategoryToggleComponent>;

export const Primary: Story = {};
