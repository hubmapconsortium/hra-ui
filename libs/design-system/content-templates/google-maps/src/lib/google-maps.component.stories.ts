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
    mapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3093.095776349573!2d-86.52570008467531!3d39.17254333828355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886c66c6f37e689d%3A0xbf0b1d7c24bd0299!2sLuddy+Hall!5e0!3m2!1sen!2sus!4v1514920610609',
    alternateUrl: 'https://maps.app.goo.gl/PqeHqwZbFdU7KBWp8',
  },
};

export default meta;
type Story = StoryObj<GoogleMapsComponent>;

export const Default: Story = {};
