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

const IRI = z.string().url();

export const TISSUE_DATA_SCHEMA = z.object({
  root: IRI,
  Nodes: z.record(
    IRI,
    z.object({
      '@id': IRI,
      '@type': z.string(),
      label: z.string(),
      // TODO children
    })
  ),
});

@Injectable()
export abstract class TissueLibraryService {
  abstract getTissues(): Observable<void>;
  // constructor() { }
}
