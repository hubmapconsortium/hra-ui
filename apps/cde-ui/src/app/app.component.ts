import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ScreenSizeNoticeComponent } from './components/screen-size-notice/screen-size-notice.component';

/**
 * App component for CDE
 */
@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  selector: 'cde-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly screenSizeNoticeDetector = ScreenSizeNoticeComponent.createDetector({
    width: 1280,
    height: 832,
  });
}
