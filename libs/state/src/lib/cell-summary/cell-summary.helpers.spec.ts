import { Biomarker, CellSummary, Iri } from '@hra-ui/services';
import { computeAggregate, getColumnIndex, getRow } from './cell-summary.helpers';
import { CellSummaryAggregate, CellSummaryAggregateRow } from './cell-summary.model';

describe('Cell Summary Helpers', () => {
  const mockBiomarkers: Biomarker[] = [
    { id: 'biomarker1' as Iri, label: 'Biomarker 1' },
    { id: 'biomarker2' as Iri, label: 'Biomarker 2' },
  ];

  const mockCells = [
    { id: 'cell1' as Iri, label: 'Cell 1' },
    { id: 'cell2' as Iri, label: 'Cell 2' },
  ];

  const mockSummary: CellSummary = {
    label: 'Summary Label',
    cells: mockCells,
    biomarkers: mockBiomarkers,
    summaries: [
      {
        biomarker: 'Biomarker1' as Iri,
        cell: 'cell1' as Iri,
        meanExpression: 0.4,
        percentage: 50,
        count: 10,
      },
      {
        biomarker: 'Biomarker2' as Iri,
        cell: 'cell1' as Iri,
        meanExpression: 0.5,
        percentage: 30,
        count: 5,
      },
    ],
  };
  describe('getColumnIndex', () => {
    it('should return new index for the column for non-exisitng id', () => {
      const indexById = new Map<string, number>();
      const newIndex = getColumnIndex(indexById, '');

      expect(newIndex).toEqual(2);
    });
    it('should return exisitng index for the column for existing id', () => {
      const indexById = new Map<string, number>();
      indexById.set('Biomarker1', 4);

      const existingIndex = getColumnIndex(indexById, 'Biomarker1');
      expect(existingIndex).toEqual(4);
    });
  });

  describe('getRow', () => {
    it('should return new index for the row for non-exisiting id', () => {
      const rowById = new Map<string, CellSummaryAggregateRow>();
      const newRowIndex = getRow(rowById, '');

      expect(newRowIndex).toEqual(['', 0]);
    });
  });

  describe('computeAggregate', () => {
    it('should compute aggregate data correctly', () => {
      const result: CellSummaryAggregate = computeAggregate(mockSummary);
      expect(result.label).toEqual('Summary Label');
    });
  });
});
