import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { SaveUrl } from './medical-illustration.actions';

export interface MedicalIllustrationModel {
  url?: string;
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
}
