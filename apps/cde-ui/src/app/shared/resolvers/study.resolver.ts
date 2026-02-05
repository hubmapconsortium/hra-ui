import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { StudyDataType } from '../../schemas/study.schema';
import { NotFoundError } from '../utils/not-found-error';
import { getRequiredRouteData, getRequiredRouteParam } from '../utils/route-properties';

export const STUDY_ID_PARAM = 'studyId';
export const DATASET_ID_PARAM = 'datasetId';

export function getStudyCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const studyId = getRequiredRouteParam(route, STUDY_ID_PARAM);
  const study = getStudy(route);

  return [
    {
      name: `${study.organName}, ${study.technology}`,
      route: `/gallery/${studyId}`,
    },
  ];
}

export function getStudyDatasetCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const studyId = getRequiredRouteParam(route, STUDY_ID_PARAM);
  const datasetId = getRequiredRouteParam(route, DATASET_ID_PARAM);
  return [
    ...getStudyCrumbs(route),
    {
      name: datasetId,
      route: `/gallery/${studyId}/${datasetId}`,
    },
  ];
}

export function createStudyDatasetVisualizationResolver(): ResolveFn<Partial<CdeVisualizationElementProps>> {
  return (route: ActivatedRouteSnapshot) => {
    const study = getStudy(route);
    const datasetId = getRequiredRouteParam(route, DATASET_ID_PARAM);
    const dataset = study.datasets.find((d) => d.slug === datasetId);
    if (!dataset) {
      throw new NotFoundError(`Study dataset not found: ${datasetId}`);
    }

    return {
      nodes: dataset.nodes,
      edges: dataset.edges,
      nodeTargetKey: dataset['node-target-key'],
      nodeTargetValue: dataset['node-target-value'],
      maxEdgeDistance: dataset['max-edge-distance'],
      metadata: {
        organ: study.organName,
        technology: study.technology,
      },
    };
  };
}

function getStudy(route: ActivatedRouteSnapshot): StudyDataType['studies'][number] {
  const studyId = getRequiredRouteParam(route, STUDY_ID_PARAM);
  const data = getRequiredRouteData<StudyDataType>(route, 'data', true);
  const study = data.studies.find((s) => s.slug === studyId);
  if (!study) {
    throw new NotFoundError(`Study not found: ${studyId}`);
  }

  return study;
}
