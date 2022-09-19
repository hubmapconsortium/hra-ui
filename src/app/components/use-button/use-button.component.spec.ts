import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseButtonComponent } from './use-button.component';

describe('UseButtonComponent', () => {
  let component: UseButtonComponent;
  let fixture: ComponentFixture<UseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
