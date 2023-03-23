import { Selector } from '@ngxs/store';

import { MedicalIllustrationModel, MedicalIllustrationState } from './medical-illustration.state';

export class MedicalIllustrationSelectors {
  @Selector([MedicalIllustrationState])
  static getUrl(state: MedicalIllustrationModel): string | undefined {
    return state.url;
  }
}
