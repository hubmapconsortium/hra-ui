import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { routeData } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { environment } from '../environments/environment';
import { ConfigService } from './app-config.service';
import { TableNestedMenuComponent } from './components/table-nested-menu/table-nested-menu.component';
import { ConsentService } from './services/consent.service';

declare let gtag: (arg1?: unknown, arg2?: unknown, arg3?: unknown) => void;

@Component({
  selector: 'app-reporter',
  host: { class: 'hra-app' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    RouterModule,
    MatIconModule,
    ButtonsModule,
    PlainTooltipDirective,
    TableNestedMenuComponent,
    CommonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Consent Service */
  readonly consentService = inject(ConsentService);

  /** Configuration Service */
  readonly configService = inject(ConfigService);

  /** Snackbar Service */
  readonly snackbar = inject(MatSnackBar);

  /** Angular Router */
  readonly router = inject(Router);

  /** Data for breadcrumbs in navigation header. */
  private readonly data = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(() => this.data()['crumbs'] as BreadcrumbItem[] | undefined);

  /** Initialize the component */
  constructor() {
    switch (environment.tag) {
      case 'Staging':
        document.title = 'ASCT+B Reporter | Staging';
        break;
      case 'Development':
        document.title = 'ASCT+B Reporter | Development';
        break;
      default:
        document.title = 'ASCT+B Reporter';
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
