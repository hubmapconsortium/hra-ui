import { Meta, StoryObj } from '@storybook/angular';

import * as sampleData from './data-viewer-sample-data.json';
import { DataViewerComponent } from './data-viewer.component';

const meta: Meta<DataViewerComponent> = {
  component: DataViewerComponent,
  title: 'Design System / Data Viewer',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2579-13698',
    },
  },
  args: {
    githubIconsUrl: 'https://github.com/cns-iu/md-icons/tree/main/other-icons/organs',
  },
};
export default meta;
type Story = StoryObj<DataViewerComponent>;

export const FtuDataViewer: Story = {
  args: {
    organVersionData: sampleData.testFtuVersionData,
    variant: 'ftu',
  },
};

export const OrganModelViewer: Story = {
  args: {
    organVersionData: sampleData.testOrganVersionData,
    variant: '3d-organ',
  },
};
