import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import 'rapidoc';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ServerSelectorComponent } from '../../components/server-selector/server-selector.component';
import { Server } from '../../interfaces';
import { servers } from '../../constants';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { serverIdResolver } from '../../resolvers/server-id/server-id-resolver.resolver';

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
  readonly serverId = model('');

  /* rapidoc element captured using viewChild() query */
  readonly rapidocElement = viewChild<ElementRef>('rapidoc');

  /* list of available servers */
  readonly servers = servers;

  /**
   * stores the selected server
   * - used as a model for the selector and
   * - for the rapidoc configuration
   */
  readonly selectedServer = computed(() => {
    return this.servers.find((item) => item.id === this.serverId()) ?? this.servers[0];
  });

  /**
   * Updates the selected server in rapidoc with the selected server.
   * @param server Selected server
   */
  updateRapidoc(server: Server) {
    this.serverId.set(server.id);
    if (this.rapidocElement()) {
      this.rapidocElement()?.nativeElement.setApiServer(server.url);
    }
  }
}
