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

  selectedOrgan: any;
  selectedComponentCard: any;
  showComponentCards = false;
  showSidenav = false;

  onOrganSelect(organ: any) {
    this.selectedOrgan = organ;
    this.showComponentCards = !!this.selectedOrgan;
  }

  onShowSidenav(selectedComponentCard: any, show: boolean) {
    this.showSidenav = show;
    this.selectedComponentCard = selectedComponentCard;
  }
}
