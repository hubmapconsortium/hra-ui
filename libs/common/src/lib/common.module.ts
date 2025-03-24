import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetUrlPipe } from './assets-href/asset-url.pipe';

@NgModule({
  imports: [AssetUrlPipe],
  exports: [CommonModule, AssetUrlPipe],
})
export class HraCommonModule {}
