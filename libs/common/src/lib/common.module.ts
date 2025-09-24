import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalyticsModule } from '@hra-ui/common/analytics';
import { UrlModule } from '@hra-ui/common/url';
import { SlugifyPipe } from './slugify/slugify.pipe';

/**
 * Provides common directives and pipes.
 * Also reexports Angular's common module for ease of use.
 */
@NgModule({
  imports: [SlugifyPipe],
  exports: [CommonModule, AnalyticsModule, UrlModule, SlugifyPipe],
})
export class HraCommonModule {}
