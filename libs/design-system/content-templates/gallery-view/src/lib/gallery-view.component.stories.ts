import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { GalleryItem, GalleryViewComponent } from './gallery-view.component';

const PICTURE_URL = 'assets/ui-images/placeholder.png';

const GALLERY_CARDS: GalleryItem[] = [
  {
    name: 'A',
    imageSrc: PICTURE_URL,
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
  {
    name: 'AB',
    imageSrc: PICTURE_URL,
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA', 'Test'],
  },
  {
    name: 'ABC',
    imageSrc: PICTURE_URL,
    date: 'June 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA', 'Label'],
  },
  {
    name: 'ABCD',
    imageSrc: PICTURE_URL,
    date: 'May 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['HRA'],
  },
  {
    name: 'ABCDE',
    imageSrc: PICTURE_URL,
    date: 'April 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
];

const PROFILE_CARDS = [
  {
    name: 'Katy Börner',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Faculty, Center Director',
    actionText: 'Learn more',
  },
  {
    name: 'Andreas Bueckle',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Research Lead, Faculty',
    actionText: 'Learn more',
  },
  {
    name: 'Bruce W. Herr II',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Technical Director',
    actionText: 'Learn more',
  },
  {
    name: 'Lisel Record',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Associate Director',
    actionText: 'Learn more',
  },
  {
    name: 'Daniel Bolin',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Senior Software Developer',
    actionText: 'Learn more',
  },
  {
    name: 'Mike Gallant',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Assistant Director of IT',
    actionText: 'Learn more',
  },
  {
    name: 'Michael Ginda',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Senior Research Analyst',
    actionText: 'Learn more',
  },
  {
    name: 'Yashvardhan Jain',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Research Software Engineer - Machine Learning',
    actionText: 'Learn more',
  },
];

const meta: Meta = {
  title: 'Design System/Content Templates/Gallery View',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12642-57693&t=Hhug8Q6yf6QcFAL9-4',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [GalleryViewComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
        <button (click)="gallery.sidenav().toggle()">Toggle</button>
        <hra-gallery-view [galleryCards]="galleryCards" [variant]="variant" #gallery/>
    `,
    styles: [
      `.hra-app {
        height: calc(100vh - 3rem);
      }
        button {
          position: absolute;
          right: 0;
          z-index: 2;
      }`,
    ],
  }),
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  args: {
    galleryCards: GALLERY_CARDS,
    variant: 'gallery',
  },
};

export const Profile: Story = {
  args: {
    galleryCards: PROFILE_CARDS,
    variant: 'profile',
  },
};
