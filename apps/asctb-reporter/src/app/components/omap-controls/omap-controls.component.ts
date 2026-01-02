import { Component, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HraCommonModule } from '@hra-ui/common';
import { OmapConfig } from '../../models/omap.model';
import { Error } from '../../models/response.model';

@Component({
  selector: 'app-omap-controls',
  imports: [
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    HraCommonModule,
  ],
  templateUrl: './omap-controls.component.html',
  styleUrl: './omap-controls.component.scss',
})
export class OmapControlsComponent {
  /** OMAP configuration */
  readonly omaps = model<OmapConfig>({ organsOnly: false, proteinsOnly: false });

  /** Error information */
  readonly error = input<Error>();

  /** Output for OMAP configuration update */
  readonly updateConfig = output<OmapConfig>();

  /** Handles checkbox click events */
  checkBoxClicked(event: Record<string, boolean>) {
    const current = this.omaps();
    const next: OmapConfig = {
      ...current,
      organsOnly: event['organsOnly'],
      proteinsOnly: event['proteinsOnly'],
    };
    this.omaps.set(next);
    this.updateConfig.emit(next);
  }
}
