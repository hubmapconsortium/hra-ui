import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HoverDirective } from './hover.directive';

export default {
  title: 'HoverDirective',
  decorators: [moduleMetadata({ imports: [HoverDirective] })],
} as Meta<HoverDirective>;

export const Primary: StoryObj<object> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="anchor" [hraHover]="content" [hraHoverData]="hraHoverData">Anchor element</div>
      <ng-template #content let-data>
        <div class="hover">
          {{ data }}
        </div>
      </ng-template>
    `,
    styles: [
      `
        .anchor, .hover {
          max-width: 400px;
        }
      `,
    ],
  }),
  args: {
    hraHoverData: 'Hovered Data',
  },
};
