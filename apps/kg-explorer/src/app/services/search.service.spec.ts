import { TestBed } from '@angular/core/testing';
import { TableRow } from '@hra-ui/design-system/table';
import { firstValueFrom } from 'rxjs';

import { TermsIndex } from '../digital-objects-metadata.schema';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  const rows: TableRow[] = [
    {
      purl: 'purl:1',
      title: 'Kidney atlas object',
      doType: '2d-ftu',
      hraVersions: ['v2.5', 'v2.3'],
    } as TableRow,
    {
      purl: 'purl:2',
      title: 'Lung reference model',
      doType: 'ref-organ',
      hraVersions: 'v2.4',
    } as TableRow,
    {
      purl: 'purl:3',
      title: 'Cell type annotation package',
      doType: 'ctann',
    } as TableRow,
  ];

  const termsIndex: TermsIndex = {
    terms: ['organ:kidney', 'organ:lung', 'as:glomerulus', 'ct:podocyte', 'bm:gene-x'],
    purls: ['purl:1', 'purl:2', 'purl:3'],
    term_to_purls: [[0], [1], [0], [0, 2], [2]],
    purl_to_terms: [[0, 2, 3], [1], [3, 4]],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
  });

  it('returns all purls when no filters are set', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: null,
        digitalObjects: [],
        versions: [],
        organs: [],
        ontologyTerms: [],
        cellTypeTerms: [],
        biomarkerTerms: [],
      }),
    );

    expect(result).toEqual(['purl:1', 'purl:2', 'purl:3']);
  });

  it('filters rows by search term case-insensitively', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: 'KIDNEY',
        digitalObjects: [],
        versions: [],
        organs: [],
        ontologyTerms: [],
        cellTypeTerms: [],
        biomarkerTerms: [],
      }),
    );

    expect(result).toEqual(['purl:1']);
  });

  it('filters by digital object type and hra version', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: null,
        digitalObjects: ['ref-organ'],
        versions: ['v2.4'],
        organs: [],
        ontologyTerms: [],
        cellTypeTerms: [],
        biomarkerTerms: [],
      }),
    );

    expect(result).toEqual(['purl:2']);
  });

  it('excludes rows with missing hraVersions when version filter is applied', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: null,
        digitalObjects: [],
        versions: ['v2.4'],
        organs: [],
        ontologyTerms: [],
        cellTypeTerms: [],
        biomarkerTerms: [],
      }),
    );

    expect(result).toEqual(['purl:2']);
    expect(result).not.toContain('purl:3');
  });

  it('filters by ASCTB term mappings from the terms index', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: null,
        digitalObjects: [],
        versions: [],
        organs: ['organ:kidney'],
        ontologyTerms: ['as:glomerulus'],
        cellTypeTerms: [],
        biomarkerTerms: [],
      }),
    );

    expect(result).toEqual(['purl:1']);
  });

  it('applies all ASCTB categories together (intersection)', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: null,
        digitalObjects: [],
        versions: [],
        organs: ['organ:kidney'],
        ontologyTerms: [],
        cellTypeTerms: ['ct:podocyte'],
        biomarkerTerms: ['bm:gene-x'],
      }),
    );

    expect(result).toEqual([]);
  });

  it('returns empty result when requested ASCTB term has no mapping', async () => {
    const result = await firstValueFrom(
      service.search(rows, termsIndex, {
        searchTerm: null,
        digitalObjects: [],
        versions: [],
        organs: ['organ:does-not-exist'],
        ontologyTerms: [],
        cellTypeTerms: [],
        biomarkerTerms: [],
      }),
    );

    expect(result).toEqual([]);
  });
});
