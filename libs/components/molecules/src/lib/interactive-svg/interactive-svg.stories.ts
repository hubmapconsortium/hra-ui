import { Meta, Story } from '@storybook/angular/types-6-0';

import { InteractiveSvgComponent } from './interactive-svg.component';

export default {
  title: 'Molecule/InteractiveSvg',
  component: InteractiveSvgComponent,
  argTypes: {
    url: {
      control: 'select',
      options: [
        'assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
        'assets/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
        'assets/2d-ftu-kidney-renal-corpuscle.svg',
        'assets/2d-ftu-lung-pulmonary-alveolus.svg',
        'assets/2d-ftu-pancreas-islets-langerhans.svg',
      ],
      defaultValue: 'assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
    },
  },
} as Meta<InteractiveSvgComponent>;

const Template: Story<InteractiveSvgComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
