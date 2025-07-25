import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SidenavHeaderComponent } from '../sidenav-header/sidenav-header.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    SidenavHeaderComponent,
    MatButtonModule,
    FileUploadComponent,
    MatCardModule,
  ],
  exports: [UploadComponent],
})
export class UploadModule {}
