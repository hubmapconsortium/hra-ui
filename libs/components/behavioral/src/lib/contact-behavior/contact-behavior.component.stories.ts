import { ContactService, MockContactService } from '@hra-ui/services';
import { ContactState } from '@hra-ui/state';
import { NgxsModule } from '@ngxs/store';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ContactBehaviorComponent } from './contact-behavior.component';

export default {
  title: 'ContactBehaviorComponent',
  component: ContactBehaviorComponent,
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([ContactState])],
      providers: [{ provide: ContactService, useExisting: MockContactService }],
    }),
  ],
} as Meta<ContactBehaviorComponent>;

const Template: Story<ContactBehaviorComponent> = (args: ContactBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
