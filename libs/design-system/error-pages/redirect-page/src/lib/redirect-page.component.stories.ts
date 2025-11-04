import { type Meta, type StoryObj } from '@storybook/angular';
import { RedirectPageComponent } from './redirect-page.component';

const meta: Meta<RedirectPageComponent> = {
  title: 'Design System/Error Pages/Redirect Page',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4035-4',
    },
  },
  component: RedirectPageComponent,
};
export default meta;
type Story = StoryObj<RedirectPageComponent>;

export const Default: Story = {
  args: {
    redirectUrl: 'https://docs.humanatlas.io/apps',
  },
};
