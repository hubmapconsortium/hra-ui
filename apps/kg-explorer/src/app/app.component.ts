import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HraKgService } from '@hra-api/ng-client';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { MarkdownModule } from 'ngx-markdown';

import { HelpMenuOptions } from './app.routes';
import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/** Default help menu options */
export const DEFAULT_HELP_OPTIONS: HelpMenuOptions[] = [
  {
    label: 'Data Overview',
    url: 'https://humanatlas.io/overview-data',
  },
  {
    label: 'Knowledge Graph',
    url: 'https://docs.humanatlas.io/dev/kg',
    description: 'App guidance & documentation',
  },
  {
    label: 'Read publication',
    url: 'https://doi.org/10.1038/s41597-025-05183-6',
    divider: true,
  },
];

/**
 * Main application component
 */
@Component({
  imports: [
    HraCommonModule,
    RouterModule,
    NavigationModule,
    MarkdownModule,
    ButtonsModule,
    IconsModule,
    PlainTooltipDirective,
    MatMenuModule,
    MatDividerModule,
  ],
  selector: 'hra-kg-explorer',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Router instance for navigation */
  private readonly router = inject(Router);
  /** Activated route service */
  private readonly route = inject(ActivatedRoute);

  /** HRA KG API service */
  private readonly kg = inject(HraKgService);

  /** Page title to display on the breadcrumbs */
  private readonly pageTitle = signal<string>('');

  /** Data for breadcrumbs in navigation header. */
  private readonly data = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(() => {
    if (this.params().length > 0) {
      return [
        { name: 'Apps', route: 'https://apps.humanatlas.io/' },
        { name: 'Knowledge Graph', route: '/' },
        { name: this.pageTitle() },
      ];
    }
    return [{ name: 'Apps', route: 'https://apps.humanatlas.io/' }, { name: 'Knowledge Graph' }];
  });

  /** Menu options to display in the help menu on the header */
  readonly helpMenuOptions = signal<HelpMenuOptions[] | undefined>(undefined);

  /** Url linking to documentation for an object type */
  protected readonly documentationUrl = computed<string>(() => this.data()['documentationUrl']);

  /** DO type label */
  protected readonly typeLabel = computed<string>(() => this.data()['typeLabel']);

  /** Extra option containing the digital object type documentation on the metadata page help menu */
  protected readonly extraMenuOption = signal<HelpMenuOptions | undefined>({ label: '', url: '' });

  /** If the user is navigating to a different page */
  protected readonly isNavigating = isNavigating();

  /** Route params used to calculate objectLod */
  readonly params = signal<string[]>([]);

  /** Id of digital object computed from params */
  readonly objectId = computed(() => ['https://lod.humanatlas.io'].concat(this.params()).join('/'));

  /**
   * Gets the page title for breadcrumbs
   */
  constructor() {
    effect(() => {
      if (this.typeLabel() && this.documentationUrl()) {
        this.extraMenuOption.set({
          label: this.typeLabel(),
          url: this.documentationUrl(),
          description: 'Data documentation for this digital object type',
        });
      } else {
        this.extraMenuOption.set(undefined);
      }
    });

    effect(() => {
      const a = DEFAULT_HELP_OPTIONS;
      const b = this.extraMenuOption();
      if (b) {
        this.helpMenuOptions.set([a[0], b].concat(a.slice(1)));
      } else {
        this.helpMenuOptions.set(a);
      }
    });

    this.router.events.subscribe(() => {
      const type = this.route.snapshot.root.firstChild?.params['type'];
      const name = this.route.snapshot.root.firstChild?.params['name'];
      if (type && name) {
        this.params.set([type, name]);
      } else {
        this.params.set([]);
      }
    });

    toObservable(this.objectId).subscribe((id) => {
      this.kg.digitalObjects().subscribe((data) => {
        const match = data['@graph']?.find((object) => object['@id'] === id);
        this.pageTitle.set(match?.title || '');
      });
    });
  }
}
