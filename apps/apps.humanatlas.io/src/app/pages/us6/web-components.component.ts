import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WebComponentCardComponent } from '@hra-ui/design-system/web-component-card';
import { COMPONENT_DEFS, EMBED_TEMPLATES, ORGANS } from './static-data/parsed';
import { ComponentDef, ComponentDefId } from './types/component-defs.schema';
import { Organ, OrganId } from './types/organs.schema';
import { OverlayIframeComponent } from './overlay-iframe/overlay-iframe.component';
import { EmbedSidenavContentComponent } from './embed-sidenav-content/embed-sidenav-content.component';

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
    ButtonsModule,
    CommonModule,
    ClipboardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    CardsModule,
    EmbedSidenavContentComponent,
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
    return data && data.def.embedAs === 'overlay' ? this.getIframeSrcDoc(data) : undefined;
  });

  showComponentCards = false;
  showSidenav = false;
  embedCode = '';
  selectedTabIndex = 0;

  onOrganSelect(organId: OrganId) {
    this.activeOrgan.set(organId);
    this.showComponentCards = !!this.activeOrgan();
  }

  getEmbedCode() {
    const data = this.activeData();
    if (data && data.def.embedAs === 'external') {
      const targetElement = data.organ.appData[data.defId];
      if (targetElement) {
        window.open(targetElement['url'], '_blank');
      }
    }
    this.embedCode = data ? this.getIframeSrcDoc(data) : '';
  }

  onShowSidenav(defId: ComponentDefId, show: boolean, index: number) {
    this.showSidenav = show;
    this.activeDef.set(defId);
    this.selectedTabIndex = index;
    this.getEmbedCode();
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

  closeOverlay(): void {
    this.activeDef.set(undefined);
    this.showSidenav = false;
  }
}
