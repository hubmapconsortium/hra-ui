import { ClipboardModule } from '@angular/cdk/clipboard';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  InjectionToken,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BackButtonBarComponent } from '@hra-ui/design-system/buttons/back-button-bar';
import { CardsModule } from '@hra-ui/design-system/cards';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WebComponentCardComponent } from '@hra-ui/design-system/cards/web-component-card';
import { EmbedSidenavContentComponent } from './embed-sidenav-content/embed-sidenav-content.component';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { ComponentDef } from './types/component-defs.schema';
import { Organ } from './types/organs.schema';

/** Sidenav Data */
interface SidenavData {
  tagline: string;
  code: string;
  showApp: boolean;
  tabIndex: number;
  docLink: string;
}

/** App Iframe Data */
interface AppIframeData {
  tagline: string;
  code: SafeHtml;
}

/** External App Data */
interface ExternalAppData {
  url: string;
}

/** Injection token for the window object */
export const WINDOW = new InjectionToken<typeof window>('window', {
  providedIn: 'root',
  factory: () => window,
});

/**
 * Web Components Component
 */
@Component({
  selector: 'hra-web-components',
  standalone: true,
  imports: [
    ButtonsModule,
    CommonModule,
    ClipboardModule,
    CardsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,

    BackButtonBarComponent,
    EmbedSidenavContentComponent,
    ProductLogoComponent,
    SoftwareStatusIndicatorComponent,
    WebComponentCardComponent,
  ],
  templateUrl: './web-components.component.html',
  styleUrls: ['./web-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentsComponent {
  /** List of all organs */
  protected readonly organs = ORGANS;
  /** List of all component defs */
  protected readonly components = COMPONENT_DEFS;

  /** Currently active organ */
  protected readonly activeOrgan = signal<Organ | undefined>(undefined);
  /** Data to be displayed in the Sidenav */
  protected readonly sidenavData = signal<SidenavData | undefined>(undefined);
  /** Data to be displayed in the AppIframe */
  protected readonly appIframeData = signal<AppIframeData | undefined>(undefined);

  /** Window object */
  private readonly window = inject(WINDOW);
  /** Sanitizer for bypassing HTML */
  private readonly sanitizer = inject(DomSanitizer);

  /** Overlay */
  private readonly overlay = inject(Overlay);
  /** View Container Reference */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /** Sidenav Template */
  private readonly sidenavTemplate = viewChild.required('sidenavTemplate', { read: TemplateRef });
  /** Portal for the Sidenav */
  private readonly sidenavPortal = computed(() => new TemplatePortal(this.sidenavTemplate(), this.viewContainerRef));
  /** AppIframe Template */
  private readonly appIframeTemplate = viewChild.required('appIframeTemplate', { read: TemplateRef });
  /** Portal for the AppIframe */
  private readonly appIframePortal = computed(
    () => new TemplatePortal(this.appIframeTemplate(), this.viewContainerRef),
  );

  /** Creates overlay for the Sidenav */
  private readonly sidenavOverlay = this.overlay.create({
    disposeOnNavigation: true,
    hasBackdrop: true,
    height: '100vh',
    maxWidth: '50vw',
    positionStrategy: this.overlay.position().global().top().right(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

  /** Creates overlay for the AppIframe */
  private readonly appIframeOverlay = this.overlay.create({
    disposeOnNavigation: true,
    height: '100vh',
    width: '100vw',
    panelClass: 'app-iframe-panel',
    positionStrategy: this.overlay.position().global().top().left(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

  /** Constructor that initializes sidenavdata and appiframedata and attaches portal */
  constructor() {
    effect((cleanup) => {
      if (this.sidenavData() !== undefined) {
        this.sidenavOverlay.attach(this.sidenavPortal());
        cleanup(() => this.sidenavOverlay.detach());
      }
    });

    effect((cleanup) => {
      if (this.appIframeData() !== undefined) {
        this.appIframeOverlay.attach(this.appIframePortal());
        cleanup(() => this.appIframeOverlay.detach());
      }
    });
  }

  /**
   * Triggered when useApp button is clicked with the given organ and component def.
   */
  onUseApp(organ: Organ, def: ComponentDef): void {
    switch (def.embedAs) {
      case 'inline':
        this.openSidenav(organ, def, 1);
        break;

      case 'overlay':
        this.openOverlay(organ, def);
        break;

      case 'external':
        this.openExternal(organ, def);
        break;
    }
  }

  /** Opens sidenav with sidenavData */
  openSidenav(organ: Organ, def: ComponentDef, tabIndex: number): void {
    this.sidenavData.set({
      tagline: `${def.productTitle} ${def.webComponentName}`,
      code: this.getEmbedTemplate(organ, def),
      showApp: def.embedAs === 'inline',
      tabIndex: tabIndex,
      docLink: def.docLink,
    });
  }

  /** Opens overlay with appIframeData */
  openOverlay(organ: Organ, def: ComponentDef): void {
    this.appIframeData.set({
      tagline: `${def.productTitle} ${def.webComponentName}`,
      code: this.sanitizer.bypassSecurityTrustHtml(this.getEmbedTemplate(organ, def)),
    });
  }

  /** Opens external app */
  openExternal(organ: Organ, def: ComponentDef): void {
    const { url } = organ.appData[def.id] as ExternalAppData;
    this.window.open(url, '_blank');
  }

  /** Closes the sidenav */
  closeOverlay(): void {
    this.appIframeData.set(undefined);
  }

  /** Returns the interpolated template */
  private getEmbedTemplate(organ: Organ, def: ComponentDef): string {
    const template = EMBED_TEMPLATES[def.id];
    const appData = organ.appData[def.id] ?? {};
    return this.interpolateTemplate(template, appData);
  }

  /** Interpolates the template with the given replacements */
  private interpolateTemplate(template: string, replacements: Record<string, unknown>): string {
    return template.replace(/{{(\w+?)}}/g, (_match, key) => {
      const value = replacements[key];
      if (typeof value === 'string') {
        return value;
      }
      return JSON.stringify(value, undefined, 1).replace(/\n\s*/g, ' ');
    });
  }
}
