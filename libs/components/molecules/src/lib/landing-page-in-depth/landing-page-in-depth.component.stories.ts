import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LandingPageInDepthComponent } from './landing-page-in-depth.component';

export default {
  title: 'LandingPageInDepthComponent',
  component: LandingPageInDepthComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LandingPageInDepthComponent>;

const Template: Story<LandingPageInDepthComponent> = (args: LandingPageInDepthComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Explore Medical Illustrations of the Human Reference Atlas',
  img: '../../assets/2d-ftu-pancreas-islets-langerhans.svg',
  moreText: 'Read more about this effort',
  description: `The 2D Functional Tissue Unit Library provides anatomically correct illustrations of functional tissue units (FTUs). The illustrations are developed by a specialist in 2D medical illustration and approved by organ experts. Illustrations are created using terms from the Anatomical Structures, Cell Types, and Biomarker (ASCT+B) table for each organ. Subject matter experts collaborate on a list of anatomical structures and/or cell types to be included in each FTU`,
};
