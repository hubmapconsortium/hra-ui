import { Component } from '@angular/core';
import { NavigationModule } from '@hra-ui/design-system/navigation';

import { CarouselComponent } from './components-v2/carousel/carousel.component';
import { CountInfoComponent } from './components-v2/count-info/count-info.component';

/**
 * Root component
 */
@Component({
  selector: 'ccf-root',
  imports: [NavigationModule, CarouselComponent, CountInfoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {}
