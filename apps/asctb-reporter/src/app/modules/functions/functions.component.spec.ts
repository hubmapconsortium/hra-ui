import { MatSelectChange } from '@angular/material/select';
import { NgxsModule, Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { UpdateBimodalConfig } from '../../actions/tree.actions';
import { BimodalConfig } from '../../models/bimodal.model';
import { SheetState } from '../../store/sheet.state';
import { TreeState } from '../../store/tree.state';
import { BimodalService } from '../tree/bimodal.service';
import { FunctionsComponent } from './functions.component';

describe('FunctionsComponent', () => {
  const mockBimodalConfig: BimodalConfig = {
    CT: { sort: 'Alphabetical', size: 'Medium' },
    BM: { sort: 'Alphabetical', size: 'Medium', type: 'All' },
  };

  const mockBimodalService = {
    makeBimodalData: jest.fn(),
  };

  const mockStore = {
    select: jest.fn(() => of(mockBimodalConfig)),
    dispatch: jest.fn().mockReturnValue(of({})),
    selectSnapshot: jest.fn((selector) => {
      if (selector === SheetState.getData) {
        return [{ id: 1 }];
      }
      if (selector === TreeState.getTreeData) {
        return [{ name: 'tree' }];
      }
      if (selector === TreeState.getBimodal) {
        return { config: mockBimodalConfig };
      }
      if (selector === SheetState.getSheetConfig) {
        return {};
      }
      if (selector === TreeState.getOmapConfig) {
        return {};
      }
      if (selector === SheetState.getFilteredProtiens) {
        return [];
      }
      return null;
    }),
  };

  async function setup(error = { hasError: false }) {
    const result = await render(FunctionsComponent, {
      imports: [NgxsModule.forRoot([])],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: BimodalService, useValue: mockBimodalService },
      ],
      componentInputs: {
        error,
        omaps: { organsOnly: false, proteinsOnly: false },
      },
    });

    return result.fixture.componentInstance;
  }

  beforeEach(() => jest.clearAllMocks());

  it('should create and initialize with bimodal config', async () => {
    const component = await setup();

    expect(component).toBeTruthy();
    expect(component.bimodalConfig).toEqual(mockBimodalConfig);
    expect(component.bmSizeOptions).toBeDefined();
    expect(component.sortOptions).toBeDefined();
  });

  it('should change options and update bimodal config', async () => {
    const component = await setup();
    const event = { value: 'Large' } as MatSelectChange;

    component.changeOptions('CT', 'size', event);

    expect(component.bimodalConfig.CT.size).toBe('Large');
    expect(mockStore.dispatch).toHaveBeenCalledWith(new UpdateBimodalConfig(component.bimodalConfig));
    expect(mockBimodalService.makeBimodalData).toHaveBeenCalled();
  });

  it('should handle OMAP toggle for organs and proteins', async () => {
    const component = await setup();
    const emitSpy = jest.spyOn(component.updateConfig, 'emit');

    component.handleOMAPOptionToggle({ organsOnly: true, proteinsOnly: false });
    expect(component.omaps.organsOnly).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith({ organsOnly: true, proteinsOnly: false });

    component.handleOMAPOptionToggle({ organsOnly: false, proteinsOnly: true });
    expect(component.omaps.proteinsOnly).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith({ organsOnly: false, proteinsOnly: true });
  });
});
