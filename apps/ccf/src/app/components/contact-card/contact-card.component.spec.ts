import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardComponent } from './contact-card.component';
import { ContactCardModule } from './contact-card.module'
import { Shallow } from 'shallow-render';

describe('ContactCardComponent', () => {
  let shallow: Shallow<ContactCardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(ContactCardComponent, ContactCardModule)
  });

  it('should create', () => {
    expect(shallow.render()).toBeTruthy();
  });
});
