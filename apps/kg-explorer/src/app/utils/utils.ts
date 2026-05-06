import { DigitalObjectInfo } from '../digital-objects-metadata.schema';
import doInfoJson from './data/do-info.json';
import doOrganLookupJson from './data/do-organ-lookup.json';
import doOrganOverridesJson from './data/do-organ-overrides.json';
import doOrganToIconsJson from './data/do-organ-to-icons.json';
import doOrganTooltipOverridesJson from './data/do-organ-tooltip-overrides.json';
import doOrganIdToOrgansJson from './data/do-organid-to-organs.json';
import filterCategoryInfoJson from './data/filter-category-info.json';
import hraVersionDataJson from './data/hra-version-data.json';

/** Tooltip data interface */
export interface TooltipData {
  /** Tooltip description */
  description: string;
  /** Text on action button */
  actionText?: string;
  /** Url on action button */
  actionUrl?: string;
}

/** Interface for digital object type data */
export interface ObjectTypeData {
  /** Object type label */
  label: string;
  /** Design system icon to use for the object type */
  icon: string;
  /** Tooltip data for the digital object type */
  tooltip: TooltipData;
  /** Documentation url, if available for the object type */
  documentationUrl?: string;
}

/** Filter option category interface */
export interface FilterOptionCategory {
  /** Category label */
  label: string;
  /** Filter options for the category */
  options?: FilterOption[];
  /** Tooltip data */
  tooltip?: TooltipData;
}

/** Filter option interface */
export interface FilterOption {
  /** Option id */
  id: string;
  /** Option label */
  label: string;
  /** Secondary label (for release version options) */
  secondaryLabel?: string;
  /** Number of results for the filter option in the data */
  count: number;
  /** Tooltip data for the filter option (for digital objects category) */
  tooltip?: TooltipData;
}

/** Interface for filter categories containing filter options */
export interface FilterOptions {
  /** Digital object filters */
  digitalObjects: FilterOption[];
  /** Release version filters */
  releaseVersion: FilterOption[];
  /** Organ filters */
  organs: FilterOption[];
  /** Anatomical structures filters */
  anatomicalStructures: FilterOption[];
  /** Cell type filters */
  cellTypes: FilterOption[];
  /** Biomarker filters */
  biomarkers: FilterOption[];
}

/** Filter types for the filter form */
export type FilterType = keyof FilterOptions;

/** Stores data for a doType */
export const DO_INFO: Record<string, ObjectTypeData> = doInfoJson;

/** Filter category info */
export const FILTER_CATEGORY_INFO: Record<FilterType, FilterOptionCategory> = filterCategoryInfoJson as Record<
  FilterType,
  FilterOptionCategory
>;

/** If a digital object has a specific organ that is specified, this will be used */
export const DO_ORGAN_OVERRIDES: Record<string, string> = doOrganOverridesJson;

/** Maps organ IDs to their associated organ names */
export const DO_ORGAN_ID_TO_ORGANS: Record<string, string> = doOrganIdToOrgansJson;

/** Maps certain organ names to their associated organ name in the design system */
export const DO_ORGAN_LOOKUP: Record<string, string> = doOrganLookupJson;

/** Maps organ names to the correct organ icon name in the design system */
export const ORGAN_TO_ICONS: Record<string, string> = doOrganToIconsJson;

/** If an organ's tooltip differs from the default, this will override it */
export const DO_ORGAN_TOOLTIP_OVERRIDES: Record<string, string> = doOrganTooltipOverridesJson;

/** HRA version data info */
export const HRA_VERSION_DATA: Record<string, { label: string; date: string }> = hraVersionDataJson;

/**
 * Gets organ id from a digital object. If more than one organ is listed return the first one, if no organs are listed return undefined
 * @param item Digital object data item
 * @returns Organ id
 */
export function getOrganId(item?: DigitalObjectInfo): string | undefined {
  const ids = coerceArray(item?.organIds);
  return ids.length > 0 ? ids[0] : undefined;
}

/**
 * Finds the name of the organ from a digital object
 * If the item purl is in DO_ORGAN_OVERRIDES, use the organ name from it
 * Otherwise if organ id is present, look up the organ name from DO_ORGAN_ID_TO_ORGANS using the organ id
 * If there is another organ that is used in place of that organ, use that instead (look up from DO_ORGAN_LOOKUP)
 * Finally search for the organ by title
 * @param item Digital object data item
 * @returns Organ name
 */
