import { Component, EventEmitter, Input, OnInit, Output, Signal, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { IconsModule } from '@hra-ui/design-system/icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateGetFromCache } from '../../actions/sheet.actions';
import { ToggleControlPane, ToggleDebugLogs } from '../../actions/ui.actions';
import { ConfigService } from '../../app-config.service';
import { OrganTableSelectorComponent } from '../../components/organ-table-selector/organ-table-selector.component';
import { SheetDetails, VersionDetail } from '../../models/sheet.model';
import { SheetState } from '../../store/sheet.state';
import { UIState, UIStateModel } from '../../store/ui.state';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  imports: [
    HraCommonModule,
    MatToolbarModule,
    MatIconModule,
    SearchComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    IconsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  readonly configService = inject(ConfigService);
  readonly store = inject(Store);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);

  /**
   * Currently selected organs
   */
  selectedOrgans: string[] = [];
  /**
   * Currently selected organs joined by comma
   */
  selectedOrgansValues!: string;
  /**
   * Currently selected organs
   */
  omapSelectedOrgans: string[] = [];
  /**
   * Currently selected organs joined by comma
   */
  omapSelectedOrgansValues!: string;

  sheetConfig: SheetDetails[] = [];
  omapSheetConfig: SheetDetails[] = [];

  // state observables
  @Select(UIState) ui$!: Observable<UIStateModel>;
  @Select(SheetState.getMode) mode$!: Observable<string>;
  @Select(SheetState.getSelectedOrgans) selectedOrgans$!: Observable<string[]>;
  @Select(SheetState.getOMAPSelectedOrgans) omapSelectedOrgans$!: Observable<string[]>;

  /** Determines the status of the control pane */
  controlPaneOpen: Signal<boolean> = this.store.selectSignal(UIState.getControlPaneState);

  @Input() cache!: boolean;
  @Output() readonly export = new EventEmitter<string>();

  get selectedOrgansLabel(): string {
    let x = this.selectedOrgansValues?.length > 0 ? 'ASCT+B: ' + this.selectedOrgansValues : '';
    x = this.selectedOrgansValues?.length > 0 && this.omapSelectedOrgansValues?.length > 0 ? x + ' | ' : x;
    x = this.omapSelectedOrgansValues?.length > 0 ? `${x}OMAP: ${this.omapSelectedOrgansValues}` : x;
    if (x.length > 35) {
      return `${this.selectedOrgansValues?.split(',').length} ASCT+B Tables, ${
        this.omapSelectedOrgansValues?.split(',').length
      } OMAPs`;
    }
    return x;
  }

  constructor() {
    this.configService.sheetConfiguration$.subscribe((sheetOptions) => {
      this.sheetConfig = sheetOptions;
    });
    this.configService.omapsheetConfiguration$.subscribe((sheetOptions) => {
      this.omapSheetConfig = sheetOptions;
    });
  }

  ngOnInit(): void {
    this.selectedOrgans$.subscribe((organs) => {
      const selectedOrgansNames: string[] = [];
      this.selectedOrgans = organs;
      for (const organ of organs) {
        this.sheetConfig.forEach((config: SheetDetails) => {
          config.version?.forEach((version: VersionDetail) => {
            if (version.value === organ) {
              selectedOrgansNames.push(config.display);
            }
          });
        });
      }
      this.selectedOrgansValues = selectedOrgansNames?.join(', ');
    });
    this.omapSelectedOrgans$.subscribe((organs) => {
      const selectedOrgansNames: string[] = [];
      this.omapSelectedOrgans = organs;
      for (const organ of organs) {
        this.omapSheetConfig.forEach((config: SheetDetails) => {
          config.version?.forEach((version: VersionDetail) => {
            if (version.value === organ) {
              selectedOrgansNames.push(config.display);
            }
          });
        });
      }
      this.omapSelectedOrgansValues =
        selectedOrgansNames?.join(', ').length > 64
          ? `${organs.length} organs selected`
          : selectedOrgansNames?.join(', ');
    });
  }

  /** Toggles the side pane */
  togglePane() {
    this.store.dispatch(new ToggleControlPane());
  }

  /** Toggles debug logs drawer */
  toggleDebugLogs() {
    this.store.dispatch(new ToggleDebugLogs());
  }

  openSelectOrgansDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.id = 'OrganTableSelector';
    config.maxWidth = 'unset';
    config.width = 'fit-content';
    config.data = {
      organs: this.selectedOrgans,
      isIntilalSelect: false,
      getFromCache: this.cache,
      omapOrgans: this.omapSelectedOrgans,
    };

    const dialogRef = this.dialog.open(OrganTableSelectorComponent, config);
    dialogRef.afterClosed().subscribe(({ organs, cache, omapOrgans }) => {
      this.store.dispatch(new UpdateGetFromCache(cache));
      if (organs !== false) {
        this.router.navigate(['/vis'], {
          queryParams: {
            selectedOrgans: organs?.join(','),
            playground: false,
            omapSelectedOrgans: omapOrgans?.join(','),
          },
          queryParamsHandling: 'merge',
        });
      }
    });
  }
}
