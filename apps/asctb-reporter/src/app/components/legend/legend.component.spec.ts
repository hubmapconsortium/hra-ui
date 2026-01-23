import { render, screen } from '@testing-library/angular';
import { Subject } from 'rxjs';
import { BimodalData, BMNode } from '../../models/bimodal.model';
import { Legend } from '../../models/legend.model';
import { CompareData } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { LegendService } from '../../services/legend/legend.service';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  class MockLegendService {
    private readonly subject = new Subject<Legend[]>();
    readonly legendData$ = this.subject.asObservable();
    makeLegendData = jest.fn((tree: TNode[], nodes: BMNode[], _compare?: CompareData[]) => {
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

  it('renders legend items when service emits data (view-driven)', async () => {
    const mockService = createMockService();

    await render(LegendComponent, {
      providers: [{ provide: LegendService, useValue: mockService }],
      componentProperties: { treeData: [], bimodalData: undefined, compareData: [] },
    });

    // trigger generation of legends via the mock
    mockService.makeLegendData(
      [{ color: '#E41A1C', isNew: false } as TNode],
      [{ type: 'BM', bType: 'gene' } as BMNode],
      [],
    );

    expect(await screen.findByText('Gene Biomarkers')).toBeTruthy();
  });

  it('calls makeLegendData when inputs have data', async () => {
    const mockService = createMockService();

    const { rerender } = await render(LegendComponent, {
      providers: [{ provide: LegendService, useValue: mockService }],
      componentProperties: { treeData: [], bimodalData: undefined, compareData: [] },
    });

    const treeData = [{ color: '#000', isNew: false } as TNode];
    const bimodalData = {
      nodes: [{ type: 'BM', bType: 'gene' } as BMNode],
      links: [],
      config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
    } as BimodalData;

    await rerender({ componentProperties: { treeData, bimodalData, compareData: [] } });

    expect(mockService.makeLegendData).toHaveBeenCalledWith(treeData, bimodalData.nodes, []);
  });

  it('does not call makeLegendData when inputs are empty', async () => {
    const mockService = createMockService();

    const { rerender } = await render(LegendComponent, {
      providers: [{ provide: LegendService, useValue: mockService }],
      componentProperties: { treeData: [], bimodalData: undefined, compareData: [] },
    });

    await rerender({
      componentProperties: {
        treeData: [],
        bimodalData: {
          nodes: [],
          links: [],
          config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
        } as BimodalData,
        compareData: [],
      },
    });

    expect(mockService.makeLegendData).not.toHaveBeenCalled();
  });
});
