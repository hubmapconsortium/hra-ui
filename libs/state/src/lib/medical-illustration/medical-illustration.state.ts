import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TissueFtuService } from '@hra-ui/services';
import { Action, State, StateContext } from '@ngxs/store';
import { parse } from 'papaparse';
import { Observable, tap } from 'rxjs';
import { LoadReferenceOrgans, SetActiveNode, SetMapping, SetUri, SetUriFromIRI } from './medical-illustration.actions';
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

  /** Ftu service */
  private readonly ftuService = inject(TissueFtuService);

  /**
   * Sets illustration URI
   */
  @Action(SetUri)
  setUri({ patchState }: MedicalIllustrationContext, { url }: SetUri): void {
    patchState({ url: url, node: undefined });
  }

  /**
   * Sets uri by finding it from reference organs
   * @param param0 state context
   * @param param1 Action object with iri
   */
  @Action(SetUriFromIRI)
  setUriFromIRI({ patchState, getState }: MedicalIllustrationContext, { iri }: SetUriFromIRI): void {
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
  setActiveNode({ patchState }: MedicalIllustrationContext, { node }: SetActiveNode): void {
    patchState({ node });
  }

  /**
   * Parses and sets mapping info
   */
  @Action(SetMapping, { cancelUncompleted: true })
  setMapping({ patchState }: MedicalIllustrationContext, { url }: SetMapping): Observable<unknown> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult = parse<MapEntry>(result, { header: true }).data;
        patchState({ mapping: parsedResult });
      })
    );
  }

  /** Loads reference organs */
  @Action(LoadReferenceOrgans)
  loadReferenceOrgans({ patchState }: MedicalIllustrationContext): Observable<unknown> {
    return this.ftuService.getReferenceOrgans().pipe(tap((referenceOrgans) => patchState({ referenceOrgans })));
  }
}
