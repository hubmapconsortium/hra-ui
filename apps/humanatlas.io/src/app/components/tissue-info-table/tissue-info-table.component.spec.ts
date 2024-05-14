import { NgFor } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatHeaderCellDef, MatHeaderRowDef, MatRowDef } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { TissueTableInfo } from './tissue-info-table';
import { TissueInfoTableComponent } from './tissue-info-table.component';
import { TissueInfoTableModule } from './tissue-info-table.module';

describe('TissueInfoComponent', () => {
  let shallow: Shallow<TissueInfoTableComponent>;
  const testTableInfo: TissueTableInfo = {
    tissueName: 'test',
    tissueData: [
      {
        label: 'test label',
        value: 'test value',
      },
    ],
  };

  beforeEach(async () => {
    shallow = new Shallow(TissueInfoTableComponent, TissueInfoTableModule)
      .withStructuralDirective(NgFor)
      .withStructuralDirective(MatHeaderCellDef)
      .dontMock(MatSort)
      .dontMock(MatHeaderRowDef)
      .dontMock(MatRowDef);
  });

  it('should create', async () => {
    await expect(shallow.render({ bind: { data: testTableInfo } })).resolves.toBeTruthy();
  });

  describe('set data', () => {
    it('should set data to datasource', async () => {
      const { instance } = await shallow.render({
        bind: { data: testTableInfo },
      });
      expect(instance.dataSource.data).toEqual(testTableInfo.tissueData);
    });
  });
});
