import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlCreationOptions, UrlTree } from '@angular/router';
import { dispatch } from '@hra-ui/cdk/injectors';
import { ActiveFtuActions } from '@hra-ui/state';

type ImplementedRouterMethods = 'navigate' | 'createUrlTree' | 'serializeUrl';
type RouterMethods = Pick<Router, ImplementedRouterMethods>;

@Injectable({ providedIn: 'root' })
export class SimpleRouter implements RouterMethods {
  private readonly setActive = dispatch(ActiveFtuActions.Load);

  navigate(commands: unknown[], extras?: NavigationExtras | undefined): Promise<boolean> {
    console.log('navigate', commands, extras);
    throw new Error('Method not implemented.');
  }
  createUrlTree(commands: unknown[], navigationExtras?: UrlCreationOptions | undefined): UrlTree {
    console.log('createTree', commands, navigationExtras);

    throw new Error('Method not implemented.');
  }
  serializeUrl(url: UrlTree): string {
    console.log('serialiseUrl', url);

    throw new Error('Method not implemented.');
  }
}
