import { NgModule } from '@angular/core';
import { MetadataLayoutComponent, MetadataLayoutHeaderComponent } from './metadata-layout.component';

/** Table of contents modules */
@NgModule({
  imports: [MetadataLayoutComponent, MetadataLayoutHeaderComponent],
  exports: [MetadataLayoutComponent, MetadataLayoutHeaderComponent],
})
export class MetadataLayoutModule {}
