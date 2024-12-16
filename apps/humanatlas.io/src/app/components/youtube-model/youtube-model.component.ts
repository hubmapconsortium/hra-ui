import { Component, HostListener, Input, OnInit } from '@angular/core';
import { YoutubeModel } from './youtube-model';

/** Displayes a Youtube player with title */
@Component({
  selector: 'youtube-model',
  templateUrl: './youtube-model.component.html',
  styleUrls: ['./youtube-model.component.scss'],
  standalone: false,
})
export class YoutubeModelComponent implements OnInit {
  /** Details of youtube player and video */
  @Input() playerData!: YoutubeModel;

  /** Flag to check if the script is loaded */
  apiLoaded = false;

  /** Loads the script in the current document */
  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    this.playerSize();
  }

  /** Function to handle resize event and change size of youtube player */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.playerSize();
  }

  /** Changes the size of youtube player */
  playerSize() {
    this.playerData.width = Math.min(552, window.innerWidth * 0.85);
    this.playerData.height = Math.min(311, this.playerData.width * 0.5625);
  }
}
