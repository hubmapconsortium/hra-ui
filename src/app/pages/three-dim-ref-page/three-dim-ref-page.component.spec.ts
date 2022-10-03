import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDimRefPageComponent } from './three-dim-ref-page.component';

describe('ThreeDimRefPageComponent', () => {
  let component: ThreeDimRefPageComponent;
  let fixture: ComponentFixture<ThreeDimRefPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDimRefPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDimRefPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
