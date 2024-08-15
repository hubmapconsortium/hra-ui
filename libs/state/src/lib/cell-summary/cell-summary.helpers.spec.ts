import { CellSummary, Iri, SourceReference } from '@hra-ui/services';
import { produce } from 'immer';
import { combineSummariesByBiomarkerType, computeAggregate, filterSummaries } from './cell-summary.helpers';

const source1: SourceReference = {
  id: 'source1' as Iri,
  label: '',
  link: '',
  title: '',
  year: 2000,
  authors: [],
  doi: '',
};
const source2 = produce(source1, (draft) => {
  draft.id = 'source2' as Iri;
});

const geneBiomarker = 'gene';
const cell1 = 'cell1' as Iri;
const cell2 = 'cell2' as Iri;
const gene1 = 'gene1' as Iri;
const ensembleId1 = 'ensemble1';

const summary1: CellSummary = {
  biomarker_type: geneBiomarker,
  cell_source: source1.id,
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
  cell_source: source2.id,
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
      ],
    },
  ],
};

const summaries = [summary1, summary2];

describe('Cell Summary Helpers', () => {
  describe('filterSummaries(summaries, sources)', () => {
    it('returns summaries with the specified sources', () => {
      const result = filterSummaries(summaries, [source1]);
      expect(result).toEqual([summary1]);
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
  });

  describe('computeAggregate(summary)', () => {
    it('creates aggregate data for display in a table', () => {
      const [summary] = combineSummariesByBiomarkerType(summaries, [geneBiomarker]);
      const { rows, columns } = computeAggregate(summary);
      expect(columns).toEqual([`${gene1} [${ensembleId1}]`]);
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
  });
});
