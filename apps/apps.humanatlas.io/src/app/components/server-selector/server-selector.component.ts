import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Server } from '../../interfaces';

/**
 * Server Selector Component
 *
 * This component is used in the HRA-API Rapidoc integration page
 * to select a API server from a list of available servers.
 *
 * This component will take in a list of server options and lets
 * the user select one. The selected server is available from the
 * corresponding output binding.
 */
@Component({
  selector: 'hra-server-selector',
  imports: [FormsModule, MatSelectModule],
  templateUrl: './server-selector.component.html',
  styleUrl: './server-selector.component.scss',
})
export class ServerSelectorComponent {
  /**
   * input binding to get the list of servers
   */
  readonly servers = input<Server[]>([]);

  /**
   * two way binding for the selected server
   */
  readonly selectedServer = model<Server>(this.servers()[0]);

  /**
   * Updates the server in the model, based on the selected option.
   * @param server Selected server
   */
  updateServerUrl(server: Server): void {
    this.selectedServer.update(() => server);
  }
}
