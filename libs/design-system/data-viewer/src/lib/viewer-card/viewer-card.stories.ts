import { toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { Meta, StoryObj } from '@storybook/angular';

import { ViewerCard } from '../types/data-viewer.schema';
import { ViewerCardComponent } from './viewer-card.component';

const testCard: ViewerCard = {
  label: 'Crypt of Lieberkuhn',
  alt: 'Image of Crypt of Lieberkuhn',
  fileUrl:
    'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
  fullscreenUrl:
    'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
  sourceDataUrl: 'https://purl.humanatlas.io/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2',
  crosswalkUrl:
    'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/crosswalk.csv',
  files: [
    {
      label: 'Adobe Illustrator',
      url: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
    },
    {
      label: 'PNG',
      url: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
    },
    {
      label: 'SVG',
      url: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
    },
  ],
};

const testOrgan: ViewerCard = {
  label: 'Female',
  fileUrl: 'https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.7/assets/3d-vh-f-united.glb',
  sourceDataUrl: 'https://purl.humanatlas.io/ref-organ/united-female/v1.7',
  files: [
    {
      label: 'GLB',
      url: 'https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.7/assets/3d-vh-f-united.glb',
    },
  ],
};

const meta: Meta = {
  component: ViewerCardComponent,
  title: 'Design System / Data Viewer / Viewer Card',

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7648-8835&t=GQLse2MKnovHjLt3-4',
    },
  },
};
export default meta;
type Story = StoryObj<ViewerCardComponent>;

export const FTUCard: Story = {
  args: {
    variant: toProductLogoId('ftu'),
    viewerCardData: testCard,
  },
};

export const OrganCard: Story = {
  args: {
    variant: toProductLogoId('3d-organ'),
    viewerCardData: testOrgan,
  },
};
