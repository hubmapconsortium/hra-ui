import { Sheet, SheetConfig } from '../../../models/sheet.model';
import { TNode } from '../../../models/tree.model';
import { Data } from './data';

describe('Data', () => {
  const mockSheet = {} as Sheet;
  const mockTreeData: TNode[] = [];
  const mockConfig = {} as SheetConfig;
  let data: Data;

  beforeEach(() => {
    data = new Data(mockSheet, mockTreeData, mockConfig);
  });

  it('should create instance via static method and constructor', () => {
    const result = Data.create(mockSheet, mockTreeData, mockConfig);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(18);
    expect(data.data).toHaveLength(18);
  });

  it.each([
    ['makeSearchIdsData', 'search'],
    ['makeDiscrepencyIdData', 'discrepencyId'],
    ['makeDuplicateIdData', 'duplicateId'],
    ['makeDiscrepencyLabelData', 'discrepencyLabel'],
    ['makeBimodalNodesData', 'nodes'],
  ])('%s should return { name: %s, values: [] }', (method, name) => {
    const result = (data as unknown as Record<string, () => { name: string; values: unknown[] }>)[method]();
    expect(result).toEqual({ name, values: [] });
  });

  it('should create tree data with stratify and tree transforms', () => {
    const result = data.makeASTreeData(mockSheet, mockTreeData, mockConfig);
    expect(result).toMatchObject({
      name: 'tree',
      values: mockTreeData,
      transform: [
        { type: 'stratify', key: 'id', parentKey: 'parent' },
        {
          type: 'tree',
          method: 'cluster',
          size: [{ signal: 'as_height' }, { signal: 'as_width' }],
          separation: false,
          as: ['y', 'x', 'depth', 'children'],
        },
      ],
    });
  });

  it('should create tree links with treelinks and linkpath transforms', () => {
    expect(data.makeASTreeLinksData()).toMatchObject({
      name: 'links',
      source: 'tree',
      transform: [{ type: 'treelinks' }, { type: 'linkpath', orient: 'horizontal', shape: 'diagonal' }],
    });
  });

  it('should create multi-parent edges with lookup and linkpath', () => {
    const result = data.makeASMultiParentEdgesData([{ s: '1', t: '2' }]);
    expect(result.name).toBe('multi_parent_edges');
    expect(result.transform).toHaveLength(2);
    expect(result.transform?.[0]).toMatchObject({ type: 'lookup', from: 'tree' });
    expect(result.transform?.[1]).toMatchObject({ type: 'linkpath', orient: 'horizontal', shape: 'curve' });
  });

  it('should create bimodal edges with lookup and linkpath', () => {
    const result = data.makeBimodalEdgesData();
    expect(result.name).toBe('edges');
    expect(result.transform).toHaveLength(2);
    expect(result.transform?.[0]).toMatchObject({ type: 'lookup', from: 'nodes' });
    expect(result.transform?.[1]).toMatchObject({ type: 'linkpath', orient: 'horizontal', shape: 'diagonal' });
  });

  it.each([
    ['makeTargetsHoverData', 'targets_hovered_array', 'node_targets__hover'],
    ['makeSourcesHoverData', 'sources_hovered_array', 'node_sources__hover'],
    ['makeTargetsClickData', 'targets_clicked_array', 'targets__click'],
    ['makeSourcesClickData', 'sources_clicked_array', 'sources__click'],
  ])('%s should return filtered nodes', (method, name, signal) => {
    const result = (data as unknown as Record<string, () => { name: string; source: string; transform: unknown[] }>)[
      method
    ]();
    expect(result).toMatchObject({
      name,
      source: 'nodes',
      transform: [{ type: 'filter', expr: expect.stringContaining(signal) }],
    });
  });

  it.each([
    ['makeTargetsOfTargetsHoverData', 'targets_of_targets__hover', 'node_targets__hover', 'targets'],
    ['makeSourcesOfSourcesHoverData', 'sources_of_sources__hover', 'node_sources__hover', 'sources'],
    ['makeTargetsOfTargetsClickData', 'targets_of_targets__click', 'targets__click', 'targets'],
    ['makeSourcesOfSourcesClickData', 'sources_of_sources__click', 'sources__click', 'sources'],
  ])('%s should return filtered and flattened nodes', (method, name, signal, field) => {
    const result = (
      data as unknown as Record<string, () => { name: string; transform: { type: string; fields?: string[] }[] }>
    )[method]();
    expect(result.name).toBe(name);
    expect(result.transform).toEqual([
      { type: 'filter', expr: expect.stringContaining(signal) },
      { type: 'flatten', fields: [field] },
    ]);
  });

  it.each([
    [
      'makeViewModeClickData',
      'view_mode__click',
      'node__click === datum.id || indata("sources_clicked_array", "id", datum.id) || indata("targets_clicked_array", "id", datum.id)',
    ],
    [
      'makeViewModeHoverData',
      'view_mode__hover',
      'node__hover === datum.id || indata("sources_hovered_array", "id", datum.id) || indata("targets_hovered_array", "id", datum.id)',
    ],
  ])('%s should return view mode filtered nodes', (method, name, expr) => {
    const result = (
      data as unknown as Record<
        string,
        () => { name: string; source: string; transform: { type: string; expr: string }[] }
      >
    )[method]();
    expect(result).toEqual({ name, source: 'nodes', transform: [{ type: 'filter', expr }] });
  });
});
