import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { TableDataService } from '../../services/table-data/tabledata.service';
import { ChooseVersion } from '../choose-version/choose-version';
import { HeaderData } from '../table/header';
import { TableData } from '../table/table';
import { OrganData, VersionOrgans } from '../two-dim-image/two-dim-image';
import { OrganVersionComponent } from './organ-version.component';
import { OrganVersionModule } from './organ-version.module';

describe('OrganVersionComponent', () => {
  const testVersionData: ChooseVersion[] = [
    {
      release: 'test-release',
      version: 'test-version',
    },
  ];

  const testOrganData: OrganData[] = [
    {
      name: 'test-organ-name',
      image: 'test-organ-image',
      alt: 'test-alt',
      tissueData: [
        {
          name: 'test-tissue-name',
          image: 'test-tissue-image',
          url: 'test-tissue-url',
        },
      ],
    },
  ];

  const testOrganInfo: VersionOrgans[] = [
    {
      version: 'test-version',
      organData: testOrganData,
    },
    {
      version: 'test-version2',
      organData: testOrganData,
    },
  ];
  const getTableData = {
    columns: ['Organ', 'key2'],
    data: [
      {
        Organ: 'value',
        key2: 'value2',
      },
    ],
  };
  let shallow: Shallow<OrganVersionComponent>;

  beforeEach(async () => {
    shallow = new Shallow(OrganVersionComponent, OrganVersionModule)
      .mock(Router, {
        navigate: jest.fn(),
      })
      .mock(ActivatedRoute, {
        snapshot: {
          queryParams: {},
        },
      })
      .mock(TableDataService, {
        getData: jest.fn().mockReturnValue(of(getTableData)),
      })
      .withStructuralDirective(NgIf);
  });

  it('should create', async () => {
    await expect(
      shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      }),
    ).resolves.toBeDefined();
  });

  describe('ngOnInit()', () => {
    it('should setVersion if headerinfo is not present', async () => {
      const queryParams = {
        version: 'testVersion',
        organ: 'testOrgan',
      };
      const { instance, inject } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      });
      const route = inject(ActivatedRoute);
      route.snapshot.queryParams = queryParams;
      const setVersionSpy = jest.spyOn(instance, 'setVersion');
      instance.ngOnInit();
      expect(setVersionSpy).toHaveBeenCalledWith(queryParams.version, queryParams.organ);
    });
  });

  describe('iCaseEquals()', () => {
    it('should check and return if 2 strings are equal after converting to lowercase', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      });
      const areEqual = instance.iCaseEquals('StrIng', 'string');
      expect(areEqual).toBe(true);
    });
  });

  describe('setVersion()', () => {
    it('should set the initial organinfo if specified version is not found', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      });
      const testVersion = 'test-version-3';
      instance.setVersion(testVersion);
      expect(instance.info).toBe(testOrganInfo[0]);
    });
  });

  describe('setOrgan()', () => {
    it('should set the initial organ if passed organ does not match', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      });
      const testOrgan = 'test';
      instance.setOrgan(testOrgan);
      expect(instance.organData).toEqual(testOrganData);
    });

    it('should set the default title of the table if header data is not present', async () => {
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      });
      const testOrgan = 'test';
      instance.setOrgan(testOrgan);
      expect(instance.cardTitle).toBe(testOrganData[0].name);
    });

    it('should set the title with some additional text when header data is present', async () => {
      const testHeaderInfo: HeaderData[] = [
        {
          header: 'test',
          columnDef: 'test',
          cell: function () {
            // Intentionally empty
          },
        },
      ];
      const { instance } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo, headerInfo: testHeaderInfo },
      });
      const testOrgan = 'test';
      instance.setOrgan(testOrgan);
      expect(instance.cardTitle).toBe(testOrganData[0].name + ' Functional Tissue Units');
    });
  });

  describe('setFtu()', () => {
    it('should get data from the provided csv file', async () => {
      const { instance, inject } = await shallow.render({
        bind: { versionData: testVersionData, organInfo: testOrganInfo },
      });
      const testOrganName = 'value';
      const displayedColumnsData: string[] = [];
      const service = inject(TableDataService);
      const expectedTableData: TableData[] = [
        {
          Organ: 'value',
          key2: 'value2',
        },
      ];
      const expectedColumns: string[] = ['Organ', 'key2'];
      instance.setFtu(testOrganName);
      const data = await firstValueFrom(instance.tableData);
      const columns = await firstValueFrom(instance.columns);
      expect(service.getData).toHaveBeenCalledWith('ftu-cell-count-5th-release.csv', displayedColumnsData);
      expect(data).toEqual(expectedTableData);
      expect(columns).toEqual(expectedColumns);
    });
  });
});
