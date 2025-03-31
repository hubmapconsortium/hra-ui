import { Meta, StoryObj } from '@storybook/angular';

import { ViewerCardComponent } from './viewer-card.component';

const meta: Meta = {
  component: ViewerCardComponent,
  title: 'Design System / Data Viewer / Viewer Card',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7648-8835&t=GQLse2MKnovHjLt3-4',
    },
  },
  args: {},
  render: (args) => ({ props: args }),
};
export default meta;
type Story = StoryObj<ViewerCardComponent>;

export const Primary: Story = {};
