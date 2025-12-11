import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { FetchSelectedOrganData, ToggleShowAllAS, UpdateConfig } from '../../actions/sheet.actions';
import { DiscrepencyId, DiscrepencyLabel, DuplicateId, UpdateOmapConfig } from '../../actions/tree.actions';
import { ConfigService } from '../../app-config.service';
import { Sheet, SheetConfig } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { BimodalService } from '../tree/bimodal.service';
import { VegaService } from '../tree/vega.service';
import { ControlPaneComponent } from './control-pane.component';

describe('ControlPaneComponent', () => {
  let component: ControlPaneComponent;
  let store: jest.Mocked<Store>;
  let vegaService: jest.Mocked<VegaService>;

  const mockConfig: SheetConfig = {
    width: 1000,
    height: 800,
    show_ontology: false,
    discrepencyLabel: false,
    discrepencyId: false,
    duplicateId: false,
  } as SheetConfig;

  const createMockStore = () =>
    ({
      dispatch: jest.fn().mockReturnValue(of({})),
      selectSnapshot: jest.fn().mockReturnValue([]),
      select: jest.fn().mockReturnValue(of({})),
    }) as unknown as jest.Mocked<Store>;

  beforeEach(() => {
    store = createMockStore();
    vegaService = { makeBimodal: jest.fn() } as unknown as jest.Mocked<VegaService>;

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [
        ControlPaneComponent,
        { provide: Store, useValue: store },
        { provide: BimodalService, useValue: { makeBimodalData: jest.fn() } },
        { provide: VegaService, useValue: vegaService },
        { provide: ConfigService, useValue: {} },
      ],
    });

    component = TestBed.inject(ControlPaneComponent);
    component.view = { signal: jest.fn().mockReturnThis(), runAsync: jest.fn() };
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('updateConfigInSheet', () => {
    it.each([
      ['width', 1200, () => expect(vegaService.makeBimodal).toHaveBeenCalled()],
      ['height', 900, () => expect(vegaService.makeBimodal).toHaveBeenCalled()],
      ['show-ontology', true, () => expect(component.view.signal).toHaveBeenCalledWith('show_ontology', true)],
    ])('should handle %s update', (property, value, assertion) => {
      component.updateConfigInSheet({ property, config: { ...mockConfig, [property.replace('-', '_')]: value } });
      assertion();
    });

    it('should handle bm-x and bm-y updates', () => {
      component.updateConfigInSheet({ property: 'bm-x', config: mockConfig });
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateConfig));
    });

    it('should handle show-as toggle', () => {
      store.selectSnapshot.mockImplementation((selector) =>
        selector.toString().includes('Sheet') ? ({} as Sheet) : [],
      );
      component.updateConfigInSheet({ property: 'show-as', config: mockConfig });
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(ToggleShowAllAS));
    });

    it.each([
      ['show-discrepency-label', DiscrepencyLabel],
      ['show-discrepency-id', DiscrepencyId],
      ['show-duplicate-id', DuplicateId],
    ])('should handle %s', (property, ActionClass) => {
      component.updateConfigInSheet({
        property,
        config: { ...mockConfig, [property.replace('show-', '').replace(/-/g, '')]: true },
      });
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(ActionClass));
    });
  });

  describe('showAllAS', () => {
    it('should dispatch ToggleShowAllAS action', () => {
      store.selectSnapshot.mockReturnValue({});
      component.showAllAS();
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(ToggleShowAllAS));
    });
  });

  describe('discrepency and duplicate handling', () => {
    const testCases = [
      ['makeBimodalWithDiscrepencyLabel', 'discrepencyLabel', DiscrepencyLabel],
      ['makeBimodalWithDiscrepencyId', 'discrepencyId', DiscrepencyId],
      ['makeDuplicateId', 'duplicateId', DuplicateId],
    ] as const;

    testCases.forEach(([method, configKey, ActionClass]) => {
      describe(method, () => {
        it(`should create ${configKey} when enabled`, () => {
          component.treeData = [
            { id: 1, ontologyId: 'UBERON:001', children: 1 } as TNode,
            { id: 2, ontologyId: 'UBERON:001', children: 1 } as TNode,
          ];
          component[method]({ ...mockConfig, [configKey]: true });
          expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateConfig));
          expect(store.dispatch).toHaveBeenCalledWith(expect.any(ActionClass));
        });

        it(`should clear ${configKey} when disabled`, () => {
          component[method]({ ...mockConfig, [configKey]: false });
          expect(store.dispatch).toHaveBeenCalledWith(expect.any(ActionClass));
        });
      });
    });
  });

  describe('updateBimodal', () => {
    it('should dispatch UpdateConfig action', () => {
      component.updateBimodal(mockConfig);
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateConfig));
    });
  });

  describe('updateOmapConfig', () => {
    it('should dispatch UpdateOmapConfig and FetchSelectedOrganData', () => {
      store.selectSnapshot.mockReturnValue({});
      component.updateOmapConfig({} as any);
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(UpdateOmapConfig));
      expect(store.dispatch).toHaveBeenCalledWith(expect.any(FetchSelectedOrganData));
    });
  });
});
