import { MatIconModule } from '@angular/material/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { provideDesignSystem } from './providers';

const meta: Meta = {
  title: 'MaterialSymbols',
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

export const BuiltinSymbols: Story = {
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
    template: `<mat-icon>${args['name']}</mat-icon>`,
  }),
};

export const CustomSymbols: Story = {
  args: {
    name: 'social:github',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'upload',
        'settings_alert',
        'social:github',
        'social:facebook',
        'social:instagram',
        'social:linkedin',
        'social:x',
        'social:youtube',
      ],
    },
  },
  render: (args) => ({
    props: args,
    template: `<mat-icon svgIcon=${args['name']}></mat-icon>`,
  }),
};

export const OrganIcons: Story = {
  args: {
    name: 'organ:blood',
    color: 'black',
    size: 4,
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
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
    },
    color: {
      control: 'select',
      options: ['black', 'red', 'blue', 'green'],
    },
    size: {
      control: 'select',
      options: [2, 4, 6],
    },
  },
  render: (args) => ({
    props: args,
    template: `<mat-icon svgIcon=${args['name']}></mat-icon>`,
    styles: [
      `mat-icon {
        --mat-icon-color: ${args['color']};
        height: ${args['size']}rem;
        width: ${args['size']}rem;
      }`,
    ],
  }),
};
