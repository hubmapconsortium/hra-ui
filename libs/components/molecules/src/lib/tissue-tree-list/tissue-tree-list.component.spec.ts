import { MatTreeModule } from '@angular/material/tree';
import { Shallow } from 'shallow-render';
import { DataNode, TissueTreeListComponent } from './tissue-tree-list.component';

describe('TissueTreeListComponent', () => {
  let shallow: Shallow<TissueTreeListComponent<DataNode>>;
  const nodes: Record<string, DataNode> = {
    id1: {
      label: 'Kidney',
      children: ['id2', 'id3'],
    },
    id2: {
      label: 'Ascending thin limb',
    },
    id3: {
      label: 'Cortical collecting duct',
      children: ['id4', 'id6'],
    },
    id4: {
      label: 'Large Intestine',
      children: ['id5'],
    },
    id5: {
      label: 'Crypt of Lieberkuhn',
    },
    id6: {
      label: 'Liver',
      children: ['id7'],
    },
    id7: {
      label: 'Liver lobule',
    },
  };

  beforeEach(async () => {
    shallow = new Shallow(TissueTreeListComponent).dontMock(MatTreeModule);
  });

  it('creates', async () => {
    await expect(shallow.render({ bind: { nodes } })).resolves.toBeDefined();
  });

  describe('selectNode(node)', () => {
    const internalNode = {
      label: '',
      expandable: false,
      level: 0,
      data: nodes[0],
    };

    it('should set the selected node', async () => {
      const { instance, outputs } = await shallow.render({ bind: { nodes } });
      instance.selectNode(internalNode);
      expect(instance.selected).toBe(internalNode.data);
      expect(outputs.selectedChange.emit).toHaveBeenCalledWith(internalNode.data);
    });

    it('should clear the selected node if called with the current selection', async () => {
      const { instance, outputs } = await shallow.render({ bind: { nodes } });
      instance.selected = internalNode.data;
      instance.selectNode(internalNode);
      expect(instance.selected).toBeUndefined();
      expect(outputs.selectedChange.emit).toHaveBeenCalledWith(undefined);
    });
  });
});
