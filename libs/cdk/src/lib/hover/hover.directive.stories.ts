import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HoverDirective } from './hover.directive';

export default {
  title: 'HoverDirective',
  decorators: [
    moduleMetadata({
      imports: [HoverDirective, MatIconModule],
    }),
  ],
} as Meta<HoverDirective>;

const Template: Story<HoverDirective> = (args) => ({
  props: args,
  template: `
    <div class="anchor" [hraHover]="content">Anchor element</div>
    <ng-template #content>
      <div class="hover">
        Hover content
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
