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
      instance.selected = nodes['id2'];
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

    it('expands all parent nodes and itself', async () => {
      const { instance } = await shallow.render({ bind: { nodes } });
      const spy = jest.spyOn(instance.control, 'expand');
      instance.ngOnChanges(createChangeSet((instance.selected = nodes['id4'])));
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onKeyDown', () => {
    const mockEvent1 = { key: 'ArrowLeft' } as KeyboardEvent;
    const mockEvent2 = { key: 'ArrowRight' } as KeyboardEvent;
    const mockEvent3 = { key: 'ArrowDown' } as KeyboardEvent;
    const mockEvent4 = { key: 'ArrowUp' } as KeyboardEvent;
    const mockEvent5 = { key: 'Enter' } as KeyboardEvent;

    it('should arrow left when expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id1'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex');
      instance.onKeyDown(mockEvent1);
      expect(instance.control.dataNodes.findIndex).toHaveBeenCalled();
    });

    it('should arrow right when expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id1'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex');
      instance.onKeyDown(mockEvent2);
      expect(instance.control.dataNodes.findIndex).toHaveBeenCalled();
    });

    it('should arrow down when expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id1'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex');
      instance.onKeyDown(mockEvent3);
      expect(instance.control.dataNodes.findIndex).toHaveBeenCalled();
    });

    it('should arrow up when expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id3'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex').mockReturnValue(2);
      instance.onKeyDown(mockEvent4);
      expect(instance.control.dataNodes.findIndex).toHaveBeenCalled();
    });

    it('should arrow down when not expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id3'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex').mockReturnValue(1);
      const spy = jest.spyOn(instance, 'selectNode');
      instance.onKeyDown(mockEvent3);
      expect(spy).toHaveBeenCalled();
    });

    it('should arrow up when not expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id3'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex').mockReturnValue(1);
      const spy = jest.spyOn(instance, 'selectNode');
      instance.onKeyDown(mockEvent4);
      expect(spy).toHaveBeenCalled();
    });

    it('should Enter when not expandable', async () => {
      const { instance } = await shallow.render({ bind: { nodes, selected: nodes['id3'] } });
      instance.enableNav = true;
      jest.spyOn(instance.control.dataNodes, 'findIndex').mockReturnValue(1);
      instance.onKeyDown(mockEvent5);
      expect(instance.navigate.emit).toHaveBeenCalledWith(nodes['id2']);
    });
  });
});
