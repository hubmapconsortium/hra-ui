import { NgModule } from '@angular/core';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from './expansion-panel.component';

/** Expansion panel module */
@NgModule({
  imports: [ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelComponent],
  exports: [ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelComponent],
})
export class ExpansionPanelModule {}
