import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { z } from 'zod';

// export interface TissueData {
//   root: string;
//   Nodes: {
//     iri: {
//       id: string;
//       type: string;
//       label: string;
//       children: Array<string>;
//       parent?: string;
//     }
//   }
// }

export type TissueData = z.infer<typeof TISSUE_DATA_SCHEMA>;

const IRI = z.string().url().brand('IRI');

// export const TISSUE_DATA_SCHEMA = z.object({
//   root: IRI,
//   Nodes: z.record(
//     IRI,
//     z.object({
//       '@id': IRI,
//       '@type': z.string(),
//       label: z.string(),
//       // TODO children
//     })
//   ),
// });

export const TISSUE_DATA_SCHEMA = z.object({
  root: IRI,
  nodes: z.record(
    IRI,
    z.object({
      '@type': z.string(),
      '@id': IRI,
      id: IRI,
      parent: IRI.or(z.literal('')),
      label: z.string(),
      synonymLabels: z.string().array(),
      children: IRI.array(),
    })
  ),
});

@Injectable()
export abstract class TissueLibraryService {
  abstract getTissues(): Observable<TissueData>;
}
