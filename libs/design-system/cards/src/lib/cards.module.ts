import { NgModule } from '@angular/core';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { WebComponentCardComponent } from '@hra-ui/design-system/cards/web-component-card';

const REEXPORTS = [FlatCardModule, WebComponentCardComponent];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class CardsModule {}
