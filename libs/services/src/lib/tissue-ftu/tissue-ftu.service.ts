import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { z } from 'zod';

export type ReferenceOrgan = z.infer<typeof REFERENCE_ORGAN>;

/** Reference organ type */
export const REFERENCE_ORGAN = z.object({
  representation_of: z.string(),
  object: z.object({
    file: z.string(),
  }),
});

/** Abstract Service to fetch reference organs */
@Injectable()
export abstract class TissueFtuService {
  /** abstract Method to fetch reference organs */
  abstract getReferenceOrgans(): Observable<ReferenceOrgan[]>;
}
