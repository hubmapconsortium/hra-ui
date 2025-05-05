import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TableOfContentsDemoComponent } from './demo/table-of-contents-demo.component';
import { TableOfContentsComponent } from './table-of-contents.component';

const meta: Meta<TableOfContentsDemoComponent> = {
  component: TableOfContentsComponent,
  title: 'Design System/Navigation/Table of Contents',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2571-207',
    },
  },
  argTypes: {
    activeSection: {
      type: 'number',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableOfContentsDemoComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<hra-table-of-contents-demo activeSection="${args.activeSection}" />`,
  }),
};
export default meta;
type Story = StoryObj<TableOfContentsDemoComponent>;

export const Default: Story = {};
