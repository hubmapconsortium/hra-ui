import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { AsyncDetection } from 'ngx-scrollbar';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, MatButtonModule, AsyncDetection, ScrollingModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
