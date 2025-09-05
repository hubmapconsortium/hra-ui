import { NgModule } from '@angular/core';
import { AppUrlPipe, AssetUrlPipe, CssUrlPipe, PageUrlPipe, ResolveUrlPipe } from './url-resolver.pipe';

@NgModule({
  imports: [ResolveUrlPipe, AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
  exports: [ResolveUrlPipe, AppUrlPipe, AssetUrlPipe, PageUrlPipe, CssUrlPipe],
})
export class UrlModule {}
