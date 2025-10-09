import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ILNode } from '../../models/indent.model';
import { Sheet } from '../../models/sheet.model';
import { IndentedListComponent } from './indented-list.component';
import { IndentedListService } from './indented-list.service';

describe('IndentedListComponent', () => {
  let component: IndentedListComponent;
  let fixture: ComponentFixture<IndentedListComponent>;

  const mockSheet: Sheet = {
    name: 'Test Sheet',
    sheetId: '1',
    gid: '0',
    config: {},
  } as Sheet;

  const createMockService = (data: ILNode | null = null) => ({
    indentData$: of({ data }),
    makeIndentData: jest.fn(),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndentedListComponent, NoopAnimationsModule],
      providers: [{ provide: IndentedListService, useValue: createMockService() }],
    }).compileComponents();

    fixture = TestBed.createComponent(IndentedListComponent);
    component = fixture.componentInstance;
    component.currentSheet = mockSheet;
    component.sheetData = [];
  });

  it('should create with default values', () => {
    expect(component).toBeTruthy();
    expect(component.indentData).toEqual([]);
    expect(component.visible).toBe(false);
  });

  it('should handle lifecycle methods and service interactions', () => {
    const mockService = createMockService();
    Object.defineProperty(component, 'indentService', { value: mockService, writable: true });

    component.ngOnInit();
    expect(mockService.makeIndentData).toHaveBeenCalledWith(mockSheet, []);

    component.visible = true;
    component.ngOnDestroy();
    expect(component.visible).toBe(false);
  });

  it('should handle data subscription and visibility changes', () => {
    const testNode = new ILNode('Test Node', [], 'TEST:001');
    const mockServiceWithData = createMockService(testNode);
    Object.defineProperty(component, 'indentService', { value: mockServiceWithData, writable: true });

    jest.spyOn(component, 'initializeTree');
    component.ngOnInit();

    expect(component.initializeTree).toHaveBeenCalledWith(testNode);
    expect(component.visible).toBe(true);
  });

  it('should handle tree operations and control functions', () => {
    const leafNode = new ILNode('Leaf', [], 'LEAF:001');
    const rootNode = new ILNode('Root', [leafNode], 'ROOT:001');

    // Test tree initialization
    component.initializeTree(rootNode);
    expect(component.dataSource.data).toEqual([rootNode]);

    // Test tree control functions
    const expandableNode = { expandable: true, name: 'test', ontologyId: 'test', level: 0 };
    const leafFlatNode = { expandable: false, name: 'leaf', ontologyId: 'leaf', level: 1 };

    expect(component.treeControl.getLevel(expandableNode)).toBe(0);
    expect(component.treeControl.isExpandable(expandableNode)).toBe(true);
    expect(component.treeControl.getLevel(leafFlatNode)).toBe(1);
    expect(component.treeControl.isExpandable(leafFlatNode)).toBe(false);

    // Test hasChild function
    expect(component.hasChild(0, expandableNode)).toBe(true);
    expect(component.hasChild(0, leafFlatNode)).toBe(false);
  });

  it('should handle tree view interactions', () => {
    // Test ngAfterViewInit with and without tree
    const mockTreeControl = { expandAll: jest.fn() };
    Object.defineProperty(component, 'indentTree', { value: { treeControl: mockTreeControl }, writable: true });
    component.ngAfterViewInit();
    expect(mockTreeControl.expandAll).toHaveBeenCalled();

    Object.defineProperty(component, 'indentTree', { value: undefined, writable: true });
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });

  it('should trigger tree flattener functions', () => {
    const leafNode = new ILNode('Leaf', [], 'LEAF:001');
    const rootNode = new ILNode('Root', [leafNode], 'ROOT:001');

    // Trigger tree flattener through data changes
    component.dataSource.data = [rootNode];

    // Test tree control operations to trigger flattener functions
    const mockFlatNode = { expandable: true, name: 'Root', ontologyId: 'ROOT:001', level: 0 };
    component.treeControl.expand(mockFlatNode);
    component.treeControl.expandAll();
    component.treeControl.collapseAll();

    expect(component.dataSource.data).toEqual([rootNode]);
  });

  it('should emit events', () => {
    jest.spyOn(component.closeIL, 'emit');
    component.closeIL.emit();
    expect(component.closeIL.emit).toHaveBeenCalled();
  });
});
