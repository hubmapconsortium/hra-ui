import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NavItemModule } from '../../components/nav-item/nav-item.module';
import { TableNestedMenuComponent } from '../../components/table-nested-menu/table-nested-menu.component';
import { SearchModule } from '../search/search.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    NavItemModule,
    SearchModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TableNestedMenuComponent,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
