import { Meta, StoryObj } from '@storybook/angular';
import { HUBMAP_MENU } from '../static-data/parsed';
import { HubmapMenuContentComponent } from './hubmap-menu-content.component';

const meta: Meta<HubmapMenuContentComponent> = {
  component: HubmapMenuContentComponent,
  title: 'Design System/Navigation/HeaderHubmapMenuContent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1250-3211',
    },
  },
  args: {
    menu: HUBMAP_MENU,
  },
};

export default meta;
type Story = StoryObj<HubmapMenuContentComponent>;

export const Primary: Story = {};
