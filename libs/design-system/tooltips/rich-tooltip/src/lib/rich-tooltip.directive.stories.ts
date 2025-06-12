import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RichTooltipDirective } from './rich-tooltip.directive';
import { RichTooltipModule } from './rich-tooltip.module';

const meta: Meta<RichTooltipDirective> = {
  // component: RichTooltipDirective,
  title: 'Design System/Tooltips/Rich Tooltip',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1782-202',
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

export const Simple: Story = {
  name: 'Simple Tooltip',
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
        (hraRichTooltipActionClick)="actionClick()">
          <mat-icon>info</mat-icon>
        </button>
      `,
  }),
};

export const SimpleWithAction: Story = {
  storyName: 'Simple Tooltip with Action',
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

export const AdvancedTooltip: Story = {
  storyName: 'Advanced Tooltip with Custom Content',
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
            <button mat-button color="accent" hraRichTooltipClose>Close</button>
            <button mat-button color="accent">Do Nothing</button>
          </hra-rich-tooltip-actions>
        </hra-rich-tooltip-container>
        <button mat-icon-button [hraRichTooltip]="content">
            <mat-icon>info</mat-icon>
        </button>
      `,
  }),
};
