import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Add, AddMany, NavigateToInternalLink } from './link-registry.actions';
import { LinkRegistryContext, LinkRegistryModel } from './link-registry.model';

@State<LinkRegistryModel>({
  name: 'linkRegistry',
  defaults: {},
})
@Injectable()
export class LinkRegistryState {
  private router = inject(Router);

  @Action(Add)
  addOne(ctx: LinkRegistryContext, { id, entry }: Add): void {
    this.addMany(ctx, new AddMany({ [id]: entry }));
  }

  @Action(AddMany)
  addMany(ctx: LinkRegistryContext, { entries }: AddMany): void {
    ctx.patchState(entries);
  }

  @Action(NavigateToInternalLink)
  navigateToInternalLink(
    ctx: LinkRegistryContext,
    { commands, extras, queryParams }: NavigateToInternalLink
  ): Observable<unknown> {
    return ctx.dispatch(new Navigate(typeof commands === 'string' ? [commands] : commands, queryParams, extras));
  }
}
