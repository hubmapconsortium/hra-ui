import { OrganTabsComponent } from './organ-tabs.component';
import { OrganTabsModule } from './organ-tabs.module';

import { Shallow } from 'shallow-render';
import { OrganData } from '../two-dim-image/two-dim-image';

describe('OrganTabsComponent', () => {
  const tabsData: OrganData[] = [
    {
      name: 'test name',
      image: 'testImg',
    },
    {
      name: 'item2',
      image: '',
    },
  ];

  let shallow: Shallow<OrganTabsComponent>;

  beforeEach(async () => {
    shallow = new Shallow(OrganTabsComponent, OrganTabsModule);
  });

  it('should create', () => {
    expect(shallow.render()).toBeDefined();
  });

  describe('.selectedIndex', () => {
    it('should return the index of the matching item', async () => {
      const { instance } = await shallow.render({ bind: { tabs: tabsData } });
      instance.currentOrgan = tabsData[1].name;
      expect(instance.selectedIndex).toEqual(1);
    });

    it('should return 0 if there is no matching item', async () => {
      const { instance } = await shallow.render({ bind: { tabs: tabsData } });
      instance.currentOrgan = 'No match';
      expect(instance.selectedIndex).toEqual(0);
    });
  });
});
