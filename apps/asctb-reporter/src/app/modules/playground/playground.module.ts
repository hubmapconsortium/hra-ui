import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { UploadModule } from '../../components/upload/upload.module';
import { TreeModule } from '../tree/tree.module';
import { PlaygroundComponent } from './playground.component';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    TreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
    UploadModule,
  ],
  exports: [PlaygroundComponent],
})
export class PlaygroundModule {}
