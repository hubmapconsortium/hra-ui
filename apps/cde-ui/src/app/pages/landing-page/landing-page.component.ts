import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HraCommonModule, routeData } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { VisualCard, VisualCardComponent } from '../../components/visual-card/visual-card.component';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Landing Page Component
 */
@Component({
  selector: 'cde-landing-page',
  imports: [
    HraCommonModule,
    VisualCardComponent,
    MatIconModule,
    ButtonsModule,
    YouTubePlayerModule,
    NavigationModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Visual cards to display on the landing page */
  readonly cards = input<VisualCard[]>([]);

  /**
   * Route data of app component
   */
  private readonly data = routeData();

  /**
   * Breadcrumbs data (computed from above signal).
   */
  protected readonly crumbs = computed(() => this.data()['crumbs'] as BreadcrumbItem[] | undefined);
}
