import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '@hra-ui/design-system/footer';
import { HeaderComponent } from './components/header/header.component';

/**
 * App Component
 */
@Component({
  selector: 'hra-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
  /** Initialize app */
  constructor() {
    inject(Router).initialNavigation();
  }
}
