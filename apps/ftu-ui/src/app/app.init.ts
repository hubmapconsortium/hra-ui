import { dispatchAction$ } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions, LinkType, ResourceRegistryActions } from '@hra-ui/cdk/state';
import { LinkIds, MedicalIllustrationActions, TissueLibraryActions } from '@hra-ui/state';
import { Observable } from 'rxjs';

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
      }),

      new LinkRegistryActions.LoadFromYaml('assets/links.yml'),
      new ResourceRegistryActions.LoadFromYaml('assets/resources.yml'),
      new TissueLibraryActions.Load(),
      new MedicalIllustrationActions.LoadReferenceOrgans(),
      new MedicalIllustrationActions.SetMapping('assets/TEMP/mapping.csv'),
    ]);
}
