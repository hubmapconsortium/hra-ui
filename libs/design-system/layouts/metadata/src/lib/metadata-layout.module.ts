import { NgModule } from '@angular/core';
import {
  MetadataLayoutComponent,
  MetadataLayoutContentComponent,
  MetadataLayoutHeaderComponent,
} from './metadata-layout.component';

/** Table of contents modules */
@NgModule({
  imports: [MetadataLayoutComponent, MetadataLayoutHeaderComponent, MetadataLayoutContentComponent],
  exports: [MetadataLayoutComponent, MetadataLayoutHeaderComponent, MetadataLayoutContentComponent],
})
export class MetadataLayoutModule {}
