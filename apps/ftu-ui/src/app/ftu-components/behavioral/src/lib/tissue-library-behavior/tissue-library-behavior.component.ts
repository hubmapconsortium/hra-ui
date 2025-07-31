import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, ViewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LinkDirective } from '@hra-ui/cdk';
import { dispatch, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions } from '@hra-ui/cdk/state';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { Tissue } from '@hra-ui/services';
import { ActiveFtuSelectors, DownloadActions, DownloadSelectors, LinkIds, TissueLibrarySelectors } from '@hra-ui/state';
import { LabelBoxComponent } from '../../../../atoms/src';
import { TissueTreeListComponent } from '../../../../molecules/src';
/**
 * Component for Tissue Library Behavior
 */
@Component({
  selector: 'ftu-tissue-library-behavior',
  imports: [
    CommonModule,
    LabelBoxComponent,
    TissueTreeListComponent,
    MatDivider,
    MatMenuModule,
    MatIconModule,
    ButtonsModule,
    LinkDirective,
    PlainTooltipDirective,
  ],
  templateUrl: './tissue-library-behavior.component.html',
  styleUrls: ['./tissue-library-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueLibraryBehaviorComponent {
  /**
   * Reference to the TissueTreeListComponent.
   */
  @ViewChild('list', { static: true })
  private readonly list?: TissueTreeListComponent<never, never>;

  /**
   * Input for tissues data
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);

  /**
   * Selected  of tissue library behavior component
   */
  readonly selected = model<Tissue>();

  /**
   * Navigates to a tissue page
   */
  protected navigate = dispatch(LinkRegistryActions.Navigate);

  /** Data for Menus */
  /** Illustration Metadata */
  protected readonly illustrationMetadata = LinkIds.Illustration;

  /** Available Download Formats */
  protected readonly downloadFormats = selectSnapshot(DownloadSelectors.formats);

  /** Download Action Dispatcher */
  protected readonly download = dispatch(DownloadActions.Download);

  /**
   * Sets the TissueItem instance as undefined if the url is undefined
   */
  constructor() {
    /** Get iris from the observable else reset selection if iri is undefined */
    select$(ActiveFtuSelectors.iri).subscribe((iri) => {
      this.selected.set(iri && this.tissues() && this.tissues()[iri]);
      if (iri === undefined) {
        this.list?.resetSelection();
      }
    });
  }
}
