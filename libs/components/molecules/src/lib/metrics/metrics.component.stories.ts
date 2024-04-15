import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { MetricsComponent } from './metrics.component';

export default {
  title: 'MetricsComponent',
  component: MetricsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<MetricsComponent>;

const Template: StoryFn<MetricsComponent> = (args) => ({
  props: args,
});

export const Primary = {
  render: Template,

  args: {
    logo: '/assets/logo.svg',
    title: 'Metrics of the Human Reference Atlas',
    metrics: [
      { icon: '/assets/diversity.svg', value: '17', description: 'consortia' },
      {
        icon: '/assets/publications.svg',
        value: '1,000+',
        description: 'publications',
      },
      { icon: '/assets/experts.svg', value: '250+', description: 'experts' },
      {
        icon: '/assets/structures.svg',
        value: '2,665',
        description: 'anatomical structures',
      },
      {
        icon: '/assets/celltypes.svg',
        value: '953',
        description: 'cell types',
      },
      {
        icon: '/assets/biomarkers.svg',
        value: '2,842',
        description: 'biomarkers',
      },
    ],
  },
};
