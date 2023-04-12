import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { Meta, Story } from '@storybook/angular';
import { HeaderBehaviorComponent } from './header-behavior.component';

export default {
  title: 'HeaderBehaviorComponent',
  component: HeaderBehaviorComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState],
      actions: [new ResourceRegistryActions.LoadFromYaml('assets/resources/header.yml')],
    },
  },
} as Meta<HeaderBehaviorComponent>;

const Template: Story<HeaderBehaviorComponent> = (args: HeaderBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
