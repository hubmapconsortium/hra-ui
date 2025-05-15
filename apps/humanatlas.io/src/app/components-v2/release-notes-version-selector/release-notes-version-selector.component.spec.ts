import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseNotesVersionSelectorComponent } from './release-notes-version-selector.component';

describe('ReleaseNotesVersionSelectorComponent', () => {
  let component: ReleaseNotesVersionSelectorComponent;
  let fixture: ComponentFixture<ReleaseNotesVersionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseNotesVersionSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseNotesVersionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
