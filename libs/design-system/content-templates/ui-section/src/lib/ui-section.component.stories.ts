import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { UiSectionComponent } from './ui-section.component';

const meta: Meta = {
  title: 'Design System/Content Templates/UI Section',
  component: UiSectionComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7423-36664&t=XQjIQdoF1DfLp4gr-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<UiSectionComponent>;

export const Default: Story = {
  args: {
    tagline: 'Product Name',
    description: 'Placeholder short description for text less than 125 characters.',
    logo: 'apps',
    appStatus: 'Preview',
    imagePath: 'assets/ui-images/placeholder.png',
  },
  argTypes: {
    imagePath: {
      control: 'select',
      options: [
        'assets/ui-images/api.png',
        'assets/ui-images/asctb_reporter.png',
        'assets/ui-images/CDE.png',
        'assets/ui-images/cell_population_predictor.png',
        'assets/ui-images/dashboard.png',
        'assets/ui-images/eui.png',
        'assets/ui-images/FTU_explorer.png',
        'assets/ui-images/organ_gallery.png',
        'assets/ui-images/rui.png',
        'assets/ui-images/tissue_origin_predictor.png',
        'assets/ui-images/web_components.png',
      ],
      description: 'Select image',
    },
  },
};
