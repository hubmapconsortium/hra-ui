import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MetadataLayoutDemoComponent } from './demo/metadata-layout-demo.component';
import { MetadataLayoutComponent } from './metadata-layout.component';

const meta: Meta<MetadataLayoutComponent> = {
  component: MetadataLayoutComponent,
  title: 'Design System/Layouts/Metadata',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2571-207', // TODO replace!
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MetadataLayoutDemoComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<hra-metadata-layout-demo />`,
  }),
};
export default meta;
type Story = StoryObj<MetadataLayoutComponent>;

export const Default: Story = {};
