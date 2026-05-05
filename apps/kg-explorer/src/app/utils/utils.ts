import { DigitalObjectInfo } from '../digital-objects-metadata.schema';
import digitalObjectIconMapJson from './data/digital-object-icon-map.json';
import doInfoJson from './data/do-info.json';
import filterCategoryInfoJson from './data/filter-category-info.json';
import iconTooltipMapJson from './data/icon-tooltip-map.json';
import organIconMapJson from './data/organ-icon-map.json';

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

/** Maps UBERON id to the correct icon in the design system */
export const ORGAN_ICON_MAP: Record<string, string> = organIconMapJson;

/** Maps digital object purls to the correct organ icons in the design system */
export const DO_ICON_MAP: Record<string, string> = digitalObjectIconMapJson;

/** If the icon tooltip is different from the icon name, this map provides the correct tooltip */
export const ICON_TOOLTIP_MAP: Record<string, string> = iconTooltipMapJson;

/** HRA version data info */
export const HRA_VERSION_DATA: Record<string, { label: string; date: string }> = {
  'v2.5': {
    label: '11th Release (v2.5)',
    date: 'June 2026',
  },
  'v2.4': {
    label: '10th Release (v2.4)',
    date: 'December 2025',
  },
  'v2.3': {
    label: '9th Release (v2.3)',
    date: 'June 2025',
  },
  'v2.2': {
    label: '8th Release (v2.2)',
    date: 'December 2024',
  },
  'v2.1': {
    label: '7th Release (v2.1)',
    date: 'June 2024',
  },
  'v2.0': {
    label: '6th Release (v2.0)',
    date: 'December 2023',
  },
  'v1.4': {
    label: '5th Release (v1.4)',
    date: 'June 2023',
  },
  'v1.3': {
    label: '4th Release (v1.3)',
    date: 'December 2022',
  },
  'v1.2': {
    label: '3rd Release (v1.2)',
    date: 'June 2022',
  },
  'v1.1': {
    label: '2rd Release (v1.1)',
    date: 'December 2021',
  },
  'v1.0': {
    label: '1st Release (v1.0)',
    date: 'June 2021',
  },
};

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
 * Gets organ icon from a digital object
 * @param item Digital object data item
 * @returns Organ icon
 */
export function getOrganIcon(item: DigitalObjectInfo): string {
  const purl = item.purl;
  if (purl && DO_ICON_MAP[purl]) {
    return `organ:${DO_ICON_MAP[purl]}`;
  }
  if (item.organIds?.length === 1) {
    return `organ:${ORGAN_ICON_MAP[getOrganId(item) as string] ?? 'all-organs'}`;
  }
  return 'organ:all-organs';
}

/**
 * Gets organ tooltip for an organ icon
 * If icon is All Organs and there are organ IDs, it will show the number of organs.
 * @param item Digital object data item
 * @returns Organ tooltip
 */
export function getOrganTooltip(item: DigitalObjectInfo): string {
  const icon = getOrganIcon(item);
  if (icon === 'organ:all-organs') {
    return `${item.organIds ? coerceArray(item?.organIds).length : 'Multiple'} organs`;
  }
  return ICON_TOOLTIP_MAP[icon] ?? sentenceCase(icon.replace(/^organ:/, '').replace(/-/g, ' '));
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
