import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { StateReset } from 'ngxs-reset-plugin';
import { parse } from 'papaparse';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ReportLog } from '../actions/logs.actions';
import {
  DeleteCompareSheet,
  FetchAllOrganData,
  FetchCompareData,
  FetchDataFromAssets,
  FetchInitialPlaygroundData,
  FetchSelectedOrganData,
  FetchSheetData,
  FetchValidOmapProtiens,
  ToggleShowAllAS,
  UpdateBottomSheetDOI,
  UpdateBottomSheetInfo,
  UpdateConfig,
  UpdateGetFromCache,
  UpdateMode,
  UpdatePlaygroundData,
  UpdateReport,
  UpdateSelectedOrgansBeforeFilter,
  UpdateSheet,
} from '../actions/sheet.actions';
import { CloseBottomSheet, HasError, OpenLoading, UpdateLoadingText } from '../actions/ui.actions';
import { ConfigService } from '../app-config.service';
import { ReportService } from '../components/report/report.service';
import { GaAction, GaCategory } from '../models/ga.model';
import { LOG_ICONS, LOG_TYPES } from '../models/logs.model';
import { OmapConfig } from '../models/omap.model';
import { Report } from '../models/report.model';
import { Error } from '../models/response.model';
import {
  CompareData,
  DOI,
  ResponseData,
  Row,
  Sheet,
  SheetConfig,
  SheetDetails,
  SheetInfo,
  Structure,
  VersionDetail,
  SelectedOrganBeforeFilter,
} from '../models/sheet.model';
import { SheetService } from '../services/sheet.service';
import { TreeState } from './tree.state';

/** Class to keep track of the sheet */
export interface SheetStateModel {
  /**
   * Stores the data csv string from the response
   */
  csv: string;
  /**
   * Stores the data from Google Sheets
   */
  data: Row[];
  /**
   * Stores the currently selected sheet
   */
  sheet: Sheet;
  /**
   * Stores the current version
   */
  version: string;
  /**
   * Stores the compare data input by the user
   */
  compareSheets: CompareData[];
  /**
   * Stores the compare data from the server
   */
  compareData: Row[];
  /**
   * Stores the configuration for a sheet such as width, height etc.
   */
  sheetConfig: SheetConfig;
  /**
   * Stores the data from the report
   */
  reportData: Report;
  /**
   * Stores the mode: vis or playground
   */
  mode: string;
  /**
   * Stores the parsed data
   */
  parsed: string[][];
  /**
   * Stores the bottom sheet info data
   */
  bottomSheetInfo: SheetInfo;
  /**
   * Stores the DOI references data
   */
  bottomSheetDOI: DOI[];
  /**
   * Stores the full anatomical structures data when all organs is clicked.
   */
  fullAsData: Row[];
  /**
   * Stores the selected organs details.
   */
  selectedOrgans: string[];
  /**
   * Stores the selected organs details from OMAPS.
   */
  omapSelectedOrgans: string[];
  /**
   * Full data by organ
   */
  fullDataByOrgan: Row[][];
  /**
   * Update the flag is data should be fetched from cache
   */
  getFromCache: boolean;
  /**
   * Stores all Omap Organs
   */
  allOmapOrgans: string[];
  /**
   * Stores all Protiens which are OMAP and common to current ASCT data
   */
  filteredProtiens: string[];
  /**
   * Stores all organs before OMAP organs only filter
   */
  selectedOrgansBeforeFilter: SelectedOrganBeforeFilter[];
}

const FETCHING_TEXT = 'Fetching data...';

@State<SheetStateModel>({
  name: 'sheetState',
  defaults: {
    csv: '',
    data: [],
    version: 'latest',
    sheet: {
      name: '',
      display: '',
      sheetId: '',
      gid: '',
      config: {
        bimodal_distance_x: 0,
        bimodal_distance_y: 0,
        width: 0,
        height: 0,
        show_ontology: true,
      },
      title: '',
    },
    sheetConfig: {
      bimodal_distance_x: 0,
      bimodal_distance_y: 0,
      width: 0,
      height: 0,
      show_ontology: true,
      show_all_AS: false,
    },
    compareSheets: [],
    compareData: [],
    reportData: {
      ASWithNoLink: [],
      CTWithNoLink: [],
      BWithNoLink: [],
      anatomicalStructures: [],
      cellTypes: [],
      biomarkers: [],
      ASWithNoCT: [],
      CTWithNoB: [],
    },
    mode: 'vis',
    parsed: [],
    bottomSheetInfo: {
      name: '',
      ontologyId: '',
      ontologyCode: '',
      iri: '',
      label: '',
      desc: 'null',
      hasError: false,
      msg: '',
      status: 0,
      notes: '',
      references: [],
      extraLinks: {},
    },
    bottomSheetDOI: [],
    fullAsData: [],
    selectedOrgans: [],
    omapSelectedOrgans: [],
    fullDataByOrgan: [],
    getFromCache: true,
    allOmapOrgans: [],
    filteredProtiens: [],
    selectedOrgansBeforeFilter: [],
  },
})
@Injectable()
export class SheetState {
  sheetConfig: SheetDetails[] = [];
  omapSheetConfig: SheetDetails[] = [];
  exampleSheet?: SheetDetails;
  headerCount = 0;
  faliureMsg = 'Failed to fetch data';
  bodyId = 'UBERON:0013702';
  bodyLabel = 'body proper';

