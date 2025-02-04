import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import organs from '../../../../../apps.humanatlas.io/organs.json';
import components from '../../../../../apps.humanatlas.io/component-defs.json';
import { WebComponentCardComponent } from '@hra-ui/design-system/web-component-card';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
@Component({
  selector: 'hra-web-components',
  standalone: true,
  imports: [
    CommonModule,
    WebComponentCardComponent,
    ProductLogoComponent,
    SoftwareStatusIndicatorComponent,
    ButtonsModule,
    MatFormField,
    MatOption,
    MatLabel,
    MatSelect,
  ],
  templateUrl: './web-components.component.html',
  styleUrl: './web-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentsComponent {
  public organs = organs;
  public components = components.map((component) => {
    const [productTitle, webComponentName] = component.title.includes('>')
      ? component.title.split('>').map((part) => part.trim())
      : [component.title, ''];
    return {
      ...component,
      productTitle: productTitle,
      webComponentName: webComponentName,
    };
  });
  selectedOrgan: any;
  showComponentCards = false;

  onOrganSelect(organ: any) {
    this.selectedOrgan = organ;
    this.showComponentCards = !!this.selectedOrgan;
  }
}
