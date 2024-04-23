import { IllustratorActions, IllustratorState } from '@hra-ui/state';
import { Meta, StoryFn, applicationConfig, moduleMetadata } from '@storybook/angular';

import { FtuDataService, Iri, MockFtuDataService } from '@hra-ui/services';
import { NgxsModule } from '@ngxs/store';
import { MedicalIllustrationBehaviorComponent } from './medical-illustration-behavior.component';

export default {
  title: 'MedicalIllustrationBehaviorComponent',
  component: MedicalIllustrationBehaviorComponent,
  parameters: {
    state: {
      states: [IllustratorState],
      actions: [
        new IllustratorActions.Load('https://purl.humanatlas.io/2d-ftu/Kidney/Descending_Thin_Loop_of_Henle/' as Iri),
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([IllustratorState])],
    }),
    applicationConfig({
      providers: [{ provide: FtuDataService, useExisting: MockFtuDataService }],
    }),
  ],
} as Meta<MedicalIllustrationBehaviorComponent>;

const Template: StoryFn<MedicalIllustrationBehaviorComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,
  args: {},
};
