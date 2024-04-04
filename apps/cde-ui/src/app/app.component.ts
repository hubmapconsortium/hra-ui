import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';

/**
 * App component for CDE
 */
@Component({
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  selector: 'cde-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * Application title
   */
  title = 'cde-ui';
}
