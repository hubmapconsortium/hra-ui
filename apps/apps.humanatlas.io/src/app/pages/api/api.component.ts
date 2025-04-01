import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import 'rapidoc';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ServerSelectorComponent } from '../../components/server-selector/server-selector.component';
import { Server } from '../../interfaces';
import { servers } from '../../constants';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';

/**
 * Component for HRA API
 */
@Component({
  selector: 'hra-api',
  imports: [CommonModule, MatIconModule, ButtonsModule, ServerSelectorComponent, ProductLogoComponent],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApiComponent {
  readonly rapidocElement = viewChild<ElementRef>('rapidoc');
  readonly servers = servers;
  selectedServer = this.servers[0];

  updateRapidocServerUrl(server: Server) {
    if (this.rapidocElement()) {
      this.rapidocElement()?.nativeElement.setApiServer(server.url);
    }
  }
}
