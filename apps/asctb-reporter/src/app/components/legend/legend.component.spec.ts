import { render, screen } from '@testing-library/angular';
import { Subject } from 'rxjs';
import { BimodalData, BMNode } from '../../models/bimodal.model';
import { Legend } from '../../models/legend.model';
import { Error } from '../../models/response.model';
import { CompareData } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { LegendService } from '../../services/legend/legend.service';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  const mockError: Error = { hasError: false, msg: '' };

  class MockLegendService {
    private readonly subject = new Subject<Legend[]>();
    readonly legendData$ = this.subject.asObservable();
    makeLegendData = jest.fn((tree: TNode[], nodes: BMNode[]) => {
      // simple fake that constructs Legend items from BM nodes
      const legends = nodes.map(
        (n, i) =>
          ({
            name: n.bType === 'gene' ? 'Gene Biomarkers' : n.bType,
            color: '#000',
            style: '',
            sortOrder: i,
            bmType: n.bType,
          }) as unknown as Legend,
      );
      this.subject.next(legends);
    });
    emit(data: Legend[]) {
      this.subject.next(data);
    }
  }

  const createMockService = () => new MockLegendService();
  const emptyBimodalData = {
    nodes: [],
    links: [],
    config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
  } as BimodalData;

  const setup = async (
    inputs: Partial<{
      treeData: TNode[];
      bimodalData: BimodalData;
      compareData: CompareData[];
      error: Error;
    }> = {},
  ) => {
    const mockService = createMockService();

    const renderResult = await render(LegendComponent, {
      inputs: {
        treeData: [],
        bimodalData: emptyBimodalData,
        compareData: [],
        error: mockError,
        ...inputs,
      },
      providers: [{ provide: LegendService, useValue: mockService }],
    });

    return { ...renderResult, mockService };
  };

  it('renders legend items when service emits data (view-driven)', async () => {
    const { mockService } = await setup();

    // trigger generation of legends via the mock
    mockService.makeLegendData(
      [{ color: '#E41A1C', isNew: false } as TNode],
      [{ type: 'BM', bType: 'gene' } as BMNode],
    );

    expect(await screen.findByText('Gene Biomarkers')).toBeTruthy();
  });

  it('calls makeLegendData when inputs have data', async () => {
    const { rerender, mockService } = await setup();

    const treeData = [{ color: '#000', isNew: false } as TNode];
    const bimodalData = {
      nodes: [{ type: 'BM', bType: 'gene' } as BMNode],
      links: [],
      config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
    } as BimodalData;

    await rerender({ inputs: { treeData, bimodalData, compareData: [], error: mockError } });

    expect(mockService.makeLegendData).toHaveBeenCalledWith(treeData, bimodalData.nodes, []);
  });

  it('does not call makeLegendData when inputs are empty', async () => {
    const { rerender, mockService } = await setup();

    await rerender({
      inputs: {
        treeData: [],
        bimodalData: emptyBimodalData,
        compareData: [],
        error: mockError,
      },
    });

    expect(mockService.makeLegendData).not.toHaveBeenCalled();
  });
});