  constructor(
    public configService: ConfigService,
    private readonly sheetService: SheetService,
    public readonly ga: GoogleAnalyticsService,
    public reportService: ReportService,
    public store: Store,
  ) {
    this.configService.sheetConfiguration$.subscribe((sheetOptions) => {
      this.sheetConfig = sheetOptions;
    });
    this.configService.omapsheetConfiguration$.subscribe((sheetOptions) => {
      this.omapSheetConfig = sheetOptions;
    });
    this.configService.allSheetConfigurations$.subscribe((sheetOptions) => {
      this.exampleSheet = sheetOptions.find((s) => s.name === 'example');
    });
    this.configService.config$.subscribe((config) => {
      this.headerCount = config['headerCount'] as number;
    });
  }

  /**
   * Returns an observable that watches the data
   */
  @Selector()
  static getData(state: SheetStateModel) {
    return state.data;
  }

  /**
   * Returns an observable that watches the sheet
   */
  @Selector()
  static getSheet(state: SheetStateModel) {
    return state.sheet;
  }

  /**
   * Returns an observable that watches the sheet config
   */
  @Selector()
  static getSheetConfig(state: SheetStateModel) {
    return state.sheetConfig;
  }

  /**
   * Returns an observable that watches the selected organs data
   */
  @Selector()
  static getSelectedOrgans(state: SheetStateModel) {
    return state.selectedOrgans;
  }

  /**
   * Returns an observable that watches the selected organs data from OMAPS
   */
  @Selector()
  static getOMAPSelectedOrgans(state: SheetStateModel) {
    return state.omapSelectedOrgans;
  }

  /**
   * Returns an observable that watches the linked compare documents
   */
  @Selector()
  static getCompareSheets(state: SheetStateModel) {
    return state.compareSheets;
  }

  /**
   * Returns an observable that watches all the data from the linked compare documents
   */
  @Selector()
  static getCompareData(state: SheetStateModel) {
    return state.compareData;
  }

  /**
   * Returns an observable that watches the report data
   * This is used for the global report
   */
  @Selector()
  static getReportdata(state: SheetStateModel) {
    return state.reportData;
  }

  /**
   * Returns an observable that watches the parsed sheet data
   * Parsed using papa parse
   */
  @Selector()
  static getParsedData(state: SheetStateModel) {
    return state.parsed;
  }

  /**
   * Returns an observable that watches the compare sheets and the compare data
   */
  @Selector()
  static getAllCompareData(state: SheetStateModel) {
    return {
      data: state.compareData,
      sheets: state.compareSheets,
    };
  }

  /**
   * Returns an observable that watches the bottom sheet info data
   */
  @Selector()
  static getBottomSheetInfo(state: SheetStateModel) {
    return state.bottomSheetInfo;
  }

  /**
   * Returns an observable that watches the bottom sheet DOI data
   */
  @Selector()
  static getBottomSheetDOI(state: SheetStateModel) {
    return state.bottomSheetDOI;
  }

  /**
   * Returns an observable that watches the fullAsData  data
   */
  @Selector()
  static getFullAsData(state: SheetStateModel) {
    return state.fullAsData;
  }

  /**
   * Returns an observable that watches the fullDataByOrgan  data
   */
  @Selector()
  static getFullDataByOrgan(state: SheetStateModel) {
    return state.fullDataByOrgan;
  }

  /**
   * Returns an observable that watches the mode
   * values: [playground, vis]
   */
  @Selector()
  static getMode(state: SheetStateModel) {
    return state.mode;
  }

  /**
   * Returns an observable that watches the getFromCache flag
   */
  @Selector()
  static getDataFromCache(state: SheetStateModel) {
    return state.getFromCache;
  }

  /**
   * Returns an allOmapsOrgan Names from the state
   */
  @Selector()
  static getAllOMAPOrgans(state: SheetStateModel) {
    return state.allOmapOrgans;
  }
  /**
   * Returns an allOmapsOrgan Names from the state
   */
  @Selector()
  static getFilteredProtiens(state: SheetStateModel) {
    return state.filteredProtiens;
  }
  /**
   * Returns all organs selected before omap organs filtering
   */
  @Selector()
  static getSelectedOrgansBeforeFilter(state: SheetStateModel) {
    return state.selectedOrgansBeforeFilter;
  }

