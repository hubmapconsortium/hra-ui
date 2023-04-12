import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { ContactService, MockContactService } from '@hra-ui/services';
import { ContactState } from '@hra-ui/state';
import { applicationConfig, Meta, Story } from '@storybook/angular';
import { ContactBehaviorComponent } from './contact-behavior.component';

export default {
  title: 'ContactBehaviorComponent',
  component: ContactBehaviorComponent,
  parameters: {
    state: {
      states: [ContactState, ResourceRegistryState],
      actions: [new ResourceRegistryActions.LoadFromYaml('assets/resources/contact.yml')],
    },
  },
  decorators: [applicationConfig({ providers: [{ provide: ContactService, useExisting: MockContactService }] })],
} as Meta<ContactBehaviorComponent>;

const Template: Story<ContactBehaviorComponent> = (args: ContactBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
