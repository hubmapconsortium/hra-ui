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
  });

//Basic button
export const Basic = Template(`<button mat-button [color]="palette" [disabled]="disabled">Button</button>`);
Basic.args = {
  palette: 'primary',
  disabled: false,
};

//Secondary button
export const Secondary = Template(`<button mat-button [color]="palette" [disabled]="disabled">Button</button>`);
Secondary.args = {
  palette: 'accent',
  disabled: false,
};

//Link
export const Link = Template(`<a mat-button tabindex="1" [color]="palette" [disabled]="disabled">Test</a>`);
Link.args = {
  palette: 'primary',
  disabled: false,
};
