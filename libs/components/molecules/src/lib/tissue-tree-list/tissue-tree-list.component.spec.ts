import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueTreeListComponent } from './tissue-tree-list.component';

describe('TissueTreeListComponent', () => {
  let component: TissueTreeListComponent;
  let fixture: ComponentFixture<TissueTreeListComponent>;

  const treeList = [
    {
      name: 'Kidney',
      children: [
        { name: 'Ascending thin limb' },
        { name: 'Cortical collecting duct' },
        { name: 'Collecting duct(inner medulla)' },
      ],
    },
    {
      name: 'Large Intestine',
      children: [{ name: 'Crypt of Lieberkuhn' }],
    },
    {
      name: 'Liver',
      children: [{ name: 'Liver lobule' }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TissueTreeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TissueTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check if child for the item exists', () => {
    const component = new TissueTreeListComponent();
    component.treeList = treeList;
    expect(component.hasChild(1, treeList[0])).toBe(true);
  });

  it('select item', () => {
    const component = new TissueTreeListComponent();
    const targetItem = treeList[0]['children'][0];
    component.treeList = treeList;
    component.selectItem(targetItem);
    expect(component.selectedItem).toBe(targetItem);
  });

  it('check if item is selected for false input', () => {
    const component = new TissueTreeListComponent();
    const selectedItem = treeList[0]['children'][0];
    component.treeList = treeList;
    component.selectItem(selectedItem);

    const isItemSelected = component.isSelected(treeList[0]);
    expect(isItemSelected).toBe(false);
  });

  it('check if item is selected for correct input', () => {
    const component = new TissueTreeListComponent();
    const selectedItem = treeList[0]['children'][0];
    component.treeList = treeList;
    component.selectItem(selectedItem);

    const isItemSelected = component.isSelected(selectedItem);
    expect(isItemSelected).toBe(true);
  });

  it('unselects the item', () => {
    const component = new TissueTreeListComponent();
    component.unselectItem();
    expect(component.selectedItem).toBe(undefined);
  });
});
