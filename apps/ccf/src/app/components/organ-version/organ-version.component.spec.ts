import { ActivatedRoute, Router } from '@angular/router';
import { OrganVersionComponent } from './organ-version.component';
import { OrganVersionModule } from './organ-version.module';
import { Shallow } from 'shallow-render';
import { TableDataService } from '../../services/table-data/tabledata.service';

describe('OrganVersionComponent', () => {
  let shallow: Shallow<OrganVersionComponent>;

  beforeEach(async () => {
    shallow = new Shallow(OrganVersionComponent, OrganVersionModule)
    .mock(Router, {})
    .mock(ActivatedRoute, {})
    .mock(TableDataService, {})
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });

  describe('iCaseEquals()', () => {
    it('should check and return if 2 strings are equal after converting to lowercase', async () => {
      const {instance} = await shallow.render();
      const areEqual = instance.iCaseEquals('StrIng', 'string')
      expect(areEqual).toBe(true);
    })
  })
});