function findOrganName(item: DigitalObjectInfo): string | undefined {
  const title = item.title.toLowerCase();
  const purl = item.purl;
  const organId = getOrganId(item);
  const organByTitle = findOrganNameByTitle(title);

  if (DO_ORGAN_OVERRIDES[purl]) {
    return DO_ORGAN_OVERRIDES[purl];
  }
  // Only look up organ if the title contains an organ name
  if (organId && organByTitle) {
    const organName = DO_ORGAN_ID_TO_ORGANS[organId];
    const mainOrganName = DO_ORGAN_LOOKUP[organName];
    return mainOrganName ?? organName;
  }
  return organByTitle;
}

/**
 * Looks up organ name from a digital object title
 * If the title contains an organ name to be overridden, look up the actual organ name and use it
 * @param title Digital object title
 * @returns organ name by title
 */
function findOrganNameByTitle(title: string): string | undefined {
  const namesToReplace = Object.keys(DO_ORGAN_LOOKUP);
  const organNames = Object.keys(ORGAN_TO_ICONS);
  const overrideOrganMatch = namesToReplace.find((key) => title.includes(key));

  if (overrideOrganMatch) {
    return DO_ORGAN_LOOKUP[overrideOrganMatch];
  }
  return organNames.find((key) => title.includes(key));
}

/**
 * Gets organ icon from a digital object
 * Will return the icon if the organ name is found in ORGAN_TO_ICONS
 * Otherwise will return the default "all organs" icon.
 * @param item Digital object data item
 * @returns Organ icon
 */
export function getOrganIcon(item: DigitalObjectInfo): string {
  const name = findOrganName(item);
  if (name) {
    return `organ:${ORGAN_TO_ICONS[name] ?? 'all-organs'}`;
  }
  return 'organ:all-organs';
}

/**
 * Gets organ tooltip for an organ icon
 * @param item Digital object data item
 * @returns Organ tooltip
 */
export function getOrganTooltip(item: DigitalObjectInfo): string {
  let label = findOrganName(item);
  const idsLength = coerceArray(item.organIds).length;

  if (label === 'all organs' || !label) {
    return `${idsLength > 1 ? idsLength : 'Multiple'} organs`;
  }
  if (DO_ORGAN_TOOLTIP_OVERRIDES[label]) {
    label = DO_ORGAN_TOOLTIP_OVERRIDES[label];
  }
  const mainOrganLabel = sentenceCase(label);
  const otherOrgansLabel = ` + ${idsLength - 1} organ${idsLength > 2 ? 's' : ''}`;
  return mainOrganLabel + (idsLength > 1 ? otherOrgansLabel : '');
}

/**
 * Gets product icon from digital object type
 * @param doType Digital object type
 * @returns Product icon string
 */
export function getProductIcon(doType: string): string {
  return `product:${DO_INFO[doType]?.icon}`;
}

/**
 * Gets product label from digital object type
 * @param doType Digital object type
 * @returns Product label string
 */
export function getProductLabel(doType: string): string {
  return DO_INFO[doType]?.label || '';
}

/**
 * Gets product tooltip from digital object type
 * @param doType Digital object type
 * @returns Product tooltip data object
 */
export function getProductTooltip(doType: string): TooltipData {
  return DO_INFO[doType]?.tooltip || '';
}

/**
 * Gets product documentation url from digital object type
 * @param doType Digital object type
 * @returns Documentation url
 */
export function getDocumentationUrl(doType: string): string {
  return DO_INFO[doType]?.documentationUrl || '';
}

/**
 * Converts a string to sentence case
 * @param value String to convert
 * @returns String in sentence case
 */
export function sentenceCase(value: string): string {
  const processedValue = value.trim().toLowerCase();
  return processedValue.charAt(0).toUpperCase() + processedValue.slice(1);
}

/**
 * Coerces a string or array of strings to an array of strings
 * @param value
 * @returns array
 */
export function coerceArray(value: string | string[] | undefined): string[] {
  switch (typeof value) {
    case 'undefined':
      return [];
    case 'string':
      return [value];
    default:
      return value;
  }
}

/**
 * Formats Date to yyyy-mm
 * @param dateString Date string
 * @returns Date as yyyy-mm
 */
export function formatDateToYYYYMM(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}
