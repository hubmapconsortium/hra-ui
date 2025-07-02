import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { Meta, StoryFn } from '@storybook/angular';

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

const Template: StoryFn<HraLandingPageIntroWcBehaviourComponent> = (args) => ({
  props: args,
});

export const Default = {
  render: Template,
};
