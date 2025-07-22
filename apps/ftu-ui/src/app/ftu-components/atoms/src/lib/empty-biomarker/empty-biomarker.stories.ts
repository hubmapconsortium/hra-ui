import { Meta, StoryFn } from '@storybook/angular';
import { EmptyBiomarkerComponent } from './empty-biomarker.component';

export default {
  title: 'EmptyBiomarker',
  component: EmptyBiomarkerComponent,
} as Meta<EmptyBiomarkerComponent>;

const Template: StoryFn<EmptyBiomarkerComponent> = (args) => ({ props: args });

export const Default = {
  render: Template,

  args: {
    collaborateText: 'Collaborate with the HRA Team',
    message: `We currently do not have cell type data for this biomarker.
                      <br><br> Please contact us to discuss your dataset.`,
  },
};
