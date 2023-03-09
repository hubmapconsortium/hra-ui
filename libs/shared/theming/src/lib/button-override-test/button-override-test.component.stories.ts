import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';

export default {
  title: 'ButtonOverrideTest',
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule],
    }),
  ],
} as Meta<object>;

const Template =
  (template: string): Story<object> =>
  (args: object) => ({
    props: args,
    template,
    styles: [
      `
      button, a {
        width: 200px;
      }
    `,
    ],
  });

//Basic button
export const Basic = Template(`<button mat-button [color]="palette" [disabled]="disabled">Test</button>`);
Basic.args = {
  palette: 'primary',
  disabled: false,
};
//export const Link = Template(`<a mat-button>Test</a>`);
