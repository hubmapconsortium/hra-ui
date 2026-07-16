import { NgModule } from '@angular/core';
import { ActionCardActionComponent, ActionCardComponent } from '@hra-ui/design-system/cards/action-card';
import { FlatCardModule } from '@hra-ui/design-system/cards/flat-card';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { GalleryCardComponent } from '@hra-ui/design-system/cards/gallery-card';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';

@NgModule({
  imports: [
    ActionCardComponent,
    ActionCardActionComponent,
    FlatCardModule,
    ProfileCardComponent,
    GalleryCardComponent,
    ContentButtonComponent,
  ],
  exports: [
    ActionCardComponent,
    ActionCardActionComponent,
    FlatCardModule,
    ProfileCardComponent,
    GalleryCardComponent,
    ContentButtonComponent,
  ],
})
export class CardsModule {}
