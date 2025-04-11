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
  },
  render: (args) => ({
    props: args,
    styles: [],
    template: `
        <button mat-icon-button
        hraRichTooltip
        hraRichTooltipTagline="${args.tagline}"
        hraRichTooltipDescription="${args.description}"
        hraRichTooltipActionText="${args.actionText}">
          <mat-icon>info</mat-icon>
        </button>
      `,
  }),
};

export const CustomContent: Story = {
  render: (args) => ({
    props: args,
    styles: [],
    template: `
        <hra-rich-tooltip-container #content>
          <hra-rich-tooltip-tagline>
            Hello
          </hra-rich-tooltip-tagline>
          <div class="tooltip-content">
            <div class="tagline">Custom Content Title</div>
            <div class="description">Custom Content Description</div>
          </div>
          <hra-rich-tooltip-actions>
            <button mat-button hraRichTooltipClose color="accent" hraRichTooltipClose>Action 1</button>
            <button mat-button color="accent">Action 2</button>
          </hra-rich-tooltip-actions>
        </hra-rich-tooltip-container>
        <button mat-icon-button [hraRichTooltip]="content">
            <mat-icon>info</mat-icon>
        </button>
      `,
  }),
};
