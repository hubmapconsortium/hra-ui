import { CdkConnectedOverlay, Overlay } from '@angular/cdk/overlay';
import { NestedTreeControl } from '@angular/cdk/tree';
import { NgIf, ViewportScroller } from '@angular/common';
import { Type } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Shallow } from 'shallow-render';
import { NavItems } from '../toolbar/nav-items';
import { MenuTreeComponent } from './menu-tree.component';
import { MenuTreeModule } from './menu-tree.module';

describe('MenuTreeComponent', () => {
  let shallow: Shallow<MenuTreeComponent>;
  const testTreeItems: NavItems[] = [
    {
      menuName: 'test',
    },
  ];

  beforeEach(async () => {
    shallow = new Shallow(MenuTreeComponent, MenuTreeModule).mock(Overlay, {
      scrollStrategies: {
        block: jest.fn(),
      },
    });
  });

  it('should create', () => {
    expect(shallow.render()).toBeDefined();
  });

  describe('.treeItems [set]', () => {
    it('should assign tree items to datasource', async () => {
      const { instance } = await shallow.render({
        bind: { treeItems: testTreeItems },
      });
      expect(instance.dataSource.data).toEqual(testTreeItems);
    });
  });

  describe('hasChild', () => {
    const testNode: NavItems = {
      menuName: 'test',
      children: [],
    };
    it('should return if node has children', async () => {
      const { instance } = await shallow.render();
      const hasChildren = instance.hasChild(0, testNode);
      expect(hasChildren).toEqual(false);
    });
  });

  describe('externalWindow()', () => {
    it('should open url in external window', async () => {
      const testUrl = 'www.example.com';
      const { instance } = await shallow.render();
      window.open = jest.fn();
      instance.externalWindow(testUrl);
      expect(window.open).toHaveBeenCalledWith(testUrl, '_blank');
    });
  });

  describe('scrollTo(id)', () => {
    const mobileNavItems: NavItems[] = [
      {
        menuName: 'test',
        id: 'test-id',
      },
    ];

    beforeEach(() => {
      shallow
        .withStructuralDirective(CdkConnectedOverlay)
        .withStructuralDirective(NgIf)
        .dontMock(MatTreeModule)
        .mock(Router, {
          navigate: jest.fn(),
        })
        .mock(ViewportScroller as never as Type<ViewportScroller>, {
          scrollToAnchor: jest.fn(),
        })
        .mock(NestedTreeControl, {
          collapseAll: jest.fn(),
        });
    });

    it('should be called when the button is clicked', async () => {
      const { instance, find } = await shallow.render({
        bind: { treeItems: mobileNavItems },
      });
      jest.spyOn(instance, 'scrollTo');
      find('.table-of-contents').triggerEventHandler('click');
      expect(instance.scrollTo).toHaveBeenCalled();
    });

    it('should navigate to a fragment', async () => {
      const testId = 'intro';
      const { instance, inject } = await shallow.render();
      const router = inject(Router);
      instance.scrollTo(testId);
      expect(router.navigate).toHaveBeenCalledWith([], { fragment: testId });
      expect(instance.scrollToId).toBe(testId);
    });
  });

  describe('scrollAfterDetach()', () => {
    it('should scroll to anchor element', async () => {
      const { instance, inject } = await shallow.render();
      const scroller = inject(ViewportScroller);
      const spy = jest.spyOn(scroller, 'scrollToAnchor');
      instance.scrollToId = 'test';
      instance.scrollAfterDetach();
      expect(spy).toBeCalledWith('test');
      expect(instance.scrollToId).toBe(undefined);
    });
  });

  describe('treeControl', () => {
    it('should instansiate object of nested tree control', async () => {
      const treeItems: NavItems[] = [
        {
          menuName: 'test',
          children: [],
        },
      ];
      const { instance } = await shallow.render({
        bind: { treeItems: treeItems },
      });
      const treeControl = instance.treeControl;
      expect(treeControl).toBeInstanceOf(NestedTreeControl);
      expect(treeControl.getChildren(treeItems[0])).toEqual(treeItems[0].children);
    });
  });

  describe('isHubmapNav', () => {
    it('should return true if hubmap nav is to be rendered', async () => {
      const node: NavItems = { menuName: 'Test Menu', componentName: 'hubmap-nav' };
      const { instance } = await shallow.render();
      const isPresent = instance.isHubmapNav(1, node);
      expect(isPresent).toBe(true);
    });
  });

  describe('collapseNonActiveNodes', () => {
    const navItem: NavItems = { menuName: 'Test' };
    it('should collapse other nodes when we expand a single node', async () => {
      const { instance } = await shallow.render();
      const treeControl = instance.treeControl;
      const spy = jest.spyOn(treeControl, 'collapseAll');
      instance.collapseNonActiveNodes(navItem);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('collapseNonActiveNodes when trying to close already open node', () => {
    it('should collapse the node if it is already open', async () => {
      const { instance } = await shallow.render();
      const { treeControl, hubmapNavData } = instance;

      treeControl.expand(hubmapNavData[0]);
      instance.collapseNonActiveNodes(hubmapNavData[0]);
      expect(treeControl.isExpanded(hubmapNavData[0])).toBeTruthy();

      treeControl.expand(hubmapNavData[1]);
      instance.collapseNonActiveNodes(hubmapNavData[1]);
      expect(treeControl.isExpanded(hubmapNavData[0])).toBeFalsy();
      expect(treeControl.isExpanded(hubmapNavData[1])).toBeTruthy();
    });
  });
});
