import { NgModule } from '@angular/core';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { WebComponentCardComponent } from '@hra-ui/design-system/cards/web-component-card';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [FlatCardModule, WebComponentCardComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class CardsModule {}
