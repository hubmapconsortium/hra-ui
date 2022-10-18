import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDimImageComponent } from './two-dim-image.component';

describe('TwoDimImageComponent', () => {
  let component: TwoDimImageComponent;
  let fixture: ComponentFixture<TwoDimImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoDimImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoDimImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
