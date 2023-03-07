import { MatDialogModule } from '@angular/material/dialog';
import { ContactState } from '@hra-ui/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ContactBehaviorComponent } from './contact-behavior.component';

export default {
  title: 'ContactBehaviorComponent',
  component: ContactBehaviorComponent,
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([ContactState])],
    }),
  ],
} as Meta<ContactBehaviorComponent>;

const Template: Story<ContactBehaviorComponent> = (args: ContactBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  productLogoUrl: 'assets/icons/logo-icon.svg',
  productTitle: 'Human Reference Atlas',
  description: `
    We received your message. Please allow two business days for a <br>
    response to each inquiry. Thanks for your time and expertise!
  `,
};
