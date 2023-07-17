import { Injectable } from '@angular/core';
import { Any } from '@hra-ui/utils/types';
import { Observable, of } from 'rxjs';
import { MOCK_TISSUE_DATA } from '../tissue-library/tissue-library.mock';
import { ReferenceOrgan, TissueFtuService } from './tissue-ftu.service';

/** Test whether an object is a reference organ */
function isReferenceOrgan(obj: Any): obj is ReferenceOrgan {
  return !!obj['object']['file'];
}

/** Helper for creating summary data */
function createCell(
  cid: string,
  clabel: string,
  bid: string,
  blabel: string,
  count: number,
  percentage: number,
  metadata: { label: string; value: string }[][] = []
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
    metadata,
  };
}

/** Reference organs */
const MOCK_REFERENCE_ORGANS = Object.values(MOCK_TISSUE_DATA.nodes).filter(isReferenceOrgan);

/** Mock summary data */
const MOCK_SUMMARIES = {
  summary1: {
    label: 'Summary 1',
    entries: [
      createCell('cell1', 'Cell 1', 'biomarker1', 'Biomarker 1', 10, 0.5, [
        [
          { label: 'metadata 1', value: 'value of data' },
          { label: 'metadata 2', value: 'value of data' },
        ],
        [{ label: 'metadata 3', value: 'value of data' }],
      ]),
      createCell('cell2', 'Cell 2', 'biomarker1', 'Biomarker 1', 5, 0.2),
      createCell('cell2', 'Cell 2', 'biomarker2', 'Biomarker 2', 5, 0.2),
      createCell('cell1', 'Cell 1', 'biomarker3', 'Biomarker 3', 15, 0.2),
      createCell('cell3', 'Cell 3', 'biomarker1', 'Biomarker 1', 11, 0.3),
      createCell('cell3', 'Cell 3', 'biomarker3', 'Biomarker 3', 11, 0.1),
      createCell('cell4', 'Cell 4', 'biomarker1', 'Biomarker 1', 2000, 0.1),
      createCell('cell5', 'Cell 5', 'biomarker1', 'Biomarker 1', 332, 0.4),
      createCell('cell6', 'Cell 6', 'biomarker3', 'Biomarker 3', 101, 0.2),
      createCell('cell7', 'Cell 7', 'biomarker1', 'Biomarker 1', 2, 0.5),
      createCell('cell7', 'Cell 7', 'biomarker2', 'Biomarker 2', 230, 0.4),
      createCell('cell7', 'Cell 7', 'biomarker3', 'Biomarker 3', 601, 0.7),
      createCell('cell8', 'Cell 8', 'biomarker1', 'Biomarker 1', 124, 0.5),
      createCell('cell8', 'Cell 8', 'biomarker2', 'Biomarker 2', 244, 0.3),
      createCell('cell9', 'Cell 9', 'biomarker1', 'Biomarker 1', 21, 0.4),
      createCell('cell10', 'Cell 10', 'biomarker2', 'Biomarker 2', 675, 0.5),
      createCell('cell11', 'Cell 11', 'biomarker3', 'Biomarker 3', 57, 0.3),
      createCell('cell12', 'Cell 12', 'biomarker2', 'Biomarker 2', 45, 0.1),
      createCell('cell13', 'Cell 13', 'biomarker4', 'Biomarker 4', 45, 0.1),
      createCell('cell13', 'Cell 13', 'biomarker5', 'Biomarker 5', 45, 0.1),
      createCell('cell13', 'Cell 13', 'biomarker6', 'Biomarker 6', 45, 0.1),
      createCell('cell13', 'Cell 13', 'biomarker7', 'Biomarker 7', 45, 0.1),
      createCell('cell13', 'Cell 13', 'biomarker8', 'Biomarker 8', 45, 0.1),
    ],
  },
  summary2: {
    label: 'Summary 2',
    entries: [createCell('cell1', 'Cell 1', 'biomarker2', 'Biomarker 2', 20, 1)],
  },
};

/** Implementation of TissueFtuService */
@Injectable({
  providedIn: 'root',
})
export class MockTissueFtuService extends TissueFtuService {
  /** Implementation of getReferenceOrgans method */
  getReferenceOrgans(): Observable<ReferenceOrgan[]> {
    return of(MOCK_REFERENCE_ORGANS);
  }

  /** Implementation of abstract method */
  getCellSummaries(): Observable<unknown> {
    return of(MOCK_SUMMARIES);
  }
}
