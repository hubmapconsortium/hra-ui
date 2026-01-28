import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyPageComponent } from './study-page.component';

describe('StudyPageComponent', () => {
  let component: StudyPageComponent;
  let fixture: ComponentFixture<StudyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
