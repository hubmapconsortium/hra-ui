import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraMillitomeComponent } from './hra-millitome.component';

describe('HraMillitomeComponent', () => {
  let component: HraMillitomeComponent;
  let fixture: ComponentFixture<HraMillitomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HraMillitomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HraMillitomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
