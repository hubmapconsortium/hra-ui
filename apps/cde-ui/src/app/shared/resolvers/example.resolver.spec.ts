import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { CdeVisualizationElementProps, Metadata } from '@hra-ui/cde-visualization';
import { NotFoundError } from '../utils/not-found-error';
import { createExampleResolver, EXAMPLE_INDEX_PARAM, EXAMPLES_DATA_KEY, getExampleCrumbs } from './example.resolver';

function createMockRoute(
  data: Record<string, unknown> = {},
  params: Record<string, string | null> = {},
  parent?: ActivatedRouteSnapshot,
): ActivatedRouteSnapshot {
  return {
    paramMap: convertToParamMap(params),
    data,
    parent,
  } as unknown as ActivatedRouteSnapshot;
}

describe('EXAMPLES_DATA_KEY', () => {
  it('should be a string', () => {
    expect(typeof EXAMPLES_DATA_KEY).toBe('string');
  });

  it('should have value "examples"', () => {
    expect(EXAMPLES_DATA_KEY).toBe('examples');
  });
});

describe('EXAMPLE_INDEX_PARAM', () => {
  it('should be a string', () => {
    expect(typeof EXAMPLE_INDEX_PARAM).toBe('string');
  });

  it('should have value "index"', () => {
    expect(EXAMPLE_INDEX_PARAM).toBe('index');
  });
});

describe('getExampleCrumbs', () => {
  const exampleWithMetadata = {
    metadata: { sourceFileName: 'Test Example' } as Metadata,
    data: 'test',
  };
  const exampleWithoutMetadata = { data: 'test' };
  const examples = [exampleWithMetadata, exampleWithoutMetadata];

  it('should return breadcrumbs with file name from metadata', () => {
    const route = createMockRoute({ [EXAMPLES_DATA_KEY]: examples }, { [EXAMPLE_INDEX_PARAM]: '0' });
    const result = getExampleCrumbs(route);

    expect(result).toEqual([{ name: 'Test Example', route: '/example/0' }]);
  });

  it('should return breadcrumbs with default name when metadata is missing', () => {
    const route = createMockRoute({ [EXAMPLES_DATA_KEY]: examples }, { [EXAMPLE_INDEX_PARAM]: '1' });
    const result = getExampleCrumbs(route);

    expect(result).toEqual([{ name: 'Example 1', route: '/example/1' }]);
  });

  it('should use index parameter in route', () => {
    const route = createMockRoute({ [EXAMPLES_DATA_KEY]: examples }, { [EXAMPLE_INDEX_PARAM]: '0' });
    const result = getExampleCrumbs(route);

    expect(result[0].route).toBe('/example/0');
  });

  it('should throw NotFoundError when index parameter is missing', () => {
    const route = createMockRoute({ [EXAMPLES_DATA_KEY]: examples });
    expect(() => getExampleCrumbs(route)).toThrow(NotFoundError);
  });

  it('should throw NotFoundError when examples data is missing', () => {
    const route = createMockRoute({}, { [EXAMPLE_INDEX_PARAM]: '0' });
    expect(() => getExampleCrumbs(route)).toThrow(NotFoundError);
  });

  it('should throw NotFoundError when example at index does not exist', () => {
    const route = createMockRoute({ [EXAMPLES_DATA_KEY]: examples }, { [EXAMPLE_INDEX_PARAM]: '10' });

    expect(() => getExampleCrumbs(route)).toThrow(NotFoundError);
    expect(() => getExampleCrumbs(route)).toThrow('Example 10 not found');
  });
});

describe('createExampleResolver', () => {
  const mockRouterState = { url: '/' } as unknown as RouterStateSnapshot;
  const exampleData = {
    label: 'colon-cycif-sorgerlab / CRC01002 (483,936 cells)',
    nodes:
      'https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv',
    edges:
      'https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-edges.csv',
    'node-target-key': 'Cell Type',
    'node-target-value': 'Endothelial',
    'max-edge-distance': 1000,
    metadata: {
      title: 'colon-cycif-sorgerlab / CRC01002',
      organ: 'Large Intestine',
      sourceFileName: '2D Large Intestine Sample',
      technology: 'CyCIF',
      thickness: '5',
      pixelSize: '0.65',
    },
  };
  const examples = [exampleData];

  function runResolverWithData(
    data: Record<string, unknown>[] | null = examples,
    index: string | null = '0',
  ): Partial<CdeVisualizationElementProps> {
    const route = createMockRoute({ [EXAMPLES_DATA_KEY]: data }, { [EXAMPLE_INDEX_PARAM]: index });
    const resolver = createExampleResolver();
    return resolver(route, mockRouterState) as Partial<CdeVisualizationElementProps>;
  }

  it('should normalize kebab-case keys to camelCase', () => {
    const result = runResolverWithData();

    expect(result).toHaveProperty('nodeTargetKey');
    expect(result).toHaveProperty('nodeTargetValue');
    expect(result).toHaveProperty('maxEdgeDistance');
    expect(result).toHaveProperty('metadata');
  });

  it('should preserve values when normalizing keys', () => {
    const result = runResolverWithData();

    expect(result.nodeTargetKey).toBe('Cell Type');
    expect(result.nodeTargetValue).toBe('Endothelial');
    expect(result.maxEdgeDistance).toBe(1000);
    expect((result.metadata as Metadata).sourceFileName).toBe('2D Large Intestine Sample');
  });

  it('should handle keys that are already camelCase', () => {
    const exampleWithCamelCase = {
      nodes: 'https://example.com/nodes.csv',
      metadata: { sourceFileName: 'test.json' },
    };
    const result = runResolverWithData([exampleWithCamelCase]);

    expect(result.nodes).toBe('https://example.com/nodes.csv');
    expect((result.metadata as Metadata).sourceFileName).toBe('test.json');
  });

  it('should handle empty object', () => {
    const result = runResolverWithData([{}]);
    expect(result).toEqual({});
  });

  it('should throw NotFoundError when index parameter is missing', () => {
    expect(() => runResolverWithData(examples, null)).toThrow(NotFoundError);
  });

  it('should throw NotFoundError when examples data is missing', () => {
    expect(() => runResolverWithData(null)).toThrow(NotFoundError);
  });

  it('should throw NotFoundError when example at index does not exist', () => {
    expect(() => runResolverWithData(examples, '10')).toThrow(NotFoundError);
    expect(() => runResolverWithData(examples, '10')).toThrow('Example 10 not found');
  });

  it('should handle negative index as out of bounds', () => {
    expect(() => runResolverWithData(examples, '-1')).toThrow(NotFoundError);
  });

  it('should work with multiple examples in array', () => {
    const multipleExamples = [
      { label: 'first', 'node-target-value': 'Type A' },
      { label: 'second', 'node-target-value': 'Type B' },
      { label: 'third', 'node-target-value': 'Type C' },
    ];
    const result = runResolverWithData(multipleExamples, '2');
    expect(result.nodeTargetValue).toBe('Type C');
  });
});
