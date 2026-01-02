import { render, screen } from '@testing-library/angular';
import { Subject } from 'rxjs';
import { BimodalData, BMNode } from '../../models/bimodal.model';
import { Legend } from '../../models/legend.model';
import { TNode } from '../../models/tree.model';
import { LegendService } from '../../services/legend/legend.service';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  class MockLegendService {
    private readonly subject = new Subject<Legend[]>();
    readonly legendData$ = this.subject.asObservable();
    makeLegendData = jest.fn(() => undefined);
    emit(data: Legend[]) {
      this.subject.next(data);
    }
  }

  const createMockService = () => new MockLegendService();

  it('renders legend items when service emits data', async () => {
    const renderResult = await render(LegendComponent);
    const legendService = renderResult.fixture.debugElement.injector.get(LegendService);

    legendService.makeLegendData(
      [{ color: '#E41A1C', isNew: false } as TNode],
      [{ type: 'BM', bType: 'gene' } as BMNode],
      [],
    );

    expect(await screen.findByText('Gene Biomarkers')).toBeTruthy();
  });

  it('calls makeLegendData when inputs have data', async () => {
    const renderResult = await render(LegendComponent, {
      componentProperties: { treeData: [], bimodalData: undefined, compareData: [] },
    });

    const legendService = renderResult.fixture.debugElement.injector.get(LegendService);
    const spy = jest.spyOn(legendService, 'makeLegendData');

    const treeData = [{ color: '#000', isNew: false } as TNode];
    const bimodalData = {
      nodes: [{ type: 'BM', bType: 'gene' } as BMNode],
      links: [],
      config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
    } as BimodalData;

    await renderResult.rerender({ componentProperties: { treeData, bimodalData, compareData: [] } });

    expect(spy).toHaveBeenCalledWith(treeData, bimodalData.nodes, []);
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
