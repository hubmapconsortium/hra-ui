import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { ContactService, MockContactService } from '@hra-ui/services';
import { ContactState, StateAnalyticsPluginService } from '@hra-ui/state';
import { NGXS_PLUGINS } from '@ngxs/store';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
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
  decorators: [
    moduleMetadata({
      providers: [
        { provide: ContactService, useExisting: MockContactService },
        { provide: NGXS_PLUGINS, useClass: StateAnalyticsPluginService, multi: true },
      ],
    }),
  ],
} as Meta<ContactBehaviorComponent>;

const Template: Story<ContactBehaviorComponent> = (args: ContactBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
