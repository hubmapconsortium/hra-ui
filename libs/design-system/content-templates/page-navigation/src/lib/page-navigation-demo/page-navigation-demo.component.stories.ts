import { Meta, StoryObj } from '@storybook/angular';

import { PageNavigationDemoComponent } from './page-navigation-demo.component';

const meta: Meta<PageNavigationDemoComponent> = {
  component: PageNavigationDemoComponent,
  title: 'Design System/Content Templates/PageNavigation',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7632-22566&t=hb4zN0Dq78X9iuuM-4',
    },
  },
};

export default meta;
type Story = StoryObj<PageNavigationDemoComponent>;

export const Primary: Story = {};
