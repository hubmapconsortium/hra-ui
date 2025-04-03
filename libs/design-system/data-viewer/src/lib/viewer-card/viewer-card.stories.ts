import { Meta, StoryObj } from '@storybook/angular';

import { TissueData } from '../data-viewer.component';
import { ViewerCardComponent } from './viewer-card.component';

const testTissue: TissueData = {
  name: 'Crypt of Lieberkuhn',
  metadataUrl: 'https://purl.humanatlas.io/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2',
  ai: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.ai',
  png: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.png',
  svg: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
  csv: 'https://cdn.humanatlas.io/digital-objects/2d-ftu/large-intestine-crypt-lieberkuhn/v1.2/assets/crosswalk.csv',
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
  args: { variant: 'ftu', tissue: testTissue },
  render: (args) => ({ props: args }),
};
export default meta;
type Story = StoryObj<ViewerCardComponent>;

export const Primary: Story = {};
