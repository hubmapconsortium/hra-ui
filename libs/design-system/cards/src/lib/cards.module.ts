import { NgModule } from '@angular/core';
import { ActionCardElevatedComponent } from '@hra-ui/design-system/cards/action-card-elevated';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ActionCardOutlineDefaultComponent } from '@hra-ui/design-system/cards/action-card-outline-default';
import { ActionCardOutlineLargeImageComponent } from '@hra-ui/design-system/cards/action-card-outline-large-image';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { ActionCardFlatComponent } from '@hra-ui/design-system/cards/action-card-flat';

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [
  ActionCardElevatedComponent,
  ActionCardFlatComponent,
  ActionCardOutlineDefaultComponent,
  ActionCardOutlineLargeImageComponent,
  FlatCardModule,
  ProfileCardComponent,
];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class CardsModule {}
