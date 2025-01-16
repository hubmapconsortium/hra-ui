import { provideDesignSystem } from '@hra-ui/design-system';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { BackBarComponent } from './back-bar.component';

const meta: Meta<BackBarComponent> = {
  component: BackBarComponent,
  title: 'BackBarComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1819-14983',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};

export default meta;
type Story = StoryObj<BackBarComponent>;

export const Primary: Story = {
  args: {},
};
