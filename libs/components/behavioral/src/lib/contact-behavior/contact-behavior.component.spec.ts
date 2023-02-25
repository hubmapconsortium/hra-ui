import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBehaviorComponent } from './contact-behavior.component';

describe('ContactBehaviorComponent', () => {
  let component: ContactBehaviorComponent;
  let fixture: ComponentFixture<ContactBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
