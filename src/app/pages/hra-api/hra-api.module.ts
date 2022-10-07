import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { UseButtonModule } from 'src/app/components/use-button/use-button.module';
import { HraApiComponent } from './hra-api.component';


@NgModule({
  declarations: [
    HraApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    UseButtonModule
  ],
  providers: [],
  bootstrap: [HraApiComponent]
})
export class HraApiModule { }
