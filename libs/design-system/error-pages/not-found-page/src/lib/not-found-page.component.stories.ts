import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ErrorPagesModule } from '@hra-ui/design-system/error-pages';

const meta: Meta = {
  title: 'Design System/Error Pages/Not Found Page',
  decorators: [
    moduleMetadata({
      imports: [ErrorPagesModule],
    }),
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <hra-not-found-page></hra-not-found-page>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
