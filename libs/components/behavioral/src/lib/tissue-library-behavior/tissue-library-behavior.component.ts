import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectSnapshot } from '@hra-ui/cdk/injectors';
import { TissueTreeListComponent } from '@hra-ui/components/molecules';
import { TissueLibrarySelectors } from '@hra-ui/state';
import { LabelBoxComponent } from '@hra-ui/components/atoms';

/**
 * Component for Tissue Library Behavior
 */
@Component({
  selector: 'ftu-tissue-library-behavior',
  standalone: true,
  imports: [CommonModule, LabelBoxComponent, TissueTreeListComponent],
  templateUrl: './tissue-library-behavior.component.html',
  styleUrls: ['./tissue-library-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueLibraryBehaviorComponent {
  /**
   * Input for tissues data
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);
}
