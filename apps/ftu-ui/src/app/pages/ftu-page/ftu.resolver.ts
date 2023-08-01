import { ResolveFn } from '@angular/router';
import { dispatch } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { LinkIds } from '@hra-ui/state';
import { EMPTY } from 'rxjs';

/**
 * Resolve data for the 'id' query parameter or navigate to the landing page on failures
 */
export const ftuResolver: ResolveFn<unknown> = (route) => {
  const navigateHome = dispatch(LinkRegistryActions.Navigate, LinkIds.LandingPage);
  const id = route.queryParamMap.get('id');

  if (!id) {
    navigateHome();
    return EMPTY;
  }

  return id;
};
