import { NgModule } from '@angular/core';
import { AppUrlPipe } from './url/app';
import { AssetUrlPipe } from './url/asset';
import { CssUrlPipe } from './url/css';
import { PageUrlPipe } from './url/page';

@NgModule({
  imports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
  exports: [AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
})
export class UrlModule {}
