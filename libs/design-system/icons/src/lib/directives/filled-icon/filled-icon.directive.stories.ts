import { MatIconModule } from '@angular/material/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FilledIconDirective } from './filled-icon.directive';

const meta: Meta<FilledIconDirective> = {
  component: FilledIconDirective,
  title: 'Design System/Icons/Filled Icons',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1116-9161&t=b2TwVfIaWdjOX6Pt-1',
    },
  },
  args: {
    color: '#ff0043',
  },
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<FilledIconDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mat-icon hraFilledIcon="${args.color}">
        publish
      </mat-icon>
    `,
  }),
};
