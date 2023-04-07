import {
  LinkRegistryActions,
  LinkRegistryState,
  ResourceRegistryActions,
  ResourceRegistryState,
} from '@hra-ui/cdk/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
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

const Template: Story<HeaderBehaviorComponent> = (args: HeaderBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
