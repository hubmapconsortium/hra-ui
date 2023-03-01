import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LabelBoxComponent } from './label-box.component';

export default {
  title: 'LabelBoxComponent',
  component: LabelBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
} as Meta<LabelBoxComponent>;

const Template =
  (content = ''): Story<LabelBoxComponent> =>
  (args) => ({
    props: args,
    template: `
    <hra-label-box>
      ${content}
    </hra-label-box>
  `,
    styles: [
      `
      hra-label-box {
        max-width: 400px;
      }
    `,
    ],
  });

export const Primary = Template('FTU Library');

export const WithIconAtEnd = Template(`
  Percentage of Cells in FTU
  <mat-icon class="end">info_outline</mat-icon>
`);
