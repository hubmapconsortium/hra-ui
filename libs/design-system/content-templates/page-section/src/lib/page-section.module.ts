import { NgModule } from '@angular/core';
import {
  PageSectionComponent,
  PageSectionContentComponent,
  PageSectionHeaderComponent,
} from './page-section.component';

@NgModule({
  imports: [PageSectionComponent, PageSectionContentComponent, PageSectionHeaderComponent],
  exports: [PageSectionComponent, PageSectionContentComponent, PageSectionHeaderComponent],
})
export class PageSectionModule {}
