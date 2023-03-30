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
        new MedicalIllustrationActions.SetUri(
          'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg'
        ),
      ],
    },
  },
} as Meta<MedicalIllustrationBehaviorComponent>;

const Template: Story<MedicalIllustrationBehaviorComponent> = (args: MedicalIllustrationBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
