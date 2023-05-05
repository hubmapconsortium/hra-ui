import { Injectable } from '@angular/core';
import { Any } from '@hra-ui/utils/types';
import { Observable, of } from 'rxjs';
import { MOCK_TISSUE_DATA } from '../tissue-library/tissue-library.mock';
import { ReferenceOrgan, TissueFtuService } from './tissue-ftu.service';

/** Test whether an object is a reference organ */
function isReferenceOrgan(obj: Any): obj is ReferenceOrgan {
  return !!obj['object']['file'];
}

/** Reference organs */
const MOCK_REFERENCE_ORGANS = Object.values(MOCK_TISSUE_DATA.nodes).filter(isReferenceOrgan);

/** Implementation of TissueFtuService */
@Injectable({
  providedIn: 'root',
})
export class MockTissueFtuService extends TissueFtuService {
  /** Implementation of getReferenceOrgans method */
  getReferenceOrgans(): Observable<ReferenceOrgan[]> {
    return of(MOCK_REFERENCE_ORGANS);
  }
}
