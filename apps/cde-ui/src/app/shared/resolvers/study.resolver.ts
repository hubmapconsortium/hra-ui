import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { Studies, Study } from '../../schemas/studies/studies.schema';
import { NotFoundError } from '../utils/not-found-error';
import { getRequiredRouteData, getRequiredRouteParam } from '../utils/route-properties';

/** Study ID route parameter */
export const STUDY_ID_PARAM = 'studyId';
/** Dataset ID route parameter */
export const DATASET_ID_PARAM = 'datasetId';
/** Route data key for studies data */
export const STUDIES_DATA_KEY = 'studies';
/** Route data key for study data */
export const STUDY_DATA_KEY = 'study';

/**
 * Gets the study breadcrumbs from the route
 * @param route Activated route snapshot
 * @returns Breadcrumb items for the study
 */
export function getStudyCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const study = getRequiredRouteData<Study>(route, STUDY_DATA_KEY, true);
  return [
    {
      name: `${study.organName}, ${study.technology}`,
      route: `/gallery/${study.slug}`,
    },
  ];
}

/**
 * Gets the study dataset breadcrumbs from the route
 * @param route Activated route snapshot
 * @returns Breadcrumb items for the study dataset
 */
export function getStudyDatasetCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const datasetId = getRequiredRouteParam(route, DATASET_ID_PARAM);
  const [studyCrumb] = getStudyCrumbs(route);
  return [
    studyCrumb,
    {
      name: datasetId,
      route: `${studyCrumb.route}/${datasetId}`,
    },
  ];
}

export function createStudyResolver(): ResolveFn<Study> {
  return (route) => {
    const studyId = getRequiredRouteParam(route, STUDY_ID_PARAM);
    const data = getRequiredRouteData<Studies>(route, STUDIES_DATA_KEY, true);
    const study = data.studies.find((s) => s.slug === studyId);
    if (!study) {
      throw new NotFoundError(`Study not found: ${studyId}`);
    }

    return study;
  };
}

/**
 * Creates a resolver for study dataset visualization data
 * @returns Resolver function for study dataset visualization data
 */
export function createStudyDatasetVisualizationResolver(): ResolveFn<Partial<CdeVisualizationElementProps>> {
  return (route) => {
    const study = getRequiredRouteData<Study>(route, STUDY_DATA_KEY, true);
    const datasetId = getRequiredRouteParam(route, DATASET_ID_PARAM);
    const dataset = study.datasets.find((d) => d.slug === datasetId);
    if (!dataset) {
      throw new NotFoundError(`Study dataset not found: ${datasetId} in study ${study.slug}`);
    }

    return {
      nodes: dataset.nodes,
      edges: dataset.edges,
      nodeKeys: {
        'Cell Type': dataset['node-target-key'],
        'Cell Ontology ID': dataset['node-cl-id-key'],
      },
      nodeTargetSelector: dataset['node-target-value'],
      maxEdgeDistance: dataset['max-edge-distance'],
      metadata: {
        organ: study.organName,
        technology: study.technology,
      },
    };
  };
}
