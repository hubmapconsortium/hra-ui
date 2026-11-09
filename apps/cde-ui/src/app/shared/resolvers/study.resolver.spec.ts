import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { Study } from '../../schemas/studies/studies.schema';
import { createStudyDatasetVisualizationResolver, DATASET_ID_PARAM, STUDY_DATA_KEY } from './study.resolver';

describe('createStudyDatasetVisualizationResolver', () => {
  const study = {
    slug: 'heart-codex',
    tagline: 'Heart, CODEX',
    organName: 'Heart',
    technology: 'CODEX',
    datasets: [{ slug: 'dataset-1', nodes: 'nodes.csv', edges: 'edges.csv' }],
  } as unknown as Study;

  function resolve(datasetId: string) {
    TestBed.configureTestingModule({
      providers: [{ provide: Location, useValue: { prepareExternalUrl: (url: string) => `/base${url}` } }],
    });
    const route = {
      data: { [STUDY_DATA_KEY]: study },
      paramMap: convertToParamMap({ [DATASET_ID_PARAM]: datasetId }),
      parent: null,
    } as unknown as ActivatedRouteSnapshot;

    return TestBed.runInInjectionContext(() =>
      createStudyDatasetVisualizationResolver()(route, {} as RouterStateSnapshot),
    );
  }

  it('passes the study name and a link to its page as metadata', () => {
    expect(resolve('dataset-1')).toEqual(
      expect.objectContaining({
        nodes: 'nodes.csv',
        edges: 'edges.csv',
        metadata: {
          study: 'Heart, CODEX',
          studyUrl: '/base/gallery/heart-codex',
          organ: 'Heart',
          technology: 'CODEX',
        },
      }),
    );
  });

  it('throws when the dataset is not in the study', () => {
    expect(() => resolve('missing')).toThrow('Study dataset not found: missing in study heart-codex');
  });
});
