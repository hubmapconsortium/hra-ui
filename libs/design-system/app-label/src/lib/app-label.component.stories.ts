import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { AppLabelComponent } from './app-label.component';
import { provideDesignSystem } from '@hra-ui/design-system';

const meta: Meta = {
  title: 'Design System/App Label',
  component: AppLabelComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=3096-78&p=f&t=4iCzFt0XtvPl1YYl-0',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppLabelComponent>;

export const Default: Story = {
  args: {
    tagline: 'Product Name',
    logo: 'apps',
    appStatus: 'Preview',
  },
};
