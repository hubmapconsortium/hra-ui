import { YoutubeModelComponent } from './youtube-model.component';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    YoutubeModelComponent
  ],
  imports: [
    YouTubePlayerModule
  ], 
  exports:[YoutubeModelComponent]
})
export class YoutubeModelModule { }
