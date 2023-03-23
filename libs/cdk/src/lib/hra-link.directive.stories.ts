import { RouterModule } from '@angular/router';
import { createLinkId, LinkRegistryState } from '@hra-ui/cdk/state';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LinkDirective } from './hra-link.directive';

export default {
  title: 'Cdk/LinkDirective',
  parameters: {
    state: {
      states: [LinkRegistryState],
      actions: [],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [LinkDirective, RouterModule.forRoot([], { useHash: true })],
    }),
  ],
} as Meta<object>;

const Template =
  (template: string): Story<object> =>
  (args) => ({
    props: args,
    template,
  });

export const Button = Template(`<button [hraLink]="link">Button</button>`);
Button.args = {
  link: createLinkId('Test'),
};

export const Anchor = Template('<a [hraLink]="link" >Anchor</a>');
Anchor.args = {
  link: createLinkId('temp'),
};
