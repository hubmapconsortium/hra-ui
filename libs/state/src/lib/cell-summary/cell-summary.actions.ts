import { ActionGroup } from '@hra-ui/cdk/state';
import { z } from 'zod';
import { CELL_SUMMARY_SCHEMA } from './cell-summary.model';

/** Base action factory */
const Action = ActionGroup('ResourceRegistry');

export class SetData extends Action('SetData') {
  /**
   * Set data to the store
   * @param data array of objects
   */
  constructor(readonly data: object) {
    super();
  }
}

export class ComputeAggregate extends Action('ComputeAggregate') {
  /**
   * Computes aggregrate for the data
   * @param summaries array of the aggregate data
   */
  constructor(readonly summaries: z.infer<typeof CELL_SUMMARY_SCHEMA>) {
    super();
  }
}
