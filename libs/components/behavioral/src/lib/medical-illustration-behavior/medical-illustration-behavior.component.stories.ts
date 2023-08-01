import { IllustratorActions, IllustratorState } from '@hra-ui/state';
import { Meta, Story } from '@storybook/angular';

import { MedicalIllustrationBehaviorComponent } from './medical-illustration-behavior.component';
import { Iri } from '@hra-ui/services';

export default {
  title: 'MedicalIllustrationBehaviorComponent',
  component: MedicalIllustrationBehaviorComponent,
  parameters: {
    state: {
      states: [IllustratorState],
      actions: [new IllustratorActions.Load('https://example.com/Kidney/Descending_Thin_Loop_of_Henle' as Iri)],
    },
  },
} as Meta<MedicalIllustrationBehaviorComponent>;

const Template: Story<MedicalIllustrationBehaviorComponent> = (args: MedicalIllustrationBehaviorComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
