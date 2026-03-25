import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavModule {}
