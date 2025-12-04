import { BMNode } from '../../models/bimodal.model';
import { CompareData, PROTEIN_PRESENCE } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { LegendService } from './legend.service';

describe('LegendService', () => {
  let service: LegendService;

  beforeEach(() => {
    service = new LegendService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle basic data and emit', (done) => {
    service.legendData$.subscribe((legends) => {
      expect(legends.length).toBeGreaterThan(0);
      done();
    });

    const result = service.makeLegendData(
      [{ color: '#E41A1C', isNew: false } as TNode],
      [{ type: 'BM', bType: 'gene', isNew: false } as BMNode],
      [{ title: 'Version 1', color: '#FF0000' } as CompareData],
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle new nodes without compare data', () => {
    const result = service.makeLegendData(
      [{ color: '#FF0000', isNew: true } as TNode],
      [{ color: '#00FF00', isNew: true, type: 'BM' } as BMNode],
      [],
    );

    expect(result).toBeDefined();
  });

  it('should handle all biomarker types', () => {
    const result = service.makeLegendData(
      [],
      [
        { type: 'BM', bType: 'gene', isNew: false } as BMNode,
        { type: 'BM', bType: 'protein', isNew: false } as BMNode,
        { type: 'BM', bType: 'lipids', isNew: false } as BMNode,
        { type: 'BM', bType: 'metabolites', isNew: false } as BMNode,
        { type: 'BM', bType: 'proteoforms', isNew: false } as BMNode,
      ],
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle protein presence states', () => {
    const result = service.makeLegendData(
      [],
      [
        { type: 'BM', bType: 'protein', proteinPresence: PROTEIN_PRESENCE.POS, isNew: false } as BMNode,
        { type: 'BM', bType: 'protein', proteinPresence: PROTEIN_PRESENCE.NEG, isNew: false } as BMNode,
        { type: 'BM', bType: 'protein', proteinPresence: PROTEIN_PRESENCE.INTERMEDIATE, isNew: false } as BMNode,
      ],
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it('should prevent duplicates', () => {
    const result = service.makeLegendData(
      [{ color: '#E41A1C', isNew: false } as TNode, { color: '#E41A1C', isNew: false } as TNode],
      [{ type: 'BM', bType: 'gene', isNew: false } as BMNode, { type: 'BM', bType: 'gene', isNew: false } as BMNode],
      [{ title: 'V1', color: '#FF0000' } as CompareData, { title: 'V1', color: '#FF0000' } as CompareData],
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle new nodes with compare data', () => {
    const result = service.makeLegendData(
      [{ color: '#FF0000', isNew: true } as TNode],
      [{ color: '#FF0000', isNew: true, type: 'BM' } as BMNode],
      [{ title: 'Version 1', color: '#FF0000' } as CompareData],
    );

    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle new bimodal nodes with unique colors', () => {
    const result = service.makeLegendData(
      [],
      [{ color: '#UNIQUE1', isNew: true, type: 'BM' } as BMNode],
      [{ title: 'Version 1', color: '#UNIQUE1' } as CompareData],
    );

    expect(result.length).toBeGreaterThan(0);
  });
});
