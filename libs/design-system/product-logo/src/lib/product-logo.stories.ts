import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ProductLogoComponent } from './product-logo.component';

const meta: Meta<ProductLogoComponent> = {
  component: ProductLogoComponent,
  title: 'ProductLogoComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1409-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideIcons()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ProductLogoComponent>;

export const Default: Story = {
  args: {
    name: 'design_system',
    size: 'large',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        '3d_organ_models',
        'api',
        'app_library',
        'asctb_reporter',
        'cde',
        'cell_population_graphs',
        'cpp',
        'dashboards',
        'design_system',
        'dev_portal',
        'eui',
        'ftu',
        'human_atlas_stories',
        'millitome',
        'omaps',
        'organ_gallery',
        'rui',
        'top',
        'vccf',
        'web_components',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
};
