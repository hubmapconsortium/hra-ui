import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { AboutComponent } from './about.component';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule
  ],
  providers: [],
  bootstrap: [AboutComponent]
})
export class AboutModule { }
