import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '@hra-ui/design-system/footer';
import { HeaderComponent } from './components/header/header.component';

/**
 * App Component
 */
@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'hra-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /** Initialize app */
  constructor() {
    inject(Router).initialNavigation();
  }
}
