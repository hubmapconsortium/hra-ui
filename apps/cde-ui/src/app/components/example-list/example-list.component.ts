import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';

/** Example dataset shown in the list */
export interface LandingExample {
  /** Example name */
  title: string;
  /** Short metadata line, such as technology and cell count */
  description: string;
  /** Credit for the lab that produced the data */
  credit?: string;
  /** Thumbnail image url, 16:10 */
  image: string;
  /** Route that opens the example */
  url: string;
}

/**
 * Compact list of example datasets where each row links to its example.
 */
@Component({
  selector: 'cde-example-list',
  imports: [HraCommonModule, LinkDirective, MatIconModule],
  templateUrl: './example-list.component.html',
  styleUrl: './example-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleListComponent {
  /** Examples to list */
  readonly examples = input.required<LandingExample[]>();
}
