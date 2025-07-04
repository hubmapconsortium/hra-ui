import { Immutable } from '@angular-ru/cdk/typings';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { inject, Injectable } from '@angular/core';
import { SpatialEntity } from '@hra-api/ng-client';
import { Matrix4, toRadians } from '@math.gl/core';
import { State } from '@ngxs/store';
import { SpatialPlacementJsonLd, SpatialSceneNode } from 'ccf-body-ui';
import { ALL_ORGANS, GlobalConfigState, GlobalsService, OrganInfo } from 'ccf-shared';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GlobalConfig } from '../../services/config/config';
import { XYZTriplet } from '../model/model.state';

/**
 * Applies spatial placement transformations to a matrix.
 * @param tx The matrix to apply transformations to.
 * @param placement The spatial placement data.
 * @returns The transformed matrix.
 */
export function applySpatialPlacement(tx: Matrix4, placement: Immutable<SpatialPlacementJsonLd>): Matrix4 {
  const p = placement;
  let factor: number;
  switch (p.translation_units) {
    case 'centimeter':
      factor = 1 / 100;
      break;
    case 'millimeter':
      factor = 1 / 1000;
      break;
    case 'meter':
    default:
      factor = 1;
      break;
  }
  const T = [p.x_translation, p.y_translation, p.z_translation].map((t) => t * factor);
  const R = [p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians) as [number, number, number];
  const S = [p.x_scaling, p.y_scaling, p.z_scaling];

  return tx.translate(T).rotateXYZ(R).scale(S);
}

/** A set of extraction sites */
export interface ExtractionSet {
  /** Identifier */
  '@id': string;
  /** Type name */
  '@type': 'ExtractionSet';
  /** Entity label */
  label: string;
  /** The list of extraction sites in this set */
  extractionSites: SpatialEntity[];
}

/** State model for reference data. */
export interface ReferenceDataStateModel {
  /** Record for looking up organ iri by a string */
  organIRILookup: { [lookup: string]: string };
  /** Look up spatial entities by iri */
  organSpatialEntities: { [iri: string]: SpatialEntity };
  /** Look up spatial entities by iri */
  anatomicalStructures: { [iri: string]: SpatialEntity[] };
  /** Lookup extraction set by iri */
  extractionSets: { [iri: string]: ExtractionSet[] };
  /** Lookup spatial scene node by iri */
  sceneNodeLookup: { [iri: string]: SpatialSceneNode };
  /** Lookup simple spatial scene node by iri */
  simpleSceneNodeLookup: { [iri: string]: SpatialSceneNode };
  /** Lookup spatial placement JSON-LD object by iri */
  placementPatches: { [iri: string]: SpatialPlacementJsonLd };
}

/** Organ data including organ information, sex, and side. */
export interface OrganData {
  /** Organ info */
  organ: OrganInfo;
  /** Sex of organ */
  sex?: 'male' | 'female';
  /** Side of organ */
  side?: 'left' | 'right';
}

/**
 * Data for the main 3d model display
 */
@StateRepository()
@State<ReferenceDataStateModel>({
  name: 'reference',
  defaults: {
    organIRILookup: {},
    organSpatialEntities: {},
    anatomicalStructures: {},
    extractionSets: {},
    sceneNodeLookup: {},
    simpleSceneNodeLookup: {},
    placementPatches: {},
  },
})
@Injectable()
export class ReferenceDataState extends NgxsImmutableDataRepository<ReferenceDataStateModel> {
  private readonly globals = inject(GlobalsService);
  private readonly globalConfig = inject<GlobalConfigState<GlobalConfig>>(GlobalConfigState);

  /**
   * Initializes this state service.
   */
  override ngxsOnInit(): void {
    super.ngxsOnInit();

    this.getSourceDB().subscribe((db) => {
      this.setState(db);

      // In development, make the db globally accessible
      if (!environment.production) {
        this.globals.set('db', db);
      }
    });
  }

