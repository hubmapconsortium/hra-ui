import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { parse, ParseResult } from 'papaparse';

import { SetActiveNode, SetMapping, SetUri } from './medical-illustration.actions';
import { MedicalIllustrationModel } from './medical-illustration.model';

export type MedicalIllustrationContext = StateContext<MedicalIllustrationModel>;

@State<MedicalIllustrationModel>({
  name: 'medicalIllustration',
  defaults: {},
})
@Injectable()
export class MedicalIllustrationState {
  @Action(SetUri)
  setUri({ patchState }: MedicalIllustrationContext, { url }: SetUri) {
    patchState({ url });
  }

  @Action(SetActiveNode)
  setActiveNode({ patchState }: MedicalIllustrationContext, { node }: SetActiveNode) {
    patchState({ node });
  }

  @Action(SetMapping, { cancelUncompleted: true })
  setMapping({ patchState }: MedicalIllustrationContext, { url }: SetMapping): void {
    parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Record<string, string>>) => {
        patchState({ mapping: results.data });
      },
    });
  }
}
