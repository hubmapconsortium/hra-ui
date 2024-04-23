import { ActivatedRoute } from '@angular/router';
import { Shallow } from 'shallow-render';
import { TissueInfoPageComponent } from './tissue-info-page.component';
import { TissueInfoPageModule } from './tissue-info-page.module';

describe('TissueInfoPageComponent', () => {
  let shallow: Shallow<TissueInfoPageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TissueInfoPageComponent, TissueInfoPageModule).mock(ActivatedRoute, {
      snapshot: {
        data: {},
      },
    });
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });
});
