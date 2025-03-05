import { SimpleChanges } from '@angular/core';
import { OntologyTreeNode } from '@hra-api/ng-client';
import { RecursivePartial, Shallow } from 'shallow-render';
import { FlatNode } from '../../../core/models/flat-node';
import { OntologyTreeComponent } from './ontology-tree.component';
import { OntologyTreeModule } from './ontology-tree.module';
import { MatTreeModule } from '@angular/material/tree';

function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}

describe('OntologyTreeComponent', () => {
  const node1 = fromPartial<OntologyTreeNode>({ id: '1', parent: '2', label: 'label', children: ['child1', 'child2'] });
  const node2 = fromPartial<OntologyTreeNode>({ id: '2', label: 'label2', children: [] });
  const flatNode1 = new FlatNode(node1, 1);
  const flatNode2 = new FlatNode(node2, 1);

  let shallow: Shallow<OntologyTreeComponent>;

  beforeEach(() => {
    shallow = new Shallow(OntologyTreeComponent, OntologyTreeModule).dontMock(MatTreeModule);
  });

  it('should check if the node is selected node or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNodes = [flatNode1];
    expect(instance.isSelected(flatNode1)).toBeTruthy();
  });

  it('should call set nodes', async () => {
    const { instance } = await shallow.render();
    instance.nodes = [node1, node2];
  });

  it('should return nodes', async () => {
    const { instance } = await shallow.render({ bind: { nodes: [node1, node2] } });
    expect(instance.nodes).toEqual([node1, node2]);
  });

  it('should set children', async () => {
    const { instance } = await shallow.render();
    instance.getChildren = () => [];
  });

  it('should set and get occurenceData', async () => {
    const { instance } = await shallow.render({});
    instance.occurenceData = null as never;
    expect(instance.occurenceData).toEqual({});
    instance.occurenceData = { node: 1 };
    expect(instance.occurenceData).toEqual({ node: 1 });
  });

  it('should set and get termdata', async () => {
    const { instance } = await shallow.render();
    instance.termData = null as never;
    expect(instance.termData).toEqual({});
    instance.termData = { node: 1 };
    expect(instance.termData['node']).toEqual(1);
  });

  it('should call selectByIDs when rootNode changes', async () => {
    const { instance } = await shallow.render({ bind: { rootNode: '1', nodes: [node1, node2] } });
    jest.spyOn(instance, 'selectByIDs');
    const changes: SimpleChanges = {
      rootNode: { currentValue: '2', previousValue: '1', isFirstChange: () => true, firstChange: true },
    };
    instance.ngOnChanges(changes);
    expect(instance.selectByIDs).toHaveBeenCalledWith(['2']);
  });

  it('should call selectByIDs when ontologyFilter changes', async () => {
    const { instance } = await shallow.render({
      bind: { ontologyFilter: ['1'], rootNode: '1', nodes: [node1, node2] },
    });
    jest.spyOn(instance, 'selectByIDs');
    const changes: SimpleChanges = {
      ontologyFilter: { currentValue: ['2'], previousValue: '1', isFirstChange: () => true, firstChange: true },
    };
    instance.ngOnChanges(changes);
    expect(instance.selectByIDs).toHaveBeenCalledWith(['2']);
  });

  it('should call onScroll when mat-tree emits scroll', async () => {
    const { instance, find } = await shallow.render();
    jest.spyOn(instance, 'onScroll');
    find('mat-tree')[0].triggerEventHandler('scroll', new UIEvent('scroll'));
    expect(instance.onScroll).toHaveBeenCalled();
  });

  it('should check if the root node is selected too or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNodes = [flatNode2];
    expect(instance.isSelected(flatNode1)).toBeFalsy();
  });

  it('should check if  node is selected too or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNodes = [flatNode2];
    expect(instance.isSelected(flatNode2)).toBeTruthy();
  });

  it('should set the current selection when a different node is selected', async () => {
    const { instance } = await shallow.render();

    instance.select(false, flatNode1, false, true);
    expect(instance.selectedNodes).toEqual([flatNode1]);
  });

  it('should clear the current selection when the same node is selected', async () => {
    const { instance } = await shallow.render();

    instance.selectedNodes = [flatNode1];
    instance.select(false, flatNode1, false, false);
    expect(instance.selectedNodes).toEqual([]);
  });

  it('should set selectedNodes to [] if called with an undefined node', async () => {
    const { instance } = await shallow.render();

    instance.select(false, undefined, false, false);
    expect(instance.selectedNodes).toEqual([]);
  });

  it('should push the selected node into selectedNodes if the ctrl is passed in as true', async () => {
    const { instance } = await shallow.render();

    instance.anySelectionsMade = true;
    instance.selectedNodes = [flatNode1];
    instance.select(true, flatNode2, false, true);

    expect(instance.selectedNodes).toEqual([flatNode1, flatNode2]);
  });

  it('should splice out the selected node from selectedNodes if the ctrl is passed in as true', async () => {
    const { instance } = await shallow.render();

    instance.anySelectionsMade = true;
    instance.selectedNodes = [flatNode1, flatNode2];
    instance.select(true, flatNode2, false, false);

    expect(instance.selectedNodes).toEqual([flatNode1]);
  });

  it('should emit when the selection changes', async () => {
    const { instance, outputs } = await shallow.render();
    instance.select(false, flatNode1, true, true);
    expect(outputs.nodeSelected.emit).toHaveBeenCalled();
  });

  it('isInnerNode should return true when a node can be expanded', async () => {
    const { instance } = await shallow.render();
    expect(instance.isInnerNode(1, flatNode1)).toBeTruthy();
  });

  it('isInnerNode should return false when a node cannot be expanded', async () => {
    const { instance } = await shallow.render();
    expect(instance.isInnerNode(1, flatNode2)).toBeFalsy();
  });

  it('should return number of children when getNumResults is called', async () => {
    const { instance } = await shallow.render();
    expect(instance.getCountLabel(flatNode1)).toEqual('');
    expect(instance.getCountLabel(flatNode2)).toEqual('Tissue Blocks: ');
  });

  it('should return label for node', async () => {
    const { instance } = await shallow.render();
    const label = instance.getNodeLabel('body');
    expect(label).toEqual('Anatomical Structures (AS)');
    expect(instance.getNodeLabel('test')).toEqual('test');
  });

  it('should re-run the gradient display logic on a scroll event', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.ccf-ontology-tree');
    const spy = jest.spyOn(instance, 'onScroll');

    list.triggerEventHandler('scroll', {});
    expect(spy).toHaveBeenCalled();
  });
});
