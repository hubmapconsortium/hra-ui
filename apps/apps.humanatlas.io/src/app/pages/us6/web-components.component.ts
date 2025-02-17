import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { CardsModule } from '@hra-ui/design-system/cards';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CodeBlockComponent } from '@hra-ui/design-system/code-block';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WebComponentCardComponent } from '@hra-ui/design-system/web-component-card';
import components from './data/component-defs.json';
import organs from './data/organs.json';
import euiEmbedTemplate from './static-data/templates/eui';
import ruiEmbedTemplate from './static-data/templates/rui';
import euiOrganInfoEmbedTemplate from './static-data/templates/eui-organ-info';
import eui3dOrganViewer from './static-data/templates/eui-3d-organ-viewer';
import ftuUiEmbedTemplate from './static-data/templates/ftu-ui';
import ftuUiSmallEmbedTemplate from './static-data/templates/ftu-ui-small';
import ftuMedicalIllustrationEmbedTemplate from './static-data/templates/ftu-medical-illustration';

@Component({
  selector: 'hra-web-components',
  standalone: true,
  imports: [
    CommonModule,
    ClipboardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    ButtonsModule,
    CodeBlockComponent,
    CardsModule,
    ProductLogoComponent,
    SoftwareStatusIndicatorComponent,
    WebComponentCardComponent,
  ],
  templateUrl: './web-components.component.html',
  styleUrl: './web-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentsComponent {
  protected readonly organs = organs;
  protected readonly components = components;

  embedTemplates = {
    rui: ruiEmbedTemplate,
    eui: euiEmbedTemplate,
    'eui-organ-information': euiOrganInfoEmbedTemplate,
    'eui-3d-organ-viewer': eui3dOrganViewer,
    'ftu-ui': ftuUiEmbedTemplate,
    'ftu-ui-small': ftuUiSmallEmbedTemplate,
    'ftu-medical-illustration': ftuMedicalIllustrationEmbedTemplate,
  };

  selectedOrgan: any;
  selectedComponentCard: any;
  showComponentCards = false;
  showSidenav = false;
  embedCode = '';

  onOrganSelect(organ: any) {
    this.selectedOrgan = organ;
    this.showComponentCards = !!this.selectedOrgan;
  }

  onShowSidenav(selectedComponentCard: any, show: boolean) {
    this.showSidenav = show;
    this.selectedComponentCard = selectedComponentCard;
    this.renderEmbedTemplate();
  }

  renderEmbedTemplate() {
    if (this.selectedOrgan && this.selectedComponentCard) {
      const template = this.embedTemplates[this.selectedComponentCard.id as keyof typeof this.embedTemplates];
      const appData = this.selectedOrgan.appData[this.selectedComponentCard.id];
      if (template && appData) {
        this.embedCode = this.interpolateTemplate(template, appData);
      }
    }
  }

  interpolateTemplate(template: string, replacements: any): string {
    return template.replace(/{{(\w+?)}}/g, (_match, key) => {
      const value = replacements[key];
      if (typeof value === 'string') {
        return value;
      }
      return JSON.stringify(value, undefined, 1).replace(/\n\s*/g, ' ');
    });
  }
}
