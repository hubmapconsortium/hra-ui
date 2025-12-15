import { Component, input, model, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HraCommonModule } from '@hra-ui/common';
import { ResultsIndicatorComponent } from '@hra-ui/design-system/indicators/results-indicator';

/**
 * Search Filter Component
 */
@Component({
  selector: 'hra-search-filter',
  imports: [
    HraCommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ResultsIndicatorComponent,
  ],
  standalone: true,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  /** Label for the form field */
  readonly label = input.required<string>();

  /** Current search query as a model */
  readonly search = model<string>('');

  /** Total number of options */
  readonly totalCount = input.required({ transform: numberAttribute });

  /** Number of currently visible/filtered options */
  readonly viewingCount = input.required({ transform: numberAttribute });
}
