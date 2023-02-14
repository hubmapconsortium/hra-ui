import { Meta, Story } from '@storybook/angular/types-6-0';

import { LandingPageIntroComponent } from './landing-page-intro.component';

export default {
  title: 'Molecule/LandingPageIntro',
  component: LandingPageIntroComponent,
} as Meta<LandingPageIntroComponent>;

const Template: Story<LandingPageIntroComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {};
