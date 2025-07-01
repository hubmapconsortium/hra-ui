import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { SizeLegendComponent } from './size-legend.component';

export default {
  title: 'SizeLegendComponent',
  component: SizeLegendComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<SizeLegendComponent>;

const Template: StoryFn<SizeLegendComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    sizes: [
      {
        label: '0%',
        radius: 0.5,
      },
      {
        label: '50%',
        radius: 1,
      },
      {
        label: '100%',
        radius: 1.5,
      },
    ],
  },
};
