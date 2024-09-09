import { z } from 'zod';
import {
  RAW_CELL_ENTRY,
  RAW_CELL_SUMMARIES,
  RAW_DATASETS,
  RAW_ILLUSTRATION,
  RAW_ILLUSTRATIONS_JSONLD,
} from './ftu-data.model';

function isPath(value: unknown): boolean {
  return typeof value === 'string' && URL.canParse(value, 'https://example.com/');
}

function createInputValidation<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    (value) => {
      try {
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
      } catch {
        // Ignore errors
      }

      return value;
    },
    z.union([
      z.string().url().optional(),
      z.literal(''),
      z.custom<string>((value) => (isPath(value) ? value : false), 'Invalid path'),
      schema,
    ]),
  );
}

function parseInput<T extends z.ZodTypeAny>(schema: T, value: unknown): z.infer<T> {
  const result = schema.safeParse(value);
  if (result.success) {
    return result.data;
  }

  throw new TypeError(
    `Invalid input. Expected a url, a path, or a json encoded ${schema.description} object. Received: ${value}`,
  );
}

export const SELECTED_ILLUSTRATION_INPUT = createInputValidation(RAW_ILLUSTRATION).describe('illustration');
export function selectedIllustrationInput(value: unknown) {
  return parseInput(SELECTED_ILLUSTRATION_INPUT, value);
}

export const ILLUSTATIONS_INPUT = createInputValidation(RAW_ILLUSTRATIONS_JSONLD).describe('illustrations');
export function illustrationsInput(value: unknown) {
  return parseInput(ILLUSTATIONS_INPUT, value);
}

export type RawCellEntryInput = z.infer<typeof RAW_CELL_ENTRY_INPUT>;
export const RAW_CELL_ENTRY_INPUT = createInputValidation(RAW_CELL_ENTRY).describe('cell entry');
export function rawCellEntryInput(value: unknown): RawCellEntryInput {
  return parseInput(RAW_CELL_ENTRY_INPUT, value);
}

export const RAW_CELL_SUMMARIES_INPUT = createInputValidation(RAW_CELL_SUMMARIES).describe('cell summaries');
export function rawCellSummariesInput(value: unknown) {
  return parseInput(RAW_CELL_SUMMARIES_INPUT, value);
}

export const RAW_DATASETS_INPUT = createInputValidation(RAW_DATASETS).describe('datasets');
export function rawDatasetsInput(value: unknown) {
  return parseInput(RAW_DATASETS_INPUT, value);
}
