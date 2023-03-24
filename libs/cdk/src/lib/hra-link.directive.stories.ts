import { RouterModule } from '@angular/router';
import { createLinkId, LinkRegistryActions, LinkRegistryModel, LinkRegistryState, LinkType } from '@hra-ui/cdk/state';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { LinkDirective } from './hra-link.directive';

const entries: LinkRegistryModel = {
  [createLinkId('Test')]: {
    url: 'https://google.com',
    target: '_blank',
    type: LinkType.External,
  },
  [createLinkId('Temp')]: {
    type: LinkType.Internal,
    commands: [''],
  },
};
export default {
  title: 'Cdk/LinkDirective',
  parameters: {
    state: {
      states: [LinkRegistryState],
      actions: [new LinkRegistryActions.AddMany(entries)],
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
  link: createLinkId('Temp'),
};

export const Anchor = Template('<a [hraLink]="link" >Anchor</a>');
Anchor.args = {
  link: createLinkId('Test'),
};
