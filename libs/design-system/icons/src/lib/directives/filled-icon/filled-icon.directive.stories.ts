import { MatIconModule } from '@angular/material/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FilledIconDirective } from './filled-icon.directive';
import { configureSvgIconNamespace } from '../../svg-icons/namespace.service';

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
    fillColor: '#ff0043',
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
      <mat-icon hraFilledIcon [fillColor]="fillColor">
        publish
      </mat-icon>
    `,
  }),
};

export const ColorFromConfig: Story = {
  render: (args) => ({
    applicationConfig: {
      providers: [
        configureSvgIconNamespace({
          namespace: 'organ',
          directory: 'assets/brand/organ-logos',
          color: '#ffffff',
          fillColor: args.fillColor,
        }),
      ],
    },
    props: args,
    template: `
      <mat-icon hraFilledIcon svgIcon="organ:brain">
      </mat-icon>
    `,
  }),
};
