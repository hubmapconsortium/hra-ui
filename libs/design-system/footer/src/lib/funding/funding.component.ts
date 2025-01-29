import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import * as FUNDERS_DATA from './funders.json';

/** Funder id */
export type FunderId = keyof typeof FUNDERS_DATA;

/** All available funder ids */
export const FUNDER_IDS = Object.keys(FUNDERS_DATA).filter((id) => id !== 'default') as FunderId[];

/** Displays a list of funders */
@Component({
  selector: 'hra-funding',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './funding.component.html',
  styleUrl: './funding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundingComponent {
  /** Funders to display */
  readonly funders = input(FUNDER_IDS);

  /** Associated data for each funder displayed */
  protected readonly fundersData = computed(() => this.funders().map((id) => FUNDERS_DATA[id]));
}
