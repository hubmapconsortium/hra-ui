import { inject, Injectable } from '@angular/core';
import { SpatialEntity, SpatialSceneNode, V1Service } from '@hra-api/ng-client';
import { GlobalConfigState } from 'ccf-shared';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { GlobalConfig } from '../../../app.component';
import { FEMALE_SKIN_URL, HIGHLIGHT_YELLOW, MALE_SKIN_URL, SPATIAL_ENTITY_URL } from '../../constants';
import { hightlight } from '../../highlight.operator';
import { zoomTo } from '../../zoom-to.operator';

/** Service for getting a filtered scene */
@Injectable({
  providedIn: 'root',
})
export class FilteredSceneService {
  /** Global config */
  private readonly configState: GlobalConfigState<GlobalConfig> = inject(GlobalConfigState);
  /** Api service */
  private readonly api = inject(V1Service);

  /** User data */
  readonly data$ = this.configState.getOption('data');
  /** ZoomTo id */
  readonly zoomToID$ = this.configState.getOption('zoomToID').pipe(map((id) => `http://purl.org/ccf/1.5/entity/${id}`));
  /** Highlight id */
  readonly highlightID$ = this.configState
    .getOption('highlightID')
    .pipe(map((id) => `http://purl.org/ccf/1.5/entity/${id}`));

  /** Reference organs */
  readonly referenceOrgans$ = this.api.referenceOrgans({});

  /** Scene nodes */
  readonly scene$ = combineLatest([this.data$, this.referenceOrgans$]).pipe(
    switchMap(([data, referenceOrgans]) => this.chooseScene(data, referenceOrgans)),
  );

  /** Organs */
  readonly organs$ = this.configState.getOption('data').pipe(
    map((data) => this.selectOrgans(data)),
    shareReplay(1),
  );

  /** Filtered organs */
  readonly filteredOrgans$ = combineLatest([this.organs$, this.referenceOrgans$]).pipe(
    map(([organs, referenceOrgans]) => this.getNeededReferenceOrgans(referenceOrgans, organs)),
    shareReplay(1),
  );

  /** Filtered scene */
  readonly filteredScene$ = combineLatest([this.scene$, this.organs$, this.referenceOrgans$]).pipe(
    map(([nodes, organs, referenceOrgans]) => this.filterSceneNodes(nodes, organs, referenceOrgans)),
    hightlight(this.highlightID$, HIGHLIGHT_YELLOW),
    zoomTo(this.zoomToID$),
    shareReplay(1),
  );

  /** Selects a scene based on the organs */
  private chooseScene(data?: JsonLdObj[], organs?: SpatialEntity[]): Observable<SpatialSceneNode[]> {
    const organUrls = data?.map(this.getPlacementTarget) ?? [];
    const uniqueOrganUrls = new Set(organUrls);

    if (uniqueOrganUrls.size > 1) {
      return this.api.scene({});
    } else if (organs) {
      const organ = organs.find((tempOrgan) => tempOrgan['@id'] === organUrls[0]);
      if (organ) {
        return this.api.referenceOrganScene({
          organIri: organ.representation_of ?? '',
          ontologyTerms: [organ.reference_organ ?? ''],
          sex: organ.sex as 'male' | 'female' | 'both' | undefined,
        });
      }
    }
    return of([]);
  }

  /** Selects organ placement targets */
  private selectOrgans(data: JsonLdObj[] | undefined): Set<string> {
    return new Set(data?.map(this.getPlacementTarget)) as Set<string>;
  }

  /** Filters the scene based on the organs */
  private filterSceneNodes(
    nodes: SpatialSceneNode[],
    organs: Set<string>,
    referenceOrgans: SpatialEntity[],
  ): SpatialSceneNode[] {
    const neededReferenceOrgans = this.getNeededReferenceOrgans(referenceOrgans, organs);
    const neededSkins = this.getNeededSkins(neededReferenceOrgans);
    const neededOrgans = new Set([...organs, ...neededSkins]);
    return nodes.filter((node) => !node.reference_organ || neededOrgans.has(node.reference_organ));
  }

  /** Get the needed reference organs */
  private getNeededReferenceOrgans(referenceOrgans: SpatialEntity[], organs: Set<string>): SpatialEntity[] {
    return referenceOrgans.filter((organ) => organs.has(organ.reference_organ ?? ''));
  }

  /** Get the needed skin scene nodes */
  private getNeededSkins(organs: SpatialEntity[]): string[] {
    if (organs.length === 1) {
      return [];
    }

    const skins = new Set<string>();
    organs.forEach((organ) => {
      if (organ.sex === 'Female') {
        skins.add(FEMALE_SKIN_URL);
      } else if (organ.sex === 'Male') {
        skins.add(MALE_SKIN_URL);
      }
    });

    return [...skins];
  }

  /** Get the placement target for an organ */
  private getPlacementTarget(this: never, obj: JsonLdObj): string | undefined {
    type Block = { placement: { target: string } };
    const block = obj[SPATIAL_ENTITY_URL] as Block | undefined;
    return block?.placement.target;
  }
}
