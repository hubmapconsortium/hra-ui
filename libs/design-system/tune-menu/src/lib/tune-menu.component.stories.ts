import { type Meta, type StoryObj } from '@storybook/angular';

import { TuneMenuComponent } from './tune-menu.component';

const meta: Meta<TuneMenuComponent> = {
  component: TuneMenuComponent,
  title: 'Design System / Tune Menu',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12494-166042&t=U6WxS9uCkPILoojn-4',
    },
  },
};
export default meta;
export const Primary: StoryObj<TuneMenuComponent> = {
  render: () => ({
    styles: [
      `.hra-app {
          margin: -1rem;
          height: 100vh;
      }`,
    ],
  }),
};
