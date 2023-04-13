import { Selector } from '@ngxs/store';

import { MapEntry, MedicalIllustrationModel } from './medical-illustration.model';
import { MedicalIllustrationState } from './medical-illustration.state';

/**
 * Selectors for medical illustration
 */
export class MedicalIllustrationSelectors {
  /**
   * Returns illustration url
   */
  @Selector([MedicalIllustrationState])
  static url(state: MedicalIllustrationModel): string | undefined {
    return state.url;
  }

  /**
   * Returns current mapping file
   */
  @Selector([MedicalIllustrationState])
  static mapping(state: MedicalIllustrationModel): MapEntry[] {
    return state.mapping ?? [];
  }
}
