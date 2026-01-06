import { NgxsModule, Store } from '@ngxs/store';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
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
      inputs: {
        error,
        omaps: { organsOnly: false, proteinsOnly: false },
      },
    });

    return result;
  }

  beforeEach(() => jest.clearAllMocks());

  it('should render component with bimodal controls', async () => {
    await setup();

    const sortLabels = screen.getAllByText(/Sort/i);
    const sizeLabels = screen.getAllByText(/Size/i);

    expect(sortLabels.length).toBeGreaterThanOrEqual(2);
    expect(sizeLabels.length).toBeGreaterThanOrEqual(2);
    expect(mockStore.select).toHaveBeenCalled();
  });

  it('should change CT sort to Degree when the user selects it', async () => {
    await setup();
    const user = userEvent.setup();
    const ctSortSelect = screen.getAllByLabelText(/Sort/i)[0];

    await user.click(ctSortSelect);
    const degreeOption = await screen.findByRole('option', { name: /Degree/i });
    await user.click(degreeOption);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          CT: expect.objectContaining({ sort: 'Degree' }),
        }),
      }),
    );
  });

  it('should change BM type when selecting a biomarker type', async () => {
    await setup();
    const user = userEvent.setup();
    const typeSelect = screen.getByLabelText(/Biomarker type/i);

    await user.click(typeSelect);
    const proteinOption = await screen.findByRole('option', { name: /Protein/i });
    await user.click(proteinOption);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          BM: expect.objectContaining({ type: 'Protein' }),
        }),
      }),
    );
  });

  it('should emit updateConfig when the Organs only toggle is clicked', async () => {
    const { fixture } = await setup();
    const user = userEvent.setup();
    const component = fixture.componentInstance;
    const emitSpy = jest.spyOn(component.updateConfig, 'emit');

    const organsToggle = screen.getByRole('button', { name: /Organs only/i });
    await user.click(organsToggle);

    expect(emitSpy).toHaveBeenCalledWith({ organsOnly: true, proteinsOnly: false });
  });

  it('should emit updateConfig when the Proteins only toggle is clicked', async () => {
    const { fixture } = await setup();
    const user = userEvent.setup();
    const component = fixture.componentInstance;
    const emitSpy = jest.spyOn(component.updateConfig, 'emit');

    const proteinsToggle = screen.getByRole('button', { name: /Proteins only/i });
    await user.click(proteinsToggle);

    expect(emitSpy).toHaveBeenCalledWith({ organsOnly: false, proteinsOnly: true });
  });
});
