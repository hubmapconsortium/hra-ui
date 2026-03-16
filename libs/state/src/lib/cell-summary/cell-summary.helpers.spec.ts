import { CellSummary, Iri, SourceReference } from '@hra-ui/services';
import { produce } from 'immer';
import { combineSummariesByBiomarkerType, computeAggregate, filterSummaries } from './cell-summary.helpers';
import { CellSummaryAggregateCell } from './cell-summary.model';

const source1: SourceReference = {
  title: 'test',
  doi: 'test',
  year: 2000,
  datasetTitle: 'test',
  datasetId: 'source1',
  cellType: 'test',
  healthStatus: 'test',
  sex: 'test',
  age: 'test',
  bmi: 'test',
  ethnicity: 'test',
};
const source2 = produce(source1, (draft) => {
  draft.datasetId = 'source2' as Iri;
});

const geneBiomarker = 'gene';
const cell1 = 'cell1' as Iri;
const cell2 = 'cell2' as Iri;
const gene1 = 'gene1' as Iri;
const gene2 = 'gene1' as Iri;
const ensembleId1 = 'ensemble1';
const ensembleId2 = 'ensemble2';

const summary1: CellSummary = {
  biomarker_type: geneBiomarker,
  cell_source: source1.datasetId as Iri,
  summary: [
    {
      cell_id: cell1,
      cell_label: cell1,
      count: 75,
      percentage: 0.75,
      genes: [
        {
          gene_id: gene1,
          gene_label: gene1,
          ensemble_id: ensembleId1,
          mean_expression: 0.2,
        },
      ],
    },
  ],
};

const summary2: CellSummary = {
  biomarker_type: geneBiomarker,
  cell_source: source2.datasetId as Iri,
  summary: [
    {
      cell_id: cell2,
      cell_label: cell2,
      count: 25,
      percentage: 0.25,
      genes: [
        {
          gene_id: gene1,
          gene_label: gene1,
          ensemble_id: ensembleId1,
          mean_expression: 0.6,
        },
        {
          gene_id: gene2,
          gene_label: gene2,
          ensemble_id: ensembleId2,
          mean_expression: 0.8,
        },
      ],
    },
  ],
};

const summaries = [summary1, summary2];

const summary3: CellSummary = {
  biomarker_type: 'protein',
  cell_source: source1.datasetId as Iri,
  summary: [
    {
      cell_id: cell1,
      cell_label: cell1,
      count: 50,
      percentage: 0.5,
      genes: [
        {
          gene_id: gene1,
          gene_label: gene1,
          ensemble_id: ensembleId1,
          mean_expression: 0.4,
        },
      ],
    },
  ],
};

const summaryWithMultipleGenes: CellSummary = {
  biomarker_type: geneBiomarker,
  cell_source: source1.datasetId as Iri,
  summary: [
    {
      cell_id: cell1,
      cell_label: cell1,
      count: 100,
      percentage: 1.0,
      genes: [
        {
          gene_id: gene1,
          gene_label: gene1,
          ensemble_id: ensembleId1,
          mean_expression: 0.5,
        },
        {
          gene_id: gene2,
          gene_label: gene2,
          ensemble_id: ensembleId2,
          mean_expression: 0.7,
        },
      ],
    },
    {
      cell_id: cell2,
      cell_label: cell2,
      count: 50,
      percentage: 0.5,
      genes: [
        {
          gene_id: gene2,
          gene_label: gene2,
          ensemble_id: ensembleId2,
          mean_expression: 0.9,
        },
      ],
    },
  ],
};

const summaryWithReverseOrder: CellSummary = {
  biomarker_type: geneBiomarker,
  cell_source: source1.datasetId as Iri,
  summary: [
    {
      cell_id: cell1,
      cell_label: cell1,
      count: 75,
      percentage: 0.75,
      genes: [
        {
          gene_id: gene2,
          gene_label: gene2,
          ensemble_id: ensembleId2,
          mean_expression: 0.6,
        },
        {
          gene_id: gene1,
          gene_label: gene1,
          ensemble_id: ensembleId1,
          mean_expression: 0.4,
        },
      ],
    },
  ],
};

