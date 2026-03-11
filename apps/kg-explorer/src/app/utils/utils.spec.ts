import { DigitalObjectInfo } from '@hra-api/ng-client';

import {
  getDocumentationUrl,
  getOrganIcon,
  getOrganId,
  getProductIcon,
  getProductLabel,
  getProductTooltip,
  sentenceCase,
} from './utils';

describe('utils', () => {
  describe('getOrganId', () => {
    it('returns the organ id when exactly one organ id is present', () => {
      const item = { organIds: ['http://purl.obolibrary.org/obo/UBERON_0002113'] } as DigitalObjectInfo;

      expect(getOrganId(item)).toBe('http://purl.obolibrary.org/obo/UBERON_0002113');
    });

    it('returns empty string when more than one organ id is present', () => {
      const item = {
        organIds: ['http://purl.obolibrary.org/obo/UBERON_0002113', 'http://purl.obolibrary.org/obo/UBERON_0002048'],
      } as DigitalObjectInfo;

      expect(getOrganId(item)).toBe('');
    });

    it('returns empty string when item is undefined', () => {
      expect(getOrganId(undefined)).toBe('');
    });
  });

  describe('getOrganIcon', () => {
    it('returns mapped organ icon for a known organ id', () => {
      const item = { organIds: ['http://purl.obolibrary.org/obo/UBERON_0002113'] } as DigitalObjectInfo;

      expect(getOrganIcon(item)).toBe('organ:kidneys');
    });

    it('returns all-organs icon when organ id is not mapped', () => {
      const item = { organIds: ['http://example.org/UNKNOWN'] } as DigitalObjectInfo;

      expect(getOrganIcon(item)).toBe('organ:all-organs');
    });

    it('returns all-organs icon when there are multiple organ ids', () => {
      const item = {
        organIds: ['http://purl.obolibrary.org/obo/UBERON_0002113', 'http://purl.obolibrary.org/obo/UBERON_0002048'],
      } as DigitalObjectInfo;

      expect(getOrganIcon(item)).toBe('organ:all-organs');
    });
  });

  describe('product helpers', () => {
    it('returns product icon for a known digital object type', () => {
      expect(getProductIcon('ctann')).toBe('product:cell-type-annotations');
    });

    it('returns product:undefined for unknown digital object type', () => {
      expect(getProductIcon('unknown-type')).toBe('product:undefined');
    });

    it('returns product label for a known digital object type', () => {
      expect(getProductLabel('ctann')).toBe('Cell Type Annotation Crosswalks');
    });

    it('returns empty label for unknown digital object type', () => {
      expect(getProductLabel('unknown-type')).toBe('');
    });

    it('returns tooltip for a known digital object type', () => {
      expect(getProductTooltip('ctann')).toEqual({
        description:
          'Azimuth and other cell type annotation tools are used to assign cell types to cells from sc/snRNA-seq studies. Manually compiled crosswalks are used to assign ontology IDs to cell types.',
        actionText: 'Learn more',
        actionUrl: 'https://humanatlas.io/cell-type-annotations',
      });
    });

    it('returns empty string tooltip for unknown digital object type', () => {
      expect(getProductTooltip('unknown-type')).toBe('');
    });

    it('returns documentation url for known type', () => {
      expect(getDocumentationUrl('ctann')).toBe('https://humanatlas.io/cell-type-annotations');
    });

    it('returns empty documentation url for unknown type', () => {
      expect(getDocumentationUrl('unknown-type')).toBe('');
    });
  });

  describe('sentenceCase', () => {
    it('normalizes casing and leading/trailing whitespace', () => {
      expect(sentenceCase('  kIDnEy   ')).toBe('Kidney');
    });

    it('returns empty string for empty input', () => {
      expect(sentenceCase('')).toBe('');
    });
  });
});
