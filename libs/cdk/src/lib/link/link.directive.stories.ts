import { Component, importProvidersFrom, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { createLinkId, LinkEntry, LinkId, LinkRegistryActions, LinkRegistryState, LinkType } from '@hra-ui/cdk/state';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { LinkDirective } from './link.directive';

@Component({
  selector: 'hra-internal-route',
  standalone: true,
  template: `<button [hraLink]="link">{{ label }}</button>`,
  imports: [LinkDirective],
})
class InternalRouteComponent {
  readonly route = inject(ActivatedRoute);
  readonly data = this.route.snapshot.data;
  readonly link: LinkId = this.data['link'];
  readonly label: string = this.data['label'];
}

const external = createLinkId('External');
const internal1 = createLinkId('Internal-1');
const internal2 = createLinkId('Internal-2');

const links: Record<LinkId, LinkEntry> = {
  [external]: {
    url: 'https://google.com',
    target: '_blank',
    type: LinkType.External,
  },
  [internal1]: {
    type: LinkType.Internal,
    commands: ['path2'],
  },
  [internal2]: {
    type: LinkType.Internal,
    commands: ['path1'],
  },
};

const routes: Routes = [
  {
    path: 'path1',
    component: InternalRouteComponent,
    data: {
      link: internal1,
      label: 'Go to path 2',
    },
  },
  {
    path: 'path2',
    component: InternalRouteComponent,
    data: {
      link: internal2,
      label: 'Go back to path 1',
    },
  },
  {
    path: '**',
    redirectTo: 'path1',
  },
];

export default {
  title: 'Cdk/LinkDirective',
  parameters: {
    state: {
      states: [LinkRegistryState],
      actions: [new LinkRegistryActions.AddMany(links)],
    },
  },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(RouterModule.forRoot(routes, { useHash: true }))],
    }),
    moduleMetadata({ imports: [RouterModule] }),
  ],
} as Meta<object>;

type Story = StoryObj<object>;

export const Anchor: Story = {
  render: (args) => ({
    props: args,
    template: '<a [hraLink]="link">Anchor</a>',
  }),
  decorators: [moduleMetadata({ imports: [LinkDirective] })],
  args: {
    link: createLinkId('External'),
  },
};

export const Button: Story = {
  render: (args) => ({
    props: args,
    template: `<router-outlet></router-outlet>`,
  }),
};
