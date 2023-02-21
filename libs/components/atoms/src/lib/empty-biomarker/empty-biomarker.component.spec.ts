import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBiomarkerComponent } from './empty-biomarker.component';

describe('EmptyBiomarkerComponent', () => {
  let component: EmptyBiomarkerComponent;
  let fixture: ComponentFixture<EmptyBiomarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyBiomarkerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyBiomarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
