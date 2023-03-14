import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
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
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([ResourceRegistryState])],
    }),
  ],
} as Meta<HeaderBehaviorComponent>;

const Template: Story<HeaderBehaviorComponent> = (args: HeaderBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
