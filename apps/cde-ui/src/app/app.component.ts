import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule, routeData } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { LinkDirective } from '@hra-ui/common/router-ext';

/**
 * App component for CDE
 */
@Component({
  selector: 'cde-root',
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    NavigationModule,
    ButtonsModule,
    PlainTooltipDirective,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    HraCommonModule,
    LinkDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent extends BaseApplicationComponent {
  /**
   * Route data of app component
   */
  private readonly data = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(() => {
    let crumbs = [...(this.data()['crumbs'] ?? [])];

    if (this.data()['studyCrumb']) {
      crumbs = crumbs.concat([{ name: this.data()['studyCrumb'] }]);
    }

    if (this.data()['data']?.metadata?.sourceFileName) {
      crumbs = crumbs.concat([{ name: this.data()['data'].metadata.sourceFileName }]);
    }
    return crumbs;
  });

  /** Header visibility (whether to show header or not) */
  protected readonly header = computed(() => this.data()['header'] as boolean | undefined);

  /** Initialize app */
  constructor() {
    super({ screenSizeNotice: { width: 1280, height: 832 } });
    inject(Router).initialNavigation();
  }
}
