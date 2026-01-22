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

function parseEnum<T extends object>(enumObj: T, value: unknown): T[keyof T] | null {
  if (!value) {
    return null;
  }

  const strValue = String(value).toLowerCase().trim();
  const enumValues = Object.values(enumObj);
  const match = enumValues.find((ev) => ev.toLowerCase() === strValue);
  return (match as T[keyof T]) ?? null;
}

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

function serializeOptions<T extends { id: string }>(options: T[] | null): string | null {
  if (!options?.length) {
    return null;
  }

  return options.map((opt) => opt.id).join(',');
}

export function parseView(value: unknown): View {
  return parseEnum(View, value) ?? View.Gallery;
}

export function parseCategories(value: unknown): CategoryOption[] | null {
  return parseOptions(CATEGORY_OPTIONS, value);
}

export function parseEvents(value: unknown): EventOption[] | null {
  return parseOptions(EVENT_OPTIONS, value);
}

export function parseFunding(value: unknown): FundingOption[] | null {
  return parseOptions(FUNDING_OPTIONS, value);
}

export function parsePublicationIds(value: unknown): string[] | null {
  if (!value) {
    return [];
  }

  const strValue = String(value).toLowerCase().trim();
  return strValue.split(',').map((part) => part.trim());
}

export function parsePeopleIds(value: unknown): string[] | null {
  if (!value) {
    return [];
  }

  const strValue = String(value).toLowerCase().trim();
  return strValue.split(',').map((part) => part.trim());
}

export function parseYears(value: unknown): YearOption[] | null {
  return parseOptions(YEAR_OPTIONS, value);
}

export function parseSearch(value: unknown): string | null {
  return value ? String(value) : null;
}

export function parseSortBy(value: unknown): SortBy | null {
  return parseEnum(SortBy, value);
}

export function parseGroupBy(value: unknown): string | null {
  return parseEnum(GroupBy, value);
}

export function serializeCategories(options: CategoryOption[] | null): string | null {
  return serializeOptions(options);
}

export function serializeEvents(options: EventOption[] | null): string | null {
  return serializeOptions(options);
}

export function serializeFunding(options: FundingOption[] | null): string | null {
  return serializeOptions(options);
}

export function serializePublicationIds(ids: string[] | null): string | null {
  return ids?.join(',') || null;
}

export function serializePeopleIds(ids: string[] | null): string | null {
  return ids?.join(',') || null;
}

export function serializeYears(options: YearOption[] | null): string | null {
  return serializeOptions(options);
}
