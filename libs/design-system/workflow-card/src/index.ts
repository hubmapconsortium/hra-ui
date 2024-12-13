import { NgModule } from '@angular/core';
import {
  WorkflowCardActionsComponent,
  WorkflowCardComponent,
  WorkflowCardExtraComponent,
} from './lib/workflow-card.component';

export * from './lib/deprecated/workflow-card.component';
export * from './lib/workflow-card.component';

/** All components */
const COMPONENTS = [WorkflowCardComponent, WorkflowCardActionsComponent, WorkflowCardExtraComponent];

/** Main module */
@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class WorkflowCardModule {}
