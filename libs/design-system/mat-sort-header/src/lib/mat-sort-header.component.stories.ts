import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { MatSortHeaderComponent } from './mat-sort-header.component';

const meta: Meta<MatSortHeaderComponent> = {
  component: MatSortHeaderComponent,
  title: 'MatSortHeaderComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=37-63',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<MatSortHeaderComponent>;

export const Default: Story = {
  args: {},
};
