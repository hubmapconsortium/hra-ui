import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModalComponent } from './contact-modal.component';

describe('ContactModalComponent', () => {
  let component: ContactModalComponent;
  let fixture: ComponentFixture<ContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