describe('Cell Summary Helpers', () => {
  describe('filterSummaries(summaries, sources)', () => {
    it('returns summaries with the specified sources', () => {
      const result = filterSummaries(summaries, [source1]);
      expect(result).toEqual([summary1]);
    });

    it('returns summaries with multiple sources', () => {
      const result = filterSummaries(summaries, [source1, source2]);
      expect(result).toEqual([summary1, summary2]);
    });

    it('returns empty array when no sources match', () => {
      const result = filterSummaries(summaries, []);
      expect(result).toEqual([]);
    });

    it('returns empty array when no summaries match the sources', () => {
      const nonExistentSource: SourceReference = {
        ...source1,
        datasetId: 'nonexistent' as Iri,
      };
      const result = filterSummaries(summaries, [nonExistentSource]);
      expect(result).toEqual([]);
    });
  });

  describe('combineSummariesByBiomarkerType(summaries, types)', () => {
    it('combines summaries for each biomarker type', () => {
      const result = combineSummariesByBiomarkerType(summaries, [geneBiomarker]);
      expect(result).toEqual([
        {
          cell_source: `Aggregated by ${geneBiomarker}`,
          biomarker_type: geneBiomarker,
          summary: [...summary1.summary, ...summary2.summary],
        },
      ]);
    });

    it('combines summaries for multiple biomarker types', () => {
      const allSummaries = [summary1, summary2, summary3];
      const result = combineSummariesByBiomarkerType(allSummaries, [geneBiomarker, 'protein']);
      expect(result).toHaveLength(2);
      expect(result[0].biomarker_type).toBe(geneBiomarker);
      expect(result[1].biomarker_type).toBe('protein');
      expect(result[0].summary).toEqual([...summary1.summary, ...summary2.summary]);
      expect(result[1].summary).toEqual(summary3.summary);
    });

    it('returns empty items for non-existent biomarker types', () => {
      const result = combineSummariesByBiomarkerType(summaries, [geneBiomarker, 'nonexistent']);
      expect(result).toHaveLength(2);
      expect(result[0].summary).toEqual([...summary1.summary, ...summary2.summary]);
      expect(result[1].summary).toEqual([]);
      expect(result[1].biomarker_type).toBe('nonexistent');
    });

    it('handles empty summaries array', () => {
      const result = combineSummariesByBiomarkerType([], [geneBiomarker]);
      expect(result).toEqual([
        {
          cell_source: `Aggregated by ${geneBiomarker}`,
          biomarker_type: geneBiomarker,
          summary: [],
        },
      ]);
    });
  });

  describe('computeAggregate(summary)', () => {
    it('creates aggregate data for display in a table', () => {
      const [summary] = combineSummariesByBiomarkerType(summaries, [geneBiomarker]);
      const { rows, columns } = computeAggregate(summary);
      expect(columns).toEqual([`${gene1} [${ensembleId1}]`, `${gene2} [${ensembleId2}]`]);
      expect(rows.length).toBe(2);

      const [row1] = rows;
      const [entry] = summary1.summary;
      const [gene] = entry.genes;
      expect(row1).toEqual([
        cell1,
        entry.count,
        {
          color: gene.mean_expression,
          size: entry.percentage,
          data: {
            cell: entry.cell_id,
            biomarker: gene.gene_id,
            count: entry.count,
            meanExpression: gene.mean_expression,
            percentage: entry.percentage,
            dataset_count: 1,
          },
        },
      ]);
    });

    it('handles genes appearing in only some cells', () => {
      const { rows, columns } = computeAggregate(summaryWithMultipleGenes);
      const [row1, row2] = rows;

      expect(columns).toEqual([`${gene1} [${ensembleId1}]`, `${gene2} [${ensembleId2}]`]);
      expect(rows.length).toBe(2);
      expect(row1[0]).toBe(cell1);
      expect(row1[1]).toBe(100);
      expect(row2[0]).toBe(cell2);
      expect(row2[1]).toBe(50);
      expect(row2[2]).toBeUndefined();
      expect(row2[3]).toBeDefined();
    });

    it('correctly calculates cumulative mean expression for repeated genes', () => {
      const { rows } = computeAggregate(summaryWithMultipleGenes);
      const row2Gene2Entry = rows[1][3] as CellSummaryAggregateCell;

      expect(row2Gene2Entry.data.dataset_count).toBe(1);
      expect(row2Gene2Entry.data.meanExpression).toBeCloseTo(0.9);
    });

    it('handles reverse column order and maintains sorted output', () => {
      const { columns, rows } = computeAggregate(summaryWithReverseOrder);
      const [row] = rows;

      expect(columns).toEqual([`${gene1} [${ensembleId1}]`, `${gene2} [${ensembleId2}]`]);
      expect(rows.length).toBe(1);
      expect(row[0]).toBe(cell1);
      expect(row[2]).toBeDefined();
      expect(row[3]).toBeDefined();
    });

    it('calculates correct percentages based on total count', () => {
      const { rows } = computeAggregate(summaryWithMultipleGenes);
      const totalCount = rows.reduce((sum, row) => sum + (row[1] as number), 0);

      for (const row of rows) {
        for (let i = 2; i < row.length; i++) {
          if (row[i] && typeof row[i] === 'object') {
            const entry = row[i] as CellSummaryAggregateCell;
            expect(entry.size).toBe(entry.data.count / totalCount);
            expect(entry.data.percentage).toBe(entry.data.count / totalCount);
          }
        }
      }
    });

    it('handles summary with no genes', () => {
      const emptyGeneSummary: CellSummary = {
        biomarker_type: geneBiomarker,
        cell_source: source1.datasetId as Iri,
        summary: [
          {
            cell_id: cell1,
            cell_label: cell1,
            count: 100,
            percentage: 1.0,
            genes: [],
          },
        ],
      };

      const { rows, columns } = computeAggregate(emptyGeneSummary);
      expect(columns).toEqual([]);
      expect(rows).toEqual([[cell1, 100]]);
    });

    it('includes correct label with biomarker type', () => {
      const aggregate = computeAggregate(summary1);
      expect(aggregate.label).toBe('Gene Biomarkers');
    });

    it('capitalizes biomarker type in label', () => {
      const result = combineSummariesByBiomarkerType([summary3], ['protein']);
      const aggregate = computeAggregate(result[0]);
      expect(aggregate.label).toBe('Protein Biomarkers');
    });
  });
});
