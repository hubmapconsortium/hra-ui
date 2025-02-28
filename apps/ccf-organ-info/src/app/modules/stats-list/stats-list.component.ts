import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AggregateCount } from '@hra-api/ng-client';

@Component({
  selector: 'ccf-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class StatsListComponent {
  @Input() statsLabel!: string;
  @Input() stats!: AggregateCount[];
}
