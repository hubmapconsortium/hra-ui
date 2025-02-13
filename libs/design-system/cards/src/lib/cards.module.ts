import { NgModule } from '@angular/core';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';

const REEXPORTS = [FlatCardModule];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class CardsModule {}
