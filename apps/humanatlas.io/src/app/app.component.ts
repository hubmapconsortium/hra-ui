import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { PageSectionComponent } from '@hra-ui/design-system/content-template/page-section';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PageNavigationComponent } from '@hra-ui/design-system/content-template/page-navigation';

import { CarouselComponent } from './components-v2/carousel/carousel.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Root component
 */
@Component({
  selector: 'ccf-root',
  imports: [
    CommonModule,
    NavigationModule,
    CarouselComponent,
    PageSectionComponent,
    ProductLogoComponent,
    MatIconModule,
    ButtonsModule,
    PageNavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
