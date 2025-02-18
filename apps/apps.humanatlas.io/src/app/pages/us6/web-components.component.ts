import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WebComponentCardComponent } from '@hra-ui/design-system/web-component-card';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { ComponentDef, ComponentDefId } from './types/component-defs.schema';
import { Organ, OrganId } from './types/organs.schema';
import { OverlayIframeComponent } from './overlay-iframe/overlay-iframe.component';
import { DomSanitizer } from '@angular/platform-browser';

interface ActiveData {
  organId: OrganId;
  defId: ComponentDefId;
  organ: Organ;
  def: ComponentDef;
}

@Component({
  selector: 'hra-web-components',
  standalone: true,
  imports: [
    CommonModule,
    ClipboardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    ButtonsModule,
    CodeBlockComponent,
    CardsModule,
    ProductLogoComponent,
    SoftwareStatusIndicatorComponent,
    WebComponentCardComponent,
    OverlayIframeComponent,
  ],
  templateUrl: './web-components.component.html',
  styleUrls: ['./web-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentsComponent {
  protected readonly organs = ORGANS;
  protected readonly components = COMPONENT_DEFS;

  protected readonly activeOrgan = signal<OrganId | undefined>(undefined);
  protected readonly activeDef = signal<ComponentDefId | undefined>(undefined);

  protected readonly activeData = computed((): ActiveData | undefined => {
    const organId = this.activeOrgan();
    const defId = this.activeDef();
    const organ = ORGANS.find((organ) => organ.id === organId);
    const def = COMPONENT_DEFS.find((def) => def.id === defId);
    if (organId && defId && organ && def) {
      return { organId, defId, organ, def };
    }
    return undefined;
  });

  protected readonly iframeSrcDoc = computed(() => {
    const data = this.activeData();
    return data && ['inline', 'overlay'].includes(data.def.embedAs) ? this.getIframeSrcDoc(data) : undefined;
  });

  showComponentCards = false;
  showSidenav = false;
  embedCode = '';

  constructor(private sanitizer: DomSanitizer) {}

  onOrganSelect(organId: OrganId) {
    this.activeOrgan.set(organId);
    this.showComponentCards = !!this.activeOrgan();
  }

  onShowSidenav(defId: ComponentDefId, show: boolean) {
    this.showSidenav = show;
    this.activeDef.set(defId);
    const data = this.activeData();
    if (data && ['inline', 'overlay'].includes(data.def.embedAs)) {
      this.embedCode = this.getIframeSrcDoc(data);
    }
    if (data && data.def.embedAs === 'inline') {
      this.embedCode = this.getIframeSrcDoc(data);
      this.renderComponentActionLaunchInline();
    }
    if (data && data.def.embedAs === 'external') {
      const targetElement = data.organ.appData[data.defId];
      if (targetElement) {
        window.open(targetElement['url'], '_blank');
      }
    }
  }

  renderComponentActionLaunchInline(): void {
    const componentEl = document.querySelector('.useapp-container') as HTMLElement;
    if (!componentEl) {
      console.error('Component element not found');
      return;
    }

    const launchEl = document.querySelector('.launch') as HTMLElement;
    if (!launchEl) {
      console.error('Launch element not found');
      return;
    }

    let appIframe: HTMLIFrameElement | undefined = undefined;
    launchEl.addEventListener('click', () => {
      const containerEl = componentEl.querySelector('.embed-app') as HTMLElement;
      if (!containerEl) {
        console.error('Container element not found');
        return;
      }
      appIframe ??= this.renderComponentAppIframe(containerEl, this.embedCode, true);
    });
  }

  renderComponentAppIframe(containerEl: HTMLElement, srcDoc: string, show: boolean): HTMLIFrameElement {
    const iframeEl = document.createElement('iframe');
    iframeEl.srcdoc = srcDoc;
    iframeEl.style.display = show ? 'block' : 'none';
    containerEl.appendChild(iframeEl);
    return iframeEl;
  }

  private getIframeSrcDoc(data: ActiveData): string {
    const template = EMBED_TEMPLATES[data.defId];
    const appData = data.organ.appData[data.defId] ?? {};
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
