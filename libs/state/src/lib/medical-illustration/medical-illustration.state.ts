import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { NodeHover, SaveUrl } from './medical-illustration.actions';

export interface MedicalIllustrationModel {
  url?: string;
  node?: string;
}

export type MedicalIllustrationContext = StateContext<MedicalIllustrationModel>;

@State<MedicalIllustrationModel>({
  name: 'medicalIllustration',
  defaults: {},
})
@Injectable()
export class MedicalIllustrationState {
  @Action(SaveUrl)
  saveUrl({ setState }: MedicalIllustrationContext, { url }: SaveUrl) {
    setState({ url });
  }

  @Action(NodeHover)
  nodeHover({ patchState }: MedicalIllustrationContext, { node }: NodeHover) {
    patchState({ node });
  }
}
