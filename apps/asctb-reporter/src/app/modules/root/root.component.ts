import { Component, EventEmitter, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable } from 'rxjs';
import { View } from 'vega';
import { ConfigService } from '../../app-config.service';
import { IndentedListService } from '../../components/indented-list/indented-list.service';
import { ReportService } from '../../components/report/report.service';
import { BimodalData } from '../../models/bimodal.model';
import { Error } from '../../models/response.model';
import { Row, Sheet } from '../../models/sheet.model';
import { SearchStructure, TNode } from '../../models/tree.model';
import { UIState } from '../../store/ui.state';
import { TreeComponent } from '../tree/tree.component';
import { SheetState } from './../../store/sheet.state';
import { TreeState } from './../../store/tree.state';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: false,
})
export class RootComponent implements OnDestroy {
  readonly configService = inject(ConfigService);
  readonly store = inject(Store);

  readonly dialog = inject(MatDialog);
  readonly indent = inject(IndentedListService);
  readonly report = inject(ReportService);
  readonly router = inject(Router);

  /** Organ sheet data */
  data: Row[] = [];

  /** Denotes if loading */
  loading = true;

  /** Vega view */
  view!: View;

  /** Selected sheet */
  sheet!: Sheet;

  /** Denotesthe error state */
  hasError = false;

  /** Dnotes of sidebar control pane is open */
  isControlPaneOpen = false;

  /** Mode of the application. Playground or visualiization Default is vis */
  mode = 'vis';

  // The container used for vertical scrolling of the viz is different than the one used for horizontal scrolling
  // Here we get references to both values.
  @ViewChild(TreeComponent) verticalScrollEntity!: TreeComponent;
  @Output() readonly export = new EventEmitter<unknown>();

  // Sheet Observables
  readonly compareData$: Observable<Row[]> = this.store.select(SheetState.getCompareData);

  readonly getFromCache$: Observable<boolean> = this.store.select(SheetState.getDataFromCache);

  // Tree Observables
  readonly treeData$: Observable<TNode[]> = this.store.select(TreeState.getTreeData);
  readonly bsd$: Observable<any> = this.store.select(TreeState.getBottomSheetData);
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
