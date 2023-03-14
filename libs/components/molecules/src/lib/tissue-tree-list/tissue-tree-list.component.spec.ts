import { Shallow } from 'shallow-render';
import { TissueTreeListComponent } from './tissue-tree-list.component';

describe('TissueTreeListComponent', () => {
  let shallow: Shallow<TissueTreeListComponent>;
  const tissueTree = [
    {
      label: 'Kidney',
      tissues: [
        { label: 'Ascending thin limb' },
        { label: 'Cortical collecting duct' },
        { label: 'Collecting duct(inner medulla)' },
      ],
    },
    {
      label: 'Large Intestine',
      tissues: [{ label: 'Crypt of Lieberkuhn' }],
    },
    {
      label: 'Liver',
      tissues: [{ label: 'Liver lobule' }],
    },
  ];

  beforeEach(async () => {
    shallow = new Shallow(TissueTreeListComponent);
  });

  it('creates', async () => {
    await expect(shallow.render({ bind: { tissueTree: tissueTree } })).resolves.toBeDefined();
  });

  it('check if child for the item exists', async () => {
    const { instance } = await shallow.render({ bind: { tissueTree: tissueTree } });
    instance.tissueTree = tissueTree;
    expect(instance.hasChild(1, tissueTree[0])).toBe(true);
  });
});
