import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { FUNDERS } from '../static-data/parsed';
import { FunderId } from '../types/funders.schema';

/** Displays a list of funders */
@Component({
  selector: 'hra-funding',
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
    return FUNDERS.filter((item) => ids.has(item.id));
  });
}
