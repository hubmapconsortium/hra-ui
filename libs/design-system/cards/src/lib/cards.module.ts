import { NgModule } from '@angular/core';
import { ActionCardActionComponent, ActionCardComponent } from '@hra-ui/design-system/cards/action-card';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { GalleryCardComponent } from '@hra-ui/design-system/cards/gallery-card';

@NgModule({
  imports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent, GalleryCardComponent],
  exports: [ActionCardComponent, ActionCardActionComponent, FlatCardModule, ProfileCardComponent, GalleryCardComponent],
})
export class CardsModule {}
