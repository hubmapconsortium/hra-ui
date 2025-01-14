import { MatIconModule } from '@angular/material/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { provideDesignSystem } from './providers';

const meta: Meta = {
  title: 'UI Images',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const PNGIcons: Story = {
  args: {
    imagePath: 'assets/ui-images/placeholder.png',
  },
  argTypes: {
    imagePath: {
      control: 'select',
      options: [
        'assets/ui-images/api.png',
        'assets/ui-images/asctb_reporter.png',
        'assets/ui-images/CDE.png',
        'assets/ui-images/cell_population_graph.png',
        'assets/ui-images/cell_population_predictor.png',
        'assets/ui-images/dashboard.png',
        'assets/ui-images/eui.png',
        'assets/ui-images/FTU_explorer.png',
        'assets/ui-images/organ_gallery.png',
        'assets/ui-images/rui.png',
        'assets/ui-images/storybook.png',
        'assets/ui-images/tissue_origin_predictor.png',
        'assets/ui-images/web_components.png',
      ],
      description: 'Select image',
    },
  },
  render: (args) => ({
    props: args,
    template: `<img src="${args['imagePath']}"/>`,
  }),
};
