import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredTextboxComponent } from './required-textbox.component';

describe('RequiredTextboxComponent', () => {
  let component: RequiredTextboxComponent;
  let fixture: ComponentFixture<RequiredTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredTextboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
