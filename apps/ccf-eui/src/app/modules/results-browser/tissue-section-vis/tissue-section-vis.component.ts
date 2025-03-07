import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { TissueSection } from '@hra-api/ng-client';

@Component({
  selector: 'ccf-tissue-section-vis',
  templateUrl: './tissue-section-vis.component.html',
  styleUrls: ['./tissue-section-vis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true,
})
export class TissueSectionVisComponent {
  /** HTML Class Name */
  @HostBinding('class') readonly clsName = 'ccf-tissue-section-vis';

  /** The total numebr of tissue sections, used for end label */
  readonly totalTissueSections = input.required<number>();

  /** Tissue section data, used to determine which tissues to color on the graph */
  readonly tissueSections = input.required<TissueSection[]>();

  /** Returns whether or not the given section number exists in the tissueSection array */
  tissueSectionExists(sectionNumber: number): boolean {
    if (this.tissueSections().some((section) => section.sectionNumber === sectionNumber)) {
      return true;
    }

    return false;
  }
}
