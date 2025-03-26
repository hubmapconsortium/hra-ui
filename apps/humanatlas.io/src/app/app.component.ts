import { Component } from '@angular/core';
import { NavigationModule } from '@hra-ui/design-system/navigation';

import { CarouselComponent } from './components-v2/carousel/carousel.component';
import { SectionCardsComponent } from './components-v2/section-cards/section-cards.component';

/**
 * Root component
 */
@Component({
  selector: 'ccf-root',
  imports: [NavigationModule, CarouselComponent, SectionCardsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {}
