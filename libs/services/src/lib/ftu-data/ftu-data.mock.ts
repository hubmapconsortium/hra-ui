import { Injectable } from '@angular/core';
import { createLinkId } from '@hra-ui/cdk/state';
import { Observable, of } from 'rxjs';
import { Iri, Url } from '../shared/common.model';
import {
  CellSummary,
  DataFileReference,
  IllustrationMappingItem,
  SourceReference,
  Tissue,
  TissueLibrary,
} from './ftu-data.model';
import { FtuDataService } from './ftu-data.service';

/**
 * Extended tissue
 */
interface ExtendedTissue extends Tissue {
  /** Base Id */
  representation_of: string;
  /** Objecy to stoe the file URL */
  object: {
    file: Url;
  };
}

/** Create a new id from a label */
function createNodeId(label: string, parent: string): string {
  return `${parent}${label.replace(/ /g, '_')}/`;
}

/** Create a new node */
function defineNode(
  label: string,
  parent: string,
  url?: string,
  ...children: [label: string, url: string][]
): Record<Iri, ExtendedTissue> {
  const id = createNodeId(label, parent);
  const childNodes = children.reduce(
    (acc, [childLabel, childUrl]) => ({
      ...acc,
      ...defineNode(childLabel, id, childUrl),
    }),
    {},
  );
  const node = {
    '@type': '',
    '@id': id,
    id,
    parent,
    label,
    synonymLabels: [],
    link: url && createLinkId('FTU'),
    representation_of: id,
    object: {
      file: url,
    },
    children: Object.keys(childNodes),
  };

  return { [id]: node, ...childNodes };
}

/** Base node id */
const BASE_ID = 'https://purl.humanatlas.io/2d-ftu/';

