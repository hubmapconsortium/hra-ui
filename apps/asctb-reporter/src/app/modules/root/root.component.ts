import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { BimodalData } from '../../models/bimodal.model';
import { Error } from '../../models/response.model';
import { Row } from '../../models/sheet.model';
import { SearchStructure, TNode } from '../../models/tree.model';
import { UIState } from '../../store/ui.state';
import { TreeComponent } from '../tree/tree.component';
import { SheetState } from './../../store/sheet.state';
import { TreeState } from './../../store/tree.state';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent implements OnDestroy {
  readonly store = inject(Store);

  // The container used for vertical scrolling of the viz is different than the one used for horizontal scrolling
  // Here we get references to both values.
  @ViewChild(TreeComponent) verticalScrollEntity!: TreeComponent;

  // Sheet Observables
  readonly compareData$: Observable<Row[]> = this.store.select(SheetState.getCompareData);

  readonly getFromCache$: Observable<boolean> = this.store.select(SheetState.getDataFromCache);

  // Tree Observables
  readonly treeData$: Observable<TNode[]> = this.store.select(TreeState.getTreeData);
  readonly bsd$: Observable<Record<string, unknown>> = this.store.select(TreeState.getBottomSheetData);
  readonly bm$: Observable<BimodalData> = this.store.select(TreeState.getBimodal);
  readonly searchOption$: Observable<SearchStructure> = this.store.select(TreeState.getLatestSearchStructure);

  // Control Pane Observables
  readonly pane$: Observable<boolean> = this.store.select(UIState.getControlPaneState);

  // UI Observables
  readonly loadingText$: Observable<string> = this.store.select(UIState.getLoadingText);
  readonly report$: Observable<boolean> = this.store.select(UIState.getReport);
  readonly mode$: Observable<string> = this.store.select(SheetState.getMode);
  readonly error$: Observable<{ error: Error }> = this.store.select(UIState.getError);

  /** Stores the error */
  error!: Error;

  constructor() {
    // Listen for changes in the last selected search structure
    this.searchOption$.subscribe((structure) => {
      // Structure will be null when all structures are deselected
      if (this.verticalScrollEntity && structure) {
        const yPos = structure.y + 30; // 30 accounts for top-padding
        const xPos = structure.x;

        // The vertical scroll div is a CdkScrollable component, but the horizontal scroll element is a normal div.
        // This leads to differences in the scrollTo interface.
        const contentHeight = this.verticalScrollEntity.treeElementRef.nativeElement.offsetHeight;
        const contentWidth = this.verticalScrollEntity.treeElementRef.nativeElement.offsetWidth;
        const yScrollPos = this.verticalScrollEntity.treeElementRef.nativeElement.scrollTop;
        const xScrollPos = this.verticalScrollEntity.treeElementRef.nativeElement.scrollLeft;

        // Scroll to the selected structure if it's outside the area of the screen
        if (xPos > xScrollPos + contentWidth || xPos < xScrollPos) {
          this.verticalScrollEntity.treeElementRef.nativeElement.scrollTo(xPos, yScrollPos);
        }
        if (yPos > yScrollPos + contentHeight || yPos < yScrollPos) {
          this.verticalScrollEntity.treeElementRef.nativeElement.scrollTo({
            top: yPos - contentHeight / 2,
          });
        }
      }
    });

    this.error$.subscribe((err) => {
      this.error = err.error;
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new StateReset(SheetState));
  }
}
