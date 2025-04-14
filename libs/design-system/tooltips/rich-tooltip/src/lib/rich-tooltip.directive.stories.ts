import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RichTooltipDirective } from './rich-tooltip.directive';
import { RichTooltipContainerComponent, RichTooltipTaglineComponent } from './content/rich-tooltip-content.component';
import { RichTooltipModule } from './rich-tooltip.module';

const meta: Meta<RichTooltipDirective> = {
  // component: RichTooltipDirective,
  title: 'Design System/Tooltips/Rich Tooltip',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1720-14192', // TODO: replace with actual design URL
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, ButtonsModule, RichTooltipModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<RichTooltipDirective>;

export const Default: Story = {
  args: {
    tagline: 'Title',
    description: 'Supporting line text lorem ipsum dolor sit amet, consectetur',
    actionText: 'Action',
    actionClick: () => {},
  },
  argTypes: {
    actionClick: { type: 'function', control: false },
  },
  render: (args) => ({
    props: args,
    styles: [],
    template: `
        <button mat-icon-button
        hraRichTooltip
        hraRichTooltipTagline="${args.tagline}"
        hraRichTooltipDescription="${args.description}"
        hraRichTooltipActionText="${args.actionText}"
        (hraRichTooltipActionClick)="actionClick()">
          <mat-icon>info</mat-icon>
        </button>
      `,
  }),
};

export const CustomContent: Story = {
  render: (args) => ({
    props: args,
    styles: [
      `tag {
        background: black;
      }`,
    ],
    template: `
        <hra-rich-tooltip-container #content class="container">
          <hra-rich-tooltip-tagline>
            Hello Developer!
          </hra-rich-tooltip-tagline>
          <hra-rich-tooltip-content>
            This is some brand new component.
          </hra-rich-tooltip-content>
          <hra-rich-tooltip-actions>
            <button mat-button hraRichTooltipClose color="accent" hraRichTooltipClose>Close</button>
            <button mat-button color="accent">Do Nothing</button>
          </hra-rich-tooltip-actions>
        </hra-rich-tooltip-container>
        <button mat-icon-button [hraRichTooltip]="content">
            <mat-icon>info</mat-icon>
        </button>
      `,
  }),
};
