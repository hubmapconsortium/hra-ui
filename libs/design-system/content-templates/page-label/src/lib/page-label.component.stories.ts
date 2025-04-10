import { OrganLogoComponent } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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
  decorators: [
    moduleMetadata({
      imports: [ProductLogoComponent, OrganLogoComponent],
    }),
  ],
  args: {
    tagline: 'Page label',
  },
  argTypes: {
    includeLink: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    styles: ['.hra-app { margin: 0 2rem; }', 'ul { margin: 0;  margin-bottom: 1.5rem;}'],
  }),
};

export default meta;
type Story = StoryObj<PageLabelComponent>;

export const App: Story = {
  args: {
    app: 'ftu',
  },
};

export const Organ: Story = {
  args: {
    organ: 'bladder',
  },
};

export const WebsiteCategory: Story = {
  args: {
    category: 'data',
  },
};

export const Multiple: Story = {
  args: {
    app: 'ftu',
    organ: 'bladder',
  },
};
