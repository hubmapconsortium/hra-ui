import { OntologyTree, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { Selector } from '@ngxs/store';
import { getProbingSphereScene } from 'ccf-scene-utils';
import { OrganInfo } from 'ccf-shared';
import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { DataStateSelectors } from '../data/data.selectors';
import {
  Position,
  RadiusSettings,
  SpatialSearchUiModel,
  SpatialSearchUiState,
  TermResult,
} from './spatial-search-ui.state';

export class SpatialSearchUiSelectors {
  static readonly organEntity = SpatialSearchUiState.organEntity;

  @Selector([SpatialSearchUiState])
  static sex(state: SpatialSearchUiModel): Sex {
    return state.sex;
  }

  @Selector([SpatialSearchUiState])
  static referenceOrgans(state: SpatialSearchUiModel): OrganInfo[] {
    return state.referenceOrgans ?? [];
  }

  @Selector([SpatialSearchUiState])
  static organId(state: SpatialSearchUiModel): string | undefined {
    return state.organId;
  }

  @Selector([SpatialSearchUiSelectors.organId, SpatialSearchUiSelectors.referenceOrgans])
  static organ(id: string | undefined, organs: OrganInfo[]): OrganInfo | undefined {
    if (id === undefined) {
      return undefined;
    }

    return organs.find((organ) => organ.id === id);
  }

  @Selector([SpatialSearchUiSelectors.sex, SpatialSearchUiSelectors.referenceOrgans])
  static organs(sex: Sex, organs: OrganInfo[]): OrganInfo[] {
    return organs.filter((organ) => this.organMatchesSex(organ, sex));
  }

  static organMatchesSex(organ: OrganInfo, sex: Sex): boolean {
    return organ.hasSex || organ.sex === sex;
  }

  @Selector([SpatialSearchUiState])
  static position(state: SpatialSearchUiModel): Position {
    return state.position ?? { x: 0, y: 0, z: 0 };
  }

  @Selector([SpatialSearchUiState])
  static defaultPosition(state: SpatialSearchUiModel): Position {
    return state.defaultPosition ?? { x: 0, y: 0, z: 0 };
  }

  @Selector([SpatialSearchUiState])
  static radius(state: SpatialSearchUiModel): number {
    return state.radius ?? 0;
  }

  @Selector([SpatialSearchUiState])
  static radiusSettings(state: SpatialSearchUiModel): RadiusSettings {
    return state.radiusSettings ?? { min: 0, max: 0, defaultValue: 0 };
  }

  @Selector([
    SpatialSearchUiState,
    SpatialSearchUiState.organEntity,
    SpatialSearchUiSelectors.position,
    SpatialSearchUiSelectors.radius,
  ])
  static scene(
    state: SpatialSearchUiModel,
    organEntity: SpatialEntity | undefined,
    position: Position,
    radius: number,
  ): SpatialSceneNode[] {
    if (organEntity === undefined) {
      return [];
    }

    const sphere = getProbingSphereScene(organEntity, {
      ...position,
      radius,
      target: organEntity['@id'],
    });
    const collisions = new Set((state.tissueBlocks ?? []).map((block) => block.spatialEntityId));
    const organScene = (state.organScene ?? []).map((s) => {
      if (collisions.has(s['@id'])) {
        s = { ...s, color: [41, 121, 255, 0.9 * 255] };
      }
      return s;
    });
    return organScene.concat(sphere);
  }

  @Selector([SpatialSearchUiState.organEntity])
  static sceneBounds(organEntity: SpatialEntity | undefined): Position {
    const { x_dimension: x = 0, y_dimension: y = 0, z_dimension: z = 0 } = organEntity ?? {};
    const margin = Math.max(x, y, z) * 0.42;
    return {
      x: (margin + x) / 1000,
      y: (margin + y) / 1000,
      z: (margin + z) / 1000,
    };
  }

  @Selector([SpatialSearchUiState.organEntity])
  static sceneTarget(organEntity: SpatialEntity | undefined): [number, number, number] {
    const { x_dimension: x = 0, y_dimension: y = 0, z_dimension: z = 0 } = organEntity ?? {};
    return [x / 1000 / 2, y / 1000 / 2, z / 1000 / 2];
  }

  @Selector([SpatialSearchUiState])
  static tissueBlocks(state: SpatialSearchUiModel): TissueBlock[] {
    return state.tissueBlocks ?? [];
  }

  @Selector([SpatialSearchUiState, DataStateSelectors.anatomicalStructuresTreeModel])
  static anatomicalStructures(state: SpatialSearchUiModel, tree: OntologyTree): TermResult[] {
    return this.getTermCounts(state.anatomicalStructures, tree);
  }

  @Selector([SpatialSearchUiState, DataStateSelectors.cellTypesTreeModel])
  static cellTypes(state: SpatialSearchUiModel, tree: OntologyTree): TermResult[] {
    return this.getTermCounts(state.cellTypes, tree);
  }

  private static getTermCounts(counts: Record<string, number> | undefined, tree: OntologyTree): TermResult[] {
    return Object.entries(counts ?? {})
      .filter(([_, count]) => count > 0)
      .map(([term, count]) => ({
        '@id': term,
        label: tree.nodes[term]?.label ?? term.split('/').slice(-1)[0],
        count,
      }));
  }
}
