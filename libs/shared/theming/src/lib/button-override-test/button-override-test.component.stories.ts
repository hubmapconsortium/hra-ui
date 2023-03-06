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
export const Basic = Template(`<button mat-button color="primary">Test</button>`);
export const Basic_Secondary = Template(`<button mat-stroked-button color="primary">Test</button>`);
//export const Raised = Template(`<button mat-raised-button>Test</button>`)
export const Link = Template(`<a mat-button>Test</a>`);
//export const Disabled = Template(`<button mat-button disabled>Test</button>`)

//On Hover
export const Hover = Template(`<button mat-button [ngClass]=" 'hover' " color="primary">Test</button>`);
export const Hover_Secondary = Template(
  `<button mat-stroked-button [ngClass]=" 'hover' " color="primary">Test</button>`
);
export const Hover_Link = Template(`<a mat-button [ngClass]= " 'hover-link' ">Test</a>`);
