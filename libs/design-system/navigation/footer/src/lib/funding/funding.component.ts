import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { FUNDERS } from '../static-data/parsed';
import { FunderId } from '../types/funders.schema';

/** All available funder ids */
export const FUNDER_IDS = FUNDERS.funders.map((item) => item.id);

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
  readonly funders = input.required<FunderId[]>();

  /** Associated data for each funder displayed */
  protected readonly fundersData = computed(() => {
    const ids = new Set(this.funders());
    return FUNDERS.funders.filter((item) => ids.has(item.id));
  });
}
