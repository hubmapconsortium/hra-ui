import { HeaderData } from '../table/header';
import { TableVersionComponent } from './table-version.component';
import { TableVersionModule } from './table-version.module';
import { Shallow } from 'shallow-render';

describe('TableVersionComponent', () => {
  let shallow: Shallow<TableVersionComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TableVersionComponent, TableVersionModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });

  describe('getColumnDefs()', () => {
    it('should return an array of column definitions', async () => {
      const testItems: HeaderData[] = [
        {
          header: 'test1',
          columnDef: 'test1',
          cell: function () { }
        },
        {
          header: 'test2',
          columnDef: 'test2',
          cell: function () { }
        }
      ];
      const { instance } = await shallow.render();
    })
  })
});
