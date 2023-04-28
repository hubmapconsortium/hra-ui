import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { parse } from 'papaparse';
import { map, Observable } from 'rxjs';
import { SetActiveNode, SetMapping, SetUri, SetUriFromIRI } from './medical-illustration.actions';
import { MapEntry, MedicalIllustrationModel } from './medical-illustration.model';

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

  /**
   * Sets uri by finding it from reference organs
   * @param param0 state context
   * @param param1 Action object with iri
   */
  @Action(SetUriFromIRI)
  setUriFromIRI({ patchState, getState }: MedicalIllustrationContext, { iri }: SetUriFromIRI) {
    const referenceOrgans = getState().referenceOrgans;
    const ref = referenceOrgans?.find((ref) => ref.representation_of === iri);
    if (ref === undefined) {
      throw new Error('Reference organ with match iri not found');
    }
    patchState({ url: ref.object.file });
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
