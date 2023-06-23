import { Iri } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { ActiveFtuModel, ActiveFtuState } from './active-ftu.state';

/** selectors for ActiveftuState */
export class ActiveFtuSelectors {
  /** checks if the Iri is set */
  @Selector([ActiveFtuState])
  static isActive({ iri }: ActiveFtuModel): boolean {
    return iri !== undefined;
  }

  /** gets the iri from the ActiveFtuModel */
  @Selector([ActiveFtuState])
  static iri({ iri }: ActiveFtuModel): Iri | undefined {
    return iri;
  }
}
