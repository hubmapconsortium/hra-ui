import { Meta, Story } from '@storybook/angular/types-6-0';
import { FtuFooterBehavioralComponent } from './ftu-footer-behavioral.component';

export default {
  title: 'Behavioral/FtuFooterBehavioralComponent',
  component: FtuFooterBehavioralComponent,
} as Meta;

const DownloadFormat = [
  { label: 'Download XLXS' },
  { label: 'Download JSON-LD' },
  { label: 'Download PDF' },
  { label: 'Download AI' },
  { label: 'Download PNG' },
];
const Template: Story<FtuFooterBehavioralComponent> = (args: FtuFooterBehavioralComponent) => ({
  props: args,
});

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  downloadFormats: DownloadFormat,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  productLogoUrl: 'assets/icons/logo-icon.svg',
  productTitle: 'Human Reference Atlas',
  downloadFormats: DownloadFormat,
};
