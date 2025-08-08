import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta = {
  title: 'Design System/Icons',
  decorators: [
    moduleMetadata({
      imports: [IconComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const FontIcons: Story = {
  args: {
    name: 'search',
  },
  argTypes: {
    name: {
      type: 'string',
      description: 'Icon name',
    },
  },
  render: (args) => ({
    props: args,
    template: `<hra-icon [fontIcon]="name"></hra-icon>`,
  }),
};

export const MiscIcons: Story = {
  args: {
    name: 'misc:biomarker',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'misc:biomarker',
        'misc:cell-type',
        'misc:contribute',
        'misc:data',
        'misc:experts',
        'misc:explore',
        'misc:publications',
        'misc:training',
      ],
      description: 'Icon name',
    },
  },
  render: (args) => ({
    props: args,
    template: `<hra-icon [svgIcon]="name"></hra-icon>`,
  }),
};

export const OrganIcons: Story = {
  args: {
    name: 'organ:bladder',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'organ:all_organs',
        'organ:bladder',
        'organ:blood',
        'organ:bone_marrow',
        'organ:brain',
        'organ:breast',
        'organ:eye',
        'organ:fallopian_tube_left',
        'organ:fallopian_tube_right',
        'organ:heart',
        'organ:kidney_left',
        'organ:kidney_right',
        'organ:kidneys',
        'organ:knee',
        'organ:large_intestine',
        'organ:liver',
        'organ:lung_left',
        'organ:lung_right',
        'organ:lungs',
        'organ:lymph_nodes',
        'organ:neurons',
        'organ:ovaries',
        'organ:ovary_left',
        'organ:ovary_right',
        'organ:pancreas',
        'organ:pelvis',
        'organ:peripehral_nervous_system',
        'organ:placenta',
        'organ:prostate',
        'organ:skin',
        'organ:small_intestine',
        'organ:spinal_cord',
        'organ:spleen',
        'organ:stomach',
        'organ:thymus',
        'organ:ureter_left',
        'organ:ureter_right',
        'organ:uterus',
        'organ:vasculature_thick',
        'organ:vasculature_thin',
        'organ:extrapulmonary_bronchus',
        'organ:larynx',
        'organ:palatine_tonsil',
        'organ:trachea',
      ],
      description: 'Icon name',
    },
  },
  render: (args) => ({
    props: args,
    template: `<hra-icon [svgIcon]="name"></hra-icon>`,
  }),
};

export const ProductIcons: Story = {
  args: {
    name: 'product:cde',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'product:cde',
        'product:ftu',
        'product:eui',
        'product:organ-gallery',
        'product:cell-population',
        'product:tissue-origin-pr',
        'product:dashboard',
        'product:cell-population',
        'product:3d-organ',
        'product:asctb-reporter',
        'product:web-components',
        'product:api',
      ],
      description: 'Icon name',
    },
  },
  render: (args) => ({
    props: args,
    template: `<hra-icon [svgIcon]="name"></hra-icon>`,
  }),
};

export const SocialIcons: Story = {
  args: {
    name: 'social:linkedin',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'social:linkedin',
        'social:youtube',
        'social:instagram',
        'social:facebook',
        'social:github',
        'social:bluesky',
        'social:x',
      ],
      description: 'Icon name',
    },
  },
  render: (args) => ({
    props: args,
    template: `<hra-icon [svgIcon]="name"></hra-icon>`,
  }),
};
