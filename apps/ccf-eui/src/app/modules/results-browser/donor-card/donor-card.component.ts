import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TissueBlock } from '@hra-api/ng-client';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { MetadataCardComponent } from '../metadata-card/metadata-card.component';
import { ThumbnailListComponent } from '../thumbnail-list/thumbnail-list.component';
import { TissueSectionVisComponent } from '../tissue-section-vis/tissue-section-vis.component';

/**
 * Donor card component which displays data from a patient
 */
@Component({
  selector: 'ccf-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss'],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MetadataCardComponent,
    TissueSectionVisComponent,
    ThumbnailListComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonorCardComponent {
  /** Tissue Block to generate the donor card from */
  readonly tissueBlock = input.required<TissueBlock>();

  /** If card is highlighted */
  readonly highlighted = input<boolean>(false);

  /** Allows the selected state to be set from outside the component */
  readonly selected = model<boolean>(false);

  /** Allows the expanded state of the card to be set from outside the component */
  readonly expanded = model<boolean>(false);

  /** Option selected */
  readonly selectOption = output();
  /** Expansion state change */
  readonly expansionChange = output<boolean>();

  /** Tissue block thickness */
  readonly thickness = computed(() => this.tissueBlock().description?.split(',')[1]);
  /** Tissue block size */
  readonly size = computed(() => this.tissueBlock().description?.split(',')[0]);

  /** Section links */
  readonly sectionLinks = computed(() => this.tissueBlock().sections?.map((section) => section.link) ?? []);

  /** Google Analytics service */
  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * Ensures that the expanded variable is only changed if selected first.
   */
  toggleExpansion(): void {
    if (this.selected()) {
      this.expanded.update((value) => !value);
      this.ga.event('expanded_toggled', 'donor_card', this.tissueBlock().label, +this.expanded());
      this.expansionChange.emit(this.expanded());
    } else {
      this.selected.set(true);
      this.selectOption.emit();
    }
  }

  /**
   * Handles what happens when an info card is clicked.
   * Passes up the link click event unless the card isn't selected
   * In which case it selects it for ease of use.
   *
   * @param url the URL to emit up.
   */
  linkHandler(): void {
    this.ga.event('link_clicked', 'donor_card', this.tissueBlock().label);
  }
}
