import { MatDividerModule } from '@angular/material/divider';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
        font: vars.$body-medium;
        letter-spacing: vars.$body-medium-tracking;
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
