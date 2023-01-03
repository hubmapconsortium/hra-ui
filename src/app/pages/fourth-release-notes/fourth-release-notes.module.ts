import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FourthReleaseNotesComponent } from './fourth-release-notes.component';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { MatDividerModule } from '@angular/material/divider';
import { UseButtonModule } from '../../components/use-button/use-button.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactCardModule } from '../../components/contact-card/contact-card.module';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

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
    ContactCardModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: []
})
export class FourthReleaseNotesModule { }
