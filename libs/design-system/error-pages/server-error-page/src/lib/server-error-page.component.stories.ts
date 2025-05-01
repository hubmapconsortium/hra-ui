import { type Meta, type StoryObj } from '@storybook/angular';
import { ServerErrorPageComponent } from './server-error-page.component';

const meta: Meta = {
  title: 'Design System/Error Pages/Server Error Page',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3292-4471',
    },
  },
  args: {
    reportIssueLink: '/',
  },
  component: ServerErrorPageComponent,
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
