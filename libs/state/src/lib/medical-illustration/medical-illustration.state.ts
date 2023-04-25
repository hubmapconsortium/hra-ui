import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { parse } from 'papaparse';
import { map, Observable } from 'rxjs';

import { SetActiveNode, SetMapping, SetUri, SetUriFromIRI } from './medical-illustration.actions';
import { MedicalIllustrationModel, MapEntry } from './medical-illustration.model';

export type MedicalIllustrationContext = StateContext<MedicalIllustrationModel>;

/**
 * State handling medical illustrations
 */
@State<MedicalIllustrationModel>({
  name: 'medicalIllustration',
  defaults: {},
})
@Injectable()
export class MedicalIllustrationState {
  /**
   * Http client
   */
  private readonly http = inject(HttpClient);

  /**
   * Sets illustration URI
   */
  @Action(SetUri)
  setUri({ setState }: MedicalIllustrationContext, { url }: SetUri) {
    setState({ url: url, node: undefined });
  }

  @Action(SetUriFromIRI)
  setUriFromIRI({ patchState, getState }: MedicalIllustrationContext, { iri }: SetUriFromIRI) {
    const referenceOrgans = getState().referenceOrgans;
    if (referenceOrgans?.length) {
      referenceOrgans.forEach((ref) => {
        if (ref.representation_of === iri) {
          patchState({ url: ref.object.file });
          return;
        }
      });
    }
  }

  /**
   * Sets active node
   */
  @Action(SetActiveNode)
  setActiveNode({ patchState }: MedicalIllustrationContext, { node }: SetActiveNode) {
    patchState({ node });
  }

  /**
   * Parses and sets mapping info
   */
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
