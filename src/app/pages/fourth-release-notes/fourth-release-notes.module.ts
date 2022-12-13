import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FourthReleaseNotesComponent } from './fourth-release-notes.component';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { PageDataModule } from 'src/app/components/page-data/page-data.module';
import { MatDividerModule } from '@angular/material/divider';
import { UseButtonModule } from 'src/app/components/use-button/use-button.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactCardModule } from 'src/app/components/contact-card/contact-card.module';

@NgModule({
  declarations: [
    FourthReleaseNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageHeaderModule,
    PageDataModule,
    MatDividerModule,
    UseButtonModule,
    MatIconModule,
    MatButtonModule,
    ContactCardModule
  ],
  providers: [],
  bootstrap: []
})
export class FourthReleaseNotesModule { }
