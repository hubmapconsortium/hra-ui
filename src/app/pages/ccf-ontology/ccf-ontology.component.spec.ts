import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfOntologyComponent } from './ccf-ontology.component';

describe('CcfOntologyComponent', () => {
  let component: CcfOntologyComponent;
  let fixture: ComponentFixture<CcfOntologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfOntologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcfOntologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
