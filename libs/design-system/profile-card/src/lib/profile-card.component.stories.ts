import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { ProfileCardComponent } from './profile-card.component';

const meta: Meta<ProfileCardComponent> = {
  component: ProfileCardComponent,
  title: 'ProfileCardComponent',
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1720-14192',
    },
  },
  args: {
    alignment: 'left',
    pictureUrl: 'assets/ui-images/placeholder.png',
    name: 'Firstname Lastname',
    description: 'Occupation, Company',
    actionUrl: 'https://www.google.com/',
  },
  argTypes: {
    alignment: {
      control: 'select',
      options: ['left', 'center'],
    },
  },
};
export default meta;
type Story = StoryObj<ProfileCardComponent>;

export const Default: Story = {};
