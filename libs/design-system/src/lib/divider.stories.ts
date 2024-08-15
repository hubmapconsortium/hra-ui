import { MatDividerModule } from '@angular/material/divider';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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
    <div style="height: 10rem">
        <mat-divider vertical=${args['vertical']}></mat-divider>
    </div>
    `,
  }),
};
