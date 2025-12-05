import { Component, input, output } from '@angular/core';
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
  protected readonly omaps = input<OmapConfig>({ organsOnly: false, proteinsOnly: false });

  /** Error information */
  protected readonly error = input<Error>();

  /** Output for OMAP configuration update */
  protected readonly updateConfig = output<OmapConfig>();

  /** Handles checkbox click events */
  checkBoxClicked(event: Record<string, boolean>) {
    this.omaps().organsOnly = event['organsOnly'];
    this.omaps().proteinsOnly = event['proteinsOnly'];
    this.updateConfig.emit(this.omaps());
  }
}
