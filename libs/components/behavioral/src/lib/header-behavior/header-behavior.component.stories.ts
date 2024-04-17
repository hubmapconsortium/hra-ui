import {
  LinkRegistryActions,
  LinkRegistryState,
  ResourceRegistryActions,
  ResourceRegistryState,
} from '@hra-ui/cdk/state';
import { Meta, StoryFn } from '@storybook/angular';
import { HeaderBehaviorComponent } from './header-behavior.component';

export default {
  title: 'HeaderBehaviorComponent',
  component: HeaderBehaviorComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState, LinkRegistryState],
      actions: [
        new ResourceRegistryActions.LoadFromYaml('assets/resources/header.yml'),
        new LinkRegistryActions.LoadFromYaml('assets/links/header.yml'),
      ],
    },
  },
} as Meta<HeaderBehaviorComponent>;

const Template: StoryFn<HeaderBehaviorComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,
  args: {},
};
