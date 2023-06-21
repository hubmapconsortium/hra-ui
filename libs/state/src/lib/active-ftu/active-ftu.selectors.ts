import { Iri } from '@hra-ui/services';
import { Selector } from '@ngxs/store';
import { ActiveFtuModel, ActiveFtuState } from './active-ftu.state';

export class ActiveFtuSelectors {
  @Selector([ActiveFtuState])
  static isActive({ iri }: ActiveFtuModel): boolean {
    return iri !== undefined;
  }

  @Selector([ActiveFtuState])
  static iri({ iri }: ActiveFtuModel): Iri | undefined {
    return iri;
  }
}
