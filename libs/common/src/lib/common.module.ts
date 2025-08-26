import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule } from '@hra-ui/common/url';

/**
 * Provides common directives and pipes.
 * Also reexports Angular's common module for ease of use.
 */
@NgModule({
  imports: [],
  exports: [CommonModule, UrlModule],
})
export class HraCommonModule {}
