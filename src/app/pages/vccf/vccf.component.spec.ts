import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VccfComponent } from './vccf.component';

describe('VccfComponent', () => {
  let component: VccfComponent;
  let fixture: ComponentFixture<VccfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VccfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VccfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
