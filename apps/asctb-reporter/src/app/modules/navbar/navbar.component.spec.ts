import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { BehaviorSubject, of } from 'rxjs';
import { ClearSheetLogs } from '../../actions/logs.actions';
import { UpdateGetFromCache } from '../../actions/sheet.actions';
import { ToggleControlPane, ToggleDebugLogs } from '../../actions/ui.actions';
import { ConfigService } from '../../app-config.service';
import {
  PlaygroundSheetOptions,
  Sheet,
  SheetDetails,
  SheetOptions,
  Version,
  VersionDetail,
} from '../../models/sheet.model';
import { SheetService } from '../../services/sheet/sheet.service';
import { SheetStateModel } from '../../store/sheet.state';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let store: jest.Mocked<Store>;
  let router: jest.Mocked<Router>;
  let dialog: jest.Mocked<MatDialog>;
  let configService: jest.Mocked<ConfigService>;
  let sheet$: BehaviorSubject<SheetStateModel>;
  let mode$: BehaviorSubject<string>;
  let selectedOrgans$: BehaviorSubject<string[]>;
  let omapSelectedOrgans$: BehaviorSubject<string[]>;

  const mockVersions: Version[] = [
    { folder: 'v1.0', display: 'Version 1.0' },
    { folder: 'v1.1', display: 'Version 1.1' },
  ] as Version[];

  const mockSheetConfig: SheetDetails[] = [
    {
      display: 'Kidney',
      version: [{ value: 'kidney-v1', display: 'Kidney v1', viewValue: 'Kidney v1' } as VersionDetail],
    } as SheetDetails,
    {
      display: 'Liver',
      version: [{ value: 'liver-v1', display: 'Liver v1', viewValue: 'Liver v1' } as VersionDetail],
    } as SheetDetails,
  ];

  beforeEach(() => {
    sheet$ = new BehaviorSubject<SheetStateModel>({} as SheetStateModel);
    mode$ = new BehaviorSubject<string>('default');
    selectedOrgans$ = new BehaviorSubject<string[]>([]);
    omapSelectedOrgans$ = new BehaviorSubject<string[]>([]);

    store = {
      dispatch: jest.fn().mockReturnValue(of({})),
      selectSignal: jest.fn().mockReturnValue(() => false),
      select: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<Store>;
    router = { navigate: jest.fn().mockResolvedValue(true) } as unknown as jest.Mocked<Router>;
    dialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of({ organs: ['kidney-v1'], cache: true, omapOrgans: [] })),
      }),
    } as unknown as jest.Mocked<MatDialog>;

    configService = {
      sheetConfiguration$: of(mockSheetConfig),
      omapsheetConfiguration$: of([]),
      config$: of({
        version: mockVersions,
        moreOptions: [{ type: 'route', url: '/about', name: 'About' }],
        imgOptions: ['SVG', 'PNG'],
        playgroundSheetOptions: [],
        masterSheetLink: 'https://example.com/master',
      }),
    } as unknown as jest.Mocked<ConfigService>;

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [
        NavbarComponent,
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
        { provide: ConfigService, useValue: configService },
        { provide: SheetService, useValue: {} },
      ],
    });

    component = TestBed.inject(NavbarComponent);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should initialize sheet config from config service', () => {
      expect(component.sheetConfig).toEqual(mockSheetConfig);
      expect(component.versions).toEqual(mockVersions);
    });

    it('should handle sheet subscription with valid sheet', () => {
      const mockSheet = {
        name: 'kidney',
        display: 'Kidney',
        sheet: 'kidney-v1',
      } as unknown as Sheet;

      store.select = jest.fn().mockReturnValue(sheet$);
      sheet$.next({ sheet: mockSheet, version: 'v1.0' } as unknown as SheetStateModel);
      component.ngOnInit();

      expect(component.currentSheet).toEqual(mockSheet);
      expect(component.selectedSheetOption).toBe('Kidney');
      expect(component.selectedVersion).toBe('Version 1.0');
    });

    it('should skip sheet subscription when sheet is null', () => {
      store.select = jest.fn().mockReturnValue(sheet$);
      sheet$.next({ sheet: null } as unknown as SheetStateModel);
      component.ngOnInit();

      expect(component.currentSheet).toBeUndefined();
    });

    it('should handle mode subscription in default mode', () => {
      store.select = jest.fn().mockReturnValue(mode$);
      mode$.next('default');
      component.ngOnInit();

      expect(component.mode).toBe('default');
    });

    it('should handle mode subscription in playground mode', () => {
      const playgroundSheets: PlaygroundSheetOptions[] = [{ title: 'test', sheet: 'test-sheet' }];
      component.playgroundSheetOptions = playgroundSheets;
      store.select = jest.fn().mockReturnValue(mode$);

      mode$.next('playground');
      component.ngOnInit();

      expect(component.mode).toBe('playground');
      expect(component.sheetOptions).toEqual(playgroundSheets);
    });

    it('should handle selectedOrgans subscription', () => {
      store.select = jest.fn().mockReturnValue(selectedOrgans$);
      selectedOrgans$.next(['kidney-v1']);
      component.ngOnInit();

      expect(component.selectedOrgans).toEqual(['kidney-v1']);
      expect(component.selectedOrgansValues).toBe('Kidney');
    });

    it('should handle selectedOrgans subscription with multiple organs', () => {
      store.select = jest.fn().mockReturnValue(selectedOrgans$);
      selectedOrgans$.next(['kidney-v1', 'liver-v1']);
      component.ngOnInit();

      expect(component.selectedOrgans).toEqual(['kidney-v1', 'liver-v1']);
      expect(component.selectedOrgansValues).toBe('Kidney, Liver');
    });

    it('should handle omapSelectedOrgans subscription', () => {
      component.omapSheetConfig = mockSheetConfig;
      store.select = jest.fn().mockReturnValue(omapSelectedOrgans$);
      omapSelectedOrgans$.next(['kidney-v1']);
      component.ngOnInit();

      expect(component.omapSelectedOrgans).toEqual(['kidney-v1']);
      expect(component.omapSelectedOrgansValues).toBe('Kidney');
    });

    it('should handle omapSelectedOrgans subscription with long names', () => {
      component.omapSheetConfig = mockSheetConfig;
      store.select = jest.fn().mockReturnValue(omapSelectedOrgans$);
      const longOrgans = Array(20).fill('kidney-v1');
      omapSelectedOrgans$.next(longOrgans);
      component.ngOnInit();

      expect(component.omapSelectedOrgans).toEqual(longOrgans);
      expect(component.omapSelectedOrgansValues).toBe('20 organs selected');
    });
  });

  describe('selectedOrgansLabel', () => {
    it('should return ASCT+B label when only ASCT+B organs selected', () => {
      component.selectedOrgansValues = 'Kidney, Liver';
      component.omapSelectedOrgansValues = '';
      expect(component.selectedOrgansLabel).toBe('ASCT+B: Kidney, Liver');
    });

    it('should return OMAP label when only OMAP organs selected', () => {
      component.selectedOrgansValues = '';
      component.omapSelectedOrgansValues = 'Heart';
      expect(component.selectedOrgansLabel).toBe('OMAP: Heart');
    });

    it('should return combined label when both are selected', () => {
      component.selectedOrgansValues = 'Kidney';
      component.omapSelectedOrgansValues = 'Heart';
      expect(component.selectedOrgansLabel).toBe('ASCT+B: Kidney | OMAP: Heart');
    });

    it('should return count when label exceeds 35 characters', () => {
      component.selectedOrgansValues = 'Kidney,Liver,Heart,Lung,Brain,Spleen';
      component.omapSelectedOrgansValues = 'A,B';
      expect(component.selectedOrgansLabel).toBe('6 ASCT+B Tables, 2 OMAPs');
    });
  });

  describe('getSheetSelection', () => {
    it('should dispatch ClearSheetLogs and navigate', () => {
      component.sheetOptions = [{ title: 'Kidney', sheet: 'kidney-sheet', name: 'kidney' } as unknown as SheetOptions];
      component.getSheetSelection('kidney');

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(ClearSheetLogs));
      expect(router.navigate).toHaveBeenCalledWith(['/vis'], {
        queryParams: { sheet: 'kidney-sheet' },
        queryParamsHandling: 'merge',
      });
    });

    it('should handle missing sheet gracefully', () => {
      component.sheetOptions = [];
      component.getSheetSelection('nonexistent');

      expect(router.navigate).toHaveBeenCalledWith(['/vis'], {
        queryParams: { sheet: '' },
        queryParamsHandling: 'merge',
      });
    });
  });

  describe('getVersionSelection', () => {
    it('should navigate with selected version folder', () => {
      component.versions = mockVersions;
      component.getVersionSelection('Version 1.0');

      expect(router.navigate).toHaveBeenCalledWith(['/vis'], {
        queryParams: { version: 'v1.0' },
        queryParamsHandling: 'merge',
      });
    });
  });

  describe('actions', () => {
    it('should dispatch ToggleControlPane', () => {
      component.togglePane();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(ToggleControlPane));
    });

    it('should dispatch ToggleDebugLogs', () => {
      component.toggleDebugLogs();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(ToggleDebugLogs));
    });
  });

  describe('exportImage', () => {
    it('should emit export event with image type', () => {
      const emitSpy = jest.spyOn(component.export, 'emit');
      component.exportImage('SVG');
      expect(emitSpy).toHaveBeenCalledWith('SVG');
    });
  });

  describe('onOptionClick', () => {
    beforeEach(() => {
      component.window = { open: jest.fn() } as unknown as Window;
    });

    it('should navigate for route type', () => {
      component.onOptionClick('route', '/about');
      expect(router.navigate).toHaveBeenCalledWith(['/about']);
    });

    it('should open new tab for tab type', () => {
      component.onOptionClick('tab', 'https://example.com');
      expect(component.window.open).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('should open new tab for unknown type', () => {
      component.onOptionClick('unknown', 'https://example.com');
      expect(component.window.open).toHaveBeenCalledWith('https://example.com', '_blank');
    });
  });

  describe('openMasterDataTables', () => {
    it('should open master sheet link', () => {
      const mockOpen = jest.fn();
      Object.defineProperty(window, 'open', { value: mockOpen, writable: true });
      component.masterSheetLink = 'https://example.com/master';
      component.openMasterDataTables();
      expect(mockOpen).toHaveBeenCalledWith('https://example.com/master', '_blank');
    });
  });

  describe('refreshData', () => {
    it('should navigate with selected organs', () => {
      component.selectedOrgans = ['kidney-v1', 'liver-v1'];
      component.omapSelectedOrgans = ['heart-v1'];
      component.refreshData();

      expect(router.navigate).toHaveBeenCalledWith(['/vis'], {
        queryParams: {
          selectedOrgans: 'kidney-v1,liver-v1',
          playground: false,
          omapSelectedOrgans: 'heart-v1',
        },
      });
    });
  });

  describe('openSelectOrgansDialog', () => {
    it('should open dialog and navigate on close', async () => {
      component.selectedOrgans = ['kidney-v1'];
      component.cache = true;
      component.omapSelectedOrgans = [];

      component.openSelectOrgansDialog();

      expect(dialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateGetFromCache));
      expect(router.navigate).toHaveBeenCalledWith(['/vis'], {
        queryParams: {
          selectedOrgans: 'kidney-v1',
          playground: false,
          omapSelectedOrgans: '',
        },
        queryParamsHandling: 'merge',
      });
    });

    it('should not navigate when dialog returns false', () => {
      dialog.open = jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of({ organs: false, cache: true, omapOrgans: [] })),
      });

      component.openSelectOrgansDialog();

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateGetFromCache));
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
