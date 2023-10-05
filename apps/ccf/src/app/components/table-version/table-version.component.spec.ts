import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  TableDataService,
  TableDataWithColumns,
} from '../../services/table-data/tabledata.service';
import { ChooseVersion } from '../choose-version/choose-version';
import { ExtraHeader, HeaderData } from '../table/header';
import { TableVersionComponent } from './table-version.component';
import { TableVersionModule } from './table-version.module';
import { Shallow } from 'shallow-render';
import { NgIf } from '@angular/common';
import { firstValueFrom, of } from 'rxjs';
import { TableData } from '../table/table';

describe('TableVersionComponent', () => {
  let shallow: Shallow<TableVersionComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TableVersionComponent, TableVersionModule)
      .mock(TableDataService, {
        getData: jest.fn().mockReturnValue(of()),
      })
      .mock(CdkScrollable, {
        measureScrollOffset: jest.fn().mockReturnValue(of('end')),
        elementScrolled: jest.fn().mockReturnValue(of()),
      })
      .withStructuralDirective(NgIf);
  });

  it('should create', async () => {
    const testVersionData: ChooseVersion[] = [
      {
        release: 'release 1',
        version: '1.0',
      },
    ];
    await expect(
      shallow.render({ bind: { versionData: testVersionData } })
    ).resolves.toBeDefined();
  });

  describe('ngOnInit()', () => {
    const testRelease: ChooseVersion = {
      release: '1',
      version: '1',
    };
    it('oninit call', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: [testRelease] },
      });
      const spy = jest.spyOn(instance, 'setData');
      instance.ngOnInit();
      expect(spy).toHaveBeenCalledWith(testRelease);
    });
  });

  describe('set headerInfo', () => {
    it('should set header info and displayed columns', async () => {
      const testItems: HeaderData[] = [
        {
          header: 'test1',
          columnDef: 'test1',
          cell: 'abc' as never,
        },
        {
          header: 'test2',
          columnDef: 'test2',
          cell: 'def' as never,
        },
      ];

      const testVersionData: ChooseVersion[] = [
        {
          release: 'release 1',
          version: '1.0',
        },
      ];
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, headerInfo: testItems },
      });

      expect(instance.headerInfo[0].cell).toBeInstanceOf(Function);
      expect(instance.displayedColumnsData).toEqual(['test1', 'test2']);
    });
  });

  describe('set additionalHeaders()', () => {
    const testVersionData: ChooseVersion[] = [
      {
        release: 'release 1',
        version: '1.0',
      },
    ];

    const testExtraHeaders: ExtraHeader[] = [
      {
        header: 'test extra header',
        columnDef: 'testExtraHeader',
      },
    ];
    it('should set the additional headers and its columns', async () => {
      const { instance } = await shallow.render({
        bind: {
          versionData: testVersionData,
          additionalHeaders: testExtraHeaders,
        },
      });
      expect(instance.additionalHeaders).toEqual(testExtraHeaders);
    });

    it('should set the extra headers to empty array if not available', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, additionalHeaders: undefined },
      });
      expect(instance.additionalHeaders).toEqual([]);
    });
  });

  describe('set cellHeaders()', () => {
    const testVersionData: ChooseVersion[] = [
      {
        release: 'release 1',
        version: '1.0',
      },
    ];

    const testCellHeaders: ExtraHeader[] = [
      {
        header: 'test cell header',
        columnDef: 'testCellHeader',
      },
    ];
    it('should set the cell headers and its columns', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, cellHeaders: testCellHeaders },
      });
      expect(instance.cellHeaders).toEqual(testCellHeaders);
    });

    it('should set the cell headers to empty array if not available', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, cellHeaders: undefined },
      });
      expect(instance.cellHeaders).toEqual([]);
    });
  });

  describe('setData', () => {
    const testVersionData: ChooseVersion[] = [
      {
        release: 'release 1',
        version: '1.0',
        file: 'testFile.csv',
      },
    ];

    const expectedTableData: TableData[] = [
      {
        key: 'value',
      },
    ];

    const expectedColumns: string[] = ['Organ'];

    const testGetData: TableDataWithColumns = {
      columns: ['Organ'],
      data: [
        {
          key: 'value',
        },
      ],
    };

    it('should set the data from the necessary csv file according to the version', async () => {
      const { instance, inject } = await shallow.render({
        bind: { versionData: testVersionData },
      });
      const service = inject(TableDataService);
      jest.mocked(service.getData).mockReturnValue(of(testGetData));
      instance.setData(testVersionData[0]);
      const data = await firstValueFrom(instance.tableData);
      const columns = await firstValueFrom(instance.columns);
      expect(data).toEqual(expectedTableData);
      expect(columns).toEqual(expectedColumns);
    });
  });
});
