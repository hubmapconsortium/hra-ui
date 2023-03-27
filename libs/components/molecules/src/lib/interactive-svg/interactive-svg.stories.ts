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
        'assets/2d-ftu-skin-dermal-papilla.svg',
        'assets/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
        'assets/2d-ftu-kidney-cortical-collecting-duct.svg',
        'assets/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
        'assets/2d-ftu-kidney-nephron.svg',
        'assets/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
        'assets/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
        'assets/2d-ftu-liver-liver-lobule.svg',
        'assets/2d-ftu-pancreas-intercalated-duct.svg',
        'assets/2d-ftu-pancreas-pancreatic-acinus.svg',
        'assets/2d-ftu-prostate-prostate-glandular-acinus.svg',
        'assets/2d-ftu-skin-dermal-papilla.svg',
        'assets/2d-ftu-thymus-thymus-lobule.svg',
        'assets/2d-ftu-skin-epidermal-ridge.svg',
        'assets/2d-ftu-lung-bronchial-submucosal-gland.svg',
      ],
      defaultValue: 'assets/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
    },
  },
} as Meta<InteractiveSvgComponent>;

const Template: Story<InteractiveSvgComponent> = (args) => ({ props: args });

export const Default = Template.bind({});
