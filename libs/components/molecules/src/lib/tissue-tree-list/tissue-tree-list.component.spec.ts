import { MatTreeModule } from '@angular/material/tree';
import { Shallow } from 'shallow-render';
import { DataNode, TissueTreeListComponent } from './tissue-tree-list.component';
import { LinkDirective } from '@hra-ui/cdk';
import { SimpleChange } from '@angular/core';

describe('TissueTreeListComponent', () => {
  let shallow: Shallow<TissueTreeListComponent<string, DataNode<string>>>;
  const nodes: Record<string, DataNode<string>> = {
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
    shallow = new Shallow(TissueTreeListComponent).dontMock(MatTreeModule, LinkDirective);
  });

  it('creates', async () => {
    await expect(shallow.render({ bind: { nodes } })).resolves.toBeDefined();
  });

  describe('selectNode(node)', () => {
    const internalNode = {
      label: '',
      expandable: false,
      level: 0,
      data: nodes['id1'],
    };

    it('should set the selected node', async () => {
      const { instance, outputs } = await shallow.render({ bind: { nodes } });
      instance.selectNode(internalNode.data);
      expect(instance.selected).toBe(internalNode.data);
      expect(outputs.selectedChange.emit).toHaveBeenCalledWith(internalNode.data);
    });

    it('should not emit if the same node is selected', async () => {
      const { instance, outputs } = await shallow.render({ bind: { nodes, selected: internalNode.data } });
      instance.selectNode(internalNode.data);
      expect(outputs.selectedChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('resetSelection()', () => {
    it('should reset the selected node and collapse all nodes', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id1'] } });
      jest.spyOn(instance.control, 'collapseAll');
      instance.resetSelection();
      expect(instance.selected).toBeUndefined();
      expect(instance.control.collapseAll).toHaveBeenCalled();
    });
  });

  describe('.selected', () => {
    function createChangeSet(value?: DataNode<string>) {
      return { selected: new SimpleChange(undefined, value, true) };
    }

    it('does nothing if set to undefined', async () => {
      const { instance } = await shallow.render({ bind: { nodes } });
      jest.spyOn(instance.control, 'expand');
      instance.ngOnChanges(createChangeSet(undefined));
      expect(instance.control.expand).not.toHaveBeenCalled();
    });

    it('expands all parent nodes and itself', async () => {
      const { instance } = await shallow.render({ bind: { nodes } });
      const spy = jest.spyOn(instance.control, 'expand');
      instance.ngOnChanges(createChangeSet((instance.selected = nodes['id4'])));
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });
});
