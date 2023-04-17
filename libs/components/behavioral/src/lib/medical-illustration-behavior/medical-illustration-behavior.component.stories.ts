import { MedicalIllustrationActions, MedicalIllustrationState } from '@hra-ui/state';
import { Meta, Story } from '@storybook/angular';

import { MedicalIllustrationBehaviorComponent } from './medical-illustration-behavior.component';

export default {
  title: 'MedicalIllustrationBehaviorComponent',
  component: MedicalIllustrationBehaviorComponent,
  parameters: {
    state: {
      states: [MedicalIllustrationState],
      actions: [
        new MedicalIllustrationActions.SetMapping('assets/TEMP/mapping.csv'),
        new MedicalIllustrationActions.SetUri('./assets/TEMP/2d-ftu-kidney-renal-corpuscle-v2.svg'),
      ],
    },
  },
} as Meta<MedicalIllustrationBehaviorComponent>;

const Template: Story<MedicalIllustrationBehaviorComponent> = (args: MedicalIllustrationBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
