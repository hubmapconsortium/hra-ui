import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavItemComponent],
  exports: [NavItemComponent],
})
export class NavItemModule {}
