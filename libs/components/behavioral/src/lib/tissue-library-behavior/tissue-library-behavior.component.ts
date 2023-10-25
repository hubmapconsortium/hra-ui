import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { dispatch, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { TissueTreeListComponent } from '@hra-ui/components/molecules';
import { Tissue } from '@hra-ui/services';
import { ActiveFtuSelectors, TissueLibrarySelectors } from '@hra-ui/state';
import { LabelBoxComponent } from '@hra-ui/components/atoms';
import { LinkRegistryActions } from '@hra-ui/cdk/state';

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

  navigate = dispatch(LinkRegistryActions.Navigate);

  /**
   * Sets the TissueItem instance as undefined if
   * the url is undefined
   */
  constructor() {
    /** Get iris from the observable else reset selection if
     * iri is undefined
     */
    select$(ActiveFtuSelectors.iri).subscribe((iri) => {
      this.selected = iri && this.tissues()[iri];
      if (iri === undefined) {
        this.list?.resetSelection();
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.list) {
      const nodes = this.list?.control.dataNodes;
      const selectedIndex = this.list.control.dataNodes.findIndex((node: any) => node.data.id === this.selected?.id);

      const currentNode = nodes[selectedIndex];
      if (event.key === 'ArrowDown') {
        if (selectedIndex + 1 < nodes.length) {
          this.navigateToNode(nodes[selectedIndex + 1]);
        }
      }
      if (event.key === 'ArrowUp') {
        if (selectedIndex - 1 >= 0) {
          this.navigateToNode(nodes[selectedIndex - 1]);
        }
      }
      if (currentNode.expandable) {
        if (event.key === 'ArrowLeft') {
          this.list.control.collapse(currentNode);
        } else if (event.key === 'ArrowRight') {
          this.list.control.expand(currentNode);
        }
      }
    }
  }

  navigateToNode(node: any): void {
    this.list?.selectNode(node.data as never);
    if (!node.expandable) {
      this.navigate(node.data.link, { queryParams: { id: node.data.id } });
    }
  }
}
