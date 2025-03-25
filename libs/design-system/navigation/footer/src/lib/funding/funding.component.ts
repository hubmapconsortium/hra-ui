import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { FUNDERS } from '../static-data/parsed';
import { FunderId } from '../types/funders.schema';

/** Displays a list of funders */
@Component({
  selector: 'hra-funding',
  imports: [HraCommonModule],
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
