import { MatDividerModule } from '@angular/material/divider';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const content = 'Lorem Ipsum';

const meta: Meta = {
  title: 'MatDivider',
  decorators: [
    moduleMetadata({
      imports: [MatDividerModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Divider: Story = {
  args: {
    vertical: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <div class="container" [class.vertical]="${args['vertical']}">
      <div class="content before">${content}</div>
      <mat-divider vertical="${args['vertical']}"></mat-divider>
      <div class="content after">${content}</div>
    </div>
    `,
    styles: [
      `div.container {
        display: flex;
        flex-direction: column;
      }`,
      `div.container.vertical {
        flex-direction: row;
      }`,
      `div.container .content {
        margin: 8px;
      }`,
    ],
  }),
};
