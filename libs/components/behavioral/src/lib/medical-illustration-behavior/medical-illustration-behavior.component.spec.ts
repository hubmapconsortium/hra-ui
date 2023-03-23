import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalIllustrationBehaviorComponent } from './medical-illustration-behavior.component';

describe('MedicalIllustrationBehaviorComponent', () => {
  let component: MedicalIllustrationBehaviorComponent;
  let fixture: ComponentFixture<MedicalIllustrationBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalIllustrationBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalIllustrationBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
