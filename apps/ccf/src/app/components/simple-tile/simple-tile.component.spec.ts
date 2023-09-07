import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTileComponent } from './simple-tile.component';
import { SimpleTileModule } from './simple-tile.module';

import { Shallow } from 'shallow-render';

describe('SimpleTileComponent', () => {
  let shallow: Shallow<SimpleTileComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SimpleTileComponent, SimpleTileModule)
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
