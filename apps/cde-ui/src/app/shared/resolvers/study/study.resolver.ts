import { ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { StudyDataType } from '../../../schemas/study.schema';

export function getStudyCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const studyId = route.paramMap.get('studyId') ?? '';
  const data = route.parent?.data['data'] as StudyDataType | undefined;
  const study = data?.studies.find((s) => s.slug === studyId);
  if (!study) {
    return [];
  }

  return [
    {
      name: `${study.organName}, ${study.technology}`,
      route: `/gallery/${studyId}`,
    },
  ];
}

export function getStudyDatasetCrumbs(route: ActivatedRouteSnapshot): BreadcrumbItem[] {
  const studyId = route.paramMap.get('studyId') ?? '';
  const datasetId = route.paramMap.get('datasetId') ?? '';
  return [
    ...getStudyCrumbs(route),
    {
      name: datasetId,
      route: `/gallery/${studyId}/${datasetId}`,
    },
  ];
}
