import { MatSliderModule } from '@angular/material/slider';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface CommonSliderArgs {
  min?: number;
  max?: number;
  step?: number;
  label?: boolean;
}

interface SingleSliderArgs {
  value?: number;
}

interface RangeSliderArgs {
  low?: number;
  high?: number;
}

const COMMON_STYLES = [
  `mat-slider {
    width: 10rem;
    margin-top: 2rem;
  }`,
];

const meta: Meta<CommonSliderArgs> = {
  title: 'Design System/Slider',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=5-842',
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    label: false,
  },
  decorators: [
    moduleMetadata({
      imports: [MatSliderModule],
    }),
  ],
};
export default meta;

function renderSlider(args: CommonSliderArgs, content: string): string {
  return `<mat-slider min="${args.min}" max="${args.max}" step="${args.step}" ${args.label ? 'discrete' : ''}>
    ${content}
  </mat-slider>`;
}

export const Single: StoryObj<CommonSliderArgs & SingleSliderArgs> = {
  args: {
    value: 50,
  },
  render: (args) => ({
    template: renderSlider(args, `<input matSliderThumb value="${args.value}" />`),
    styles: COMMON_STYLES,
  }),
};

export const Range: StoryObj<CommonSliderArgs & RangeSliderArgs> = {
  args: {
    low: 20,
    high: 80,
  },
  render: (args) => ({
    template: renderSlider(
      args,
      `<input matSliderStartThumb value="${args.low}" />
      <input matSliderEndThumb value="${args.high}" />`,
    ),
    styles: COMMON_STYLES,
  }),
};
