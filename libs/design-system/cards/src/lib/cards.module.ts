import { NgModule } from '@angular/core';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { WebComponentCardComponent } from '@hra-ui/design-system/cards/web-component-card';

@NgModule({
  imports: [FlatCardModule, WebComponentCardComponent, ProfileCardComponent],
  exports: [FlatCardModule, WebComponentCardComponent, ProfileCardComponent],
})
export class CardsModule {}
