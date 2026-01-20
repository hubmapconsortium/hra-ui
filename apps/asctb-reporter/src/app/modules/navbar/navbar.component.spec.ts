import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { NgxsModule, Store } from '@ngxs/store';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BehaviorSubject, of } from 'rxjs';
import { UpdateGetFromCache } from '../../actions/sheet.actions';
import { ToggleControlPane, ToggleDebugLogs } from '../../actions/ui.actions';
import { ConfigService } from '../../app-config.service';
import { SnackbarType } from '../../models/response.model';
import { SheetService } from '../../services/sheet/sheet.service';
import { SheetState, SheetStateModel } from '../../store/sheet.state';
import { UIState, UIStateModel } from '../../store/ui.state';
import { NavbarComponent } from './navbar.component';

const mockSheetState = {
  sheet: { name: 'kidney', display: 'Kidney', sheet: 'kidney-v1' } as any,
  version: 'v1.0',
} as unknown as SheetStateModel;

const mockUIState: UIStateModel = {
  rightSideNavOpen: false,
  controlPaneOpen: false,
  loading: false,
  loadingText: '',
  error: {},
  snackbar: { opened: false, text: '', type: SnackbarType.success },
  indentListOpen: false,
  reportOpen: false,
  debugLogOpen: false,
  bottomSheetOpen: false,
  compareOpen: false,
  searchOpen: false,
};

describe('NavbarComponent', () => {
  let store: jest.Mocked<Store>;
  let router: jest.Mocked<Router>;
  let dialog: jest.Mocked<MatDialog>;
  let configService: jest.Mocked<ConfigService>;
  let selectMap: Map<unknown, BehaviorSubject<any>>;
  let sheet$: BehaviorSubject<SheetStateModel>;
  let ui$: BehaviorSubject<UIStateModel>;
  let mode$: BehaviorSubject<string>;
  let selectedOrgans$: BehaviorSubject<string[]>;
  let omapSelectedOrgans$: BehaviorSubject<string[]>;

  beforeEach(() => {
    sheet$ = new BehaviorSubject<SheetStateModel>(mockSheetState);
    ui$ = new BehaviorSubject<UIStateModel>(mockUIState);
    mode$ = new BehaviorSubject<string>('vis');
    selectedOrgans$ = new BehaviorSubject<string[]>(['kidney-v1']);
    omapSelectedOrgans$ = new BehaviorSubject<string[]>([]);

    selectMap = new Map<unknown, BehaviorSubject<any>>([
      [SheetState, sheet$],
      [UIState, ui$],
      [SheetState.getMode, mode$],
      [SheetState.getSelectedOrgans, selectedOrgans$],
      [SheetState.getOMAPSelectedOrgans, omapSelectedOrgans$],
    ]);

    store = {
      dispatch: jest.fn().mockReturnValue(of({})),
      selectSignal: jest.fn().mockReturnValue(() => false),
      select: jest.fn((selector: unknown) => selectMap.get(selector) ?? of({})),
    } as unknown as jest.Mocked<Store>;

    router = {
      navigate: jest.fn().mockResolvedValue(true),
      events: of(new NavigationEnd(1, '/', '/')),
    } as unknown as jest.Mocked<Router>;
    dialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of({ organs: ['kidney-v1'], cache: true, omapOrgans: [] })),
      }),
    } as unknown as jest.Mocked<MatDialog>;

    configService = {
      sheetConfiguration$: of([{ display: 'Kidney', version: [{ value: 'kidney-v1', display: 'Kidney v1' }] } as any]),
      omapsheetConfiguration$: of([]),
      config$: of({
        version: [{ folder: 'v1.0', display: 'Version 1.0' }],
        moreOptions: [{ type: 'route', url: '/about', name: 'About' }],
        imgOptions: ['SVG'],
        playgroundSheetOptions: [],
        masterSheetLink: 'https://example.com',
      }),
    } as unknown as jest.Mocked<ConfigService>;
  });

  async function renderNavbar() {
    const user = userEvent.setup();
    const result = await render(NavbarComponent, {
      imports: [NgxsModule.forRoot([])],
      providers: [
        provideIcons(),
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
        { provide: ConfigService, useValue: configService },
        { provide: SheetService, useValue: {} },
      ],
      inputs: { cache: true },
    });
    return { ...result, user };
  }

  it('shows application title and dataset label', async () => {
    await renderNavbar();
    expect(screen.getByText(/ASCT\+B Reporter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Datasets/i)).toHaveValue('ASCT+B: Kidney');
  });

  it('dispatches ToggleControlPane when Show legend button is clicked', async () => {
    const { user } = await renderNavbar();
    const moreButton = screen
      .getAllByRole('button', { name: '' })
      .find((button) => button.getAttribute('hrafeature') === 'header-menu');
    if (!moreButton) {
      throw new Error('header menu button not found');
    }
    await user.click(moreButton);

    const legendItem = await screen.findByText(/Show legend & visualization controls/i);
    await user.click(legendItem);

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(ToggleControlPane));
  });

  it('opens organ selector dialog when datasets field is clicked', async () => {
    const { user } = await renderNavbar();
    await user.click(screen.getByLabelText(/Datasets/i));

    await waitFor(() => {
      expect(dialog.open).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateGetFromCache));
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  it('does not navigate when dialog returns false', async () => {
    dialog.open = jest.fn().mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of({ organs: false, cache: true, omapOrgans: [] })),
    }) as any;

    const { user } = await renderNavbar();
    await user.click(screen.getByLabelText(/Datasets/i));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateGetFromCache));
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('dispatches ToggleDebugLogs when Debug log menu item is clicked', async () => {
    const { user } = await renderNavbar();
    const menuButton = screen
      .getAllByRole('button', { name: '' })
      .find((button) => button.getAttribute('hrafeature') === 'header-menu');
    if (!menuButton) {
      throw new Error('header menu button not found');
    }
    await user.click(menuButton);

    const debugLogItem = await screen.findByText(/Debug log/i);
    await user.click(debugLogItem);

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(ToggleDebugLogs));
  });
});
