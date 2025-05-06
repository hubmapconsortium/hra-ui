import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TableOfContentsLayoutDemoComponent } from './demo/table-of-contents-layout-demo.component';
import { TableOfContentsLayoutComponent } from './table-of-contents-layout.component';

const meta: Meta<TableOfContentsLayoutComponent> = {
  component: TableOfContentsLayoutComponent,
  title: 'Design System/Layouts/Table of Contents',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2571-207', // TODO replace!
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableOfContentsLayoutDemoComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<hra-table-of-contents-layout-demo />`,
  }),
};
export default meta;
type Story = StoryObj<TableOfContentsLayoutComponent>;

export const Default: Story = {};
