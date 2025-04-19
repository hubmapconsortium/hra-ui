import { Meta, StoryObj } from '@storybook/angular';
import { getOrganLogoIds, OrganLogoComponent } from './organ-logo.component';

const sortedIds = [...getOrganLogoIds()].sort((a, b) => a.localeCompare(b));

const meta: Meta<OrganLogoComponent> = {
  component: OrganLogoComponent,
  title: 'Design System/Brand/Organ Logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1116-9161',
    },
  },
  argTypes: {
    id: {
      control: 'select',
      options: sortedIds,
    },
  },
  args: {
    id: sortedIds[0],
  },
};
export default meta;
type Story = StoryObj<OrganLogoComponent>;

export const Default: Story = {};
