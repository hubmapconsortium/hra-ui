import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

import { TagListComponent } from './tag-list.component';

@NgModule({
  imports: [HraCommonModule, MatChipsModule, MatIconModule],
  declarations: [TagListComponent],
  exports: [TagListComponent],
})
export class TagListModule {}
