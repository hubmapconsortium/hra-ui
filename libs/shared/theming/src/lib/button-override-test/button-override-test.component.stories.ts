import { MatButtonModule } from '@angular/material/button';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

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
export const Basic = Template(`<button mat-button [color]="palette" [disabled]="disabled">Button</button>`);
Basic.args = {
  palette: 'primary',
  disabled: false,
};

//Link
export const Link = Template(`<a mat-button tabindex="1" [color]="palette" [disabled]="disabled">Test</a>`);
Link.args = {
  palette: 'primary',
  disabled: false,
};
