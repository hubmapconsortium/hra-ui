import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { MenuComponent } from './menu.component';

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
};

export default meta;
type Story = StoryObj<MenuComponent>;

export const Primary: Story = {};
