import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraApiComponent } from './hra-api.component';

describe('HraApiComponent', () => {
  let component: HraApiComponent;
  let fixture: ComponentFixture<HraApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HraApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HraApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
