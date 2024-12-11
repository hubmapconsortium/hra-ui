import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { WorkflowCardV2Component } from './workflow-card-v2.component';

const meta: Meta = {
  title: 'WorkflowCardV2Component',
  decorators: [
    moduleMetadata({
      imports: [WorkflowCardV2Component],
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
type Story = StoryObj<WorkflowCardV2Component>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <hra-workflow-card title="Title" [step]="1">
      <div class="placeholder">placeholder row content</div>
      <div class="placeholder">placeholder row content</div>
      <div class="placeholder">placeholder row content</div>
      <div class="placeholder">placeholder row content</div>
    </hra-workflow-card>
    `,
    styles: [
      `.placeholder {
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
