import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganSelectorComponent } from './organ-selector.component';

@NgModule({
  declarations: [OrganSelectorComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  exports: [OrganSelectorComponent],
})
export class OrganSelectorModule {}
