import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPreferencesModalComponent } from './privacy-preferences-modal.component';

describe('PrivacyPreferencesModalComponent', () => {
  let component: PrivacyPreferencesModalComponent;
  let fixture: ComponentFixture<PrivacyPreferencesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPreferencesModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPreferencesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
