import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { FtuFooterBehavioralComponent } from './ftu-footer-behavioral.component';

export default {
  title: 'Behavioral/FtuFooterBehavioralComponent',
  component: FtuFooterBehavioralComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState],
      actions: [new ResourceRegistryActions.LoadFromYaml('assets/resources/header.yml')],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([ResourceRegistryState])],
    }),
  ],
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
  downloadFormats: DownloadFormat,
};
