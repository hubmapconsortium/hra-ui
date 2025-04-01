import { Meta, StoryObj } from '@storybook/angular';

import { DataViewerComponent } from './data-viewer.component';
import { FormControl } from '@angular/forms';

const meta: Meta = {
  component: DataViewerComponent,
  title: 'Design System / Data Viewer',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2579-13698',
    },
  },
  args: { options: [], variant: 'ftu', organControl: new FormControl<string | null>('brain') },
  argTypes: {
    variant: { control: 'select', options: ['ftu', '3d_organ_models'] },
  },
  render: (args) => ({ props: args }),
};
export default meta;
type Story = StoryObj<DataViewerComponent>;

export const Primary: Story = {};
