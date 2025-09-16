import { getToolDisplayName, DATA_TYPE_CONFIGS, Y_AXIS_OPTIONS, SORT_OPTIONS } from './data-type-config';

describe('data-type-config', () => {
  // Consolidated tool display name tests
  it.each([
    ['azimuth', 'Azimuth'],
    ['celltypist', 'CellTypist'],
    ['popv', 'popV'],
    ['sc_proteomics', 'Sc-proteomics'],
    ['unknownTool', 'unknownTool'], // fallback case
  ])('should return "%s" for getToolDisplayName("%s")', (input, expected) => {
    expect(getToolDisplayName(input)).toBe(expected);
  });

  it.each([
    ['anatomical', DATA_TYPE_CONFIGS.anatomical],
    ['extraction-site', DATA_TYPE_CONFIGS['extraction-site']],
    ['dataset', DATA_TYPE_CONFIGS.dataset],
  ])('should have valid %s configuration', (configName, config) => {
    expect(config).toBeDefined();
  });

  it.each([
    ['Y_AXIS_OPTIONS', Y_AXIS_OPTIONS],
    ['SORT_OPTIONS', SORT_OPTIONS],
  ])('should have valid %s with length > 0', (optionName, options) => {
    expect(options.length).toBeGreaterThan(0);
  });
});
