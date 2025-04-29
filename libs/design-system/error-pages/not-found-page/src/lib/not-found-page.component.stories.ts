import { type Meta, type StoryObj } from '@storybook/angular';
import { NotFoundPageComponent } from './not-found-page.component';

const meta: Meta = {
  title: 'Design System/Error Pages/Not Found Page',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3287-71',
    },
  },
  component: NotFoundPageComponent,
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
