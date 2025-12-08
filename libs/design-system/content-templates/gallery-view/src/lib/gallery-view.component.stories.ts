import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { GalleryViewComponent } from './gallery-view.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';

const PICTURE_URL = 'assets/ui-images/placeholder.png';

const meta: Meta = {
  title: 'Design System/Content Templates/Gallery View',
  decorators: [
    moduleMetadata({
      imports: [GalleryViewComponent, ButtonsModule, CardsModule],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12642-57693&t=Hhug8Q6yf6QcFAL9-4',
    },
  },
};

export default meta;
type Story = StoryObj;

export const ProfileCard: Story = {
  args: { dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  render: (args) => ({
    props: { ...args, pictureUrl: PICTURE_URL },
    template: `
      <hra-gallery-view>
        @for (i of dataSource; track i) {
          <hra-profile-card
            [name]="'Person ' + (i + 1)"
            [description]="'Description ' + (i + 1)"
            [pictureUrl]="pictureUrl"
          />
        }
      </hra-gallery-view>
    `,
  }),
};

export const GalleryCard: Story = {
  args: { dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  render: (args) => ({
    props: { ...args, pictureUrl: PICTURE_URL },
    template: `
      <hra-gallery-view>
        @for (i of dataSource; track i) {
          <hra-gallery-card
            [imageSrc]="pictureUrl"
            date="September 20, 2025"
            tagline="Card tagline that is less than 100 characters or truncated."
            [tags]="['Label', 'Longer label']"
            link="https://google.com"
          ></hra-gallery-card>
        }
      </hra-gallery-view>
    `,
  }),
};
