import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RichTooltipDirective } from './rich-tooltip.directive';

const meta: Meta<RichTooltipDirective> = {
  component: RichTooltipDirective,
  title: 'Design System/Tooltips/Rich Tooltip',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1720-14192', // TODO: replace with actual design URL
    },
  },
};
export default meta;
type Story = StoryObj<RichTooltipDirective>;

export const Default: Story = {
  args: {
    tagline: '',
  },
  render: (args) => ({
    props: args,
    styles: [],
    template: `
      <button mat-icon-button hraRichTooltip hraRichTooltipTagline="${args.tagline}">
        <mat-icon>info</mat-icon>
      </button>
    `,
  }),
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, ButtonsModule],
    }),
  ],
};
