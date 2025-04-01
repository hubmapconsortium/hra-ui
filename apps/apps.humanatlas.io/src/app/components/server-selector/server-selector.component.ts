import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Server } from '../../interfaces';

@Component({
  selector: 'hra-server-selector',
  imports: [FormsModule, MatSelectModule],
  templateUrl: './server-selector.component.html',
  styleUrl: './server-selector.component.scss',
})
export class ServerSelectorComponent {
  readonly servers = input<Server[]>([]);
  readonly selectedServer = model<Server>(this.servers()[0]);

  updateServerUrl(server: Server): void {
    this.selectedServer.update(() => server);
  }
}
