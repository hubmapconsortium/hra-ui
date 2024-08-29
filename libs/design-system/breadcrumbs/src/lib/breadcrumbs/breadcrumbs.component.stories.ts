import { provideDesignSystem } from '../../../../src/lib/providers';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsSizeDirective } from '../breadcrumbs-size/breadcrumbs-size.directive';

const meta: Meta = {
  title: 'Breadcrumbs',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=892-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [BreadcrumbsComponent, BreadcrumbsSizeDirective],
    }),
  ],
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-breadcrumbs hraBreadcrumbSize="${args['size']}"></hra-breadcrumbs>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
