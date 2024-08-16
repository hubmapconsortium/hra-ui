import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { MenuComponent, MenuOption } from './menu.component';

const exampleOptions: MenuOption[] = [
  {
    name: 'Downloads',
    icon: 'download',
    expandedOptions: [
      {
        name: 'Cells CSV',
        icon: 'download',
      },
      {
        name: 'Cell Links CSV',
        icon: 'download',
      },
      {
        name: 'Cells & Cell Links ZIP',
        icon: 'download',
      },
      {
        name: 'Color Map CSV',
        icon: 'download',
      },
      {
        name: 'Help',
        icon: 'info',
      },
    ],
  },
  {
    name: 'Full Screen',
    icon: 'fullscreen',
  },
  {
    name: 'Hide Cell Links',
    icon: 'visibility_off',
  },
  {
    name: 'Embed App',
    icon: 'code',
  },
  {
    name: 'Help',
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
