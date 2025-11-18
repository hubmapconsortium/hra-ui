import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { HraCommonModule } from '@hra-ui/common';
import { ErrorComponent } from '../../components/error/error.component';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { UploadComponent } from '../../components/upload/upload.component';
import { TreeModule } from '../tree/tree.module';
import { PlaygroundComponent } from './playground.component';

@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    HraCommonModule,
    MatTabsModule,
    TreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
    UploadComponent,
    ErrorComponent,
  ],
  exports: [PlaygroundComponent],
})
export class PlaygroundModule {}
