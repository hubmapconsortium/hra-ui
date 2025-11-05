import { Meta, StoryObj } from '@storybook/angular';

import { ContentButtonGridComponent } from './content-button-grid.component';

const meta: Meta<ContentButtonGridComponent> = {
  component: ContentButtonGridComponent,
  title: 'Design System / Content Button Grid',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12389-19703&t=0RhmhR3R1V0Ludju-4',
    },
  },
  argTypes: {
    sortBy: {
      control: 'select',
      options: ['nameAsc', 'nameDes', 'newest', 'oldest'],
    },
  },
  args: {
    sortBy: 'newest',
    buttonCategories: ['publications', 'news'],
    cardData: [
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-08-26',
        tagline: 'HuBMAP Human Reference Atlas Hackathon',
        tags: ['Event', 'HRA'],
        link: 'https://google.com',
        external: true,
        categories: ['featured'],
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-08-13',
        tagline: 'Luddy’s Bueckle wins two grants, co-authors paper',
        categories: ['news', 'featured'],
        tags: ['News', 'HRA'],
        link: 'https://google.com',
        external: true,
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-08-02',
        tagline: 'Constructing and Using Cell Type Populations of the Human Reference Atlas',
        categories: ['publications', 'featured'],
        tags: ['Publication', 'HRA'],
        link: 'https://google.com',
        external: true,
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-07-16',
        tagline: 'Börner wins Stiftung Charité Visiting Fellowship',
        categories: ['news', 'featured'],
        tags: ['News', 'HRA'],
        link: 'https://google.com',
        external: true,
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-06-03',
        tagline: 'Places & Spaces | 20th Iteration',
        categories: ['news', 'featured'],
        tags: ['News', 'Places & Spaces'],
        link: 'https://google.com',
        external: true,
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-05-23',
        tagline: 'Benchmarking single cell transcriptome matching methods for incremental growth of reference atlases',
        categories: ['publications', 'featured'],
        tags: ['Publication', 'HRA'],
        link: 'https://google.com',
        external: true,
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-05-12',
        tagline: 'Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph',
        categories: ['publications', 'featured'],
        tags: ['Publication', 'HRA'],
        link: 'https://google.com',
        external: true,
      },
      {
        imageSrc: 'assets/ui-images/placeholder.png',
        date: '2025-04-14',
        tagline: 'Amatria Birthday brings hope, growth',
        categories: ['news', 'featured'],
        tags: ['News', 'Amatria'],
        link: 'https://google.com',
        external: true,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<ContentButtonGridComponent>;

export const Default: Story = {};
