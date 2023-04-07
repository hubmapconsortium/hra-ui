import { Selector } from '@ngxs/store';

import { MedicalIllustrationModel } from './medical-illustration.model';
import { MedicalIllustrationState } from './medical-illustration.state';

export class MedicalIllustrationSelectors {
  @Selector([MedicalIllustrationState])
  static url(state: MedicalIllustrationModel): string | undefined {
    return state.url;
  }

  @Selector([MedicalIllustrationState])
  static mapping(state: MedicalIllustrationModel): Record<string, string>[] | undefined {
    return state.mapping;
  }
}
