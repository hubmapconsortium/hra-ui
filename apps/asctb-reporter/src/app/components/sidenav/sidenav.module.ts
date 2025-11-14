import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { AsyncDetection } from 'ngx-scrollbar';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, AsyncDetection, ScrollingModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavModule {}
