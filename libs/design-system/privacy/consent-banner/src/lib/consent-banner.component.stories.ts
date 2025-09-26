import { ConsentBannerComponent } from './consent-banner.component';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ConsentBannerComponent> = {
  component: ConsentBannerComponent,
  title: 'Design System/Consent Banner',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4497-1340&t=wmPJnsrT7daOVyJv-1',
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<ConsentBannerComponent>;

export const Primary: Story = {
  args: {},
};
