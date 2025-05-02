import { NgModule } from '@angular/core';
import {
  TableOfContentsLayoutComponent,
  TableOfContentsLayoutHeaderComponent,
} from './table-of-contents-layout.component';

/** Table of contents modules */
@NgModule({
  imports: [TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent],
  exports: [TableOfContentsLayoutComponent, TableOfContentsLayoutHeaderComponent],
})
export class TableOfContentsLayoutModule {}
