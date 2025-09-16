import { getBarGraphSpec } from './visualization';

describe('visualization', () => {
  const mockData = [
    { anatomicalStructureLabel: 'Structure1', cellLabel: 'Cell1', cellCount: 100, tool: 'azimuth', sex: 'Male' },
  ];

  const defaultOptions = {
    graphTitle: 'Test',
    values: mockData,
    xField: 'anatomicalStructureLabel' as const, // Add missing xField
    yField: 'cellCount' as const,
    toolFilter: [],
    sexFilter: 'Both' as const,
    sortBy: 'totalCellCount' as const,
    order: 'descending' as const,
  };

  // Consolidated axis field tests
  it.each([
    ['anatomicalStructureId', 'Structure ID'],
    ['extractionSiteId', 'Extraction Site'],
    ['datasetId', 'Dataset'],
    ['customField', 'customField'],
  ])('should handle %s axis', (xField, expectedTitle) => {
    const spec = getBarGraphSpec({
      ...defaultOptions,
      xField: xField as any,
    });

    expect((spec as any).spec.encoding.x.axis.title).toBe(expectedTitle);
  });

  // Consolidated data validation tests
  it.each([
    ['empty values array', []],
    ['null values', null],
  ])('should handle %s', (scenario, values) => {
    const spec = getBarGraphSpec({
      ...defaultOptions,
      values: values as any,
    });

    expect(spec.title).toContain('No Data');
  });

  it('should handle alphabetical sorting', () => {
    const spec = getBarGraphSpec({
      ...defaultOptions,
      sortBy: 'alphabetical',
    });

    expect((spec as any).spec.encoding.x.sort.field).toBe('anatomicalStructureLabel');
    expect((spec as any).spec.encoding.x.sort.order).toBe('ascending');
  });

  it('should handle percentage y-axis', () => {
    const spec = getBarGraphSpec({
      ...defaultOptions,
      yField: 'cellPercentage',
    });

    expect((spec as any).spec.encoding.y.axis.title).toBe('Percentage (%)');
  });

  it('should handle unknown tool formatting', () => {
    const spec = getBarGraphSpec({
      ...defaultOptions,
      values: [{ ...mockData[0], tool: 'unknownTool' }],
    });

    expect((spec as any).data.values[0].toolFormatted).toBe('UnknownTool');
  });

  it('should handle tool filters', () => {
    const spec = getBarGraphSpec({
      ...defaultOptions,
      toolFilter: ['azimuth', 'celltypist'],
    });

    expect((spec as any).transform).toBeDefined();
    expect((spec as any).transform[0].filter.and).toBeDefined();
  });
});
