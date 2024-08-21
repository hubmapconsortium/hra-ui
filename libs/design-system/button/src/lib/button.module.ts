import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CallToActionButtonDirective } from './directives/call-to-action-button.directive';
import { PrimaryButtonDirective } from './directives/primary-button.directive';
import { SecondaryButtonDirective } from './directives/secondary-button.directive';
import { NavigationCategoryButtonDirective } from './directives/navigation-category-button.directive';

/** Module exporting button and related utilities */
@NgModule({
  imports: [
    CallToActionButtonDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    NavigationCategoryButtonDirective,
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    CallToActionButtonDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    NavigationCategoryButtonDirective,
  ],
})
export class ButtonModule {}
