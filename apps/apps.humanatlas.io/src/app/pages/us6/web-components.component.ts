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
import { WebComponentCardComponent } from '@hra-ui/design-system/web-component-card';
import { EmbedSidenavContentComponent } from './embed-sidenav-content/embed-sidenav-content.component';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { ComponentDef } from './types/component-defs.schema';
import { Organ } from './types/organs.schema';

interface SidenavData {
  tagline: string;
  code: string;
  showApp: boolean;
  tabIndex: number;
  docLink: string;
}

interface AppIframeData {
  tagline: string;
  code: SafeHtml;
}

interface ExternalAppData {
  url: string;
}

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
  protected readonly organs = ORGANS;
  protected readonly components = COMPONENT_DEFS;

  protected readonly activeOrgan = signal<Organ | undefined>(undefined);
  protected readonly sidenavData = signal<SidenavData | undefined>(undefined);
  protected readonly appIframeData = signal<AppIframeData | undefined>(undefined);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly sidenavTemplate = viewChild.required('sidenavTemplate', { read: TemplateRef });
  private readonly sidenavPortal = computed(() => new TemplatePortal(this.sidenavTemplate(), this.viewContainerRef));
  private readonly appIframeTemplate = viewChild.required('appIframeTemplate', { read: TemplateRef });
  private readonly appIframePortal = computed(
    () => new TemplatePortal(this.appIframeTemplate(), this.viewContainerRef),
  );

  private readonly sidenavOverlay = this.overlay.create({
    disposeOnNavigation: true,
    hasBackdrop: true,
    height: '100vh',
    maxWidth: '50vw',
    positionStrategy: this.overlay.position().global().top().right(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

  private readonly appIframeOverlay = this.overlay.create({
    disposeOnNavigation: true,
    height: '100vh',
    width: '100vw',
    panelClass: 'app-iframe-panel',
    positionStrategy: this.overlay.position().global().top().left(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

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

  openSidenav(organ: Organ, def: ComponentDef, tabIndex: number): void {
    this.sidenavData.set({
      tagline: `${def.productTitle} ${def.webComponentName}`,
      code: this.getEmbedTemplate(organ, def),
      showApp: def.embedAs === 'inline',
      tabIndex: tabIndex,
      docLink: def.docLink,
    });
  }

  openOverlay(organ: Organ, def: ComponentDef): void {
    this.appIframeData.set({
      tagline: `${def.productTitle} ${def.webComponentName}`,
      code: this.sanitizer.bypassSecurityTrustHtml(this.getEmbedTemplate(organ, def)),
    });
  }

  openExternal(organ: Organ, def: ComponentDef): void {
    const { url } = organ.appData[def.id] as ExternalAppData;
    window.open(url, '_blank');
  }

  closeOverlay(): void {
    this.appIframeData.set(undefined);
  }

  private getEmbedTemplate(organ: Organ, def: ComponentDef): string {
    const template = EMBED_TEMPLATES[def.id];
    const appData = organ.appData[def.id] ?? {};
    return this.interpolateTemplate(template, appData);
  }

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
