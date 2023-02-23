import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredInputComponent } from './required-input.component';

describe('RequiredInputComponent', () => {
  let component: RequiredInputComponent;
  let fixture: ComponentFixture<RequiredInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
