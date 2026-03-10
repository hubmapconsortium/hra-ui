import type { BaseStudy } from './studies.schema';
import { getChips, getTags, zipCitationsAndPublications } from './utils';

const MOCK_PUBLICATION_1 = 'https://doi.org/10.1000/pub1';
const MOCK_PUBLICATION_2 = 'https://doi.org/10.1000/pub2';
const MOCK_CITATION_1 = 'Citation 1';
const MOCK_CITATION_2 = 'Citation 2';
const MOCK_BASE_STUDY: BaseStudy = {
  slug: 'test-study',
  organName: 'Kidney',
  description: 'Test study description',
  authors: 'Test Author',
  affiliations: 'Test University',
  consortium: 'HuBMAP',
  technology: 'scRNA-seq',
  euiUrl: 'https://example.com/eui',
  cellCount: 1000,
  citations: [MOCK_CITATION_1, MOCK_CITATION_2],
  publications: [MOCK_PUBLICATION_1, MOCK_PUBLICATION_2],
  datasets: [
    {
      slug: 'dataset-1',
      thumbnail: 'thumb1.png',
      nodes: 'nodes1.csv',
      edges: 'edges1.csv',
      'node-target-key': 'cell_type',
      'node-target-value': 'target',
      'node-cl-id-key': 'cl_id',
      'max-edge-distance': 0.5,
      cellCount: 500,
      originalCellTypesCount: 10,
      level3CellTypesCount: 8,
      level2CellTypesCount: 6,
      level1CellTypesCount: 4,
    },
  ],
};

describe('getChips', () => {
  it('should return chips with pluralized "datasets" and "cells" for multiple items', () => {
    const chips = getChips(MOCK_BASE_STUDY);
    expect(chips).toEqual(['1 dataset', '1,000 cells']);
  });

  it('should return chips with singular "dataset" and "cell" for single items', () => {
    const chips = getChips({ ...MOCK_BASE_STUDY, cellCount: 1 });
    expect(chips).toEqual(['1 dataset', '1 cell']);
  });

  it('should pluralize "datasets" correctly for multiple datasets', () => {
    const chips = getChips({ ...MOCK_BASE_STUDY, datasets: Array(3).fill(MOCK_BASE_STUDY.datasets[0]) });
    expect(chips).toEqual(['3 datasets', '1,000 cells']);
  });

  it('should format large numbers with locale string', () => {
    const chips = getChips({ ...MOCK_BASE_STUDY, cellCount: 1234567 });
    expect(chips).toEqual(['1 dataset', '1,234,567 cells']);
  });

  it('should handle zero datasets and cells', () => {
    const chips = getChips({ ...MOCK_BASE_STUDY, cellCount: 0, datasets: [] });
    expect(chips).toEqual(['0 datasets', '0 cells']);
  });
});

describe('getTags', () => {
  it('should return both consortium and HRA registered tags', () => {
    const tags = getTags(MOCK_BASE_STUDY);
    expect(tags).toEqual([
      { icon: 'diversity_3', text: 'HuBMAP' },
      { icon: 'check_circle', text: 'HRA registered' },
    ]);
  });

  it('should return only HRA registered tag when consortium is empty', () => {
    const tags = getTags({ ...MOCK_BASE_STUDY, consortium: '' });
    expect(tags).toEqual([{ icon: 'check_circle', text: 'HRA registered' }]);
  });

  it('should return only consortium tag when euiUrl is empty', () => {
    const tags = getTags({ ...MOCK_BASE_STUDY, euiUrl: '' });
    expect(tags).toEqual([{ icon: 'diversity_3', text: 'HuBMAP' }]);
  });

  it('should return empty array when both consortium and euiUrl are empty', () => {
    const tags = getTags({ ...MOCK_BASE_STUDY, consortium: '', euiUrl: '' });
    expect(tags).toEqual([]);
  });

  it('should include consortium tag with the correct consortium name', () => {
    const tags = getTags({ ...MOCK_BASE_STUDY, consortium: 'SenNet' });
    expect(tags[0]).toEqual({ icon: 'diversity_3', text: 'SenNet' });
  });
});

describe('zipCitationsAndPublications', () => {
  it('should zip citations and publications into PublicationItems', () => {
    const items = zipCitationsAndPublications(MOCK_BASE_STUDY);
    expect(items).toEqual([
      { label: MOCK_CITATION_1, url: MOCK_PUBLICATION_1 },
      { label: MOCK_CITATION_2, url: MOCK_PUBLICATION_2 },
    ]);
  });

  it('should handle mismatched arrays by only zipping available pairs', () => {
    const items = zipCitationsAndPublications({ ...MOCK_BASE_STUDY, citations: [MOCK_CITATION_1] });
    expect(items).toEqual([{ label: MOCK_CITATION_1, url: MOCK_PUBLICATION_1 }]);
  });

  it('should ignore extra citations when there are more citations than publications', () => {
    const items = zipCitationsAndPublications({
      ...MOCK_BASE_STUDY,
      citations: [MOCK_CITATION_1, MOCK_CITATION_2, MOCK_CITATION_1],
    });
    expect(items).toEqual([
      { label: MOCK_CITATION_1, url: MOCK_PUBLICATION_1 },
      { label: MOCK_CITATION_2, url: MOCK_PUBLICATION_2 },
    ]);
  });

  it('should return empty array when citations array is empty', () => {
    const items = zipCitationsAndPublications({ ...MOCK_BASE_STUDY, citations: [] });
    expect(items).toEqual([]);
  });

  it('should return empty array when publications array is empty', () => {
    const items = zipCitationsAndPublications({ ...MOCK_BASE_STUDY, publications: [] });
    expect(items).toEqual([]);
  });

  it('should skip items where citation is an empty string', () => {
    const items = zipCitationsAndPublications({ ...MOCK_BASE_STUDY, citations: [MOCK_CITATION_1, ''] });
    expect(items).toEqual([{ label: MOCK_CITATION_1, url: MOCK_PUBLICATION_1 }]);
  });

  it('should skip items where publication is an empty string', () => {
    const items = zipCitationsAndPublications({ ...MOCK_BASE_STUDY, publications: [MOCK_PUBLICATION_1, ''] });
    expect(items).toEqual([{ label: MOCK_CITATION_1, url: MOCK_PUBLICATION_1 }]);
  });

  it('should return empty array when both arrays are empty', () => {
    const items = zipCitationsAndPublications({ ...MOCK_BASE_STUDY, citations: [], publications: [] });
    expect(items).toEqual([]);
  });
});
