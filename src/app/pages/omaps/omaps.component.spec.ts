import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmapsComponent } from './omaps.component';

describe('OmapsComponent', () => {
  let component: OmapsComponent;
  let fixture: ComponentFixture<OmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
