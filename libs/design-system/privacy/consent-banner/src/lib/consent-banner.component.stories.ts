import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideBrandLogos } from '@hra-ui/design-system/brand/logo';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ConsentBannerComponent } from './consent-banner.component';

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

export const HRA: Story = {};

export const CNSWebsite: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        provideAppConfiguration({
          name: 'Design System Storybook',
          version: '1.0.0',
          url: 'https://humanatlas.io/',
          // logos: [
          //   { size: 'regular', src: 'assets/brand/logo/cns-regular.svg', width: 228, height: 39 },
          //   { size: 'small', src: 'assets/brand/logo/cns-small.svg', width: 84, height: 28 },
          // ],
        }),
        provideBrandLogos({
          logos: [
            { size: 'regular', src: 'assets/brand/logo/cns-regular.svg', width: 228, height: 39 },
            { size: 'small', src: 'assets/brand/logo/cns-small.svg', width: 84, height: 28 },
          ],
        }),
      ],
    }),
  ],
};
