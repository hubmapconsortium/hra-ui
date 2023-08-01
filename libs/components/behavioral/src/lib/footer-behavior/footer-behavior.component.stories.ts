import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FooterBehaviorComponent } from './footer-behavior.component';

export default {
  title: 'FooterBehaviorComponent',
  component: FooterBehaviorComponent,
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
} as Meta<FooterBehaviorComponent>;

const Template: Story<FooterBehaviorComponent> = (args: FooterBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
