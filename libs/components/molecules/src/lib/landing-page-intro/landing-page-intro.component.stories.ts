import { Meta, StoryFn } from '@storybook/angular';

import { LandingPageIntroComponent } from './landing-page-intro.component';

export default {
  title: 'LandingPageIntro',
  component: LandingPageIntroComponent,
} as Meta<LandingPageIntroComponent>;

const Template: StoryFn<LandingPageIntroComponent> = (args) => ({
  props: args,
});

export const Default = {
  render: Template,

  args: {
    title: 'Welcome to the Functional Tissue Unit Explorer',

    description: `A functional tissue unit (FTU) is the smallest tissue organization that performs a unique physiologic function
    and is replicated multiple times in a whole organ. Explore medical illustrations of FTUs to view cell type populations
    by gene, protein, and lipid biomarkers. The FTU Explorer showcases single-cell expression data from the <a href='https://www.ebi.ac.uk/about/news/updates-from-data-resources/anatomograms-new-feature-single-cell-expression-atlas/' target='_blank'>Anatomogram</a> site by EMBL-EBI.`,

    partners: `A special thanks to our partners: The FTU Explorer was designed in close collaboration with
    <a href='' target='_blank'>Kidney Precision Medicine Project</a> and <a href=''>European Bioinformatics Institute.</a>`,

    moreText: 'Explore FTUs',

    img: 'assets/welcome.svg',
  },
};
