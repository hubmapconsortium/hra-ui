import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ButtonSizeDirective } from './button-size/button-size.directive';
import { CallToActionButtonDirective } from './directives/call-to-action-button.directive';
import { NavigationItemButtonDirective } from './directives/nav-item-button.directive';
import { NavigationCategoryButtonDirective } from './directives/navigation-category-button.directive';
import { PrimaryButtonDirective } from './directives/primary-button.directive';
import { SecondaryButtonDirective } from './directives/secondary-button.directive';

/** Module exporting button and related utilities */
@NgModule({
  imports: [
    CallToActionButtonDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    NavigationCategoryButtonDirective,
    NavigationItemButtonDirective,
    ButtonSizeDirective,
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    CallToActionButtonDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    NavigationCategoryButtonDirective,
    NavigationItemButtonDirective,
    ButtonSizeDirective,
  ],
})
export class ButtonModule {}
