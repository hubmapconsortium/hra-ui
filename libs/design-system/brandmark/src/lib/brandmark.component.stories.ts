import { provideHttpClient } from '@angular/common/http';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { BrandmarkComponent } from './brandmark.component';

const meta: Meta<BrandmarkComponent> = {
  component: BrandmarkComponent,
  title: 'Design System/Brand/Brandmark',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=82-776',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
};
export default meta;
type Story = StoryObj<BrandmarkComponent>;

export const Default: Story = {};

export const Contrast: Story = {
  args: {
    contrast: true,
  },
};
