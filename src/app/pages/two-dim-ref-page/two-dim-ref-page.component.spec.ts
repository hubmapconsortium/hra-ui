import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDimRefPageComponent } from './two-dim-ref-page.component';

describe('TwoDimRefPageComponent', () => {
  let component: TwoDimRefPageComponent;
  let fixture: ComponentFixture<TwoDimRefPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoDimRefPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDimRefPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
