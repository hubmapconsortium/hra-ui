import { NgModule } from '@angular/core';
import { NavigationRailItemComponent } from './navigation-rail-item.component';
import { NavigationRailMenuDirective } from './navigation-rail-menu.directive';
import { NavigationRailBottomDirective, NavigationRailComponent } from './navigation-rail.component';

/** Navigation rail module */
@NgModule({
  imports: [
    NavigationRailComponent,
    NavigationRailItemComponent,
    NavigationRailBottomDirective,
    NavigationRailMenuDirective,
  ],
  exports: [
    NavigationRailComponent,
    NavigationRailItemComponent,
    NavigationRailBottomDirective,
    NavigationRailMenuDirective,
  ],
})
export class NavigationRailModule {}
