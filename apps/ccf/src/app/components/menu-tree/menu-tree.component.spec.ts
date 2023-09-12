import { MenuTreeComponent } from './menu-tree.component';
import { MenuTreeModule } from './menu-tree.module';
import { Shallow } from 'shallow-render';
import { NavItems } from '../toolbar/nav-items';
import { Overlay } from '@angular/cdk/overlay';

describe('MenuTreeComponent', () => {
  let shallow: Shallow<MenuTreeComponent>;
  const testTreeItems: NavItems[] = [
    {
      menuName: 'test'
    }
  ]

  beforeEach(async () => {
    shallow = new Shallow(MenuTreeComponent, MenuTreeModule).mock(Overlay, {
      scrollStrategies: {
        block: jest.fn()
      }
    })
  });

  it('should create', () => {
    expect(shallow.render()).toBeDefined();
  });

  describe('ngOnInit()', () => {
    it('should assign tree items to datasource', async () => {
      const { instance } = await shallow.render({ bind: { treeItems: testTreeItems } });
      expect(instance.dataSource.data).toEqual(testTreeItems)
    })
  })

  describe('hasChild', () => {
    const testNode: NavItems = {
      menuName: 'test',
      children: []
    }
    it('should return if node has children', async () => {
      const { instance } = await shallow.render();
      const hasChildren = instance.hasChild(0, testNode);
      expect(hasChildren).toEqual(false)

    })
  })

  describe('externalWindow()', () => {
    it('should open url in external window', async () => {
      const testUrl = 'www.example.com';
      const { instance } = await shallow.render();
      const spy = jest.spyOn(window, 'open')
      instance.externalWindow(testUrl)
      expect(spy).toHaveBeenCalledWith(testUrl, "_blank");
    })
  })

  describe('scroll to the section', () => {
    it('should scroll to the section of the menu item', async () => {
      const testId: string = 'intro';
      const { instance } = await shallow.render();
      
    })
  })
});
