import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuTreeModule } from 'src/app/components/menu-tree/menu-tree.module';
import { PageRendererModule } from 'src/app/components/page-renderer/page-renderer.module';

import { AppRoutingModule } from '../../app-routing.module';
import { ContactCardModule } from '../../components/contact-card/contact-card.module';
import { PageDataModule } from '../../components/page-data/page-data.module';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { UseButtonModule } from '../../components/use-button/use-button.module';
import { FourthReleaseNotesComponent } from './fourth-release-notes.component';


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
    MatListModule,
    MatIconModule,
    MenuTreeModule,
    PageRendererModule
  ],
  providers: [],
  bootstrap: []
})
export class FourthReleaseNotesModule { }
