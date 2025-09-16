import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { routeData } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { createFileNameTimestamp } from './util/file-timestamp';

import { environment } from '../environments/environment';
import {
  DeleteCompareSheet,
  FetchAllOrganData,
  FetchDataFromAssets,
  FetchInitialPlaygroundData,
  FetchSelectedOrganData,
  FetchSheetData,
  UpdateGetFromCache,
  UpdateMode,
  UpdateReport,
} from './actions/sheet.actions';
import {
  CloseCompare,
  CloseLoading,
  CloseRightSideNav,
  CloseSnackbar,
  HasError,
  OpenBottomSheet,
  OpenCompare,
  ToggleIndentList,
  ToggleReport,
} from './actions/ui.actions';
import { ConfigService } from './app-config.service';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { StateReset } from 'ngxs-reset-plugin';
import { UpdateBimodalConfig } from './actions/tree.actions';
import { CompareComponent } from './components/compare/compare.component';
import { DebugLogsComponent } from './components/debug-logs/debug-logs.component';
import { DoiComponent } from './components/doi/doi.component';
import { IndentedListComponent } from './components/indented-list/indented-list.component';
import { InfoComponent } from './components/info/info.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OrganTableSelectorComponent } from './components/organ-table-selector/organ-table-selector.component';
import { ReportComponent } from './components/report/report.component';
import { TableNestedMenuComponent } from './components/table-nested-menu/table-nested-menu.component';
import { BimodalConfig } from './models/bimodal.model';
import { Report } from './models/report.model';
import {
  CompareData,
  DOI,
  GraphData,
  Row,
  Sheet,
  SheetConfig,
  SheetDetails,
  SheetInfo,
  VersionDetail,
} from './models/sheet.model';
import { LinksASCTBData } from './models/tree.model';
import { Logs, OpenBottomSheetData, Snackbar } from './models/ui.model';
import { BimodalService } from './modules/tree/bimodal.service';
import { TreeService } from './modules/tree/tree.service';
import { ConsentService } from './services/consent/consent.service';
import { SheetService } from './services/sheet/sheet.service';
import { LogsState } from './store/logs.state';
import { SheetState } from './store/sheet.state';
import { TreeState } from './store/tree.state';
import { UIState, UIStateModel } from './store/ui.state';

declare let gtag: (arg1?: unknown, arg2?: unknown, arg3?: unknown) => void;

