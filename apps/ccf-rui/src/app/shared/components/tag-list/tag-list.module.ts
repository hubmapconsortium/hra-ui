import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { TagListComponent } from './tag-list.component';

@NgModule({
  imports: [CommonModule, MatChipsModule, MatIconModule],
  declarations: [TagListComponent],
  exports: [TagListComponent],
})
export class TagListModule {}
