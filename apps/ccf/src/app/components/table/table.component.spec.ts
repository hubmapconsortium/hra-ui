import { TableComponent } from './table.component';
import { TableModule } from './table.module';
import { TableData } from './table';
import { Shallow } from 'shallow-render';
import { HeaderData } from './header';

describe('TableComponent', () => {
  let shallow: Shallow<TableComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TableComponent, TableModule)
  });

  it('should create', async () => {
    expect(shallow.render()).toBeDefined();
  });

  describe('set typeCount', () => {
    it('should set tableData to the datasource data', async () => {
      const testTableData: TableData[] = [{ 'key': 1 }];
      const { instance } = await shallow.render({ bind: { typeCount: testTableData } });
      expect(instance.dataSource.data).toEqual(testTableData);
    });
  })

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
      const { instance } = await shallow.render({ bind: { typeCount: dataSource.data } });
      const result = instance.getTotal('value');
      expect(result).toBe(expectedTotal);
    });

  })

  describe('getAlignmentClass()', () => {
    const testColumn: HeaderData = {
      header: 'test',
      columnDef: 'test',
      cell: function () { },
      alignment: 'start'
    }
    it('should return the class name for a column', async () => {
      const { instance } = await shallow.render();
      const alignment = instance.getAlignmentClass(testColumn);
      expect(alignment).toEqual('alignment-start');
    });

    it('should return default if no alignment data is provided', async () => {
      const testColumn: HeaderData = {
        header: 'test',
        columnDef: 'test',
        cell: function () { }
      }
      const { instance } = await shallow.render();
      const alignment = instance.getAlignmentClass(testColumn);
      expect(alignment).toEqual('alignment-default');
    })
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
    })
  })
});
