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
    name: 'organ:intervertebral-disc',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'organ:all-organs',
        'organ:bladder',
        'organ:blood',
        'organ:bone-marrow',
        'organ:brain',
        'organ:breast',
        'organ:eye',
        'organ:fallopian-tube-left',
        'organ:fallopian-tube-right',
        'organ:heart',
        'organ:kidney-left',
        'organ:kidney-right',
        'organ:kidneys',
        'organ:knee',
        'organ:large-intestine',
        'organ:liver',
        'organ:lung-left',
        'organ:lung-right',
        'organ:lungs',
        'organ:lymph-nodes',
        'organ:neurons',
        'organ:ovaries',
        'organ:ovary-left',
        'organ:ovary-right',
        'organ:pancreas',
        'organ:pelvis',
        'organ:peripehral-nervous-system',
        'organ:placenta',
        'organ:prostate',
        'organ:skin',
        'organ:small-intestine',
        'organ:spinal-cord',
        'organ:spleen',
        'organ:stomach',
        'organ:thymus',
        'organ:ureter-left',
        'organ:ureter-right',
        'organ:uterus',
        'organ:vasculature-thick',
        'organ:vasculature-thin',
        'organ:extrapulmonary-bronchus',
        'organ:larynx',
        'organ:palatine-tonsil',
        'organ:trachea',
        'organ:adipose-tissue',
        'organ:anatomical-systems',
        'organ:intervertebral-disc',
        'organ:muscular-system',
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
