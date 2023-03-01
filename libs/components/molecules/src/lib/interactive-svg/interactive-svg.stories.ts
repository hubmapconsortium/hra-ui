import { Meta, Story } from '@storybook/angular/types-6-0';

import { InteractiveSvgComponent } from './interactive-svg.component';

export default {
  title: 'Molecule/InteractiveSvg',
  component: InteractiveSvgComponent,
} as Meta<InteractiveSvgComponent>;

const Template: Story<InteractiveSvgComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
Default.args = {
  url: 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
};
