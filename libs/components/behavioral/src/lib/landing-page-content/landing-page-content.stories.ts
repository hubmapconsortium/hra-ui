import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { LandingPageContentComponent } from './landing-page-content.component';

export default {
  title: 'Behavior/LandingPageContentComponent',
  component: LandingPageContentComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState],
      actions: [new ResourceRegistryActions.LoadFromYaml('assets/landing-page-content.yml')],
    },
  },
} as Meta<LandingPageContentComponent>;

const Template: Story<LandingPageContentComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
