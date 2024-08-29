import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { provideRouter } from '@angular/router';

const sampleItem = { name: 'Button', route: 'A/B/C' };

const meta: Meta<BreadcrumbsComponent> = {
  component: BreadcrumbsComponent,
  title: 'Breadcrumbs',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=892-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem(), provideRouter([])],
    }),
  ],
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};
export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

export const Short: Story = {
  args: {
    crumbs: [sampleItem, { name: 'Current Page' }],
  },
};

export const Long: Story = {
  args: {
    crumbs: [sampleItem, sampleItem, sampleItem, { name: 'Current Page' }],
  },
};
