import { z } from 'zod';
import { RAW_CELL_SUMMARIES, RAW_DATASETS, RAW_ILLUSTRATION, RAW_ILLUSTRATIONS_JSONLD } from './ftu-data.model';

/**
 * Tries to parse a value as json. Returns the original value if it could not be parsed.
 *
 * @param value Value to parse
 * @returns Parsed json value or the original value
 */
export function tryParseJson<R = unknown>(value: unknown): R {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
  } catch {
    // Ignore errors
  }

  return value as R;
}

/**
 * Tests whether a value is path like
 *
 * @param value Value to test
 * @returns True if the value is path like
 */
function isPath(value: unknown): boolean {
  try {
    if (typeof value === 'string') {
      new URL(value, 'https://base.url/');
      return true;
    }
  } catch {
    // Ignore errors
  }

  return false;
}

/**
 * Creates a zod schema for validating input values that accepts either an url,
 * a path, javascript object, or a json encoded string of such an object.
 *
 * @param schema Input object schema
 * @returns A zod type for validating input values
 */
function createInputValidation<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(
    tryParseJson,
    z.union([
      z.string().url().optional(),
      z.literal(''),
      z.custom<string>((value) => (isPath(value) ? value : false), 'Invalid path'),
      schema,
    ]),
  );
}

/**
 * Parses a value using the provided schema. Throws an error on parsing failure.
 *
 * @param schema Schema to use for parsing
 * @param value Value to parse
 * @returns The parsed value
 */
function parseInput<T extends z.ZodTypeAny>(schema: T, value: unknown): z.infer<T> {
  const result = schema.safeParse(value);
  if (result.success) {
    return result.data;
  }

  throw new TypeError(
    `Invalid input. Expected an url, a path, or a json encoded ${schema.description} object. Received: ${value}`,
  );
}

/** Selected illustration input schema */
export const SELECTED_ILLUSTRATION_INPUT = createInputValidation(RAW_ILLUSTRATION).describe('illustration');

/**
 * Parses selected illustration input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
export function selectedIllustrationInput(value: unknown) {
  return parseInput(SELECTED_ILLUSTRATION_INPUT, value);
}

/** Illustrations input schema */
export const ILLUSTRATIONS_INPUT = createInputValidation(RAW_ILLUSTRATIONS_JSONLD).describe('illustrations');

/**
 * Parses illustrations input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
export function illustrationsInput(value: unknown) {
  return parseInput(ILLUSTRATIONS_INPUT, value);
}

/** Cell summaries input schema */
export const RAW_CELL_SUMMARIES_INPUT = createInputValidation(RAW_CELL_SUMMARIES).describe('cell summaries');

/**
 * Parses cell summaries input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
export function rawCellSummariesInput(value: unknown) {
  return parseInput(RAW_CELL_SUMMARIES_INPUT, value);
}

/** Datasets input schema */
export const RAW_DATASETS_INPUT = createInputValidation(RAW_DATASETS).describe('datasets');

/**
 * Parses datasets input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
export function rawDatasetsInput(value: unknown) {
  return parseInput(RAW_DATASETS_INPUT, value);
}
