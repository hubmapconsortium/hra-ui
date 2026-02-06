import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { StudyDataType } from '../../schemas/study.schema';
import { NotFoundError } from '../utils/not-found-error';
import { getRequiredRouteData, getRequiredRouteParam } from '../utils/route-properties';

/** Study ID route parameter */
export const STUDY_ID_PARAM = 'studyId';
/** Dataset ID route parameter */
export const DATASET_ID_PARAM = 'datasetId';

/**
 * Gets the study breadcrumbs from the route
 * @param route Activated route snapshot
 * @returns Breadcrumb items for the study
 */
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

/**
 * Gets the study dataset breadcrumbs from the route
 * @param route Activated route snapshot
 * @returns Breadcrumb items for the study dataset
 */
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

/**
 * Creates a resolver for study dataset visualization data
 * @returns Resolver function for study dataset visualization data
 */
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
      nodeKeys: { 'Cell Type': dataset['node-target-key'] },
      nodeTargetSelector: dataset['node-target-value'],
      maxEdgeDistance: dataset['max-edge-distance'],
      metadata: {
        organ: study.organName,
        technology: study.technology,
      },
    };
  };
}

/**
 * Gets the study data from the route
 * @param route Activated route snapshot
 * @returns Study data
 */
function getStudy(route: ActivatedRouteSnapshot): StudyDataType['studies'][number] {
  const studyId = getRequiredRouteParam(route, STUDY_ID_PARAM);
  const data = getRequiredRouteData<StudyDataType>(route, 'data', true);
  const study = data.studies.find((s) => s.slug === studyId);
  if (!study) {
    throw new NotFoundError(`Study not found: ${studyId}`);
  }

  return study;
}
