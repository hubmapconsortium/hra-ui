import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeCardComponent } from './prize-card.component';
import { PrizeCardModule } from './prize-card.module';

import { Shallow } from 'shallow-render';

describe('PrizeCardComponent', () => {
  let shallow: Shallow<PrizeCardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PrizeCardComponent, PrizeCardModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });
});
