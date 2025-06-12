import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DeprecatedWorkflowCardComponent } from './workflow-card.component';

const meta: Meta = {
  title: 'WorkflowCardComponent',
  decorators: [
    moduleMetadata({
      imports: [DeprecatedWorkflowCardComponent],
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
type Story = StoryObj<DeprecatedWorkflowCardComponent>;

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
        font: var(--mat-sys-display-small);
        letter-spacing: var(--mat-sys-display-small-tracking);
        color: var(--mat-sys-tertiary);
        background: var(--mat-sys-outline-variant);
      }`,
    ],
  }),
};
