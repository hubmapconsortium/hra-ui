import { ROLE_TYPE_OPTIONS, RoleTypeOption, TeamType, YEAR_OPTIONS, YearOption } from './with-filters.feature';
import { GroupBy, SortBy } from './with-ordering.feature';

/**
 * Parses an unknown value into an enum value
 * @param enumObj - The enum object to match against
 * @param value - The value to parse
 * @returns The matched enum value or null if not found
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
 * Parses a comma-separated string into an array of matching options
 * @param options - Available options to match against
 * @param value - Comma-separated string of option IDs
 * @returns Array of matched options or null if none found
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
 * Parses a URL query param value into a TeamType enum
 * @param value - The query param value
 * @returns The parsed TeamType, defaults to Current
 */
export function parseTeamType(value: unknown): TeamType {
  return parseEnum(TeamType, value) ?? TeamType.Current;
}

/**
 * Parses a URL query param value into role type options
 * @param value - Comma-separated role IDs
 * @returns Array of matched role options or null
 */
export function parseRoles(value: unknown): RoleTypeOption[] | null {
  return parseOptions(ROLE_TYPE_OPTIONS, value);
}

/**
 * Parses a URL query param value into year options
 * @param value - Comma-separated year values
 * @returns Array of matched year options or null
 */
export function parseYears(value: unknown): YearOption[] | null {
  return parseOptions(YEAR_OPTIONS, value);
}

/**
 * Parses a URL query param value into a search string
 * @param value - The search query param
 * @returns The search string or null
 */
export function parseSearch(value: unknown): string | null {
  return value ? String(value) : null;
}

/**
 * Parses a URL query param value into a SortBy enum
 * @param value - The sort query param
 * @returns The parsed SortBy value or null
 */
export function parseSortBy(value: unknown): SortBy | null {
  return parseEnum(SortBy, value);
}

/**
 * Parses a URL query param value into a GroupBy enum
 * @param value - The group query param
 * @returns The parsed GroupBy value or null
 */
export function parseGroupBy(value: unknown): GroupBy | null {
  return parseEnum(GroupBy, value);
}

/**
 * Serializes role options into a comma-separated string for URL
 * @param options - Array of role options to serialize
 * @returns Comma-separated string of role IDs or null
 */
export function serializeRoles(options: RoleTypeOption[] | null): string | null {
  if (!options?.length) {
    return null;
  }

  return options.map((option) => option.id).join(',');
}

/**
 * Serializes year options into a comma-separated string for URL
 * @param options - Array of year options to serialize
 * @returns Comma-separated string of years or null
 */
export function serializeYears(options: YearOption[] | null): string | null {
  if (!options?.length) {
    return null;
  }

  return options.map((option) => option.year.toString()).join(',');
}
