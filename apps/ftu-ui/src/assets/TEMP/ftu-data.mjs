import { readFileSync, writeFileSync } from 'fs';
import Papa from 'papaparse';

/** API Endpoint that fetches FTU dataset metadata */
const FTU_DATASET_METADATA_API = 'http://grlc.io/api-git/hubmapconsortium/ccf-grlc/subdir/hra-scratch/ftu-datasets';

/** API Endpoint that computes a cell summary for each FTU as a whole */
const FTU_CELL_SUMMARIES_API = 'http://grlc.io/api-git/hubmapconsortium/ccf-grlc/subdir/hra-scratch/ftu-cell-summaries';

const CONTEXT = JSON.parse(readFileSync('context.jsonld').toString());

/**
 * Fetches data from an endpoint that supports Accept headers with text/csv. It then converts
 * the results to plain objects.
 *
 * @param {string} endpoint the API endpoint to fetch text/csv results from
 * @returns csv results converted to an array of objects
 */
function fetchFromCsv(endpoint) {
  return fetch(endpoint, {
    headers: {
      Accept: 'text/csv',
    },
  })
    .then((r) => r.text())
    .then((r) => Papa.parse(r, { header: true, skipEmptyLines: true, dynamicTyping: true }).data);
}

/**
 * Fetches relavent ftu data and returns an array of results
 * @param {string} datasetsApi endpoint for getting ftu datasets
 * @param {string} cellSummariesApi endpoint for getting ftu cell summaries
 * @returns
 */
async function getFtuDatasets(datasetsApi = FTU_DATASET_METADATA_API, cellSummariesApi = FTU_CELL_SUMMARIES_API) {
  const datasets = await fetchFromCsv(datasetsApi);

  const results = {};
  for (const dataset of datasets) {
    const ftuInfo = (results[dataset.ftu] = results[dataset.ftu] || {
      '@id': dataset.ftu,
      '@type': 'FtuIllustration',
      data_sources: []
    });

    ftuInfo.data_sources.push({
      '@id': dataset.dataset,
      '@type': 'Dataset',
      label: dataset.label,
      link: dataset.link,
      description: dataset.description,
    });
  }

  return Object.values(results);
}

/**
 * Fetches relavent ftu data and returns an array of results
 * @param {string} datasetsApi endpoint for getting ftu datasets
 * @param {string} cellSummariesApi endpoint for getting ftu cell summaries
 * @returns
 */
async function getFtuCellSummaries(datasetsApi = FTU_DATASET_METADATA_API, cellSummariesApi = FTU_CELL_SUMMARIES_API) {
  const summaries = await fetchFromCsv(cellSummariesApi);

  const results = {};
  for (const summary of summaries) {
    const ftuSummary = results[summary.ftu] = results[summary.ftu] || {
      '@type': 'CellSummary',
      ['cell_source']: summary.ftu,
      ['annotation_method']: 'Aggregation',
      ['biomarker_type']: 'gene',
      summary: [],
    };

    ftuSummary.summary.push({
      '@type': 'CellSummaryRow',
      ['cell_id']: summary.cell_id,
      ['cell_label']: summary.cell_label,
      ['gene_id']: 'https://purl.org/ccf/ASCTB-TEMP_dummy',
      ['gene_label']: 'Dummy',
      ['mean_expression']: Math.random(),
      count: summary.count,
      percentage: summary.percentage,
    });
  }

  return Object.values(results);
}

/**
 * Main function that gets the data and writes it to OUTPUT
 */
async function main() {
  const datasets = await getFtuDatasets();
  const summaries = await getFtuCellSummaries();

  writeFileSync('ftu-datasets.jsonld', JSON.stringify({
    ...CONTEXT, '@graph': datasets
  }, null, 2));

  writeFileSync('ftu-cell-summaries.jsonld', JSON.stringify({
    ...CONTEXT, '@graph': summaries
  }, null, 2));
}
main();
