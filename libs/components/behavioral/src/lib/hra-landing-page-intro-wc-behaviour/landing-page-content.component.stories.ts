import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { Meta, Story } from '@storybook/angular';

import { HraLandingPageIntroWcBehaviourComponent } from './hra-landing-page-intro-wc-behaviour.component';

export default {
  title: 'HraLandingPageIntroWcBehaviourComponent',
  component: HraLandingPageIntroWcBehaviourComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState],
      actions: [new ResourceRegistryActions.LoadFromYaml('assets/resources/landing-page-content.yml')],
    },
  },
} as Meta<HraLandingPageIntroWcBehaviourComponent>;

const Template: Story<HraLandingPageIntroWcBehaviourComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