  /**
   * Fetches the source database.
   * @returns An observable of the reference data state model.
   */
  private getSourceDB(): Observable<ReferenceDataStateModel> {
    return this.globalConfig.getOption<string>('referenceData').pipe(
      switchMap((url) =>
        from(fetch(url)).pipe(
          switchMap((data) => data.json()),
          catchError(() => EMPTY),
        ),
      ),
    );
  }

  /**
   * Normalizes the spatial placement data.
   * @param place The spatial placement data.
   * @returns The normalized spatial placement data.
   */
  normalizePlacement(place: SpatialPlacementJsonLd): SpatialPlacementJsonLd {
    const db = this.snapshot;
    const patchPlacement = db.placementPatches[place?.target];
    if (patchPlacement) {
      const matrix = applySpatialPlacement(new Matrix4(Matrix4.IDENTITY), patchPlacement);
      const position: XYZTriplet = { x: place.x_translation, y: place.y_translation, z: place.z_translation };
      const [x, y, z] = matrix.transformAsPoint([position.x, position.y, position.z], []);
      const newPlacement = { ...place, target: patchPlacement.target };
      newPlacement.x_translation = x;
      newPlacement.y_translation = y;
      newPlacement.z_translation = z;
      return newPlacement;
    }
    return place;
  }

  /**
   * Looks up an IRI for a potential reference organ.
   *
   * @param organ the organ
   * @param sex the sex: male, female, or undefined
   * @param side the side: left, right, or undefined
   * @returns An IRI if there is a reference organ for this state, otherwise undefined
   */
  getReferenceOrganIri(
    organ: string,
    sex?: 'Male' | 'Female' | string,
    side?: 'Left' | 'Right' | string,
    organInfo?: OrganInfo,
  ): string | undefined {
    const db = this.snapshot;
    if (organ.toUpperCase() !== 'KIDNEY') {
      side = '';
    }
    if (organInfo?.sex) {
      sex = organInfo.sex;
    }
    const lookup = [organ, sex, side || organInfo?.side].join('|').toUpperCase();
    const key = Object.keys(db.organIRILookup).find((code) => code.toUpperCase().endsWith(lookup));
    return this.getLatestIri(key ? db.organIRILookup[key] : undefined);
  }

  /**
   * Looks up organ information from an IRI
   *
   * @param iri The IRI
   * @returns A populated organ data if the IRI is valid, otherwise undefined
   */
  getOrganData(iri: string): OrganData | undefined {
    const updatedIri = this.getLatestIri(iri);
    const state = this.snapshot;
    const entity = state.organSpatialEntities[updatedIri];
    if (!entity) {
      return undefined;
    }

    const name = entity.label ?? '';
    const organ = ALL_ORGANS.find(
      (info) =>
        (entity.representation_of === info.id || name.endsWith(info.organ)) &&
        (!entity.side || entity.side.toLowerCase() === info.side),
    );
    if (!organ) {
      return undefined;
    }

    return {
      organ,
      sex: entity.sex?.toLowerCase() as 'male' | 'female',
      side: entity.side?.toLowerCase() as 'left' | 'right',
    };
  }

  /**
   * Gets the most recent IRI for an organ.
   * @param organ The organ name.
   * @returns IRI
   */
  private getLatestIri(organ?: string): string {
    if (!organ) {
      return '';
    }
    const organEntry = this.snapshot.placementPatches[organ];
    if (organEntry) {
      return this.getLatestIri(organEntry.target);
    }
    const organIris = Object.values(this.snapshot.organIRILookup);
    const baseIri = this.getUnversionedOrganIri(organ);
    const foundOrgan = organIris.find((o) => this.getUnversionedOrganIri(o) === baseIri);
    return foundOrgan ?? organ;
  }

  /**
   * HRA v2.0+ Reference organs include the version number in the IRI. To test if an old
   * HRA v2.0+ registration organ has a newer version, we need the IRI without the version.
   * This function removes the version, so that we can look for a newer version where applicable.
   *
   * @param organ the organ IRI to check
   * @returns the organ IRI without a version
   */
  private getUnversionedOrganIri(organ: string): string {
    if (organ.endsWith('#primary')) {
      return organ.slice(0, organ.lastIndexOf('/'));
    }
    return organ;
  }
}
