import { DigitalObjectInfo } from '../digital-objects-metadata.schema';
import { getDocumentationUrl, getOrganIcon, getOrganId, getOrganTooltip } from './utils';

const HEART_ID = 'http://purl.obolibrary.org/obo/UBERON_0000948';
const LUNG_ID = 'http://purl.obolibrary.org/obo/UBERON_0002048';

/** Minimal DigitalObjectInfo fixture — only fields relevant to the tested functions are meaningful */
function makeItem(overrides: Partial<DigitalObjectInfo>): DigitalObjectInfo {
  return {
    '@id': 'test',
    '@type': 'GeneratedDataset',
    title: 'test',
    doType: 'test',
    doName: 'test',
    doVersion: 'test',
    lastUpdated: 'test',
    versions: [],
    purl: 'test',
    datasets: [],
    lod: 'test',
    ...overrides,
  } as unknown as DigitalObjectInfo;
}

describe('getDocumentationUrl', () => {
  it('should return the correct documentation url', () => {
    expect(getDocumentationUrl('ctann')).toBe('https://humanatlas.io/cell-type-annotations');
  });

  it('should return empty string if documentation url not found', () => {
    expect(getDocumentationUrl('foo')).toBe('');
  });
});

describe('getOrganId', () => {
  it('returns undefined when item is undefined', () => {
    expect(getOrganId(undefined)).toBeUndefined();
  });

  it('returns undefined when item has no organIds', () => {
    expect(getOrganId(makeItem({}))).toBeUndefined();
  });

  it('returns the single organ id', () => {
    expect(getOrganId(makeItem({ organIds: HEART_ID }))).toBe(HEART_ID);
  });

  it('returns the first organ id when multiple are present', () => {
    expect(getOrganId(makeItem({ organIds: [LUNG_ID, HEART_ID] }))).toBe(LUNG_ID);
  });
});

describe('findOrganName (via getOrganIcon)', () => {
  it('returns all-organs icon when title matches nothing', () => {
    expect(getOrganIcon(makeItem({ title: 'Completely unknown structure' }))).toBe('organ:all-organs');
  });

  it('returns correct icon when title directly matches a DO_ICON_MAP key', () => {
    expect(getOrganIcon(makeItem({ title: 'Heart Reference Object' }))).toBe('organ:heart');
  });

  it('returns correct icon when title matches a DO_ORGAN_NAME_MAP redirect key', () => {
    // "colon" → DO_ORGAN_NAME_MAP maps to "large intestine" → DO_ICON_MAP maps to "large-intestine"
    expect(getOrganIcon(makeItem({ title: 'Colon Data' }))).toBe('organ:large-intestine');
  });
});

describe('getOrganTooltip', () => {
  it('returns "Multiple organs" when no organ name found and no organIds', () => {
    expect(getOrganTooltip(makeItem({ title: 'Unknown tissue' }))).toBe('Multiple organs');
  });

  it('returns organ count when no organ name found and multiple organIds', () => {
    expect(getOrganTooltip(makeItem({ title: 'Unknown tissue', organIds: ['id1', 'id2'] }))).toBe('2 organs');
  });

  it('returns sentence-cased label for a known organ with no override', () => {
    expect(getOrganTooltip(makeItem({ title: 'Heart Reference Object', organIds: HEART_ID }))).toBe('Heart');
  });

  it('uses the tooltip override when one exists', () => {
    // "adipose" in title → findOrganName returns "adipose" → DO_ORGAN_TOOLTIP_OVERRIDES maps to "adipose tissue"
    expect(getOrganTooltip(makeItem({ title: 'Adipose Tissue FTU' }))).toBe('Adipose tissue');
  });

  it('appends singular "+ 1 organ" suffix when organ found and 2 organIds', () => {
    expect(getOrganTooltip(makeItem({ title: 'Heart Reference Object', organIds: [HEART_ID, 'id2'] }))).toBe(
      'Heart + 1 organ',
    );
  });

  it('appends plural "+ N organs" suffix when organ found and 3 or more organIds', () => {
    expect(getOrganTooltip(makeItem({ title: 'Heart Reference Object', organIds: [HEART_ID, 'id2', 'id3'] }))).toBe(
      'Heart + 2 organs',
    );
  });
});
