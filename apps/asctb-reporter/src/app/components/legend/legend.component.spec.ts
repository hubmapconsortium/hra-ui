import { render, RenderResult } from '@testing-library/angular';
import { BimodalData, BMNode } from '../../models/bimodal.model';
import { TNode } from '../../models/tree.model';
import { LegendService } from '../../services/legend/legend.service';
import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  let renderResult: RenderResult<LegendComponent>;
  let component: LegendComponent;
  let legendService: LegendService;

  beforeEach(async () => {
    renderResult = await render(LegendComponent, {
      providers: [LegendService],
    });
    component = renderResult.fixture.componentInstance;
    legendService = renderResult.fixture.debugElement.injector.get(LegendService);
  });

  it('should subscribe to legend data on init', (done) => {
    component.ngOnInit();

    // Trigger the service to emit data
    legendService.makeLegendData(
      [{ color: '#E41A1C', isNew: false } as TNode],
      [{ type: 'BM', bType: 'gene', isNew: false } as BMNode],
      [],
    );

    setTimeout(() => {
      expect(component.legends.length).toBeGreaterThan(0);
      done();
    }, 10);
  });

  it('should call makeLegendData on changes when data exists', () => {
    const spy = jest.spyOn(legendService, 'makeLegendData');

    component.treeData = [{ color: '#000', isNew: false } as TNode];
    component.bimodalData = {
      nodes: [{ type: 'BM', bType: 'gene' } as BMNode],
      links: [],
      config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
    } as BimodalData;
    component.compareData = [];

    component.ngOnChanges();

    expect(spy).toHaveBeenCalledWith(component.treeData, component.bimodalData.nodes, component.compareData);
  });

  it('should not call makeLegendData when no data', () => {
    const spy = jest.spyOn(legendService, 'makeLegendData');

    component.treeData = [];
    component.bimodalData = {
      nodes: [],
      links: [],
      config: { CT: { sort: '', size: '' }, BM: { sort: '', size: '', type: '' } },
    } as BimodalData;

    component.ngOnChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});
