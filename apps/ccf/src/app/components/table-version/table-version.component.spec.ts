import { CdkScrollable } from '@angular/cdk/scrolling';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { ChooseVersion } from '../choose-version/choose-version';
import { HeaderData } from '../table/header';
import { TableVersionComponent } from './table-version.component';
import { TableVersionModule } from './table-version.module';
import { Shallow } from 'shallow-render';

describe('TableVersionComponent', () => {
  let shallow: Shallow<TableVersionComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TableVersionComponent, TableVersionModule)
    .mock(TableDataService, {})
    .mock(CdkScrollable, {measureScrollOffset:jest.fn(), elementScrolled: jest.fn()})
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('set headerInfo', () => {
    it('should set header info and displayed columns', async () => {
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

      const testVersionData: ChooseVersion[] = [
        {
          release: 'release 1',
          version: '1.0'
        }
      ]
      const { instance } = await shallow.render({ bind: { versionData: testVersionData } });
      expect(instance.setData).toHaveBeenCalledWith(testVersionData[0])
    })
  })
});
