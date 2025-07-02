import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideDesignSystem } from '@hra-ui/design-system';
import { VisControlsComponent } from './vis-controls.component';

@NgModule({
  declarations: [VisControlsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  exports: [VisControlsComponent],
  providers: [provideDesignSystem()],
})
export class ControlsModule {}
