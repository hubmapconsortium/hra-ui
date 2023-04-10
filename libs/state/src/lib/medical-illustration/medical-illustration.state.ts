import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { parse } from 'papaparse';
import { map, Observable } from 'rxjs';

import { SetActiveNode, SetMapping, SetUri } from './medical-illustration.actions';
import { MedicalIllustrationModel, MapEntry } from './medical-illustration.model';

export type MedicalIllustrationContext = StateContext<MedicalIllustrationModel>;

@State<MedicalIllustrationModel>({
  name: 'medicalIllustration',
  defaults: {},
})
@Injectable()
export class MedicalIllustrationState {
  private readonly http = inject(HttpClient);

  @Action(SetUri)
  setUri({ setState }: MedicalIllustrationContext, { url }: SetUri) {
    setState({ url: url, node: undefined });
  }

  @Action(SetActiveNode)
  setActiveNode({ patchState }: MedicalIllustrationContext, { node }: SetActiveNode) {
    patchState({ node });
  }

  @Action(SetMapping, { cancelUncompleted: true })
  setMapping({ patchState }: MedicalIllustrationContext, { url }: SetMapping): Observable<void> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((result) => {
        const parsedResult = parse(result, { header: true }).data as MapEntry[];
        patchState({ mapping: parsedResult });
      })
    );
  }
}
