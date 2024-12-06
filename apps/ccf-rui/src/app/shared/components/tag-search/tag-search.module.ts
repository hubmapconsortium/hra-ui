import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TagSearchComponent } from './tag-search.component';
import { provideInput } from '@hra-ui/design-system/input';
import { IconButtonSizeDirective, provideIconButtons } from '@hra-ui/design-system/icon-button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    IconButtonSizeDirective,
  ],
  providers: [provideInput(), provideIconButtons()],
  declarations: [TagSearchComponent],
  exports: [TagSearchComponent],
})
export class TagSearchModule {}
