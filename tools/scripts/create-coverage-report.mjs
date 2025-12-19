import { Command } from 'commander';
import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * @typedef ReportOptions
 * @property {string} output
 * @property {boolean} verbose
 */

/**  @typedef {import('istanbul-lib-coverage').Totals} Totals */
/**  @typedef {import('istanbul-lib-coverage').CoverageSummaryData} CoverageSummaryData */
/**  @typedef {{ total: CoverageSummaryData; [path: string]: CoverageSummaryData }} JsonSummaryReport */

/**
 * @typedef ProjectSummaryReport
 * @property {string} file
 * @property {string} project
 * @property {CoverageSummaryData} total
 */

const VERSION = '0.0.1';
const JSON_EXT = '.json';
const COVERAGE_SUMMARY_JSON_GLOB = '**/coverage-summary.json';

/** @type {(coverageDir: string, file: string) => Promise<ProjectSummaryReport | undefined>} */
async function readSummary(coverageDir, file) {
  const filePath = path.join(coverageDir, file);

  try {
    const content = await fs.readFile(filePath, { encoding: 'utf8' });
    const report = /** @type {JsonSummaryReport} */ (JSON.parse(content));
    return { file: path.resolve(filePath), project: file.slice(0, -JSON_EXT.length), total: report.total };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to read summary report '${filePath}': `, error);
    return undefined;
  }
}

/** @type {(coverageDir: string) => Promise<ProjectSummaryReport[]>} */
async function readSummaries(coverageDir) {
  const files = await glob(COVERAGE_SUMMARY_JSON_GLOB, { cwd: coverageDir });
  const summaries = await Promise.all(files.map((file) => readSummary(coverageDir, file)));
  return summaries.filter((s) => s !== undefined);
}

/** @type {() => Totals} */
function createEmptyTotals() {
  return {
    total: 0,
    covered: 0,
    skipped: 0,
    pct: 100,
  };
}

/** @type {(dest: CoverageSummaryData, data: CoverageSummaryData) => void} */
function mergeCoverageSummaryData(dest, data) {
  for (const key in dest) {
    const destTotals = /** @type {Totals} */ (dest[key]);
    const totals = /** @type {Totals} */ (data[key]);

    destTotals.total += totals.total;
    destTotals.covered += totals.covered;
    destTotals.skipped += totals.skipped;

    const pct = (100 * destTotals.covered) / (destTotals.total || 1);
    destTotals.pct = +pct.toFixed(2);
  }
}

/** @type {(summaries: ProjectSummaryReport[]) => JsonSummaryReport } */
function compileGlobalJsonSummaryReport(summaries) {
  /** @type {JsonSummaryReport} */
  const report = {
    total: {
      lines: createEmptyTotals(),
      statements: createEmptyTotals(),
      functions: createEmptyTotals(),
      branches: createEmptyTotals(),
    },
  };

  for (const summary of summaries) {
    report[summary.file] = summary.total;
    mergeCoverageSummaryData(report.total, summary.total);
  }

  return report;
}

/** @type {(coverageDir: string, options: ReportOptions) => Promise<void>} */
async function createCoverageReport(coverageDir, options) {
  const summaries = await readSummaries(coverageDir);
  const report = compileGlobalJsonSummaryReport(summaries);
  const content = JSON.stringify(report, undefined, 2);
  const outFile = path.join(coverageDir, options.output);
  await fs.writeFile(outFile, content, { encoding: 'utf8' });
}

function createProgram() {
  return new Command()
    .name('create-coverage-report')
    .description('CLI to create a global coverage report by combining per project reports')
    .version(VERSION)
    .argument('<coverageDir>', 'coverage reports directory')
    .option('-o, --output <filename>', 'output file name', 'coverage-summary.json')
    .option('-v, --verbose', 'enable verbose logging', false)
    .action(createCoverageReport);
}

await createProgram().parseAsync();
