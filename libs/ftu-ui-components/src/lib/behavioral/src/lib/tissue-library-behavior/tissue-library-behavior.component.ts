import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { dispatch, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { LabelBoxComponent } from '../../../../atoms/src';
import { TissueTreeListComponent } from '../../../../molecules/src';
import { Tissue } from '@hra-ui/services';
import { ActiveFtuSelectors, TissueLibrarySelectors } from '@hra-ui/state';
import { MenuDemoComponent, MenuDemoOption } from '@hra-ui/design-system/menu';
import { MatDivider } from '@angular/material/divider';
/**
 * Component for Tissue Library Behavior
 */
@Component({
  selector: 'ftu-tissue-library-behavior',
  imports: [CommonModule, LabelBoxComponent, TissueTreeListComponent, MenuDemoComponent, MatDivider],
  templateUrl: './tissue-library-behavior.component.html',
  styleUrls: ['./tissue-library-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueLibraryBehaviorComponent {
  /**
   * Menu options for the Tissue Library Behavior component
   */
  protected readonly menuOptions: MenuDemoOption[] = [];
  /**
   * Reference to the TissueTreeListComponent.
   */
  @ViewChild('list', { static: true })
  readonly list?: TissueTreeListComponent<never, never>;

  /**
   * Input for tissues data
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);

  /**
   * Selected  of tissue library behavior component
   */
  selected?: Tissue;

  /**
   * Navigates to a tissue page
   */
  navigate = dispatch(LinkRegistryActions.Navigate);

  /**
   * Sets the TissueItem instance as undefined if the url is undefined
   */
  constructor() {
    /** Get iris from the observable else reset selection if iri is undefined */
    select$(ActiveFtuSelectors.iri).subscribe((iri) => {
      this.selected = iri && this.tissues() && this.tissues()[iri];
      if (iri === undefined) {
        this.list?.resetSelection();
      }
    });
  }
}
