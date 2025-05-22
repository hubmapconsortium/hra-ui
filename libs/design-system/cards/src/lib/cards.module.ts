import { NgModule } from '@angular/core';
import { ActionCardElevatedComponent } from '@hra-ui/design-system/cards/action-card-elevated';
import { ActionCardFlatComponent } from '@hra-ui/design-system/cards/action-card-flat';
import { ActionCardOutlineDefaultComponent } from '@hra-ui/design-system/cards/action-card-outline-default';
import { ActionCardOutlineLargeImageComponent } from '@hra-ui/design-system/cards/action-card-outline-large-image';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';

@NgModule({
  imports: [
    ActionCardElevatedComponent,
    ActionCardFlatComponent,
    ActionCardOutlineDefaultComponent,
    ActionCardOutlineLargeImageComponent,
    FlatCardModule,
    ProfileCardComponent,
  ],
  exports: [
    ActionCardElevatedComponent,
    ActionCardFlatComponent,
    ActionCardOutlineDefaultComponent,
    ActionCardOutlineLargeImageComponent,
    FlatCardModule,
    ProfileCardComponent,
  ],
})
export class CardsModule {}
