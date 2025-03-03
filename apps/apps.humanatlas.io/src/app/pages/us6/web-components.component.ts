import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OverlayIframeComponent } from './overlay-iframe/overlay-iframe.component';
import { OverlaySidenavComponent } from './overlay-sidenav/overlay-sidenav.component';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WebComponentCardComponent } from '@hra-ui/design-system/web-component-card';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { ComponentDef } from './types/component-defs.schema';
import { Organ } from './types/organs.schema';

interface SidenavData {
  tagline: string;
  code: string;
  showApp: boolean;
  tabIndex: number;
}

interface OverlayData {
  code: string;
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

    OverlayIframeComponent,
    OverlaySidenavComponent,
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
  protected readonly overlayData = signal<OverlayData | undefined>(undefined);

  private readonly document = inject(DOCUMENT);

  protected readonly overlayOpen = signal(false);

  constructor() {
    effect((cleanup) => {
      if (this.sidenavData() !== undefined) {
        const { body } = this.document;
        const previousOverflowValue = body.style.overflow;
        body.style.overflow = 'hidden';
        cleanup(() => (body.style.overflow = previousOverflowValue));
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
      tagline: `${def?.productTitle} ${def?.webComponentName}`,
      code: this.getEmbedTemplate(organ, def),
      showApp: def.embedAs === 'inline',
      tabIndex: tabIndex,
    });
  }

  openOverlay(organ: Organ, def: ComponentDef): void {
    this.overlayData.set({
      code: this.getEmbedTemplate(organ, def),
    });
  }

  openExternal(organ: Organ, def: ComponentDef): void {
    const { url } = organ.appData[def.id] as ExternalAppData;
    window.open(url, '_blank');
  }

  closeOverlay(): void {
    this.overlayData.set(undefined);
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
