import { NgModule } from '@angular/core';
import { HubmapNavComponent } from './hubmap-nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [HubmapNavComponent],
  imports: [BrowserModule, RouterModule, MatIconModule, MatMenuModule],
  exports: [HubmapNavComponent],
})
export class HubmapNavModule {}
