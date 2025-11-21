import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { GalleryGridItemDirective } from './gallery-grid-item.directive';
import { GalleryGridComponent } from './gallery-grid.component';

const PICTURE_URL = 'assets/ui-images/placeholder.png';

const meta: Meta<GalleryGridComponent<number>> = {
  component: GalleryGridComponent,
  title: 'Design System/Gallery Grid',
  decorators: [
    moduleMetadata({
      imports: [GalleryGridComponent, GalleryGridItemDirective, ProfileCardComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<GalleryGridComponent<number>>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, pictureUrl: PICTURE_URL },
    template: `
      <hra-gallery-grid [dataSource]="dataSource">
        <hra-profile-card
          *hraGalleryGridItem="let item; let i = index"
          [name]="'Person ' + (i + 1)"
          [description]="'Description ' + (i + 1)"
          [pictureUrl]="pictureUrl"
        />
      </hra-gallery-grid>
    `,
  }),
  args: {
    dataSource: [1, 2, 3, 4, 5, 6],
  },
};
