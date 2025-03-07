import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, HostBinding, input, model, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TissueBlock } from '@hra-api/ng-client';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { ThumbnailListComponent } from '../../../shared/components/thumbnail-list/thumbnail-list.component';
import { MetadataCardComponent } from '../metadata-card/metadata-card.component';
import { TissueSectionVisComponent } from '../tissue-section-vis/tissue-section-vis.component';

/**
 * Donor card component which displays data from a patient
 */
@Component({
  selector: 'ccf-donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss'],
  standalone: true,
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
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-donor-card';

  /** Tissue Block to generate the donor card from */
  readonly tissueBlock = input.required<TissueBlock>();

  /** Allows the selected state to be set from outside the component */
  readonly selected = model<boolean>(false);

  /** Allows the expanded state of the card to be set from outside the component */
  readonly expanded = model<boolean>(false);

  /** Emit the url of any link when clicked. */
  readonly linkClick = output<string>();

  readonly selectOption = output();
  readonly expansionChange = output<boolean>();

  readonly thickness = computed(() => this.tissueBlock().description?.split(',')[1]);
  readonly size = computed(() => this.tissueBlock().description?.split(',')[0]);

  readonly sectionLinks = computed(() => this.tissueBlock().sections?.map((section) => section.link) ?? []);

  /**
   * Creates an instance of donor card component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) {}

  /**
   * Ensures that the expanded variable is only changed if selected first.
   */
  toggleExpansion(): void {
    if (this.selected()) {
      this.expanded.update(() => !this.expanded());
      this.ga.event('expanded_toggled', 'donor_card', this.tissueBlock().label, +this.expanded());
      this.expansionChange.emit(this.expanded());
    } else {
      this.selected.update(() => true);
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
  linkHandler(url: string): void {
    this.ga.event('link_clicked', 'donor_card', this.tissueBlock().label);
    if (this.selected()) {
      window.open(url, '_blank');
    } else {
      this.selected.update(() => true);
    }
  }
}
