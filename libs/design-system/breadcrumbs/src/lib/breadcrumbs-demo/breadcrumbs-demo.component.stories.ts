import { provideDesignSystem } from '../../../../src/lib/providers';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { BreadcrumbsDemoComponent } from './breadcrumbs-demo.component';
import { BreadcrumbsSizeDirective } from '../breadcrumbs-size/breadcrumbs-size.directive';

const meta: Meta = {
  title: 'Breadcrumbs',
  args: {
    size: 'large',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
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
      imports: [BreadcrumbsDemoComponent, BreadcrumbsSizeDirective],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <hra-breadcrumbs-demo hraBreadcrumbSize="${args['size']}"></hra-breadcrumbs-demo>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
