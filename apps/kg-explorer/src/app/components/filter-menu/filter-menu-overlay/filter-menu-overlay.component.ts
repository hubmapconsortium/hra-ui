import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';

const sampleOptions = [
  {
    name: 'All organs',
    count: 0,
  },
  {
    name: 'Blood vasculature',
    count: 3,
  },
  {
    name: 'Brain',
    count: 10,
  },
  {
    name: 'Eye',
    count: 8,
  },
  {
    name: 'Fallopian tube',
    count: 0,
  },
  {
    name: 'Heart',
    count: 0,
  },
  {
    name: 'Kidney',
    count: 0,
  },
  {
    name: 'All organs',
    count: 0,
  },
  {
    name: 'Blood vasculature',
    count: 3,
  },
  {
    name: 'Brain',
    count: 10,
  },
  {
    name: 'Eye',
    count: 8,
  },
  {
    name: 'Fallopian tube',
    count: 0,
  },
  {
    name: 'Heart',
    count: 0,
  },
  {
    name: 'Kidney',
    count: 0,
  },
];

@Component({
  selector: 'hra-filter-menu-overlay',
  imports: [
    HraCommonModule,
    IconsModule,
    ButtonsModule,
    RichTooltipModule,
    ScrollingModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './filter-menu-overlay.component.html',
  styleUrl: './filter-menu-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuOverlayComponent {
  readonly filter = input<string>();
  readonly options = input<{ name: string; count: number }[]>(sampleOptions);
}
