import { ResolveFn } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';
import { StudyDataType } from '../../../schemas/study.schema';

/**
 * Resolver for study dataset visualization
 * Uses gallery data from parent route
 */
export function studyDatasetResolver(): ResolveFn<Partial<CdeVisualizationElementProps> | null> {
  return (route) => {
    const studyName = route.parent?.paramMap.get('studyName') ?? '';
    const datasetId = route.paramMap.get('datasetId') ?? '';
    const galleryData = route.parent?.data['galleryData'] as StudyDataType | undefined;

    const study = galleryData?.studies?.find((s) => s.slug === studyName);
    const dataset = study?.datasets?.find((d) => d['slug'] === datasetId);

    if (!dataset) {
      return null;
    }

    return {
      nodes: dataset['nodes'] as string,
      edges: dataset['edges'] as string,
      nodeTargetKey: dataset['node-target-key'] as string,
      nodeTargetValue: dataset['node-target-value'] as string,
      maxEdgeDistance: dataset['max-edge-distance'] as number,
      metadata: {
        title: `${datasetId}`,
        organ: study?.organName,
        technology: study?.technology,
        sourceFileName: datasetId,
      },
    };
  };
}
