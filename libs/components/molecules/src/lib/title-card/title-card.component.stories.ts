import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TitleCardComponent } from './title-card.component';

export default {
  title: 'TitleCardComponent',
  component: TitleCardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TitleCardComponent>;

const Template: Story<TitleCardComponent> = (args: TitleCardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Welcome to the Functional Tissue Unit Explorer',

  description: `
  Explore functional tissue units (FTUs) featuring experimental datasets and Human Reference Atlas (HRA) technologies.<br><br>
  Read more about this effort at <a href='' target='_blank'>HRA Portal: FTU Explorer</a>.<br><br>
  A special thanks to our partners: <a href='' target='_blank'>Kidney Precision Medicine Project</a> and <a href='' target='_blank'>European Bioinformatics Institute</a>.
  `,
};
