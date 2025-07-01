import { FtuDataService, MockFtuDataService } from '@hra-ui/services';
import { TissueLibraryActions, TissueLibraryState } from '@hra-ui/state';
import { Meta, applicationConfig } from '@storybook/angular';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

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
      providers: [{ provide: FtuDataService, useExisting: MockFtuDataService }],
    }),
  ],
} as Meta<TissueLibraryBehaviorComponent>;

export const Primary = {
  render: (args: TissueLibraryBehaviorComponent) => ({
    props: args,
  }),
  args: {},
};
