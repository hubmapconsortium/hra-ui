import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearchPageComponent } from './research-page.component';

describe('ResearchPageComponent', () => {
  let component: ResearchPageComponent;
  let fixture: ComponentFixture<ResearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
