import { Meta, StoryObj } from '@storybook/angular';
import { GoogleMapsComponent } from './google-maps.component';

const meta: Meta<GoogleMapsComponent> = {
  component: GoogleMapsComponent,
  title: 'Design System/Content Templates/Google Maps',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=5311-898',
    },
  },
  args: {
    lat: 39.172,
    lng: -86.523,
    zoom: 17,
  },
};

export default meta;
type Story = StoryObj<GoogleMapsComponent>;

export const Default: Story = {};
