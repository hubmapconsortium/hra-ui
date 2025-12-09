import { Row } from '../../models/sheet.model';
import { AS_RED, B_GREEN, CT_BLUE } from '../../models/tree.model';
import { makeAS, makeBioMarkers, makeCellTypes } from './tree.functions';

describe('Tree Functions', () => {
  const mockRow = {
    anatomical_structures: [
      { name: 'Body', id: 'UBERON:0000001' },
      { name: 'Heart', id: 'UBERON:0000948', rdfs_label: 'heart', notes: 'Heart notes' },
    ],
    cell_types: [{ name: 'Cell Type 1', id: 'CL:0000001', rdfs_label: 'cell type 1', notes: 'CT notes' }],
    biomarkers: [{ name: 'Marker 1', id: 'HGNC:1', b_type: 'gene', proteinPresence: 'positive' }],
    biomarkers_gene: [{ name: 'Gene 1', id: 'HGNC:1', b_type: 'gene' }],
    biomarkers_protein: [{ name: 'Protein 1', id: 'HGNC:2', b_type: 'protein' }],
    biomarkers_lipids: [],
    biomarkers_meta: [],
    biomarkers_prot: [],
    references: ['ref1'],
    organName: 'Heart',
  } as unknown as Row;

  describe('makeAS', () => {
    it('should process and create AS with correct properties and degrees', () => {
      const result = makeAS([mockRow]);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        structure: 'Heart',
        uberon: 'UBERON:0000948',
        color: AS_RED,
        organName: 'Heart',
        notes: 'Heart notes',
        label: 'heart',
      });
      expect(result[0].outdegree?.size).toBe(1);
      expect(result[0].indegree?.size).toBe(1);
    });

    it.each([
      [
        'rows without cell types',
        { ...mockRow, cell_types: [], anatomical_structures: [{ name: 'Test AS', id: 'UBERON:9999' }] },
        (r: ReturnType<typeof makeAS>) => expect(r[0].outdegree?.size).toBe(0),
      ],
      [
        'first AS with no indegree',
        { ...mockRow, anatomical_structures: [{ name: 'First AS', id: 'UBERON:1111' }] },
        (r: ReturnType<typeof makeAS>) => expect(r[0].indegree?.size).toBe(0),
      ],
      [
        'Body in report mode',
        mockRow,
        (r: ReturnType<typeof makeAS>) => {
          expect(r).toHaveLength(1);
          expect(r[0].structure).toBe('Heart');
        },
        true,
      ],
      ['report not organ-wise flag', mockRow, (r: ReturnType<typeof makeAS>) => expect(r).toHaveLength(1), true, true],
    ])('should handle %s', (_desc, row, assertion, isForReport = false, isReportNotOrganWise = false) => {
      const result = makeAS([row as unknown as Row], isForReport, isReportNotOrganWise);
      assertion(result);
    });

    it('should handle duplicates and accumulate degrees', () => {
      const result = makeAS([mockRow, mockRow]);
      expect(result).toHaveLength(1);
      expect(result[0].outdegree?.size).toBeGreaterThanOrEqual(1);
    });

    it('should preserve isNew property and custom color', () => {
      const newRow = {
        ...mockRow,
        anatomical_structures: [{ name: 'New AS', id: 'UBERON:9999', isNew: true, color: '#FF0000' }],
      } as unknown as Row;
      const result = makeAS([newRow]);
      expect(result[0]).toMatchObject({ isNew: true, color: '#FF0000' });
    });

    it('should handle structures without id and different organs in report mode', () => {
      const rowWithoutId = {
        ...mockRow,
        anatomical_structures: [{ name: 'No ID Structure', id: 'not found' }],
      } as unknown as Row;
      expect(makeAS([rowWithoutId, rowWithoutId], true)).toHaveLength(1);

      const row1 = { ...mockRow, organName: 'Heart' } as unknown as Row;
      const row2 = { ...mockRow, organName: 'Lung' } as unknown as Row;
      expect(makeAS([row1, row2], true, false)).toHaveLength(2);
    });

    it('should throw error on invalid input', () => {
      expect(() => makeAS(null as unknown as Row[])).toThrow('Could not process Anatomical Structures');
    });
  });

  describe('makeCellTypes', () => {
    it('should process and create CT with correct properties and degrees', () => {
      const result = makeCellTypes([mockRow]);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        structure: 'Cell Type 1',
        link: 'CL:0000001',
        color: CT_BLUE,
        organName: 'Heart',
        notes: 'CT notes',
        label: 'cell type 1',
        references: ['ref1'],
      });
      expect(result[0].outdegree?.size).toBe(1);
      expect(result[0].indegree?.size).toBe(1);
    });

    it.each([
      [
        'rows without AS',
        { ...mockRow, anatomical_structures: [] },
        (r: { indegree?: Set<unknown> }) => r.indegree?.size === 0,
      ],
      [
        'rows without biomarkers',
        { ...mockRow, biomarkers: [] },
        (r: { outdegree?: Set<unknown> }) => r.outdegree?.size === 0,
      ],
    ])('should handle %s', (_desc, row, check) => {
      const result = makeCellTypes([row as unknown as Row]);
      expect(check(result[0])).toBe(true);
    });

    it('should handle report flags and duplicates', () => {
      expect(makeCellTypes([mockRow], true, true)).toHaveLength(1);

      const result = makeCellTypes([mockRow, mockRow]);
      expect(result).toHaveLength(1);
      expect(result[0].outdegree?.size).toBeGreaterThanOrEqual(1);
    });

    it('should preserve isNew property and update pathColor for duplicates', () => {
      const newRow = {
        ...mockRow,
        cell_types: [{ name: 'New CT', id: 'CL:9999', isNew: true, color: '#0000FF' }],
      } as unknown as Row;
      expect(makeCellTypes([newRow])[0]).toMatchObject({ isNew: true, color: '#0000FF' });

      const row2 = {
        ...mockRow,
        cell_types: [{ name: 'Cell Type 1', id: 'CL:0000001', isNew: true, color: '#123456' }],
      } as unknown as Row;
      expect(makeCellTypes([mockRow, row2])[0].color).toBe('#123456');
    });

    it('should handle structures without id and different organs in report mode', () => {
      const rowWithoutId = {
        ...mockRow,
        cell_types: [{ name: 'No ID Cell Type', id: 'not found' }],
      } as unknown as Row;
      expect(makeCellTypes([rowWithoutId, rowWithoutId], true)).toHaveLength(1);

      const row1 = { ...mockRow, organName: 'Heart' } as unknown as Row;
      const row2 = { ...mockRow, organName: 'Lung' } as unknown as Row;
      expect(makeCellTypes([row1, row2], true, false)).toHaveLength(2);
    });

    it('should throw error on invalid input', () => {
      expect(() => makeCellTypes(null as unknown as Row[])).toThrow('Could not process Cell Types');
    });
  });

  describe('makeBioMarkers', () => {
    it('should process and create biomarker with correct properties', () => {
      const result = makeBioMarkers([mockRow]);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        structure: 'Marker 1',
        link: 'HGNC:1',
        color: B_GREEN,
        bType: 'gene',
        organName: 'Heart',
        proteinPresence: 'positive',
      });
      expect(result[0].indegree?.size).toBe(1);
    });

    it('should handle rows without cell types', () => {
      const result = makeBioMarkers([{ ...mockRow, cell_types: [] } as unknown as Row]);
      expect(result[0].indegree?.size).toBe(0);
    });

    it.each([
      ['All', 1],
      ['Gene', 1],
      ['Protein', 1],
      ['Lipids', 0],
      ['Metabolites', 0],
      ['Proteoforms', 0],
    ])('should filter by type %s', (type, expectedLength) => {
      expect(makeBioMarkers([mockRow], type)).toHaveLength(expectedLength);
    });

    it('should handle report flags and duplicates', () => {
      expect(makeBioMarkers([mockRow], 'All', true, true)).toHaveLength(1);
      expect(makeBioMarkers([mockRow, mockRow])).toHaveLength(1);
    });

    it('should preserve isNew property and update pathColor for duplicates', () => {
      const newRow = {
        ...mockRow,
        biomarkers: [{ name: 'New BM', id: 'HGNC:9999', isNew: true, color: '#00FF00', b_type: 'gene' }],
      } as unknown as Row;
      expect(makeBioMarkers([newRow])[0]).toMatchObject({ isNew: true, color: '#00FF00' });

      const row2 = {
        ...mockRow,
        biomarkers: [{ name: 'Marker 1', id: 'HGNC:1', isNew: true, color: '#ABCDEF', b_type: 'gene' }],
      } as unknown as Row;
      expect(makeBioMarkers([mockRow, row2])[0].color).toBe('#ABCDEF');
    });

    it('should handle structures without id and distinguish by b_type', () => {
      const rowWithoutId = {
        ...mockRow,
        biomarkers: [{ name: 'No ID Marker', id: 'not found', b_type: 'gene' }],
      } as unknown as Row;
      expect(makeBioMarkers([rowWithoutId, rowWithoutId])).toHaveLength(1);
      expect(makeBioMarkers([rowWithoutId, rowWithoutId], undefined, true)).toHaveLength(1);

      const rowWithMultipleTypes = {
        ...mockRow,
        biomarkers: [
          { name: 'Same Name', id: 'HGNC:1', b_type: 'gene' },
          { name: 'Same Name', id: 'HGNC:1', b_type: 'protein' },
        ],
      } as unknown as Row;
      expect(makeBioMarkers([rowWithMultipleTypes])).toHaveLength(2);
    });

    it('should handle different organs in report mode', () => {
      const row1 = { ...mockRow, organName: 'Heart' } as unknown as Row;
      const row2 = { ...mockRow, organName: 'Lung' } as unknown as Row;
      expect(makeBioMarkers([row1, row2], undefined, true, false)).toHaveLength(2);
    });

    it('should throw error on invalid input', () => {
      expect(() => makeBioMarkers(null as unknown as Row[])).toThrow('Could not process Biomarkers');
    });
  });
});
