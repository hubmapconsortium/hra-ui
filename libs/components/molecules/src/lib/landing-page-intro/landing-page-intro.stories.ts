import { Meta, Story } from '@storybook/angular/types-6-0';

import { LandingPageIntroComponent } from './landing-page-intro.component';

export default {
  title: 'Molecule/LandingPageIntro',
  component: LandingPageIntroComponent,
} as Meta<LandingPageIntroComponent>;

const Template: Story<LandingPageIntroComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome to the Functional Tissue Unit Explorer',

  description: `A functional tissue unit (FTU) is the smallest tissue organization that performs a unique physiologic function and
  is replicated multiple times in a whole organ. Explore medical illustrations of FTUs to view cell type populations
  by gene, protein, and lipid biomarkers. The FTU Explorer features experimental datasets from
  <a href='' target='_blank'>HuBMAP</a>, <a href='' target='_blank'>CellxGene</a>,
  <a href='' target='_blank'>NeMO</a>, and <a href='' target='_blank'>GTEx</a>.`,

  partners: `A special thanks to our partners: The FTU Explorer was designed in close collaboration with
  <a href='' target='_blank'>Kidney Precision Medicine Project</a> and <a href=''>European Bioinformatics Institute.</a>`,

  moreText: 'Explore FTUs',

  img: '../../assets/welcome.svg',
};
