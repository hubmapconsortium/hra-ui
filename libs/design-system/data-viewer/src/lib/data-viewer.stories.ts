import { Meta, StoryObj } from '@storybook/angular';

import { DataViewerComponent } from './data-viewer.component';

const meta: Meta = {
  component: DataViewerComponent,
  title: 'Design System / Data Viewer',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2579-13698',
    },
  },
  args: { options: [], variant: 'ftu' },
  argTypes: {
    variant: { control: 'select', options: ['ftu', 'organs'] },
  },
  render: (args) => ({ props: args }),
};
export default meta;
type Story = StoryObj<DataViewerComponent>;

export const Primary: Story = {
  args: {
    variant: 'ftu',
  },
};
