import { Meta, StoryObj } from '@storybook/angular';

import { ViewerCardComponent } from './viewer-card.component';
import { ViewerCardData } from '../types/data-viewer.schema';
import { toProductLogoId } from '@hra-ui/design-system/brand/product-logo';

const testTissue: ViewerCardData = {
  name: 'Crypt of Lieberkuhn',
  metadata: 'https://purl.humanatlas.io/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2',
  ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
  png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
  svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
  crosswalk:
    'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/crosswalk.csv',
};

const testOrgan: ViewerCardData = {
  name: 'Female',
  metadata: 'https://purl.humanatlas.io/ref-organ/united-female/v1.7',
  threeDimImage: 'https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.7/assets/3d-vh-f-united.glb',
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
  args: { variant: 'ftu', viewerCardData: testTissue },
};
export default meta;
type Story = StoryObj<ViewerCardComponent>;

export const FTUCard: Story = {
  args: {
    variant: toProductLogoId('ftu'),
    viewerCardData: testTissue,
  },
};

export const OrganCard: Story = {
  args: {
    variant: toProductLogoId('3d-organ'),
    viewerCardData: testOrgan,
  },
};
