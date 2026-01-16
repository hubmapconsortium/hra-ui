import { ROLE_TYPE_OPTIONS, RoleTypeOption, TeamType, YEAR_OPTIONS, YearOption } from './with-filters.feature';
import { GroupBy, SortBy } from './with-ordering.feature';

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

export function parseTeamType(value: unknown): TeamType {
  return parseEnum(TeamType, value) ?? TeamType.Current;
}

export function parseRoles(value: unknown): RoleTypeOption[] | null {
  return parseOptions(ROLE_TYPE_OPTIONS, value);
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

export function parseGroupBy(value: unknown): GroupBy | null {
  return parseEnum(GroupBy, value);
}

export function serializeRoles(options: RoleTypeOption[] | null): string | null {
  if (!options?.length) {
    return null;
  }

  return options.map((option) => option.id).join(',');
}

export function serializeYears(options: YearOption[] | null): string | null {
  if (!options?.length) {
    return null;
  }

  return options.map((option) => option.year.toString()).join(',');
}
