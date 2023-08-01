import { Meta, applicationConfig } from '@storybook/angular';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';
import { TissueLibraryActions, TissueLibraryState } from '@hra-ui/state';
import { MockTissueLibraryService, TissueLibraryService } from '@hra-ui/services';

export default {
  title: 'TissueLibraryBehaviorComponent',
  parameters: {
    state: {
      states: [TissueLibraryState],
      actions: [new TissueLibraryActions.Load()],
    },
  },
  component: TissueLibraryBehaviorComponent,
  decorators: [
    applicationConfig({
      providers: [{ provide: TissueLibraryService, useExisting: MockTissueLibraryService }],
    }),
  ],
} as Meta<TissueLibraryBehaviorComponent>;

export const Primary = {
  render: (args: TissueLibraryBehaviorComponent) => ({
    props: args,
  }),
  args: {},
};
