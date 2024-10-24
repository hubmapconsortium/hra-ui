import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { WorkflowCardComponent } from './workflow-card.component';

const meta: Meta = {
  title: 'WorkflowCardComponent',
  decorators: [
    moduleMetadata({
      imports: [WorkflowCardComponent],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Explorer-Components?node-id=1286-4',
    },
  },
};
export default meta;
type Story = StoryObj<WorkflowCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <hra-workflow-card>
      <div>HEADER</div>
      <div>placeholder row content</div>
      <div>placeholder row content</div>
      <div>placeholder row content</div>
      <div>placeholder row content</div>
    </hra-workflow-card>
    `,
    styles: [
      `div {
        height: 3rem;
        text-align: center;
        font: var(--sys-display-small);
        letter-spacing: var(--sys-display-small-tracking);
        color: var(--sys-tertiary);
        background: var(--sys-outline-variant);
      }`,
    ],
  }),
};
