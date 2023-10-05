import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueInfoPageComponent } from './tissue-info-page.component';
import { TissueInfoPageModule } from './tissue-info-page.module';
import { Shallow } from 'shallow-render';
import { ActivatedRoute } from '@angular/router';

describe('TissueInfoPageComponent', () => {
  let shallow: Shallow<TissueInfoPageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(TissueInfoPageComponent, TissueInfoPageModule)
    .mock(ActivatedRoute, {
      snapshot: {
        data: {}
      }
    })
  });

  it('should create', async() => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });
});
