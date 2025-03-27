import { NgFor, NgIf } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatHeaderRowDef, MatRowDef } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { HeaderData } from './header';
import { TableData } from './table';
import { TableComponent } from './table.component';
import { TableModule } from './table.module';

describe('TableComponent', () => {
  let shallow: Shallow<TableComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TableComponent, TableModule)
      .dontMock(MatSort, MatHeaderRowDef, MatRowDef)
      .withStructuralDirective(NgFor)
      .withStructuralDirective(NgIf);
  });

  it('should create', async () => {
    expect(shallow.render()).toBeDefined();
  });

  describe('set typeCount', () => {
    it('should set tableData to the datasource data', async () => {
      const testTableData: TableData[] = [{ key: 1 }];
      const { instance } = await shallow.render({
        bind: { typeCount: testTableData },
      });
      expect(instance.dataSource.data).toEqual(testTableData);
    });
  });

  describe('getTotal()', () => {
    it('should calculate and format the total correctly', async () => {
      const dataSource = {
        data: [
          { id: 1, value: 100 },
          { id: 2, value: 200 },
          { id: 3, value: 300 },
        ],
      };

      const expectedTotal = '600';
      const { instance } = await shallow.render({
        bind: { typeCount: dataSource.data },
      });
      const result = instance.getTotal('value');
      expect(result).toBe(expectedTotal);
    });
  });

  describe('getAlignmentClass()', () => {
    const testColumn: HeaderData = {
      header: 'test',
      columnDef: 'test',
      cell: function () {
        // Intentionally empty
      },
      alignment: 'start',
    };
    it('should return the class name for a column', async () => {
      const { instance } = await shallow.render();
      const alignment = instance.getAlignmentClass(testColumn);
      expect(alignment).toEqual('alignment-start');
    });

    it('should return default if no alignment data is provided', async () => {
      const { instance } = await shallow.render();
      const alignment = instance.getAlignmentClass({ ...testColumn, alignment: undefined });
      expect(alignment).toEqual('alignment-default');
    });
  });

  describe('formatData()', () => {
    it('should return the data if it is present', async () => {
      const { instance } = await shallow.render();
      const formattedData = instance.formatData('test');
      expect(formattedData).toEqual('test');
    });

    it('should return label `no data` if data is not present', async () => {
      const { instance } = await shallow.render();
      const formattedData = instance.formatData(null);
      expect(formattedData).toEqual('no data');
    });
  });

  describe('isNumericColumn()', () => {
    it('should return false when the column is labelled as table_version', async () => {
      const { instance } = await shallow.render();
      const testCol = 'table_version';
      const isNumeric = instance.isNumericColumn(testCol);
      expect(isNumeric).toBe(false);
    });

    it('should return false when type of value is not a number', async () => {
      const testTableData: TableData[] = [{ key: '1' }];
      const { instance } = await shallow.render({
        bind: { typeCount: testTableData },
      });
      expect(instance.isNumericColumn('key')).toBe(false);
    });

    it('should return true if column has atleast one number', async () => {
      const testTableData: TableData[] = [{ key: 1 }];
      const { instance } = await shallow.render({
        bind: { typeCount: testTableData },
      });
      expect(instance.isNumericColumn('key')).toBe(true);
    });

    it('todo', async () => {
      const nullishNumber = null as unknown as number;
      const testTableData: TableData[] = [{ key: nullishNumber }];
      const { instance } = await shallow.render({
        bind: { typeCount: testTableData },
      });
      expect(instance.isNumericColumn('key')).toBe(false);
    });
  });
});
