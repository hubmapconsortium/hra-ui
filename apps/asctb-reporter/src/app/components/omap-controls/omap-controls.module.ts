import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HraCommonModule } from '@hra-ui/common';
import { OmapControlsComponent } from './omap-controls.component';

@NgModule({
  declarations: [OmapControlsComponent],
  imports: [
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    HraCommonModule,
  ],
  exports: [OmapControlsComponent],
})
export class OmapControlsModule {}
