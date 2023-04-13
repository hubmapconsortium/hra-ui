import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { Meta, Story } from '@storybook/angular';

import { LandingPageContentComponent } from './landing-page-content.component';

export default {
  title: 'LandingPageContentComponent',
  component: LandingPageContentComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState],
      actions: [new ResourceRegistryActions.LoadFromYaml('assets/resources/landing-page-content.yml')],
    },
  },
} as Meta<LandingPageContentComponent>;

const Template: Story<LandingPageContentComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
