import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenuTreeModule } from '../menu-tree/menu-tree.module';
import { NavbarComponent } from './../navbar/navbar.component';
import { ToolbarComponent } from './toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HubmapNavModule } from '../hubmap-nav/hubmap-nav.module';

@NgModule({
  declarations: [ToolbarComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RouterModule,
    MatToolbarModule,
    MenuTreeModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HubmapNavModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
