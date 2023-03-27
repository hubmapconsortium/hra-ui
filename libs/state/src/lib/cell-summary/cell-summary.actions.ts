import { ActionGroup } from '@hra-ui/cdk/state';
import { z } from 'zod';
import { CELL_SUMMARY_SCHEMA } from './cell-summary.model';

/** Base action factory */
const Action = ActionGroup('ResourceRegistry');

/** Set data to the store */
export class SetData extends Action('SetData') {
  constructor(readonly data: object) {
    super();
  }
}

/** Computes aggregrate for the data */
export class ComputeAggregate extends Action('ComputeAggregate') {
  constructor(readonly summaries: z.infer<typeof CELL_SUMMARY_SCHEMA>) {
    super();
  }
}
