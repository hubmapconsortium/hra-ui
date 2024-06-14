import { DEFAULT_NODE_TARGET_VALUE, NodeEntry, NodeTargetKey, selectNodeTargetValue } from './node';

describe('selectNodeTargetValue', () => {
  const key = 'test-key' as NodeTargetKey;
  function createNodeEntry(targetKey: string, target: string, x: number, y: number): NodeEntry {
    return { [targetKey]: target, x, y } as NodeEntry;
  }
  const sampleNodesNoDefault = [createNodeEntry(key, 'a', 0, 0), createNodeEntry(key, 'b', 0, 2)];
  const sampleNodesWithDefault = [...sampleNodesNoDefault, createNodeEntry(key, DEFAULT_NODE_TARGET_VALUE, 0, 4)];

  it('returns default target value if present', () => {
    expect(selectNodeTargetValue(sampleNodesWithDefault, key)).toEqual(DEFAULT_NODE_TARGET_VALUE);
  });

  it('returns default target value if there are no nodes', () => {
    expect(selectNodeTargetValue([], key)).toEqual(DEFAULT_NODE_TARGET_VALUE);
  });

  it('returns the first found target value otherwise', () => {
    expect(selectNodeTargetValue(sampleNodesNoDefault, key)).toEqual('a');
  });
});
