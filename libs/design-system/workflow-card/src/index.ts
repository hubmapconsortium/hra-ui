import { NgModule } from '@angular/core';
import {
  WorkflowCardActionsComponent,
  WorkflowCardExtraComponent,
  WorkflowCardV2Component,
} from './lib/v2/workflow-card-v2.component';
import { WorkflowCardComponent } from './lib/workflow-card.component';

export * from './lib/v2/workflow-card-v2.component';
export * from './lib/workflow-card.component';

/** V1 components */
const COMPONENTS_V1 = [WorkflowCardComponent];
/** V2 components */
const COMPONENTS_V2 = [WorkflowCardV2Component, WorkflowCardActionsComponent, WorkflowCardExtraComponent];

/** V1 module */
@NgModule({
  imports: COMPONENTS_V1,
  exports: COMPONENTS_V1,
})
export class WorkflowCardModule {}

/** V2 module */
@NgModule({
  imports: COMPONENTS_V2,
  exports: COMPONENTS_V2,
})
export class WorkflowCardV2Module {}
