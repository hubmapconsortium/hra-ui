import { type Meta, type StoryObj } from '@storybook/angular';
import { GalleryCardComponent } from './gallery-card.component';

const meta: Meta<GalleryCardComponent> = {
  title: 'Design System/Cards/Gallery Card',
  component: GalleryCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1309-2257',
    },
  },
  args: {
    tagline: 'Exploring the Human Reference Atlas: A Comprehensive Guide.',
    imageSrc: 'assets/ui-images/placeholder.png',
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
};
export default meta;
type Story = StoryObj<GalleryCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <div style="max-width: 400px;">
      <hra-gallery-card
        [tagline]="tagline"
        [imageSrc]="imageSrc"
        [date]="date"
        [link]="link"
        [external]="external"
        [tags]="tags"
      >
      </hra-gallery-card>
    </div>
    `,
  }),
};
