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
    name: 'organ:all-organs',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'organ:adipose-tissue',
        'organ:all-organs',
        'organ:anatomical-systems',
        'organ:bladder',
        'organ:blood',
        'organ:bone-marrow',
        'organ:brain',
        'organ:extrapulmonary-bronchus',
        'organ:eye',
        'organ:fallopian-tube-left',
        'organ:fallopian-tube-right',
        'organ:fallopian-tube',
        'organ:glomerulus',
        'organ:heart',
        'organ:intervertebral-disc',
        'organ:kidney-left',
        'organ:kidney-right',
        'organ:kidneys',
        'organ:knee',
        'organ:large-intestine',
        'organ:larynx',
        'organ:liver',
        'organ:lung-left',
        'organ:lung-right',
        'organ:lungs',
        'organ:lymph-node',
        'organ:mammary-gland',
        'organ:manubrium',
        'organ:mouth',
        'organ:muscular-system',
        'organ:ovary-left',
        'organ:ovary-right',
        'organ:ovaries',
        'organ:palatine-tonsil',
        'organ:pancreas',
        'organ:pelvis',
        'organ:peripheral-nervous-system',
        'organ:placenta',
        'organ:prostate',
        'organ:renal-pelvis-left',
        'organ:renal-pelvis-right',
        'organ:renal-pelvis',
        'organ:skin',
        'organ:small-intestine',
        'organ:spinal-cord',
        'organ:spleen',
        'organ:sternum',
        'organ:stomach',
        'organ:thymus',
        'organ:trachea',
        'organ:ureter-left',
        'organ:ureter-right',
        'organ:ureters',
        'organ:uterus',
        'organ:vasculature-thick',
        'organ:vasculature-thin',
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
