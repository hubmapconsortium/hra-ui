import { Meta, StoryObj } from '@storybook/angular';
import { PageLabelComponent } from './page-label.component';

const meta: Meta<PageLabelComponent> = {
  component: PageLabelComponent,
  title: 'Design System/Content Templates/Page Label',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2769-16877',
    },
  },
  args: {
    tagline: 'Page label',
    anchor: 'page-label',
  },
  render: (args) => ({
    props: args,
    styles: ['.hra-app { margin: 0 2rem; }', 'ul { margin: 0;  margin-bottom: 1.5rem;}'],
  }),
};

export default meta;
type Story = StoryObj<PageLabelComponent>;

export const Default: Story = {
  args: {
    icons: 'product:ftu',
  },
};

export const MultipleIcons: Story = {
  args: {
    icons: ['product:ftu', 'organ:bladder'],
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    icons: 'product:ftu',
    breadcrumbs: [{ name: 'Home', route: '/' }, { name: 'Label', route: '/label' }, { name: 'Label' }],
  },
};

export const WithDate: Story = {
  args: {
    icons: 'product:ftu',
    date: 'October 2, 2025',
  },
};

export const WithTags: Story = {
  args: {
    icons: 'product:ftu',
    tags: ['Label', 'Label', 'Label', 'Label', 'Label'],
  },
};

export const Complete: Story = {
  args: {
    icons: ['product:ftu', 'organ:bladder'],
    breadcrumbs: [{ name: 'Home', route: '/' }, { name: 'Label', route: '/label' }, { name: 'Label' }],
    date: 'October 2, 2025',
    tags: ['Label', 'Label', 'Label', 'Label', 'Label'],
  },
};
