import { Injectable } from '@angular/core';
import { createLinkId } from '@hra-ui/cdk/state';
import { Observable, of } from 'rxjs';
import { TissueData, TissueLibraryService } from './tissue-library.service';

/** Create a new id from a label */
function createNodeId(label: string, parent: string): string {
  return `${parent}${label.replace(/ /g, '_')}/`;
}

/** Create a new node */
function defineNode(label: string, parent: string, url?: string, ...children: [label: string, url: string][]): object {
  const id = createNodeId(label, parent);
  const childNodes = children.reduce(
    (acc, [childLabel, childUrl]) => ({
      ...acc,
      ...defineNode(childLabel, id, childUrl),
    }),
    {}
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
const BASE_ID = 'https://example.com/';

/** Mock tissue data */
export const MOCK_TISSUE_DATA = {
  root: BASE_ID,
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
      ]
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
      ]
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
      ]
    ),
    defineNode(
      'Skin',
      BASE_ID,
      undefined,
      ['Dermal Papilla', 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg'],
      ['Epidermal Ridge', 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-epidermal-ridge.svg']
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
    ])
  ),
};

/** Mock implementation of {@link TissueLibraryService} */
@Injectable({
  providedIn: 'root',
})
export class MockTissueLibraryService extends TissueLibraryService {
  /** Implementation of {@link TissueLibraryService.getTissues} */
  getTissues(): Observable<TissueData> {
    return of(MOCK_TISSUE_DATA as TissueData);
  }
}
