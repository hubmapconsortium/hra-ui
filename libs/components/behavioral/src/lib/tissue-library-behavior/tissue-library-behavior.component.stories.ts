import { Meta } from '@storybook/angular';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

export default {
  title: 'TissueLibraryBehaviorComponent',
  component: TissueLibraryBehaviorComponent,
} as Meta<TissueLibraryBehaviorComponent>;

export const Primary = {
  render: (args: TissueLibraryBehaviorComponent) => ({
    props: args,
  }),
  args: {},
};
