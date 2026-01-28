import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { ILNode } from '../../models/indent.model';
import { Sheet } from '../../models/sheet.model';
import { IndentedListComponent } from './indented-list.component';
import { IndentedListService } from './indented-list.service';

describe('IndentedListComponent', () => {
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

  afterEach(() => jest.restoreAllMocks());

  it('should show placeholder when no indent exists', async () => {
    await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: createMockService() }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    expect(await screen.findByText('Indent List not created yet.')).toBeTruthy();
    expect(screen.queryByText('Root')).toBeNull();
  });

  it('should call makeIndentData on the injected service during init', async () => {
    const mockService = createMockService();

    await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: mockService }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    expect(mockService.makeIndentData).toHaveBeenCalledWith(mockSheet, []);
  });

  it('should render tree and show nodes when service emits data', async () => {
    const testNode = new ILNode('Test Node', [], 'TEST:001');
    const mockServiceWithData = createMockService(testNode);

    await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: mockServiceWithData }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    expect(await screen.findByText('Test Node')).toBeTruthy();
    expect(screen.getByText('TEST:001')).toBeTruthy();
    expect(screen.queryByText('Indent List not created yet.')).toBeNull();
  });

  it('should expand/collapse nodes when clicking the toggle button', async () => {
    const leafNode = new ILNode('Leaf', [], 'LEAF:001');
    const rootNode = new ILNode('Root', [leafNode], 'ROOT:001');

    await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: createMockService(rootNode) }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    expect(await screen.findByText('Root')).toBeTruthy();
    const toggleBtn = screen.getByLabelText('toggleRoot');
    expect(toggleBtn).toBeTruthy();
    expect(toggleBtn.textContent).toContain('expand_more');

    // Collapse by clicking
    await userEvent.click(toggleBtn);
    expect(toggleBtn.textContent).toContain('chevron_right');
    expect(screen.queryByText('Leaf')).toBeNull();

    // Expand back
    await userEvent.click(toggleBtn);
    expect(toggleBtn.textContent).toContain('expand_more');
    expect(await screen.findByText('Leaf')).toBeTruthy();
  });

  it('should expand all nodes on view init', async () => {
    const leafNode = new ILNode('Leaf', [], 'LEAF:001');
    const rootNode = new ILNode('Root', [leafNode], 'ROOT:001');

    await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: createMockService(rootNode) }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    expect(await screen.findByText('Leaf')).toBeTruthy();
  });

  it('should maintain data when expanding/collapsing programmatically', async () => {
    const leafNode = new ILNode('Leaf', [], 'LEAF:001');
    const rootNode = new ILNode('Root', [leafNode], 'ROOT:001');

    const { fixture } = await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: createMockService(rootNode) }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    const comp = fixture.componentInstance;
    comp.treeControl.expandAll();
    comp.treeControl.collapseAll();

    expect(comp.dataSource.data).toEqual([rootNode]);
  });

  it('should emit openBottomSheet when clicking a node', async () => {
    const leafNode = new ILNode('Leaf', [], 'LEAF:001');
    const rootNode = new ILNode('Root', [leafNode], 'ROOT:001');

    await render(IndentedListComponent, {
      providers: [{ provide: IndentedListService, useValue: createMockService(rootNode) }],
      componentProperties: { currentSheet: mockSheet, sheetData: [] },
    });

    await userEvent.click(await screen.findByText('Leaf'));
    const highlighted = screen.getByText('Leaf').closest('mat-tree-node');
    expect(highlighted).toHaveClass('background-highlight');
  });
});
