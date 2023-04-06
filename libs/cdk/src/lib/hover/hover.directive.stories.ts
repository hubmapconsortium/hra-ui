import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HoverDirective } from './hover.directive';

export default {
  title: 'HoverDirective',
  decorators: [
    moduleMetadata({
      imports: [HoverDirective],
    }),
  ],
} as Meta<HoverDirective>;

const Template: Story<{ hraHoverData: unknown }> = (args) => ({
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
});

export const Primary = Template.bind({});
Primary.args = {
  hraHoverData: 'Hovered Data',
};
