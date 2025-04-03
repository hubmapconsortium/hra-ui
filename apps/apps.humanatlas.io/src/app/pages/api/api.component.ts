import { CommonModule, DOCUMENT, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  InjectionToken,
  model,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import 'rapidoc';
import { ServerSelectorComponent } from '../../components/server-selector/server-selector.component';
import { servers } from '../../constants';
import { Server } from '../../interfaces';

/**
 * Custom injection token to lazy load the theme for Rapidoc.
 */
const RAPIDOC_STYLES = new InjectionToken<void>('Rapidoc styles', {
  providedIn: 'root',
  factory: loadRapidocStyles,
});

/**
 * Factory function that loads the Rapidoc theme when component is initialized.
 */
function loadRapidocStyles(): void {
  const document = inject(DOCUMENT);
  const assetsHref = inject(APP_ASSETS_HREF);
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.href = Location.joinWithSlash(assetsHref(), 'rapidoc-theme.css');
  document.head.appendChild(el);
}

/**
 * Component for HRA-API
 *
 * This component wraps the RapiDoc component and provides a server selector.
 * The server selector allows the user to select a server from a list of available servers.
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
  /** model to handle serverId from resolver
   * and change within the component
   */
  readonly serverId = model('');

  /**
   * rapidoc element captured using viewChild() query
   */
  readonly rapidocElement = viewChild<ElementRef>('rapidoc');

  /**
   * list of available servers
   */
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
   * Component constructor
   */
  constructor() {
    inject(RAPIDOC_STYLES);
  }

  /**
   * Updates the selected server in rapidoc with the selected server.
   * @param server Selected server
   */
  updateRapidoc(server: Server) {
    this.serverId.set(server.id);
    this.rapidocElement()?.nativeElement.setApiServer(server.url);
  }

  /**
   * Scrolls the view to the API section.
   * @param element HTML Element to scroll to.
   */
  scrollTo(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}
