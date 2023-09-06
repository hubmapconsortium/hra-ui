import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonLongComponent } from './card-button-long.component';
import { CardButtonLongModule } from './card-button-long.module';

import { Shallow } from 'shallow-render';

describe('CardButtonLongComponent', () => {
  let shallow: Shallow<CardButtonLongComponent>

  beforeEach(async () => {
    shallow = new Shallow(CardButtonLongComponent, CardButtonLongModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });
});
