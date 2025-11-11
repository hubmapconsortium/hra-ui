import { type Meta, type StoryObj } from '@storybook/angular';
import { ArchivedPageComponent } from './archived-page.component';

const meta: Meta<ArchivedPageComponent> = {
  title: 'Design System/Error Pages/Archived Page',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4035-4',
    },
  },
  component: ArchivedPageComponent,
};
export default meta;
type Story = StoryObj<ArchivedPageComponent>;

export const Default: Story = {
  args: {
    archivedPath: 'archived-page',
  },
};
