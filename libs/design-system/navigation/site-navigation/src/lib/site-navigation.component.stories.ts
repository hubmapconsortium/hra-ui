import { Meta, StoryObj } from '@storybook/angular';
import { SiteNavigationComponent } from './site-navigation.component';
import { DOCS_NAVIGATION_MENU } from './static-data/parsed';

const meta: Meta<SiteNavigationComponent> = {
  component: SiteNavigationComponent,
  title: 'Design System/Navigation/Site Navigation',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3376-12978',
    },
  },
  args: {
    navigationMenu: DOCS_NAVIGATION_MENU,
  },
};

export default meta;
type Story = StoryObj<SiteNavigationComponent>;

export const Primary: Story = {
  args: {},
};
