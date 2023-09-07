import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

/** A component that displays its content in fullscreen mode when its isFullScreen property is set to true */
@Component({
  selector: 'hra-fullscreen-content',
  standalone: true,
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  animations: [
    trigger('animateResize', [
      state(
        'true',
        style({
          width: '100%',
          position: 'absolute',
          right: 0,
        })
      ),
      state(
        'false',
        style({
          width: '50%',
          position: 'absolute',
          right: 0,
        })
      ),
      transition('true <=> false', [animate('0.5s ease')]),
    ]),
  ],
  template: '<ng-content></ng-content>',
  styleUrls: ['./fullscreen-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenContentComponent {
  /** This binds the isFullScreen property to the class.fullscreen-on when isFullScreen is true */
  @HostBinding('class.fullscreen-on')
  /** This binds the isFullScreen property to the @animateResize when isFullScreen is true */
  @HostBinding('@animateResize')
  isFullScreen = false;
}
