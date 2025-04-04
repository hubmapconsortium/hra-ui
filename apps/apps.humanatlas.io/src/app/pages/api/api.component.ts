import { DOCUMENT, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  InjectionToken,
  model,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { APP_ASSETS_HREF, HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import 'rapidoc';
import { ServerSelectorComponent } from '../../components/server-selector/server-selector.component';
import { servers } from '../../constants/server.constants';
import { Server } from '../../interfaces/server.interface';

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
  imports: [HraCommonModule, MatIconModule, ButtonsModule, ServerSelectorComponent, ProductLogoComponent],
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
   * list of available servers
   */
  protected readonly servers = servers;

  /**
   * Product logo id
   */
  protected readonly logo = toProductLogoId('api');

  /**
   * stores the selected server
   * - used as a model for the selector and
   * - for the rapidoc configuration
   */
  protected readonly selectedServer = computed(() => {
    return this.servers.find((item) => item.id === this.serverId()) ?? this.servers[0];
  });

  /**
   * Splash video element
   */
  private readonly videoElement = viewChild.required<ElementRef<HTMLVideoElement>>('video');

  /**
   * rapidoc element captured using viewChild() query
   */
  private readonly rapidocElement = viewChild.required<ElementRef>('rapidoc');

  /**
   * Component constructor
   */
  constructor() {
    inject(RAPIDOC_STYLES);

    effect(() => this.videoElement().nativeElement.play());
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
