import { Meta, StoryObj } from '@storybook/angular';
import { MENUS } from '../static-data/parsed';
import { Menu } from '../types/menus.schema';
import { MenuContentComponent } from './menu-content.component';

const MENUS_BY_LABEL = MENUS.menus.reduce<Record<string, Menu>>((acc, menu) => {
  acc[menu.label] = menu;
  return acc;
}, {});

const meta: Meta<MenuContentComponent> = {
  component: MenuContentComponent,
  title: 'Design System/Navigation/HeaderMenuContent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1250-3211',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['desktop', 'mobile'],
    },
    menu: {
      control: 'select',
      options: Object.keys(MENUS_BY_LABEL),
      mapping: MENUS_BY_LABEL,
    },
  },
  args: {
    variant: 'mobile',
    menu: MENUS.menus[0],
  },
};

export default meta;
type Story = StoryObj<MenuContentComponent>;

export const Primary: Story = {};
