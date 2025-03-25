import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { ProductLogoComponent } from './product-logo.component';

const meta: Meta<ProductLogoComponent> = {
  component: ProductLogoComponent,
  title: 'Design System/Brand/Product Logo',
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
        'organ_gallery',
        'human_atlas_stories',
        'rui',
        'top',
        'web_components',
        '3d_organ_models',
        'cell_type_annotations',
        'collections',
        'dataset_graphs',
        'ftu',
        'graphs',
        'landmark',
        'millitome',
        'omaps',
        'schema',
        'vccf',
        'vocabulary',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
};