@Component({
  selector: 'app-reporter',
  host: { class: 'hra-app' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    RouterModule,
    MatIconModule,
    ButtonsModule,
    PlainTooltipDirective,
    TableNestedMenuComponent,
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    ReportComponent,
    IndentedListComponent,
    DebugLogsComponent,
    CompareComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  /** Consent Service */
  readonly consentService = inject(ConsentService);

  /** Configuration Service */
  readonly configService = inject(ConfigService);

  /** Snackbar Service */
  readonly snackbar = inject(MatSnackBar);

  /** Angular Router */
  readonly router = inject(Router);

  /** Activated Route */
  readonly route = inject(ActivatedRoute);

  /** Tree Service */
  readonly ts = inject(TreeService);

  /** Dialog Service */
  readonly dialog = inject(MatDialog);

  /** Sheet Service */
  readonly sheetService = inject(SheetService);

  /** Bimodal Service */
  readonly bms = inject(BimodalService);

  /** Data for breadcrumbs in navigation header. */
  private readonly routeData = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(() => this.routeData()['crumbs'] as BreadcrumbItem[] | undefined);

  /**
   * Boolean value indicating to switch to app's secondary navigation depending on whether
   * the user has entered the app or not
   */
  protected readonly appControlsEnabled = computed(() => this.routeData()['appControls'] === true);

  /** Bottom Sheet Service */
  private readonly infoSheet = inject(MatBottomSheet);

  /** Google Analytics Service */
  private readonly ga = inject(GoogleAnalyticsService);

  /** State Store */
  protected readonly store = inject(Store);

  /* State Observables */
  protected readonly mode = toSignal(this.store.select(SheetState.getMode), { initialValue: '' });
  protected readonly pane$: Observable<boolean> = this.store.select(UIState.getControlPaneState);
  protected readonly il$: Observable<boolean> = this.store.select(UIState.getIndentList);
  protected readonly report$: Observable<boolean> = this.store.select(UIState.getReport);
  protected readonly dl$: Observable<boolean> = this.store.select(UIState.getDebugLog);
  protected readonly c$: Observable<boolean> = this.store.select(UIState.getCompareState);
  protected readonly allCompareData$: Observable<{ data: Row[]; sheets: CompareData[] }> = this.store.select(
    SheetState.getAllCompareData,
  );
  readonly rd$: Observable<Report> = this.store.select(SheetState.getReportdata);
  readonly data$: Observable<Row[]> = this.store.select(SheetState.getData);
  readonly fullAsData$: Observable<Row[]> = this.store.select(SheetState.getFullAsData);
  readonly fullDataByOrgan$: Observable<Row[][]> = this.store.select(SheetState.getFullDataByOrgan);
  readonly sheetConfig$: Observable<SheetConfig> = this.store.select(SheetState.getSheetConfig);
  readonly links$: Observable<LinksASCTBData> = this.store.select(TreeState.getLinksData);
  readonly bmType$: Observable<string> = this.store.select(TreeState.getBiomarkerType);
  readonly mode$: Observable<string> = this.store.select(SheetState.getMode);
  readonly logs$: Observable<Logs> = this.store.select(LogsState.getLogs);
  readonly compareSheets$: Observable<CompareData[]> = this.store.select(SheetState.getCompareSheets);
  readonly loading$: Observable<boolean> = this.store.select(UIState.getLoading);
  @Select(UIState) readonly uiState$!: Observable<UIStateModel>;
  readonly bs$: Observable<boolean> = this.store.select(UIState.getBottomSheet);
  readonly snack$: Observable<Snackbar> = this.store.select(UIState.getSnackbar);
  readonly bottomSheetInfo$: Observable<SheetInfo> = this.store.select(SheetState.getBottomSheetInfo);
  readonly bottomSheetDOI$: Observable<DOI[]> = this.store.select(SheetState.getBottomSheetDOI);
  readonly config$: Observable<BimodalConfig> = this.store.select(TreeState.getBimodalConfig);

  /** Organ sheet data */
  data: Row[] = [];

  /** Selected sheet */
  sheet!: Sheet;

  /** Export options*/
  imgOptions: string[] = [];

  /** Comparison sheets details */
  compareDetails: CompareData[] = [];

  sheetConfig: SheetDetails[] = [];
  omapSheetConfig: SheetDetails[] = [];

  /** Reference to the snackbar */
  snackbarRef!: MatSnackBarRef<TextOnlySnackBar>;

  /** Botton input sheet ref */
  infoSheetRef!: MatBottomSheetRef;

  /** Bimodal filter values to snd via snackbar update */
  bimodalConfig!: BimodalConfig;

  /** Initialize the component */
  constructor() {
    switch (environment.tag) {
      case 'Staging':
        document.title = 'ASCT+B Reporter | Staging';
        break;
      case 'Development':
        document.title = 'ASCT+B Reporter | Development';
        break;
      default:
        document.title = 'ASCT+B Reporter';
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects,
        });
      }
    });

    effect(() => {
      if (this.appControlsEnabled()) {
        this.configService.config$.subscribe((config) => {
          this.imgOptions = config['imgOptions'] as string[];
        });

        this.configService.sheetConfiguration$.subscribe((sheetOptions) => {
          this.sheetConfig = sheetOptions;
        });

        this.configService.omapsheetConfiguration$.subscribe((sheetOptions) => {
          this.omapSheetConfig = sheetOptions;
        });

        this.config$.subscribe((config) => {
          this.bimodalConfig = config;
        });

        this.data$.subscribe((data) => {
          if (data.length) {
            this.data = data;
            try {
              this.ts.makeTreeData(this.sheet, data, []);
            } catch (err) {
              this.store.dispatch(new HasError({ hasError: true, msg: err as string, status: 400 }));
            }
          }
        });

        this.pane$.subscribe(() => {
          if (this.data) {
            this.ts.makeTreeData(this.sheet, this.data, []);
          }
        });

        const store = this.store;
        this.route.queryParamMap.subscribe((query) => {
          const isVisRoute = this.router.isActive('/vis', {
            paths: 'subset',
            fragment: 'ignored',
            queryParams: 'ignored',
            matrixParams: 'ignored',
          });
          if (!isVisRoute) {
            return;
          }

          const selectedOrgans = query.get('selectedOrgans') ?? '';
          const version = query.get('version');
          const comparisonCSV = query.get('comparisonCSVURL');
          const comparisonName = query.get('comparisonName');
          const comparisonColor = query.get('comparisonColor');
          const comparisonHasFile = query.get('comparisonHasFile');
          const sheet = query.get('sheet');
          const playground = query.get('playground');
          const omapSelectedOrgans = query.get('omapSelectedOrgans') ?? '';
          if (!(selectedOrgans || omapSelectedOrgans) && playground !== 'true') {
            store.dispatch(new UpdateMode('vis'));
            store.dispatch(new CloseLoading('Select Organ Model Rendered'));
            const config = new MatDialogConfig();
            config.disableClose = true;
            config.autoFocus = true;
            config.id = 'OrganTableSelector';
            config.width = 'fit-content';
            config.maxWidth = 'unset';
            config.data = {
              isIntilalSelect: true,
              getFromCache: true,
            };
            const dialogRef = this.dialog.open(OrganTableSelectorComponent, config);
            dialogRef.afterClosed().subscribe(({ organs, cache, omapOrgans }) => {
              store.dispatch(new UpdateGetFromCache(cache));
              if (organs !== false) {
                this.router.navigate(['/vis'], {
                  queryParams: {
                    selectedOrgans: organs?.join(','),
                    playground: false,
                    omapSelectedOrgans: omapOrgans?.join(','),
                  },
                  queryParamsHandling: 'merge',
                });
              } else {
                this.router.navigate(['/']);
              }
            });
          } else if (
            (selectedOrgans || omapSelectedOrgans) &&
            playground !== 'true' &&
            (comparisonCSV || comparisonHasFile)
          ) {
            store.dispatch(new UpdateMode('vis'));
            const comparisonCSVURLList = comparisonCSV?.split('|');
            const comparisonColorList = comparisonColor?.split('|');
            const comparisonNameList = comparisonName?.split('|');

            const comparisonDetails = this.compareDetails;
            this.sheet = this.sheetConfig.find((i) => i.name === 'some') as Sheet;

            if (!comparisonDetails.length) {
              const colors = [
                '#6457A6',
                '#2C666E',
                '#72A98F',
                '#3D5A6C',
                '#F37748',
                '#FB4B4E',
                '#FFCBDD',
                '#7C0B2B',
                '#067BC2',
                '#ECC30B',
              ];
              comparisonCSVURLList?.forEach((linkUrl, index) => {
                linkUrl = linkUrl.trim();
                comparisonDetails.push({
                  title:
                    comparisonNameList !== undefined && comparisonNameList.length - 1 >= index
                      ? comparisonNameList[index]
                      : `Sheet ${index + 1}`,
                  description: '',
                  link: linkUrl,
                  color:
                    comparisonColorList !== undefined && comparisonColorList.length - 1 >= index
                      ? comparisonColorList[index]
                      : colors[index % colors.length],
                  sheetId: this.parseSheetUrl(linkUrl).sheetID,
                  gid: this.parseSheetUrl(linkUrl).gid,
                  csvUrl: this.parseSheetUrl(linkUrl).csvUrl,
                });
              });
            }
            store.dispatch(
              new FetchSelectedOrganData(
                this.sheet,
                selectedOrgans.split(','),
                omapSelectedOrgans.split(','),
                comparisonDetails,
              ),
            );
            sessionStorage.setItem('selectedOrgans', selectedOrgans);
            if (omapSelectedOrgans) {
              this.openSnackBarToUpdateFilter();
            }
          } else if ((selectedOrgans || omapSelectedOrgans) && playground !== 'true') {
            store.dispatch(new UpdateMode('vis'));
            this.sheet = this.sheetConfig.find((i) => i.name === 'some') as Sheet;
            store.dispatch(
              new FetchSelectedOrganData(this.sheet, selectedOrgans.split(','), omapSelectedOrgans.split(',')),
            );
            sessionStorage.setItem('selectedOrgans', selectedOrgans);
            if (omapSelectedOrgans) {
              this.openSnackBarToUpdateFilter();
            }
          } else if (playground === 'true') {
            store.dispatch(new UpdateMode('playground'));
            this.sheet = this.sheetConfig.find((i) => i.name === 'some') as Sheet;
            this.store.dispatch(new FetchInitialPlaygroundData());
            store.dispatch(new CloseLoading());
          } else {
            store.dispatch(new UpdateMode('vis'));
            this.sheet = this.sheetConfig.find((i) => i.name === sheet) as Sheet;
            localStorage.setItem('sheet', this.sheet.name);
            if (version === 'latest') {
              if (this.sheet.name === 'all') {
                store.dispatch(new FetchAllOrganData(this.sheet));
              } else {
                store.dispatch(new FetchSheetData(this.sheet));
              }
            } else {
              store.dispatch(new FetchDataFromAssets(version ?? '', this.sheet));
            }
          }
        });

        this.loading$.subscribe((l) => {
          if (l && !this.dialog.getDialogById('LoadingDialog')) {
            this.openLoading();
          } else if (!l) {
            this.closeLoading();
          }
        });

        this.snack$.subscribe((sb) => {
          if (sb.opened) {
            const config: MatSnackBarConfig = {
              duration: 1500,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
              panelClass: [`${sb.type}-snackbar`],
            };
            this.snackbarRef = this.snackbar.open(sb.text, 'Dismiss', config);
            this.snackbarRef.afterDismissed();
            store.dispatch(new CloseSnackbar());
          }
        });

        this.bs$.subscribe((value) => {
          if (value) {
            this.infoSheetRef = this.infoSheet.open(InfoComponent, {
              disableClose: false,
              hasBackdrop: false,
              autoFocus: false,
              panelClass: 'bottom-sheet-style',
              data: this.bottomSheetInfo$,
            });
          } else if (this.infoSheetRef) {
            this.infoSheetRef.dismiss();
          }
        });

        this.bottomSheetDOI$.subscribe((data) => {
          if (data.length) {
            this.infoSheetRef = this.infoSheet.open(DoiComponent, {
              disableClose: false,
              hasBackdrop: false,
              autoFocus: false,
              panelClass: 'bottom-sheet-style',
              data,
            });
          } else if (this.infoSheetRef) {
            this.infoSheetRef.dismiss();
          }
        });

        this.compareSheets$.subscribe((sheets) => {
          const omapSheets = sheets.filter((sheet) => sheet.isOmap);
          if (omapSheets.length > 0) {
            this.openSnackBarToUpdateFilter();
          }
        });
      }
    });
  }

  /**
   * Toggles between visualization/playground modes of the ASCT+B reporter.
   */
  toggleMode() {
    if (this.mode() === 'vis') {
      this.router.navigate(['/vis'], {
        queryParams: { playground: true, selectedOrgans: 'example' },
        queryParamsHandling: 'merge',
      });
      // this.ga.event(GaAction.NAV, GaCategory.NAVBAR, 'Enter Playground Mode', undefined);
    } else if (this.mode() === 'playground') {
      this.router.navigate(['/vis'], {
        queryParams: {
          selectedOrgans: sessionStorage.getItem('selectedOrgans'),
          playground: false,
        },
        queryParamsHandling: 'merge',
      });
      // this.ga.event(GaAction.NAV, GaCategory.NAVBAR, 'Exit Playground Mode', undefined);
    }
  }

  /** Toggles the Indented List Drawer */
  toggleIndentedList() {
    this.store.dispatch(new ToggleIndentList());
  }

  /** Opens the comparison drawer */
  openCompare() {
    this.store.dispatch(new OpenCompare());
  }

  /** Toggles the report drawer */
  toggleReport() {
    this.store.dispatch(new ToggleReport());
  }

  /** Toggling sidebars for Report, IL, Debug, Compare */
  toggleSideNav() {
    this.store.dispatch(new CloseRightSideNav());
  }

  /** Exports image */
  exportImage(imageType: string) {
    this.exportVis(imageType);
    // this.ga.event(GaAction.CLICK, GaCategory.NAVBAR, `Export Image: ${imageType}`, 0);
  }

  /** Deletes a sheeet from the compare
   * @param i index of sheet
   */
  deleteSheet(i: number) {
    this.store.dispatch(new DeleteCompareSheet(i));
  }

  /** Function to update the report with the data
   *
   * @param data sheet data
   */
  updateReport(data: Report) {
    this.store.dispatch(new UpdateReport(data));
  }

  /** Dispatch action to open bottom sheet @param id ontology id */
  getStructureInfo(data: { name: string; ontologyId: string }) {
    this.store.dispatch(new OpenBottomSheet(data as OpenBottomSheetData));
  }

  /** Set compare data @param data compare data */
  compareData(data: CompareData[]) {
    this.store.dispatch(new CloseCompare());
    this.compareDetails = data;
    const compareDataString = data
      .filter((compareData: CompareData) => compareData.link !== '')
      .map((compareData: CompareData) => compareData.link)
      .join('|');

    const compareColorString = data
      .filter((compareData: CompareData) => compareData.color !== '')
      .map((compareData: CompareData) => compareData.color)
      .join('|');

    const compareNameString = data
      .filter((compareData: CompareData) => compareData.title !== '')
      .map((compareData: CompareData) => compareData.title)
      .join('|');

    const compareHasFile = data // check if any of the sheets has a file
      .some((compareData: CompareData) => compareData.formData !== null);

    this.router.navigate(['/vis'], {
      queryParams: {
        comparisonCSVURL: compareDataString,
        comparisonName: compareNameString,
        comparisonColor: compareColorString,
        comparisonHasFile: compareHasFile ? 'true' : 'false',
      },
      queryParamsHandling: 'merge',
    });
  }

  parseSheetUrl(url: string): { sheetID: string; gid: string; csvUrl: string } {
    if (url.startsWith('https://docs.google.com/spreadsheets/d/')) {
      const splitUrl = url.split('/');
      if (splitUrl.length === 7) {
        return {
          sheetID: splitUrl[5],
          gid: splitUrl[6].split('=')[1],
          csvUrl: '',
        };
      }
      return {
        sheetID: '0',
        gid: '0',
        csvUrl: url,
      };
    }
    return {
      sheetID: '0',
      gid: '0',
      csvUrl: url,
    };
  }

  /** Exports the visualiation into 3 formats
   *
   * @param option Export option. PNG | SVG | Vega Spec
   */
  exportVis(option: string) {
    const dt = createFileNameTimestamp();
    const sn = this.sheet.display.toLowerCase().replace(' ', '_');
    const formatType = option.toLowerCase();
    let csvURL;
    const sheet = this.store.selectSnapshot(SheetState.getSheet);
    const selectedOrgans = this.store.selectSnapshot(SheetState.getSelectedOrgans);
    const omapSelectedOrgans = this.store.selectSnapshot(SheetState.getOMAPSelectedOrgans);
    const urls: string[] = [];
    if (sheet.name === 'all' || sheet.name === 'some') {
      for (const organ of selectedOrgans) {
        this.sheetConfig.forEach((config) => {
          config.version?.forEach((version: VersionDetail) => {
            if (version.value === organ) {
              if (version.csvUrl) {
                urls.push(version.csvUrl);
              } else {
                urls.push(this.sheetService.formURL(version.sheetId ?? '', version.gid ?? ''));
              }
            }
          });
        });
      }
      for (const organ of omapSelectedOrgans) {
        this.omapSheetConfig.forEach((config) => {
          config.version?.forEach((version: VersionDetail) => {
            if (version.value === organ) {
              if (version.csvUrl) {
                urls.push(version.csvUrl);
              } else {
                urls.push(this.sheetService.formURL(version.sheetId ?? '', version.gid ?? ''));
              }
            }
          });
        });
      }
      csvURL = urls.join('|');
    }

    if (option === 'Graph Data') {
      this.sheetService
        .fetchSheetData(sheet.sheetId ?? '', sheet.gid ?? '', csvURL ? csvURL : sheet.csvUrl, undefined, 'graph')
        .subscribe((g) => {
          const graphData = g as GraphData;
          const graphDataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(graphData.data));
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute('href', graphDataStr);
          downloadAnchorNode.setAttribute('download', `asct+b_graph_data_${sn}_${dt}` + '.json');
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        });
    } else if (option === 'Vega Spec') {
      const spec = this.store.selectSnapshot(TreeState.getVegaSpec);
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(spec, null, 4));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', `asct+b_${sn}_${dt}` + '.json');
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else if (option === 'JSON-LD') {
      this.sheetService
        .fetchSheetData(sheet.sheetId ?? '', sheet.gid ?? '', csvURL ? csvURL : sheet.csvUrl, undefined, 'jsonld')
        .subscribe((g) => {
          const graphData = g as GraphData;
          const graphDataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(graphData));
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute('href', graphDataStr);
          downloadAnchorNode.setAttribute('download', `asct+b_json_ld_${sn}_${dt}` + '.json');
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        });
    } else if (option === 'OWL (RDF/XML)') {
      this.sheetService
        .fetchSheetData(sheet.sheetId ?? '', sheet.gid ?? '', csvURL ? csvURL : sheet.csvUrl, undefined, 'owl')
        .subscribe((g) => {
          const graphData = g as GraphData;
          const graphDataStr =
            'data:application/rdf+xml;charset=utf-8,' + encodeURIComponent(JSON.stringify(graphData));
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute('href', graphDataStr);
          downloadAnchorNode.setAttribute('download', `asct+b_owl_${sn}_${dt}` + '.owl');
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        });
    } else {
      const view = this.store.selectSnapshot(TreeState.getVegaView);
      const fileName = `asct+b_${sn}_${dt}.${formatType}`;
      view.background('#fafafa');
      view
        .toImageURL(formatType)
        .then((url: string) => {
          const link = document.createElement('a');
          link.setAttribute('href', url);
          link.setAttribute('target', '_blank');
          link.setAttribute('download', fileName);
          link.dispatchEvent(new MouseEvent('click'));
        })
        .catch(() => {});
    }
  }

  openSnackBarToUpdateFilter() {
    if (this.bimodalConfig.BM.type !== 'Protein') {
      const config: MatSnackBarConfig = {
        duration: 10000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      };

      setTimeout(() => {
        this.snackbarRef = this.snackbar.open(
          'OMAP Detected, Do you want to filter out only Proteins ' + 'from the available BioMarkers?',
          'Filter',
          config,
        );
        this.snackbarRef.onAction().subscribe(() => {
          this.bimodalConfig.BM.type = 'Protein';
          this.store.dispatch(new UpdateBimodalConfig(this.bimodalConfig)).subscribe(() => {
            const data = this.store.selectSnapshot(SheetState.getData);
            const treeData = this.store.selectSnapshot(TreeState.getTreeData);
            const bimodalConfig = this.store.selectSnapshot(TreeState.getBimodal).config;
            const sheetConfig = this.store.selectSnapshot(SheetState.getSheetConfig);
            const omapConfig = this.store.selectSnapshot(TreeState.getOmapConfig);
            const filteredProtiens = this.store.selectSnapshot(SheetState.getFilteredProtiens);

            if (data.length) {
              this.bms.makeBimodalData(data, treeData, bimodalConfig, false, sheetConfig, omapConfig, filteredProtiens);
            }
          });
        });
      }, 2000);
    }
  }

  /** Opens loading dialog
   *
   * @param text Loading text
   */
  openLoading(text?: string) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.id = 'LoadingDialog';
    config.data = text;
    config.width = '300px';

    this.dialog.open(LoadingComponent, config);
  }

  /** @param url  of the sheet to compare
   * @returns a object with the sheetID, gid, and CsvUrl
   */

  /** Close loading dialog */
  closeLoading() {
    const loadingDialog = this.dialog.getDialogById('LoadingDialog');
    if (loadingDialog) {
      loadingDialog.close();
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StateReset(SheetState));
  }
}
