import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageElementComponent } from './page-element.component';
import { PageElementModule } from './page-element.module';
import { Shallow } from 'shallow-render';

describe('PageElementComponent', () => {
  let shallow: Shallow<PageElementComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PageElementComponent, PageElementModule)
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
