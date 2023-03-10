import { ResourceRegistryState } from '@hra-ui/cdk/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { LandingPageContentComponent } from './landing-page-content.component';

export default {
  title: 'Behavior/LandingPageContentComponent',
  component: LandingPageContentComponent,
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([ResourceRegistryState])],
    }),
  ],
} as Meta<LandingPageContentComponent>;

const Template: Story<LandingPageContentComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
