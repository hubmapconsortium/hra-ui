import { NgModule } from '@angular/core';
import { FlatCardActionsComponent, FlatCardComponent } from './flat-card.component';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [FlatCardComponent, FlatCardActionsComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class FlatCardModule {}
