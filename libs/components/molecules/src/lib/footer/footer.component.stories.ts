import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

import { FooterComponent } from './footer.component';

export default {
  title: 'FooterComponent',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FooterComponent>;

const DownloadFormat = [
  { label: 'Download XLXS' },
  { label: 'Download JSON-LD' },
  { label: 'Download PDF' },
  { label: 'Download AI' },
  { label: 'Download PNG' },
];

const Template: StoryFn<FooterComponent> = (args) => ({
  props: args,
  styles: [
    `
    hra-footer {
        position: absolute;
        inset: auto 0 0 0;
    }
  `,
  ],
});

export const Large = {
  render: Template,

  args: {
    size: 'large',
    productLogoUrl: 'assets/icons/logo-icon.svg',
    productTitle: 'Human Reference Atlas',
    downloadFormats: DownloadFormat,
  },
};

export const Small = {
  render: Template,

  args: {
    size: 'small',
    productLogoUrl: 'assets/icons/logo-icon.svg',
    productTitle: 'Human Reference Atlas',
    downloadFormats: DownloadFormat,
  },
};
