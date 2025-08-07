import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideDesignSystem } from './providers';

const meta: Meta = {
  title: 'Design System/Assets',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj;

// PNG IMAGES
const imageOptions = {
  API: 'assets/ui-images/api.png',
  ASCTB_Reporter: 'assets/ui-images/asctb-reporter.png',
  CDE: 'assets/ui-images/CDE.png',
  Cell_Population_Graphs: 'assets/ui-images/cell_population_graph.png',
  Cell_Population_Prdictor: 'assets/ui-images/cell_population_predictor.png',
  Dashboard: 'assets/ui-images/dashboard.png',
  EUI: 'assets/ui-images/eui.png',
  FTU_Explorer: 'assets/ui-images/FTU_explorer.png',
  Organ_Gallery: 'assets/ui-images/organ_gallery.png',
  RUI: 'assets/ui-images/rui.png',
  Storybook: 'assets/ui-images/storybook.png',
  Tissue_Origin_Predictor: 'assets/ui-images/tissue_origin_predictor.png',
  Web_Components: 'assets/ui-images/web_components.png',
};

export const Images: Story = {
  args: {
    image: imageOptions.API,
  },
  argTypes: {
    image: {
      control: 'select',
      options: Object.keys(imageOptions),
      mapping: imageOptions,
      description: 'Select image',
    },
  },
  render: (args) => ({
    props: args,
    template: `<img class="img" src="{{ image }}" />`,
    styles: [`.img { height: 23.5rem; width: 39rem; }`],
  }),
};

// PARTNER LOGOS
const partnerLogos = {
  Hubmap_Consortium: 'assets/logo/hubmap.svg',
  Hubmap_Data_Portal: 'assets/logo/data_portal.svg',
  Azimuth: 'assets/logo/azimuth.svg',
  Fusion: 'assets/logo/fusion.svg',
  Antibody_Validation_Reports: 'assets/logo/antibody-validation-reports.svg',
  SenNet: 'assets/logo/sennet.svg',
  KPMP: 'assets/icons/KPMP.svg',
  HuBMap: 'assets/logo/hubmap_large.svg',
  GUDMAP: 'assets/logo/gudmap.svg',
  GTEx: 'assets/logo/gtex.svg',
};

export const PartnerLogos: Story = {
  args: {
    logo: partnerLogos.Hubmap_Consortium,
  },
  argTypes: {
    logo: {
      control: 'select',
      options: Object.keys(partnerLogos),
      mapping: partnerLogos,
      description: 'Select logo',
    },
  },
  render: (args) => ({
    props: args,
    template: `<img class="img" src="{{ logo }}" />`,
  }),
};

// Funder Logos
export const FunderLogos: Story = {
  args: {
    logo: 'assets/logo/nih.svg',
  },
  argTypes: {
    logo: {
      control: 'select',
      options: ['NIH', 'ADA', 'IU', 'CIFAR'],
      mapping: {
        NIH: 'assets/logo/nih.svg',
        ADA: 'assets/logo/ada.svg',
        IU: 'assets/logo/iu.svg',
        CIFAR: 'assets/logo/cifar.svg',
      },
      description: 'Select logo',
    },
  },
  render: (args) => ({
    props: args,
    template: `<img class="img" src="${args['logo']}"/>`,
    styles: [`.img { height: 3rem; width: 3rem; }`],
  }),
};
