import { Meta, Story } from '@storybook/angular';
import { HraLandingPageIntroWcComponent } from './hra-landing-page-intro-wc.component';

export default {
  title: 'HraLandingPageIntroWC',
  component: HraLandingPageIntroWcComponent,
} as Meta<HraLandingPageIntroWcComponent>;

const Template: Story<HraLandingPageIntroWcComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to the Functional Tissue Unit Explorer',

  description: `Explore functional tissue units (FTUs) featuring experimental datasets and Human Reference Atlas (HRA) technologies.`,

  readMore: `Read more about this effort at  <a href='' target='_blank'>HRA Portal: FTU Explorer.</a>`,

  partners: `A special thanks to our partners: The FTU Explorer was designed in close collaboration with
  <a href='' target='_blank'>Kidney Precision Medicine Project</a> and <a href=''>European Bioinformatics Institute.</a>`,
};