/** Mock tissue data */
export const MOCK_TISSUE_DATA = {
  root: BASE_ID as Iri,
  nodes: Object.assign(
    {},
    defineNode(
      'Kidney',
      BASE_ID,
      undefined,
      [
        'Descending Thin Loop of Henle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
      ],
      [
        'Renal Corpuscle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.svg',
      ],
      [
        'Ascending Thin Loop of Henle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
      ],
      [
        'Cortical Collecting Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.svg',
      ],
      [
        'Inner Medullary Collecting Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
      ],
      ['Nephron', 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.svg'],
      [
        'Outer Medullary Collectiong Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
      ],
      [
        'Thick Ascending Loop of Henle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
      ],
    ),
    defineNode(
      'Lung',
      BASE_ID,
      undefined,
      [
        'Pulmonary Alveolus',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
      ],
      [
        'Bronchial Submucosal Gland',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.svg',
      ],
    ),
    defineNode('Large Intestine', BASE_ID, undefined, [
      'Crypt Lieberkuhn',
      'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
    ]),
    defineNode(
      'Pancreas',
      BASE_ID,
      undefined,
      [
        'Islates Langerhans',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.svg',
      ],
      [
        'Intercalated Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
      ],
      [
        'Pancreatic Acinus',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.svg',
      ],
    ),
    defineNode(
      'Skin',
      BASE_ID,
      undefined,
      ['Dermal Papilla', 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg'],
      [
        'Epidermal Ridge',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-epidermal-ridge.svg',
      ],
    ),
    defineNode('Liver', BASE_ID, undefined, [
      'Liver Lobule',
      'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver-lobule.svg',
    ]),
    defineNode('Prostate', BASE_ID, undefined, [
      'Prostate Glandular Acinus',
      'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg',
    ]),
    defineNode('Thymus', BASE_ID, undefined, [
      'Thymus Lobule',
      'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.svg',
    ]),
  ) as Record<Iri, ExtendedTissue>,
};

/** Helper for creating summary data */
function createCell(
  cid: string,
  clabel: string,
  bid: string,
  blabel: string,
  count: number,
  percentage: number,
  meanExpression: number,
  metadata: { label: string; value: string }[][] = [],
) {
  return {
    cell: {
      id: cid,
      label: clabel,
    },
    biomarker: {
      id: bid,
      label: blabel,
    },
    count,
    percentage,
    meanExpression,
    metadata,
  };
}

/** Mock summary data */
export const MOCK_SUMMARIES = {
  summary1: {
    label: 'Summary 1',
    cellSource: '',
    entries: [
      createCell('cell1', 'Cell 1', 'biomarker1', 'Biomarker 1', 10, 1.0, 1.0, [
        [
          { label: 'metadata 1', value: 'value of data' },
          { label: 'metadata 2', value: 'value of data' },
        ],
        [{ label: 'metadata 3', value: 'value of data' }],
      ]),
      createCell('cell2', 'Cell 2', 'biomarker1', 'Biomarker 1', 5, 0.2, 0.3),
      createCell('cell2', 'Cell 2', 'biomarker2', 'Biomarker 2', 5, 0.2, 0.3),
      createCell('cell1', 'Cell 1', 'biomarker3', 'Biomarker 3', 15, 0.2, 0.3),
      createCell('cell3', 'Cell 3', 'biomarker1', 'Biomarker 1', 11, 0.3, 0.5),
      createCell('cell3', 'Cell 3', 'biomarker3', 'Biomarker 3', 11, 0.1, 0.3),
      createCell('cell4', 'Cell 4', 'biomarker1', 'Biomarker 1', 2000, 0.1, 1.0),
      createCell('cell5', 'Cell 5', 'biomarker1', 'Biomarker 1', 332, 0.4, 0.3),
      createCell('cell6', 'Cell 6', 'biomarker3', 'Biomarker 3', 101, 0.2, 0.1),
      createCell('cell7', 'Cell 7', 'biomarker1', 'Biomarker 1', 2, 0.5, 0.3),
      createCell('cell7', 'Cell 7', 'biomarker2', 'Biomarker 2', 230, 0.4, 0.3),
      createCell('cell7', 'Cell 7', 'biomarker3', 'Biomarker 3', 601, 0.7, 0.3),
      createCell('cell8', 'Cell 8', 'biomarker1', 'Biomarker 1', 124, 0.5, 0.5),
      createCell('cell8', 'Cell 8', 'biomarker2', 'Biomarker 2', 244, 0.3, 0.3),
      createCell('cell9', 'Cell 9', 'biomarker1', 'Biomarker 1', 21, 0.4, 0.3),
      createCell('cell10', 'Cell 10', 'biomarker2', 'Biomarker 2', 675, 0.5, 0.3),
      createCell('cell11', 'Cell 11', 'biomarker3', 'Biomarker 3', 57, 0.3, 0.3),
      createCell('cell12', 'Cell 12', 'biomarker2', 'Biomarker 2', 45, 0.1, 0.7),
      createCell('cell13', 'Cell 13', 'biomarker4', 'Biomarker 4', 45, 0.1, 0.3),
      createCell('cell13', 'Cell 13', 'biomarker5', 'Biomarker 5', 45, 0.1, 0.3),
      createCell('cell13', 'Cell 13', 'biomarker6', 'Biomarker 6', 45, 0.1, 0.4),
      createCell('cell13', 'Cell 13', 'biomarker7', 'Biomarker 7', 45, 0.1, 0.3),
      createCell('cell13', 'Cell 13', 'biomarker8', 'Biomarker 8', 45, 0.1, 0.9),
    ],
  },
  summary2: {
    label: 'Summary 2',
    cellSource: '',
    entries: [createCell('cell1', 'Cell 1', 'biomarker2', 'Biomarker 2', 20, 1, 0.9)],
  },
  summary3: {
    label: 'Summary 3',
    cellSource: '',
    entries: [],
  },
};

/**
 * Dummy data for Source References
 */
const sourceReferences: SourceReference[] = [
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: 'Kidney Precision Medicine Project',
    label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title:
      '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
    label:
      '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: 'Kidney Precision Medicine Project',
    label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title: '[Dataset Owner Title]',
    label: '<Dataset Title + Link to Dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
  {
    id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung' as Iri,
    title:
      '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
    label:
      '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
    link: 'google.com',
    authors: [],
    year: -1,
    doi: '',
  },
];

/**
 * Dummy data extract om Mock Data of tissue mock
 */
const CELL_SUMMARY_DATA: CellSummary[] = [];

/**
This class represents a mock implementation of the FtuDataService class.
It overrides the methods from the parent class to provide mock data for testing purposes.
*/
@Injectable({
  providedIn: 'root',
})
export class MockFtuDataService extends FtuDataService {
  /**
   * Overrides the getTissueLibrary method to return a mock data for the tissue tree
   * @returns tissue library
   */
  override getTissueLibrary(): Observable<TissueLibrary> {
    return of();
  }
  /**
  Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
  @param iri The Iri of the illustration.
  @returns An Observable that emits the mock URL.
  */
  override getIllustrationUrl(iri: Iri): Observable<Url> {
    return of(MOCK_TISSUE_DATA.nodes[iri].object.file);
  }

  /**
  Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an IllustrationMappingItem array.
  */
  override getIllustrationMapping(): Observable<IllustrationMappingItem[]> {
    return of([]);
  }

  /**
  Overrides the getCellSummaries method to return an CellSummary array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an CellSummary array.
  */
  override getCellSummaries(): Observable<CellSummary[]> {
    return of(CELL_SUMMARY_DATA);
  }
  /**
  Overrides the getDataFileReferences method to return an DataFileReference array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an DataFileReference array.
  */
  override getDataFileReferences(iri: Iri): Observable<DataFileReference[]> {
    return of([
      {
        format: 'svg',
        url: MOCK_TISSUE_DATA.nodes[iri].object.file,
      },
    ]);
  }
  /**
  Overrides the getSourceReferences method to return an empty array.
  @param iri The Iri of the illustration.
  @returns An Observable that emits an empty array.
  */
  override getSourceReferences(): Observable<SourceReference[]> {
    return of(sourceReferences);
  }
}