  /**
   * Action to delete a linked sheet from the state.
   * Accepts the index location of the sheet that is to be deleted
   */
  @Action(DeleteCompareSheet)
  deleteCompareSheet({ getState, setState, dispatch }: StateContext<SheetStateModel>, { i }: DeleteCompareSheet) {
    let state = getState();
    const sheets = state.compareSheets;
    sheets.splice(i, 1);

    setState({
      ...state,
      compareSheets: sheets,
    });

    state = getState();
    if (state.compareSheets.length) {
      dispatch(new FetchCompareData(state.compareSheets));
    } else {
      setState({
        ...state,
        compareData: [],
      });
      // when comparing for all organs, make sure this is checked
      dispatch(new FetchSheetData(state.sheet));
    }
  }

  /**
   * Action to fetch all the compare data form the linked sheets
   * Accepts all the linked sheets that contains the google sheet link,
   * sheet name, description and color
   */
  @Action(FetchCompareData)
  async fetchCompareData(
    { getState, dispatch, patchState }: StateContext<SheetStateModel>,
    { compareData }: FetchCompareData,
  ) {
    dispatch(new OpenLoading(FETCHING_TEXT));
    dispatch(new CloseBottomSheet());

    patchState({
      compareData: [],
      compareSheets: [],
    });

    const organ: Structure = {
      name: 'Body',
      id: this.bodyId,
      rdfs_label: this.bodyLabel,
    };

    for await (const [_unused, compareSheet] of compareData.entries()) {
      this.sheetService
        .fetchSheetData(compareSheet.sheetId, compareSheet.gid, compareSheet.csvUrl, compareSheet.formData)
        .subscribe(
          (r) => {
            const res = r as ResponseData;
            for (const row of res.data) {
              for (const i of row.anatomical_structures) {
                i.isNew = true;
                i.color = compareSheet.color;
              }
              row.anatomical_structures.unshift(organ);
              row.organName = compareSheet.title;
              row.tableVersion = '';

              for (const i of row.cell_types) {
                i.isNew = true;
                i.color = compareSheet.color;
              }

              for (const i of row.biomarkers) {
                i.isNew = true;
                i.color = compareSheet.color;
              }
            }

            const currentData = getState().data;
            const currentFullASData = getState().fullAsData;
            const currentFullDataByOrgan = getState().fullDataByOrgan;
            const currentCompare = getState().compareSheets;
            const currentCompareData = getState().compareData;
            const gaData = {
              sheetName: compareSheet.title,
              counts: {},
            };
            gaData.counts = this.reportService.countsGA(res.data);
            this.ga.event(
              GaAction.INPUT,
              GaCategory.COMPARISON,
              `Adding sheet or file to Compare: ${JSON.stringify(gaData)}`,
              0,
            );
            compareSheet.isOmap = res.isOmap ?? false;
            patchState({
              data: [...currentData, ...res.data],
              fullAsData: [...currentFullASData, ...res.data],
              compareSheets: [...currentCompare, ...[compareSheet]],
              compareData: [...currentCompareData, ...res.data],
              fullDataByOrgan: [...currentFullDataByOrgan, res.data],
            });
            dispatch(new FetchValidOmapProtiens());
          },
          (error) => {
            console.log(error);
            const err: Error = {
              msg: `${error.name} (Status: ${error.status})`,
              status: error.status,
              hasError: true,
              hasGidError: !(compareSheet.gid || compareSheet.gid === '0'),
            };
            dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
            dispatch(new HasError(err));
            dispatch(new FetchValidOmapProtiens());
            return of('');
          },
        );
    }
  }

