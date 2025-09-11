import { TestBed } from '@angular/core/testing';
import { ILNode } from '../../models/indent.model';
import { Row, Sheet } from '../../models/sheet.model';
import { IndentedListService } from './indented-list.service';

describe('IndentedListService', () => {
  let service: IndentedListService;

  const mockSheet: Sheet = {
    name: 'Test Sheet',
    sheetId: '1',
    gid: '0',
    display: 'Test Display',
    config: {},
  } as Sheet;

  const createRow = (structures: { name?: string; id?: string }[]): Row =>
    ({
      anatomical_structures: structures,
    }) as Row;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndentedListService);
  });

  it('should process simple valid data correctly', () => {
    const data = [
      createRow([
        { name: 'Root', id: 'ROOT:001' },
        { name: 'Child', id: 'CHILD:001' },
      ]),
    ];
    const result = service.makeIndentData(mockSheet, data);

    expect(result.data).toBeInstanceOf(ILNode);
    expect(result.sheet).toBe('Test Display');
    expect(result.data?.name).toBe('Root');
    expect(result.data?.children?.length).toBe(1);
    expect(result.data?.children?.[0].name).toBe('Child');
  });

  it('should handle missing structure properties', () => {
    const data = [createRow([{ name: undefined, id: 'ROOT:001' }])];
    const result = service.makeIndentData(mockSheet, data);

    expect(result.data?.name).toBe('');
    expect(result.data?.ontologyId).toBe('ROOT:001');
  });

  it('should emit data through observable', () => {
    const data = [createRow([{ name: 'Test', id: 'TEST:001' }])];
    let emittedData: { data: ILNode | null; sheet?: string } | undefined;

    service.indentData$.subscribe((result) => (emittedData = result));
    const result = service.makeIndentData(mockSheet, data);

    expect(emittedData).toEqual(result);
  });

  it('should reuse existing structures when building tree', () => {
    const data = [
      createRow([
        { name: 'Root', id: 'ROOT:001' },
        { name: 'Branch', id: 'BRANCH:001' },
      ]),
      createRow([
        { name: 'Root', id: 'ROOT:001' },
        { name: 'Branch', id: 'BRANCH:001' },
        { name: 'Leaf', id: 'LEAF:001' },
      ]),
    ];
    const result = service.makeIndentData(mockSheet, data);

    expect(result.data?.name).toBe('Root');
    expect(result.data?.children?.length).toBe(1);
    expect(result.data?.children?.[0].name).toBe('Branch');
    expect(result.data?.children?.[0].children?.length).toBe(1);
    expect(result.data?.children?.[0].children?.[0].name).toBe('Leaf');
  });

  it('should handle errors during processing and return null', () => {
    const problematicData = [{ anatomical_structures: [{ name: 'Root', id: 'ROOT:001' }] }] as Row[];
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(problematicData, 'forEach').mockImplementation(() => {
      throw new Error('Simulated processing error');
    });

    let emittedResult: { data: ILNode | null; sheet?: string } | undefined;
    service.indentData$.subscribe((data) => (emittedResult = data));
    const result = service.makeIndentData(mockSheet, problematicData);

    expect(result.data).toBeNull();
    expect(emittedResult?.data).toBeNull();
    consoleErrorSpy.mockRestore();
  });

  it('should handle complex tree structures with multiple levels', () => {
    const data = [
      createRow([
        { name: 'Root', id: 'ROOT:001' },
        { name: 'Level1', id: 'L1:001' },
        { name: 'Level2', id: 'L2:001' },
      ]),
      createRow([
        { name: 'Root', id: 'ROOT:001' },
        { name: 'Level1', id: 'L1:001' },
        { name: 'Level2', id: 'L2:002' },
      ]),
      createRow([
        { name: 'Root', id: 'ROOT:001' },
        { name: 'Level1', id: 'L1:002' },
        { name: 'Level2', id: 'L2:003' },
      ]),
    ];
    const result = service.makeIndentData(mockSheet, data);

    expect(result.data?.name).toBe('Root');
    expect(result.data?.children?.length).toBe(2);
    expect(result.data?.children?.[0].children?.length).toBe(2);
    expect(result.data?.children?.[1].children?.length).toBe(1);
  });
});
