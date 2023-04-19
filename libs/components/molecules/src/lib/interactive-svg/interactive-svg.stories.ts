import { Meta, Story } from '@storybook/angular';

import { InteractiveSvgComponent, NodeMapEntry } from './interactive-svg.component';

export default {
  title: 'InteractiveSvg',
  component: InteractiveSvgComponent,
  argTypes: {
    url: {
      control: 'select',
      options: [
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver-lobule.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-epidermal-ridge.svg',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.svg',
      ],
      defaultValue:
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
    },
  },
} as Meta<InteractiveSvgComponent<NodeMapEntry>>;

const Template: Story<InteractiveSvgComponent<NodeMapEntry>> = (args) => ({ props: args });

export const Default = Template.bind({});
