import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-fullscreen-content',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrls: ['./fullscreen-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenContentComponent {
  /** This binds the isFullScreen property to the class.fullscreen-on when isFullScreen is true */
  @HostBinding('class.fullscreen-on') isFullScreen = false;
}
