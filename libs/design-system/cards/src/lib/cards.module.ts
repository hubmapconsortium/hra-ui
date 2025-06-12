import { NgModule } from '@angular/core';
import { ActionCardActionComponent, ActionCardComponent } from '@hra-ui/design-system/cards/action-card';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';

@NgModule({
  imports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent],
  exports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent],
})
export class CardsModule {}
