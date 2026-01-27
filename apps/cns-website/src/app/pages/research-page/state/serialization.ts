import {
  CATEGORY_OPTIONS,
  CategoryOption,
  EVENT_OPTIONS,
  EventOption,
  FUNDING_OPTIONS,
  FundingOption,
  YEAR_OPTIONS,
  YearOption,
} from './with-filters.feature';
import { GroupBy, SortBy } from './with-ordering.feature';
import { View } from './with-view.feature';

/**
 * Parses a string value into a matching enum member, case-insensitive.
 * @param value Raw input
 */
function parseEnum<T extends object>(enumObj: T, value: unknown): T[keyof T] | null {
  if (!value) {
    return null;
  }

  const strValue = String(value).toLowerCase().trim();
  const enumValues = Object.values(enumObj);
  const match = enumValues.find((ev) => ev.toLowerCase() === strValue);
  return (match as T[keyof T]) ?? null;
}

/**
 * Parses comma-separated option IDs into option objects, preserving order.
 * @param value Raw query value
 */
function parseOptions<T extends { id: string }>(options: T[], value: unknown): T[] | null {
  if (!value) {
    return [];
  }

  const strValue = String(value).toLowerCase().trim();
  const parts = strValue.split(',').map((part) => part.trim());
  const selectedOptions: T[] = [];
  for (const part of parts) {
    const option = options.find((opt) => opt.id.toLowerCase() === part);
    if (option) {
      selectedOptions.push(option);
    }
  }

  return selectedOptions.length > 0 ? selectedOptions : null;
}

/**
 * Serializes selected options to a comma-delimited string for query params.
 * @param options Selected options
 */
function serializeOptions<T extends { id: string }>(options: T[] | null): string | null {
  if (!options?.length) {
    return null;
  }

  return options.map((opt) => opt.id).join(',');
}

/**
 * Parses view query parameter into a view enum.
 * @param value Raw query value
 */
export function parseView(value: unknown): View {
  return parseEnum(View, value) ?? View.Gallery;
}

/**
 * Parses category query parameter into category options.
 * @param value Raw query value
 */
export function parseCategories(value: unknown): CategoryOption[] | null {
  return parseOptions(CATEGORY_OPTIONS, value);
}

/**
 * Parses event query parameter into event options.
 * @param value Raw query value
 */
export function parseEvents(value: unknown): EventOption[] | null {
  return parseOptions(EVENT_OPTIONS, value);
}

/**
 * Parses funding query parameter into funding options.
 * @param value Raw query value
 */
export function parseFunding(value: unknown): FundingOption[] | null {
  return parseOptions(FUNDING_OPTIONS, value);
}

/**
 * Parses publication IDs from comma-separated query parameter.
 * @param value Raw query value
 */
export function parsePublicationIds(value: unknown): string[] | null {
  if (!value) {
    return [];
  }

  const strValue = String(value).toLowerCase().trim();
  return strValue.split(',').map((part) => part.trim());
}

/**
 * Parses people IDs from comma-separated query parameter.
 * @param value Raw query value
 */
export function parsePeopleIds(value: unknown): string[] | null {
  if (!value) {
    return [];
  }

  const strValue = String(value).toLowerCase().trim();
  return strValue.split(',').map((part) => part.trim());
}

/**
 * Parses year query parameter into year options.
 * @param value Raw query value
 */
export function parseYears(value: unknown): YearOption[] | null {
  return parseOptions(YEAR_OPTIONS, value);
}

/**
 * Parses search text from query parameter.
 * @param value Raw query value
 */
export function parseSearch(value: unknown): string | null {
  return value ? String(value) : null;
}

/**
 * Parses sort-by query parameter into sort enum.
 * @param value Raw query value
 */
export function parseSortBy(value: unknown): SortBy {
  return parseEnum(SortBy, value) ?? SortBy.Newest;
}

/**
 * Parses group-by query parameter into group enum.
 * @param value Raw query value
 */
export function parseGroupBy(value: unknown): string | null {
  return parseEnum(GroupBy, value);
}

/**
 * Serializes selected categories to query parameter format.
 * @param options Selected categories
 */
export function serializeCategories(options: CategoryOption[] | null): string | null {
  return serializeOptions(options);
}

/**
 * Serializes selected events to query parameter format.
 * @param options Selected events
 */
export function serializeEvents(options: EventOption[] | null): string | null {
  return serializeOptions(options);
}

/**
 * Serializes selected funding options to query parameter format.
 * @param options Selected funding
 */
export function serializeFunding(options: FundingOption[] | null): string | null {
  return serializeOptions(options);
}

/**
 * Serializes publication IDs to comma-delimited string.
 * @param ids Publication IDs
 */
export function serializePublicationIds(ids: string[] | null): string | null {
  return ids?.join(',') || null;
}

/**
 * Serializes people IDs to comma-delimited string.
 * @param ids People IDs
 */
export function serializePeopleIds(ids: string[] | null): string | null {
  return ids?.join(',') || null;
}

/**
 * Serializes selected years to query parameter format.
 * @param options Selected years
 */
export function serializeYears(options: YearOption[] | null): string | null {
  return serializeOptions(options);
}
