import { dispatchAction$ } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
import { LinkIds } from '@hra-ui/state';
import { Observable } from 'rxjs';
import { ftuPage } from './app.component';

/**
 * Factory for APP_INITIALIZER to initialize the application
 * @returns A initialization function
 */
export function initFactory(): () => Observable<unknown> {
  const dispatch = dispatchAction$();
  return () =>
    dispatch([
      new LinkRegistryActions.AddMany({
        [LinkIds.LandingPage]: {
          type: LinkType.Internal,
          commands: ['/'],
        },
        [ftuPage]: {
          type: LinkType.Internal,
          commands: ['ftu/'],
        },
      }),
    ]);
}
