import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { WorkflowCardComponent } from './workflow-card.component';

const meta: Meta = {
  title: 'WorkflowCardV2Component',
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
        font: var(--mat-sys-display-small);
        letter-spacing: var(--mat-sys-display-small-tracking);
        color: var(--mat-sys-tertiary);
        background: var(--mat-sys-outline-variant);
      }`,
    ],
  }),
};
