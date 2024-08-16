import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { MenuComponent, MenuOption } from './menu.component';

const exampleOptions: MenuOption[] = [
  {
    title: 'Downloads',
    icon: 'download',
    expandedOptions: [
      {
        title: 'Cells CSV',
        icon: 'download',
      },
      {
        title: 'Cell Links CSV',
        icon: 'download',
      },
      {
        title: 'Cells & Cell Links ZIP',
        icon: 'download',
      },
      {
        title: 'Color Map CSV',
        icon: 'download',
      },
      {
        title: 'Help',
        icon: 'info',
      },
    ],
  },
  {
    title: 'Full Screen',
    icon: 'fullscreen',
  },
  {
    title: 'Hide Cell Links',
    icon: 'visibility_off',
  },
  {
    title: 'Embed App',
    icon: 'code',
  },
  {
    title: 'Help',
    icon: 'info',
  },
];

const meta: Meta = {
  component: MenuComponent,
  title: 'MenuComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=619-1552',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideDesignSystem()],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    size: 'medium',
    menuOptions: exampleOptions,
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

export const Primary: Story = {};
