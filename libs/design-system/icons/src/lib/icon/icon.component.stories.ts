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
        'misc:asctb-reporter',
        'misc:biomarker',
        'misc:cell-type',
        'misc:contribute',
        'misc:data',
        'misc:experts',
        'misc:explore',
        'misc:ftu',
        'misc:heart',
        'misc:omaps',
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
        'product:3d-ftu',
        'product:3d-organ',
        'product:api',
        'product:apps',
        'product:asctb-reporter',
        'product:cde',
        'product:cell-population-graphs',
        'product:cell-population-predictor',
        'product:cell-type-annotations',
        'product:collections',
        'product:dashboard',
        'product:dataset-graphs',
        'product:design-system',
        'product:developer-portal',
        'product:eui',
        'product:ftu',
        'product:graphs',
        'product:hra-pop',
        'product:human-atlas-stories',
        'product:knowledge-graph',
        'product:landmark',
        'product:millotome',
        'product:omaps',
        'product:organ-gallery',
        'product:rui',
        'product:schema',
        'product:tissue-origin-predictor',
        'product:vascular-geometry',
        'product:vocabulary',
        'product:web-components',
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
