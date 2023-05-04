import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { TissueTreeListComponent } from '@hra-ui/components/molecules';
import { TissueItem } from '@hra-ui/services';
import { MedicalIllustrationSelectors, TissueLibrarySelectors } from '@hra-ui/state';

/**
 * Component for Tissue Library Behavior
 */
@Component({
  selector: 'ftu-tissue-library-behavior',
  standalone: true,
  imports: [CommonModule, TissueTreeListComponent],
  templateUrl: './tissue-library-behavior.component.html',
  styleUrls: ['./tissue-library-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueLibraryBehaviorComponent {
  /**
   * Input for tissues data
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);
  /**
   * Selected  of tissue library behavior component
   */
  selected?: TissueItem;

  /**
   * Sets the TissueItem instance as undefined if
   * the url is undefined
   */
  constructor() {
    select$(MedicalIllustrationSelectors.url).subscribe((url) => {
      if (url === undefined) {
        this.selected = undefined;
      }
    });
  }
}
