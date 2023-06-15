import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';
import { AppRoutingModule } from '../../app-routing.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { FifthReleaseNotesComponent } from './fifth-release-notes.component';


@NgModule({
  declarations: [
    FifthReleaseNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    PageRendererModule
  ],
  providers: [],
  bootstrap: []
})
export class FifthReleaseNotesModule { }
