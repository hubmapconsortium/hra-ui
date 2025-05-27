import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HraMarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  let component: HraMarkdownComponent;
  let fixture: ComponentFixture<HraMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HraMarkdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HraMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