  /**
   * Action to fetch selected organs data using forkJoin rxjs
   * Accepts the sheet config and selected organs data
   */
  @Action(FetchSelectedOrganData)
  async fetchSelectedOrganData(
    { getState, dispatch, patchState }: StateContext<SheetStateModel>,
    { sheet, selectedOrgans, omapSelectedOrgans, comparisonDetails }: FetchSelectedOrganData,
  ) {
    patchState({
      allOmapOrgans: this.omapSheetConfig.map((organObject) => organObject.name),
    });

    const state = getState();
    const omapConfig = this.store.selectSnapshot(TreeState.getOmapConfig);

    selectedOrgans = this.omapFiltering(state, omapConfig, selectedOrgans);

    dispatch(new OpenLoading(FETCHING_TEXT));

    dispatch(new StateReset(TreeState));
    dispatch(new CloseBottomSheet());
    dispatch(new ReportLog(LOG_TYPES.MSG, sheet.display, LOG_ICONS.file));

    patchState({
      sheet,
      compareData: [],
      compareSheets: [],
      data: [],
      selectedOrgans: selectedOrgans,
      omapSelectedOrgans: omapSelectedOrgans,
      sheetConfig: {
        ...sheet.config,
        show_ontology: state.sheetConfig.show_ontology,
        show_all_AS: state.sheetConfig.show_all_AS,
      },
      version: 'latest',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requests$: Observable<any>[] = [];
    let dataAll: Row[] = [];

    const organsNames: string[] = [];
    const organTableVersions: string[] = [];
    for (const organ of selectedOrgans) {
      this.sheetConfig.forEach((config) => {
        config.version?.forEach((version: VersionDetail) => {
          if (version.value === organ) {
            requests$.push(
              this.sheetService.fetchSheetData(
                version.sheetId ?? '',
                version.gid ?? '',
                version.csvUrl,
                undefined,
                undefined,
                state.getFromCache,
              ),
            );
            organsNames.push(config.name);
            organTableVersions.push(version.viewValue);
          }
        });
      });
    }
    for (const organ of omapSelectedOrgans) {
      this.omapSheetConfig.forEach((config) => {
        config.version?.forEach((version: VersionDetail) => {
          if (version.value === organ) {
            requests$.push(
              this.sheetService.fetchSheetData(
                version.sheetId ?? '',
                version.gid ?? '',
                version.csvUrl,
                undefined,
                undefined,
                state.getFromCache,
              ),
            );
            organsNames.push(config.name);
          }
        });
      });
    }
    let asDetails: Row[] = [];
    const fullDataByOrgan: Row[][] = [];
    forkJoin(requests$).subscribe(
      (allResults) => {
        allResults.map((res: ResponseData, index: number) => {
          for (const row of res.data) {
            row.organName = organsNames[index];
            row.tableVersion = organTableVersions[index];

            const newStructure: Structure = {
              name: 'Body',
              id: this.bodyId,
              rdfs_label: this.bodyLabel,
            };

            row.anatomical_structures.unshift(newStructure);
          }

          asDetails = JSON.parse(JSON.stringify([...asDetails, ...res.data]));
          fullDataByOrgan.push(JSON.parse(JSON.stringify([...res.data])));
          for (const row of res.data) {
            if (!state.sheetConfig.show_all_AS && selectedOrgans.length > 8) {
              row.anatomical_structures.splice(2, row.anatomical_structures.length - 2);
            }
          }

          dataAll = [...dataAll, ...res.data];
        });
        patchState({
          data: dataAll,
          fullAsData: asDetails,
          fullDataByOrgan,
        });
        if (comparisonDetails) {
          dispatch(new FetchCompareData(comparisonDetails));
        }
        dispatch(new FetchValidOmapProtiens());
      },
      (err) => {
        const error: Error = {
          msg: `${err.name} (Status: ${err.status})`,
          status: err.status,
          hasError: true,
        };
        dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
        dispatch(new HasError(error));
        return of('');
      },
    );
    const bodyRow: Row = {
      anatomical_structures: [
        {
          name: 'Body',
          id: 'UBERON:0013702',
        },
      ],
      cell_types: [],
      biomarkers: [],
      biomarkers_gene: [],
      biomarkers_protein: [],
      biomarkers_lipids: [],
      biomarkers_meta: [],
      biomarkers_prot: [],
      references: [],
      organName: '',
      tableVersion: '',
    };
    if (
      (selectedOrgans.length === 0 || selectedOrgans[0] === '') &&
      (omapSelectedOrgans.length === 0 || omapSelectedOrgans[0] === '')
    ) {
      patchState({
        data: [bodyRow],
        fullAsData: [bodyRow],
        fullDataByOrgan: [[bodyRow]],
      });
      if (comparisonDetails) {
        dispatch(new FetchCompareData(comparisonDetails));
      } else {
        dispatch(new FetchValidOmapProtiens());
      }
    }
  }

  private omapFiltering(sheetState: SheetStateModel, event: OmapConfig, currentlySelectedOrgans: string[]): string[] {
    const selectedOrgansBeforeFilter = sheetState.selectedOrgansBeforeFilter;

    let newSelectedOrgans: string[] = [];
    if (event.organsOnly) {
      //Union oldSelected and currentlySelected and make a new list
      currentlySelectedOrgans = this.unionOldSelectedAndNewSelected(
        selectedOrgansBeforeFilter,
        currentlySelectedOrgans,
      );
      //Filtered List
      newSelectedOrgans = this.organFiltering(currentlySelectedOrgans, sheetState.omapSelectedOrgans);
      const newSelectedBeforeOrgans = currentlySelectedOrgans.map((organ) =>
        this.convertOrganToBeforeFilterFormat(organ, !newSelectedOrgans.includes(organ)),
      );
      this.store.dispatch(new UpdateSelectedOrgansBeforeFilter(newSelectedBeforeOrgans));
      sessionStorage.setItem('selectedOrgans', newSelectedOrgans.join(','));
    } else {
      newSelectedOrgans =
        selectedOrgansBeforeFilter.length > 0
          ? selectedOrgansBeforeFilter.map((organ) => organ.selector ?? '')
          : currentlySelectedOrgans;
      this.store.dispatch(new UpdateSelectedOrgansBeforeFilter([]));
      sessionStorage.setItem('selectedOrgans', newSelectedOrgans.join(','));
    }

    return newSelectedOrgans;
  }

  private unionOldSelectedAndNewSelected(
    beforeFilterOrgans: SelectedOrganBeforeFilter[],
    currentlySelectedOrgans: string[],
  ): string[] {
    // Don't add if was removed by user in currentlySelected
    const filteredOutBeforeFilterOrgans = beforeFilterOrgans
      .filter((organ) => organ.filteredOut)
      .map((organ) => organ.selector ?? '');
    return [...new Set([...filteredOutBeforeFilterOrgans, ...currentlySelectedOrgans])];
  }

  private organFiltering(selectedOrgans: string[], omapSelectedOrgans: string[]): string[] {
    // If no OMAP organs selected
    if (omapSelectedOrgans.length > 0 && omapSelectedOrgans[0] !== '') {
      const selectedOmapOrgans = omapSelectedOrgans.map((organ) =>
        organ.split('-')[0].split('_').join(' ').toLowerCase(),
      );
      const filteredOmapOrgans = this.omapSheetConfig
        .filter((organ) => selectedOmapOrgans.includes(organ.name.toLowerCase()))
        .map((organ) => organ.uberon_id);
      const newSelectedOrgans = [];
      for (const selectedOrgan of selectedOrgans) {
        const sheetOrgan = this.sheetConfig.find(
          (organ) => organ.name.toLowerCase() === selectedOrgan.split('-')[0].toLowerCase(),
        );
        if (sheetOrgan?.representation_of?.some((rep) => filteredOmapOrgans.includes(rep))) {
          newSelectedOrgans.push(selectedOrgan);
        }
      }
      return newSelectedOrgans;
    } else {
      const omapUberonIds = this.omapSheetConfig.map((organ) => organ.uberon_id);
      const newSelectedOrgans: string[] = [];
      selectedOrgans.forEach((selectedOrgan) => {
        const sheetOrgan = this.sheetConfig.find(
          (organ) => organ.name.toLowerCase() === selectedOrgan.split('-')[0].toLowerCase(),
        );
        if (sheetOrgan?.representation_of?.some((rep) => omapUberonIds.includes(rep))) {
          newSelectedOrgans.push(selectedOrgan);
        }
      });
      return newSelectedOrgans;
    }
  }

  private convertOrganToBeforeFilterFormat(organ: string, filteredOut: boolean): SelectedOrganBeforeFilter {
    const [organName, version] = organ.split('-');
    return { selector: organ, organName, version, filteredOut };
  }

  private arraysEqual<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Action to fetch all organ data using forkJoin rxjs
   * Accepts the sheet config
   */
  @Action(FetchAllOrganData)
  async fetchAllOrganData(
    { getState, dispatch, patchState }: StateContext<SheetStateModel>,
    { sheet }: FetchAllOrganData,
  ) {
    dispatch(new OpenLoading(FETCHING_TEXT));
    dispatch(new StateReset(TreeState));
    dispatch(new CloseBottomSheet());
    dispatch(new ReportLog(LOG_TYPES.MSG, sheet.display, LOG_ICONS.file));
    const state = getState();

    patchState({
      sheet,
      compareData: [],
      compareSheets: [],
      sheetConfig: {
        ...sheet.config,
        show_ontology: state.sheetConfig.show_ontology,
        show_all_AS: state.sheetConfig.show_all_AS,
      },
      version: 'latest',
      data: [],
      allOmapOrgans: this.omapSheetConfig.map((organObject) => organObject.name),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requests$: Observable<any>[] = [];
    let dataAll: Row[] = [];
    const organsNames: string[] = [];
    const organsTableVersions: string[] = [];

    for (const s of this.sheetConfig) {
      if (s.name === 'all' || s.name === 'example' || s.name === 'some') {
        continue;
      } else {
        requests$.push(this.sheetService.fetchSheetData(s.sheetId ?? '', s.gid ?? '', s.csvUrl));
        organsNames.push(s.name);
        organsTableVersions.push(s.version?.find((i) => i.value === s.name)?.viewValue ?? '');
      }
    }
    let asData: Row[] = [];

    forkJoin(requests$).subscribe(
      (allresults) => {
        allresults.map((res: ResponseData, i) => {
          for (const row of res.data) {
            row.organName = organsNames[i];
            row.tableVersion = organsTableVersions[i];
            const newStructure: Structure = {
              name: 'Body',
              id: this.bodyId,
              rdfs_label: this.bodyLabel,
            };
            row.anatomical_structures.unshift(newStructure);
          }
          asData = JSON.parse(JSON.stringify([...asData, ...res.data]));
          for (const row of res.data) {
            if (!state.sheetConfig.show_all_AS) {
              row.anatomical_structures.splice(2, row.anatomical_structures.length - 2);
            }
          }
          dataAll = [...dataAll, ...res.data];
        });
        patchState({
          data: dataAll,
          fullAsData: asData,
        });
        dispatch(new FetchValidOmapProtiens());
      },
      (error) => {
        const err: Error = {
          msg: `${error.name} (Status: ${error.status})`,
          status: error.status,
          hasError: true,
        };
        dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
        dispatch(new HasError(err));
        return of('');
      },
    );
  }

  /**
   * Action to fetch the sheet data. Resets the Sheet State and the Tree State
   * Accepts the sheet config of the particular sheet
   */
  @Action(FetchSheetData)
  fetchSheetData(
    { getState, setState, dispatch, patchState }: StateContext<SheetStateModel>,
    { sheet }: FetchSheetData,
  ) {
    const mode = getState().mode;
    dispatch(new OpenLoading(FETCHING_TEXT));
    dispatch(new StateReset(TreeState));
    dispatch(new CloseBottomSheet());
    dispatch(new ReportLog(LOG_TYPES.MSG, sheet.display, LOG_ICONS.file));
    patchState({ sheet });
    const state = getState();

    return this.sheetService.fetchSheetData(sheet.sheetId ?? '', sheet.gid ?? '', sheet.csvUrl, sheet.formData).pipe(
      tap((r) => {
        const res = r as ResponseData;
        res.data = this.sheetService.getDataWithBody(res.data, sheet.name);
        setState({
          ...state,
          compareData: [],
          compareSheets: [],
          reportData: {
            ASWithNoLink: [],
            CTWithNoLink: [],
            BWithNoLink: [],
            anatomicalStructures: [],
            cellTypes: [],
            biomarkers: [],
            ASWithNoCT: [],
            CTWithNoB: [],
          },
          csv: res.csv,
          data: res.data,
          version: 'latest',
          parsed: res.parsed,
          mode,
          sheetConfig: { ...sheet.config, show_ontology: true },
        });
        if (sheet.name === 'example') {
          const gaData = {
            sheetName: sheet.name,
            counts: {},
          };
          gaData.sheetName = sheet.name;
          gaData.counts = this.reportService.countsGA(res.data);
          this.ga.event(
            GaAction.INPUT,
            GaCategory.PLAYGROUND,
            `Adding sheet link or file to Playground : ${JSON.stringify(gaData)}`,
            0,
          );
        }
        dispatch(new ReportLog(LOG_TYPES.MSG, `${sheet.display} data successfully fetched.`, LOG_ICONS.success));
        dispatch(new UpdateLoadingText('Fetch data successful. Building Visualization..'));
      }),
      catchError((error) => {
        console.log(error);
        const err: Error = {
          msg: `${error.name} (Status: ${error.status})`,
          status: error.status,
          hasError: true,
          hasGidError: !(sheet.gid || sheet.gid === '0'),
        };
        dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
        dispatch(new HasError(err));
        return of('');
      }),
    );
  }

  /**
   * Action to fetch data from assets
   * CURRENTLY DEPRICATED IN V2
   */
  @Action(FetchDataFromAssets)
  fetchDataFromAssets(
    { getState, setState, dispatch }: StateContext<SheetStateModel>,
    { version, sheet }: FetchDataFromAssets,
  ) {
    const state = getState();
    dispatch(new OpenLoading('Fetching data from assets...'));
    dispatch(new StateReset(TreeState));
    dispatch(new CloseBottomSheet());
    dispatch(new ReportLog(LOG_TYPES.MSG, sheet.display, LOG_ICONS.file, version));

    return this.sheetService.fetchDataFromAssets(version, sheet).pipe(
      tap((res) => {
        const parsedData = parse<unknown[]>(res, { skipEmptyLines: true });
        parsedData.data.splice(0, this.headerCount);
        parsedData.data.map((i) => {
          i.push(false);
          i.push('#ccc');
        });

        setState({
          ...state,
          version,
          data: parsedData.data as unknown as Row[],
          sheet,
          sheetConfig: { ...sheet.config, show_ontology: true },
        });
        dispatch(
          new ReportLog(
            LOG_TYPES.MSG,
            `${sheet.display} data successfully fetched from assets.`,
            LOG_ICONS.success,
            version,
          ),
        );
        dispatch(new UpdateLoadingText('Fetch data successful. Building Visualization..'));
      }),
      catchError((error) => {
        const err: Error = {
          msg: `${error.name} (Status: ${error.status})`,
          status: error.status,
          hasError: true,
        };
        dispatch(new ReportLog(LOG_TYPES.MSG, 'Failed to fetch data from assets.', LOG_ICONS.error));
        dispatch(new HasError(err));
        return of('');
      }),
    );
  }

  /**
   * Action to update the sheet configuration
   * Accepts the config that states the differetn sheet control's configuration
   */
  @Action(UpdateConfig)
  updateConfig({ getState, setState }: StateContext<SheetStateModel>, { config }: UpdateConfig) {
    const state = getState();
    setState({
      ...state,
      sheetConfig: config,
    });
  }

  /**
   * Action to toggle the show all AS in the All Organs Visualization
   */
  @Action(ToggleShowAllAS)
  ToggleShowAllAS({ getState, setState }: StateContext<SheetStateModel>) {
    const state = getState();
    const config = state.sheetConfig;
    setState({
      ...state,
      sheetConfig: { ...config, show_all_AS: !state.sheetConfig.show_all_AS },
    });
  }

  /**
   * Action to update the report data
   */
  @Action(UpdateReport)
  updateReport({ getState, setState }: StateContext<SheetStateModel>, { reportData }: UpdateReport) {
    const state = getState();
    setState({
      ...state,
      reportData,
    });
  }

  /**
   * Action to update the mode
   */
  @Action(UpdateMode)
  updateMode({ getState, setState }: StateContext<SheetStateModel>, { mode }: UpdateMode) {
    const state = getState();
    setState({
      ...state,
      mode,
    });
  }

  /**
   * Action to update the the sheet
   * Accepts the sheet config
   */
  @Action(UpdateSheet)
  updateSheet({ getState, setState }: StateContext<SheetStateModel>, { sheet }: UpdateSheet) {
    const state = getState();
    setState({
      ...state,
      sheet,
      sheetConfig: { ...sheet.config, show_ontology: true },
    });
  }

  /**
   * Action to fetch initial playground data. This makes a call to the playground api
   * that fetches the initial exmaple CSV
   */
  @Action(FetchInitialPlaygroundData)
  fetchInitialPlaygroundData({ getState, setState, dispatch }: StateContext<SheetStateModel>) {
    const sheet = this.exampleSheet as Sheet;
    const mode = getState().mode;
    dispatch(new OpenLoading('Fetching playground data...'));
    dispatch(new StateReset(TreeState));
    dispatch(new CloseBottomSheet());
    dispatch(new ReportLog(LOG_TYPES.MSG, 'Example', LOG_ICONS.file, 'latest'));
    const organ: Structure = {
      name: 'Body',
      id: this.bodyId,
      rdfs_label: this.bodyLabel,
    };

    return this.sheetService.fetchPlaygroundData().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((res: any) => {
        res.data.forEach((row: Row) => {
          row.anatomical_structures.unshift(organ);
          row.organName = sheet.name;
          row.tableVersion = '';
        });

        setState({
          ...getState(),
          compareData: [],
          compareSheets: [],
          parsed: res.parsed,
          csv: res.csv,
          data: res.data,
          version: 'latest',
          mode,
          sheet,
          fullAsData: res.data,
          fullDataByOrgan: [res.data],
          sheetConfig: { ...sheet.config, show_ontology: true },
        });
      }),
      catchError((error) => {
        console.log(error);
        const err: Error = {
          msg: `${error.name} (Status: ${error.status})`,
          status: error.status,
          hasError: true,
        };
        dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
        dispatch(new HasError(err));
        return of('');
      }),
    );
  }

  /**
   * Action to update the current data in the table (in the playground)
   * Accepts the parsed data
   */
  @Action(UpdatePlaygroundData)
  updatePlaygroundData(
    { getState, setState, dispatch }: StateContext<SheetStateModel>,
    { data }: UpdatePlaygroundData,
  ) {
    const sheet = this.exampleSheet as Sheet;
    const state = getState();
    dispatch(new OpenLoading('Fetching playground data...'));
    dispatch(new StateReset(TreeState));
    dispatch(new CloseBottomSheet());
    dispatch(new ReportLog(LOG_TYPES.MSG, 'Updated Playground Data', LOG_ICONS.file, 'latest'));
    const organ: Structure = {
      name: 'Body',
      id: this.bodyId,
      rdfs_label: this.bodyLabel,
    };

    return this.sheetService.updatePlaygroundData(data).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((res: any) => {
        res.data.forEach((row: Row) => {
          row.anatomical_structures.unshift(organ);
          row.organName = sheet.name;
          row.tableVersion = '';
        });
        setState({
          ...state,
          parsed: res.parsed,
          csv: res.csv,
          data: res.data,
          version: 'latest',
          sheetConfig: { ...state.sheet.config, show_ontology: true },
        });
      }),
      catchError((error) => {
        console.log(error);
        const err: Error = {
          msg: `${error.name} (Status: ${error.status})`,
          status: error.status,
          hasError: true,
        };
        dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
        dispatch(new HasError(err));
        return of('');
      }),
    );
  }

  /**
   * Action to update the bottom sheet data in the indentlist (in the Info)
   * Accepts the parsed data
   */
  @Action(UpdateBottomSheetInfo)
  updateBottomSheetInfo(
    { getState, setState, dispatch }: StateContext<SheetStateModel>,
    { data }: UpdateBottomSheetInfo,
  ) {
    // Get initial state and blank it out while fetching new data.
    const state = getState();
    setState({
      ...state,
      bottomSheetInfo: {
        ...state.bottomSheetInfo,
        name: '',
        desc: '',
        iri: '',
      },
    });

    // Call the appropriate API and fetch ontology data
    return this.sheetService.fetchBottomSheetData(data.ontologyId, data.name).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((res: any) => {
        setState({
          ...state,
          bottomSheetInfo: {
            ...res,
            notes: data?.notes,
            ...(data.group === 2 ? { references: data?.references } : {}),
          },
        });
      }),
      catchError((error) => {
        setState({
          ...state,
          bottomSheetInfo: {
            name: data.name,
            ontologyId: data.ontologyId,
            ontologyCode: '',
            extraLinks: {},
            iri: '',
            label: '',
            desc: '',
            hasError: true,
            msg: error.message,
            status: error.status,
            notes: data?.notes,
            ...(data.group === 2 ? { references: data?.references } : {}),
          },
        });
        const err: Error = {
          msg: `${error.name} (Status: ${error.status})`,
          status: error.status,
          hasError: true,
        };
        console.log(err);
        dispatch(new ReportLog(LOG_TYPES.MSG, this.faliureMsg, LOG_ICONS.error));
        return of('');
      }),
    );
  }

  /**
   * Action to update the bottom sheet data in the DOI
   * Accepts the parsed data
   */
  @Action(UpdateBottomSheetDOI)
  updateBottomSheetDOI({ getState, setState }: StateContext<SheetStateModel>, { data }: UpdateBottomSheetDOI) {
    const state = getState();
    setState({
      ...state,
      bottomSheetDOI: data,
    });
  }

  /**
   * Action to update the flag to get the data from cache
   */
  @Action(UpdateGetFromCache)
  updateGetFromCache({ getState, setState }: StateContext<SheetStateModel>, { cache }: UpdateGetFromCache) {
    const state = getState();
    setState({
      ...state,
      getFromCache: cache,
    });
  }

  @Action(FetchValidOmapProtiens)
  fetchValidOmapProtiens({ getState, patchState }: StateContext<SheetStateModel>) {
    const state = getState();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requests$: Observable<any>[] = [];

    if (state.omapSelectedOrgans.length > 0 && state.omapSelectedOrgans[0] !== '') {
      for (const s of state.omapSelectedOrgans) {
        const [_omap, _omapNumber, organ, _omapVersion] = s.split('-');
        const organName = organ.split('_').join(' ');
        const sheetDetails = this.omapSheetConfig.find((omap) => omap.name.toLowerCase() === organName.toLowerCase());
        const version = sheetDetails?.version?.find((v) => v.value.toLowerCase() === s.toLowerCase());
        requests$.push(
          this.sheetService.fetchSheetData(
            version?.sheetId ?? '',
            version?.gid ?? '',
            version?.csvUrl,
            undefined,
            undefined,
            state.getFromCache,
          ),
        );
      }
    } else {
      for (const s of this.omapSheetConfig) {
        const version = [...(s.version ?? [])].pop();
        requests$.push(
          this.sheetService.fetchSheetData(
            version?.sheetId ?? '',
            version?.gid ?? '',
            version?.csvUrl,
            undefined,
            undefined,
            state.getFromCache,
          ),
        );
      }
    }

    const existingProtiens: string[] = [];
    for (const r of state.data) {
      r.biomarkers_protein.forEach((protein) => {
        existingProtiens.push(protein.name ?? '');
      });
    }
    for (const data of state.compareData) {
      data.biomarkers_protein.forEach((protein) => {
        existingProtiens.push(protein.name ?? '');
      });
    }
    const allOmapProtiens = new Set();
    forkJoin(requests$).subscribe((allresults) => {
      allresults.map((res: ResponseData) => {
        for (const row of res.data) {
          row.biomarkers_protein.forEach((protein) => {
            allOmapProtiens.add(protein.name);
          });
        }
      });
      const filteredProtiens = new Set([...existingProtiens].filter((i) => allOmapProtiens.has(i))) ?? [];
      patchState({
        filteredProtiens: [...filteredProtiens],
      });
    });
  }

  @Action(UpdateSelectedOrgansBeforeFilter)
  updateOrgansBeforeFilter(
    { getState, patchState }: StateContext<SheetStateModel>,
    { organsList }: UpdateSelectedOrgansBeforeFilter,
  ) {
    patchState({
      ...getState(),
      selectedOrgansBeforeFilter: organsList,
    });
  }
}
