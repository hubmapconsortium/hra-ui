import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DownloadFtuComponent } from './download-ftu.component';
import { ChooseVersionModule } from '../choose-version/choose-version.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [DownloadFtuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChooseVersionModule,
    MatTableModule,
    MatSortModule,
  ],
  exports: [DownloadFtuComponent],
})
export class DownloadFtuModule {}
