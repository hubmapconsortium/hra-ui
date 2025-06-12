import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetUrlPipe } from './assets-href/asset-url.pipe';

/**
 * Provides common directives and pipes.
 * Also reexports Angular's common module for ease of use.
 */
@NgModule({
  imports: [AssetUrlPipe],
  exports: [CommonModule, AssetUrlPipe],
})
export class HraCommonModule {}
